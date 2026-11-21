// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  circle_rasterizer
// File:    circle_rasterizer.v
// Purpose: Hardware Circle Coverage Engine with Squared-Distance Arithmetic
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module circle_rasterizer #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120
)(
    input  wire       enable,
    input  wire [7:0] cur_x,
    input  wire [6:0] cur_y,
    input  wire [7:0] circ_cx,
    input  wire [6:0] circ_cy,
    input  wire [7:0] circ_r,
    output wire       hit
);

    // Compute signed offsets from circle center
    wire signed [9:0] dx = $signed({2'b00, cur_x}) - $signed({2'b00, circ_cx});
    wire signed [9:0] dy = $signed({3'b000, cur_y}) - $signed({3'b000, circ_cy});

    // Compute squared terms with 20-bit precision (prevents any overflow)
    wire [19:0] dx_sq   = $unsigned(dx * dx);
    wire [19:0] dy_sq   = $unsigned(dy * dy);
    wire [19:0] dist_sq = dx_sq + dy_sq;
    wire [19:0] r_sq    = $unsigned({12'd0, circ_r} * {12'd0, circ_r});

    wire valid_screen = (cur_x < SCREEN_WIDTH) && (cur_y < SCREEN_HEIGHT);

    // Coverage test: dx^2 + dy^2 <= r^2
    assign hit = enable && valid_screen && (dist_sq <= r_sq);

endmodule
