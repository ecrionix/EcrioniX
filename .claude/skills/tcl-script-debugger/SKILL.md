---
name: tcl-script-debugger
description: Debugs, refactors, and automates Tcl scripts for Cadence Innovus, Synopsys ICC2, PrimeTime, Tempus, and Calibre with verified syntax.
---

# Tcl Script Debugger & Automation Skill

## Purpose
Specialized EDA automation skill that inspects, debugs, and optimizes Tool Command Language (Tcl) scripts for commercial physical implementation and timing tools, ensuring correct object collection handling, error trapping, and high-performance execution.

## When to Activate
Activate when writing, debugging, or optimizing physical design automation scripts, custom report parsers, or flow-control hooks.

## Required Input Files
- Defective or target Tcl script
- Target EDA tool and version (Innovus, ICC2, PrimeTime, Tempus, Calibre)
- Error log or failure message generated during tool execution

## Step-by-Step Analysis Workflow
1. **Tool-Specific Command Vocabulary Verification:**
   - Verify commands match the exact syntax of the target tool (e.g., distinguishing PrimeTime `get_pins -of_objects` from Innovus `dbGet`).
2. **Object Collection vs List Manipulation:**
   - Detect common Tcl crash: treating an EDA collection (Synopsys `get_cells`, Cadence `get_db`) as a standard Tcl string list instead of using `sizeof_collection` or `foreach_in_collection`.
3. **Variable Expansion & Substitution Scrutiny:**
   - Audit bracket substitutions `[ ]` and quote escaping inside loops.
4. **Performance & Memory Optimization:**
   - Replace slow iterative string parsing with native tool attribute queries (`get_attribute`).
5. **Error Handling & Return Codes:**
   - Add `catch { ... } error_msg` blocks around non-fatal commands to prevent automated flow termination.

## Tool-Specific Considerations
- **Cadence Innovus:** Uses legacy `dbGet` / modern Common UI `get_db`.
- **Synopsys ICC2 / PrimeTime:** Uses collections (`get_cells`, `get_pins`, `foreach_in_collection`).
- **Siemens Calibre:** Uses Calibre Interactive batch Tcl directives.

## Technical Limitations
- Never invent proprietary command options; if an internal tool variable is unconfirmed, flag it explicitly.

## Output Format
- **Bug Diagnosis:** Exact line and explanation of Tcl runtime or syntax failure.
- **Corrected Tcl Script:** Production-ready code block with robust collection handling.
- **Performance Optimization Notes:** Explanation of speedups achieved.

## Validation Checklist
- [ ] Collections properly iterated using tool-specific iteration primitives.
- [ ] No bare file paths without existence validation.
- [ ] Compatible with both interactive terminal and non-interactive batch mode execution.

## Example Invocation
```text
/tcl-script-debugger
Tool: Synopsys PrimeTime 2023.12
Error: "Can't read collection element as string in foreach loop"
Script: [paste parse_violators.tcl]
```
