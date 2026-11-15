// =============================================================================
// Module: argmax_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Argmax Unit for 10-Class Classification Output
//
// Finds the maximum score among 10 output neurons:
//   predicted_digit = argmax_{k=0..9} (score[k])
// =============================================================================

`timescale 1ns / 1ps

module argmax_unit (
    input  wire               clk,
    input  wire               rst_n,
    input  wire               start_argmax,    // Initializes comparison registers
    input  wire signed [31:0] score_in,        // Score from output layer MAC
    input  wire        [3:0]  score_idx,       // Index of current score (0 to 9)
    input  wire               score_valid,     // Strobe indicating score_in is valid
    output reg         [3:0]  predicted_digit, // Winning class index (0 to 9)
    output reg  signed [31:0] max_score,       // Highest output score
    output reg                argmax_done      // High when all 10 classes processed
);

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            predicted_digit <= 4'd0;
            max_score       <= -32'sd2147483648; // Minimum 32-bit signed integer
            argmax_done     <= 1'b0;
        end else if (start_argmax) begin
            predicted_digit <= 4'd0;
            max_score       <= -32'sd2147483648;
            argmax_done     <= 1'b0;
        end else if (score_valid) begin
            if (score_idx == 4'd0 || score_in > max_score) begin
                max_score       <= score_in;
                predicted_digit <= score_idx;
            end
            if (score_idx == 4'd9) begin
                argmax_done     <= 1'b1;
            end
        end
    end

endmodule
