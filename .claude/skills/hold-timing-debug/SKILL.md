---
name: hold-timing-debug
description: Diagnoses and remediates hold timing violations (min_delay) across fast PVT corners without degrading setup slack or inducing congestion.
---

# Hold Timing Debug Skill

## Purpose
Investigates hold timing violations (min_delay), ensuring fast data paths cannot overwrite sequential flip-flop states before the required hold window elapses, prioritizing fixes at fast PVT corners.

## When to Activate
Activate during post-CTS and post-route timing closure, specifically when running STA on fast/hold corners (e.g., FFG 0.88V -40C).

## Required Input Files
- Hold timing path report (`report_timing -delay_type min -nosplit -transition_time -nets`)
- Library operating corner (e.g., FFG / Cbest / -40C fast corner)
- SDC hold uncertainty constraints (`set_clock_uncertainty -hold`)

## Step-by-Step Analysis Workflow
1. **Hold Equation Decomposition:**
   - $	ext{Slack}_{	ext{hold}} = 	ext{Data Arrival Time} - 	ext{Data Required Time}$.
   - $	ext{Data Arrival} = T_{	ext{launch\_latency}} + T_{	ext{CK}	o	ext{Q}} + T_{	ext{combinational\_min}}$.
   - $	ext{Data Required} = T_{	ext{capture\_latency}} + T_{	ext{hold}} + T_{	ext{hold\_uncertainty}}$.
   - Hold violations occur when data arrives *too quickly* ($	ext{Slack} < 0$).
2. **Root-Cause Identification:**
   - Zero logic depth: Direct flip-flop to flip-flop connections (`Q -> D`).
   - Clock skew anomaly: Capture clock arriving much later than launch clock due to CTS branch imbalance or long ICG insertion delay.
   - Corner disparity: Cell switching ultra-fast at cold temperatures (-40C) and high voltage.
3. **Remediation Strategy:**
   - Delay Buffer Insertion: Insert standard hold-fixing delay cells (e.g., `DLY1_X1`, `DLY2_X1`).
   - Placement Proximity Check: Ensure hold delay buffers are placed physically close to the capture flip-flop.
   - Setup Cross-Check: Mandate that inserting hold buffers does not turn positive setup slack negative on the worst-case slow setup corner!

## Tool-Specific Considerations
- **Synopsys PrimeTime:** Uses `fix_eco_timing -type hold -methods {insert_buffer}`.
- **Cadence Innovus:** Uses `optDesign -postRoute -hold`.

## Technical Limitations
- Indiscriminate hold buffer insertion causes standard cell density inflation and routing congestion; always prioritize high-resistance delay buffers on non-critical setup nets.

## Output Format
- **Hold Path Deconstruction:** Launch Latency, Capture Latency, Min Data Delay, Slack.
- **Buffer Insertion Plan:** Target net, proposed delay cell type, estimated delay addition.
- **Setup Hazard Safeguard:** Verification that setup margin on slow corner absorbs the added delay.

## Validation Checklist
- [ ] Hold verified on fast corner (FFG / Cbest / -40C).
- [ ] No hold buffers inserted on nets that are setup critical on slow corner (SSG / Cworst / 125C).
- [ ] Delay cell leakage power conforms to total power budget.

## Example Invocation
```text
/hold-timing-debug
Corner: FFG 0.88V -40C
Slack: -85ps WNS
Path: Direct register-to-register shift register path
Report: [paste report_timing_min.rpt]
```
