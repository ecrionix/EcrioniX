---
name: lvs-debug-assistant
description: Decodes Layout Versus Schematic (LVS) mismatch reports from Siemens Calibre nmLVS, diagnosing shorts, opens, and device property discrepancies.
---

# Layout Versus Schematic (LVS) Debug Assistant Skill

## Purpose
Diagnoses physical verification Layout Versus Schematic (LVS) failure reports from Siemens Calibre nmLVS, isolating discrepancy points between the extracted GDSII netlist and the synthesized gate-level SPICE netlist.

## When to Activate
Activate when Calibre nmLVS reports "COMPARE RESULTS: NOT COMPARED" or "DISCREPANCIES FOUND" during tapeout verification.

## Required Input Files
- Calibre LVS summary report (`lvs.rep` / `calibre.lvs.summary`)
- Source gate-level netlist (`.v` or `.spi`)
- Power/Ground supply net names ($V_{DD}, V_{SS}$) and text label definitions

## Step-by-Step Analysis Workflow
1. **Initial Discrepancy Classification:**
   - **Net Shorts:** Multiple electrical nets merged into a single physical polygon.
   - **Net Opens:** A single electrical net physically broken into two isolated pieces.
   - **Unbalanced Pin / Port Count:** Missing top-level I/O text labels or mismatched port names.
   - **Component Parameter Mismatches:** Transistor channel width/length ($W/L$) or resistor values differing between schematic and layout.
2. **Text Label & Pin Attachment Audit:**
   - Verify top-level supply ports have text labels on the correct metal layer matching Calibre text-layer directives.
3. **Power/Ground Short Isolation:**
   - If $V_{DD}$ and $V_{SS}$ are reported shorted, locate the first shorted coordinate in the log to inspect standard cell tap abutments or macro power ring crossings.
4. **Subcircuit Reduction & Unmatched Instance Trees:**
   - Trace discrepancy trees to locate the true root-cause instance rather than downstream propagated symptoms.

## Tool-Specific Considerations
- **Siemens Calibre nmLVS:** Golden foundry signoff engine.
- **Cadence Pegasus LVS:** Cadence signoff LVS solution.

## Technical Limitations
- Calibre LVS coordinates must be highlighted in layout tools (Calibre RVE / Virtuoso / Innovus); Claude provides logical path deconstruction.

## Output Format
- **LVS Discrepancy Breakdown:** Shorts | Opens | Unmatched Instances | Unmatched Nets
- **Root-Cause Analysis:** Pinpoints the initial mismatch event that caused downstream net collapse.
- **Remediation Checklist:** Actionable layout and netlist corrections.

## Validation Checklist
- [ ] Calibre report states: "COMPARE RESULTS: COMPARED - ZERO DISCREPANCIES".
- [ ] Power and ground supplies unambiguously verified.
- [ ] No soft-shorts or floating well body contacts.

## Example Invocation
```text
/lvs-debug-assistant
Tool: Siemens Calibre nmLVS
Summary: "Net VDD shorted to Net VSS at coordinate (1420.5, 890.2)"
Report: [paste lvs.rep discrepancy section]
```
