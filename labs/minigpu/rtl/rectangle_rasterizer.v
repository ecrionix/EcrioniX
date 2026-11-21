// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  rectangle_rasterizer
// File:    rectangle_rasterizer.v
// Purpose: Hardware Rectangle Coverage & Clipping Rasterizer
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module rectangle_rasterizer #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120
)(
    input  wire       enable,
    input  wire [7:0] cur_x,
    input  wire [6:0] cur_y,
    input  wire [7:0] rect_x,
    input  wire [6:0] rect_y,
    input  wire [7:0] rect_w,
    input  wire [6:0] rect_h,
    output wire       hit
);

    wire [8:0] right_edge  = {1'b0, rect_x} + {1'b0, rect_w};
    wire [7:0] bottom_edge = {1'b0, rect_y} + {1'b0, rect_h};

    wire inside_x = (cur_x >= rect_x) && ({1'b0, cur_x} < right_edge);
    wire inside_y = (cur_y >= rect_y) && ({1'b0, cur_y} < bottom_edge);
    wire valid_screen = (cur_x < SCREEN_WIDTH) && (cur_y < SCREEN_HEIGHT);

    assign hit = enable && inside_x && inside_y && valid_screen && (rect_w > 8'd0) && (rect_h > 7'd0);

endmodule
