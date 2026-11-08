---
name: fifo-design-review
description: Evaluates synchronous and asynchronous FIFO architectures for Gray-code pointer safety, almost-full/empty calculation, overflow protection, and CDC integrity.
---

# FIFO Design Review Skill

## Purpose
Audits dual-clock and single-clock FIFO implementations for pointer math correctness, empty/full detection, almost-empty/almost-full watermarks, circular memory wrap-around, and CDC safety.

## When to Activate
Activate when designing, verifying, or debugging FIFO buffers, queue controllers, or latency bridges.

## Required Inputs
- FIFO SystemVerilog source code
- Clock domain specifications (Synchronous single-clock vs Asynchronous dual-clock)
- Depth and Data Width parameters
- Watermark requirements (programmable empty/full threshold levels)

## Step-by-Step Workflow
1. **Pointer Dimensioning:** Confirm pointer width is $N+1$ where Depth = $2^N$ to distinguish full from empty.
2. **Gray Code Conversion Audit (Async FIFO):**
   - Verify binary-to-Gray conversion: `assign gray_ptr = bin_ptr ^ (bin_ptr >> 1)`.
   - Verify Gray-to-binary conversion logic in the destination domain.
   - Confirm Gray pointers are registered before crossing clock boundaries.
3. **Synchronizer Chain Verification:**
   - Confirm 2-stage (or 3-stage) flip-flop synchronizers exist on pointer crossings.
   - Check for `(* ASYNC_REG = "TRUE" *)`, `set_false_path`, or `set_max_delay -datapath_only` constraint requirements.
4. **Full and Empty Flag Generation:**
   - Empty: `assign empty = (rptr_gray == wptr_gray_sync)` in read domain.
   - Full: Verify top two MSBs inverted with lower bits identical: `assign full = (wptr_gray == {~rptr_gray_sync[N:N-1], rptr_gray_sync[N-2:0]})`.
5. **Simultaneous Push/Pop Hazards:** Check behavior when `wr_en` and `rd_en` assert concurrently under edge conditions.
6. **Watermark / Level Counter Accuracy:** Audit almost-full and almost-empty calculations for one-cycle latency offset.

## Technical Constraints
- Non-power-of-2 depth asynchronous FIFOs require specialized Gray coding or dual-pointer math; flag non-$2^N$ depth as a critical CDC risk.

## Output Format
- **Architecture Assessment:** Synchronous vs Asynchronous assessment.
- **Pointer & Synchronizer Audit:** Detailed analysis of pointer generation and CDC path.
- **Flag Correctness Review:** Mathematical verification of empty/full formulas.
- **SVA Assertions:** SystemVerilog assertions to prove safety.

## Validation Checklist
- [ ] Pointer width is $\log_2(	ext{DEPTH}) + 1$.
- [ ] Gray code changes by only 1 bit per increment.
- [ ] Full condition verified in write clock domain.
- [ ] Empty condition verified in read clock domain.
- [ ] Write into full and read from empty are strictly prevented.

## Example Invocation
```text
/fifo-design-review
Review this async FIFO for a 16-deep 64-bit PCIe-to-AXI bridge:
[paste async_fifo.sv]
```
