#!/usr/bin/env bash
# ==============================================================================
# EcrioniX MiniGPU - Complete Verification Regression Runner
# Linux / macOS / WSL Bash Script
# Prerequisites: iverilog (>= 10.0), vvp
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}====================================================================${NC}"
echo -e "${BLUE}          EcrioniX MiniGPU - RTL Verification Regression Suite       ${NC}"
echo -e "${BLUE}====================================================================${NC}"

RTL="../rtl"
TB="../tb"
BUILD="build"

mkdir -p "$BUILD"

# List of tests
tests=(
  "Command FIFO Buffer:tb_cmd_fifo.v:command_fifo.v"
  "Dual-Port Framebuffer:tb_framebuffer.v:framebuffer.v"
  "Rectangle Rasterizer:tb_rectangle.v:rectangle_rasterizer.v"
  "Circle Rasterizer:tb_circle.v:circle_rasterizer.v"
  "Triangle Rasterizer:tb_triangle.v:triangle_rasterizer.v"
  "Display Controller:tb_display.v:display_controller.v"
)

passed=0
total=${#tests[@]}
((total++)) # including top-level

for test in "${tests[@]}"; do
  IFS=":" read -r name tb_file rtl_file <<< "$test"
  echo -e "\n--> Running Test: ${BLUE}$name${NC}..."
  iverilog -g2012 -o "$BUILD/test.vvp" "$TB/$tb_file" "$RTL/$rtl_file"
  if vvp "$BUILD/test.vvp"; then
    echo -e "    ${GREEN}[PASS] $name verified.${NC}"
    ((passed++))
  else
    echo -e "    ${RED}[FAIL] $name failed.${NC}"
    exit 1
  fi
done

# Top level integration
echo -e "\n--> Running Test: ${BLUE}MiniGPU System Top-Level Integration${NC}..."
iverilog -g2012 -o "$BUILD/minigpu_top.vvp" \
  "$TB/tb_minigpu_top.v" \
  "$RTL/cmd_interface.v" \
  "$RTL/command_fifo.v" \
  "$RTL/command_decoder.v" \
  "$RTL/rasterizer_controller.v" \
  "$RTL/rectangle_rasterizer.v" \
  "$RTL/circle_rasterizer.v" \
  "$RTL/triangle_rasterizer.v" \
  "$RTL/pixel_color_generator.v" \
  "$RTL/framebuffer.v" \
  "$RTL/display_controller.v" \
  "$RTL/minigpu_top.v"

if vvp "$BUILD/minigpu_top.vvp"; then
  echo -e "    ${GREEN}[PASS] MiniGPU System Top-Level verified.${NC}"
  ((passed++))
else
  echo -e "    ${RED}[FAIL] MiniGPU System Top-Level failed.${NC}"
  exit 1
fi

echo -e "\n${BLUE}====================================================================${NC}"
echo -e "${GREEN}  REGRESSION SUMMARY: $passed / $total TESTS PASSED (100% SUCCESS)  ${NC}"
echo -e "${BLUE}====================================================================${NC}"
echo -e "Simulation artifacts (including minigpu_sim.vcd) generated in current directory."
