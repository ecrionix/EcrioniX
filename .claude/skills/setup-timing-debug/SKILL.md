---
name: setup-timing-debug
description: Performs root-cause analysis on negative setup slack (WNS/TNS) timing paths in PrimeTime, Tempus, Innovus, and ICC2.
---

# Setup Timing Debug Skill

## Purpose
Performs deep-dive engineering investigation of setup timing violations (max_delay), systematically deconstructing data arrival and required paths, logic depth, cell drive strengths, interconnect parasitics, and clock skew.

## When to Activate
Activate when analyzing post-placement, post-CTS, or post-route setup timing violations with negative slack.

## Required Input Files
- Full timing path report (`report_timing -nosplit -transition_time -capacitance -nets -attributes`)
- Target clock period and SDC constraints (`create_clock`, `set_clock_uncertainty`)
- Library operating corner (e.g., SSG 0.75V 125C worst-case setup corner)

## Step-by-Step Analysis Workflow
1. **Timing Path Topology Identification:**
   - Startpoint: Launch flip-flop, input port, or macro output.
   - Endpoint: Capture flip-flop data pin (D), output port, or macro input.
   - Launch & Capture clock domains and edge relationships (same-edge vs opposite-edge).
2. **Slack Equation Decomposition:**
   - $	ext{Slack} = 	ext{Data Required Time} - 	ext{Data Arrival Time}$.
   - $	ext{Data Arrival} = T_{	ext{launch\_latency}} + T_{	ext{CK}	o	ext{Q}} + T_{	ext{cell\_delay}} + T_{	ext{net\_delay}}$.
   - $	ext{Data Required} = T_{	ext{period}} + T_{	ext{capture\_latency}} - T_{	ext{setup}} - T_{	ext{uncertainty}}$.
3. **Bottleneck Component Isolation:**
   - **Cell vs Net Ratio:** Is delay dominated by cell switching (logic depth) or RC interconnect (long routing net / high capacitance)?
   - **Transition Violations:** Are cell delays inflated due to slow input slew rates?
   - **Drive Strength Sanity:** Are cells undersized (e.g., `X1` or `X2` driving long nets)?
   - **Clock Skew Effect:** Is clock skew hurting or helping slack?
4. **Remediation Strategy Formulation:**
   - Cell Sizing (`size_cell` to `X4`/`X8`).
   - Buffer Insertion (`insert_buffer` to split long resistive nets).
   - Logic Restructuring / Swapping to faster pin paths.
   - Useful Skew: Pushing capture clock latency later (if hold budget permits).

## Tool-Specific Considerations
- **Synopsys PrimeTime:** Uses `report_timing -delay_type max -input_pins`, `get_timing_paths`.
- **Cadence Tempus:** Uses `report_timing -late -view worst_setup`, `report_property`.

## Technical Limitations
- Setup fixes must never be committed without verifying that the changes do not introduce hold timing violations on fast corners (FFG 0.88V -40C).

## Output Format
- **Path Delay Breakdown Table:** Stage | Instance | Cell Type | Slew (ps) | Cap (fF) | Cell Delay | Net Delay | Running Total
- **Root-Cause Diagnosis:** Explicit explanation of what caused the negative slack.
- **Actionable Fix Prescription:** Exact Tcl ECO commands (cell resize, buffer insert, useful skew).
- **Secondary Impact Assessment:** Hold risk, area impact, dynamic power penalty.

## Validation Checklist
- [ ] Transition times at all intermediate nodes comply with max_transition constraints.
- [ ] No unconstrained paths or generated clock definition errors.
- [ ] Suggested cell resizing exists in target technology library.

## Example Invocation
```text
/setup-timing-debug
Tool: Synopsys PrimeTime 2023.12
Corner: SSG 0.675V 125C
Slack: -312ps on 1.25GHz clock
Report: [paste report_timing.rpt]
```
