// =============================================================================
// Project: EcrioniX MiniGPU
// Module:  tb_cmd_fifo
// File:    tb_cmd_fifo.v
// Purpose: Unit Testbench for Command FIFO Buffer & Backpressure Handling
// =============================================================================

`timescale 1ns / 1ps

module tb_cmd_fifo;
    reg         clk;
    reg         rst_n;
    reg         wr_en;
    reg  [85:0] wr_data;
    reg         rd_en;
    wire [85:0] rd_data;
    wire        empty;
    wire        full;
    wire [4:0]  count;

    command_fifo #(
        .DEPTH(4),
        .WIDTH(86),
        .ADDR_BITS(2)
    ) dut (
        .clk(clk),
        .rst_n(rst_n),
        .wr_en(wr_en),
        .wr_data(wr_data),
        .rd_en(rd_en),
        .rd_data(rd_data),
        .empty(empty),
        .full(full),
        .count(count)
    );

    always #5 clk = ~clk;

    integer passed = 0;
    integer failed = 0;

    initial begin
        $display("=== COMMAND FIFO UNIT VERIFICATION ===");
        clk = 0; rst_n = 0; wr_en = 0; rd_en = 0; wr_data = 0;
        #15 rst_n = 1; #10;

        // 1. Initial State: Empty
        if (empty && !full && count == 0) passed++; else failed++;

        // 2. Enqueue 4 items to fill FIFO
        @(posedge clk); wr_en <= 1; wr_data <= 86'hA1;
        @(posedge clk); wr_en <= 1; wr_data <= 86'hB2;
        @(posedge clk); wr_en <= 1; wr_data <= 86'hC3;
        @(posedge clk); wr_en <= 1; wr_data <= 86'hD4;
        @(posedge clk); wr_en <= 0;
        #1;
        if (!empty && full && count == 4) passed++; else failed++;

        // 3. FIFO head data inspection
        if (rd_data == 86'hA1) passed++; else failed++;

        // 4. Dequeue 1 item
        @(posedge clk); rd_en <= 1;
        @(posedge clk); rd_en <= 0;
        #1;
        if (!empty && !full && count == 3 && rd_data == 86'hB2) passed++; else failed++;

        // 5. Simultaneous Enqueue & Dequeue
        @(posedge clk); wr_en <= 1; wr_data <= 86'hE5; rd_en <= 1;
        @(posedge clk); wr_en <= 0; rd_en <= 0;
        #1;
        if (count == 3 && rd_data == 86'hC3) passed++; else failed++;

        $display("Command FIFO Tests: %0d PASSED, %0d FAILED", passed, failed);
        $finish;
    end
endmodule
