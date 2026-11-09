---
name: uvm-testbench-generator
description: Generates modular, standard UVM 1.2 compliant testbench components including sequence items, drivers, monitors, sequencers, agents, scoreboards, and environments.
---

# UVM Testbench Generator Skill

## Purpose
Accelerates the development of standard, reusable Universal Verification Methodology (UVM 1.2 / IEEE 1800.2) testbench hierarchies from interface specifications, creating complete transaction-level modeling (TLM) pipelines.

## When to Activate
Activate when bringing up verification environments for new IP blocks, creating VIP (Verification IP) agents, or building modular testbenches for DUTs.

## Required Input Files
- Interface pinout and protocol specification (signal names, directions, timing diagrams)
- Transaction parameters (payload widths, burst types, address ranges)
- DUT interface definition (`interface <name>_if`)

## Step-by-Step Generation Workflow
1. **Sequence Item (`uvm_sequence_item`):**
   - Define randomized fields (`rand bit [31:0] addr, data;`).
   - Implement UVM field macros or explicit core methods: `do_copy`, `do_compare`, `do_print`, `do_record`, `convert2string`.
   - Add sensible protocol constraint blocks.
2. **Driver (`uvm_driver #(item_t)`):**
   - Connect via virtual interface (`virtual <name>_if.DRV vif`).
   - Implement `run_phase`: Fetch items using `seq_item_port.get_next_item(req)`, drive pin signals according to protocol clocking block, call `seq_item_port.item_done()`.
3. **Monitor (`uvm_monitor`):**
   - Passively sample signals using clocking block (`vif.mon_cb`).
   - Reconstruct transactions and broadcast via `uvm_analysis_port #(item_t) ap`.
4. **Sequencer & Agent (`uvm_agent`):**
   - Encapsulate driver, monitor, and sequencer.
   - Support `is_active == UVM_ACTIVE` (instantiates driver + sequencer) vs `UVM_PASSIVE` (monitor only).
5. **Environment & Scoreboard:**
   - Instantiate agents and scoreboards, connecting analysis ports to scoreboard analysis exports or TLM fifos (`uvm_tlm_analysis_fifo`).

## Example Prompt
```text
Generate a complete, reusable UVM agent for an APB4 slave interface (PCLK, PRESETn, PADDR[31:0], PSEL, PENABLE, PWRITE, PWDATA[31:0], PRDATA[31:0], PREADY, PSLVERR). Include sequence_item, driver, monitor, sequencer, and agent classes.
```

## Expected Output
- Logically complete SystemVerilog files adhering to UVM factory registration (`uvm_component_utils`, `uvm_object_utils`).
- Explicit phase definitions (`build_phase`, `connect_phase`, `run_phase`).
- Zero syntax omissions or disconnected placeholders.

## Limitations
- Generated code must be compiled within your simulation environment with the official UVM library. Claude cannot execute simulator compiles.

## Verification Checklist
- [ ] Factory registration macros included on all classes.
- [ ] `seq_item_port.item_done()` called for every `get_next_item()`.
- [ ] Analysis ports connected in `connect_phase` using `connect()`.
