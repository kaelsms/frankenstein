#!/usr/bin/env python3
"""experiment 1: baseline activity comparison"""
import json
import numpy as np
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
RESULTS_DIR = Path(__file__).parent.parent / "results"

def load_connectome():
    with open(DATA_DIR / "neurons.json") as f:
        neurons = json.load(f)
    with open(DATA_DIR / "synapses.json") as f:
        synapses = json.load(f)
    with open(DATA_DIR / "parameters.json") as f:
        params = json.load(f)
    return neurons, synapses, params

def lif_step(V, threshold, V_rest, tau, dt, I_syn, noise_sigma):
    noise = np.random.normal(0, noise_sigma)
    dV = (-(V - V_rest) / tau + I_syn) * dt + noise
    V_new = V + dV
    fired = V_new >= threshold
    if fired:
        V_new = V_rest + 10
    return V_new, fired

if __name__ == "__main__":
    neurons, synapses, params = load_connectome()
    RESULTS_DIR.mkdir(exist_ok=True)
    print(f"loaded {neurons['total']} neurons, {synapses['total']} synapses")
    print(f"dt = {params['simulation']['dt_ms']} ms")
    # TODO: run worm-only, fly-only, hybrid
