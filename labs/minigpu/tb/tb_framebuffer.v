// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_framebuffer
// File:    tb_framebuffer.v
// Purpose: Unit Testbench for Dual-Port Synchronous Framebuffer Memory
// =============================================================================

`timescale 1ns / 1ps

module tb_framebuffer;
    reg         clk;
    reg         rst_n;
    reg         we_a;
    reg  [14:0] addr_a;
    reg  [23:0] din_a;
    reg         re_b;
    reg  [14:0] addr_b;
    wire [23:0] dout_b;

    framebuffer #(
        .WIDTH(24),
        .SIZE(19200),
        .ADDR_BITS(15)
    ) dut (
        .clk(clk),
        .rst_n(rst_n),
        .we_a(we_a),
        .addr_a(addr_a),
        .din_a(din_a),
        .re_b(re_b),
        .addr_b(addr_b),
        .dout_b(dout_b)
    );

    always #5 clk = ~clk;

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== FRAMEBUFFER MEMORY UNIT VERIFICATION ===");
        clk = 0; rst_n = 0; we_a = 0; addr_a = 0; din_a = 0; re_b = 0; addr_b = 0;
        #15 rst_n = 1; #10;

        // 1. Initial State: Read address 0 -> 0x000000
        @(posedge clk); re_b <= 1; addr_b <= 15'd0;
        @(posedge clk); re_b <= 0;
        #1; if (dout_b == 24'h000000) passed++; else failed++;

        // 2. Write to Port A at Address 500 (Pixel 500 = RGB 0xFF55AA)
        @(posedge clk); we_a <= 1; addr_a <= 15'd500; din_a <= 24'hFF55AA;
        @(posedge clk); we_a <= 0;

        // 3. Read back from Port B at Address 500 (1-cycle read latency)
        @(posedge clk); re_b <= 1; addr_b <= 15'd500;
        @(posedge clk); re_b <= 0;
        #1; if (dout_b == 24'hFF55AA) passed++; else failed++;

        // 4. Memory boundary test (Maximum address 19,199)
        @(posedge clk); we_a <= 1; addr_a <= 15'd19199; din_a <= 24'h123456;
        @(posedge clk); we_a <= 0;
        @(posedge clk); re_b <= 1; addr_b <= 15'd19199;
        @(posedge clk); re_b <= 0;
        #1; if (dout_b == 24'h123456) passed++; else failed++;

        $display("Framebuffer Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
