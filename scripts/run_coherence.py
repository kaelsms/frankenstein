#!/usr/bin/env python3
"""experiment 2: sensorimotor coherence"""
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
RESULTS_DIR = Path(__file__).parent.parent / "results"

N_STIMULI = 100
STIMULUS_INTERVAL_MS = 500

if __name__ == "__main__":
    with open(DATA_DIR / "parameters.json") as f:
        params = json.load(f)
    RESULTS_DIR.mkdir(exist_ok=True)
    print(f"{N_STIMULI} repeated chemotactic stimuli at {STIMULUS_INTERVAL_MS} ms intervals")
    print(f"measuring forward/reverse motor selectivity ratio")
    print(f"comparing hybrid vs worm-only...")
    # TODO: run coherence protocol
