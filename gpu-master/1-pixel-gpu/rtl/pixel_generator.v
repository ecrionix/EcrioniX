// =============================================================================
// Project: EcrioniX GPU Master - Experiment 01
// Module:  pixel_generator
// File:    pixel_generator.v
// Purpose: Synthesizable 1-Pixel Graphics Pipeline Stage with Registered Latency
// Author:  EcrioniX Hardware Engineering & VLSI Academy (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module pixel_generator (
    input  wire        clk,
    input  wire        rst,             // Synchronous active-high reset
    input  wire        pixel_valid_in,  // Input pixel valid strobe
    input  wire [9:0]  pixel_x_in,      // 10-bit horizontal coordinate (0-1023)
    input  wire [9:0]  pixel_y_in,      // 10-bit vertical coordinate (0-1023)
    input  wire [7:0]  red_in,          // 8-bit Red component (0-255)
    input  wire [7:0]  green_in,        // 8-bit Green component (0-255)
    input  wire [7:0]  blue_in,         // 8-bit Blue component (0-255)

    output reg         pixel_valid_out, // 1-cycle registered valid output
    output reg  [9:0]  pixel_x_out,     // 1-cycle registered horizontal coordinate
    output reg  [9:0]  pixel_y_out,     // 1-cycle registered vertical coordinate
    output reg  [7:0]  red_out,         // 1-cycle registered Red component
    output reg  [7:0]  green_out,       // 1-cycle registered Green component
    output reg  [7:0]  blue_out         // 1-cycle registered Blue component
);

    // Sequential registered pixel generation logic
    always @(posedge clk) begin
        if (rst) begin
            // Synchronous reset clears all registered state to 0
            pixel_valid_out <= 1'b0;
            pixel_x_out     <= 10'd0;
            pixel_y_out     <= 10'd0;
            red_out         <= 8'd0;
            green_out       <= 8'd0;
            blue_out        <= 8'd0;
        end
        else begin
            // Propagate valid signal through flip-flop stage
            pixel_valid_out <= pixel_valid_in;

            // When pixel_valid_in is HIGH, latch new coordinate and RGB data
            if (pixel_valid_in) begin
                pixel_x_out <= pixel_x_in;
                pixel_y_out <= pixel_y_in;
                red_out     <= red_in;
                green_out   <= green_in;
                blue_out    <= blue_in;
            end
            // When pixel_valid_in is LOW, previous coordinate and RGB values
            // are held stable in registers while pixel_valid_out deasserts.
        end
    end

endmodule
