// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  command_fifo
// File:    command_fifo.v
// Purpose: Synchronous Circular FIFO for Host Drawing Commands
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module command_fifo #(
    parameter DEPTH     = 16,
    parameter WIDTH     = 86,
    parameter ADDR_BITS = 4
)(
    input  wire                  clk,
    input  wire                  rst_n,

    // Write Port
    input  wire                  wr_en,
    input  wire [WIDTH-1:0]      wr_data,

    // Read Port
    input  wire                  rd_en,
    output wire [WIDTH-1:0]      rd_data,

    // Status Flags
    output wire                  empty,
    output wire                  full,
    output reg  [ADDR_BITS:0]    count
);

    reg [WIDTH-1:0]     mem [0:DEPTH-1];
    reg [ADDR_BITS-1:0] wr_ptr;
    reg [ADDR_BITS-1:0] rd_ptr;

    assign empty = (count == {(ADDR_BITS+1){1'b0}});
    assign full  = (count == DEPTH);

    // Read data directly available at head of FIFO
    assign rd_data = mem[rd_ptr];

    integer i;
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            wr_ptr <= {ADDR_BITS{1'b0}};
            rd_ptr <= {ADDR_BITS{1'b0}};
            count  <= {(ADDR_BITS+1){1'b0}};
            for (i = 0; i < DEPTH; i = i + 1) begin
                mem[i] <= {WIDTH{1'b0}};
            end
        end else begin
            // Write action
            if (wr_en && !full) begin
                mem[wr_ptr] <= wr_data;
                wr_ptr      <= (wr_ptr == DEPTH - 1) ? {ADDR_BITS{1'b0}} : wr_ptr + 1'b1;
            end

            // Read action
            if (rd_en && !empty) begin
                rd_ptr <= (rd_ptr == DEPTH - 1) ? {ADDR_BITS{1'b0}} : rd_ptr + 1'b1;
            end

            // Counter update
            case ({wr_en && !full, rd_en && !empty})
                2'b10: count <= count + 1'b1;
                2'b01: count <= count - 1'b1;
                default: count <= count; // 2'b00 or 2'b11 (simultaneous r/w)
            endcase
        end
    end

endmodule
