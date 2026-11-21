// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_circle
// File:    tb_circle.v
// Purpose: Unit Testbench for Hardware Circle Rasterizer (Squared Distance)
// =============================================================================

`timescale 1ns / 1ps

module tb_circle;
    reg        enable;
    reg  [7:0] cur_x;
    reg  [6:0] cur_y;
    reg  [7:0] circ_cx;
    reg  [6:0] circ_cy;
    reg  [7:0] circ_r;
    wire       hit;

    circle_rasterizer #(
        .SCREEN_WIDTH(160),
        .SCREEN_HEIGHT(120)
    ) dut (
        .enable(enable),
        .cur_x(cur_x),
        .cur_y(cur_y),
        .circ_cx(circ_cx),
        .circ_cy(circ_cy),
        .circ_r(circ_r),
        .hit(hit)
    );

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== CIRCLE RASTERIZER UNIT VERIFICATION ===");
        enable = 1;

        // 1. Standard Circle (CX=50, CY=50, R=10)
        circ_cx = 50; circ_cy = 50; circ_r = 10;
        cur_x = 50; cur_y = 50; #1; if (hit) passed++; else failed++; // Center
        cur_x = 50; cur_y = 40; #1; if (hit) passed++; else failed++; // Top
        cur_x = 50; cur_y = 60; #1; if (hit) passed++; else failed++; // Bottom
        cur_x = 40; cur_y = 50; #1; if (hit) passed++; else failed++; // Left
        cur_x = 60; cur_y = 50; #1; if (hit) passed++; else failed++; // Right
        cur_x = 50; cur_y = 39; #1; if (!hit) passed++; else failed++; // Outside top
        cur_x = 61; cur_y = 50; #1; if (!hit) passed++; else failed++; // Outside right

        // 2. Symmetry verification (dx=6, dy=8 -> 36+64=100 <= 100)
        cur_x = 56; cur_y = 58; #1; if (hit) passed++; else failed++; // (+6, +8)
        cur_x = 44; cur_y = 58; #1; if (hit) passed++; else failed++; // (-6, +8)
        cur_x = 56; cur_y = 42; #1; if (hit) passed++; else failed++; // (+6, -8)
        cur_x = 44; cur_y = 42; #1; if (hit) passed++; else failed++; // (-6, -8)

        // 3. Small radius zero (single pixel at center)
        circ_cx = 20; circ_cy = 20; circ_r = 0;
        cur_x = 20; cur_y = 20; #1; if (hit) passed++; else failed++;
        cur_x = 21; cur_y = 20; #1; if (!hit) passed++; else failed++;

        // 4. Boundary clipping (circle at right edge CX=158, CY=60, R=10)
        circ_cx = 158; circ_cy = 60; circ_r = 10;
        cur_x = 159; cur_y = 60; #1; if (hit) passed++; else failed++;
        cur_x = 160; cur_y = 60; #1; if (!hit) passed++; else failed++; // outside screen

        $display("Circle Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
