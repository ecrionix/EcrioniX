---
name: fsm-design-review
description: Evaluates finite state machines for safe encoding (one-hot, binary, Gray), illegal state traps, deadlock recovery, and Moore vs Mealy output timing.
---

# FSM Design Review Skill

## Purpose
Performs comprehensive architectural inspection of SystemVerilog Finite State Machines (FSMs), auditing state encoding choices, illegal state handling, glitch-free output timing, and transition coverage.

## When to Activate
Activate when designing, optimizing, or reviewing sequential control FSMs, protocol controllers, or power management sequencers.

## Required Inputs
- SystemVerilog FSM code (or state diagram / state transition table)
- Performance & Timing goals (Target frequency, critical output latency)
- Target architecture (ASIC vs FPGA)

## Step-by-Step Workflow
1. **FSM Architecture Identification:**
   - Determine if the FSM is Moore (outputs depend only on state) or Mealy (outputs depend on state and inputs).
   - Check if outputs are registered (glitch-free) or combinational (potential timing bottleneck).
2. **Coding Style Audit:**
   - Verify classic 2-process or 3-process FSM coding:
     - Process 1: Sequential state register (`always_ff @(posedge clk ...)`).
     - Process 2: Combinational next-state logic (`always_comb`).
     - Process 3: Registered or combinational output logic.
3. **Encoding Evaluation:**
   - Binary encoding: Compact (minimum flops), good for area-constrained slow control paths.
   - One-hot encoding: 1 bit per state, single gate decode, optimal for high-speed ASIC control paths and FPGAs.
   - Gray encoding: Optimal for sequenced counters with single-bit transitions.
4. **Deadlock & Illegal State Trap Verification:**
   - Verify `default:` branch in next-state decode.
   - For safety-critical designs (automotive, aerospace), check for safe recovery logic to return illegal states to IDLE or ERROR.
5. **Timing & Glitch Elimination:**
   - Flag combinational Mealy outputs routed across module boundaries (can cause long timing arcs and combinational loops).

## Technical Constraints
- Acknowledge that modern synthesis tools (Design Compiler, Genus) can override state encoding via `fsm_encoding` attributes; review both RTL intent and synthesis impact.

## Output Format
- **State Transition Matrix:** Current State | Input Conditions | Next State | Outputs
- **Architecture Evaluation:** Moore vs Mealy, Encoding trade-offs.
- **Identified Defects:** Unreachable states, deadlocks, glitchy outputs.
- **Hardened SystemVerilog Code:** Optimized FSM implementation.

## Validation Checklist
- [ ] Strict use of `typedef enum logic [W-1:0]` for state names.
- [ ] Exhaustive next-state decode with explicit `default`.
- [ ] Outputs are glitch-free and registered where timing critical.
- [ ] Reset state unambiguously defined.

## Example Invocation
```text
/fsm-design-review
Target: 1.2 GHz ASIC control path
Evaluate this SDRAM initialization FSM:
[paste sdram_init_fsm.sv]
```
