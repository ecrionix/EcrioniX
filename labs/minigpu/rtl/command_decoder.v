// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  command_decoder
// File:    command_decoder.v
// Purpose: Hardware Command Decoding, Parameter Validation & Bounding-Box Setup
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module command_decoder #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120
)(
    input  wire        clk,
    input  wire        rst_n,

    // Interface with Command FIFO
    input  wire        fifo_empty,
    input  wire [85:0] fifo_data,
    output reg         fifo_rd_en,

    // Interface with Rasterizer Controller
    input  wire        raster_idle,
    input  wire        cmd_done,
    output reg         cmd_valid_out,
    output reg  [1:0]  cmd_type_out,

    // Unpacked Shape Coordinates
    output reg  [7:0]  shape_x0,
    output reg  [6:0]  shape_y0,
    output reg  [7:0]  shape_x1,
    output reg  [6:0]  shape_y1,
    output reg  [7:0]  shape_x2,
    output reg  [6:0]  shape_y2,
    output reg  [23:0] shape_color,

    // Clipped Bounding-Box Limits
    output reg  [7:0]  bbox_min_x,
    output reg  [7:0]  bbox_max_x,
    output reg  [6:0]  bbox_min_y,
    output reg  [6:0]  bbox_max_y
);

    // Unpack raw fields from FIFO packet
    wire [1:0]  raw_type  = fifo_data[85:84];
    wire [7:0]  raw_x0    = fifo_data[83:76];
    wire [6:0]  raw_y0    = fifo_data[75:69];
    wire [7:0]  raw_x1    = fifo_data[68:61];
    wire [6:0]  raw_y1    = fifo_data[60:54];
    wire [7:0]  raw_x2    = fifo_data[53:46];
    wire [6:0]  raw_y2    = fifo_data[45:39];
    wire [23:0] raw_color = fifo_data[38:15];

    // Combinational Bounding-Box Calculation
    reg [7:0] calc_min_x;
    reg [7:0] calc_max_x;
    reg [6:0] calc_min_y;
    reg [6:0] calc_max_y;

    // Helper functions for min/max
    function [7:0] min3_8(input [7:0] a, input [7:0] b, input [7:0] c);
        reg [7:0] m;
        begin
            m = (a < b) ? a : b;
            min3_8 = (m < c) ? m : c;
        end
    endfunction

    function [7:0] max3_8(input [7:0] a, input [7:0] b, input [7:0] c);
        reg [7:0] m;
        begin
            m = (a > b) ? a : b;
            max3_8 = (m > c) ? m : c;
        end
    endfunction

    function [6:0] min3_7(input [6:0] a, input [6:0] b, input [6:0] c);
        reg [6:0] m;
        begin
            m = (a < b) ? a : b;
            min3_7 = (m < c) ? m : c;
        end
    endfunction

    function [6:0] max3_7(input [6:0] a, input [6:0] b, input [6:0] c);
        reg [6:0] m;
        begin
            m = (a > b) ? a : b;
            max3_7 = (m > c) ? m : c;
        end
    endfunction

    always @(*) begin
        case (raw_type)
            2'b00: begin // Rectangle: X, Y, Width, Height
                calc_min_x = (raw_x0 < SCREEN_WIDTH) ? raw_x0 : 8'd0;
                calc_max_x = (({1'b0, raw_x0} + {1'b0, raw_x1}) > SCREEN_WIDTH) ? 
                             8'd159 : (raw_x1 > 8'd0 ? raw_x0 + raw_x1 - 1'b1 : raw_x0);
                calc_min_y = (raw_y0 < SCREEN_HEIGHT) ? raw_y0 : 7'd0;
                calc_max_y = (({1'b0, raw_y0} + {1'b0, raw_y1}) > SCREEN_HEIGHT) ? 
                             7'd119 : (raw_y1 > 7'd0 ? raw_y0 + raw_y1 - 1'b1 : raw_y0);
            end

            2'b01: begin // Circle: Center X, Center Y, Radius
                calc_min_x = (raw_x0 >= raw_x1) ? (raw_x0 - raw_x1) : 8'd0;
                calc_max_x = (({1'b0, raw_x0} + {1'b0, raw_x1}) > 9'd159) ? 8'd159 : (raw_x0 + raw_x1);
                calc_min_y = (raw_y0 >= raw_x1[6:0]) ? (raw_y0 - raw_x1[6:0]) : 7'd0;
                calc_max_y = (({1'b0, raw_y0} + {1'b0, raw_x1[6:0]}) > 8'd119) ? 7'd119 : (raw_y0 + raw_x1[6:0]);
            end

            2'b10: begin // Triangle: V0(x0,y0), V1(x1,y1), V2(x2,y2)
                calc_min_x = min3_8(raw_x0, raw_x1, raw_x2);
                calc_max_x = (max3_8(raw_x0, raw_x1, raw_x2) < SCREEN_WIDTH) ? 
                              max3_8(raw_x0, raw_x1, raw_x2) : 8'd159;
                calc_min_y = min3_7(raw_y0, raw_y1, raw_y2);
                calc_max_y = (max3_7(raw_y0, raw_y1, raw_y2) < SCREEN_HEIGHT) ? 
                              max3_7(raw_y0, raw_y1, raw_y2) : 7'd119;
            end

            2'b11: begin // Clear Screen (Full Framebuffer)
                calc_min_x = 8'd0;
                calc_max_x = 8'd159;
                calc_min_y = 7'd0;
                calc_max_y = 7'd119;
            end
        endcase
    end

    // FSM for Decoder Dispatches
    localparam DEC_IDLE = 2'b00;
    localparam DEC_WAIT = 2'b01;
    localparam DEC_POP  = 2'b10;

    reg [1:0] dec_state;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            dec_state     <= DEC_IDLE;
            fifo_rd_en    <= 1'b0;
            cmd_valid_out <= 1'b0;
            cmd_type_out  <= 2'b00;
            shape_x0      <= 8'd0;
            shape_y0      <= 7'd0;
            shape_x1      <= 8'd0;
            shape_y1      <= 7'd0;
            shape_x2      <= 8'd0;
            shape_y2      <= 7'd0;
            shape_color   <= 24'd0;
            bbox_min_x    <= 8'd0;
            bbox_max_x    <= 8'd0;
            bbox_min_y    <= 7'd0;
            bbox_max_y    <= 7'd0;
        end else begin
            fifo_rd_en <= 1'b0; // Default pulse

            case (dec_state)
                DEC_IDLE: begin
                    cmd_valid_out <= 1'b0;
                    if (!fifo_empty && raster_idle) begin
                        cmd_type_out  <= raw_type;
                        shape_x0      <= raw_x0;
                        shape_y0      <= raw_y0;
                        shape_x1      <= raw_x1;
                        shape_y1      <= raw_y1;
                        shape_x2      <= raw_x2;
                        shape_y2      <= raw_y2;
                        shape_color   <= raw_color;
                        bbox_min_x    <= calc_min_x;
                        bbox_max_x    <= calc_max_x;
                        bbox_min_y    <= calc_min_y;
                        bbox_max_y    <= calc_max_y;

                        cmd_valid_out <= 1'b1;
                        dec_state     <= DEC_WAIT;
                    end
                end

                DEC_WAIT: begin
                    if (cmd_done) begin
                        cmd_valid_out <= 1'b0;
                        fifo_rd_en    <= 1'b1; // Dequeue command from FIFO
                        dec_state     <= DEC_POP;
                    end else if (!raster_idle) begin
                        cmd_valid_out <= 1'b0; // Rasterizer has acknowledged
                    end
                end

                DEC_POP: begin
                    fifo_rd_en <= 1'b0;
                    dec_state  <= DEC_IDLE; // Allow 1 clock cycle for FIFO to advance rd_ptr
                end

                default: dec_state <= DEC_IDLE;
            endcase
        end
    end

endmodule
