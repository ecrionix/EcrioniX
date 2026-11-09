---
name: si-crosstalk-timing-reviewer
description: Analyzes Signal Integrity (SI) crosstalk delay and glitch reports, identifying victim-aggressor coupling nets, Miller effect delay shifts, and recommending physical shielding or driver resizing.
---

# SI Crosstalk Timing Reviewer Skill

## Purpose
Inspects PrimeTime SI or Tempus SI crosstalk analysis outputs, evaluating how dynamic switching on aggressor nets impacts victim net propagation delay (Miller effect) and functional voltage glitch noise.

## Physics Evaluated
- **Crosstalk Setup Delay:** Aggressor switching in opposite direction increases effective coupling capacitance ($C_{\text{eff}} \approx 2 \cdot C_c$), expanding transition time and causing setup violations.
- **Crosstalk Hold Delay:** Aggressor switching in same direction accelerates victim transition ($C_{\text{eff}} \approx 0$), speeding up arrival time and inducing hold violations.
- **Glitch Noise Margin:** Static net experiences voltage bounce due to capacitive charge injection. Peak glitch must remain below library $V_{\text{noise\_margin}}$.

## Prescribed Physical Fixes
1. Upsize victim driver to lower driving impedance.
2. Downsize aggressor driver if aggressor path has excess slack.
3. Insert repeater buffer on long victim interconnect.
4. Shield victim net with VDD/VSS tracks or increase routing track spacing.

## Limitations
- SI calculation requires accurate coupled parasitic extraction (`*C_COUP` in SPEF); lumped capacitance is completely inadequate for SI signoff.

## Verification Checklist
- [ ] Extracted SPEF contains explicit cross-coupling capacitors.
- [ ] Peak glitch height $< 25\%$ of supply voltage ($V_{DD}$).
