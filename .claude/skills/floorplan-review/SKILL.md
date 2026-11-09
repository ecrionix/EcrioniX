---
name: floorplan-review
description: Evaluates ASIC die/core dimensions, aspect ratio, macro placement, halos, pin assignments, blockages, and flylines for routing and timing feasibility.
---

# Floorplan Review Skill for ASIC Physical Design

## Purpose
Performs architectural and physical evaluation of early floorplans, auditing core utilization, aspect ratio, macro orientations, channel spacing, power strap accessibility, and I/O pin feasibility to prevent downstream routing congestion and timing failure.

## When to Activate
Activate during initial die planning, after macro placement exploration, or when evaluating DEF / floorplan Tcl scripts before standard cell placement.

## Required Input Files
- Floorplan DEF (`.def`) or floorplan creation Tcl script (Innovus `create_floorplan` / ICC2 `initialize_floorplan`)
- Macro list and dimensions (SRAMs, ROMs, analog IP, PLLs)
- Top-level I/O pin constraint file or pin placement DEF
- Technology LEF / tech file (metal stack definition, track pitch)

## Step-by-Step Analysis Workflow
1. **Core Utilization & Aspect Ratio Audit:**
   - Verify core utilization ($	ext{Standard Cell Area} / 	ext{Core Area}$) is within target bounds (typically 65%–75% for advanced FinFET nodes).
   - Check aspect ratio ($H/W$) relative to package cavity, I/O ring requirements, and critical timing flylines.
2. **Macro Placement & Orientation Analysis:**
   - Verify macros are pushed toward the chip/block periphery, leaving a contiguous central core for standard cell placement.
   - Audit macro pin orientation: Ensure macro pins face the internal core, not the die boundary or adjacent macro walls.
   - Check macro spacing & halos: Ensure adequate channel width between macros ($W \ge 2 	imes 	ext{Power Strap Width} + 	ext{Routing Pitch}$) to prevent routing bottlenecks.
3. **Channel Congestion & Flyline Evaluation:**
   - Identify narrow channels between macro blocks that act as routing bottlenecks.
   - Check placement blockages (`create_placement_blockage -type hard/halo`) around macro boundaries.
4. **I/O Pin Placement & Power Ring Clearance:**
   - Verify pin distribution matches package bump / bond pad array.
   - Ensure pins are assigned to appropriate metal layers with legal track alignment.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses `planDesign`, `createPlaceBlockage -type soft/hard/halo`, `assignIoPins`.
- **Synopsys ICC2:** Uses `initialize_floorplan -core_utilization`, `create_keepout_margin`, `set_block_pin_constraints`.

## Technical Limitations
- Visual floorplan inspection and script review cannot simulate global routing; always run Innovus `checkFPlan` or ICC2 `check_floorplan` to confirm zero overlaps and legal grid alignment.

## Output Format
- **Floorplan Metrics Scorecard:** Die Dimensions, Core Area, Utilization, Macro Count.
- **Identified Deficiencies & Bottlenecks:** Channel widths, pin orientations, blockage conflicts.
- **Refined Floorplan Tcl Commands:** Exact script fixes for Innovus or ICC2.
- **Validation Checklist:** Pre-placement readiness verification.

## Validation Checklist
- [ ] No macro-to-macro or macro-to-core boundary overlaps.
- [ ] Macro halos defined to prevent standard cell placement in tight channels.
- [ ] Routing tracks align with standard cell row grids.
- [ ] Core utilization accounts for routing and power mesh overhead.

## Example Invocation
```text
/floorplan-review
Tool: Cadence Innovus 22.1
Review this floorplan script for a 4-core SoC with 16 embedded SRAMs:
[paste floorplan.tcl]
```
