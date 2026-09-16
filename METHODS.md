# methods

## neuron model

leaky integrate-and-fire. all 47 neurons use the same dynamics with species-specific parameters.

dV/dt = -(V - V_rest) / tau_m + I_syn(t) / C_m + noise(t)

V_rest = -70 mV
tau_m = 20 ms
noise: gaussian, sigma = 0.3 mV

spike at threshold -> reset to V_rest + 10 mV -> refractory period

## parameters by cell type

| type | threshold (mV) | refractory (ms) | source |
|---|---|---|---|
| worm sensory | -55 | 5 | Goodman et al. 1998 |
| worm interneuron | -50 | 3 | Lindsay et al. 2011 |
| worm command | -48 | 4 | Kawano et al. 2011 |
| worm motor | -52 | 6 | Liu et al. 2009 |
| fly Kenyon cell | -52 | 4 | Turner et al. 2008 |
| fly MBON | -48 | 5 | Hige et al. 2015 |
| fly DAN | -50 | 8 | Riemensperger et al. 2005 |
| fly CX | -48 | 3-4 | Seelig & Jayaraman 2015 |
| fly DN | -50 | 5 | Namiki et al. 2018 |
| bridge | -50 | 3 | worm interneuron defaults |

## synaptic model

chemical: instantaneous current after axonal delay
electrical: bidirectional, 0.3 reverse coupling ratio
weights scaled x3 from connectome synapse counts

## delays

worm internal: 2 ms
fly internal: 3 ms
bridge (cross-species): 5 ms

## simulation

dt = 0.5 ms
4 integration steps per animation frame
spontaneous activity: 8% chance per frame, random sensory neuron, 15-25 mV
stimulus pathways: 25-40 mV into target neurons

## spike history

rolling 500 ms window. used for spike rate and ISI calculations.
activity intensity per neuron: exponential decay (0.95 per step), reset to 1.0 on spike.
