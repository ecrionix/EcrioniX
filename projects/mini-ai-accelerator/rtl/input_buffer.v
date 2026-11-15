// =============================================================================
// Module: input_buffer
// Project: EcrioniX Mini AI Accelerator Studio
// Description: 784 x 8-bit Dual-Port Synchronous RAM for 28x28 Input Image
// =============================================================================

`timescale 1ns / 1ps

module input_buffer (
    input  wire        clk,
    input  wire        write_en,
    input  wire [9:0]  write_addr,    // 0 to 783
    input  wire [7:0]  write_data,
    input  wire [9:0]  read_addr,     // 0 to 783
    output reg  [7:0]  read_data
);

    reg [7:0] mem [0:783];

    // Synchronous Write
    always @(posedge clk) begin
        if (write_en) begin
            mem[write_addr] <= write_data;
        end
    end

    // Synchronous Read
    always @(posedge clk) begin
        read_data <= mem[read_addr];
    end

endmodule
