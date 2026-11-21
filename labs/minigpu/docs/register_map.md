# EcrioniX MiniGPU – Register Map & Command Protocol Specification

## 1. Command Opcode Summary

| Opcode | Hex | Mnemonic | Words | Description |
|:---:|:---:|:---|:---:|:---|
| `0000` | `0x0` | `CMD_NOP` | 1 | No operation. Pipeline bubble. |
| `0001` | `0x1` | `CMD_CLEAR` | 1 | Clear entire framebuffer to specified RGB888 color. |
| `0010` | `0x2` | `CMD_RECTANGLE` | 3 | Fill axis-aligned rectangle from $(X_0, Y_0)$ to $(X_1, Y_1)$. |
| `0011` | `0x3` | `CMD_CIRCLE` | 3 | Fill circle with center $(X_C, Y_C)$ and radius $R$. |
| `0100` | `0x4` | `CMD_TRIANGLE` | 4 | Fill triangle with vertices $V_0(X_0, Y_0)$, $V_1(X_1, Y_1)$, $V_2(X_2, Y_2)$. |
| `0101` | `0x5` | `CMD_FLIP` | 1 | Flush pipeline and signal display scan buffer flip. |

---

## 2. Multi-Word Packet Format

All commands are transmitted as 32-bit big-endian words over the `cmd_data[31:0]` bus.

### 2.1 Header Word (Word 0) – Common to All Commands
```
+---------------+---------------+-------------------------------+
|  31       28  |  27       24  |  23                         0 |
|  OPCODE [3:0] |  FLAGS  [3:0] |       COLOR_RGB [23:0]        |
+---------------+---------------+-------------------------------+
```
- `[31:28]` **OPCODE**: Command type identifier (`0x1` through `0x5`).
- `[27:24]` **FLAGS**:
  - Bit 24: Direct write vs Blend enable.
  - Bits 27:25: Reserved.
- `[23:16]` **COLOR_R**: 8-bit Red channel ($0 - 255$).
- `[15:8]`  **COLOR_G**: 8-bit Green channel ($0 - 255$).
- `[7:0]`   **COLOR_B**: 8-bit Blue channel ($0 - 255$).

---

### 2.2 Parameter Words by Command

#### `CMD_CLEAR` (1 Word)
Word 0 sets the clear color. The entire 19,200 pixel array is reset to this color across consecutive clock cycles.

#### `CMD_RECTANGLE` (3 Words)
- **Word 0:** Header (Opcode `0x2` + RGB888)
- **Word 1:**
  - `[31:16]` $X_0$ (Unsigned 16-bit integer, valid range $0 - 159$)
  - `[15:0]`  $Y_0$ (Unsigned 16-bit integer, valid range $0 - 119$)
- **Word 2:**
  - `[31:16]` $X_1$ (Unsigned 16-bit integer, valid range $0 - 159$)
  - `[15:0]`  $Y_1$ (Unsigned 16-bit integer, valid range $0 - 119$)

#### `CMD_CIRCLE` (3 Words)
- **Word 0:** Header (Opcode `0x3` + RGB888)
- **Word 1:**
  - `[31:16]` $X_C$ Center X coordinate ($0 - 159$)
  - `[15:0]`  $Y_C$ Center Y coordinate ($0 - 119$)
- **Word 2:**
  - `[31:16]` Radius $R$ ($0 - 80$)
  - `[15:0]`  Reserved ($0x0000$)

#### `CMD_TRIANGLE` (4 Words)
- **Word 0:** Header (Opcode `0x4` + RGB888)
- **Word 1:**
  - `[31:16]` Vertex 0 $X_0$
  - `[15:0]`  Vertex 0 $Y_0$
- **Word 2:**
  - `[31:16]` Vertex 1 $X_1$
  - `[15:0]`  Vertex 1 $Y_1$
- **Word 3:**
  - `[31:16]` Vertex 2 $X_2$
  - `[15:0]`  Vertex 2 $Y_2$

---

## 3. Status and Control Signals

| Port Name | Direction | Width | Description |
|:---|:---:|:---:|:---|
| `cmd_ready` | Output | 1 | Indicates MiniGPU is ready to accept a new command word. |
| `cmd_valid` | Input | 1 | Host asserts high when `cmd_data` is valid. |
| `gpu_busy` | Output | 1 | Asserted while any rasterizer engine is rendering pixels. |
| `fifo_full` | Output | 1 | High when internal command FIFO holds 16 packets. |
| `fifo_empty`| Output | 1 | High when no queued commands remain. |
| `frame_done`| Output | 1 | Single-cycle strobe when display controller completes 1 full frame. |
