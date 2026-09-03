// LIF simulation engine — initial version
// dV/dt = -(V - V_rest) / tau + I/C

const V_REST = -70
const V_PEAK = 40
const TAU = 20
const DT = 0.5

export interface Neuron {
  id: string
  potential: number
  threshold: number
  lastFired: number
  refractory: number
}

export interface Synapse {
  from: string
  to: string
  weight: number
  delay: number
}

export function step(neurons: Map<string, Neuron>, synapses: Synapse[], time: number) {
  for (const [id, n] of neurons) {
    const timeSinceFire = time - n.lastFired
    if (timeSinceFire < n.refractory) continue
    if (n.potential >= V_PEAK) {
      n.potential = V_REST + 10
      continue
    }
    n.potential += (-(n.potential - V_REST) / TAU) * DT
    n.potential += (Math.random() - 0.5) * 0.3
    if (n.potential >= n.threshold) {
      n.potential = V_PEAK
      n.lastFired = time
    }
  }
}

export function processSynapses(neurons: Map<string, Neuron>, synapses: Synapse[], time: number) {
  for (const syn of synapses) {
    const pre = neurons.get(syn.from)
    const post = neurons.get(syn.to)
    if (!pre || !post) continue
    const timeSinceFire = time - pre.lastFired
    if (timeSinceFire >= syn.delay && timeSinceFire < syn.delay + DT * 2) {
      post.potential += syn.weight * 3
    }
  }
}

export function spontaneous(neurons: Map<string, Neuron>) {
  const sensory = [...neurons.values()].filter(n => n.threshold === -55)
  if (sensory.length === 0) return
  const n = sensory[Math.floor(Math.random() * sensory.length)]
  n.potential += 15 + Math.random() * 10
}

export function stimulate(neurons: Map<string, Neuron>, ids: string[], current: number) {
  for (const id of ids) {
    const n = neurons.get(id)
    if (n) n.potential += current
  }
}
