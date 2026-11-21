# EcrioniX MiniGPU – Cycle-Accurate 2D Graphics Processor

[![Release](https://img.shields.io/badge/Release-MiniGPU%20v1.0-blue.svg)](https://ecrionix.org/labs/minigpu/)
[![RTL Standard](https://img.shields.io/badge/Verilog-IEEE%201364--2001%20%2F%202012-emerald.svg)](https://ecrionix.org/labs/minigpu/)
[![Simulation](https://img.shields.io/badge/Icarus%20Verilog-7%20Passed%2C%200%20Failed-success.svg)](https://ecrionix.org/labs/minigpu/)
[![Synthesis](https://img.shields.io/badge/Yosys-Synthesizable-purple.svg)](https://ecrionix.org/labs/minigpu/)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

MiniGPU is a fully synthesizable, cycle-accurate 2D graphics processing unit designed in Verilog HDL. It executes drawing commands, decodes packet streams, rasterizes 2D primitives using hardware accelerators, writes to a dual-port synchronous framebuffer memory, and scans active video output in real time.

Live interactive lab & architecture explorer: **[https://ecrionix.org/labs/minigpu/](https://ecrionix.org/labs/minigpu/)**

---

## Hardware Highlights

- **Synthesizable Verilog RTL:** 10 core modular hardware blocks with zero proprietary dependencies.
- **Dedicated Rasterization Engines:**
  - **Rectangle Engine:** 2D bounding-box rasterizer with coordinate clipping.
  - **Circle Engine:** Hardware squared-distance DSP evaluator ($(\Delta X)^2 + (\Delta Y)^2 \le R^2$).
  - **Triangle Engine:** Pineda sub-pixel edge-function evaluator with signed arithmetic.
- **Synchronous Dual-Port Framebuffer:** 19,200 words × 24-bit Truecolor RGB888 memory (160×120 resolution).
- **Command FIFO:** 16-entry × 86-bit circular ring buffer with backpressure handshaking.
- **Display Controller:** 60 Hz raster scanning with HSYNC, VSYNC, and active blanking signals.
- **Genuine RTL Simulation:** Verified locally with Icarus Verilog and viewable with GTKWave.

---

## Directory Structure

```
minigpu/
├── rtl/                          # Synthesizable Verilog Hardware Modules
│   ├── cmd_interface.v           # Host Command Interface & Parameter Assembler
│   ├── command_fifo.v            # 16-Depth Synchronous Circular Buffer
│   ├── command_decoder.v         # Opcode Decoder & Parameter Dispatcher
│   ├── rasterizer_controller.v   # Rasterizer Engine Arbiter & FSM
│   ├── rectangle_rasterizer.v    # Hardware Rectangle Engine
│   ├── circle_rasterizer.v       # Hardware Circle Engine (DSP)
│   ├── triangle_rasterizer.v     # Hardware Triangle Engine (Pineda)
│   ├── pixel_color_generator.v   # RGB888 Color Pipeline
│   ├── framebuffer.v             # Dual-Port Synchronous BRAM (19,200 x 24-bit)
│   ├── display_controller.v      # Video Timing Generator (60 Hz)
│   └── minigpu_top.v             # Top-Level System Integration
├── tb/                           # Hardware Verification Testbenches
│   ├── tb_minigpu_top.v          # Comprehensive Top-Level Verification Suite
│   ├── tb_rectangle.v            # Rectangle Engine Unit Test
│   ├── tb_circle.v               # Circle Engine Unit Test
│   ├── tb_triangle.v             # Triangle Engine Unit Test
│   ├── tb_cmd_fifo.v             # Command FIFO Unit Test
│   ├── tb_framebuffer.v          # Dual-Port BRAM Unit Test
│   ├── tb_display.v              # Display Controller Unit Test
│   └── combined_minigpu_sim.v    # Monolithic All-In-One Simulation File
├── sim/                          # Simulation Scripts & Makefiles
│   ├── Makefile                  # Make Targets for Icarus Verilog & GTKWave
│   ├── run_all_sim.sh            # Linux / macOS / WSL Regression Runner
│   ├── run_all_sim.bat           # Windows Command Prompt Regression Runner
│   └── commands_demo.hex         # Example Hex Command Packet Stream
├── docs/                         # Technical Specifications
│   ├── architecture.md           # System Architecture & Clocking Strategy
│   ├── microarchitecture.md      # Detailed Microarchitecture by Module
│   ├── register_map.md           # Opcode & 32-bit Command Packet Layout
│   └── simulation_guide.md       # Step-by-Step Simulation & Waveform Guide
├── README.md                     # Project Overview & Quick Start
└── LICENSE                       # MIT Open-Source License
```

---

## Quick Start Simulation (30 Seconds)

### 1. Prerequisites
Ensure you have **Icarus Verilog** installed:
- Ubuntu/Debian: `sudo apt install iverilog gtkwave`
- macOS: `brew install icarus-verilog gtkwave`
- Windows: Download from [bleyer.org/icarus](http://bleyer.org/icarus/)

### 2. Run All Tests
```bash
cd sim
make sim_all
```
Or on Windows:
```cmd
cd sim
run_all_sim.bat
```

### 3. Open Waveforms
```bash
make wave
```

---

## Version Management

- **Current Stable Version:** `MiniGPU v1.0`
- Release Date: November 2026
- Architecture: 160×120 RGB888 2D Graphics Processor

---

## License

This project is open-source hardware licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
Created by the **EcrioniX Hardware Engineering Team** ([https://ecrionix.org](https://ecrionix.org)).
