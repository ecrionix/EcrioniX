---
name: mmmc-timing-analyzer
description: Coordinates Multi-Mode Multi-Corner (MMMC) timing analysis, mapping scenarios across process corners, voltages, temperatures, RC parasitics, and operational modes.
---

# MMMC Timing Analyzer Skill

## Purpose
Triages timing violations across high-dimensional MMMC scenario matrices, identifying whether violations are corner-specific (e.g., leakage-dominated high-temperature hold vs drive-starved low-voltage setup) or systemic across all modes.

## Multi-Corner Dimension Mapping
- **Process Corners:** Slow-Slow (SSG), Typical (TT), Fast-Fast (FFG), Global vs Local variation.
- **Voltage:** $V_{\text{nom}} \pm 10\%$ (e.g., $0.65\text{V}, 0.75\text{V}, 0.85\text{V}$).
- **Temperature:** $-40^\circ\text{C}$ (temperature inversion node check), $25^\circ\text{C}$, $125^\circ\text{C}$.
- **Extraction Corners:** Cbest (min capacitance), Cworst (max capacitance), RCbest, RCworst.
- **Operational Modes:** Functional Normal, High-Speed Turbo, Low-Power Sleep, Scan Shift, Scan Capture, At-Speed BIST.

## Diagnostic Workflow
1. Matrix generation: Tabulate WNS and TNS across all Mode $\times$ Corner pairs.
2. Isolate dominant corners: Identify which corner drives the worst setup slack and which drives worst hold.
3. Detect temperature inversion: Check if low temperature ($-40^\circ\text{C}$) yields worse setup slack than high temperature ($125^\circ\text{C}$) at advanced nodes ($< 16\,\text{nm}$).

## Limitations
- MMMC analysis requires extensive computational runs; Claude synthesizes and interprets existing scenario outputs.

## Verification Checklist
- [ ] Signoff scenario matrix covers all required foundry customer qualification corners.
- [ ] Temperature inversion verified at low Vdd corners.
