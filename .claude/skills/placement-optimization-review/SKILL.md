---
name: placement-optimization-review
description: Evaluates global and detailed placement, density maps, cell spreading, timing-driven optimization, and high-fanout net buffering in Innovus/ICC2.
---

# Placement Optimization Review Skill

## Purpose
Inspects post-placement Quality of Results (QoR), evaluating cell density distributions, global routing congestion maps, setup timing WNS/TNS, high-fanout nets (HFN), and scan-chain ordering before clock tree synthesis.

## When to Activate
Activate immediately after global/detailed placement and pre-CTS timing optimization (`place_opt_design` / `place_opt`).

## Required Input Files
- Placement log file (Innovus `place_opt_design.log` / ICC2 `place_opt.log`)
- Pre-CTS timing summary report (`report_timing -max_paths 50`)
- Global routing congestion summary / GRC report
- High-fanout net report (`report_net -min_fanout 32`)

## Step-by-Step Analysis Workflow
1. **Placement Density & Spreading Audit:**
   - Check local density hotspots: Identify regions where standard cell density exceeds 85%, which triggers detailed routing DRC explosion.
   - Recommend density bounds (`set_placement_status`, `create_density_constraint`).
2. **Congestion-Driven Placement Check:**
   - Inspect overflow metrics: Total Overflow (TOF) and Max Overflow (MOF).
   - If GRC overflow > 1.5%, identify whether root cause is macro proximity, pin clustering, or wide bus crossings.
3. **Timing-Driven Placement & Critical Path Clustering:**
   - Review pre-CTS WNS and TNS: Verify that launch/capture flip-flops on critical timing paths are physically clustered close together.
   - Detect long flylines on unbuffered high-fanout control nets.
4. **Buffer Insertion & Cell Sizing Sanity:**
   - Audit buffer explosion: Ensure the placement tool hasn't inserted tens of thousands of tiny delay buffers to fix timing in heavily congested channels.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses `place_opt_design`, `setPlaceMode -congEffort high -timingEffort high`, `reportCongestion`.
- **Synopsys ICC2:** Uses `place_opt`, `set_app_options -name place.coarse.congestion_driven_max_util`, `report_congestion`.

## Technical Limitations
- Pre-CTS timing reports use ideal clock trees (zero insertion delay and zero skew); final timing depends on post-CTS clock skew synthesis.

## Output Format
- **Placement QoR Scorecard:** Total Cell Count, Max Density %, GRC Overflow %, Pre-CTS WNS/TNS.
- **Congestion & Timing Bottleneck Diagnosis:** Root cause of localized placement clusters.
- **Tcl Tuning Directives:** Tool commands to adjust cell padding, density limits, or net weights.

## Validation Checklist
- [ ] No legalizer cell overlaps (`checkPlace` clean).
- [ ] GRC overflow below 1.0% in all directions (H and V).
- [ ] High-fanout reset and scan nets properly identified and deferred to CTS.
- [ ] Critical path logic depth aligned with physical placement distance.

## Example Invocation
```text
/placement-optimization-review
Tool: Synopsys ICC2
Log: [paste place_opt.log summary]
Timing: Pre-CTS WNS = -420ps on 1.0ns clock
```
