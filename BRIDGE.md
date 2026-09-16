# bridge layer design

## problem

C. elegans and Drosophila use fundamentally different neural signal encodings. worm circuits rely on graded potentials with sparse spiking. fly circuits use rate-coded spiking with population-level representations. direct wiring between them would produce noise, not signal.

## solution

four artificial interneurons that explicitly translate between signal formats.

BR_SM (sensory-motor bridge):
  translates worm chemosensory integration into fly associative encoding.
  worm AIAL/AIAR → BR_SM → fly KC1/KC2

BR_CM (command-memory bridge):
  informs fly associative system about worm motor state.
  enables learning associations between sensory context and behavioral outcome.
  worm AVBL/AVAL → BR_CM → fly KC3, DAN2

BR_RW (reward-reflex bridge):
  allows fly reward signals to modulate worm motor tone.
  biases worm toward states the fly system associates with reward.
  fly DAN2 → BR_RW → worm RIML/RIMR

BR_DM (decision-motor bridge):
  translates fly navigational decisions into worm motor commands.
  selects between forward and reverse locomotion based on fly heading computation.
  fly DN1/DN2 → BR_DM → worm AVBL (+excitatory), AVAL (-inhibitory)

## delay

bridge synapses: 5 ms (vs 2 ms worm, 3 ms fly)
this reflects the computational overhead of cross-system translation.

## parameters

bridge neurons use standard LIF dynamics with worm interneuron defaults:
  threshold: -50 mV
  refractory: 3 ms

## validation

bridge connections tested in isolation before integration.
each bridge neuron verified to produce expected post-synaptic response.
delay of 5 ms confirmed sufficient for stable signal propagation.
