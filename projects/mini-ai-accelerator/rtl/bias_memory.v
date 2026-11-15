// =============================================================================
// Module: bias_memory
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Synthesizable ROM for Trained Neural Network Biases
//
// Layer 1: 32 signed 32-bit biases (b1)
// Layer 2: 10 signed 32-bit biases (b2)
// =============================================================================

`timescale 1ns / 1ps

module bias_memory (
    input  wire        [4:0]  b1_addr,    // 0 to 31
    output reg  signed [31:0] b1_data,
    input  wire        [3:0]  b2_addr,    // 0 to 9
    output reg  signed [31:0] b2_data
);

    // Layer 1 Biases (Combinational ROM)
    always @(*) begin
        case (b1_addr)
            5'd0: b1_data = 32'sd8024;
            5'd1: b1_data = 32'sd675;
            5'd2: b1_data = -32'sd6751;
            5'd3: b1_data = 32'sd3341;
            5'd4: b1_data = 32'sd14929;
            5'd5: b1_data = -32'sd3453;
            5'd6: b1_data = 32'sd3120;
            5'd7: b1_data = -32'sd4649;
            5'd8: b1_data = 32'sd573;
            5'd9: b1_data = -32'sd3579;
            5'd10: b1_data = 32'sd4734;
            5'd11: b1_data = 32'sd7637;
            5'd12: b1_data = 32'sd1841;
            5'd13: b1_data = -32'sd2500;
            5'd14: b1_data = -32'sd7885;
            5'd15: b1_data = -32'sd2119;
            5'd16: b1_data = -32'sd3381;
            5'd17: b1_data = 32'sd2960;
            5'd18: b1_data = 32'sd2341;
            5'd19: b1_data = -32'sd8531;
            5'd20: b1_data = 32'sd287;
            5'd21: b1_data = -32'sd4000;
            5'd22: b1_data = -32'sd5143;
            5'd23: b1_data = -32'sd4246;
            5'd24: b1_data = 32'sd2316;
            5'd25: b1_data = 32'sd2570;
            5'd26: b1_data = 32'sd5639;
            5'd27: b1_data = -32'sd2313;
            5'd28: b1_data = -32'sd6949;
            5'd29: b1_data = 32'sd4492;
            5'd30: b1_data = 32'sd453;
            5'd31: b1_data = -32'sd763;
            default: b1_data = 32'sd0;
        endcase
    end

    // Layer 2 Biases (Combinational ROM)
    always @(*) begin
        case (b2_addr)
            4'd0: b2_data = -32'sd368;
            4'd1: b2_data = 32'sd1;
            4'd2: b2_data = 32'sd87;
            4'd3: b2_data = -32'sd595;
            4'd4: b2_data = 32'sd709;
            4'd5: b2_data = 32'sd256;
            4'd6: b2_data = 32'sd76;
            4'd7: b2_data = -32'sd132;
            4'd8: b2_data = 32'sd198;
            4'd9: b2_data = -32'sd175;
            default: b2_data = 32'sd0;
        endcase
    end

endmodule
