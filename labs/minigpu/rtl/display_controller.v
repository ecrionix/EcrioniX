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
