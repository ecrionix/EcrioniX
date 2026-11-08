---
name: rtl-code-review
description: Performs rigorous ASIC/FPGA SystemVerilog RTL code review for synthesizability, race conditions, latch inference, signedness pitfalls, and coding guidelines.
---

# RTL Code Review Skill for ASIC Front-End Engineers

## Purpose
Performs comprehensive static architectural and syntactic review of SystemVerilog/Verilog RTL modules before synthesis and simulation, flagging race conditions, inferred latches, multi-driver nets, and non-synthesizable constructs.

## When to Activate
Activate when an engineer provides a SystemVerilog module for code quality inspection, pre-commit audit, or lint-preparation review.

## Required Inputs
- SystemVerilog/Verilog source code (`.sv` or `.v`)
- Target technology context (ASIC standard cell vs FPGA)
- Clock and reset convention (e.g., active-low asynchronous reset, synchronous reset)
- Module interface specification (optional but recommended)

## Step-by-Step Workflow
1. **Header & Interface Audit:** Verify port directions, explicit bit-widths (avoid bare integers), unpacked dimensions, and package imports.
2. **Procedural Block Verification:**
   - Confirm sequential logic strictly uses `always_ff @(posedge clk or negedge rst_n)` with non-blocking assignments (`<=`).
   - Confirm combinational logic strictly uses `always_comb` with blocking assignments (`=`).
   - Confirm latches are never inferred unless intentionally declared via `always_latch`.
3. **Branch Completeness & Default Assignment:**
   - Verify every conditional branch (`if-else`, `case`) has an exhaustive default assignment or complete coverage to prevent unintended latches.
   - For `case` statements, verify `unique case` or `priority case` usage matches designer intent.
4. **Data Type & Arithmetic Sanity:**
   - Check signed vs unsigned operations: ensure mixed signed/unsigned arithmetic is explicitly cast with `$signed()`.
   - Audit bit-slice assignments and vector truncations.
5. **Synthesis & Simulation Antipatterns:**
   - Flag simulation delays (`#1`), initial blocks (outside simulation testbenches), and unsynthesizable system functions (`$display`, `$finish` inside synthesizable modules).
6. **Generate Structured Review Report:** Output categorized findings (Critical, Warning, Informational).

## Technical Constraints
- Never alter interface port names, signal widths, or cycle latency without explicit permission.
- Never assume an undeclared signal is 1 bit; flag explicit declarations.
- Distinguish between FPGA block RAM templates and ASIC flip-flop banks.

## Output Format
- **Executive Summary:** Pass/Needs Revision verdict.
- **Critical Issues (Must Fix):** Race conditions, inferred latches, multi-driver nets.
- **Warnings (Review Needed):** Truncation, signedness, default branches.
- **Suggested Corrected RTL:** Full synthesizable code block with line-by-line diff.

## Validation Checklist
- [ ] No blocking assignments in `always_ff`.
- [ ] No non-blocking assignments in `always_comb`.
- [ ] No inferred latches.
- [ ] Reset values provided for all sequential state registers.
- [ ] No multi-driver nets.

## Example Invocation
```text
/rtl-code-review
Inspect the following arbiter module for ASIC synthesis compliance:
[paste arbiter.sv]
```
