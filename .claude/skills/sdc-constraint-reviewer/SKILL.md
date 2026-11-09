---
name: sdc-constraint-reviewer
description: Audits Synopsys Design Constraints (SDC) for missing clocks, invalid false paths, erroneous multicycle hold multipliers, unconstrained ports, and conflicting clock groups.
---

# SDC Constraint Reviewer Skill

## Purpose
Performs rigorous syntactical and architectural audits of SDC/XDC constraint files, preventing under-constraining (which allows un-timed silicon failures) and over-constraining (which wastes routing resources and silicon area).

## Critical SDC Checks Performed
1. **Clock Definition Completeness:**
   - Verify all primary clock inputs have `create_clock` with explicit waveform `-waveform {0 period/2}`.
   - Audit PLL/divider outputs: Ensure `create_generated_clock` defines explicit `-source`, `-divide_by` or `-multiply_by`, and valid master clock pin.
2. **I/O Delay Constraints:**
   - Check all input ports have `set_input_delay -clock [get_clocks ...]` for both `-max` and `-min`.
   - Check all output ports have `set_output_delay -clock [get_clocks ...]` for both `-max` and `-min`.
   - Flag unconstrained I/O ports (`check_timing` unconstrained endpoints).
3. **Timing Exceptions Audit:**
   - `set_false_path`: Verify false paths are strictly applied to truly asynchronous or static control registers. Flag abuse of false paths used to mask real timing violations.
   - `set_multicycle_path`: Verify that whenever `set_multicycle_path N -setup` is declared, the corresponding `set_multicycle_path (N-1) -hold` is explicitly included.
   - `set_clock_groups`: Check `-asynchronous` groups between asynchronous domains; ensure synchronous sub-clocks are not accidentally severed.

## Limitations
- SDC review cannot verify board-level PCB trace propagation delays unless board design parameters are provided.

## Verification Checklist
- [ ] PrimeTime/Tempus `check_timing` run clean with zero unconstrained endpoints.
- [ ] Multicycle hold multipliers verified using waveform expansion.
- [ ] No false paths applied to clock pins or multi-bit CDC buses.
