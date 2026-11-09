---
name: low-power-verification-reviewer
description: Reviews UPF 3.0 / IEEE 1801 power intent verification, power switch behavior, isolation clamping, level shifter rules, and state retention simulation.
---

# Low-Power Verification Reviewer Skill

## Purpose
Audits low-power testbench setups and UPF specifications, ensuring power-aware simulation models correctly simulate power domain power-down, isolation clamping, level shifting, and state retention during sleep modes.

## Audit Focus Areas
1. **Isolation Verification:**
   - Verify isolation cells clamp outputs to defined static values (0, 1, or latch) when source domain is powered OFF.
   - Detect floating inputs in always-on domains that could cause simulation `X` or physical crowbar current.
2. **Level Shifter Verification:**
   - Ensure signals crossing between different voltage domains (e.g. 0.75V to 1.05V) have appropriate level shifter strategy specified in UPF.
3. **Retention Sequence:**
   - Verify save signal asserts before power-down, and restore signal asserts after power is restored.

## Limitations
- Power-aware simulation requires simulator-specific UPF compilation (`-upf` flag).

## Verification Checklist
- [ ] Power state table (PST) covered in functional test suite.
- [ ] Isolation rules active and verified during domain shutdown.
