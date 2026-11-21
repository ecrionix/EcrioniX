@echo off
rem ==============================================================================
rem EcrioniX MiniGPU - Complete Verification Regression Runner
rem Windows Command Prompt / PowerShell Batch Script
rem Prerequisites: iverilog (>= 10.0), vvp on PATH
rem ==============================================================================

echo ====================================================================
echo           EcrioniX MiniGPU - RTL Verification Regression Suite       
echo ====================================================================

set RTL=..\rtl
set TB=..\tb
set BUILD=build

if not exist %BUILD% mkdir %BUILD%

echo.
echo [1/7] Testing Command FIFO Buffer...
iverilog -g2012 -o %BUILD%\tb_cmd_fifo.vvp %TB%\tb_cmd_fifo.v %RTL%\command_fifo.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_cmd_fifo.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [2/7] Testing Dual-Port Framebuffer Memory...
iverilog -g2012 -o %BUILD%\tb_framebuffer.vvp %TB%\tb_framebuffer.v %RTL%\framebuffer.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_framebuffer.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [3/7] Testing Rectangle Rasterizer...
iverilog -g2012 -o %BUILD%\tb_rectangle.vvp %TB%\tb_rectangle.v %RTL%\rectangle_rasterizer.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_rectangle.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [4/7] Testing Circle Rasterizer (DSP)...
iverilog -g2012 -o %BUILD%\tb_circle.vvp %TB%\tb_circle.v %RTL%\circle_rasterizer.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_circle.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [5/7] Testing Triangle Rasterizer (Pineda)...
iverilog -g2012 -o %BUILD%\tb_triangle.vvp %TB%\tb_triangle.v %RTL%\triangle_rasterizer.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_triangle.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [6/7] Testing Display Controller...
iverilog -g2012 -o %BUILD%\tb_display.vvp %TB%\tb_display.v %RTL%\display_controller.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\tb_display.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo [7/7] Testing Top-Level MiniGPU System Integration...
iverilog -g2012 -o %BUILD%\minigpu_top.vvp %TB%\tb_minigpu_top.v %RTL%\cmd_interface.v %RTL%\command_fifo.v %RTL%\command_decoder.v %RTL%\rasterizer_controller.v %RTL%\rectangle_rasterizer.v %RTL%\circle_rasterizer.v %RTL%\triangle_rasterizer.v %RTL%\pixel_color_generator.v %RTL%\framebuffer.v %RTL%\display_controller.v %RTL%\minigpu_top.v
if %errorlevel% neq 0 ( echo Compilation failed! & exit /b 1 )
vvp %BUILD%\minigpu_top.vvp
if %errorlevel% neq 0 ( echo Test failed! & exit /b 1 )

echo.
echo ====================================================================
echo   ALL 7 TESTS COMPLETED SUCCESSFULLY (PASS)!
echo ====================================================================
