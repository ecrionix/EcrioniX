---
name: verification-coverage-closure
description: Orchestrates verification closure strategy, analyzing code coverage (line, branch, condition, FSM, toggle) and functional coverage to achieve signoff criteria.
---

# Verification Coverage Closure Skill

## Purpose
Guides verification leads through the final 10% of verification closure &mdash; closing stubborn coverage holes, evaluating un-hit FSM states, analyzing un-exercised condition branches, and writing targeted directed tests.

## Closure Workflow
1. **Coverage Analysis:**
   - Correlate Code Coverage (Line, Branch, Condition, FSM State, Toggle) with Functional Coverage.
   - Identify unreachable code: Dead state transitions, un-drivable error traps, parameter-disabled configurations.
2. **Waiver Justification:**
   - Document formal engineering justification for unwaivered code coverage holes (e.g., tie-off signals, redundant safety logic).
3. **Targeted Stimulus Strategy:**
   - Prescribe specific randomized constraint modifications or directed test sequences to hit stubborn corner bins without disturbing closed bins.

## Limitations
- Coverage closure decisions must be approved by the Lead Verification Architect and SoC Signoff Board.

## Verification Checklist
- [ ] 100% functional coverage goal achieved or formally waived.
- [ ] All code coverage exclusions peer-reviewed and documented in vPlan.
