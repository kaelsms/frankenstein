// ═══════════════════════════════════════════════════════════════
// Leaky Integrate-and-Fire neural simulation engine
// Based on standard LIF model: dV/dt = -(V - V_rest)/tau + I/C
// ═══════════════════════════════════════════════════════════════

import type { Neuron, Synapse } from './connectome'
import { buildConnectome } from './connectome'

const V_REST = -70    // mV resting potential
const V_PEAK = 40     // mV spike peak
const TAU = 20        // ms membrane time constant
const DT = 0.5        // ms simulation timestep
const STEPS_PER_FRAME = 4  // simulation steps per animation frame

export interface SpikeEvent {
  neuronId: string
  time: number
}

export interface SimState {
  neurons: Map<string, Neuron>
  synapses: Synapse[]
  time: number
  spikes: SpikeEvent[]
  spikeHistory: SpikeEvent[] // rolling window
  recentActivity: Map<string, number> // neuron → intensity (0-1)
}

export function createSimulation(): SimState {
  const { neurons, synapses } = buildConnectome()
  return {
    neurons,
    synapses,
    time: 0,
    spikes: [],
    spikeHistory: [],
    recentActivity: new Map(),
  }
}

// Inject current into a neuron (simulates sensory input)
export function stimulate(state: SimState, neuronId: string, current: number) {
  const n = state.neurons.get(neuronId)
  if (n) {
    n.potential += current
  }
}

// Stimulate a random sensory neuron (spontaneous activity)
export function spontaneousActivity(state: SimState) {
  const sensory = [...state.neurons.values()].filter(n => n.type === 'sensory')
  if (sensory.length === 0) return
  const n = sensory[Math.floor(Math.random() * sensory.length)]
  n.potential += 15 + Math.random() * 10
}

// Stimulate specific pathway
export function stimulatePathway(state: SimState, pathway: 'chemotaxis' | 'nociception' | 'thermal' | 'reward') {
  const targets: Record<string, string[]> = {
    chemotaxis: ['ASEL', 'ASER', 'AWCL', 'AWCR'],
    nociception: ['ASHL', 'ASHR'],
    thermal: ['AFDL', 'AFDR'],
    reward: ['DAN2'],
  }
  const ids = targets[pathway] || []
  for (const id of ids) {
    stimulate(state, id, 25 + Math.random() * 15)
  }
}

// One simulation step (LIF dynamics)
function step(state: SimState) {
  const { neurons, synapses, time } = state
  const newSpikes: SpikeEvent[] = []

  // Process pending synaptic inputs
  for (const syn of synapses) {
    const pre = neurons.get(syn.from)
    const post = neurons.get(syn.to)
    if (!pre || !post) continue

    // If pre-synaptic neuron fired recently (within delay window)
    const timeSinceFire = time - pre.lastFired
    if (timeSinceFire >= syn.delay && timeSinceFire < syn.delay + DT * 2) {
      // Deliver synaptic current
      const current = syn.weight * 3 // scale factor
      post.potential += current

      // For electrical synapses, also flow backwards (gap junction)
      if (syn.type === 'electrical') {
        pre.potential += current * 0.3
      }
    }
  }

  // Update each neuron
  for (const [id, n] of neurons) {
    const timeSinceFire = time - n.lastFired

    // Refractory period: hold at reset
    if (timeSinceFire < n.refractory) {
      n.potential = V_REST + 5
      continue
    }

    // Was this neuron at spike peak? Reset it
    if (n.potential >= V_PEAK) {
      n.potential = V_REST + 10 // slight depolarization after spike
      continue
    }

    // LIF: leak toward resting potential
    n.potential += (-(n.potential - V_REST) / TAU) * DT

    // Add noise (biological neurons are stochastic)
    n.potential += (Math.random() - 0.5) * 0.3

    // Check threshold: fire!
    if (n.potential >= n.threshold) {
      n.potential = V_PEAK
      n.lastFired = time
      newSpikes.push({ neuronId: id, time })
    }

    // Clamp
    n.potential = Math.max(V_REST - 5, Math.min(V_PEAK, n.potential))
  }

  state.spikes = newSpikes
  state.time += DT

  // Update spike history (keep last 500ms)
  state.spikeHistory.push(...newSpikes)
  const cutoff = state.time - 500
  while (state.spikeHistory.length > 0 && state.spikeHistory[0].time < cutoff) {
    state.spikeHistory.shift()
  }

  // Update activity map (exponential decay)
  for (const [id] of neurons) {
    const current = state.recentActivity.get(id) || 0
    state.recentActivity.set(id, current * 0.95)
  }
  for (const spike of newSpikes) {
    state.recentActivity.set(spike.neuronId, 1.0)
  }
}

// Advance simulation by one frame
export function tickFrame(state: SimState) {
  for (let i = 0; i < STEPS_PER_FRAME; i++) {
    step(state)
  }

  // Spontaneous activity (stochastic)
  if (Math.random() < 0.08) {
    spontaneousActivity(state)
  }
}
