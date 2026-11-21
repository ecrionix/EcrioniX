// =============================================================================
// EcrioniX GPU Master - Experiment 01: 1-Pixel GPU
// Interactive RTL Simulation Engine, Waveform Canvas & Student Challenges
// =============================================================================

(function() {
  'use strict';

  // --- Verilog RTL Source Code ---
  const RTL_SOURCE = `// =============================================================================
// Project: EcrioniX GPU Master - Experiment 01
// Module:  pixel_generator
// Purpose: Synthesizable 1-Pixel Graphics Pipeline Stage with Registered Latency
// =============================================================================

\`timescale 1ns / 1ps

module pixel_generator (
    input  wire        clk,
    input  wire        rst,             // Synchronous active-high reset
    input  wire        pixel_valid_in,  // Input pixel valid strobe
    input  wire [9:0]  pixel_x_in,      // 10-bit horizontal coordinate (0-1023)
    input  wire [9:0]  pixel_y_in,      // 10-bit vertical coordinate (0-1023)
    input  wire [7:0]  red_in,          // 8-bit Red component (0-255)
    input  wire [7:0]  green_in,        // 8-bit Green component (0-255)
    input  wire [7:0]  blue_in,         // 8-bit Blue component (0-255)

    output reg         pixel_valid_out, // 1-cycle registered valid output
    output reg  [9:0]  pixel_x_out,     // 1-cycle registered horizontal coordinate
    output reg  [9:0]  pixel_y_out,     // 1-cycle registered vertical coordinate
    output reg  [7:0]  red_out,         // 1-cycle registered Red component
    output reg  [7:0]  green_out,       // 1-cycle registered Green component
    output reg  [7:0]  blue_out         // 1-cycle registered Blue component
);

    // Sequential registered pixel generation logic
    always @(posedge clk) begin
        if (rst) begin
            // Synchronous reset clears all registered state to 0
            pixel_valid_out <= 1'b0;
            pixel_x_out     <= 10'd0;
            pixel_y_out     <= 10'd0;
            red_out         <= 8'd0;
            green_out       <= 8'd0;
            blue_out        <= 8'd0;
        end
        else begin
            // Propagate valid signal through flip-flop stage
            pixel_valid_out <= pixel_valid_in;

            // When pixel_valid_in is HIGH, latch new coordinate and RGB data
            if (pixel_valid_in) begin
                pixel_x_out <= pixel_x_in;
                pixel_y_out <= pixel_y_in;
                red_out     <= red_in;
                green_out   <= green_in;
                blue_out    <= blue_in;
            end
            // When pixel_valid_in is LOW, previous coordinate and RGB values
            // are held stable in registers while pixel_valid_out deasserts.
        end
    end

endmodule`;

  const TB_SOURCE = `// =============================================================================
// EcrioniX GPU Master - Experiment 01 Verification Testbench
// =============================================================================

\`timescale 1ns / 1ps

module pixel_generator_tb;
    reg        clk = 0;
    reg        rst = 1;
    reg        pixel_valid_in = 0;
    reg  [9:0] pixel_x_in = 0;
    reg  [9:0] pixel_y_in = 0;
    reg  [7:0] red_in = 0;
    reg  [7:0] green_in = 0;
    reg  [7:0] blue_in = 0;

    wire       pixel_valid_out;
    wire [9:0] pixel_x_out;
    wire [9:0] pixel_y_out;
    wire [7:0] red_out;
    wire [7:0] green_out;
    wire [7:0] blue_out;

    pixel_generator uut (
        .clk(clk), .rst(rst),
        .pixel_valid_in(pixel_valid_in),
        .pixel_x_in(pixel_x_in), .pixel_y_in(pixel_y_in),
        .red_in(red_in), .green_in(green_in), .blue_in(blue_in),
        .pixel_valid_out(pixel_valid_out),
        .pixel_x_out(pixel_x_out), .pixel_y_out(pixel_y_out),
        .red_out(red_out), .green_out(green_out), .blue_out(blue_out)
    );

    always #10 clk = ~clk;

    initial begin
        $dumpfile("pixel_sim.vcd");
        $dumpvars(0, pixel_generator_tb);
        #25;
        rst = 0;
        @(negedge clk);
        pixel_valid_in = 1; red_in = 255; green_in = 0; blue_in = 0;
        @(posedge clk);
        #1;
        $display("Captured Pixel: R=%d G=%d B=%d Valid=%b", red_out, green_out, blue_out, pixel_valid_out);
        #50;
        $finish;
    end
endmodule`;

  // --- Hardware Simulation State ---
  const state = {
    // Inputs (Wires)
    inputs: {
      clk: 0,
      rst: 0,
      pixel_valid_in: 1,
      pixel_x_in: 0,
      pixel_y_in: 0,
      red_in: 255,
      green_in: 0,
      blue_in: 0
    },
    // Outputs (Registered D-Flip-Flops)
    registers: {
      pixel_valid_out: 0,
      pixel_x_out: 0,
      pixel_y_out: 0,
      red_out: 0,
      green_out: 0,
      blue_out: 0
    },
    cycle: 0,
    running: false,
    timer: null,
    history: [], // Signal waveform history
    challenges: {
      c1: false, // Pure red
      c2: false, // Pure blue
      c3: false, // Yellow
      c4: false, // White
      c5: false, // Coords (10, 20)
      c6: false  // Valid low hold
    }
  };

  // Helper functions
  function toBinary8(val) {
    return (val >>> 0).toString(2).padStart(8, '0');
  }
  function toBinary10(val) {
    return (val >>> 0).toString(2).padStart(10, '0');
  }
  function toHexColor(r, g, b) {
    const hr = r.toString(16).padStart(2, '0').toUpperCase();
    const hg = g.toString(16).padStart(2, '0').toUpperCase();
    const hb = b.toString(16).padStart(2, '0').toUpperCase();
    return `#${hr}${hg}${hb}`;
  }

  // --- Cycle-Accurate Verilog Execution ---
  function stepClockCycle() {
    state.cycle++;
    const inp = state.inputs;
    const reg = state.registers;

    // Simulate rising edge (posedge clk)
    inp.clk = 1;

    // RTL always @(posedge clk) logic
    if (inp.rst === 1) {
      reg.pixel_valid_out = 0;
      reg.pixel_x_out = 0;
      reg.pixel_y_out = 0;
      reg.red_out = 0;
      reg.green_out = 0;
      reg.blue_out = 0;
    } else {
      reg.pixel_valid_out = inp.pixel_valid_in;
      if (inp.pixel_valid_in === 1) {
        reg.pixel_x_out = inp.pixel_x_in;
        reg.pixel_y_out = inp.pixel_y_in;
        reg.red_out = inp.red_in;
        reg.green_out = inp.green_in;
        reg.blue_out = inp.blue_in;
      }
      // When pixel_valid_in is 0, registers hold their values!
    }

    // Record waveform sample
    state.history.push({
      cycle: state.cycle,
      clk: 1,
      rst: inp.rst,
      valid_in: inp.pixel_valid_in,
      x_in: inp.pixel_x_in,
      y_in: inp.pixel_y_in,
      r_in: inp.red_in,
      g_in: inp.green_in,
      b_in: inp.blue_in,
      valid_out: reg.pixel_valid_out,
      x_out: reg.pixel_x_out,
      y_out: reg.pixel_y_out,
      r_out: reg.red_out,
      g_out: reg.green_out,
      b_out: reg.blue_out
    });

    if (state.history.length > 25) {
      state.history.shift();
    }

    // Return clk to 0 for display
    setTimeout(() => {
      inp.clk = 0;
      updateUI();
    }, 150);

    checkChallenges();
    updateUI();
    drawWaveforms();
  }

  function resetExperiment() {
    state.cycle = 0;
    state.inputs.clk = 0;
    state.inputs.rst = 0;
    state.inputs.pixel_valid_in = 1;
    state.inputs.pixel_x_in = 0;
    state.inputs.pixel_y_in = 0;
    state.inputs.red_in = 255;
    state.inputs.green_in = 0;
    state.inputs.blue_in = 0;

    state.registers.pixel_valid_out = 0;
    state.registers.pixel_x_out = 0;
    state.registers.pixel_y_out = 0;
    state.registers.red_out = 0;
    state.registers.green_out = 0;
    state.registers.blue_out = 0;

    state.history = [];
    if (state.running) {
      clearInterval(state.timer);
      state.running = false;
      const btn = document.getElementById('btnRunAuto');
      if (btn) btn.innerHTML = '▶ Auto-Clock';
    }

    // Add initial cycle 0 sample
    state.history.push({
      cycle: 0,
      clk: 0,
      rst: 0,
      valid_in: 1,
      x_in: 0,
      y_in: 0,
      r_in: 255,
      g_in: 0,
      b_in: 0,
      valid_out: 0,
      x_out: 0,
      y_out: 0,
      r_out: 0,
      g_out: 0,
      b_out: 0
    });

    // Reset UI controls
    document.getElementById('sliderRed').value = 255;
    document.getElementById('sliderGreen').value = 0;
    document.getElementById('sliderBlue').value = 0;
    document.getElementById('inputCoordX').value = 0;
    document.getElementById('inputCoordY').value = 0;
    document.getElementById('chkValidIn').checked = true;
    document.getElementById('chkRst').checked = false;

    updateUI();
    drawWaveforms();
  }

  // --- Student Challenge Evaluator ---
  function checkChallenges() {
    const reg = state.registers;
    const inp = state.inputs;

    // Challenge 1: Pure Red
    if (reg.valid_out === 1 && reg.red_out === 255 && reg.green_out === 0 && reg.blue_out === 0) {
      state.challenges.c1 = true;
    }
    // Challenge 2: Pure Blue
    if (reg.valid_out === 1 && reg.red_out === 0 && reg.green_out === 0 && reg.blue_out === 255) {
      state.challenges.c2 = true;
    }
    // Challenge 3: Pure Yellow (255, 255, 0)
    if (reg.valid_out === 1 && reg.red_out === 255 && reg.green_out === 255 && reg.blue_out === 0) {
      state.challenges.c3 = true;
    }
    // Challenge 4: Pure White (255, 255, 255)
    if (reg.valid_out === 1 && reg.red_out === 255 && reg.green_out === 255 && reg.blue_out === 255) {
      state.challenges.c4 = true;
    }
    // Challenge 5: Coords (10, 20)
    if (reg.valid_out === 1 && reg.pixel_x_out === 10 && reg.pixel_y_out === 20) {
      state.challenges.c5 = true;
    }
    // Challenge 6: Valid low behavior observed (valid_out=0 while outputs retain non-zero color)
    if (reg.valid_out === 0 && (reg.red_out > 0 || reg.green_out > 0 || reg.blue_out > 0) && inp.rst === 0) {
      state.challenges.c6 = true;
    }

    updateChallengeCards();
  }

  function updateChallengeCards() {
    let solvedCount = 0;
    for (let i = 1; i <= 6; i++) {
      const key = `c${i}`;
      const card = document.getElementById(`challengeCard${i}`);
      const badge = document.getElementById(`challengeBadge${i}`);
      if (state.challenges[key]) {
        solvedCount++;
        if (card) card.classList.add('solved');
        if (badge) {
          badge.textContent = '✅ Solved!';
          badge.className = 'gpu-challenge-badge solved';
        }
      }
    }
    const progressEl = document.getElementById('challengesProgress');
    if (progressEl) {
      progressEl.textContent = `${solvedCount} / 6 Completed`;
    }
  }

  // --- UI Renderer ---
  function updateUI() {
    const inp = state.inputs;
    const reg = state.registers;

    // 1. Sliders & Channel displays
    document.getElementById('valRed').textContent = inp.red_in;
    document.getElementById('valGreen').textContent = inp.green_in;
    document.getElementById('valBlue').textContent = inp.blue_in;

    // 2. Magnified Single Pixel Output
    const pixelBox = document.getElementById('magnifiedPixel');
    const hexColor = toHexColor(reg.red_out, reg.green_out, reg.blue_out);
    if (pixelBox) {
      pixelBox.style.backgroundColor = hexColor;
      if (reg.pixel_valid_out === 1) {
        pixelBox.classList.remove('stale');
        pixelBox.style.boxShadow = `0 12px 30px ${hexColor}55`;
      } else {
        pixelBox.classList.add('stale');
        pixelBox.style.boxShadow = 'none';
      }
    }

    // 3. Telemetry values
    document.getElementById('telemCoords').textContent = `(${reg.pixel_x_out}, ${reg.pixel_y_out})`;
    document.getElementById('telemDecimal').textContent = `rgb(${reg.red_out}, ${reg.green_out}, ${reg.blue_out})`;
    document.getElementById('telemHex').textContent = hexColor;
    document.getElementById('telemBinary').textContent = `${toBinary8(reg.red_out)}_${toBinary8(reg.green_out)}_${toBinary8(reg.blue_out)}`;

    const statusBadge = document.getElementById('telemStatus');
    if (statusBadge) {
      if (reg.pixel_valid_out === 1) {
        statusBadge.innerHTML = '<span style="color:#16A34A;font-weight:800">● VALID (Active)</span>';
      } else {
        statusBadge.innerHTML = '<span style="color:#D97706;font-weight:800">○ INVALID (Stale / Blank)</span>';
      }
    }

    // 4. Educational Math Panel
    document.getElementById('mathRedDec').textContent = inp.red_in;
    document.getElementById('mathRedBin').textContent = toBinary8(inp.red_in);
    document.getElementById('mathGreenDec').textContent = inp.green_in;
    document.getElementById('mathGreenBin').textContent = toBinary8(inp.green_in);
    document.getElementById('mathBlueDec').textContent = inp.blue_in;
    document.getElementById('mathBlueBin').textContent = toBinary8(inp.blue_in);
    document.getElementById('mathResultHex').textContent = toHexColor(inp.red_in, inp.green_in, inp.blue_in);
    document.getElementById('mathColorDot').style.backgroundColor = toHexColor(inp.red_in, inp.green_in, inp.blue_in);

    // 5. Simulation Toolbar & Cycle Indicator
    document.getElementById('simCycleCount').textContent = `Cycle: ${state.cycle}`;
    const clkIndicator = document.getElementById('clkIndicator');
    if (clkIndicator) {
      if (inp.clk === 1) clkIndicator.classList.add('high');
      else clkIndicator.classList.remove('high');
    }

    // 6. Signal Table
    document.getElementById('sigClk').textContent = inp.clk;
    document.getElementById('sigRst').textContent = inp.rst;
    document.getElementById('sigValidIn').textContent = inp.pixel_valid_in;
    document.getElementById('sigCoordIn').textContent = `(${inp.pixel_x_in}, ${inp.pixel_y_in})`;
    document.getElementById('sigRgbIn').textContent = `${toHexColor(inp.red_in, inp.green_in, inp.blue_in)} (${inp.red_in},${inp.green_in},${inp.blue_in})`;
    document.getElementById('sigValidOut').textContent = reg.pixel_valid_out;
    document.getElementById('sigCoordOut').textContent = `(${reg.pixel_x_out}, ${reg.pixel_y_out})`;
    document.getElementById('sigRgbOut').textContent = `${hexColor} (${reg.red_out},${reg.green_out},${reg.blue_out})`;
  }

  // --- Dynamic Digital Waveform Drawing ---
  function drawWaveforms() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, width, height);

    const history = state.history;
    if (history.length === 0) return;

    const signals = [
      { name: 'clk', type: 'digital' },
      { name: 'rst', type: 'digital' },
      { name: 'valid_in', type: 'digital' },
      { name: 'coords_in', type: 'bus' },
      { name: 'rgb_in', type: 'color' },
      { name: 'valid_out', type: 'digital' },
      { name: 'coords_out', type: 'bus' },
      { name: 'rgb_out', type: 'color' }
    ];

    const labelWidth = 90;
    const plotWidth = width - labelWidth - 20;
    const rowHeight = height / signals.length;
    const stepX = Math.max(28, plotWidth / 24);

    // Draw grid lines
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let r = 0; r <= signals.length; r++) {
      ctx.beginPath();
      ctx.moveTo(labelWidth, r * rowHeight);
      ctx.lineTo(width, r * rowHeight);
      ctx.stroke();
    }

    // Draw signals
    signals.forEach((sig, rIdx) => {
      const yBase = (rIdx + 1) * rowHeight - 6;
      const yHigh = rIdx * rowHeight + 8;

      // Label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px monospace';
      ctx.fillText(sig.name, 10, yBase - 6);

      // Waveform trace
      history.forEach((h, i) => {
        const x0 = labelWidth + i * stepX;
        const x1 = x0 + stepX;

        if (sig.type === 'digital') {
          const val = (sig.name === 'clk') ? (i % 2 === 0 ? 0 : 1) : h[sig.name];
          const y = (val === 1) ? yHigh : yBase;

          ctx.strokeStyle = (sig.name === 'clk') ? '#38BDF8' : (val === 1 ? '#10B981' : '#64748B');
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          if (i === 0) ctx.moveTo(x0, y);
          else {
            const prevVal = (sig.name === 'clk') ? ((i - 1) % 2 === 0 ? 0 : 1) : history[i - 1][sig.name];
            const prevY = (prevVal === 1) ? yHigh : yBase;
            ctx.moveTo(x0, prevY);
            ctx.lineTo(x0, y);
          }
          ctx.lineTo(x1, y);
          ctx.stroke();

        } else if (sig.type === 'bus') {
          // Bus hex box
          const text = (sig.name === 'coords_in') ? `(${h.x_in},${h.y_in})` : `(${h.x_out},${h.y_out})`;
          ctx.strokeStyle = '#6366F1';
          ctx.fillStyle = '#1E293B';
          ctx.beginPath();
          ctx.moveTo(x0 + 2, (yBase + yHigh) / 2);
          ctx.lineTo(x0 + 6, yHigh + 2);
          ctx.lineTo(x1 - 6, yHigh + 2);
          ctx.lineTo(x1 - 2, (yBase + yHigh) / 2);
          ctx.lineTo(x1 - 6, yBase - 2);
          ctx.lineTo(x0 + 6, yBase - 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#E2E8F0';
          ctx.font = '9px monospace';
          ctx.fillText(text, x0 + 6, yBase - 5);

        } else if (sig.type === 'color') {
          // Color tile
          const hex = (sig.name === 'rgb_in') ? toHexColor(h.r_in, h.g_in, h.b_in) : toHexColor(h.r_out, h.g_out, h.b_out);
          ctx.fillStyle = hex;
          ctx.fillRect(x0 + 3, yHigh + 3, stepX - 6, rowHeight - 12);
          ctx.strokeStyle = '#FFFFFF33';
          ctx.strokeRect(x0 + 3, yHigh + 3, stepX - 6, rowHeight - 12);

          ctx.fillStyle = (h.r_in + h.g_in + h.b_in > 380) ? '#000' : '#FFF';
          ctx.font = '8px monospace';
          ctx.fillText(hex.slice(1), x0 + 4, yBase - 6);
        }
      });
    });
  }

  // --- Event Handlers Setup ---
  function setupEventListeners() {
    // Sliders
    const sR = document.getElementById('sliderRed');
    const sG = document.getElementById('sliderGreen');
    const sB = document.getElementById('sliderBlue');
    const inX = document.getElementById('inputCoordX');
    const inY = document.getElementById('inputCoordY');
    const chkValid = document.getElementById('chkValidIn');
    const chkRst = document.getElementById('chkRst');

    if (sR) sR.addEventListener('input', (e) => {
      state.inputs.red_in = parseInt(e.target.value, 10);
      updateUI();
    });
    if (sG) sG.addEventListener('input', (e) => {
      state.inputs.green_in = parseInt(e.target.value, 10);
      updateUI();
    });
    if (sB) sB.addEventListener('input', (e) => {
      state.inputs.blue_in = parseInt(e.target.value, 10);
      updateUI();
    });
    if (inX) inX.addEventListener('input', (e) => {
      state.inputs.pixel_x_in = Math.min(1023, Math.max(0, parseInt(e.target.value, 10) || 0));
      updateUI();
    });
    if (inY) inY.addEventListener('input', (e) => {
      state.inputs.pixel_y_in = Math.min(1023, Math.max(0, parseInt(e.target.value, 10) || 0));
      updateUI();
    });
    if (chkValid) chkValid.addEventListener('change', (e) => {
      state.inputs.pixel_valid_in = e.target.checked ? 1 : 0;
      updateUI();
    });
    if (chkRst) chkRst.addEventListener('change', (e) => {
      state.inputs.rst = e.target.checked ? 1 : 0;
      updateUI();
    });

    // Preset Buttons
    document.querySelectorAll('[data-preset-r]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const r = parseInt(btn.getAttribute('data-preset-r'), 10);
        const g = parseInt(btn.getAttribute('data-preset-g'), 10);
        const b = parseInt(btn.getAttribute('data-preset-b'), 10);
        state.inputs.red_in = r;
        state.inputs.green_in = g;
        state.inputs.blue_in = b;
        sR.value = r;
        sG.value = g;
        sB.value = b;
        updateUI();
      });
    });

    // Clock Simulation Buttons
    const btnStep = document.getElementById('btnStepClock');
    if (btnStep) btnStep.addEventListener('click', stepClockCycle);

    const btnRunAuto = document.getElementById('btnRunAuto');
    if (btnRunAuto) {
      btnRunAuto.addEventListener('click', () => {
        state.running = !state.running;
        btnRunAuto.innerHTML = state.running ? '⏸ Pause Simulation' : '▶ Auto-Clock';
        if (state.running) {
          state.timer = setInterval(stepClockCycle, 600);
        } else {
          clearInterval(state.timer);
        }
      });
    }

    const btnResetSim = document.getElementById('btnResetSim');
    if (btnResetSim) btnResetSim.addEventListener('click', resetExperiment);

    // Copy & Download RTL buttons
    const btnCopy = document.getElementById('btnCopyRtl');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(RTL_SOURCE).then(() => {
          const orig = btnCopy.innerHTML;
          btnCopy.innerHTML = '✓ Copied!';
          setTimeout(() => { btnCopy.innerHTML = orig; }, 2000);
        });
      });
    }

    const btnDownloadRtl = document.getElementById('btnDownloadRtl');
    if (btnDownloadRtl) {
      btnDownloadRtl.addEventListener('click', () => {
        const blob = new Blob([RTL_SOURCE], { type: 'text/x-verilog;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pixel_generator.v';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      });
    }

    const btnDownloadTb = document.getElementById('btnDownloadTb');
    if (btnDownloadTb) {
      btnDownloadTb.addEventListener('click', () => {
        const blob = new Blob([TB_SOURCE], { type: 'text/x-verilog;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pixel_generator_tb.v';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      });
    }

    // Remote Icarus Verilog Execution
    const btnRunIcarus = document.getElementById('btnRunIcarus');
    const consoleBox = document.getElementById('simConsoleOutput');
    if (btnRunIcarus && consoleBox) {
      btnRunIcarus.addEventListener('click', async () => {
        btnRunIcarus.disabled = true;
        btnRunIcarus.innerHTML = '⏳ Compiling with Icarus Verilog...';
        consoleBox.textContent = '==> Connecting to remote Icarus Verilog compiler...\n==> Submitting pixel_generator.v & pixel_generator_tb.v...';

        try {
          const combined = RTL_SOURCE + '\n\n' + TB_SOURCE;
          const resp = await fetch('https://ecrionix-ecrionix-verilog.hf.space/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: combined, top: 'pixel_generator_tb' })
          });
          const data = await resp.json();
          let output = '';
          if (data.stdout) output += data.stdout;
          if (data.stderr) output += '\n[STDERR]:\n' + data.stderr;
          consoleBox.textContent = output || 'Simulation finished with no console output.';
        } catch (err) {
          consoleBox.textContent = `[Simulation Service Notice]:\nOffline or network blocked: ${err.message}\n\nYou can run this exact testbench locally via:\n$ iverilog -g2012 -o pixel_sim.vvp pixel_generator_tb.v pixel_generator.v\n$ vvp pixel_sim.vvp`;
        } finally {
          btnRunIcarus.disabled = false;
          btnRunIcarus.innerHTML = '🚀 Run Genuine Icarus Verilog Engine';
        }
      });
    }
  }

  // Initialization
  window.addEventListener('DOMContentLoaded', () => {
    // Populate code block
    const codeEl = document.getElementById('verilogCodeDisplay');
    if (codeEl) codeEl.textContent = RTL_SOURCE;

    setupEventListeners();
    resetExperiment();
  });

})();
