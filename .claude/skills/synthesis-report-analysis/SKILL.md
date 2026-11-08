---
name: synthesis-report-analysis
description: Interprets Cadence Genus and Synopsys Design Compiler synthesis reports (QoR, area, gate count, cell distribution) and guides RTL optimization.
---

# Synthesis Report Analysis Skill

## Purpose
Diagnoses post-synthesis QoR (Quality of Results) reports from Synopsys Design Compiler (`dc_shell`) and Cadence Genus Synthesis Solution, mapping gate-level bottlenecks back to RTL microarchitecture.

## When to Activate
Activate when analyzing synthesis logs, area breakdowns, high-gate-count modules, or cell utilization reports.

## Required Inputs
- Synthesis report text (e.g., `report_qor`, `report_area -hierarchy`, `report_gates`)
- Tool identity (Synopsys DC vs Cadence Genus)
- Target technology node and cell library (e.g., TSMC N5, GF 22FDX, SkyWater 130)
- Associated SystemVerilog RTL source code

## Step-by-Step Workflow
1. **Metrics Extraction:**
   - Extract Total Cell Area, Sequential Area, Inverter/Buffer Area, Combinational Area.
   - Check macro count (RAMs, ROMs, PLLs) vs standard cell logic.
2. **Sequential vs Combinational Ratio Analysis:**
   - Identify abnormally high flop-to-combinational ratios (potential over-pipelining or bloated register files).
   - Identify excessive combinational logic per flop (insufficient pipelining).
3. **Logic Structure Diagnosis:**
   - Detect bloated arithmetic units: Look for multi-bit dividers, unshared multipliers, or 64-bit adders mapped to generic ripple-carry logic.
   - Detect huge multiplexer trees: Large case statements or dynamic bus multiplexers causing area explosion.
4. **Cell Type Breakdown:**
   - Identify excessive inverter/buffer count indicating severe fanout or long design rules.
   - Check high-drive cell utilization (potential dynamic power and area penalty).
5. **Formulate RTL Microarchitecture Action Plan:**
   - Provide concrete RTL refactoring strategies (operator sharing, state encoding, mux restructuring).

## Technical Constraints
- Never modify functional behavior when recommending area-reduction transformations.
- Acknowledge difference between wireload-model synthesis and physical synthesis (e.g., DC-Topo / Genus iSpatial).

## Output Format
- **Synthesis Summary Scorecard:** Area, Instances, Flop Count, Combinational Depth.
- **Hotspot Hierarchy Table:** Modules ranked by area contribution percentage.
- **Root-Cause RTL Assessment:** Specific lines of code causing cell bloat.
- **Actionable Optimization Recommendations:** Code diffs for resource sharing and mux pruning.

## Validation Checklist
- [ ] Area numbers properly categorized by standard cell vs macro.
- [ ] RTL modifications preserve clock-cycle latency and protocol contracts.
- [ ] Synthesis constraints (operating condition, wireload model) accounted for.

## Example Invocation
```text
/synthesis-report-analysis
Tool: Synopsys Design Compiler 2022.12
Report: [paste report_area.rpt]
RTL: [paste crypto_engine.sv]
```
