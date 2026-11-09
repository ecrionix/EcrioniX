---
name: ir-drop-em-analysis
description: Analyzes static and dynamic voltage drop (IR drop) and electromigration (EM) violation reports from Cadence Voltus and Synopsys RedHawk-SC.
---

# IR Drop & Electromigration (EM) Analysis Skill

## Purpose
Interprets static and dynamic IR drop distributions and signal/power electromigration (EM) reports from signoff power analysis tools (Cadence Voltus, Synopsys RedHawk-SC), identifying power grid starvation and high-current hotspots.

## When to Activate
Activate during post-CTS and post-route power integrity signoff, or when diagnosing voltage drop induced timing failures.

## Required Input Files
- IR drop summary report (Voltus `report_ir_drop` / RedHawk `static_ir_summary`)
- Vectorless or VCD-driven dynamic power analysis configuration
- Supply voltage specifications and allowable drop threshold (e.g., $V_{	ext{drop}} \le 5\% 	imes V_{DD}$)

## Step-by-Step Analysis Workflow
1. **Static vs Dynamic IR Drop Classification:**
   - Static IR Drop: Caused by average DC current flowing through power grid resistance ($V = I_{	ext{avg}} \cdot R_{	ext{grid}}$). Indicates inadequate power straps or missing vias.
   - Dynamic IR Drop: Caused by instantaneous simultaneous switching current ($L \cdot di/dt + I_{	ext{peak}} \cdot R$). Indicates simultaneous clock tree buffer switching or high-activity datapath clusters.
2. **Power Mesh Resistance Mapping:**
   - Trace IR drop contours back to power pad / bump locations. Identify regions far from power bumps with high effective resistance ($R_{	ext{eff}}$).
3. **Electromigration (EM) Violation Audit:**
   - Signal EM: High-frequency clock nets driving high capacitive loads exceeding metal current density limits ($J_{	ext{rms}}, J_{	ext{avg}}$).
   - Power EM: Power stripes feeding large standard cell blocks carrying current exceeding electromigration lifespan thresholds.
4. **Remediation Plan:**
   - Static Fix: Add intermediate power stripes or increase via array density.
   - Dynamic Fix: Insert Decoupling Capacitance (Decap) standard cells adjacent to switching hotspots; stagger clock tree buffer trigger edges.

## Tool-Specific Considerations
- **Cadence Voltus:** Native signoff power integrity solution.
- **Synopsys RedHawk-SC:** Industry standard grid and dynamic IR signoff engine.

## Technical Limitations
- IR drop is highly sensitive to switching activity vectors; vectorless analysis is conservative, while VCD analysis depends strictly on testbench stimulus realism.

## Output Format
- **Power Integrity Scorecard:** Worst Static Drop (mV), Worst Dynamic Drop (mV), EM Violating Nets Count.
- **Hotspot Location Diagnosis:** Correlation with standard cell density and clock buffer trees.
- **Actionable Remediation Prescription:** Decap cell insertion guidelines and power strap reinforcement.

## Validation Checklist
- [ ] Peak dynamic IR drop within foundry voltage margin (typically < 5%–7% of nominal $V_{DD}$).
- [ ] Decap cells placed without causing excessive leakage current penalty.
- [ ] All signal and power metal lines conform to foundry EM limits for 10-year lifetime.

## Example Invocation
```text
/ir-drop-em-analysis
Tool: Cadence Voltus
Nominal VDD: 0.80V (Threshold: 5% = 40mV)
Report: [paste voltus_ir_drop.rpt]
Max Drop: 74mV in logic cluster near SRAM macro
```
