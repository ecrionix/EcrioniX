---
name: rtl-specification-to-design
description: Converts architectural English specifications into synthesizable SystemVerilog RTL with cycle-by-cycle execution tables, datapath registers, and FSMs.
---

# RTL Specification-to-Design Skill

## Purpose
Translates natural-language microarchitecture documents, interface tables, and functional specifications into verified, synthesizable SystemVerilog RTL with strict hardware discipline.

## When to Activate
Activate when initiating a new hardware block, implementing an accelerator datapath, or translating an architectural micro-spec into RTL.

## Required Inputs
- Functional requirement or microarchitecture description
- Interface definitions (Ports, Widths, Protocols: AXI, APB, Ready/Valid, Streaming)
- Clocking, reset, and performance targets (e.g., single-cycle throughput, latency)
- Parameterization requirements (Data widths, buffer depths)

## Step-by-Step Workflow
1. **Specification Gap Analysis:**
   - Interrogate the prompt for missing hardware constraints: Backpressure behavior, reset state, simultaneous transactions, error handling.
2. **Cycle-by-Cycle Execution Table:**
   - Construct a timing table showing signals for typical, edge-case, and backpressured clock cycles.
3. **Partitioning Datapath vs Control:**
   - Isolate control paths (FSMs, counters, handshake arbiters) from datapaths (ALUs, multiplexers, registers).
4. **SystemVerilog Implementation:**
   - Use clean IEEE 1800-2023 constructs: `always_ff`, `always_comb`, parameterized widths, typed enumerations.
5. **Self-Review for Synthesizability:**
   - Ensure zero latches, no multi-driver nets, and complete sensitivity.

## Technical Constraints
- Never invent interface signals not implied by the architecture.
- Always include explicit reset values for all registers.

## Output Format
- **Microarchitecture Summary:** Datapath block diagram description and pipeline stages.
- **Cycle Timing Matrix:** Step-by-step cycle execution table.
- **Complete Synthesizable SystemVerilog RTL:** Ready for compilation.
- **Design Assumptions & Unspecified Corner Cases:** Explicit list of decisions made.

## Validation Checklist
- [ ] All inputs registered or combinationally processed cleanly.
- [ ] Handshakes obey standard ready/valid rules.
- [ ] Full parameterization with safe default values.
- [ ] Lint-clean and synthesizable in Synopsys DC and Cadence Genus.

## Example Invocation
```text
/rtl-specification-to-design
Design a Credit-Based Flow Control Receiver:
- In: 32-bit data + valid
- Out: 8-bit credit return pulse
- Internal 8-entry buffer
- Clock: 250MHz, sync reset active-high
```
