---
name: drc-violation-analysis
description: Analyzes physical verification DRC violation logs from Siemens Calibre nmDRC and Synopsys ICV, mapping polygon errors to layout causes.
---

# Design Rule Check (DRC) Violation Analysis Skill

## Purpose
Categorizes and investigates physical verification Design Rule Checking (DRC) violation summaries from foundry signoff engines (Siemens Calibre nmDRC, Synopsys ICV), determining root causes in placement, routing, or filler cell insertion.

## When to Activate
Activate during physical verification signoff runs on post-routing and metal-filled GDSII/OASIS databases.

## Required Input Files
- Calibre DRC summary report (`calibre.drc.summary` / `drc.log`)
- Foundry design rule deck name and technology node (e.g., TSMC N5, GF 12LP)
- Physical layer affected (Base layers, FinFET fins, Poly, Contact, Via1–ViaN, Metal1–MetalTop)

## Step-by-Step Analysis Workflow
1. **Rule Deck Classification:**
   - Base Layer DRC: Poly pitch, active diffusion spacing, well proximity (typically caused by standard cell abutment or tap-cell gaps).
   - Metal Layer DRC: Minimum spacing, minimum area, wide-metal spacing, jog rules.
   - Via DRC: Enclosure rules, cut spacing, redundant via requirements.
   - Density & DFM DRC: Minimum/maximum metal density across moving windows.
2. **Systematic vs Random Failure Diagnosis:**
   - Check if a specific cell master or SRAM boundary accounts for thousands of repeated violations.
3. **Remediation Prescription:**
   - Route-level violations: Recommend NanoRoute / route_detail search-and-repair parameters.
   - Base-layer violations: Check boundary end-cap cells, well-tap spacing, or macro halo keepouts.
   - Metal Density: Adjust automated dummy metal fill scripts (`insert_metal_fill`).

## Tool-Specific Considerations
- **Siemens Calibre nmDRC:** Standard foundry signoff engine.
- **Synopsys IC Validator (ICV):** Synopsys integrated in-design signoff DRC.

## Technical Limitations
- Calibre DRC requires loading the GDSII layout into Calibre RVE or layout viewer (KLayout / Virtuoso) to inspect polygon coordinate geometries; Claude provides analytical triage.

## Output Format
- **DRC Violation Triage Matrix:** Rule Name | Category | Violation Count | Root Cause Category
- **Top Root-Cause Suspects:** Master cell abutment, routing channel starvation, via enclosure defect.
- **Remediation Roadmap:** Step-by-step PnR tool commands to fix in layout before rerunning Calibre.

## Validation Checklist
- [ ] Signoff verified using golden foundry-provided Calibre runset.
- [ ] Base layer DRC verified clean before metal fill insertion.
- [ ] Zero net-shorts or open connections.

## Example Invocation
```text
/drc-violation-analysis
Tool: Siemens Calibre nmDRC
Foundry: TSMC 16FFC
Report: [paste calibre.drc.summary excerpt]
Top violation: M2.S.1 (Metal 2 spacing violation: 1,840 instances)
```
