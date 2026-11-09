---
name: cts-report-analysis
description: Analyzes Clock Tree Synthesis (CTS) reports, evaluating clock skew, insertion delay, buffer sizing, clock gating setup/hold, and multi-corner clock latency.
---

# Clock Tree Synthesis (CTS) Report Analysis Skill

## Purpose
Diagnoses Clock Tree Synthesis (CTS) execution logs and reports from Cadence Innovus (ccopt) and Synopsys ICC2 (clock_opt), identifying clock skew imbalances, excessive insertion delays, duty-cycle distortion, and clock-gating timing violations.

## When to Activate
Activate after CTS implementation (`ccopt_design` / `clock_opt`) to evaluate clock tree quality before detailed signal routing.

## Required Input Files
- CTS summary report (`report_clock_trees`, `report_ccopt_skew_groups`, `report_clock_tree_summary`)
- Clock specification file / SDC constraints (`create_clock`, `set_clock_uncertainty`, `set_clock_latency`)
- Post-CTS timing report (`report_timing -delay_type min_max`)

## Step-by-Step Analysis Workflow
1. **Clock Skew Decomposition:**
   - Distinguish **Global Skew** (difference between maximum and minimum latency across the entire design) from **Local Skew** (latency difference between communicating flip-flop pairs).
   - Verify local skew is within budget (typically < 5%–10% of clock period).
2. **Insertion Delay & Clock Depth:**
   - Audit maximum insertion delay: Abnormally large insertion delay (> 1.5–2.0 ns on high-speed clocks) exacerbates on-chip variation (OCV) and derate penalties.
   - Check clock tree logic levels (number of buffer stages from root to leaf pins).
3. **Clock Inverter/Buffer Cell Selection:**
   - Ensure CTS strictly uses balanced clock inverters/buffers (`CLKINV_X4`, `CLKBUF_X8`) with symmetrical rise/fall slew rates to prevent duty cycle collapse.
4. **Clock Gating Checks (Integrated Clock Gaters - ICG):**
   - Check enable setup and hold timing on ICG cells (`EN -> CP`).
   - Ensure clock gaters are positioned close to their target load register clusters.
5. **Multi-Corner Clock Latency:**
   - Verify clock skew does not diverge severely between Early (fast/min) and Late (slow/max) timing corners.

## Tool-Specific Considerations
- **Cadence Innovus (CCOpt):** Uses `create_ccopt_clock_tree_spec`, `ccopt_design`, `report_ccopt_clock_trees -summary`.
- **Synopsys ICC2:** Uses `clock_opt`, `report_clock_qor`, `synthesize_clock_trees`.

## Technical Limitations
- Post-CTS timing reports use estimated interconnect routing parasitics; post-route extraction (SPEF) will introduce cross-coupling capacitance.

## Output Format
- **CTS Quality Scorecard:** Clock Name | Target Skew | Actual Skew | Min Latency | Max Latency | ICG Count
- **Root-Cause Anomaly Detection:** Skew outliers, long clock branches, high transition nets.
- **Tcl Optimization Script:** CCOpt / clock_opt constraint refinements (target skew, routing rules NDR).

## Validation Checklist
- [ ] Clock routing assigned to shielded double-width/double-spacing Non-Default Routing (NDR) rules.
- [ ] Local skew between critical timing paths meets SDC uncertainty budget.
- [ ] No regular standard cells mixed into CTS buffer inverter chains.
- [ ] ICG enable setup and hold slacks are positive.

## Example Invocation
```text
/cts-report-analysis
Tool: Cadence Innovus 22.1 (CCOpt)
Target Clock: clk_core (Period = 1.0ns)
Report: [paste report_ccopt_clock_trees.rpt]
```
