// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  framebuffer
// File:    framebuffer.v
// Purpose: True Dual-Port Synchronous Video Memory (19,200 x 24-bit RGB888)
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module framebuffer #(
    parameter WIDTH     = 24,
    parameter SIZE      = 19200,   // 160 x 120 pixels
    parameter ADDR_BITS = 15       // 2^15 = 32768 > 19200
)(
    input  wire                 clk,
    input  wire                 rst_n,

    // Port A: Render Write Port
    input  wire                 we_a,
    input  wire [ADDR_BITS-1:0] addr_a,
    input  wire [WIDTH-1:0]     din_a,

    // Port B: Display Read Port
    input  wire                 re_b,
    input  wire [ADDR_BITS-1:0] addr_b,
    output reg  [WIDTH-1:0]     dout_b
);

    // Synthesizable RAM block
    reg [WIDTH-1:0] mem [0:SIZE-1];

    integer i;

    // Port A Write Operation
    always @(posedge clk) begin
        if (we_a && (addr_a < SIZE)) begin
            mem[addr_a] <= din_a;
        end
    end

    // Port B Read Operation (Synchronous 1-cycle read latency)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            dout_b <= {WIDTH{1'b0}};
        end else begin
            if (re_b) begin
                if (addr_b < SIZE) begin
                    dout_b <= mem[addr_b];
                end else begin
                    dout_b <= {WIDTH{1'b0}};
                end
            end
        end
    end

    // Power-up initialization for simulation
    initial begin
        for (i = 0; i < SIZE; i = i + 1) begin
            mem[i] = {WIDTH{1'b0}};
        end
    end

endmodule
