---
name: sva-generator
description: Generates formal SystemVerilog Assertions (SVA) for protocols, FIFOs, FSMs, arbiters, and interface contracts with assume/assert/cover properties.
---

# SystemVerilog Assertions (SVA) Generator Skill

## Purpose
Synthesizes high-coverage, mathematically precise SystemVerilog Assertions (SVA) for simulation monitoring and formal property verification (FPV) in Cadence JasperGold, Synopsys VC Formal, or Siemens Questa Formal.

## When to Activate
Activate when verifying protocols, creating formal testbenches, adding interface assertions, or proving safety and liveness properties.

## Required Inputs
- Design specification or SystemVerilog RTL module
- Target interface signals (Clock, Reset, Control, Data)
- Property requirements (e.g., no overflow, mutual exclusion, handshake stability, starvation freedom)
- Verification mode (Dynamic Simulation vs Formal Property Verification)

## Step-by-Step Workflow
1. **Clock & Reset Setup:** Define default clocking block and disable condition:
   ```systemverilog
   default clocking cb @(posedge clk); endclocking
   default disable iff (!rst_n);
   ```
2. **Immediate vs Concurrent Classification:**
   - Use concurrent assertions (`property ... endproperty`) for temporal relationships.
   - Use immediate assertions for one-shot sanity checks in combinational logic.
3. **Safety Properties (Bad things never happen):**
   - Write/Read bounds (FIFO never writes when full, never reads when empty).
   - Mutual exclusion (one-hot state encoding, grant arbiter outputs).
   - Protocol invariants (AXI `VALID` stable until `READY`, `ADDR` aligned).
4. **Liveness Properties (Good things eventually happen):**
   - Eventual response under fairness assumptions: `req |-> s_eventually ack`.
5. **Assume vs Assert Partitioning:**
   - Tag module inputs with `assume property` (environment constraints).
   - Tag module internal states and outputs with `assert property` (design proof).
   - Add `cover property` for reachability verification.

## Technical Constraints
- Distinguish overlapping implication (`|->`) from non-overlapping implication (`|=>`).
- Avoid unbounded liveness assertions in simulation that cause performance collapse.

## Output Format
- **Assertion Specification Table:** Property Name | Type (Safety/Liveness) | Intent | Formal Rule
- **Self-Contained SVA Checker Module:** Ready to bind via `bind` construct.
- **Formal Verification Command Script:** Basic setup for JasperGold or VC Formal.

## Validation Checklist
- [ ] All properties use appropriate `disable iff (!rst_n)`.
- [ ] Implication operators properly selected (`|->` vs `|=>`).
- [ ] No race conditions between assertion evaluation and NBA updates.
- [ ] SVA module cleanly bindable without modifying original RTL source.

## Example Invocation
```text
/sva-generator
Generate comprehensive SVA assertions for an AXI4-Lite Slave interface:
Clock: clk, Reset: rst_n
Signals: awvalid, awready, wvalid, wready, bvalid, bready, bresp
```
