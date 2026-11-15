// =============================================================================
// Module: mac_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Multiply-Accumulate (MAC) Engine for INT8 Neural Network Inference
//
// Operation:
//   acc_out <= (clear_acc) ? init_val :
//              (mac_en)    ? acc_out + ($signed({1'b0, act_in}) * weight_in) :
//                            acc_out;
// =============================================================================

`timescale 1ns / 1ps

module mac_unit (
    input  wire               clk,
    input  wire               rst_n,
    input  wire               clear_acc,    // When high, resets/reloads accumulator with init_val
    input  wire signed [31:0] init_val,     // Bias value to initialize accumulator
    input  wire               mac_en,       // Enable multiply and accumulate
    input  wire        [7:0]  act_in,       // Unsigned 8-bit activation (pixel or hidden neuron)
    input  wire signed [7:0]  weight_in,    // Signed 8-bit weight (-128 to +127)
    output reg  signed [31:0] acc_out,      // Signed 32-bit accumulated sum
    output wire signed [16:0] mult_out      // Combinational product for inspection
);

    // Unsigned activation is zero-extended to signed 9-bit operand:
    wire signed [8:0] act_signed = $signed({1'b0, act_in});

    // 9-bit signed * 8-bit signed = 17-bit signed product (range: -32640 to +32385)
    assign mult_out = act_signed * weight_in;

    // Sequential Accumulator Register
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            acc_out <= 32'sd0;
        end else if (clear_acc) begin
            acc_out <= init_val;
        end else if (mac_en) begin
            acc_out <= acc_out + $signed({{15{mult_out[16]}}, mult_out});
        end
    end

endmodule
