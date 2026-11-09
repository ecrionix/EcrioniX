---
name: simulation-failure-classifier
description: Categorizes simulation errors into distinct buckets (RTL bug, testbench error, constraint conflict, timeout hang, reset race) for systematic team assignment.
---

# Simulation Failure Classifier Skill

## Purpose
Provides fast triage of failing tests, assigning responsibility to RTL designers, verification engineers, or environment maintainers based on error pathology.

## Failure Taxonomy
- **Category 1: RTL Functional Bug:** Scoreboard detects data payload mismatch, or SVA fires on valid input stimulus.
- **Category 2: Testbench Modeling Bug:** Null pointer dereference, incorrect reference model computation, race condition in driver.
- **Category 3: Solver Contradiction:** Randomization failure due to conflicting constraint additions.
- **Category 4: Environment Timeout:** Simulation killed by watchdog timer due to dropped packet or missing interrupt.
- **Category 5: Reset / Initialization Race:** Failure occurs during the first 100 ns of simulation.

## Expected Output
- Ranked categorization with recommended team assignee and debug priority.

## Limitations
- Rule-based heuristics require log file context and relevant source code lines.

## Verification Checklist
- [ ] Classification verified with test transcript analysis.
