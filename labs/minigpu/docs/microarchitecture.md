# EcrioniX MiniGPU – Microarchitecture Technical Reference

This document details the cycle-by-cycle microarchitectural implementation of every hardware module in MiniGPU v1.0.

---

## 1. Module Hierarchy

1. **`minigpu_top.v`**: Top-level system wrapper.
2. **`cmd_interface.v`**: Host bus handshaking and command packet assembler.
3. **`command_fifo.v`**: 16-entry synchronous circular FIFO with backpressure.
4. **`command_decoder.v`**: Packet decoding and dispatch FSM.
5. **`rasterizer_controller.v`**: Raster engine arbiter and framebuffer write port multiplexer.
6. **`rectangle_rasterizer.v`**: Axis-aligned box rasterizer with boundary clipping.
7. **`circle_rasterizer.v`**: Integer squared-distance circle rasterizer.
8. **`triangle_rasterizer.v`**: Pineda edge-function barycentric rasterizer.
9. **`pixel_color_generator.v`**: Color processing and constant register pipeline.
10. **`framebuffer.v`**: 19,200 × 24-bit true dual-port synchronous BRAM.
11. **`display_controller.v`**: 60 Hz raster beam timing and CRT/VGA pulse generator.

---

## 2. Command Pipeline (`cmd_interface`, `command_fifo`, `command_decoder`)

### 2.1 Parameter Deserialization
Host drawing commands arrive as a sequence of 32-bit words over a `cmd_data[31:0]` bus with standard `cmd_valid` and `cmd_ready` handshaking:
- **Single-Word Commands:** `CLEAR_SCREEN` (Word 0 specifies opcode and RGB888 color).
- **Three-Word Commands:** `DRAW_RECTANGLE` and `DRAW_CIRCLE` (Word 0: Opcode/Color, Word 1: X0/Y0 or XC/YC, Word 2: X1/Y1 or Radius).
- **Four-Word Commands:** `DRAW_TRIANGLE` (Word 0: Opcode/Color, Word 1: V0, Word 2: V1, Word 3: V2).

The `cmd_interface` deserializer maintains an internal 2-bit word counter and assembles parameters into a single 86-bit internal packet:
- `[85:82]`: Opcode (4 bits)
- `[81:58]`: Color RGB888 (24 bits)
- `[57:50]`: Param 0 - X0 / XC (8 bits)
- `[49:43]`: Param 1 - Y0 / YC (7 bits)
- `[42:35]`: Param 2 - X1 / Radius (8 bits)
- `[34:28]`: Param 3 - Y1 (7 bits)
- `[27:20]`: Param 4 - X2 (8 bits)
- `[19:13]`: Param 5 - Y2 (7 bits)
- `[12:0]` : Reserved flags and stroke width (13 bits)

### 2.2 Circular FIFO Buffer
- Storage: 16 words × 86 bits implemented as register array / distributed RAM.
- Pointers: 4-bit write pointer (`wr_ptr`) and read pointer (`rd_ptr`), with a 5-bit occupancy counter (`count`).
- Status Flags: `fifo_empty` (`count == 0`), `fifo_full` (`count == 16`), `fifo_half_full` (`count >= 8`).
- Backpressure: When `count >= 14`, `cmd_ready` is de-asserted to stop host transmission before buffer overrun occurs.

---

## 3. Hardware Rasterization Engines

### 3.1 Rectangle Rasterizer (`rectangle_rasterizer.v`)
- Operates across an axis-aligned bounding box defined by $(X_0, Y_0)$ and $(X_1, Y_1)$.
- Automatic Coordinate Normalization: If $X_0 > X_1$, coordinates are swapped inside a registered normalization stage.
- Boundary Clamping: Clamps $(X, Y)$ within legal framebuffer boundaries $[0, 159]$ and $[0, 119]$.
- Scan Pattern: Row-major raster scan. On each clock cycle, `cur_x` increments. When `cur_x == x_max`, `cur_x` resets to `x_min` and `cur_y` increments until `cur_y == y_max`.
- Output: Single-cycle pixel strobe `pixel_valid`, with coordinates `pixel_x` and `pixel_y`.

### 3.2 Circle Rasterizer (`circle_rasterizer.v`)
- Evaluates the Euclidean disk inequality:
  $$(X - X_C)^2 + (Y - Y_C)^2 \le R^2$$
- Bounding Box Scanning: Traverses only the bounding box $[X_C - R, X_C + R] \times [Y_C - R, Y_C + R]$.
- Pipelined DSP Arithmetic:
  - Stage 1: Computes $\Delta X = |X - X_C|$ and $\Delta Y = |Y - Y_C|$.
  - Stage 2: Integer squarers evaluate $(\Delta X)^2$ and $(\Delta Y)^2$.
  - Stage 3: Adder compares $(\Delta X)^2 + (\Delta Y)^2 \le R^2$.
- When the condition evaluates true, `pixel_valid` pulses high for that coordinate.

### 3.3 Triangle Rasterizer (`triangle_rasterizer.v`)
- Implements the Pineda sub-pixel edge function algorithm.
- Given three vertices $V_0(x_0, y_0)$, $V_1(x_1, y_1)$, $V_2(x_2, y_2)$ oriented in counter-clockwise order:
  $$E_{01}(x, y) = (x - x_0)(y_1 - y_0) - (y - y_0)(x_1 - x_0)$$
  $$E_{12}(x, y) = (x - x_1)(y_2 - y_1) - (y - y_1)(x_2 - x_1)$$
  $$E_{20}(x, y) = (x - x_2)(y_0 - y_2) - (y - y_2)(x_0 - x_2)$$
- A pixel at $(x, y)$ is inside the triangle if and only if:
  $$E_{01} \ge 0 \quad \land \quad E_{12} \ge 0 \quad \land \quad E_{20} \ge 0$$
- Microarchitecture:
  - Bounding box finder identifies $[\min(x_i), \max(x_i)] \times [\min(y_i), \max(y_i)]$.
  - 3 parallel signed 18-bit DSP evaluators compute edge equations.
  - Sign bit comparator generates `pixel_valid` in a single clock cycle.

---

## 4. Framebuffer Memory Architecture (`framebuffer.v`)

- **Capacity:** 19,200 words × 24-bit (48 KB / 384 Kbit).
- **Physical Structure:** True Dual-Port Synchronous Static RAM (Block RAM).
- **Port A (Write Channel - Rasterizer):**
  - Clock: `clk` (50 MHz).
  - Write Enable: `we_a` (from active rasterizer engine).
  - Address: `addr_a[14:0]` (15 bits, $0 \le \text{addr} \le 19199$).
  - Data In: `din_a[23:0]` (RGB888).
- **Port B (Read Channel - Display Controller):**
  - Clock: `clk` (50 MHz).
  - Read Enable: `en_b = 1'b1`.
  - Address: `addr_b[14:0]`.
  - Data Out: `dout_b[23:0]` (latched on next rising edge).
- Zero Contention: Port A writes and Port B reads execute simultaneously on opposite memory ports without stalling or pipeline bubbles.
