// =============================================================================
// Module: relu_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Rectified Linear Unit (ReLU) with Power-of-Two Quantization Shift
//
// Operation:
//   ReLU(x) = max(0, x)
//   Quantized: min(255, max(0, acc_in >>> SHIFT_BITS))
// =============================================================================

`timescale 1ns / 1ps

module relu_unit #(
    parameter SHIFT_BITS = 10
)(
    input  wire signed [31:0] acc_in,      // Signed 32-bit accumulator from MAC unit
    output wire        [7:0]  act_out      // Unsigned 8-bit quantized activation (0 to 255)
);

    // Arithmetic right-shift preserves sign:
    wire signed [31:0] shifted = acc_in >>> SHIFT_BITS;

    // ReLU suppression and saturation clamp to [0, 255]:
    assign act_out = (acc_in <= 32'sd0)      ? 8'd0 :
                     (shifted > 32'sd255)    ? 8'd255 :
                                               shifted[7:0];

endmodule
