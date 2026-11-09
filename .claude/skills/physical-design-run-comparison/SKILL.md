---
name: physical-design-run-comparison
description: Compares multi-run physical design implementation logs and QoR metrics across floorplan, placement, CTS, and routing iterations.
---

# Physical Design Run Comparison Skill

## Purpose
Compares physical implementation metrics across multiple PnR runs, floorplan variants, or synthesis revisions, systematically identifying regressions and improvements in timing (WNS/TNS), area, leakage, wirelength, and congestion.

## When to Activate
Activate when evaluating new floorplan options, testing aggressive optimization flags, or performing regression triage between design revisions.

## Required Input Files
- Run A vs Run B Quality of Results summaries (QoR reports from Innovus or ICC2)
- Timing summaries (WNS, TNS, FEP for setup and hold)
- Physical metrics (Core utilization, total cell count, wirelength, DRC count)

## Step-by-Step Analysis Workflow
1. **Key Metric Extraction:**
   - Timing: Setup WNS/TNS, Hold WNS/TNS, FEP count.
   - Physical: Standard cell area, macro area, total wirelength, via count.
   - DRC & Congestion: Max GRC overflow %, total DRC count.
   - Power: Total dynamic power (switching + internal), leakage power.
2. **Delta Calculation & Trend Analysis:**
   - Calculate exact $\Delta$ values ($	ext{Run B} - 	ext{Run A}$) and percentage shifts.
3. **Regression Root-Cause Isolation:**
   - If timing improved but wirelength and routing DRCs exploded, identify whether over-buffering or cell clustering caused localized congestion.
   - If leakage jumped significantly, check high-drive cell or low-Vt cell substitution rates.
4. **Actionable Go/No-Go Decision:**
   - Synthesize a clear engineering verdict on whether Run B represents a net improvement for the project milestone.

## Tool-Specific Considerations
- Compatible with all major PnR platforms (Cadence Innovus, Synopsys ICC2).

## Technical Limitations
- Metric comparison identifies *what* changed; root-cause diagnosis requires drilling down into specific failing timing paths or congestion hotspot coordinates.

## Output Format
- **Executive Comparison Matrix:** Metric | Run A (Baseline) | Run B (Candidate) | Absolute Delta | % Change | Trend Icon
- **Regression Analysis:** Detailed narrative of trade-offs (e.g., timing gain vs area cost).
- **Go / No-Go Recommendation:** Clear guidance for flow integration.

## Validation Checklist
- [ ] Both runs evaluated under identical SDC constraints and operating corners.
- [ ] Extraction mode and tool versions aligned to prevent apples-to-oranges comparisons.

## Example Invocation
```text
/physical-design-run-comparison
Baseline: Run_42_Base_Floorplan
Candidate: Run_43_Widened_Channel_Floorplan
[paste summary reports for both runs]
```
