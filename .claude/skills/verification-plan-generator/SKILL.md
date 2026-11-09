---
name: verification-plan-generator
description: Transforms microarchitectural specifications and interface requirements into structured verification plans with features, test scenarios, assertions, and coverage goals.
---

# Verification Plan Generator Skill

## Purpose
Converts engineering specifications and hardware architecture documents (PRD / MAS) into structured, traceable Verification Plans (vPlans) mapped to stimulus scenarios, SVA checkers, and functional coverage models.

## Structure of Generated Verification Plan
1. **Feature Extraction:** Breaks design into verifiable units (e.g., Flow Control, Buffer Management, Error Handling).
2. **Corner Cases & Boundary Conditions:** Identifies maximum depths, minimum delays, concurrent assertions, backpressure scenarios.
3. **Test Scenarios Matrix:**
   - Directed sanity tests.
   - Constrained random stress tests.
   - Negative tests (illegal protocol injection, parity errors, aborts).
4. **Coverage & Checkers Mapping:** Links each scenario to specific SVA properties and functional covergroups for coverage closure tracking.

## Limitations
- Generated plans require engineering review to validate microarchitectural subtleties and third-party IP integration boundaries.

## Verification Checklist
- [ ] Every feature has at least one positive, negative, and stress test scenario.
- [ ] Traceability matrix maps features directly to covergroups.
