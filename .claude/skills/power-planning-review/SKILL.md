---
name: power-planning-review
description: Audits ASIC power distribution networks (PDN), power rings, stripes, rails, vias, and power domain meshes for static/dynamic IR drop and EM compliance.
---

# Power Planning Review Skill

## Purpose
Analyzes ASIC Power Distribution Networks (PDN), verifying metal layer stack allocation, ring/stripe pitch, standard cell power rail connections, via arrays, and voltage domain isolation to prevent static IR drop and electromigration (EM) failures.

## When to Activate
Activate after macro placement and initial floorplanning, before standard cell placement, or when debugging power grid synthesis scripts.

## Required Input Files
- Power planning Tcl script (Innovus `addRing`, `addStripe` / ICC2 `create_pg_mesh`, `create_pg_std_cell_conn`)
- Technology LEF / Tech file (Metal layer sheet resistance $R_s$, max current density $J_{\max}$)
- Power domain specifications and supply voltages ($V_{DD}$, $V_{SS}$, multi-voltage rails)
- Early power budget estimates (Worst-case dynamic and leakage power)

## Step-by-Step Analysis Workflow
1. **Metal Stack Layer Allocation:**
   - Ensure top thick metals (e.g., M8/M9 or AP) carry global power distribution stripes to minimize $I \cdot R$ loss ($R_{	ext{thick}} \ll R_{	ext{thin}}$).
   - Verify intermediate metals (M4–M7) carry regional distribution stripes orthogonal to top metals.
   - Ensure bottom thin metal (M1) is strictly reserved for standard cell followpins/rails.
2. **Power Stripe Pitch & Width Calculation:**
   - Calculate stripe resistance: $R = R_s 	imes (L / W)$.
   - Verify grid density: Target PG metal utilization between 15% and 25% per routing layer to leave adequate tracks for signal routing.
3. **Standard Cell Rail & Via Array Integrity:**
   - Verify M1 rail width matches standard cell height pitch.
   - Confirm dense via arrays (stacked vias from top metal down to M1) are inserted at every orthogonal strap intersection.
4. **Power Domain & Voltage Area Isolation:**
   - Ensure separate power domains have independent PG meshes with dedicated boundary spacing.
   - Audit power switch cell (headswitch/footswitch) daisy chain and control grid connections.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses `addRing`, `addStripe`, `sroute -connect {corePin padPin blockPin}`, `verifyPowerVia`.
- **Synopsys ICC2:** Uses `create_pg_mesh_pattern`, `set_pg_strategy`, `compile_pg`.

## Technical Limitations
- Claude cannot solve finite-element linear resistor matrices; quantitative static/dynamic IR drop and EM signoff require **Cadence Voltus** or **Synopsys RedHawk-SC**.

## Output Format
- **PDN Topology Summary:** Metal Layer | Direction | Width | Pitch | Resistance/um
- **Congestion vs IR Drop Assessment:** Trade-off analysis of PG blockage on signal routing.
- **Optimized Power Script:** Hardened Tcl script for grid construction.
- **Signoff Prerequisite Checklist:** Verification directives for Voltus / RedHawk.

## Validation Checklist
- [ ] Top metals carry primary global power currents.
- [ ] Via arrays placed at all strap intersections without DRC errors.
- [ ] Standard cell followpins continuously connected across rows.
- [ ] Sufficient routing resources remain for signal routing.

## Example Invocation
```text
/power-planning-review
Technology: TSMC N7
Voltages: VDD = 0.75V, VSS = 0.0V
Review this Innovus power mesh script for static IR drop feasibility:
[paste power_plan.tcl]
```
