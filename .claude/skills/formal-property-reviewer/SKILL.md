---
name: formal-property-reviewer
description: Evaluates formal verification properties, assumptions, and cover statements for bounded model checking (BMC) and formal property verification (FPV).
---

# Formal Property Reviewer Skill

## Purpose
Audits SystemVerilog Assertions intended for Formal Verification tools (Synopsys VC Formal, Cadence JasperGold, Siemens FormalPro), ensuring properties are formulated to avoid proof timeouts, state-space explosion, and over-constrained vacuity.

## Key Formal Verification Audits
1. **`assert` vs `assume` Balance:**
   - Ensure environment inputs are constrained with `assume property`.
   - Verify assumptions do not over-constrain the formal tool, causing vacuous proofs (where the proof passes simply because inputs are impossible).
2. **State-Space Complexity:**
   - Flag unbounded temporal delays (`##[1:$]` or huge delays `##1000`). Bounded delays (`##[1:8]`) must be used for formal tractability.
3. **Reset State Formulation:**
   - Confirm reset properties allow the formal engine to initialize the design into legal reachable states.

## Limitations
- Formal engines perform exhaustive mathematical exploration. Claude provides syntactic and architectural review of properties, not formal mathematical proof.

## Verification Checklist
- [ ] Vacuity checks performed (`cover property` on antecedent).
- [ ] Large arithmetic operators abstracted or bounded.
