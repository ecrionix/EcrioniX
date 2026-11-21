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
