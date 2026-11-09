---
name: sta-report-analysis
description: Decodes multi-corner, multi-mode (MCMM) Static Timing Analysis reports from Synopsys PrimeTime and Cadence Tempus, extracting WNS, TNS, and FEP.
---

# Static Timing Analysis (STA) Report Analysis Skill

## Purpose
Interprets comprehensive Multi-Corner Multi-Mode (MCMM) Static Timing Analysis summaries, analyzing Worst Negative Slack (WNS), Total Negative Slack (TNS), Failing Endpoints (FEP), and Design Rule Constraints (DRC) across all operating modes and process corners.

## When to Activate
Activate during timing closure milestones, tapeout readiness reviews, or signoff analysis.

## Required Input Files
- Global timing summary report (PrimeTime `report_qor` / Tempus `report_summary`)
- Multi-corner slack matrix (SSG, TT, FFG across Functional, Scan, BIST modes)
- DRC violation summary (Max Transition, Max Capacitance, Max Fanout)

## Step-by-Step Analysis Workflow
1. **MCMM Scorecard Compilation:**
   - Extract WNS, TNS, FEP, and Violating Paths for each active scenario (`mode.corner`).
2. **Dominant Corner & Mode Isolation:**
   - Identify whether timing violations are concentrated in a specific scenario (e.g., Functional.SSG_0p675v_125c vs ScanShift.FFG_0p88v_m40c).
3. **Design Rule Constraint (DRC) Audit:**
   - Check Max Transition violations: Slow edge rates increase cell delay and degrade noise margins.
   - Check Max Capacitance violations: Overdriven nets cause excessive dynamic power and reliability risks.
4. **Endpoint Clustering Analysis:**
   - Group failing endpoints by hierarchy/module to detect systematic architectural timing bottlenecks.

## Tool-Specific Considerations
- **Synopsys PrimeTime:** Uses `report_qor`, `report_constraint -all_violators`, `report_analysis_coverage`.
- **Cadence Tempus:** Uses `report_timing_summary`, `report_analysis_views`.

## Technical Limitations
- STA reports reflect static mathematical calculations based on SDC constraints; unconstrained or incorrectly false-pathed nets will not appear as violations.

## Output Format
- **MCMM Scenario Summary Matrix:** Mode | Corner | Setup WNS | Setup TNS | Hold WNS | Hold TNS | Max Tran Violators
- **Top 5 Bottleneck Modules:** Ranked by failing endpoint density.
- **Prioritized Action Plan:** Recommended optimization passes for ECO closure.

## Validation Checklist
- [ ] All clock domains and cross-domain paths analyzed.
- [ ] 100% timing path coverage (no unconstrained registers).
- [ ] SDC constraints verified clean via `check_timing`.

## Example Invocation
```text
/sta-report-analysis
Tool: Synopsys PrimeTime 2023.12
Report: [paste report_qor across 8 active corners]
```
