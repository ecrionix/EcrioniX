---
name: cdc-rdc-review
description: Analyzes clock-domain crossings (CDC) and reset-domain crossings (RDC) for metastability hazards, reconvergence, bus skew, and reset deassertion safety.
---

# Clock & Reset Domain Crossing (CDC/RDC) Review Skill

## Purpose
Identifies asynchronous timing hazards, metastability risks, multi-bit coherency bugs, reconvergence artifacts, and reset assertion/deassertion vulnerabilities in multi-clock ASIC SoCs.

## When to Activate
Activate when analyzing multi-clock RTL, async reset distribution, or preparing for Questa CDC / Synopsys VC CDC signoff.

## Required Inputs
- Multi-clock SystemVerilog RTL modules
- Clock definition list (clock frequencies, domains, asynchronous relationships)
- Reset architecture (asynchronous assert / synchronous deassert scheme)

## Step-by-Step Workflow
1. **Clock Domain Identification:** Map every flip-flop to its originating clock tree.
2. **Single-Bit Crossing Audit:**
   - Ensure multi-flop synchronizers (2-FF / 3-FF) are deployed on all async control signals.
   - Verify pulse synchronizers (toggle-type) for fast-to-slow clock domain pulses.
3. **Multi-Bit Crossing Audit (Crucial):**
   - Check for unsafe multi-bit CDC: Flag any instance where individual bits of a binary bus cross through separate synchronizers.
   - Mandate Gray code conversion, asynchronous FIFO, or Valid/Ready 4-phase handshake synchronizer.
4. **Reconvergence Analysis:**
   - Detect signals that cross asynchronously, synchronize separately, and subsequently converge into common combinational logic.
5. **Reset Domain Crossing (RDC):**
   - Check that asynchronous resets use an Asynchronous Assert, Synchronous Deassert (AASD) synchronizer per clock domain.
   - Check for reset race conditions on sequential circuits during power-up/wake-up.

## Technical Constraints
- Never declare a CDC path "clean" based solely on simulation or code inspection. State clearly that Questa CDC / VC CDC / SpyGlass CDC and SDC constraints (`set_clock_groups -asynchronous`) are mandatory for sign-off.

## Output Format
- **Domain Topology Table:** Clock A -> Clock B | Signal Name | Synchronizer Topology | Hazard Status
- **Identified Hazards & Risks:** Explanation of potential failure modes (metastability, skew, reconvergence).
- **Hardened SystemVerilog Module:** Safe synchronizer implementation.
- **Synthesis/STA Directives:** Necessary false-path / max-delay constraints.

## Validation Checklist
- [ ] All async signals pass through dedicated synchronizers.
- [ ] No binary counters cross domains without Gray coding or handshaking.
- [ ] Reset release synchronized to destination clock edge.
- [ ] Synchronizer flip-flops marked with `DONT_TOUCH` and `ASYNC_REG`.

## Example Invocation
```text
/cdc-rdc-review
Review this clock-crossing block between 400MHz AXI and 100MHz APB:
[paste cdc_bridge.sv]
```
