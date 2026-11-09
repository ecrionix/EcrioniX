---
name: critical-path-analyzer
description: Pinpoints the most timing-critical paths in a design, clustering them by clock domain, logic cone, and physical hierarchy, and identifying structural bottlenecks across runs.
---

# Critical Path Analyzer Skill

## Purpose
Clusters and profiles the top 100+ violating paths from WNS down to zero slack, identifying whether timing violations are concentrated in a specific arithmetic datapath, state machine, register file, or interface module.

## Analysis Methodology
1. **Histogram & Distribution Profiling:**
   - Group violating endpoints by module hierarchy (e.g., `u_core/u_mmu`, `u_crypto/u_aes`).
   - Plot slack distribution: Determine whether violations are isolated (WNS anomaly) or systemic (widespread TNS wall).
2. **Common Sub-Cone Analysis:**
   - Trace backwards from violating D pins to find common gating logic, multiplexer trees, or shared ALU operands.
3. **QoR Scorecard Generation:**
   - Output WNS, TNS, Violating Endpoint Count (NVP), Worst Clock Domain, and Bottleneck Hierarchy.

## Limitations
- Cannot modify RTL source code directly; recommendations must be fed back to RTL designers or physical design engineers.

## Verification Checklist
- [ ] Critical paths verified across all active operating modes (functional, scan, BIST).
- [ ] Top bottleneck modules documented for architectural refactoring.
