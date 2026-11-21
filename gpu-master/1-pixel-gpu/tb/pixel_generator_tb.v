// =============================================================================
// Project: EcrioniX GPU Master - Experiment 01
// Module:  pixel_generator_tb
// File:    pixel_generator_tb.v
// Purpose: Hardware Verification Testbench for 1-Pixel Graphics Pipeline Stage
// Author:  EcrioniX Hardware Engineering & VLSI Academy (https://ecrionix.org)
// =============================================================================

`timescale 1ns / 1ps

module pixel_generator_tb;

    reg        clk;
    reg        rst;
    reg        pixel_valid_in;
    reg  [9:0] pixel_x_in;
    reg  [9:0] pixel_y_in;
    reg  [7:0] red_in;
    reg  [7:0] green_in;
    reg  [7:0] blue_in;

    wire       pixel_valid_out;
    wire [9:0] pixel_x_out;
    wire [9:0] pixel_y_out;
    wire [7:0] red_out;
    wire [7:0] green_out;
    wire [7:0] blue_out;

    integer pass_count = 0;
    integer fail_count = 0;

    // Instantiate Unit Under Test (UUT)
    pixel_generator uut (
        .clk(clk),
        .rst(rst),
        .pixel_valid_in(pixel_valid_in),
        .pixel_x_in(pixel_x_in),
        .pixel_y_in(pixel_y_in),
        .red_in(red_in),
        .green_in(green_in),
        .blue_in(blue_in),
        .pixel_valid_out(pixel_valid_out),
        .pixel_x_out(pixel_x_out),
        .pixel_y_out(pixel_y_out),
        .red_out(red_out),
        .green_out(green_out),
        .blue_out(blue_out)
    );

    // 50 MHz clock generator (20ns period: 10ns HIGH, 10ns LOW)
    always #10 clk = ~clk;

    initial begin
        // Setup waveform dumping for GTKWave
        $dumpfile("pixel_sim.vcd");
        $dumpvars(0, pixel_generator_tb);

        $display("=================================================================");
        $display("   ECRIONIX GPU MASTER - EXPERIMENT 01: 1-PIXEL VERIFICATION    ");
        $display("=================================================================");

        // Initialize signals
        clk = 0;
        rst = 1;
        pixel_valid_in = 0;
        pixel_x_in = 10'd0;
        pixel_y_in = 10'd0;
        red_in = 8'd0;
        green_in = 8'd0;
        blue_in = 8'd0;

        // Apply reset for 2 clock cycles
        #25;
        @(posedge clk);
        #1;
        // Check Test 1: Reset behavior
        if (pixel_valid_out === 1'b0 && red_out === 8'd0 && green_out === 8'd0 && blue_out === 8'd0 && pixel_x_out === 10'd0 && pixel_y_out === 10'd0) begin
            $display("[TEST 1 PASS] Reset holds all outputs at 0.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 1 FAIL] Reset did not clear outputs!");
            fail_count = fail_count + 1;
        end

        // Deassert reset
        rst = 0;

        // --- TEST 2: Generate Pure Red Pixel at (0, 0) ---
        @(negedge clk);
        pixel_valid_in = 1;
        pixel_x_in = 10'd0;
        pixel_y_in = 10'd0;
        red_in = 8'd255;
        green_in = 8'd0;
        blue_in = 8'd0;

        @(posedge clk); // Clock edge captures inputs
        #1;
        // Verify 1-cycle registered latency
        if (pixel_valid_out === 1'b1 && red_out === 8'd255 && green_out === 8'd0 && blue_out === 8'd0 && pixel_x_out === 10'd0 && pixel_y_out === 10'd0) begin
            $display("[TEST 2 PASS] Pure Red (255, 0, 0) at (0,0) captured with 1-cycle latency.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 2 FAIL] Pure Red failed! Red=%d, Green=%d, Blue=%d", red_out, green_out, blue_out);
            fail_count = fail_count + 1;
        end

        // --- TEST 3: Generate Pure Blue Pixel at (10, 20) ---
        @(negedge clk);
        pixel_valid_in = 1;
        pixel_x_in = 10'd10;
        pixel_y_in = 10'd20;
        red_in = 8'd0;
        green_in = 8'd0;
        blue_in = 8'd255;

        @(posedge clk);
        #1;
        if (pixel_valid_out === 1'b1 && red_out === 8'd0 && green_out === 8'd0 && blue_out === 8'd255 && pixel_x_out === 10'd10 && pixel_y_out === 10'd20) begin
            $display("[TEST 3 PASS] Pure Blue (0, 0, 255) at (10,20) captured correctly.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 3 FAIL] Pure Blue failed!");
            fail_count = fail_count + 1;
        end

        // --- TEST 4: Generate Yellow Pixel (255, 255, 0) at (100, 200) ---
        @(negedge clk);
        pixel_valid_in = 1;
        pixel_x_in = 10'd100;
        pixel_y_in = 10'd200;
        red_in = 8'd255;
        green_in = 8'd255;
        blue_in = 8'd0;

        @(posedge clk);
        #1;
        if (pixel_valid_out === 1'b1 && red_out === 8'd255 && green_out === 8'd255 && blue_out === 8'd0 && pixel_x_out === 10'd100 && pixel_y_out === 10'd200) begin
            $display("[TEST 4 PASS] Yellow (255, 255, 0) at (100,200) captured correctly.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 4 FAIL] Yellow failed!");
            fail_count = fail_count + 1;
        end

        // --- TEST 5: De-assert valid (valid_in = 0). Outputs must RETAIN previous color while valid goes LOW ---
        @(negedge clk);
        pixel_valid_in = 0;
        // Change inputs to random values while valid is low
        pixel_x_in = 10'd555;
        pixel_y_in = 10'd777;
        red_in = 8'd42;
        green_in = 8'd42;
        blue_in = 8'd42;

        @(posedge clk);
        #1;
        if (pixel_valid_out === 1'b0 && red_out === 8'd255 && green_out === 8'd255 && blue_out === 8'd0 && pixel_x_out === 10'd100 && pixel_y_out === 10'd200) begin
            $display("[TEST 5 PASS] Valid=0 holds previous color/coords while pixel_valid_out goes LOW.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 5 FAIL] Outputs did not hold when valid=0! Valid=%b, Red=%d, Green=%d, Blue=%d", pixel_valid_out, red_out, green_out, blue_out);
            fail_count = fail_count + 1;
        end

        // --- TEST 6: Synchronous Reset overrides valid inputs ---
        @(negedge clk);
        rst = 1;
        pixel_valid_in = 1;
        red_in = 8'd255;
        green_in = 8'd255;
        blue_in = 8'd255;

        @(posedge clk);
        #1;
        if (pixel_valid_out === 1'b0 && red_out === 8'd0 && green_out === 8'd0 && blue_out === 8'd0 && pixel_x_out === 10'd0 && pixel_y_out === 10'd0) begin
            $display("[TEST 6 PASS] Synchronous reset overrides valid input and clears registers.");
            pass_count = pass_count + 1;
        end else begin
            $display("[TEST 6 FAIL] Synchronous reset override failed!");
            fail_count = fail_count + 1;
        end

        // Final Report
        $display("=================================================================");
        $display("   EXPERIMENT 01 SUMMARY: %0d PASSED, %0d FAILED               ", pass_count, fail_count);
        if (fail_count == 0) begin
            $display("   *** ALL 1-PIXEL RTL TESTS COMPLETED SUCCESSFULLY (PASS) ***  ");
        end
        $display("=================================================================");

        #20;
        $finish;
    end

endmodule
