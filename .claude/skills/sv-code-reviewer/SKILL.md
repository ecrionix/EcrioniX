---
name: sv-code-reviewer
description: Audits SystemVerilog verification code for OOP correctness, race conditions, memory leaks, shallow copy bugs, virtual interface usage, and randomization pitfalls.
---

# SystemVerilog Code Reviewer Skill

## Purpose
Reviews SystemVerilog verification classes, interfaces, packages, and testbench modules to identify subtle OOP anti-patterns, simulation race conditions, uninitialized handles, shallow-versus-deep copy bugs, and suboptimal array structures.

## When to Activate
Activate during code reviews of testbench infrastructure, verification component authoring, or refactoring legacy SystemVerilog testbenches.

## Required Input Files
- SystemVerilog class files (`.sv`, `.svh`)
- Interface definitions (`interface ... endinterface`)
- Package declarations (`package ... endpackage`)

## Step-by-Step Analysis Workflow
1. **OOP & Memory Management Audit:**
   - Check class constructors (`function new`): Ensure `super.new` is called correctly.
   - Detect shallow copy pitfalls: Check if objects containing sub-handles implement custom deep-copy methods rather than relying on built-in `new` shallow copy.
   - Audit object lifecycle: Ensure transient transaction objects are properly unreferenced to allow garbage collection.
2. **Race Condition & Scheduling Semantics:**
   - Verify non-blocking assignments (`<=`) vs blocking assignments (`=`) in sequential vs combinational verification routines.
   - Inspect interface clocking blocks: Verify input skew `#1step` (Sampled in Preponed region) and output skew `#0` / `#1ns` (Driven in Re-NBA / Observed region) to eliminate race conditions with the DUT.
3. **Data Structure Suitability:**
   - Check usage of queues (`[$]`), dynamic arrays (`[]`), and associative arrays (`[*]`). Ensure unbounded associative arrays do not consume unbounded host memory during long regressions.
4. **Randomization & Encapsulation:**
   - Verify `rand` and `randc` fields have appropriate `protected` or `local` visibility with accessor methods.
   - Verify `post_randomize()` methods maintain consistency without overriding constrained variables.

## Example Prompt
```text
Review this SystemVerilog driver class for potential memory leaks, race conditions with the DUT clock, and improper virtual interface usage:
[paste SV driver code]
```

## Expected Output
- **OOP Architecture Review:** Class hierarchy, constructor validity, deep copy compliance.
- **Race Condition Vulnerabilities:** Interface clocking skew and sampling region audit.
- **Identified Bugs & Anti-Patterns:** Line-by-line defect list with severity rating.
- **Refined SystemVerilog Code:** Corrected, synthesizable/verifiable SV code blocks.

## Limitations
- Code review cannot execute simulator event scheduling; always compile with Synopsys VCS, Cadence Xcelium, or Siemens Questa to confirm zero lint/elaboration errors.

## Verification Checklist
- [ ] Virtual interface initialized and checked with `assert(vif != null)`.
- [ ] Clocking block used for all DUT signal sampling and driving.
- [ ] Custom `copy()`, `clone()`, and `compare()` methods correctly implemented.
