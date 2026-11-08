---
name: timing-report-analysis
description: Analyzes setup and hold static timing analysis (STA) path reports from Synopsys PrimeTime, Design Compiler, or Cadence Genus/Tempus to guide RTL path remediation.
---

# Timing Report Analysis Skill

## Purpose
Decodes complex Static Timing Analysis (STA) critical path reports, isolates data-arrival bottlenecks, and formulates RTL-level architectural timing closure strategies.

## When to Activate
Activate when an engineer has negative slack (WNS/TNS) in setup (`max_delay`) or hold (`min_delay`) paths post-synthesis or post-place-and-route.

## Required Inputs
- STA Timing Report snippet (`report_timing -nosplit -transition_time -nets -attributes`)
- Clock period and operating corner (e.g., SSG 0.675V -40C, TT 0.8V 25C)
- RTL module source code corresponding to the failing timing path

## Step-by-Step Workflow
1. **Slack & Constraint Extraction:**
   - Identify WNS (Worst Negative Slack), clock period, required time, arrival time, clock uncertainty.
2. **Path Topology Deconstruction:**
   - Trace Startpoint (launch flip-flop `CK -> Q`), Combinational Path, and Endpoint (capture flip-flop `D`).
   - Check clock skew between launch clock path and capture clock path.
3. **Delay Component Breakdown:**
   - Calculate Cell Delay vs Net (Interconnect) Delay percentage.
   - Count logic depth (number of gates between launch and capture).
   - Identify High Fanout Nets (HFN) on the datapath.
4. **Identify RTL Timing Antipatterns:**
   - Cascaded priority encoders (`if-else` chains on wide buses).
   - Deep arithmetic operations (e.g., adder followed by comparator followed by shifter in single cycle).
   - Wide multi-bit multiplexers before register input.
5. **Remediation Strategy Formulation:**
   - Recommend targeted RTL transformations: Pipelining (register retiming), Shannon decomposition, parallel prefix restructuring, or pre-decoding control signals.

## Technical Constraints
- Never change cycle latency without architectural permission. If a pipeline stage cannot be added, focus on logic flattening and balancing.

## Output Format
- **Path Breakdown Table:** Stage | Cell Type | Fanout | Cell Delay | Net Delay | Cumulative
- **Bottleneck Diagnosis:** Pinpoint the exact RTL expression consuming excessive delay.
- **RTL Refactoring Solution:** Code replacement with flattened logic or balanced multiplexing.
- **Downstream Tool Recommendations:** Directives for synthesis (e.g., grouping, path priority).

## Validation Checklist
- [ ] Logic depth verified against clock period budget (rule of thumb: ~25-30 FO4 per ns).
- [ ] Clock skew identified as either helping or hurting slack.
- [ ] Solution does not break cycle-by-cycle interface contracts.

## Example Invocation
```text
/timing-report-analysis
Clock Period: 1.0 ns (1 GHz target)
Slack: -240 ps WNS
Report: [paste report_timing.rpt]
RTL: [paste packet_parser.sv]
```
