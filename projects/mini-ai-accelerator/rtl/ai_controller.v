// =============================================================================
// Module: ai_controller
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Finite State Machine (FSM) Controller for Mini AI Accelerator
//
// Sequences Layer 1 (784x32 MACs), ReLU activation, Layer 2 (32x10 MACs),
// and Argmax output classification.
// =============================================================================

`timescale 1ns / 1ps

module ai_controller (
    input  wire        clk,
    input  wire        rst_n,
    input  wire        start,               // Pulse to trigger accelerator inference
    output reg         busy,                // High during inference execution
    output reg         done,                // High upon inference completion
    output reg  [3:0]  state,               // Current FSM state for visualization

    // Input Buffer Read Interface
    output reg  [9:0]  pixel_addr,          // 0 to 783

    // Hidden Buffer Interface
    output reg         hidden_buf_we,       // Write enable for hidden layer activation
    output reg  [4:0]  hidden_buf_waddr,    // Write address (0 to 31)
    output reg  [4:0]  hidden_buf_raddr,    // Read address (0 to 31)

    // Weight Memory Address
    output reg  [14:0] w1_addr,             // 0 to 25087 (i * 32 + j)
    output reg  [8:0]  w2_addr,             // 0 to 319   (j * 10 + k)

    // Bias Memory Address
    output reg  [4:0]  b1_addr,             // 0 to 31
    output reg  [3:0]  b2_addr,             // 0 to 9

    // MAC Engine Controls
    output reg         mac_clear,           // Initialize accumulator with bias
    output reg         mac_en,              // Enable multiply-accumulate
    output reg         mac_layer_sel,       // 0 = Layer 1 (pixel * W1), 1 = Layer 2 (hidden * W2)

    // Argmax Unit Interface
    output reg         start_argmax,        // Reset argmax comparison
    output reg  [3:0]  score_idx,           // Output class index (0 to 9)
    output reg         score_valid          // Strobe when output score is ready
);

    // State Encoding
    localparam [3:0]
        ST_IDLE         = 4'd0,
        ST_INIT_HIDDEN  = 4'd1,
        ST_PIPE_HIDDEN  = 4'd2,
        ST_HIDDEN_MAC   = 4'd3,
        ST_HIDDEN_ACT   = 4'd4,
        ST_INIT_OUTPUT  = 4'd5,
        ST_PIPE_OUTPUT  = 4'd6,
        ST_OUTPUT_MAC   = 4'd7,
        ST_OUTPUT_STORE = 4'd8,
        ST_ARGMAX       = 4'd9,
        ST_DONE         = 4'd10;

    // Internal Loop Counters
    reg [4:0] neuron_j;     // Current hidden neuron: 0 to 31
    reg [9:0] pixel_i;      // Current input pixel: 0 to 783
    reg [3:0] class_k;      // Current output class: 0 to 9
    reg [4:0] hidden_j;     // Current hidden activation: 0 to 31

    // FSM State Transition & Datapath Control
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            state            <= ST_IDLE;
            busy             <= 1'b0;
            done             <= 1'b0;
            neuron_j         <= 5'd0;
            pixel_i          <= 10'd0;
            class_k          <= 4'd0;
            hidden_j         <= 5'd0;
            pixel_addr       <= 10'd0;
            hidden_buf_we    <= 1'b0;
            hidden_buf_waddr <= 5'd0;
            hidden_buf_raddr <= 5'd0;
            w1_addr          <= 15'd0;
            w2_addr          <= 9'd0;
            b1_addr          <= 5'd0;
            b2_addr          <= 4'd0;
            mac_clear        <= 1'b0;
            mac_en           <= 1'b0;
            mac_layer_sel    <= 1'b0;
            start_argmax     <= 1'b0;
            score_idx        <= 4'd0;
            score_valid      <= 1'b0;
        end else begin
            // Default strobe deassertions
            mac_clear     <= 1'b0;
            mac_en        <= 1'b0;
            hidden_buf_we <= 1'b0;
            start_argmax  <= 1'b0;
            score_valid   <= 1'b0;

            case (state)

                // -------------------------------------------------------------
                // IDLE: Wait for start signal
                // -------------------------------------------------------------
                ST_IDLE: begin
                    busy <= 1'b0;
                    done <= 1'b0;
                    if (start) begin
                        busy         <= 1'b1;
                        neuron_j     <= 5'd0;
                        pixel_i      <= 10'd0;
                        b1_addr      <= 5'd0;
                        start_argmax <= 1'b1;
                        state        <= ST_INIT_HIDDEN;
                    end
                end

                // -------------------------------------------------------------
                // INIT_HIDDEN: Clear accumulator with bias for neuron_j
                // -------------------------------------------------------------
                ST_INIT_HIDDEN: begin
                    b1_addr       <= neuron_j;
                    mac_clear     <= 1'b1;
                    mac_layer_sel <= 1'b0;  // Layer 1 mode
                    pixel_i       <= 10'd0;
                    pixel_addr    <= 10'd0;
                    w1_addr       <= neuron_j; // (0 * 32) + neuron_j
                    state         <= ST_PIPE_HIDDEN;
                end

                // -------------------------------------------------------------
                // PIPE_HIDDEN: Wait 1 cycle for synchronous RAM read latency
                // -------------------------------------------------------------
                ST_PIPE_HIDDEN: begin
                    // Pixel 0 and W1[0, j] are now reading out of memory
                    pixel_i    <= 10'd1;
                    pixel_addr <= 10'd1;
                    w1_addr    <= 32 + neuron_j; // (1 * 32) + neuron_j
                    state      <= ST_HIDDEN_MAC;
                end

                // -------------------------------------------------------------
                // HIDDEN_MAC: Accumulate 784 pixel * weight products
                // -------------------------------------------------------------
                ST_HIDDEN_MAC: begin
                    mac_en <= 1'b1;
                    if (pixel_i < 10'd783) begin
                        pixel_i    <= pixel_i + 10'd1;
                        pixel_addr <= pixel_i + 10'd1;
                        w1_addr    <= ((pixel_i + 10'd1) * 32) + neuron_j;
                    end else begin
                        // Completed all 784 inputs (0 to 783) for this neuron
                        state <= ST_HIDDEN_ACT;
                    end
                end

                // -------------------------------------------------------------
                // HIDDEN_ACT: Store quantized ReLU activation in hidden_buffer
                // -------------------------------------------------------------
                ST_HIDDEN_ACT: begin
                    hidden_buf_we    <= 1'b1;
                    hidden_buf_waddr <= neuron_j;
                    if (neuron_j < 5'd31) begin
                        neuron_j <= neuron_j + 5'd1;
                        state    <= ST_INIT_HIDDEN;
                    end else begin
                        // All 32 hidden neurons computed! Move to Layer 2
                        class_k  <= 4'd0;
                        state    <= ST_INIT_OUTPUT;
                    end
                end

                // -------------------------------------------------------------
                // INIT_OUTPUT: Clear accumulator with bias for class_k
                // -------------------------------------------------------------
                ST_INIT_OUTPUT: begin
                    b2_addr          <= class_k;
                    mac_clear        <= 1'b1;
                    mac_layer_sel    <= 1'b1; // Layer 2 mode
                    hidden_j         <= 5'd0;
                    hidden_buf_raddr <= 5'd0;
                    w2_addr          <= class_k; // (0 * 10) + class_k
                    state            <= ST_PIPE_OUTPUT;
                end

                // -------------------------------------------------------------
                // PIPE_OUTPUT: Wait 1 cycle for synchronous RAM read latency
                // -------------------------------------------------------------
                ST_PIPE_OUTPUT: begin
                    hidden_j         <= 5'd1;
                    hidden_buf_raddr <= 5'd1;
                    w2_addr          <= 10 + class_k; // (1 * 10) + class_k
                    state            <= ST_OUTPUT_MAC;
                end

                // -------------------------------------------------------------
                // OUTPUT_MAC: Accumulate 32 hidden_act * weight products
                // -------------------------------------------------------------
                ST_OUTPUT_MAC: begin
                    mac_en <= 1'b1;
                    if (hidden_j < 5'd31) begin
                        hidden_j         <= hidden_j + 5'd1;
                        hidden_buf_raddr <= hidden_j + 5'd1;
                        w2_addr          <= ((hidden_j + 5'd1) * 10) + class_k;
                    end else begin
                        // Completed all 32 inputs (0 to 31) for this class
                        state <= ST_OUTPUT_STORE;
                    end
                end

                // -------------------------------------------------------------
                // OUTPUT_STORE: Present score_k to Argmax unit
                // -------------------------------------------------------------
                ST_OUTPUT_STORE: begin
                    score_valid <= 1'b1;
                    score_idx   <= class_k;
                    if (class_k < 4'd9) begin
                        class_k <= class_k + 4'd1;
                        state   <= ST_INIT_OUTPUT;
                    end else begin
                        // All 10 classes scored!
                        state   <= ST_ARGMAX;
                    end
                end

                // -------------------------------------------------------------
                // ARGMAX: Finalize winning prediction
                // -------------------------------------------------------------
                ST_ARGMAX: begin
                    state <= ST_DONE;
                end

                // -------------------------------------------------------------
                // DONE: Assert completion flag
                // -------------------------------------------------------------
                ST_DONE: begin
                    busy <= 1'b0;
                    done <= 1'b1;
                    if (start) begin
                        // Start next inference if triggered
                        busy         <= 1'b1;
                        done         <= 1'b0;
                        neuron_j     <= 5'd0;
                        pixel_i      <= 10'd0;
                        b1_addr      <= 5'd0;
                        start_argmax <= 1'b1;
                        state        <= ST_INIT_HIDDEN;
                    end
                end

                default: state <= ST_IDLE;
            endcase
        end
    end

endmodule
