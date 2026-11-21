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
