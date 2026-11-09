---
name: clock-tree-timing-reviewer
description: Reviews clock tree synthesis results, buffer depth, duty-cycle distortion, transition times on clock nets, and Integrated Clock Gating (ICG) enable timing.
---

# Clock Tree Timing Reviewer Skill

## Purpose
Reviews clock network topology reports, assessing buffer cascade depth, driver transition targets, clock duty cycle preservation, and ICG cell placement proximity to prevent setup violations on gating pins.

## Key Metrics Evaluated
1. **Buffer Depth & Level Balancing:**
   - Flag paths where clock buffer levels exceed 8–10 stages.
   - Check level mismatches between adjacent floorplan partitions.
2. **Clock Slew / Transition Times:**
   - Verify clock net transition times meet tight high-frequency limits ($T_{\text{trans}} \le 60\text{--}80\,\text{ps}$).
3. **Integrated Clock Gating (ICG) Timing:**
   - Audit setup and hold timing on ICG `E` (enable) pins.
   - Ensure ICG cells are placed close to sink registers to avoid clock latency divergence.

## Limitations
- Cannot alter clock routing topologies directly; requires feeding Tcl properties to CTS engines.

## Verification Checklist
- [ ] ICG enable setup slack $> 50\,\text{ps}$ across all corners.
- [ ] Clock buffer cells selected exclusively from symmetric balanced clock library variants.
