# experimental protocols

## experiment 1: baseline activity

run worm-only, fly-only, hybrid for 10^6 timesteps.
measure spike rate distributions, interspike interval statistics, cross-correlation.
null hypothesis: hybrid = superposition of parents.

results (report 2):
- hybrid motor neuron rate increased 52% vs worm-only (p < 0.001)
- hybrid interneuron rate increased 23% vs worm-only (p < 0.01)
- cross-species correlations peaked at +12-18 ms lag (worm motor -> fly MBON)
- correlations abolished when bridge weights set to zero
- null hypothesis rejected: hybrid is not simple superposition

## experiment 2: sensorimotor coherence

repeated chemotactic stimuli to amphid neurons.
measure motor neuron response consistency.
compare forward/reverse motor activation ratio: hybrid vs worm-only.

results (report 2):
- worm-only selectivity ratio S = 2.1 ± 0.4
- hybrid selectivity ratio S = 2.8 ± 0.6 (34% increase, p < 0.001)
- BR_DM maintained elevated firing (9.3 Hz vs 7.1 Hz baseline) during stimulus
- coefficient of variation lower in hybrid (0.21 vs 0.19): structured bias, not noise

## experiment 3: associative learning

50 trials: pair chemotactic stimulus with DAN2 reward signal (200 ms CS-US interval).
test conditioned motor response to stimulus alone.
hebbian plasticity at KC-MBON synapses: +0.05 weight per co-activation during DAN2, capped at 2x.

results (report 3):
- hybrid selectivity increased from S = 2.3 (trial 1) to S = 3.2 (trial 50): 41% increase
- learning curve fit: S(n) = S_max(1 - e^(-n/tau)) + S_0, tau = 14.2 trials, R^2 = 0.91
- worm-only showed no change (p = 0.72)
- post-conditioning test: S = 2.9 ± 0.6, slowly decaying (extinction)
- KC1-MBON1 weight: 2.0 -> 3.2 (60%), KC2-MBON2: 2.0 -> 2.8 (40%)
- KC4/KC5 minimal change (sparse coding: only active KCs undergo plasticity)

## experiment 4: cross-species conflict

simultaneous nociceptive (ASHL/ASHR, 35 mV) + reward (DAN2, 25 mV).
measure motor pattern over 500 ms response window.

results (report 3):
- worm-only (nociception): S = 0.24, strong reversal
- hybrid (reward alone): S = 2.83, forward bias
- hybrid (conflict): S = 0.84, intermediate
- hybrid conflict pattern: 80 ms initial pause, then attenuated forward with 20-40 ms gaps
- pattern absent from all control conditions
- bridge disconnected: S = 0.24 (reverts to pure reversal)
- mechanism: competitive inhibition between AVAL excitation (nociception) and BR_DM inhibition

## experiment 5: computational scaling (report 4)

312-neuron expanded hybrid (tier 1: 80 worm, 220 fly, 12 bridge).
exponential synaptic conductances.

preliminary results:
- cross-species oscillatory synchronization at 11.2 Hz (coherence 0.47, p < 0.001)
- second-order conditioning achieved (47-neuron system fails at this)
- persistent memory traces surviving 10^4+ timesteps of intervening activity

## runner

automated experiment pipeline: `experiments/run.ts`
seeded RNG for reproducibility. same seed = identical run.
five preconfigured experiments: baseline, coherence, learning, conflict, bridge-ablation.
