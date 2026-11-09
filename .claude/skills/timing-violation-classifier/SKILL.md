---
name: timing-violation-classifier
description: Categorizes thousands of timing violations into actionable buckets (logic depth, fanout, net detour, clock skew, constraint error, crosstalk) for systematic triage.
---

# Timing Violation Classifier Skill

## Purpose
Automates the classification of large-scale timing violation logs into discrete engineering categories, allowing team leads to assign specific paths to RTL designers, physical design engineers, or constraint owners.

## Classification Taxonomy
1. **Type A: Deep Logic Cascade** ($\text{Logic Levels} > 16$, Cell Delay $> 65\%$). Action: RTL designer logic restructuring or pipelining.
2. **Type B: Interconnect Detour** ($\text{Net Delay} > 45\%$). Action: Physical placement bound or buffer insertion.
3. **Type C: High Fanout Starvation** ($\text{Fanout} > 20$, Transition $> 120\,\text{ps}$). Action: Buffer tree synthesis.
4. **Type D: Clock Skew Deficit** ($T_{\text{skew}} < -100\,\text{ps}$). Action: CTS rebalancing.
5. **Type E: SDC Constraint Error** (Illegal I/O budget or false path omission). Action: SDC update.
6. **Type F: Crosstalk Delay Injection** ($\Delta T_{\text{SI}} > 80\,\text{ps}$). Action: Shielding or driver sizing.

## Expected Output
- Ranked breakdown table with violation count and percentage per category.
- Automated assignment recommendations.

## Limitations
- Rule-based heuristics require representative timing reports with net and transition reporting enabled.

## Verification Checklist
- [ ] All violating paths accounted for in categorization table.
- [ ] Root causes validated with sample path spot checks.
