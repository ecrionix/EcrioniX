---
name: sta-report-analyzer
description: Parses full clock-expanded PrimeTime and Tempus STA reports to break down data arrival, required time, cell delay vs net delay, and identify the root cause of timing violations.
---

# STA Report Analyzer Skill

## Purpose
Performs deep structural dissection of Synopsys PrimeTime or Cadence Tempus timing reports (`report_timing -significant_digits 4 -net -capacitance -transition_time -input_pins`), separating launch clock latency, CK-to-Q delay, combinational logic delay, interconnect RC delay, capture clock latency, and clock uncertainty.

## When to Activate
Activate when evaluating any `.tarpt` or `.rpt` timing path with negative slack, or when conducting post-synthesis, post-CTS, or post-route timing reviews.

## Required Input Files
- Detailed path report (`report_timing -delay_type max/min -max_paths 1 -input_pins -nets -capacitance -transition_time`)
- Standard cell library PVT corner context (e.g., SSG 0.65V -40C or FFG 0.85V 125C)
- SDC clock frequency and clock uncertainty definitions

## Step-by-Step Analysis Workflow
1. **Header & Context Verification:**
   - Extract Startpoint, Endpoint, Path Group, Path Type (max/min), and Corner.
   - Verify whether the path is register-to-register, input-to-register, register-to-output, or feedthrough.
2. **Clock Tree Breakdown:**
   - Calculate Launch Clock Latency ($T_{\text{launch}}$) and Capture Clock Latency ($T_{\text{capture}}$).
   - Compute Clock Skew ($\Delta T_{\text{skew}} = T_{\text{capture}} - T_{\text{launch}}$ for setup; opposite for hold).
   - Check Clock Uncertainty ($T_{\text{uncert}}$) and CPPR/CRPR credit.
3. **Data Path Delay Decomposition:**
   - Separate Launch Flip-Flop $T_{\text{CK}\to\text{Q}}$.
   - Sum combinational cell delays ($\sum T_{\text{cell}}$).
   - Sum interconnect net delays ($\sum T_{\text{net}}$).
   - Calculate **Cell-to-Net Delay Ratio**: $\frac{\sum T_{\text{net}}}{T_{\text{datapath}}} \times 100\%$.
4. **Bottleneck Cell & Net Pinpointing:**
   - Identify nets with excessive transition time ($T_{\text{trans}} > 100\,\text{ps}$) or high capacitive loading ($C_{\text{load}} > 30\,\text{fF}$).
   - Flag high-fanout nets ($\text{Fanout} > 16$) or physical placement detours.
   - Flag weak drive strength cells (e.g., `_X1` or `_X0.5`) in the critical logic cone.

## Example Input
```text
  Startpoint: u_core/u_alu/r_operand_a_reg_15/CLK (DFCNQD1)
  Endpoint:   u_core/u_alu/r_result_reg_31/D (DFCNQD1)
  Path Group: CLK_CORE
  Path Type:  max
  Data Arrival Time: 1.482 ns
  Data Required Time: 1.250 ns
  Slack: -0.232 ns (VIOLATED)
  Net Delay on n_alu_carry: 0.310 ns (fanout=24)
```

## Expected Output
- **Path Summary Matrix:** Startpoint, Endpoint, Slack, Corner, Clock Skew, Logic Depth.
- **Delay Ratio Analysis:** Cell Delay % vs Net Delay %.
- **Bottleneck Hierarchy:** Top 3 gates/nets causing > 60% of data path delay.
- **Prescribed ECO Tactics:** Buffer insertion, cell upsizing, or Vt swapping.

## Limitations
- Claude cannot calculate SPICE non-linear delay tables or 3D field extraction parasitics. All recommended delay reductions are engineering estimates; PrimeTime/Tempus signoff is mandatory.

## Verification Checklist
- [ ] Clock period and uncertainty validated against golden SDC.
- [ ] Transition times checked against library max_transition limits.
- [ ] ECO sizing does not induce new hold violations or max-capacitance violations.
