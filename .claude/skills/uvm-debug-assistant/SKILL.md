---
name: uvm-debug-assistant
description: Diagnoses UVM simulation hangs, objection leaks, phase drop issues, factory override failures, config_db lookup mismatches, and null handle dereferences.
---

# UVM Debug Assistant Skill

## Purpose
Pinpoints the root causes of UVM testbench runtime failures, deadlock hangs where simulations run indefinitely at time zero or mid-test, configuration database silent misses, and objection mismanagement.

## When to Activate
Activate when a UVM simulation fails with `UVM_FATAL`, `UVM_ERROR`, silent hangs where the simulation does not terminate, or factory overrides that fail to take effect.

## Diagnostic Decision Tree
1. **Simulation Hangs at Time Zero:**
   - *Check:* Are any components waiting for an event before it is triggered? Is an objection raised in `pre_body()` or `body()` of a sequence that is blocked by an unstarted clock?
   - *Check:* Is the reset sequence waiting for `reset_n == 1` while the reset generator is uninstantiated?
2. **Simulation Hangs at End of Test (Run Phase Does Not Exit):**
   - *Check:* Objection leak. Did a component call `phase.raise_objection()` without a matching `phase.drop_objection()`?
   - *Action:* Recommend `+UVM_OBJECTION_TRACE` simulator switch to trace every objection raise/drop with component path.
3. **`uvm_config_db` Silent Failures:**
   - *Check:* Mismatched context (e.g. `this` vs `null`), mismatched field name strings (case sensitive), or type mismatch (e.g., passing virtual interface wrapper vs raw interface).
   - *Action:* Recommend `+UVM_CONFIG_DB_TRACE` to inspect all get/set queries.
4. **Factory Override Does Not Apply:**
   - *Check:* Was the component created with `create()` or directly with `new()`? Direct `new()` bypasses the factory table!
   - *Check:* Did the override call occur in `build_phase` *before* the component was created?

## Limitations
- Requires simulation transcript logs and relevant UVM component source code.

## Verification Checklist
- [ ] All components created via `type_id::create()`.
- [ ] Objection trace clean with net zero active objections at test termination.
- [ ] Virtual interface successfully retrieved in `build_phase` of agent.
