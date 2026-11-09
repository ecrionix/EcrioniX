---
name: ocv-aocv-pocv-reviewer
description: Audits On-Chip Variation (OCV), Advanced OCV (AOCV), and Parametric OCV (POCV / LVF) derating tables, timing graph depth, and common path pessimism removal (CPPR).
---

# OCV, AOCV & POCV Reviewer Skill

## Purpose
Audits statistical timing derates and on-chip variation configurations in PrimeTime and Tempus, verifying that margin models match foundry signoff guidelines without introducing excessive pessimism.

## Methodology Comparison
- **Traditional OCV:** Applies flat percentage derates (e.g., $+5\%$ late, $-5\%$ early) across the entire chip. Highly pessimistic on deep paths.
- **AOCV (Stage-Based):** Derates vary as a function of logic depth and physical path distance. Deeper logic paths receive lower derates due to statistical averaging.
- **POCV / LVF (Parametric / Liberty Variation Format):** Models delay variation as Gaussian distributions ($C \pm n\sigma$). Each cell delay includes nominal delay plus sensitivity coefficient ($\sigma$).

## Key Audit Checks
1. Verify `set_timing_derate` statements match foundry signoff runsets.
2. Confirm Clock Common Path Pessimism Removal (CPPR / CRPR) is enabled:
   `set_app_var timing_remove_clock_reconvergence_pessimism true`
3. Check POCV sigma threshold setting (typically $3\sigma$).

## Limitations
- Liberty Variation Format (LVF) tables are proprietary foundry IP; Claude analyzes derate commands and reports, not raw cell characterization tables.

## Verification Checklist
- [ ] CPPR enabled and validated in timing reports.
- [ ] POCV derate tables loaded and applied to both data and clock paths.
