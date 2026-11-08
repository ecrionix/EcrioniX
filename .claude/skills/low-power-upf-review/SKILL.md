---
name: low-power-upf-review
description: Audits low-power RTL constructs, Integrated Clock Gating (ICG), power domain isolation, retention flip-flops, and IEEE 1801 UPF compatibility.
---

# Low-Power RTL & UPF Review Skill

## Purpose
Examines RTL designs for power optimization compatibility, Integrated Clock Gating (ICG) enablement, power domain partitioning, retention strategies, and IEEE 1801 UPF (Unified Power Format) consistency.

## When to Activate
Activate when auditing battery-powered, mobile, or high-efficiency ASIC subsystems with multi-voltage domains or power-gated blocks.

## Required Inputs
- SystemVerilog RTL modules
- Power architecture intent (Power Switch, Isolation, Level Shifter, State Retention)
- UPF / CPF specification (optional)
- Clock gating targets and minimum enable bit-widths

## Step-by-Step Workflow
1. **Clock Gating Efficiency Audit:**
   - Detect data-recirculating registers lacking enable signals: `if (load_en) q <= d; else q <= q;`.
   - Ensure enable signals have sufficient idle periods to justify ICG cell insertion.
   - Flag clock gating on registers narrower than minimum threshold (typically 4 or 8 bits).
2. **Power Gating Sequence Review:**
   - Audit Power Management Controller FSM:
     1. Assert isolate enable (`iso_en = 1`).
     2. Assert reset (`rst_n = 0`).
     3. Deassert power switch (`pwr_sw = 0`).
     4. Power-up reverse order: Power switch on -> stabilize -> deassert reset -> release isolation.
3. **Isolation Cell Readiness in RTL:**
   - Ensure signals leaving a power-down domain connect to well-defined clamping values (0, 1, or latch) during sleep.
   - Never implement isolation logic with standard gates in RTL if UPF will insert library ISO cells (avoids double-isolation).
4. **Level Shifter Awareness:**
   - Audit cross-domain nets between different $V_{DD}$ rails.
5. **Memory Power States:**
   - Review SRAM sleep, deep-sleep, and shutdown pins.

## Technical Constraints
- Never mix UPF intent with structural RTL isolation gates; clearly distinguish RTL functional requirements from UPF synthesis-inserted physical cells.

## Output Format
- **Power Optimization Audit Table:** Optimization Opportunity | Domain | Estimated Savings | Risk
- **Clock Gating Clean RTL:** Refactored register descriptions.
- **Power Sequencing FSM Review:** Analysis of wake-up/sleep state machines.
- **Companion UPF Snippet:** Matching IEEE 1801 `set_isolation`, `create_power_domain` directives.

## Validation Checklist
- [ ] Clock enables are glitch-free and ICG-cell synthesizable.
- [ ] Isolation signals clamped correctly prior to power switch disable.
- [ ] Retention registers properly controlled.
- [ ] No floating inputs during sleep states.

## Example Invocation
```text
/low-power-upf-review
Review this power domain controller FSM and isolated output interfaces:
[paste pwr_ctrl.sv]
```
