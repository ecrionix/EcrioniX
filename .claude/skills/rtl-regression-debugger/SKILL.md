---
name: rtl-regression-debugger
description: Diagnoses failing simulation logs, UVM scoreboard mismatches, assertion fires, and VCD/FSDB waveform transitions to isolate RTL root causes.
---

# RTL Regression Debugger Skill

## Purpose
Accelerates ASIC verification debug by analyzing simulation failure transcripts, scoreboard data mismatches, and signal transition dumps, isolating the exact RTL defect.

## When to Activate
Activate when a verification test fails in VCS, Questa, or Xcelium, or an SVA assertion triggers during regression.

## Required Inputs
- Simulation log / error transcript
- Scoreboard comparison mismatch (Expected vs Actual packet)
- Assertion failure message with timestamp and offending signal states
- Offending RTL module source code

## Step-by-Step Workflow
1. **Failure Symptom Categorization:**
   - Scoreboard payload mismatch (data corruption).
   - Dropped transaction / missing beat.
   - Timeout / Deadlock (hang waiting on handshake).
   - Assertion violation (`assert property` fire).
2. **Temporal Alignment:**
   - Map failure timestamp back to the simulation cycle.
   - Trace backwards from the point of observation to the point of generation.
3. **Root-Cause Hypothesis Formulation:**
   - Counter off-by-one error on buffer read/write pointers.
   - Unregistered control signal causing 1-cycle latency skew.
   - Race condition on reset release.
   - Backpressure hazard (dropping data when valid is high and ready deasserts).
4. **Code Inspection & Diagnosis:**
   - Pinpoint the exact line of SystemVerilog code responsible.
5. **Regression Patch:**
   - Provide minimal-impact code fix and companion SVA assertion to prevent regression.

## Technical Constraints
- Never guess missing waveform values; if critical internal states are unlogged, request specific signal dumps from the engineer.

## Output Format
- **Failure Summary:** Test Name | Time of Failure | Failing Signal/Assert
- **Root-Cause Analysis:** Step-by-step tracing of how the bug occurred.
- **Proposed RTL Fix:** Side-by-side code diff.
- **Recommended Regression Test Scenario:** Testbench stimulus to guarantee closure.

## Validation Checklist
- [ ] Fix resolves the failing corner case without perturbing passing tests.
- [ ] No added latency cycles on existing paths.
- [ ] SVA assertion provided to detect future regressions.

## Example Invocation
```text
/rtl-regression-debugger
Test failed: test_axi_backpressure_random
Log: [paste vcs_sim.log excerpt]
Offending module: [paste axi_skid_buffer.sv]
```
