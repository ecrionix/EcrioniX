---
name: systemverilog-lint-review
description: Analyzes EDA static lint violation reports (SpyGlass, Veridian, Synopsys, Cadence HAL) and provides root-cause diagnosis and non-breaking RTL fixes.
---

# SystemVerilog Lint Review Skill

## Purpose
Interprets industrial static lint violation logs from commercial EDA tools (Synopsys SpyGlass, Siemens Questa Lint, Cadence HAL, Verilator) and provides actionable root-cause analysis and minimal-impact RTL repairs.

## When to Activate
Activate when an engineer pastes lint warnings/errors or requests automated resolution of lint rule violations.

## Required Inputs
- Lint report log snippet (Rule ID, message, file, line number)
- Associated SystemVerilog RTL module source code
- Target tool name / rule set (e.g., SpyGlass Lint, STARC, OpenMORE)

## Step-by-Step Workflow
1. **Rule Classification:** Parse Rule IDs (e.g., `W415a` latch inference, `W164b` truncation, `W240` unused net, `W188` signedness mismatch).
2. **Context Correlation:** Pinpoint exact source lines and identify the underlying hardware construct triggering the warning.
3. **False Positive vs True Defect Assessment:**
   - Determine whether the rule violation represents a true functional hazard (e.g., unintentional vector drop) or an intentional design choice (e.g., unused upper bits of a counter).
4. **Remediation Strategy:**
   - True Defect: Formulate an exact RTL correction maintaining functional equivalence.
   - False Positive / Intentional: Provide tool waiver syntax (e.g., `// spyglass disable_block W240`) or standard SV lint-clean coding idiom.
5. **Impact Verification:** Confirm the suggested modification introduces zero simulation divergence or timing impact.

## Technical Constraints
- Never mask a genuine functional defect with a tool waiver comment without explicit engineer confirmation.
- Ensure all bit slices remain explicitly dimensioned.

## Output Format
- **Violation Breakdown Table:** Rule ID | Severity | Root Cause | Fix Strategy
- **Corrected Code Snippets:** Before vs After with exact diff.
- **Recommended Waiver Directives:** If applicable, formatted for SpyGlass / Verilator.

## Validation Checklist
- [ ] Root cause verified against IEEE 1800-2023 semantics.
- [ ] Fix does not modify module latency or pinout.
- [ ] No unintended latch or multi-driver introduced by the fix.

## Example Invocation
```text
/systemverilog-lint-review
Tool: SpyGlass 2023.09
Violations:
- W164b: Truncation in assignment: rhs width 32, lhs width 16 (fifo_ctrl.sv:84)
- W415a: Latch inferred for signal 'next_state' (fsm.sv:52)
```
