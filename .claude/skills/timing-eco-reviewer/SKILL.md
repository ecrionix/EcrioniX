---
name: timing-eco-reviewer
description: Evaluates Engineering Change Order (ECO) scripts for timing closure, verifying cell sizing legality, buffer insertion site feasibility, and multi-corner side effect immunity.
---

# Timing ECO Reviewer Skill

## Purpose
Performs pre-commit audits of PrimeTime or Tempus ECO Tcl scripts (`size_cell`, `insert_buffer`, `swap_cell`), ensuring proposed fixes solve target violations without degrading hold timing, violating design rules (DRVs), or inducing routing congestion.

## Audit Workflow
1. **Footprint & Cell Legality:** Verify replacement cells share identical footprint and pinout with original instances.
2. **Setup vs Hold Trade-Off:** Verify that upsizing drivers or inserting LVT cells on setup-critical paths does not create hold violations at the fast corner.
3. **DRV Impact:** Ensure buffer insertions do not exceed max_capacitance or max_transition limits on driving nets.
4. **Physical Density:** Verify ECO buffers are placed into legal placement sites with adequate local whitespace.

## Example Output
```text
ECO Audit Summary:
  Total Commands: 42 (28 size_cell, 14 insert_buffer)
  Setup Improvement Expected: +85 ps WNS
  Hold Risk Detected: 2 paths near threshold (Paths #12, #29)
  Recommendation: Add hold delay buffer on Path #12 capture pin before commit.
```

## Limitations
- Claude cannot guarantee physical routability of inserted ECO buffers; incremental PnR execution is mandatory.

## Verification Checklist
- [ ] Replacement cells verified in target technology library.
- [ ] Incremental STA run clean across all MMMC signoff corners.
- [ ] Formal equivalence (LEC) verified post-ECO.
