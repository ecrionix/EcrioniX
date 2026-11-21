// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_rectangle
// File:    tb_rectangle.v
// Purpose: Unit Testbench for Hardware Rectangle Rasterizer & Clipping
// =============================================================================

`timescale 1ns / 1ps

module tb_rectangle;
    reg        enable;
    reg  [7:0] cur_x;
    reg  [6:0] cur_y;
    reg  [7:0] rect_x;
    reg  [6:0] rect_y;
    reg  [7:0] rect_w;
    reg  [6:0] rect_h;
    wire       hit;

    rectangle_rasterizer #(
        .SCREEN_WIDTH(160),
        .SCREEN_HEIGHT(120)
    ) dut (
        .enable(enable),
        .cur_x(cur_x),
        .cur_y(cur_y),
        .rect_x(rect_x),
        .rect_y(rect_y),
        .rect_w(rect_w),
        .rect_h(rect_h),
        .hit(hit)
    );

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== RECTANGLE RASTERIZER UNIT VERIFICATION ===");
        enable = 1;

        // 1. Standard Rectangle at (10, 10, W=20, H=15)
        rect_x = 10; rect_y = 10; rect_w = 20; rect_h = 15;
        cur_x = 10; cur_y = 10; #1; if (hit) passed++; else failed++;
        cur_x = 29; cur_y = 24; #1; if (hit) passed++; else failed++;
        cur_x = 9;  cur_y = 10; #1; if (!hit) passed++; else failed++;
        cur_x = 30; cur_y = 25; #1; if (!hit) passed++; else failed++;

        // 2. Rectangle at Origin (0,0, W=5, H=5)
        rect_x = 0; rect_y = 0; rect_w = 5; rect_h = 5;
        cur_x = 0; cur_y = 0; #1; if (hit) passed++; else failed++;
        cur_x = 4; cur_y = 4; #1; if (hit) passed++; else failed++;
        cur_x = 5; cur_y = 5; #1; if (!hit) passed++; else failed++;

        // 3. One-Pixel Rectangle (50, 50, W=1, H=1)
        rect_x = 50; rect_y = 50; rect_w = 1; rect_h = 1;
        cur_x = 50; cur_y = 50; #1; if (hit) passed++; else failed++;
        cur_x = 51; cur_y = 50; #1; if (!hit) passed++; else failed++;

        // 4. Maximum Valid Boundary Rectangle (155, 115, W=5, H=5)
        rect_x = 155; rect_y = 115; rect_w = 5; rect_h = 5;
        cur_x = 159; cur_y = 119; #1; if (hit) passed++; else failed++;
        cur_x = 160; cur_y = 119; #1; if (!hit) passed++; else failed++; // clipped

        // 5. Rectangle completely outside display (200, 150, W=10, H=10)
        rect_x = 200; rect_y = 125; rect_w = 10; rect_h = 10;
        cur_x = 200; cur_y = 125; #1; if (!hit) passed++; else failed++;

        $display("Rectangle Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
