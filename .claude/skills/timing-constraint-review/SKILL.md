---
name: timing-constraint-review
description: Audits Synopsys Design Constraints (SDC) for missing clocks, generated clock definitions, false paths, multicycle paths, and case analysis.
---

# Timing Constraint (SDC) Review Skill

## Purpose
Audits Synopsys Design Constraints (SDC) files for completeness and physical accuracy, detecting dangerous over-constraining, missing generated clocks, unconstrained interfaces, and unsafe false-path exceptions.

## When to Activate
Activate before synthesis, during floorplanning, and before final STA signoff to validate timing constraints.

## Required Input Files
- SDC constraints file (`.sdc`)
- Top-level clock specification and PLL documentation
- Chip boundary interface timing agreements (input delays, output delays)

## Step-by-Step Analysis Workflow
1. **Clock Definition Audit:**
   - Verify all primary oscillator inputs have explicit `create_clock` definitions with correct periods and waveforms.
   - Audit `create_generated_clock`: Ensure clock dividers, PLL outputs, and clock multiplexers have explicit generated clock definitions with accurate source pins (`-source`) and division/multiplication factors (`-divide_by`, `-multiply_by`).
2. **Clock Uncertainty & Latency:**
   - Check that `set_clock_uncertainty` includes both PLL jitter and clock tree variation margin.
3. **I/O Delay Constraints:**
   - Audit `set_input_delay` and `set_output_delay`: Verify reference clock names and max/min values account for PCB trace flight times.
4. **Timing Exceptions Audit (Critical):**
   - **False Paths (`set_false_path`):** Ensure false paths are only applied to verified asynchronous CDC paths (e.g., static configuration registers).
   - **Multicycle Paths (`set_multicycle_path`):** Verify that multicycle paths have matching hold multipliers (`-hold N-1`).

## Tool-Specific Considerations
- **Synopsys PrimeTime:** Uses `check_timing -verbose`, `report_exceptions`.
- **Cadence Innovus / Tempus:** Uses `check_timing`, `report_timing_exceptions`.

## Technical Limitations
- Constraint review cannot confirm PCB board-level trace lengths; I/O delays must be verified against system-level board timing specs.

## Output Format
- **Constraint Health Scorecard:** Primary Clocks | Generated Clocks | Unconstrained Endpoints | Active Exceptions
- **Risk Assessment:** Flagged unsafe false paths or missing clock dividers.
- **Refined SDC Directives:** Corrected syntax conforming to IEEE 1800-2023 / SDC 2.1.

## Validation Checklist
- [ ] `check_timing` produces zero unconstrained endpoints.
- [ ] All multicycle setup paths have corresponding hold multipliers.
- [ ] No internal clocks defined as independent primary clocks unless physically asynchronous.

## Example Invocation
```text
/timing-constraint-review
Review this top-level SDC file for a dual-PLL PCIe/DDR controller SoC:
[paste chip_top.sdc]
```
