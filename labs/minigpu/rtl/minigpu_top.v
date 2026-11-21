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
