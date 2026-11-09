---
name: sta-tcl-automation
description: Generates, debugs, and refines custom Tcl scripts for Synopsys PrimeTime and Cadence Tempus, automating path extraction, violation reporting, and custom check loops.
---

# STA Tcl Automation Skill

## Purpose
Writes clean, modular, and robust Tcl automation procedures for PrimeTime (`pt_shell`) and Tempus, extracting timing attributes, formatting custom CSV summaries, and creating batch analysis pipelines.

## Capabilities
- Custom collection filtering (`get_timing_paths`, `get_cells`, `get_nets`).
- Iterating through path collections to extract startpoint, endpoint, slack, and delay components.
- Automating CSV and markdown table generation directly from EDA shells.

## Limitations
- Tcl syntax must strictly match target tool shell versions. Claude avoids deprecated or proprietary unverified commands.

## Verification Checklist
- [ ] Tcl procedure syntax checked with clean source execution in `pt_shell` or `tempus`.
- [ ] Memory-efficient collection handling implemented (e.g. freeing large collections).
