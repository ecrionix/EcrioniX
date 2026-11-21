// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  pixel_color_generator
// File:    pixel_color_generator.v
// Purpose: Hardware Pixel Color Formatting & Qualification
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module pixel_color_generator (
    input  wire [1:0]  cmd_type,       // 00=Rect, 01=Circ, 10=Tri, 11=Clear
    input  wire [23:0] shape_color,    // RGB888 Color
    input  wire        shape_hit,      // Hit from active rasterizer
    output wire        pixel_valid,    // Qualified pixel ready to write
    output wire [23:0] pixel_color     // Qualified 24-bit RGB
);

    // For Clear command (2'b11), every pixel in the screen grid is valid.
    // For Shapes (2'b00, 2'b01, 2'b10), only pixels that pass the coverage test are valid.
    wire is_clear = (cmd_type == 2'b11);

    assign pixel_valid = is_clear || shape_hit;
    assign pixel_color = shape_color;

endmodule
