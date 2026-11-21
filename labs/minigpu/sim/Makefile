# ==============================================================================
# EcrioniX MiniGPU - Synthesizable 2D Graphics Processor
# Simulation & Verification Makefile
# Simulator: Icarus Verilog (iverilog >= 10.0) | Waveforms: GTKWave
# ==============================================================================

CC = iverilog
VVP = vvp
GTKWAVE = gtkwave
FLAGS = -g2012 -Wall

RTL_DIR = ../rtl
TB_DIR = ../tb
SIM_DIR = .
BUILD_DIR = build

# RTL Modules
RTL_SRCS = $(RTL_DIR)/cmd_interface.v \
           $(RTL_DIR)/command_fifo.v \
           $(RTL_DIR)/command_decoder.v \
           $(RTL_DIR)/rasterizer_controller.v \
           $(RTL_DIR)/rectangle_rasterizer.v \
           $(RTL_DIR)/circle_rasterizer.v \
           $(RTL_DIR)/triangle_rasterizer.v \
           $(RTL_DIR)/pixel_color_generator.v \
           $(RTL_DIR)/framebuffer.v \
           $(RTL_DIR)/display_controller.v \
           $(RTL_DIR)/minigpu_top.v

.PHONY: all clean sim_top sim_rect sim_circle sim_tri sim_fifo sim_fb sim_disp sim_all wave help

all: sim_top

help:
	@echo "EcrioniX MiniGPU Hardware Simulation Targets:"
	@echo "  make sim_top     - Compile and run complete MiniGPU top-level testbench"
	@echo "  make sim_rect    - Unit simulation of Rectangle Rasterizer"
	@echo "  make sim_circle  - Unit simulation of Circle Rasterizer (DSP arithmetic)"
	@echo "  make sim_tri     - Unit simulation of Triangle Rasterizer (Pineda edge function)"
	@echo "  make sim_fifo    - Unit simulation of 16-depth Command FIFO"
	@echo "  make sim_fb      - Unit simulation of Dual-Port 19,200 Framebuffer Memory"
	@echo "  make sim_disp    - Unit simulation of Display Controller Raster Generator"
	@echo "  make sim_all     - Run complete regression test suite"
	@echo "  make wave        - Open GTKWave to inspect minigpu_sim.vcd"
	@echo "  make clean       - Remove generated simulation binaries and waveform dumps"

$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

sim_top: $(BUILD_DIR)
	@echo "==> Compiling Top-Level MiniGPU System..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/minigpu_top_tb.vvp $(TB_DIR)/tb_minigpu_top.v $(RTL_SRCS)
	@echo "==> Running Simulation..."
	$(VVP) $(BUILD_DIR)/minigpu_top_tb.vvp

sim_rect: $(BUILD_DIR)
	@echo "==> Compiling Rectangle Rasterizer Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_rectangle.vvp $(TB_DIR)/tb_rectangle.v $(RTL_DIR)/rectangle_rasterizer.v
	$(VVP) $(BUILD_DIR)/tb_rectangle.vvp

sim_circle: $(BUILD_DIR)
	@echo "==> Compiling Circle Rasterizer Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_circle.vvp $(TB_DIR)/tb_circle.v $(RTL_DIR)/circle_rasterizer.v
	$(VVP) $(BUILD_DIR)/tb_circle.vvp

sim_tri: $(BUILD_DIR)
	@echo "==> Compiling Triangle Rasterizer Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_triangle.vvp $(TB_DIR)/tb_triangle.v $(RTL_DIR)/triangle_rasterizer.v
	$(VVP) $(BUILD_DIR)/tb_triangle.vvp

sim_fifo: $(BUILD_DIR)
	@echo "==> Compiling Command FIFO Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_cmd_fifo.vvp $(TB_DIR)/tb_cmd_fifo.v $(RTL_DIR)/command_fifo.v
	$(VVP) $(BUILD_DIR)/tb_cmd_fifo.vvp

sim_fb: $(BUILD_DIR)
	@echo "==> Compiling Framebuffer Memory Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_framebuffer.vvp $(TB_DIR)/tb_framebuffer.v $(RTL_DIR)/framebuffer.v
	$(VVP) $(BUILD_DIR)/tb_framebuffer.vvp

sim_disp: $(BUILD_DIR)
	@echo "==> Compiling Display Controller Unit Test..."
	$(CC) $(FLAGS) -o $(BUILD_DIR)/tb_display.vvp $(TB_DIR)/tb_display.v $(RTL_DIR)/display_controller.v
	$(VVP) $(BUILD_DIR)/tb_display.vvp

sim_all: sim_fifo sim_fb sim_rect sim_circle sim_tri sim_disp sim_top
	@echo "=========================================================="
	@echo "All MiniGPU Hardware Testbenches Finished Successfully!"
	@echo "=========================================================="

wave:
	@if [ -f minigpu_sim.vcd ]; then \
		$(GTKWAVE) minigpu_sim.vcd & \
	elif [ -f $(BUILD_DIR)/minigpu_sim.vcd ]; then \
		$(GTKWAVE) $(BUILD_DIR)/minigpu_sim.vcd & \
	else \
		echo "Waveform file minigpu_sim.vcd not found. Run 'make sim_top' first."; \
	fi

clean:
	rm -rf $(BUILD_DIR) *.vvp *.vcd *.log
