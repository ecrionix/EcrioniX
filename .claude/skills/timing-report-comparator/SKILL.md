---
name: timing-report-comparator
description: Compares two timing reports (pre-ECO vs post-ECO, or Run A vs Run B), isolating regressions, fixed paths, and net WNS/TNS changes.
---

# Timing Report Comparator Skill

## Purpose
Performs side-by-side delta analysis between two timing report runs, flagging which paths improved, which regressed, and calculating exact WNS/TNS shifts across implementation milestones.

## Metric Deltas Computed
- $\Delta\text{WNS} = \text{WNS}_{\text{Run B}} - \text{WNS}_{\text{Run A}}$
- $\Delta\text{TNS} = \text{TNS}_{\text{Run B}} - \text{TNS}_{\text{Run A}}$
- $\Delta\text{NVP} = \text{Violating Count}_{\text{Run B}} - \text{Violating Count}_{\text{Run A}}$
- Endpoint-by-endpoint correlation: Identifies newly violating endpoints that were previously meeting timing.

## Limitations
- Requires both reports to be generated under identical SDC constraints and operating corners to prevent false regression flags.

## Verification Checklist
- [ ] Consistent corner comparison verified.
- [ ] Zero un-tracked regressions introduced.
