# UCIe (Universal Chiplet Interconnect Express) — Technical Content Reference
*Internal Architecture Reference Document for EcrioniX Engineering Laboratories*

**Authoritative Standards Source:** UCIe Consortium (https://www.uciexpress.org/specifications)  
**Supported Specification Revisions:** UCIe 1.0, UCIe 1.1, and UCIe 2.0 (with 3D extensions)

---

## 1. Architectural Overview & System Decomposition

UCIe standardizes the die-to-die (D2D) interconnect to enable an open, multi-vendor chiplet ecosystem. It defines a layered protocol stack partitioned into three normative layers:

```
+-------------------------------------------------------------+
|                      APPLICATION / SOC                      |
+-------------------------------------------------------------+
                               |
+-------------------------------------------------------------+
|                      1. PROTOCOL LAYER                      |
|   PCIe 6.0/7.0 (FLIT) | CXL 2.0/3.0 | User Streaming Mode   |
+-------------------------------------------------------------+
                               |
              FDI (FLIT-aware Die-to-Die Interface)
                               |
+-------------------------------------------------------------+
|                   2. DIE-TO-DIE ADAPTER                     |
|  - Link Management & State Machine (L1/L2, Reset, Retrain)  |
|  - Parameter Negotiation (Protocol, Frequency, Width)       |
|  - Flow Control & Credit Management                         |
|  - Optional CRC Generation & Replay/Retry Buffer            |
+-------------------------------------------------------------+
                               |
              RDI (Raw Die-to-Die Interface)
                               |
+-------------------------------------------------------------+
|                     3. PHYSICAL LAYER (PHY)                 |
|  - Logical PHY: Framing, Byte Alignment, Scrambling, Deskew |
|  - Electrical PHY: AFE, Tx Drivers, Rx Slicers, CDR/Clock   |
|  - Mainband Data (x16/x32/x64 Single-ended PAM-4 / NRZ)     |
|  - Sideband Interface (800 MHz / 25 MHz Out-of-Band Serial) |
+-------------------------------------------------------------+
                               |
                 DIE-TO-DIE PACKAGE INTERCONNECT
         (Standard Organic Substrate / Advanced Silicon Bridge)
```

---

## 2. Layer-by-Layer Technical Reference

### A. Protocol Layer
* **Function:** Maps higher-level standard protocol packets or proprietary streaming traffic onto UCIe-compatible transport units (FLITs).
* **Supported Mappings:**
  1. **PCIe Mode:** Native PCIe Gen 6 / Gen 7 with 256-byte FLIT framing. Mandatory for PCIe endpoint chiplets.
  2. **CXL Mode:** Native CXL.io, CXL.cache, and CXL.mem with 68-byte or 256-byte FLIT framing. Mandatory for memory pooling and coherent accelerators.
  3. **Streaming Protocol:** User-defined or AXI/CHI streaming interface. Bypasses standard headers for raw low-latency streaming.
  4. **Raw / Direct Mode:** Direct access to PHY or Adapter for proprietary low-overhead interfaces.
* **Specification Designation:** Protocol selection is negotiated via Sideband during link initialization. Individual chiplets are not required to implement all protocols.

### B. Die-to-Die (D2D) Adapter
* **Function:** Bridges protocol layer to physical layer, guarantees reliable delivery (when enabled), and manages multi-die arbitration.
* **FDI Interface:** Standardized interface between Protocol and Adapter.
* **RDI Interface:** Standardized interface between Adapter and Physical Layer.
* **CRC & Replay:** 
  - Generates 16-bit or 32-bit CRC across outgoing FLITs.
  - Maintains a local circular Replay Buffer.
  - Upon receiving a NAK (or parity error indication), Adapter halts forward progress, rewinds replay pointer, and re-transmits unacknowledged packets.
  - *Designation:* Mandatory for reliable PCIe/CXL modes; optional/bypassed in certain raw streaming modes.

### C. Physical Layer (PHY)
* **Mainband Interface:**
  - Standard Packaging: 16 data lanes per module (Single-ended NRZ, up to 32 Gbps/pin).
  - Advanced Packaging: 64 data lanes per module (Single-ended NRZ, high density micro-bumps, up to 32 Gbps/pin).
  - UCIe 2.0 / 3D: Micro-bump pitch <10µm with ultra-dense TSVs, achieving multi-Tbps/mm² bandwidth density.
* **Sideband Interface:**
  - Dedicated, out-of-band point-to-point interface.
  - 800 MHz (Advanced) or 25 MHz (Standard) serial clocking.
  - Operates independent of mainband state; used for power management, link training, capability exchange, register access, and fault repair.
  - *Designation:* Strictly mandatory for all UCIe compliant chiplets.

---

## 3. Link Initialization Sequence (Normative State Machine)

1. **RESET Phase:** Power-on reset; sideband starts oscillating; registers initialized to default.
2. **SIDEBAND HANDSHAKE:** Dies detect mutual presence across dedicated sideband pins.
3. **CAPABILITY EXCHANGE:** Dies exchange supported protocols (PCIe, CXL, Streaming), packaging types (Standard vs Advanced), and max data rates via sideband registers.
4. **PHY TRAINING & CALIBRATION:** Mainband transmitter sends training sequences; receivers perform DC offset cancellation, duty-cycle correction, and clock phase alignment.
5. **LANE DESKEW & REPAIR:** Bit-level alignment across all data lanes; defective lanes swapped with redundant spare lanes.
6. **ACTIVE STATE (L0):** Mainband operational; adapter flow control credits exchanged; application traffic commences.

---

## 4. Packaging Categories Comparison

| Parameter | Standard Packaging | Advanced Packaging (2.5D) | 3D Direct Bonding (UCIe 2.0) |
|---|---|---|---|
| **Interconnect Media** | Organic Substrate (PCB traces) | Silicon Interposer / Bridge (EMIB / CoWoS) | Direct Cu-Cu Hybrid Bonding / TSVs |
| **Bump Pitch** | 100 µm – 130 µm | 25 µm – 55 µm | < 10 µm |
| **Channel Reach** | Up to 25 mm | < 2 mm | < 10 µm (vertical) |
| **Mainband Lanes** | 16 lanes per module | 64 lanes per module | Dense vertical matrix |
| **Energy Efficiency** | ~0.5 pJ / bit | ~0.25 pJ / bit | < 0.1 pJ / bit |
| **Bandwidth Density** | ~0.2 – 0.5 Tbps / mm | ~1.5 – 3.2 Tbps / mm | > 10 Tbps / mm² |

---

## 5. Specification Revision Matrix

* **UCIe 1.0 (2022):** Initial foundational release. Defined Standard & Advanced packaging, 32 Gbps data rates, PCIe 6.0 and CXL 2.0 mappings, FDI/RDI interfaces.
* **UCIe 1.1 (2023):** Enhancements for streaming protocols, expanded DFX (Design-for-Test) and runtime health monitoring, automotive grade profiles, and power-management refinements.
* **UCIe 2.0 (2024):** Introduction of UCIe 3D packaging specifications for direct die-stacking, manageability transport architectures, universal test interfaces, and multi-die security.
