---
name: regression-log-analyzer
description: Parses large nightly regression test suites, clustering simulation failures, detecting seed-dependent bugs, and generating executive verification dashboards.
---

# Regression Log Analyzer Skill

## Purpose
Automates the triage of hundreds of simulation log files across overnight regression runs, extracting `UVM_FATAL`, `UVM_ERROR`, assertion failures, and timeout hangs, clustering them by common failure signatures.

## Analysis Methodology
1. **Failure Extraction:** Regex parsing of simulator exit codes and UVM error messages.
2. **Clustering & Signature Matching:**
   - Group failures by common error strings (e.g. `Scoreboard mismatch on channel 2`, `SVA: a_axi_handshake failed`).
   - Distinguish testbench bugs from true RTL defects.
3. **Seed Correlation:**
   - Identify tests that fail on specific random seeds vs fail deterministically across all seeds.
4. **Summary Dashboard Generation:**
   - Tabulate Total Tests, Passed, Failed, Pass Rate %, Top 5 Failure Signatures.

## Limitations
- Requires representative log snippets or consolidated regression output text files.

## Verification Checklist
- [ ] All failed tests matched to a distinct failure cluster.
- [ ] Seeds recorded for immediate local reproduction.
