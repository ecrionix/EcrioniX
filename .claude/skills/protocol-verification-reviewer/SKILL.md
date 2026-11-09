---
name: protocol-verification-reviewer
description: Evaluates verification environments for standard bus protocols (AXI4, APB4, AHB5, PCIe, Ethernet) for compliance checking, backpressure stress, and error responses.
---

# Protocol Verification Reviewer Skill

## Purpose
Validates protocol compliance testbenches, ensuring verification environments thoroughly stress protocol edge cases: out-of-order completion, burst wrapping, backpressure stalling, credit starvation, and bus aborts.

## Supported Protocol Domains
- **AMBA AXI4 / AXI4-Lite:** Outstanding transactions, write interleaving, burst types (INCR, WRAP, FIXED), response codes (OKAY, EXOKAY, SLVERR, DECERR), handshake independence rules.
- **AMBA APB4:** Setup phase, access phase, wait states (`PREADY == 0`), error signaling (`PSLVERR`).
- **FIFO / Stream Interfaces:** Ready/Valid backpressure, bubble insertion, credit counters, almost-full thresholds.

## Analysis Checklist
1. Are valid signals permitted to drop before ready is asserted? (Illegal in AXI/Ready-Valid!).
2. Are ready signals allowed to depend combinationally on valid signals?
3. Does the testbench test maximum outstanding transactions without deadlock?

## Limitations
- Cannot replace official ARM AXI Protocol Checkers (VIP). Claude reviews custom logic against AMBA specification rules.

## Verification Checklist
- [ ] Protocol stability rules enforced via SVA.
- [ ] Backpressure exercised with randomized wait states.
