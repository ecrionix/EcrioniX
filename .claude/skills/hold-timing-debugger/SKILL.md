---
name: hold-timing-debugger
description: Diagnoses min-delay hold violations across fast/cold corners, evaluating short data paths, excessive positive clock skew, and prescribing safe delay buffer insertions that do not degrade setup slack.
---

# Hold Timing Debugger Skill

## Purpose
Investigates hold timing violations ($S_{\text{hold}} = T_{\text{arrival}} - T_{\text{required}} < 0$), ensuring data remains stable past the active capture clock edge to prevent race conditions and functional latch-up.

## Mathematical Formulation
$$\text{Data Arrival} = T_{\text{launch\_latency}} + T_{\text{CK}\to\text{Q}} + T_{\text{comb\_min}} + T_{\text{net\_min}}$$
$$\text{Data Required} = T_{\text{capture\_latency}} + T_{\text{hold}} + T_{\text{uncertainty}} - T_{\text{CPPR}}$$
$$\text{Slack}_{\text{hold}} = \text{Data Arrival} - \text{Data Required}$$

## Step-by-Step Analysis Workflow
1. **Corner Verification:** Confirm report is from Fast-Fast-Global (FFG) or Fast-Cold (0.85V, -40C / 125C) corner where silicon propagation is fastest.
2. **Data Path Inspection:** Measure logic depth. Many hold failures occur on shift registers, scan chains, or pipeline stages with 0 combinational gates between launch Q and capture D.
3. **Clock Skew Evaluation:** Check if capture clock latency exceeds launch clock latency ($\Delta T_{\text{skew}} = T_{\text{capture}} - T_{\text{launch}} > 0$). Excessive positive skew eats into the hold budget.
4. **Buffer Insertion Strategy:**
   - Select non-inverting delay buffers (`CLKBUF_X1`, `DELAY_X2`).
   - Place delay buffers physically close to the capture register D pin to minimize routing disruption.
   - Verify that adding delay does not turn a positive setup slack path negative at the slow corner.

## Limitations
- Adding excessive hold buffers increases standard cell density and dynamic switching power. Hold fixes must never be committed without multi-corner setup verification.

## Verification Checklist
- [ ] Hold analysis executed with on-chip variation derates and CPPR enabled.
- [ ] Setup slack margin confirmed $\ge T_{\text{inserted\_delay}} + 30\,\text{ps}$ at worst setup corner.
- [ ] Delay buffer footprint exists in standard cell target library.
