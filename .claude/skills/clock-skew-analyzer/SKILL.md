---
name: clock-skew-analyzer
description: Analyzes clock network latency, global skew, local skew, and useful skew scheduling between synchronous register pairs.
---

# Clock Skew Analyzer Skill

## Purpose
Evaluates post-CTS and post-route clock latency reports, distinguishing between harmless global skew across non-communicating blocks and dangerous local skew between synchronous launch-capture register pairs.

## Analysis Workflow
1. **Global Skew Evaluation:**
   - $\text{Global Skew} = \max(T_{\text{latency}}) - \min(T_{\text{latency}})$ across the entire clock tree.
   - Assess if tree balancing effort is within reasonable limits ($< 150\,\text{ps}$ for FinFET nodes).
2. **Local Skew Investigation:**
   - For communicating flip-flops: $\Delta T_{\text{local\_skew}} = T_{\text{capture\_latency}} - T_{\text{launch\_latency}}$.
   - Negative local skew ($T_{\text{capture}} < T_{\text{launch}}$) reduces available setup time.
   - Positive local skew ($T_{\text{capture}} > T_{\text{launch}}$) degrades hold margin.
3. **Useful Skew Verification:**
   - Audit whether EDA tool useful skew scheduling (e.g. Innovus CCOpt) has excessively delayed capture clocks, creating downstream hold traps.

## Limitations
- Clock latency values depend on extracted clock tree parasitic accuracy; pre-CTS estimations are purely speculative.

## Verification Checklist
- [ ] Local skew between critical communicating registers $< 40\,\text{ps}$.
- [ ] Clock buffers balanced symmetrically in technology library.
