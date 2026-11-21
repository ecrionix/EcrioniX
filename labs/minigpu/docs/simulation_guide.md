# EcrioniX MiniGPU – Simulation & Verification Guide

This guide describes how to compile, simulate, and verify the MiniGPU hardware modules on your local machine using open-source tools.

---

## 1. Prerequisites

MiniGPU is verified on open-source EDA tooling:
- **Icarus Verilog (`iverilog`)**: Version 10.0 or higher (supports `-g2012`).
- **VVP Runtime (`vvp`)**: Included with Icarus Verilog.
- **GTKWave (`gtkwave`)**: Version 3.3.100 or higher (waveform viewer).

### Installation

#### Ubuntu / Debian / WSL
```bash
sudo apt update
sudo apt install iverilog gtkwave
```

#### macOS (via Homebrew)
```bash
brew install icarus-verilog gtkwave
```

#### Windows
Download and run the Icarus Verilog Windows installer from:
[http://bleyer.org/icarus/](http://bleyer.org/icarus/)  
(Ensure *"Add to system PATH"* is checked during installation).

---

## 2. Quick Simulation in 30 Seconds

Navigate into the `sim/` directory:

```bash
cd sim
```

### Running Complete System Regression
- **Linux / macOS:**
  ```bash
  chmod +x run_all_sim.sh
  ./run_all_sim.sh
  ```
- **Windows (Command Prompt / PowerShell):**
  ```cmd
  run_all_sim.bat
  ```
- **Using Make:**
  ```bash
  make sim_all
  ```

---

## 3. Individual Testbench Execution

| Test Target | Make Command | Direct Icarus Command |
|---|---|---|
| **Top-Level System** | `make sim_top` | `iverilog -g2012 -o build/top.vvp ../tb/tb_minigpu_top.v ../rtl/*.v && vvp build/top.vvp` |
| **Rectangle Engine** | `make sim_rect` | `iverilog -g2012 -o build/rect.vvp ../tb/tb_rectangle.v ../rtl/rectangle_rasterizer.v && vvp build/rect.vvp` |
| **Circle Engine** | `make sim_circle` | `iverilog -g2012 -o build/circ.vvp ../tb/tb_circle.v ../rtl/circle_rasterizer.v && vvp build/circ.vvp` |
| **Triangle Engine** | `make sim_tri` | `iverilog -g2012 -o build/tri.vvp ../tb/tb_triangle.v ../rtl/triangle_rasterizer.v && vvp build/tri.vvp` |
| **Command FIFO** | `make sim_fifo` | `iverilog -g2012 -o build/fifo.vvp ../tb/tb_cmd_fifo.v ../rtl/command_fifo.v && vvp build/fifo.vvp` |
| **Framebuffer Memory** | `make sim_fb` | `iverilog -g2012 -o build/fb.vvp ../tb/tb_framebuffer.v ../rtl/framebuffer.v && vvp build/fb.vvp` |
| **Display Controller** | `make sim_disp` | `iverilog -g2012 -o build/disp.vvp ../tb/tb_display.v ../rtl/display_controller.v && vvp build/disp.vvp` |

---

## 4. Expected Simulation Output

When running `sim_top`, you should see the following console output:

```
VCD info: dumpfile minigpu_sim.vcd opened for output.
=================================================================
   ECRIONIX MINIGPU - CYCLE-ACCURATE RTL VERIFICATION SUITE      
=================================================================
[TEST 1] Clear Screen with Background #000000...
  -> PASS: Screen cleared to black (19,200 pixels initialized).
[TEST 2] Red Rectangle Rasterization (20,20 to 59,49)...
  -> PASS: Red rectangle correctly rasterized with boundary clipping.
[TEST 3] Green Circle Rasterization (Center=100,50, Radius=25)...
  -> PASS: Green circle rasterized using squared-distance equation.
[TEST 4] Blue Triangle Rasterization (Pineda Edge Function)...
  -> PASS: Blue triangle rasterized with signed edge arithmetic.
[TEST 5] Overlapping Shapes (Yellow Square over Green Circle)...
  -> PASS: Overlapping geometry correctly respects command order.
[TEST 6] Command FIFO Burst Enqueue & Handshake...
  -> PASS: FIFO burst queue handled without data loss.
[TEST 7] Display Controller Virtual Raster Scanning...
  -> PASS: Display raster timing signals valid and active.
=================================================================
   MINIGPU VERIFICATION SUMMARY: 7 PASSED, 0 FAILED          
   *** ALL RTL TESTS COMPLETED SUCCESSFULLY (PASS) ***          
=================================================================
```

---

## 5. Waveform Inspection with GTKWave

The top-level simulation dumps standard VCD waveforms to `minigpu_sim.vcd`.

Open the waveform file:
```bash
gtkwave minigpu_sim.vcd
```

Key signals to inspect:
- `tb_minigpu_top.uut.clk`: Master clock.
- `tb_minigpu_top.uut.cmd_interface_inst.cmd_valid` & `cmd_ready`: Command handshakes.
- `tb_minigpu_top.uut.cmd_fifo_inst.fifo_count`: Queue occupancy.
- `tb_minigpu_top.uut.rasterizer_ctrl_inst.active_engine`: Current drawing engine.
- `tb_minigpu_top.uut.framebuffer_inst.we_a` & `addr_a`: Framebuffer write strobes.
- `tb_minigpu_top.uut.display_ctrl_inst.hsync` & `vsync`: Video refresh pulses.
