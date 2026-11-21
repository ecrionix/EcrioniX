// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  triangle_rasterizer
// File:    triangle_rasterizer.v
// Purpose: Pineda Edge-Function Triangle Rasterizer (Signed Fixed-Point)
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module triangle_rasterizer #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120
)(
    input  wire       enable,
    input  wire [7:0] cur_x,
    input  wire [6:0] cur_y,
    input  wire [7:0] v0_x,
    input  wire [6:0] v0_y,
    input  wire [7:0] v1_x,
    input  wire [6:0] v1_y,
    input  wire [7:0] v2_x,
    input  wire [6:0] v2_y,
    output wire       hit
);

    // Signed extension for vertices and current coordinate
    wire signed [10:0] px = $signed({3'b000, cur_x});
    wire signed [10:0] py = $signed({4'b0000, cur_y});

    wire signed [10:0] x0 = $signed({3'b000, v0_x});
    wire signed [10:0] y0 = $signed({4'b0000, v0_y});
    wire signed [10:0] x1 = $signed({3'b000, v1_x});
    wire signed [10:0] y1 = $signed({4'b0000, v1_y});
    wire signed [10:0] x2 = $signed({3'b000, v2_x});
    wire signed [10:0] y2 = $signed({4'b0000, v2_y});

    // Edge vectors
    wire signed [10:0] dx01 = x1 - x0;
    wire signed [10:0] dy01 = y1 - y0;

    wire signed [10:0] dx12 = x2 - x1;
    wire signed [10:0] dy12 = y2 - y1;

    wire signed [10:0] dx20 = x0 - x2;
    wire signed [10:0] dy20 = y0 - y2;

    // Cross products for edge functions
    // E01(p) = (px - x0) * dy01 - (py - y0) * dx01
    // E12(p) = (px - x1) * dy12 - (py - y1) * dx12
    // E20(p) = (px - x2) * dy20 - (py - y2) * dx20
    wire signed [21:0] e01 = (px - x0) * dy01 - (py - y0) * dx01;
    wire signed [21:0] e12 = (px - x1) * dy12 - (py - y1) * dx12;
    wire signed [21:0] e20 = (px - x2) * dy20 - (py - y2) * dx20;

    // Triangle winding check: all positive or all negative
    wire all_pos = (e01 >= 22'sd0) && (e12 >= 22'sd0) && (e20 >= 22'sd0);
    wire all_neg = (e01 <= 22'sd0) && (e12 <= 22'sd0) && (e20 <= 22'sd0);

    // Reject degenerate triangles where all 3 vertices are collinear or identical
    wire non_degenerate = (e01 != 22'sd0) || (e12 != 22'sd0) || (e20 != 22'sd0);

    wire valid_screen = (cur_x < SCREEN_WIDTH) && (cur_y < SCREEN_HEIGHT);

    assign hit = enable && valid_screen && (all_pos || all_neg) && non_degenerate;

endmodule
