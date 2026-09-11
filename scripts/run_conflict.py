#!/usr/bin/env python3
"""experiment 4: cross-species conflict resolution"""
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
RESULTS_DIR = Path(__file__).parent.parent / "results"

if __name__ == "__main__":
    with open(DATA_DIR / "parameters.json") as f:
        params = json.load(f)
    RESULTS_DIR.mkdir(exist_ok=True)
    print(f"nociception: {params['stimulus_pathways']['nociception']} (triggers reversal)")
    print(f"reward: {params['stimulus_pathways']['reward']} (promotes approach)")
    print("simultaneous activation, measuring motor pattern...")
    # TODO: run conflict protocol
