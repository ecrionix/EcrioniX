// =============================================================================
// Module: mini_ai_accelerator_top
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Top-Level Neural Network Hardware Accelerator for Digit Inference
//
// Architecture: 784 Inputs (INT8) -> 32 Hidden (ReLU UINT8) -> 10 Output (INT32) -> Argmax
// =============================================================================

`timescale 1ns / 1ps

module mini_ai_accelerator_top #(
    parameter SHIFT_BITS = 10
)(
    input  wire               clk,
    input  wire               rst_n,

    // Host Pixel Input Write Interface
    input  wire               pixel_in_we,      // High when host writes a pixel
    input  wire        [9:0]  pixel_in_addr,    // Pixel write index (0 to 783)
    input  wire        [7:0]  pixel_in_data,    // Grayscale pixel intensity (0 to 255)

    // Inference Control
    input  wire               start,            // Start inference pulse
    output wire               busy,             // Accelerator busy
    output wire               done,             // Inference complete

    // Classification Result
    output wire        [3:0]  predicted_digit,  // Argmax result (0 to 9)
    output wire signed [31:0] max_score,        // Winning class score

    // Diagnostic Probes for Visualizer & Waveforms
    output wire        [3:0]  fsm_state,
    output wire signed [31:0] debug_acc,
    output wire signed [16:0] debug_mult,
    output wire        [7:0]  debug_relu,
    output wire        [9:0]  debug_pixel_addr,
    output wire        [14:0] debug_w1_addr,
    output wire        [8:0]  debug_w2_addr
);

    // Internal Interconnect Signals
    wire [9:0]  ctrl_pixel_addr;
    wire        ctrl_hidden_we;
    wire [4:0]  ctrl_hidden_waddr;
    wire [4:0]  ctrl_hidden_raddr;
    wire [14:0] ctrl_w1_addr;
    wire [8:0]  ctrl_w2_addr;
    wire [4:0]  ctrl_b1_addr;
    wire [3:0]  ctrl_b2_addr;
    wire        ctrl_mac_clear;
    wire        ctrl_mac_en;
    wire        ctrl_mac_layer_sel;
    wire        ctrl_start_argmax;
    wire [3:0]  ctrl_score_idx;
    wire        ctrl_score_valid;

    // Memory Read Data
    wire        [7:0]  pixel_ram_out;
    wire        [7:0]  hidden_ram_out;
    wire signed [7:0]  w1_data;
    wire signed [7:0]  w2_data;
    wire signed [31:0] b1_data;
    wire signed [31:0] b2_data;

    // MAC Engine Interconnects
    wire signed [31:0] mac_init_val;
    wire        [7:0]  mac_act_in;
    wire signed [7:0]  mac_weight_in;
    wire signed [31:0] mac_acc_out;
    wire signed [16:0] mac_mult_out;

    // ReLU Output
    wire        [7:0]  relu_act_out;

    // Multiplex MAC inputs based on Layer 1 vs Layer 2
    // Layer 1: act = pixel_ram_out, weight = w1_data, bias = b1_data
    // Layer 2: act = hidden_ram_out, weight = w2_data, bias = b2_data
    assign mac_act_in    = (ctrl_mac_layer_sel == 1'b0) ? pixel_ram_out : hidden_ram_out;
    assign mac_weight_in = (ctrl_mac_layer_sel == 1'b0) ? w1_data       : w2_data;
    assign mac_init_val  = (ctrl_mac_layer_sel == 1'b0) ? b1_data       : b2_data;

    // Diagnostics assignments
    assign fsm_state        = ctrl_state;
    wire [3:0] ctrl_state;
    assign debug_acc        = mac_acc_out;
    assign debug_mult       = mac_mult_out;
    assign debug_relu       = relu_act_out;
    assign debug_pixel_addr = ctrl_pixel_addr;
    assign debug_w1_addr    = ctrl_w1_addr;
    assign debug_w2_addr    = ctrl_w2_addr;

    // 1. Controller FSM
    ai_controller u_ctrl (
        .clk              (clk),
        .rst_n            (rst_n),
        .start            (start),
        .busy             (busy),
        .done             (done),
        .state            (ctrl_state),
        .pixel_addr       (ctrl_pixel_addr),
        .hidden_buf_we    (ctrl_hidden_we),
        .hidden_buf_waddr (ctrl_hidden_waddr),
        .hidden_buf_raddr (ctrl_hidden_raddr),
        .w1_addr          (ctrl_w1_addr),
        .w2_addr          (ctrl_w2_addr),
        .b1_addr          (ctrl_b1_addr),
        .b2_addr          (ctrl_b2_addr),
        .mac_clear        (ctrl_mac_clear),
        .mac_en           (ctrl_mac_en),
        .mac_layer_sel    (ctrl_mac_layer_sel),
        .start_argmax     (ctrl_start_argmax),
        .score_idx        (ctrl_score_idx),
        .score_valid      (ctrl_score_valid)
    );

    // 2. Input Buffer (Dual-Port RAM: Host Write Port + Controller Read Port)
    input_buffer u_input_buf (
        .clk        (clk),
        .write_en   (pixel_in_we),
        .write_addr (pixel_in_addr),
        .write_data (pixel_in_data),
        .read_addr  (ctrl_pixel_addr),
        .read_data  (pixel_ram_out)
    );

    // 3. Hidden Buffer (Dual-Port RAM: Layer 1 Write Port + Layer 2 Read Port)
    hidden_buffer u_hidden_buf (
        .clk        (clk),
        .write_en   (ctrl_hidden_we),
        .write_addr (ctrl_hidden_waddr),
        .write_data (relu_act_out),
        .read_addr  (ctrl_hidden_raddr),
        .read_data  (hidden_ram_out)
    );

    // 4. Weight Memory ROM
    weight_memory u_weights (
        .clk     (clk),
        .w1_addr (ctrl_w1_addr),
        .w1_data (w1_data),
        .w2_addr (ctrl_w2_addr),
        .w2_data (w2_data)
    );

    // 5. Bias Memory ROM
    bias_memory u_biases (
        .b1_addr (ctrl_b1_addr),
        .b1_data (b1_data),
        .b2_addr (ctrl_b2_addr),
        .b2_data (b2_data)
    );

    // 6. MAC Unit
    mac_unit u_mac (
        .clk       (clk),
        .rst_n     (rst_n),
        .clear_acc (ctrl_mac_clear),
        .init_val  (mac_init_val),
        .mac_en    (ctrl_mac_en),
        .act_in    (mac_act_in),
        .weight_in (mac_weight_in),
        .acc_out   (mac_acc_out),
        .mult_out  (mac_mult_out)
    );

    // 7. ReLU Unit
    relu_unit #(
        .SHIFT_BITS (SHIFT_BITS)
    ) u_relu (
        .acc_in  (mac_acc_out),
        .act_out (relu_act_out)
    );

    // 8. Argmax Unit
    argmax_unit u_argmax (
        .clk             (clk),
        .rst_n           (rst_n),
        .start_argmax    (ctrl_start_argmax),
        .score_in        (mac_acc_out),
        .score_idx       (ctrl_score_idx),
        .score_valid     (ctrl_score_valid),
        .predicted_digit (predicted_digit),
        .max_score       (max_score),
        .argmax_done     ()
    );

endmodule
