---
name: apb-axi-protocol-review
description: Verifies APB4, AXI4-Lite, and AXI4 ready/valid handshake protocols, backpressure, burst rules, outstanding transactions, and skid buffers.
---

# APB & AXI Protocol Review Skill

## Purpose
Audits AMBA APB4, AXI4-Lite, and AXI4 bus interfaces for protocol compliance, deadlock freedom, zero-bubble throughput, skid buffer integration, and backpressure correctness.

## When to Activate
Activate when writing or inspecting memory-mapped bus interfaces, peripherals, crossbars, DMA controllers, or protocol converters.

## Required Inputs
- Protocol type (AMBA APB4, AXI4-Lite, AXI4 Full)
- Role (Master / Subordinate / Interconnect)
- SystemVerilog RTL source code
- Outstanding transaction / burst capability specifications

## Step-by-Step Workflow
1. **Handshake Rule Verification (AXI/AXI-Lite):**
   - Verify ARM AXI Rule: `VALID` signal must NEVER depend combinationally on `READY` (prevents deadlock).
   - Verify `READY` may depend on `VALID`.
   - Verify once `VALID` is asserted, payload and `VALID` remain asserted until `READY` is high (Handshake Stability Rule).
2. **APB4 Protocol Compliance:**
   - Verify two-cycle access: Setup phase (`PSEL=1, PENABLE=0`) followed by Access phase (`PSEL=1, PENABLE=1`).
   - Audit `PREADY` wait-state handling and `PSLVERR` error response.
   - Verify write strobe (`PSTRB`) and byte-lane routing.
3. **Skid Buffer & Throughput Audit:**
   - If registered `READY` output is required to break long combinational timing paths, ensure a 2-stage skid buffer is used to prevent throughput drops.
4. **Channel Decoupling (AXI):**
   - Confirm Write Address (AW), Write Data (W), Write Response (B), Read Address (AR), and Read Data (R) channels function independently.
5. **Reset & Flush Integrity:**
   - Ensure `ARVALID`, `AWVALID`, `WVALID`, `BVALID`, and `RVALID` deassert to 0 on reset.

## Technical Constraints
- Strict adherence to official ARM AMBA AXI and APB protocol specifications (IHI0022E / IHI0024C).

## Output Format
- **Protocol Compliance Matrix:** Check results for all core AMBA rules.
- **Timing & Handshake Diagrams:** ASCII or WaveDrom sequence of legal/illegal transfers.
- **Identified Bugs & Corner Cases:** Deadlocks, dropped beats, unstable payloads.
- **Compliant RTL Fix:** Corrected module code.

## Validation Checklist
- [ ] No `VALID` waiting on `READY` combinationally.
- [ ] Data holds stable until handshake completes.
- [ ] Skid buffer implemented if `READY` is registered.
- [ ] `PREADY` and `PSLVERR` legal in APB Access phase.

## Example Invocation
```text
/apb-axi-protocol-review
Protocol: AXI4-Lite Subordinate
Check if this register slice violates the AXI handshake rules:
[paste axi_reg_slice.sv]
```
