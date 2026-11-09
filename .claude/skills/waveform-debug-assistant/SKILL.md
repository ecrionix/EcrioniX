---
name: waveform-debug-assistant
description: Guides root-cause debugging of simulation waveform traces (VCD, FSDB), log files, signal timing anomalies, and unexpected X-propagation.
---

# Waveform Debug Assistant Skill

## Purpose
Helps engineers trace waveform glitches, unknown logic states (`X` or `Z`), handshake deadlocks, and transaction mismatches from signal dump descriptions, value change dump (VCD) excerpts, and simulator logs.

## Step-by-Step Debugging Workflow
1. **Symptom Characterization:**
   - Timestamp of failure, exact signal name, expected vs observed logic state.
2. **Backwards Causal Tracing:**
   - Identify the driving gate or procedural block driving the failing signal.
   - Trace back one clock cycle ($T - 1$) to evaluate input states and control enables.
3. **X-Propagation Root Cause:**
   - Differentiate uninitialized registers on reset vs bus contention (multiple active drivers) vs timing violations in gate-level simulation.
4. **Protocol Handshake Lockup:**
   - Check if master waits for slave `READY`, while slave waits for master `VALID` (circular combinational dependency).

## Limitations
- Claude cannot view graphical waveform viewers directly. The user must provide signal state transitions, ASCII waveforms, or simulator trace logs.

## Verification Checklist
- [ ] Driving procedural block identified.
- [ ] Reset assertion and deassertion timing verified.
