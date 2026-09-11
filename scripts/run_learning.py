#!/usr/bin/env python3
"""experiment 3: associative learning over 50 trials"""
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
RESULTS_DIR = Path(__file__).parent.parent / "results"

N_TRIALS = 50
TRIAL_LENGTH_MS = 1000

if __name__ == "__main__":
    with open(DATA_DIR / "parameters.json") as f:
        params = json.load(f)
    RESULTS_DIR.mkdir(exist_ok=True)
    print(f"running {N_TRIALS} conditioning trials ({TRIAL_LENGTH_MS} ms each)")
    print(f"stimulus: {params['stimulus_pathways']['chemotaxis']}")
    print(f"reward: {params['stimulus_pathways']['reward']}")
    # TODO: run paired trials, test conditioned response
