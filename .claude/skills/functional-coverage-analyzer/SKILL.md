---
name: functional-coverage-analyzer
description: Evaluates SystemVerilog covergroups, coverpoints, cross coverage, and coverage reports to identify coverage holes, redundant bins, and prescribe missing test scenarios.
---

# Functional Coverage Analyzer Skill

## Purpose
Analyzes functional coverage models and simulation coverage transcripts (`urgReport`, `imc`, `coverage.rpt`), identifying un-exercised corner cases, missing cross-products, and illegal bin definitions.

## Key Audit Focus Areas
1. **Covergroup Structure:**
   - Verify sampling event (e.g. `@(posedge clk)` or explicit `sample()` method called from monitor).
   - Check option settings: `option.per_instance = 1;`, `option.goal = 100;`.
2. **Bin Quality & Density:**
   - Flag auto-generated bins on wide 32-bit variables (`auto[64]` creates superficial 64 bins across 4 billion values).
   - Ensure explicit bins target boundary values: 0, 1, max-1, max, power-of-two boundaries.
3. **Cross Coverage Feasibility:**
   - Review `cross` definitions. Check `ignore_bins` to filter out physically impossible combinations that prevent reaching 100% coverage closure.
4. **Transition Coverage:**
   - Verify state transitions: `bins b_idle2active = (IDLE => ACTIVE => EXEC);`.

## Limitations
- High coverage percentages do not prove RTL correctness if coverpoints fail to observe DUT output reactions. Claude distinguishes stimulus coverage from response coverage.

## Verification Checklist
- [ ] All coverpoints have dedicated engineering intent.
- [ ] Impossible operational modes filtered with `ignore_bins`.
- [ ] Explicit sampling call verified in passive UVM monitor.
