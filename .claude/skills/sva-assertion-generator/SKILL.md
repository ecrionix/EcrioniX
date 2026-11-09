---
name: sva-assertion-generator
description: Converts protocol and design specifications into formal and simulation-ready SystemVerilog Assertions (SVA) with concurrent properties, sequences, and coverage directives.
---

# SystemVerilog Assertion (SVA) Generator Skill

## Purpose
Translates plain-English interface rules, timing diagrams, and protocol requirements into mathematically precise, robust SystemVerilog Assertions (`assert property`, `cover property`, `assume property`).

## When to Activate
Activate when defining interface protocols, capturing bus handshakes (AXI, APB, Wishbone), FIFO status checks, arbiter fairness, or state machine reachability.

## SVA Architecture & Guidelines
1. **Clocking & Resets:**
   - Always specify explicit clock edge: `property p_rule; @(posedge clk) disable iff (!rst_n) ...`
   - Use `disable iff` with asynchronous resets to prevent false glitch violations during reset assertion.
2. **Implication Selection:**
   - Overlapping implication (`|->`): Consequent evaluates in the *same cycle* as the antecedent.
   - Non-overlapping implication (`|=>`): Consequent evaluates in the *next cycle* ($+1$ cycle).
3. **Temporal Operators:**
   - Consecutive repetition: `req ##[1:5] ack`.
   - Past sampling: `$past(signal, 1)` to verify signal stability.
   - Edge detection: `$rose(signal)`, `$fell(signal)`, `$stable(signal)`.
   - Vector checks: `$onehot(grant_vector)`, `$onehot0(vector)`.

## Example Prompt
```text
Write a concurrent SVA property for an AXI4 write address channel: When AWVALID is asserted, AWADDR, AWBURST, and AWLEN must remain stable until AWREADY is asserted by the slave.
```

## Expected Output
```systemverilog
property p_axi_awvalid_stability;
  @(posedge ACLK) disable iff (!ARESETn)
  (AWVALID && !AWREADY) |=> (AWVALID && $stable(AWADDR) && $stable(AWBURST) && $stable(AWLEN));
endproperty
a_axi_awvalid_stability: assert property(p_axi_awvalid_stability)
  else $error("[SVA_ERR] AXI AWVALID or payload mutated while AWREADY is deasserted!");
c_axi_awvalid_handshake: cover property(p_axi_awvalid_stability);
```

## Limitations
- Claude cannot guarantee that an assertion suite provides 100% formal property coverage. Formal model checkers (JasperGold, VC Formal) are required for complete mathematical proof.

## Verification Checklist
- [ ] Explicit clock and asynchronous reset disable defined.
- [ ] Vacuous pass scenarios analyzed (antecedent can be triggered).
- [ ] Cover property included alongside assertion property.
