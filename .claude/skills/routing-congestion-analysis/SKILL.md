---
name: routing-congestion-analysis
description: Analyzes global routing congestion, detailed routing DRC violations, track utilization, antenna violations, and routing detours in Innovus/ICC2.
---

# Routing & Congestion Analysis Skill

## Purpose
Diagnoses post-route DRC reports and global routing congestion (GRC) maps, categorizing metal shorts, spacing violations, via enclosure failures, antenna effects, and routing detours.

## When to Activate
Activate during or after global and detailed routing (`routeDesign` / `route_auto`) when resolving routing DRC clean-up.

## Required Input Files
- Routing log and summary report (Innovus `routeDesign.log` / ICC2 `route_auto.log`)
- Detailed routing DRC violation report (`checkRoute` / `check_lvs -drc`)
- Metal layer congestion statistics (% track utilization per metal layer)
- Process design rule constraints (LEF minimum area, spacing, notch rules)

## Step-by-Step Analysis Workflow
1. **DRC Violation Categorization:**
   - Parse total violation count into distinct classes: Metal Shorts, Min Spacing, Min Area, Via Overlap, Enclosure, Antenna.
2. **Spatial Hotspot Identification:**
   - Identify whether violations are randomly distributed (easy to fix via search-and-repair) or concentrated in localized clusters (indicates physical unroutable bottleneck).
3. **Layer-by-Layer Track Exhaustion:**
   - Check horizontal vs vertical metal utilization: If M3/M4 track utilization exceeds 90%, signal lines are forced to detour to upper layers, blowing timing.
4. **Antenna Rule Violations:**
   - Identify long metal traces connected directly to gate oxide without diode protection or metal jumpers to upper layers.
5. **Pin Accessibility in Advanced Nodes:**
   - In sub-10nm FinFETs, pin access is heavily constrained by colored EUV grids; verify standard cell pin access issues.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses `routeDesign`, `setNanoRouteMode -drouteFixAntenna true`, `verifyGeometry`, `verifyConnectivity`.
- **Synopsys ICC2:** Uses `route_auto`, `route_detail -incremental true`, `check_routes`.

## Technical Limitations
- Automated routing analysis cannot visually display GDS polygons; physical sign-off DRC requires **Siemens Calibre nmDRC** or **Synopsys IC Validator (ICV)**.

## Output Format
- **DRC Category Breakdown Table:** Rule Name | Layer | Count | Severity | Root Cause
- **Hotspot Remediation Strategy:** Cell spreading, placement blockage widening, layer promotion.
- **Tcl Repair Directives:** Search-and-repair script commands and antenna diode insertion.

## Validation Checklist
- [ ] Zero metal shorts and zero open nets in design.
- [ ] Antenna violations eliminated via layer jumpers or reverse-biased diodes.
- [ ] Critical timing nets have direct routes without excessive serpentine detours.

## Example Invocation
```text
/routing-congestion-analysis
Tool: Cadence Innovus NanoRoute
Report: [paste verifyGeometry.rpt summary]
Total DRCs: 2,410 violations (mostly M2 spacing and Via1 enclosure)
```
