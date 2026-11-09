---
name: scoreboard-reviewer
description: Reviews UVM scoreboards, reference models, and in-order/out-of-order transaction checkers for race conditions, dropped packets, and memory leaks.
---

# UVM Scoreboard Reviewer Skill

## Purpose
Audits self-checking UVM scoreboard architectures, comparing actual DUT output transactions against golden reference model predictions to detect silent data corruption and transaction drops.

## Analysis Methodology
1. **TLM Connectivity & Interfaces:**
   - Verify `uvm_analysis_imp` or `uvm_tlm_analysis_fifo` declarations.
   - For scoreboards monitoring multiple streams, verify unique imp declarations using `` `uvm_analysis_imp_decl(_<suffix>) ``.
2. **Order Modeling (In-Order vs Out-of-Order):**
   - In-order: Uses queues (`item_t expected_q[$]`) and pops on actual match.
   - Out-of-order: Uses associative arrays indexed by transaction ID / tag (`item_t pending_table[int]`).
3. **Phase Cleanup & Drain Audit:**
   - In `check_phase`, verify that comparison queues or pending tables are completely empty. Any remaining items indicate dropped packets or hung transactions!

## Limitations
- Golden reference model logic must be verified against official architectural specifications.

## Verification Checklist
- [ ] `` `uvm_analysis_imp_decl `` used for multiple input ports.
- [ ] `check_phase` asserts that internal comparison buffers are empty.
- [ ] Deep comparison implemented using transaction `compare()` or custom fields.
