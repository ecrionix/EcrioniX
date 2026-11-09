---
name: timing-regression-analyzer
description: Investigates unexpected timing regressions between physical implementation stages (e.g. Post-CTS to Post-Route), tracing degradation to routing parasitics, clock latency shifts, or cell displacement.
---

# Timing Regression Analyzer Skill

## Purpose
Diagnoses why timing closed at an earlier stage (e.g., post-placement or post-CTS) degrades severely after subsequent flow steps (e.g., detailed routing or SPEF signoff extraction).

## Diagnostic Investigation
1. **Parasitic Modeling Shift:** Compare wireload models vs virtual route vs extracted 3D SPEF.
2. **Clock Tree Latency Shift:** Compare ideal clock vs propagated clock network insertion delays.
3. **Crosstalk Delay Injection:** Compare timing slack with SI disabled vs SI enabled.
4. **Physical Displacement:** Check if detailed legalizer or detailed router moved critical path cells.

## Limitations
- Cannot reconstruct physical geometry without DEF and SPEF database inspection in the EDA environment.

## Verification Checklist
- [ ] Parasitic extraction settings matched to signoff specs.
- [ ] Propagated clock timing validated post-CTS.
