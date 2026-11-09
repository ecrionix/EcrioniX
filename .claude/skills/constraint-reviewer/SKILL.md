---
name: constraint-reviewer
description: Audits SystemVerilog constraint blocks for solver conflicts, contradiction deadlocks, distribution skew, solve-before order dependencies, and performance bottlenecks.
---

# SystemVerilog Constraint Reviewer Skill

## Purpose
Diagnoses randomized constraint failures, solver timeouts, over-constrained contradictions (`randomization failed`), and under-constrained edge cases in transaction stimulus generators.

## Analysis Methodology
1. **Contradiction Detection:**
   - Identify conflicting equality or range constraints (e.g., `c1: addr inside {[0:100]}; c2: addr > 200;`).
2. **Implication & Conditional Logic:**
   - Review `if (cond) ... else ...` and implication `A -> B` constraints.
   - Remember that if antecedent $A$ is false, consequent $B$ is unconstrained! Use bidirectional or explicit `else` when mutual exclusivity is required.
3. **Distribution & Weighting (`dist`):**
   - Check distribution weights: `:=` (equal weight to each value in range) vs `:/` (weight divided across range).
4. **`solve ... before ...` Order Dependencies:**
   - Check whether dependent variables require explicit solver ordering to achieve uniform probability distribution rather than skewed outcomes.

## Limitations
- Solver algorithms differ slightly across commercial engines (VCS, Xcelium, Questa). Recommendations adhere strictly to IEEE 1800-2023 LRM standard behavior.

## Verification Checklist
- [ ] Randomization tested with multiple random seeds (`+ntb_random_seed=random` or `-sv_seed`).
- [ ] Soft constraints (`soft`) used appropriately for default values that sequences can override.
- [ ] No cyclic dependencies in `solve-before` declarations.
