// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_triangle
// File:    tb_triangle.v
// Purpose: Unit Testbench for Pineda Edge-Function Triangle Rasterizer
// =============================================================================

`timescale 1ns / 1ps

module tb_triangle;
    reg        enable;
    reg  [7:0] cur_x;
    reg  [6:0] cur_y;
    reg  [7:0] v0_x, v1_x, v2_x;
    reg  [6:0] v0_y, v1_y, v2_y;
    wire       hit;

    triangle_rasterizer #(
        .SCREEN_WIDTH(160),
        .SCREEN_HEIGHT(120)
    ) dut (
        .enable(enable),
        .cur_x(cur_x),
        .cur_y(cur_y),
        .v0_x(v0_x), .v0_y(v0_y),
        .v1_x(v1_x), .v1_y(v1_y),
        .v2_x(v2_x), .v2_y(v2_y),
        .hit(hit)
    );

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== TRIANGLE RASTERIZER UNIT VERIFICATION ===");
        enable = 1;

        // 1. Clockwise (CW) Right Triangle: V0(10,10), V1(30,10), V2(10,30)
        v0_x = 10; v0_y = 10;
        v1_x = 30; v1_y = 10;
        v2_x = 10; v2_y = 30;
        cur_x = 12; cur_y = 12; #1; if (hit) passed++; else failed++; // Interior
        cur_x = 10; cur_y = 10; #1; if (hit) passed++; else failed++; // Vertex 0
        cur_x = 30; cur_y = 10; #1; if (hit) passed++; else failed++; // Vertex 1
        cur_x = 10; cur_y = 30; #1; if (hit) passed++; else failed++; // Vertex 2
        cur_x = 25; cur_y = 25; #1; if (!hit) passed++; else failed++; // Outside hypotenuse

        // 2. Counter-Clockwise (CCW) Winding Triangle: V0(10,10), V1(10,30), V2(30,10)
        v0_x = 10; v0_y = 10;
        v1_x = 10; v1_y = 30;
        v2_x = 30; v2_y = 10;
        cur_x = 12; cur_y = 12; #1; if (hit) passed++; else failed++; // Interior in CCW
        cur_x = 25; cur_y = 25; #1; if (!hit) passed++; else failed++; // Outside

        // 3. Degenerate Triangle (Collinear points: 10,10 to 30,30)
        v0_x = 10; v0_y = 10;
        v1_x = 20; v1_y = 20;
        v2_x = 30; v2_y = 30;
        cur_x = 15; cur_y = 15; #1; if (!hit) passed++; else failed++; // Rejected

        $display("Triangle Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
