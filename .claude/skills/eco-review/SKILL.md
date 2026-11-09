---
name: eco-review
description: Plans and verifies Engineering Change Orders (ECO) for timing closure, DRC repair, and functional logic modification using spare gates.
---

# Engineering Change Order (ECO) Review Skill

## Purpose
Guides the formulation, review, and verification of Engineering Change Orders (ECOs) in late-stage physical design, evaluating timing ECOs, design-rule ECOs, and freeze-silicon metal-only functional ECOs using pre-placed spare gates.

## When to Activate
Activate during late timing closure, post-mask functional bug fixes, or when generating incremental physical implementation scripts.

## Required Input Files
- ECO intent: Timing fix (setup/hold), DRC fix, or Functional logic patch
- Pre-ECO vs Post-ECO netlist diff or ECO change description
- Available spare cell inventory (for metal-only ECOs)
- ECO Tcl commands (Innovus `ecoChangeCell`, `ecoAddRepeater` / ICC2 `eco_netlist`)

## Step-by-Step Analysis Workflow
1. **ECO Classification & Scope:**
   - **Post-Route Base-and-Metal ECO:** All silicon mask layers can be modified. Suitable for automated buffer insertion and cell resizing during timing closure.
   - **Metal-Only Freeze-Silicon ECO:** Base layers (diffusion, poly, contact) are frozen in fab; modifications are strictly restricted to metal routing layers (M1–MTop) using pre-instantiated spare cell gates (`SPARE_AND`, `SPARE_FF`).
2. **Logical Equivalence Checking (LEC) Verification:**
   - For functional ECOs, verify that golden modified RTL matches the ECO-patched netlist using **Cadence Conformal** or **Synopsys Formality**.
3. **Physical Impact & Disturbance Minimization:**
   - Confirm that ECO routing does not rip up critical timing-closed nets.
   - Verify that newly inserted cells are placed into legal filler cell gaps without shifting adjacent standard cells.
4. **Timing Re-Convergence:**
   - Verify that the ECO fixes the intended violation without causing secondary setup or hold failures on adjacent nets.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses `ecoChangeCell`, `ecoAddRepeater`, `ecoRoute`.
- **Synopsys ICC2:** Uses `eco_netlist`, `route_eco`.
- **Formality / Conformal:** Mandated for formal equivalence signoff.

## Technical Limitations
- Metal-only ECOs depend strictly on physical proximity of spare gates; if no unused spare flip-flop exists within routing distance, a metal-only fix is physically impossible.

## Output Format
- **ECO Implementation Strategy:** Base-and-Metal vs Metal-Only assessment.
- **Verified Tcl ECO Script:** Precise commands to insert buffers, resize cells, or rewire spare pins.
- **Verification Signoff Checklist:** Formality/Conformal and incremental STA prerequisites.

## Validation Checklist
- [ ] Formal equivalence verified (LEC clean).
- [ ] Incremental STA verifies violation closed without side-effect slack degradation.
- [ ] Incremental DRC and LVS verify layout remains 100% clean.

## Example Invocation
```text
/eco-review
Type: Metal-Only Functional ECO
Goal: Invert signal 'data_valid' before entering FIFO using spare inverter 'spare_inv_inst_42'
[paste eco_script.tcl]
```
