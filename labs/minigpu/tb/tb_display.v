// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_display
// File:    tb_display.v
// Purpose: Unit Testbench for Virtual Display Controller & Raster Scanning
// =============================================================================

`timescale 1ns / 1ps

module tb_display;
    reg         clk;
    reg         rst_n;
    wire [14:0] fb_read_addr;
    wire        fb_read_en;
    reg  [23:0] fb_read_data;
    wire [7:0]  disp_x;
    wire [6:0]  disp_y;
    wire [23:0] rgb_out;
    wire        hsync;
    wire        vsync;
    wire        display_enable;
    wire        frame_tick;

    display_controller #(
        .H_ACTIVE(160),
        .H_TOTAL(200),
        .V_ACTIVE(120),
        .V_TOTAL(130)
    ) dut (
        .clk(clk),
        .rst_n(rst_n),
        .fb_read_addr(fb_read_addr),
        .fb_read_en(fb_read_en),
        .fb_read_data(fb_read_data),
        .disp_x(disp_x),
        .disp_y(disp_y),
        .rgb_out(rgb_out),
        .hsync(hsync),
        .vsync(vsync),
        .display_enable(display_enable),
        .frame_tick(frame_tick)
    );

    always #5 clk = ~clk;

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== DISPLAY CONTROLLER UNIT VERIFICATION ===");
        clk = 0; rst_n = 0; fb_read_data = 24'hAABBCC;
        #15 rst_n = 1;

        // Run through visible area and verify display_enable and coordinates
        repeat (10) @(posedge clk);
        if (display_enable && disp_x < 160 && disp_y < 120 && rgb_out == 24'hAABBCC) passed++; else failed++;

        // Advance to horizontal blanking (clocks 165 to 195)
        repeat (180) @(posedge clk);
        if (!display_enable) passed++; else failed++;

        $display("Display Controller Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
