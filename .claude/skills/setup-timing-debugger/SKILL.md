---
name: setup-timing-debugger
description: Diagnoses negative setup slack (max delay violations) across PVT corners, identifying root causes (deep logic cascades, detoured nets, high transition, clock skew deficits) and formulating precision closure actions.
---

# Setup Timing Debugger Skill

## Purpose
Systematically analyzes negative setup slack ($S_{\text{setup}} = T_{\text{required}} - T_{\text{arrival}} < 0$), determining whether the failure stems from architectural logic depth, weak cell drive strength, interconnect RC delay, clock network latency mismatch, or over-constrained SDC budgets.

## When to Activate
Activate when analyzing setup WNS/TNS regressions after synthesis, placement optimization, CTS, or detailed routing.

## Mathematical Formulation
$$\text{Data Arrival} = T_{\text{launch\_latency}} + T_{\text{CK}\to\text{Q}} + \sum T_{\text{cell}} + \sum T_{\text{net}}$$
$$\text{Data Required} = T_{\text{period}} + T_{\text{capture\_latency}} - T_{\text{setup}} - T_{\text{uncertainty}} + T_{\text{CPPR}}$$
$$\text{Slack}_{\text{setup}} = \text{Data Required} - \text{Data Arrival}$$

## Diagnostic Decision Tree
1. **Is Net Delay > 45% of Data Path Delay?**
   - *Yes:* Placement detour, high routing congestion, or unbuffered long net. Solution: Buffer insertion, layer promotion, or physical cell padding.
2. **Is Logic Depth > 20 levels for 1 GHz+ targets?**
   - *Yes:* Combinational logic cascade too deep. Solution: Architectural pipelining, register retiming, or logic restructuring.
3. **Are Input Transition Times > 120 ps on Critical Pins?**
   - *Yes:* Output driver starvation. Solution: Gate upsizing (e.g. `_X1` $\to$ `_X4`) or buffer insertion.
4. **Is Capture Clock Significantly Earlier than Launch Clock ($\Delta T_{\text{skew}} < -80\,\text{ps}$)?**
   - *Yes:* Clock tree imbalance. Solution: Useful skew scheduling or CTS trunk rebalancing.

## Limitations
- Setup fixes (upsizing, LVT swapping) increase dynamic and leakage power, and can create hold violations at fast/cold corners.

## Verification Checklist
- [ ] Setup slack verified under Slow-Slow-Global (SSG) corner at minimum $V_{DD}$.
- [ ] Proposed cell resizing evaluated against cell footprint compatibility.
- [ ] Downstream hold margin verified at Fast-Fast-Global (FFG) corner.
