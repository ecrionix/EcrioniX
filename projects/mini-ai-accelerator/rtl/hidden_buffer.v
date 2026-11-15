// =============================================================================
// Module: hidden_buffer
// Project: EcrioniX Mini AI Accelerator Studio
// Description: 32 x 8-bit Dual-Port Synchronous RAM for Hidden Layer Activations
// =============================================================================

`timescale 1ns / 1ps

module hidden_buffer (
    input  wire       clk,
    input  wire       write_en,
    input  wire [4:0] write_addr,    // 0 to 31
    input  wire [7:0] write_data,
    input  wire [4:0] read_addr,     // 0 to 31
    output reg  [7:0] read_data
);

    reg [7:0] mem [0:31];

    always @(posedge clk) begin
        if (write_en) begin
            mem[write_addr] <= write_data;
        end
    end

    always @(posedge clk) begin
        read_data <= mem[read_addr];
    end

endmodule
