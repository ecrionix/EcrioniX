# EcrioniX MiniGPU – System Architecture Specification

**Version:** 1.0 (Stable)  
**Target Platform:** FPGA & ASIC Digital Implementations  
**Language Standard:** IEEE 1364-2001 / IEEE 1800-2012 Synthesizable Verilog  
**Default Resolution:** 160 × 120 pixels  
**Color Depth:** 24-bit Truecolor (RGB888)  
**Total Framebuffer Capacity:** 19,200 words × 24-bit (460,800 bits)  

---

## 1. Executive Summary

MiniGPU is a fully synthesizable, cycle-accurate 2D hardware graphics processor designed for educational computer engineering, FPGA demonstrations, and custom embedded display accelerators.

Unlike software rasterizers, MiniGPU maps every stage of the 2D rendering pipeline into dedicated digital logic modules:
- Command buffering and parameter deserialization.
- Dual-pointer circular FIFO with backpressure signaling.
- Microcode command decoding and rasterizer dispatching.
- Hardware rasterization engines for axis-aligned bounding boxes (Rectangles), squared-distance Euclidean fields (Circles), and Pineda sub-pixel edge functions (Triangles).
- True dual-port synchronous Static RAM (BRAM) resolving rasterization writes and display scan reads simultaneously.
- Real-time video timing generator with active blanking and synchronization signals.

---

## 2. Top-Level Block Diagram

```
                 +---------------------------------------------------+
                 |                   HOST SYSTEM                     |
                 +---------------------------------------------------+
                                           |
                                [cmd_data, cmd_valid, cmd_ready]
                                           v
                             +---------------------------+
                             |       cmd_interface       |
                             +---------------------------+
                                           |
                                 [86-bit Packed Packet]
                                           v
                             +---------------------------+
                             |       command_fifo        |
                             |      (16-depth BRAM)      |
                             +---------------------------+
                                           |
                                  [fifo_data, fifo_empty]
                                           v
                             +---------------------------+
                             |      command_decoder      |
                             +---------------------------+
                                           |
                    +----------------------+----------------------+
                    |                      |                      |
                    v                      v                      v
         +--------------------+  +--------------------+  +--------------------+
         |   rect_rasterizer  |  |   circ_rasterizer  |  |    tri_rasterizer  |
         +--------------------+  +--------------------+  +--------------------+
                    |                      |                      |
                    +----------------------+----------------------+
                                           |
                                [fb_we, fb_addr, fb_color]
                                           v
                             +---------------------------+
                             |    rasterizer_controller  |
                             |        (Arbiter FSM)      |
                             +---------------------------+
                                           |
                                [Port A: Write Channel]
                                           v
                             +---------------------------+
                             |        framebuffer        |
                             |   (19,200 x 24-bit SRAM)  |
                             +---------------------------+
                                           ^
                                [Port B: Read Channel]
                                           |
                             +---------------------------+
                             |     display_controller    |
                             |    (160x120 60Hz Raster)  |
                             +---------------------------+
                                           |
                                [pixel_rgb, hsync, vsync]
                                           v
                               +-----------------------+
                               |     VIDEO OUTPUT      |
                               +-----------------------+
```

---

## 3. Clocking and Reset Strategy

- **`clk` (System Clock):** 50 MHz nominal. All rasterization and command processing execute synchronously on the rising edge of `clk`.
- **`rst_n` (Active-Low Asynchronous Reset):** Resets all internal pointers, FSM state registers, rasterizer counters, and display beam coordinates.
- **Clock Domains:** The MiniGPU top-level architecture utilizes a single unified synchronous clock domain, avoiding cross-clock domain (CDC) metastability hazards. The virtual display scan counter divides the 50 MHz clock down to standard display refresh intervals.

---

## 4. Hardware Resolution and Memory Geometry

```
(0,0) ----------------------------------> +X (159)
  |                                        |
  |      160 x 120 Address Mapping:        |
  |      Addr = (Y * 160) + X             |
  |                                        |
  v                                        |
 +Y (119) -------------------------------+ (159,119)
```

- **Row Width:** 160 pixels (requiring 8-bit unsigned horizontal coordinates `[7:0]`).
- **Column Height:** 120 pixels (requiring 7-bit unsigned vertical coordinates `[6:0]`).
- **Linear Address Calculation:**
  $$\text{Address} = Y \times 160 + X = (Y \ll 7) + (Y \ll 5) + X$$
  The address generator uses hardwired bit-shifts and adders, requiring zero clock cycles and zero DSP multipliers.
