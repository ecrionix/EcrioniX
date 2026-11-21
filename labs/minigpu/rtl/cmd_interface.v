// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  cmd_interface
// File:    cmd_interface.v
// Purpose: Host Command Interface with Ready/Valid Handshake & FIFO Packing
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module cmd_interface (
    input  wire        clk,
    input  wire        rst_n,

    // Host interface ports
    input  wire        cmd_valid_in,
    output wire        cmd_ready_out,
    input  wire [1:0]  cmd_type_in,    // 00=Rect, 01=Circ, 10=Tri, 11=Clear
    input  wire [7:0]  param_x0_in,    // X0 / Rect X / Circ CX / Tri X0
    input  wire [6:0]  param_y0_in,    // Y0 / Rect Y / Circ CY / Tri Y0
    input  wire [7:0]  param_x1_in,    // X1 / Rect W / Circ R  / Tri X1
    input  wire [6:0]  param_y1_in,    // Y1 / Rect H / Unused  / Tri Y1
    input  wire [7:0]  param_x2_in,    // X2 / Unused / Unused  / Tri X2
    input  wire [6:0]  param_y2_in,    // Y2 / Unused / Unused  / Tri Y2
    input  wire [23:0] param_color_in, // RGB888 Color

    // Command FIFO write interface
    input  wire        fifo_full,
    output wire        fifo_wr_en,
    output wire [85:0] fifo_wr_data
);

    // MiniGPU is ready to accept host commands when FIFO is not full
    assign cmd_ready_out = !fifo_full;

    // Write to FIFO on valid handshake
    assign fifo_wr_en = cmd_valid_in && cmd_ready_out;

    // Pack 86-bit command packet
    // [85:84] : Command type (2 bits)
    // [83:76] : X0 (8 bits)
    // [75:69] : Y0 (7 bits)
    // [68:61] : X1 (8 bits)
    // [60:54] : Y1 (7 bits)
    // [53:46] : X2 (8 bits)
    // [45:39] : Y2 (7 bits)
    // [38:15] : Color RGB888 (24 bits)
    // [14:0]  : Reserved (15 bits)
    assign fifo_wr_data = {
        cmd_type_in,     // [85:84]
        param_x0_in,     // [83:76]
        param_y0_in,     // [75:69]
        param_x1_in,     // [68:61]
        param_y1_in,     // [60:54]
        param_x2_in,     // [53:46]
        param_y2_in,     // [45:39]
        param_color_in,  // [38:15]
        15'd0            // [14:0]
    };

endmodule
