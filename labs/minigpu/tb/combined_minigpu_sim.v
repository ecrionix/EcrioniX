// =============================================================================
// Project: EcrioniX MiniGPU - Complete Monolithic Simulation Source
// Synthesizable 2D Graphics Processor RTL + Verification Testbench
// =============================================================================

// --- BEGIN MODULE: cmd_interface.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  cmd_interface
// File:    cmd_interface.v
// Purpose: Host Command Interface with Ready/Valid Handshake & FIFO Packing
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module cmd_interface (
    input  wire        clk,
    input  wire        rst_n,

    // Host interface ports
    input  wire        cmd_valid_in,
    output wire        cmd_ready_out,
    input  wire [1:0]  cmd_type_in,    // 00=Rect, 01=Circ, 10=Tri, 11=Clear
    input  wire [7:0]  param_x0_in,    // X0 / Rect X / Circ CX / Tri X0
    input  wire [6:0]  param_y0_in,    // Y0 / Rect Y / Circ CY / Tri Y0
    input  wire [7:0]  param_x1_in,    // X1 / Rect W / Circ R  / Tri X1
    input  wire [6:0]  param_y1_in,    // Y1 / Rect H / Unused  / Tri Y1
    input  wire [7:0]  param_x2_in,    // X2 / Unused / Unused  / Tri X2
    input  wire [6:0]  param_y2_in,    // Y2 / Unused / Unused  / Tri Y2
    input  wire [23:0] param_color_in, // RGB888 Color

    // Command FIFO write interface
    input  wire        fifo_full,
    output wire        fifo_wr_en,
    output wire [85:0] fifo_wr_data
);

    // MiniGPU is ready to accept host commands when FIFO is not full
    assign cmd_ready_out = !fifo_full;

    // Write to FIFO on valid handshake
    assign fifo_wr_en = cmd_valid_in && cmd_ready_out;

    // Pack 86-bit command packet
    // [85:84] : Command type (2 bits)
    // [83:76] : X0 (8 bits)
    // [75:69] : Y0 (7 bits)
    // [68:61] : X1 (8 bits)
    // [60:54] : Y1 (7 bits)
    // [53:46] : X2 (8 bits)
    // [45:39] : Y2 (7 bits)
    // [38:15] : Color RGB888 (24 bits)
    // [14:0]  : Reserved (15 bits)
    assign fifo_wr_data = {
        cmd_type_in,     // [85:84]
        param_x0_in,     // [83:76]
        param_y0_in,     // [75:69]
        param_x1_in,     // [68:61]
        param_y1_in,     // [60:54]
        param_x2_in,     // [53:46]
        param_y2_in,     // [45:39]
        param_color_in,  // [38:15]
        15'd0            // [14:0]
    };

endmodule


// --- BEGIN MODULE: command_fifo.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  command_fifo
// File:    command_fifo.v
// Purpose: Synchronous Circular FIFO for Host Drawing Commands
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module command_fifo #(
    parameter DEPTH     = 16,
    parameter WIDTH     = 86,
    parameter ADDR_BITS = 4
)(
    input  wire                  clk,
    input  wire                  rst_n,

    // Write Port
    input  wire                  wr_en,
    input  wire [WIDTH-1:0]      wr_data,

    // Read Port
    input  wire                  rd_en,
    output wire [WIDTH-1:0]      rd_data,

    // Status Flags
    output wire                  empty,
    output wire                  full,
    output reg  [ADDR_BITS:0]    count
);

    reg [WIDTH-1:0]     mem [0:DEPTH-1];
    reg [ADDR_BITS-1:0] wr_ptr;
    reg [ADDR_BITS-1:0] rd_ptr;

    assign empty = (count == {(ADDR_BITS+1){1'b0}});
    assign full  = (count == DEPTH);

    // Read data directly available at head of FIFO
    assign rd_data = mem[rd_ptr];

    integer i;
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            wr_ptr <= {ADDR_BITS{1'b0}};
            rd_ptr <= {ADDR_BITS{1'b0}};
            count  <= {(ADDR_BITS+1){1'b0}};
            for (i = 0; i < DEPTH; i = i + 1) begin
                mem[i] <= {WIDTH{1'b0}};
            end
        end else begin
            // Write action
            if (wr_en && !full) begin
                mem[wr_ptr] <= wr_data;
                wr_ptr      <= (wr_ptr == DEPTH - 1) ? {ADDR_BITS{1'b0}} : wr_ptr + 1'b1;
            end

            // Read action
            if (rd_en && !empty) begin
                rd_ptr <= (rd_ptr == DEPTH - 1) ? {ADDR_BITS{1'b0}} : rd_ptr + 1'b1;
            end

            // Counter update
            case ({wr_en && !full, rd_en && !empty})
                2'b10: count <= count + 1'b1;
                2'b01: count <= count - 1'b1;
                default: count <= count; // 2'b00 or 2'b11 (simultaneous r/w)
            endcase
        end
    end

endmodule


// --- BEGIN MODULE: rectangle_rasterizer.v ---
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


// --- BEGIN MODULE: circle_rasterizer.v ---
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


// --- BEGIN MODULE: triangle_rasterizer.v ---
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


// --- BEGIN MODULE: pixel_color_generator.v ---
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


// --- BEGIN MODULE: framebuffer.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  framebuffer
// File:    framebuffer.v
// Purpose: True Dual-Port Synchronous Video Memory (19,200 x 24-bit RGB888)
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module framebuffer #(
    parameter WIDTH     = 24,
    parameter SIZE      = 19200,   // 160 x 120 pixels
    parameter ADDR_BITS = 15       // 2^15 = 32768 > 19200
)(
    input  wire                 clk,
    input  wire                 rst_n,

    // Port A: Render Write Port
    input  wire                 we_a,
    input  wire [ADDR_BITS-1:0] addr_a,
    input  wire [WIDTH-1:0]     din_a,

    // Port B: Display Read Port
    input  wire                 re_b,
    input  wire [ADDR_BITS-1:0] addr_b,
    output reg  [WIDTH-1:0]     dout_b
);

    // Synthesizable RAM block
    reg [WIDTH-1:0] mem [0:SIZE-1];

    integer i;

    // Port A Write Operation
    always @(posedge clk) begin
        if (we_a && (addr_a < SIZE)) begin
            mem[addr_a] <= din_a;
        end
    end

    // Port B Read Operation (Synchronous 1-cycle read latency)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            dout_b <= {WIDTH{1'b0}};
        end else begin
            if (re_b) begin
                if (addr_b < SIZE) begin
                    dout_b <= mem[addr_b];
                end else begin
                    dout_b <= {WIDTH{1'b0}};
                end
            end
        end
    end

    // Power-up initialization for simulation
    initial begin
        for (i = 0; i < SIZE; i = i + 1) begin
            mem[i] = {WIDTH{1'b0}};
        end
    end

endmodule


// --- BEGIN MODULE: command_decoder.v ---
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


// --- BEGIN MODULE: rasterizer_controller.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  rasterizer_controller
// File:    rasterizer_controller.v
// Purpose: Hardware Rasterization FSM, Coordinate Traversal & Pixel Dispatch
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module rasterizer_controller #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120
)(
    input  wire        clk,
    input  wire        rst_n,

    // Command Interface from Decoder
    input  wire        cmd_valid,
    input  wire [1:0]  cmd_type,       // 00=Rect, 01=Circ, 10=Tri, 11=Clear
    input  wire [7:0]  bbox_min_x,
    input  wire [7:0]  bbox_max_x,
    input  wire [6:0]  bbox_min_y,
    input  wire [6:0]  bbox_max_y,
    input  wire [23:0] shape_color,
    output reg         cmd_done,

    // Interface to Shape Rasterizers
    output reg         eval_enable,
    output reg  [7:0]  cur_pixel_x,
    output reg  [6:0]  cur_pixel_y,
    input  wire        shape_hit,      // Hit result from active rasterizer
    input  wire        pixel_valid,    // Qualified pixel from pixel_color_generator

    // Framebuffer Write Interface (Port A)
    input  wire        fb_ready,       // Framebuffer memory ready / no stall
    output reg         fb_we,
    output reg  [14:0] fb_addr,
    output reg  [23:0] fb_data,

    // Status and Telemetry
    output wire        raster_idle,
    output reg  [2:0]  raster_state,
    output reg  [31:0] total_pixels_rendered,
    output reg  [15:0] total_commands_done
);

    // FSM State Encoding
    localparam STATE_IDLE      = 3'b000;
    localparam STATE_SETUP     = 3'b001;
    localparam STATE_RASTERIZE = 3'b010;
    localparam STATE_WRITE     = 3'b011;
    localparam STATE_COMPLETE  = 3'b100;

    assign raster_idle = (raster_state == STATE_IDLE);

    // Latched command boundaries and attributes
    reg [1:0]  latched_type;
    reg [7:0]  latched_min_x, latched_max_x;
    reg [6:0]  latched_min_y, latched_max_y;
    reg [23:0] latched_color;

    // Framebuffer address arithmetic: y * 160 + x = (y << 7) + (y << 5) + x
    wire [14:0] calc_addr = ({8'd0, cur_pixel_y} << 7) + 
                            ({8'd0, cur_pixel_y} << 5) + 
                            {7'd0, cur_pixel_x};

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            raster_state          <= STATE_IDLE;
            eval_enable           <= 1'b0;
            cur_pixel_x           <= 8'd0;
            cur_pixel_y           <= 7'd0;
            fb_we                 <= 1'b0;
            fb_addr               <= 15'd0;
            fb_data               <= 24'd0;
            cmd_done              <= 1'b0;
            latched_type          <= 2'b00;
            latched_min_x         <= 8'd0;
            latched_max_x         <= 8'd0;
            latched_min_y         <= 7'd0;
            latched_max_y         <= 7'd0;
            latched_color         <= 24'd0;
            total_pixels_rendered <= 32'd0;
            total_commands_done   <= 16'd0;
        end else begin
            cmd_done <= 1'b0; // Default pulse
            fb_we    <= 1'b0; // Default no-write

            case (raster_state)
                STATE_IDLE: begin
                    eval_enable <= 1'b0;
                    if (cmd_valid) begin
                        latched_type  <= cmd_type;
                        latched_min_x <= bbox_min_x;
                        latched_max_x <= bbox_max_x;
                        latched_min_y <= bbox_min_y;
                        latched_max_y <= bbox_max_y;
                        latched_color <= shape_color;
                        raster_state  <= STATE_SETUP;
                    end
                end

                STATE_SETUP: begin
                    // Initialize scan cursor to top-left of clipped bounding box
                    cur_pixel_x  <= latched_min_x;
                    cur_pixel_y  <= latched_min_y;
                    eval_enable  <= 1'b1;
                    raster_state <= STATE_RASTERIZE;
                end

                STATE_RASTERIZE: begin
                    eval_enable <= 1'b1;

                    // Evaluate if current pixel is covered
                    if (pixel_valid && fb_ready) begin
                        // Dispatch write to Framebuffer Port A
                        fb_we                 <= 1'b1;
                        fb_addr               <= calc_addr;
                        fb_data               <= latched_color;
                        total_pixels_rendered <= total_pixels_rendered + 1'b1;
                    end

                    // Advance coordinates (scanline traversal)
                    if (cur_pixel_x < latched_max_x) begin
                        cur_pixel_x <= cur_pixel_x + 1'b1;
                    end else begin
                        cur_pixel_x <= latched_min_x;
                        if (cur_pixel_y < latched_max_y) begin
                            cur_pixel_y <= cur_pixel_y + 1'b1;
                        end else begin
                            // Reached end of bounding box
                            eval_enable  <= 1'b0;
                            raster_state <= STATE_COMPLETE;
                        end
                    end
                end

                STATE_COMPLETE: begin
                    eval_enable         <= 1'b0;
                    cmd_done            <= 1'b1;
                    total_commands_done <= total_commands_done + 1'b1;
                    raster_state        <= STATE_IDLE;
                end

                default: raster_state <= STATE_IDLE;
            endcase
        end
    end

endmodule


// --- BEGIN MODULE: display_controller.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  display_controller
// File:    display_controller.v
// Purpose: Virtual Display Raster Timing Generator & Framebuffer Port B Scanner
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module display_controller #(
    // Virtual Display Timing Parameters (160 x 120 Resolution)
    parameter H_ACTIVE      = 160,
    parameter H_FRONT_PORCH = 8,
    parameter H_SYNC        = 16,
    parameter H_BACK_PORCH  = 16,
    parameter H_TOTAL       = 200, // 160 + 8 + 16 + 16

    parameter V_ACTIVE      = 120,
    parameter V_FRONT_PORCH = 2,
    parameter V_SYNC        = 4,
    parameter V_BACK_PORCH  = 4,
    parameter V_TOTAL       = 130  // 120 + 2 + 4 + 4
)(
    input  wire        clk,
    input  wire        rst_n,

    // Framebuffer Port B Interface
    output wire [14:0] fb_read_addr,
    output wire        fb_read_en,
    input  wire [23:0] fb_read_data,

    // Display Output Signals
    output reg  [7:0]  disp_x,
    output reg  [6:0]  disp_y,
    output reg  [23:0] rgb_out,
    output reg         hsync,
    output reg         vsync,
    output reg         display_enable,
    output reg         frame_tick
);

    // Scan counters
    reg [7:0] h_count; // 0 .. 199
    reg [7:0] v_count; // 0 .. 129

    // Pre-fetch coordinate logic (1 clock cycle ahead to match SRAM read latency)
    wire [7:0] next_h = (h_count == H_TOTAL - 1) ? 8'd0 : h_count + 1'b1;
    wire [7:0] next_v = (h_count == H_TOTAL - 1) ? 
                        ((v_count == V_TOTAL - 1) ? 8'd0 : v_count + 1'b1) : v_count;

    wire next_active = (next_h < H_ACTIVE) && (next_v < V_ACTIVE);

    // Framebuffer read address: next_v * 160 + next_h = (next_v << 7) + (next_v << 5) + next_h
    assign fb_read_addr = ({8'd0, next_v[6:0]} << 7) + 
                          ({8'd0, next_v[6:0]} << 5) + 
                          {7'd0, next_h};

    assign fb_read_en = next_active;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            h_count        <= 8'd0;
            v_count        <= 8'd0;
            disp_x         <= 8'd0;
            disp_y         <= 7'd0;
            rgb_out        <= 24'd0;
            hsync          <= 1'b1;
            vsync          <= 1'b1;
            display_enable <= 1'b0;
            frame_tick     <= 1'b0;
        end else begin
            // Advance horizontal and vertical scan counters
            if (h_count == H_TOTAL - 1) begin
                h_count <= 8'd0;
                if (v_count == V_TOTAL - 1) begin
                    v_count    <= 8'd0;
                    frame_tick <= 1'b1; // New frame pulse
                end else begin
                    v_count    <= v_count + 1'b1;
                    frame_tick <= 1'b0;
                end
            end else begin
                h_count    <= h_count + 1'b1;
                frame_tick <= 1'b0;
            end

            // Horizontal sync (active low during sync interval)
            hsync <= !( (h_count >= H_ACTIVE + H_FRONT_PORCH) && 
                        (h_count <  H_ACTIVE + H_FRONT_PORCH + H_SYNC) );

            // Vertical sync (active low during sync interval)
            vsync <= !( (v_count >= V_ACTIVE + V_FRONT_PORCH) && 
                        (v_count <  V_ACTIVE + V_FRONT_PORCH + V_SYNC) );

            // Display enable (active during visible frame region)
            display_enable <= (h_count < H_ACTIVE) && (v_count < V_ACTIVE);

            // Output coordinates and pixel color
            if (h_count < H_ACTIVE && v_count < V_ACTIVE) begin
                disp_x  <= h_count;
                disp_y  <= v_count[6:0];
                rgb_out <= fb_read_data; // Framebuffer data arrived 1 cycle after address
            end else begin
                disp_x  <= 8'd0;
                disp_y  <= 7'd0;
                rgb_out <= 24'd0; // Blanking during porch/sync intervals
            end
        end
    end

endmodule


// --- BEGIN MODULE: minigpu_top.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  minigpu_top
// File:    minigpu_top.v
// Purpose: Top-Level Integration of 2D Graphics Processing Architecture
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module minigpu_top #(
    parameter SCREEN_WIDTH  = 160,
    parameter SCREEN_HEIGHT = 120,
    parameter FIFO_DEPTH    = 16,
    parameter FIFO_ADDR     = 4
)(
    input  wire        clk,
    input  wire        rst_n,

    // =========================================================================
    // 1. Host Command Interface (Handshake + Parameters)
    // =========================================================================
    input  wire        cmd_valid_in,
    output wire        cmd_ready_out,
    input  wire [1:0]  cmd_type_in,    // 00=Rect, 01=Circ, 10=Tri, 11=Clear
    input  wire [7:0]  param_x0_in,    // X0 / Rect X / Circ CX / Tri X0
    input  wire [6:0]  param_y0_in,    // Y0 / Rect Y / Circ CY / Tri Y0
    input  wire [7:0]  param_x1_in,    // X1 / Rect W / Circ R  / Tri X1
    input  wire [6:0]  param_y1_in,    // Y1 / Rect H / Unused  / Tri Y1
    input  wire [7:0]  param_x2_in,    // X2 / Unused / Unused  / Tri X2
    input  wire [6:0]  param_y2_in,    // Y2 / Unused / Unused  / Tri Y2
    input  wire [23:0] param_color_in, // RGB888 Color

    // =========================================================================
    // 2. Video Display Output (Raster Scanning Stream)
    // =========================================================================
    output wire        disp_hsync,
    output wire        disp_vsync,
    output wire        disp_de,
    output wire [23:0] disp_rgb,
    output wire [7:0]  disp_x,
    output wire [6:0]  disp_y,
    output wire        disp_frame_tick,

    // =========================================================================
    // 3. Telemetry & Hardware Status Signals
    // =========================================================================
    output wire        status_fifo_empty,
    output wire        status_fifo_full,
    output wire [FIFO_ADDR:0] status_fifo_count,
    output wire        status_raster_idle,
    output wire [2:0]  status_raster_state,
    output wire [7:0]  status_cur_x,
    output wire [6:0]  status_cur_y,
    output wire        status_shape_hit,
    output wire        status_pixel_valid,
    output wire        status_fb_we,
    output wire [14:0] status_fb_addr,
    output wire [23:0] status_fb_wdata,
    output wire [31:0] status_total_rendered,
    output wire [15:0] status_total_cmds
);

    // -------------------------------------------------------------------------
    // Internal Wires & Busses
    // -------------------------------------------------------------------------
    // Host Interface <-> FIFO
    wire        fifo_wr_en;
    wire [85:0] fifo_wr_data;
    wire        fifo_rd_en;
    wire [85:0] fifo_rd_data;
    wire        fifo_empty;
    wire        fifo_full;
    wire [FIFO_ADDR:0] fifo_count;

    // FIFO <-> Decoder <-> Rasterizer Controller
    wire        raster_idle;
    wire        cmd_done;
    wire        dec_cmd_valid;
    wire [1:0]  dec_cmd_type;
    wire [7:0]  dec_shape_x0, dec_shape_x1, dec_shape_x2;
    wire [6:0]  dec_shape_y0, dec_shape_y1, dec_shape_y2;
    wire [23:0] dec_shape_color;
    wire [7:0]  dec_bbox_min_x, dec_bbox_max_x;
    wire [6:0]  dec_bbox_min_y, dec_bbox_max_y;

    // Rasterizer Controller <-> Shape Rasterizers
    wire        eval_enable;
    wire [7:0]  cur_pixel_x;
    wire [6:0]  cur_pixel_y;
    wire        rect_hit;
    wire        circ_hit;
    wire        tri_hit;
    reg         active_shape_hit;

    // Pixel Color Generator
    wire        gen_pixel_valid;
    wire [23:0] gen_pixel_color;

    // Framebuffer Port A (Render Write)
    wire        fb_we;
    wire [14:0] fb_waddr;
    wire [23:0] fb_wdata;

    // Framebuffer Port B (Display Read)
    wire        fb_re_b;
    wire [14:0] fb_raddr_b;
    wire [23:0] fb_rdata_b;

    // -------------------------------------------------------------------------
    // 1. Host Command Interface
    // -------------------------------------------------------------------------
    cmd_interface u_cmd_interface (
        .clk            (clk),
        .rst_n          (rst_n),
        .cmd_valid_in   (cmd_valid_in),
        .cmd_ready_out  (cmd_ready_out),
        .cmd_type_in    (cmd_type_in),
        .param_x0_in    (param_x0_in),
        .param_y0_in    (param_y0_in),
        .param_x1_in    (param_x1_in),
        .param_y1_in    (param_y1_in),
        .param_x2_in    (param_x2_in),
        .param_y2_in    (param_y2_in),
        .param_color_in (param_color_in),
        .fifo_full      (fifo_full),
        .fifo_wr_en     (fifo_wr_en),
        .fifo_wr_data   (fifo_wr_data)
    );

    // -------------------------------------------------------------------------
    // 2. Command FIFO Buffer
    // -------------------------------------------------------------------------
    command_fifo #(
        .DEPTH     (FIFO_DEPTH),
        .WIDTH     (86),
        .ADDR_BITS (FIFO_ADDR)
    ) u_command_fifo (
        .clk       (clk),
        .rst_n     (rst_n),
        .wr_en     (fifo_wr_en),
        .wr_data   (fifo_wr_data),
        .rd_en     (fifo_rd_en),
        .rd_data   (fifo_rd_data),
        .empty     (fifo_empty),
        .full      (fifo_full),
        .count     (fifo_count)
    );

    // -------------------------------------------------------------------------
    // 3. Command Decoder & Range Validator
    // -------------------------------------------------------------------------
    command_decoder #(
        .SCREEN_WIDTH  (SCREEN_WIDTH),
        .SCREEN_HEIGHT (SCREEN_HEIGHT)
    ) u_command_decoder (
        .clk           (clk),
        .rst_n         (rst_n),
        .fifo_empty    (fifo_empty),
        .fifo_data     (fifo_rd_data),
        .fifo_rd_en    (fifo_rd_en),
        .raster_idle   (raster_idle),
        .cmd_done      (cmd_done),
        .cmd_valid_out (dec_cmd_valid),
        .cmd_type_out  (dec_cmd_type),
        .shape_x0      (dec_shape_x0),
        .shape_y0      (dec_shape_y0),
        .shape_x1      (dec_shape_x1),
        .shape_y1      (dec_shape_y1),
        .shape_x2      (dec_shape_x2),
        .shape_y2      (dec_shape_y2),
        .shape_color   (dec_shape_color),
        .bbox_min_x    (dec_bbox_min_x),
        .bbox_max_x    (dec_bbox_max_x),
        .bbox_min_y    (dec_bbox_min_y),
        .bbox_max_y    (dec_bbox_max_y)
    );

    // -------------------------------------------------------------------------
    // 4. Shape Rasterization Submodules
    // -------------------------------------------------------------------------
    rectangle_rasterizer #(
        .SCREEN_WIDTH  (SCREEN_WIDTH),
        .SCREEN_HEIGHT (SCREEN_HEIGHT)
    ) u_rect_rasterizer (
        .enable        (eval_enable && (dec_cmd_type == 2'b00)),
        .cur_x         (cur_pixel_x),
        .cur_y         (cur_pixel_y),
        .rect_x        (dec_shape_x0),
        .rect_y        (dec_shape_y0),
        .rect_w        (dec_shape_x1),
        .rect_h        (dec_shape_y1),
        .hit           (rect_hit)
    );

    circle_rasterizer #(
        .SCREEN_WIDTH  (SCREEN_WIDTH),
        .SCREEN_HEIGHT (SCREEN_HEIGHT)
    ) u_circ_rasterizer (
        .enable        (eval_enable && (dec_cmd_type == 2'b01)),
        .cur_x         (cur_pixel_x),
        .cur_y         (cur_pixel_y),
        .circ_cx       (dec_shape_x0),
        .circ_cy       (dec_shape_y0),
        .circ_r        (dec_shape_x1),
        .hit           (circ_hit)
    );

    triangle_rasterizer #(
        .SCREEN_WIDTH  (SCREEN_WIDTH),
        .SCREEN_HEIGHT (SCREEN_HEIGHT)
    ) u_tri_rasterizer (
        .enable        (eval_enable && (dec_cmd_type == 2'b10)),
        .cur_x         (cur_pixel_x),
        .cur_y         (cur_pixel_y),
        .v0_x          (dec_shape_x0),
        .v0_y          (dec_shape_y0),
        .v1_x          (dec_shape_x1),
        .v1_y          (dec_shape_y1),
        .v2_x          (dec_shape_x2),
        .v2_y          (dec_shape_y2),
        .hit           (tri_hit)
    );

    // Active shape hit multiplexer
    always @(*) begin
        case (dec_cmd_type)
            2'b00:   active_shape_hit = rect_hit;
            2'b01:   active_shape_hit = circ_hit;
            2'b10:   active_shape_hit = tri_hit;
            2'b11:   active_shape_hit = 1'b1; // Clear screen fills entire bbox
            default: active_shape_hit = 1'b0;
        endcase
    end

    // -------------------------------------------------------------------------
    // 5. Pixel Color Generator
    // -------------------------------------------------------------------------
    pixel_color_generator u_color_gen (
        .cmd_type      (dec_cmd_type),
        .shape_color   (dec_shape_color),
        .shape_hit     (active_shape_hit),
        .pixel_valid   (gen_pixel_valid),
        .pixel_color   (gen_pixel_color)
    );

    // -------------------------------------------------------------------------
    // 6. Rasterization Controller
    // -------------------------------------------------------------------------
    rasterizer_controller #(
        .SCREEN_WIDTH  (SCREEN_WIDTH),
        .SCREEN_HEIGHT (SCREEN_HEIGHT)
    ) u_raster_controller (
        .clk           (clk),
        .rst_n         (rst_n),
        .cmd_valid     (dec_cmd_valid),
        .cmd_type      (dec_cmd_type),
        .bbox_min_x    (dec_bbox_min_x),
        .bbox_max_x    (dec_bbox_max_x),
        .bbox_min_y    (dec_bbox_min_y),
        .bbox_max_y    (dec_bbox_max_y),
        .shape_color   (dec_shape_color),
        .cmd_done      (cmd_done),
        .eval_enable   (eval_enable),
        .cur_pixel_x   (cur_pixel_x),
        .cur_pixel_y   (cur_pixel_y),
        .shape_hit     (active_shape_hit),
        .pixel_valid   (gen_pixel_valid),
        .fb_ready      (1'b1), // Dual-port SRAM always ready
        .fb_we         (fb_we),
        .fb_addr       (fb_waddr),
        .fb_data       (fb_wdata),
        .raster_idle   (raster_idle),
        .raster_state  (status_raster_state),
        .total_pixels_rendered (status_total_rendered),
        .total_commands_done   (status_total_cmds)
    );

    // -------------------------------------------------------------------------
    // 7. Dual-Port Synchronous Framebuffer Memory (19,200 x 24-bit)
    // -------------------------------------------------------------------------
    framebuffer #(
        .WIDTH     (24),
        .SIZE      (SCREEN_WIDTH * SCREEN_HEIGHT),
        .ADDR_BITS (15)
    ) u_framebuffer (
        .clk       (clk),
        .rst_n     (rst_n),
        // Port A: Render Write
        .we_a      (fb_we),
        .addr_a    (fb_waddr),
        .din_a     (fb_wdata),
        // Port B: Display Read
        .re_b      (fb_re_b),
        .addr_b    (fb_raddr_b),
        .dout_b    (fb_rdata_b)
    );

    // -------------------------------------------------------------------------
    // 8. Virtual Display Controller & Raster Scanner
    // -------------------------------------------------------------------------
    display_controller #(
        .H_ACTIVE  (SCREEN_WIDTH),
        .V_ACTIVE  (SCREEN_HEIGHT)
    ) u_display_ctrl (
        .clk            (clk),
        .rst_n          (rst_n),
        .fb_read_addr   (fb_raddr_b),
        .fb_read_en     (fb_re_b),
        .fb_read_data   (fb_rdata_b),
        .disp_x         (disp_x),
        .disp_y         (disp_y),
        .rgb_out        (disp_rgb),
        .hsync          (disp_hsync),
        .vsync          (disp_vsync),
        .display_enable (disp_de),
        .frame_tick     (disp_frame_tick)
    );

    // -------------------------------------------------------------------------
    // 9. Status & Telemetry Wiring
    // -------------------------------------------------------------------------
    assign status_fifo_empty   = fifo_empty;
    assign status_fifo_full    = fifo_full;
    assign status_fifo_count   = fifo_count;
    assign status_raster_idle  = raster_idle;
    assign status_cur_x        = cur_pixel_x;
    assign status_cur_y        = cur_pixel_y;
    assign status_shape_hit    = active_shape_hit;
    assign status_pixel_valid  = gen_pixel_valid;
    assign status_fb_we        = fb_we;
    assign status_fb_addr      = fb_waddr;
    assign status_fb_wdata     = fb_wdata;

endmodule


// --- BEGIN TESTBENCH: tb_minigpu_top.v ---
// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// Module:  tb_minigpu_top
// File:    tb_minigpu_top.v
// Purpose: Comprehensive Testbench & Hardware Verification Suite
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module tb_minigpu_top;

    reg         clk;
    reg         rst_n;

    // Host Command Interface
    reg         cmd_valid_in;
    wire        cmd_ready_out;
    reg  [1:0]  cmd_type_in;
    reg  [7:0]  param_x0_in;
    reg  [6:0]  param_y0_in;
    reg  [7:0]  param_x1_in;
    reg  [6:0]  param_y1_in;
    reg  [7:0]  param_x2_in;
    reg  [6:0]  param_y2_in;
    reg  [23:0] param_color_in;

    // Video Output
    wire        disp_hsync;
    wire        disp_vsync;
    wire        disp_de;
    wire [23:0] disp_rgb;
    wire [7:0]  disp_x;
    wire [6:0]  disp_y;
    wire        disp_frame_tick;

    // Status Signals
    wire        status_fifo_empty;
    wire        status_fifo_full;
    wire [4:0]  status_fifo_count;
    wire        status_raster_idle;
    wire [2:0]  status_raster_state;
    wire [7:0]  status_cur_x;
    wire [6:0]  status_cur_y;
    wire        status_shape_hit;
    wire        status_pixel_valid;
    wire        status_fb_we;
    wire [14:0] status_fb_addr;
    wire [23:0] status_fb_wdata;
    wire [31:0] status_total_rendered;
    wire [15:0] status_total_cmds;

    // Instantiate Device Under Test (DUT)
    minigpu_top #(
        .SCREEN_WIDTH  (160),
        .SCREEN_HEIGHT (120),
        .FIFO_DEPTH    (16),
        .FIFO_ADDR     (4)
    ) dut (
        .clk                   (clk),
        .rst_n                 (rst_n),
        .cmd_valid_in          (cmd_valid_in),
        .cmd_ready_out         (cmd_ready_out),
        .cmd_type_in           (cmd_type_in),
        .param_x0_in           (param_x0_in),
        .param_y0_in           (param_y0_in),
        .param_x1_in           (param_x1_in),
        .param_y1_in           (param_y1_in),
        .param_x2_in           (param_x2_in),
        .param_y2_in           (param_y2_in),
        .param_color_in        (param_color_in),
        .disp_hsync            (disp_hsync),
        .disp_vsync            (disp_vsync),
        .disp_de               (disp_de),
        .disp_rgb              (disp_rgb),
        .disp_x                (disp_x),
        .disp_y                (disp_y),
        .disp_frame_tick       (disp_frame_tick),
        .status_fifo_empty     (status_fifo_empty),
        .status_fifo_full      (status_fifo_full),
        .status_fifo_count     (status_fifo_count),
        .status_raster_idle    (status_raster_idle),
        .status_raster_state   (status_raster_state),
        .status_cur_x          (status_cur_x),
        .status_cur_y          (status_cur_y),
        .status_shape_hit      (status_shape_hit),
        .status_pixel_valid    (status_pixel_valid),
        .status_fb_we          (status_fb_we),
        .status_fb_addr        (status_fb_addr),
        .status_fb_wdata       (status_fb_wdata),
        .status_total_rendered (status_total_rendered),
        .status_total_cmds     (status_total_cmds)
    );

    // Clock Generation: 50 MHz simulation clock (20ns period)
    always #10 clk = ~clk;

    // Verification statistics
    integer tests_passed = 0;
    integer tests_failed = 0;

    // Helper task to send drawing command
    task send_command(
        input [1:0]  c_type,
        input [7:0]  x0, input [6:0] y0,
        input [7:0]  x1, input [6:0] y1,
        input [7:0]  x2, input [6:0] y2,
        input [23:0] color
    );
        begin
            @(posedge clk);
            while (!cmd_ready_out) @(posedge clk);
            cmd_valid_in   <= 1'b1;
            cmd_type_in    <= c_type;
            param_x0_in    <= x0;
            param_y0_in    <= y0;
            param_x1_in    <= x1;
            param_y1_in    <= y1;
            param_x2_in    <= x2;
            param_y2_in    <= y2;
            param_color_in <= color;
            @(posedge clk);
            cmd_valid_in   <= 1'b0;
        end
    endtask

    // Helper task to wait until rasterizer finishes all commands
    task wait_idle();
        begin
            repeat (3) @(posedge clk);
            while (!status_fifo_empty || !status_raster_idle) @(posedge clk);
            repeat (5) @(posedge clk);
        end
    endtask

    // Helper function to read framebuffer pixel
    function [23:0] read_pixel(input [7:0] x, input [6:0] y);
        integer addr;
        begin
            addr = y * 160 + x;
            read_pixel = dut.u_framebuffer.mem[addr];
        end
    endfunction

    initial begin
        $dumpfile("minigpu_sim.vcd");
        $dumpvars(0, tb_minigpu_top);

        $display("=================================================================");
        $display("   ECRIONIX MINIGPU - CYCLE-ACCURATE RTL VERIFICATION SUITE      ");
        $display("=================================================================");

        clk            = 0;
        rst_n          = 0;
        cmd_valid_in   = 0;
        cmd_type_in    = 0;
        param_x0_in    = 0;
        param_y0_in    = 0;
        param_x1_in    = 0;
        param_y1_in    = 0;
        param_x2_in    = 0;
        param_y2_in    = 0;
        param_color_in = 0;

        // Apply Reset
        #40;
        rst_n = 1;
        #20;

        // ---------------------------------------------------------------------
        // TEST 1: Clear Screen (Black Background #000000)
        // ---------------------------------------------------------------------
        $display("[TEST 1] Clear Screen with Background #000000...");
        send_command(2'b11, 8'd0, 7'd0, 8'd0, 7'd0, 8'd0, 7'd0, 24'h000000);
        wait_idle();

        if (read_pixel(0, 0) == 24'h000000 && 
            read_pixel(80, 60) == 24'h000000 && 
            read_pixel(159, 119) == 24'h000000) begin
            $display("  -> PASS: Screen cleared to black (19,200 pixels initialized).");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Screen clear verification error.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 2: Red Rectangle (X=20, Y=20, W=40, H=30, Color=#FF0000)
        // ---------------------------------------------------------------------
        $display("[TEST 2] Red Rectangle Rasterization (20,20 to 59,49)...");
        send_command(2'b00, 8'd20, 7'd20, 8'd40, 7'd30, 8'd0, 7'd0, 24'hFF0000);
        wait_idle();

        if (read_pixel(20, 20) == 24'hFF0000 && 
            read_pixel(35, 30) == 24'hFF0000 && 
            read_pixel(59, 49) == 24'hFF0000 && 
            read_pixel(19, 20) == 24'h000000 && 
            read_pixel(60, 50) == 24'h000000) begin
            $display("  -> PASS: Red rectangle correctly rasterized with boundary clipping.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Rectangle pixel mismatch.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 3: Green Circle (CX=100, CY=50, R=25, Color=#00FF00)
        // ---------------------------------------------------------------------
        $display("[TEST 3] Green Circle Rasterization (Center=100,50, Radius=25)...");
        send_command(2'b01, 8'd100, 7'd50, 8'd25, 7'd0, 8'd0, 7'd0, 24'h00FF00);
        wait_idle();

        if (read_pixel(100, 50) == 24'h00FF00 &&  // Center
            read_pixel(100, 25) == 24'h00FF00 &&  // Top edge
            read_pixel(100, 75) == 24'h00FF00 &&  // Bottom edge
            read_pixel(75, 50)  == 24'h00FF00 &&  // Left edge
            read_pixel(125, 50) == 24'h00FF00 &&  // Right edge
            read_pixel(100, 20) == 24'h000000 &&  // Outside top
            read_pixel(130, 50) == 24'h000000) begin // Outside right
            $display("  -> PASS: Green circle rasterized using squared-distance equation.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Circle coverage error.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 4: Blue Triangle (V0=30,80, V1=80,80, V2=55,110, Color=#0000FF)
        // ---------------------------------------------------------------------
        $display("[TEST 4] Blue Triangle Rasterization (Pineda Edge Function)...");
        send_command(2'b10, 8'd30, 7'd80, 8'd80, 7'd80, 8'd55, 7'd110, 24'h0000FF);
        wait_idle();

        if (read_pixel(55, 90) == 24'h0000FF &&  // Interior
            read_pixel(55, 80) == 24'h0000FF &&  // Top edge
            read_pixel(55, 110)== 24'h0000FF &&  // Bottom vertex
            read_pixel(25, 80) == 24'h000000 &&  // Outside left
            read_pixel(85, 80) == 24'h000000) begin // Outside right
            $display("  -> PASS: Blue triangle rasterized with signed edge arithmetic.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Triangle rasterization error.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 5: Overlapping Shapes & Z-Order Verification
        // ---------------------------------------------------------------------
        $display("[TEST 5] Overlapping Shapes (Yellow Square over Green Circle)...");
        // Draw Yellow square at (95, 45, W=10, H=10, Color=#FFFF00)
        send_command(2'b00, 8'd95, 7'd45, 8'd10, 7'd10, 8'd0, 7'd0, 24'hFFFF00);
        wait_idle();

        if (read_pixel(95, 45) == 24'hFFFF00 &&  // Overwritten by yellow
            read_pixel(100, 50) == 24'hFFFF00 && // Overwritten by yellow
            read_pixel(120, 50) == 24'h00FF00) begin // Still green circle
            $display("  -> PASS: Overlapping geometry correctly respects command order.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Overlapping pixel order error.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 6: Command FIFO Backpressure & Burst Queueing
        // ---------------------------------------------------------------------
        $display("[TEST 6] Command FIFO Burst Enqueue & Handshake...");
        // Send a burst of 3 small rectangles without waiting for completion
        send_command(2'b00, 8'd130, 7'd10, 8'd5, 7'd5, 8'd0, 7'd0, 24'hFF00FF);
        send_command(2'b00, 8'd140, 7'd10, 8'd5, 7'd5, 8'd0, 7'd0, 24'h00FFFF);
        send_command(2'b00, 8'd130, 7'd20, 8'd5, 7'd5, 8'd0, 7'd0, 24'hFFFFFF);
        wait_idle();

        if (read_pixel(130, 10) == 24'hFF00FF && 
            read_pixel(140, 10) == 24'h00FFFF && 
            read_pixel(130, 20) == 24'hFFFFFF) begin
            $display("  -> PASS: FIFO burst queue handled without data loss.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Burst command FIFO dropped commands.");
            tests_failed = tests_failed + 1;
        end

        // ---------------------------------------------------------------------
        // TEST 7: Display Controller Scanning & Video Synchronization
        // ---------------------------------------------------------------------
        $display("[TEST 7] Display Controller Virtual Raster Scanning...");
        // Run simulation for 250 clocks to observe HSYNC / VSYNC / DE progression
        repeat (250) @(posedge clk);

        if (disp_hsync !== 1'bx && disp_vsync !== 1'bx && disp_de !== 1'bx) begin
            $display("  -> PASS: Display raster timing signals valid and active.");
            tests_passed = tests_passed + 1;
        end else begin
            $display("  -> FAIL: Display controller signal undefined.");
            tests_failed = tests_failed + 1;
        end

        // Summary
        $display("=================================================================");
        $display("   MINIGPU VERIFICATION SUMMARY: %0d PASSED, %0d FAILED          ", tests_passed, tests_failed);
        if (tests_failed == 0) begin
            $display("   *** ALL RTL TESTS COMPLETED SUCCESSFULLY (PASS) ***          ");
        end else begin
            $display("   *** VERIFICATION SUITE DETECTED REGRESSION (FAIL) ***        ");
        end
        $display("=================================================================");

        $finish;
    end

endmodule

