// =============================================================================
// Project: EcrioniX MiniGPU - Cycle-Accurate 2D Graphics Processor
// File:    minigpu.js
// Purpose: Interactive Architecture Diagram, Graphics Studio, Dual Simulation
//          Engine & VCD Timing Waveform Viewer
// Author:  EcrioniX Hardware Engineering Team (https://ecrionix.org)
// =============================================================================

(function() {
  'use strict';

  // State Management
  const state = {
    resolution: { width: 160, height: 120, totalPixels: 19200 },
    commandQueue: [],
    selectedBlock: 'rasterizer_controller',
    activeTab: 'tab-module',
    diagramZoom: 1.0,
    diagramPan: { x: 0, y: 0 },
    isPanning: false,
    panStart: { x: 0, y: 0 },
    
    // Hardware Stepper State (Cycle-Accurate RTL Model)
    stepper: {
      running: false,
      timer: null,
      speedHz: 50, // Clocks per second during playback
      clk: 0,
      cycleCount: 0,
      rst_n: 1,
      
      // Host Interface & FIFO
      cmd_ready: true,
      fifo_mem: [],
      fifo_wr_ptr: 0,
      fifo_rd_ptr: 0,
      fifo_count: 0,
      
      // Decoder
      dec_state: 0, // 0=IDLE, 1=WAIT, 2=POP
      cur_cmd: null,
      
      // Rasterizer Controller
      raster_state: 0, // 0=IDLE, 1=SETUP, 2=RASTERIZE, 3=WRITE, 4=COMPLETE
      cur_pixel_x: 0,
      cur_pixel_y: 0,
      eval_enable: false,
      shape_hit: false,
      pixel_valid: false,
      fb_we: false,
      fb_addr: 0,
      fb_data: 0,
      total_pixels_rendered: 0,
      total_cmds_done: 0,
      
      // Framebuffer (19,200 x 24-bit RGB)
      framebuffer: new Uint32Array(19200),
      
      // Display Controller
      h_count: 0,
      v_count: 0,
      disp_x: 0,
      disp_y: 0,
      disp_rgb: 0,
      hsync: true,
      vsync: true,
      display_enable: false,
      
      // Waveform cycle history
      trace: []
    }
  };

  // Default Hardware Test Scene Presets
  const PRESETS = {
    default: [
      { type: 3, name: 'Clear Screen (Black)', color: '#000000', params: {} },
      { type: 0, name: 'Red Rectangle', color: '#FF0000', params: { x0: 20, y0: 20, x1: 40, y1: 30 } },
      { type: 1, name: 'Green Circle', color: '#00FF00', params: { x0: 100, y0: 50, x1: 25 } },
      { type: 2, name: 'Blue Triangle', color: '#0000FF', params: { x0: 30, y0: 80, x1: 80, y1: 80, x2: 55, y2: 110 } },
      { type: 0, name: 'Yellow Overlap', color: '#FFFF00', params: { x0: 95, y0: 45, x1: 15, y1: 15 } }
    ],
    rgb: [
      { type: 3, name: 'Clear Screen (#0a0f1d)', color: '#0A0F1D', params: {} },
      { type: 0, name: 'Cyan Rect', color: '#00E5FF', params: { x0: 15, y0: 15, x1: 50, y1: 40 } },
      { type: 1, name: 'Magenta Circle', color: '#E040FB', params: { x0: 110, y0: 40, x1: 30 } },
      { type: 2, name: 'Amber Triangle', color: '#FFD700', params: { x0: 40, y0: 70, x1: 120, y1: 70, x2: 80, y2: 115 } }
    ],
    clear: [
      { type: 3, name: 'Clear Screen (#1E293B)', color: '#1E293B', params: {} }
    ]
  };

  // DOM Elements
  let els = {};

  function initDOMElements() {
    els = {
      // Toolbar
      btnRunBackend: document.getElementById('btnRunBackend'),
      btnPlayPause: document.getElementById('btnPlayPause'),
      btnStep1: document.getElementById('btnStep1'),
      btnStep10: document.getElementById('btnStep10'),
      btnStep100: document.getElementById('btnStep100'),
      btnReset: document.getElementById('btnReset'),
      speedSelect: document.getElementById('speedSelect'),
      metricCycles: document.getElementById('metricCycles'),
      metricRendered: document.getElementById('metricRendered'),
      metricCmds: document.getElementById('metricCmds'),
      metricState: document.getElementById('metricState'),

      // Studio Command Builder
      shapeSelect: document.getElementById('shapeSelect'),
      inputColor: document.getElementById('inputColor'),
      hexColor: document.getElementById('hexColor'),
      shapeParamsContainer: document.getElementById('shapeParamsContainer'),
      btnAddCommand: document.getElementById('btnAddCommand'),
      presetSelect: document.getElementById('presetSelect'),
      btnClearQueue: document.getElementById('btnClearQueue'),
      queueList: document.getElementById('queueList'),

      // Diagram
      diagramViewport: document.getElementById('diagramViewport'),
      diagramSvg: document.getElementById('diagramSvg'),
      btnZoomIn: document.getElementById('btnZoomIn'),
      btnZoomOut: document.getElementById('btnZoomOut'),
      btnZoomFit: document.getElementById('btnZoomFit'),

      // Screen & Telemetry
      fbCanvas: document.getElementById('fbCanvas'),
      pixelHoverCoord: document.getElementById('pixelHoverCoord'),
      pixelHoverColor: document.getElementById('pixelHoverColor'),
      pixelHoverAddr: document.getElementById('pixelHoverAddr'),
      telemCurPixel: document.getElementById('telemCurPixel'),
      telemFbAddr: document.getElementById('telemFbAddr'),
      telemFbWe: document.getElementById('telemFbWe'),
      telemDispScan: document.getElementById('telemDispScan'),

      // Tabs
      tabBtns: document.querySelectorAll('.mgpu-tab-btn'),
      tabContents: document.querySelectorAll('.mgpu-tab-content'),
      moduleTitle: document.getElementById('inspectModuleTitle'),
      moduleDesc: document.getElementById('inspectModuleDesc'),
      modulePorts: document.getElementById('inspectModulePorts'),
      moduleRegisters: document.getElementById('inspectModuleRegisters'),
      moduleCode: document.getElementById('inspectModuleCode'),
      consoleBox: document.getElementById('simConsoleBox'),
      waveCanvas: document.getElementById('waveCanvas')
    };
  }

  // ===========================================================================
  // 1. Graphics Studio & Command Queue Builder
  // ===========================================================================
  function updateShapeParamFields() {
    const type = parseInt(els.shapeSelect.value, 10);
    let html = '';

    if (type === 0) { // Rectangle
      html = `
        <div class="mgpu-input-row">
          <div class="mgpu-form-group">
            <label>Origin X (0..159)</label>
            <input type="number" id="p_x0" class="mgpu-input" value="20" min="0" max="159">
          </div>
          <div class="mgpu-form-group">
            <label>Origin Y (0..119)</label>
            <input type="number" id="p_y0" class="mgpu-input" value="20" min="0" max="119">
          </div>
        </div>
        <div class="mgpu-input-row">
          <div class="mgpu-form-group">
            <label>Width W (1..160)</label>
            <input type="number" id="p_x1" class="mgpu-input" value="40" min="1" max="160">
          </div>
          <div class="mgpu-form-group">
            <label>Height H (1..120)</label>
            <input type="number" id="p_y1" class="mgpu-input" value="30" min="1" max="120">
          </div>
        </div>
      `;
    } else if (type === 1) { // Circle
      html = `
        <div class="mgpu-input-row">
          <div class="mgpu-form-group">
            <label>Center X (0..159)</label>
            <input type="number" id="p_x0" class="mgpu-input" value="100" min="0" max="159">
          </div>
          <div class="mgpu-form-group">
            <label>Center Y (0..119)</label>
            <input type="number" id="p_y0" class="mgpu-input" value="50" min="0" max="119">
          </div>
        </div>
        <div class="mgpu-form-group">
          <label>Radius R (0..80)</label>
          <input type="number" id="p_x1" class="mgpu-input" value="25" min="0" max="80">
        </div>
      `;
    } else if (type === 2) { // Triangle
      html = `
        <div class="mgpu-input-row">
          <div class="mgpu-form-group">
            <label>Vertex 0 X / Y</label>
            <div style="display:flex;gap:4px">
              <input type="number" id="p_x0" class="mgpu-input" value="30" min="0" max="159">
              <input type="number" id="p_y0" class="mgpu-input" value="80" min="0" max="119">
            </div>
          </div>
          <div class="mgpu-form-group">
            <label>Vertex 1 X / Y</label>
            <div style="display:flex;gap:4px">
              <input type="number" id="p_x1" class="mgpu-input" value="80" min="0" max="159">
              <input type="number" id="p_y1" class="mgpu-input" value="80" min="0" max="119">
            </div>
          </div>
        </div>
        <div class="mgpu-form-group">
          <label>Vertex 2 X / Y</label>
          <div style="display:flex;gap:4px">
            <input type="number" id="p_x2" class="mgpu-input" value="55" min="0" max="159">
            <input type="number" id="p_y2" class="mgpu-input" value="110" min="0" max="119">
          </div>
        </div>
      `;
    } else if (type === 3) { // Clear
      html = `
        <div style="font-size:0.8rem;color:var(--mgpu-text-muted);padding:0.4rem 0;">
          Clears all 19,200 framebuffer addresses (160x120) with the selected background color.
        </div>
      `;
    }

    els.shapeParamsContainer.innerHTML = html;
  }

  function addCommandFromInputs() {
    const type = parseInt(els.shapeSelect.value, 10);
    const color = els.inputColor.value.toUpperCase();
    const cmd = { type: type, color: color, params: {} };

    const shapeNames = ['Rectangle', 'Circle', 'Triangle', 'Clear Screen'];
    cmd.name = shapeNames[type];

    if (type === 0) {
      cmd.params.x0 = parseInt(document.getElementById('p_x0').value, 10) || 0;
      cmd.params.y0 = parseInt(document.getElementById('p_y0').value, 10) || 0;
      cmd.params.x1 = parseInt(document.getElementById('p_x1').value, 10) || 10;
      cmd.params.y1 = parseInt(document.getElementById('p_y1').value, 10) || 10;
    } else if (type === 1) {
      cmd.params.x0 = parseInt(document.getElementById('p_x0').value, 10) || 0;
      cmd.params.y0 = parseInt(document.getElementById('p_y0').value, 10) || 0;
      cmd.params.x1 = parseInt(document.getElementById('p_x1').value, 10) || 10;
    } else if (type === 2) {
      cmd.params.x0 = parseInt(document.getElementById('p_x0').value, 10) || 0;
      cmd.params.y0 = parseInt(document.getElementById('p_y0').value, 10) || 0;
      cmd.params.x1 = parseInt(document.getElementById('p_x1').value, 10) || 0;
      cmd.params.y1 = parseInt(document.getElementById('p_y1').value, 10) || 0;
      cmd.params.x2 = parseInt(document.getElementById('p_x2').value, 10) || 0;
      cmd.params.y2 = parseInt(document.getElementById('p_y2').value, 10) || 0;
    }

    state.commandQueue.push(cmd);
    renderQueueList();
    resetHardwareState();
  }

  function renderQueueList() {
    if (state.commandQueue.length === 0) {
      els.queueList.innerHTML = '<div style="padding:0.75rem;font-size:0.78rem;color:var(--mgpu-text-dim);text-align:center;">Command queue is empty. Add drawing commands above or choose a preset.</div>';
      return;
    }

    let html = '';
    state.commandQueue.forEach((cmd, idx) => {
      let desc = '';
      if (cmd.type === 0) desc = `X=${cmd.params.x0}, Y=${cmd.params.y0}, W=${cmd.params.x1}, H=${cmd.params.y1}`;
      else if (cmd.type === 1) desc = `Center=(${cmd.params.x0},${cmd.params.y0}), R=${cmd.params.x1}`;
      else if (cmd.type === 2) desc = `(${cmd.params.x0},${cmd.params.y0}) -> (${cmd.params.x1},${cmd.params.y1}) -> (${cmd.params.x2},${cmd.params.y2})`;
      else if (cmd.type === 3) desc = `Fill 160x120`;

      html += `
        <div class="mgpu-queue-item">
          <div style="display:flex;align-items:center;gap:0.5rem">
            <span class="mgpu-queue-color-swatch" style="background:${cmd.color}"></span>
            <div>
              <strong style="color:var(--mgpu-text)">${idx + 1}. ${cmd.name}</strong>
              <div style="font-size:0.72rem;color:var(--mgpu-text-muted)">${desc}</div>
            </div>
          </div>
          <button class="mgpu-btn" style="padding:0.2rem 0.4rem;font-size:0.7rem;" data-action="remove" data-index="${idx}">✕</button>
        </div>
      `;
    });
    els.queueList.innerHTML = html;

    // Attach remove handlers
    els.queueList.querySelectorAll('button[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        state.commandQueue.splice(idx, 1);
        renderQueueList();
        resetHardwareState();
      });
    });
  }

  function loadPreset(name) {
    if (PRESETS[name]) {
      state.commandQueue = JSON.parse(JSON.stringify(PRESETS[name]));
      renderQueueList();
      resetHardwareState();
    }
  }

  // ===========================================================================
  // 2. Interactive Semiconductor IP Block Diagram
  // ===========================================================================
  const DIAGRAM_LAYOUT = {
    blocks: [
      { id: 'cmd_interface', x: 40, y: 50, w: 180, h: 90, title: 'Host Cmd Interface' },
      { id: 'command_fifo', x: 270, y: 50, w: 170, h: 90, title: 'Command FIFO (16x86)' },
      { id: 'command_decoder', x: 490, y: 50, w: 200, h: 90, title: 'Command Decoder' },
      
      { id: 'rasterizer_controller', x: 490, y: 200, w: 200, h: 110, title: 'Rasterizer Controller' },
      { id: 'rectangle_rasterizer', x: 40, y: 200, w: 160, h: 70, title: 'Rectangle Engine' },
      { id: 'circle_rasterizer', x: 40, y: 290, w: 160, h: 70, title: 'Circle Engine' },
      { id: 'triangle_rasterizer', x: 40, y: 380, w: 160, h: 70, title: 'Triangle Engine' },
      
      { id: 'pixel_color_generator', x: 250, y: 280, w: 180, h: 80, title: 'Pixel Color Gen' },
      
      { id: 'framebuffer', x: 740, y: 160, w: 210, h: 170, title: 'Dual-Port Framebuffer' },
      { id: 'display_controller', x: 1000, y: 160, w: 180, h: 170, title: 'Display Controller' },
      { id: 'graphics_output', x: 1230, y: 200, w: 150, h: 90, title: 'Graphics Video Out' }
    ]
  };

  function renderArchitectureDiagram() {
    const svg = els.diagramSvg;
    svg.innerHTML = '';

    const manifest = window.MINIGPU_MANIFEST;
    if (!manifest) return;

    // Defs for Arrow Markers
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow-cmd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284C7" />
      </marker>
      <marker id="arrow-pixel" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#16A34A" />
      </marker>
      <marker id="arrow-mem" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#D97706" />
      </marker>
      <marker id="arrow-disp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#8B5CF6" />
      </marker>
    `;
    svg.appendChild(defs);

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', 'diagramRootGroup');
    g.setAttribute('transform', `translate(${state.diagramPan.x}, ${state.diagramPan.y}) scale(${state.diagramZoom})`);

    // Render Blocks
    DIAGRAM_LAYOUT.blocks.forEach(b => {
      const isSelected = (state.selectedBlock === b.id);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', b.x);
      rect.setAttribute('y', b.y);
      rect.setAttribute('width', b.w);
      rect.setAttribute('height', b.h);
      rect.setAttribute('rx', 8);
      rect.setAttribute('fill', isDark ? (isSelected ? '#1E293B' : '#0F172A') : (isSelected ? '#E0F2FE' : '#FFFFFF'));
      rect.setAttribute('stroke', isSelected ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#334155' : '#CBD5E1'));
      rect.setAttribute('stroke-width', isSelected ? '2.5' : '1.5');
      rect.setAttribute('cursor', 'pointer');
      rect.setAttribute('data-block-id', b.id);

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', b.x + b.w / 2);
      title.setAttribute('y', b.y + 24);
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('font-size', '12px');
      title.setAttribute('font-weight', '700');
      title.setAttribute('fill', isDark ? '#F8FAFC' : '#0F172A');
      title.setAttribute('pointer-events', 'none');
      title.textContent = b.title;

      const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sub.setAttribute('x', b.x + b.w / 2);
      sub.setAttribute('y', b.y + 44);
      sub.setAttribute('text-anchor', 'middle');
      sub.setAttribute('font-size', '10px');
      sub.setAttribute('fill', isDark ? '#94A3B8' : '#64748B');
      sub.setAttribute('pointer-events', 'none');
      sub.textContent = b.id + '.v';

      rect.addEventListener('click', () => {
        selectBlock(b.id);
      });

      g.appendChild(rect);
      g.appendChild(title);
      g.appendChild(sub);
    });

    // Render Connections
    manifest.connections.forEach(conn => {
      const srcBlock = DIAGRAM_LAYOUT.blocks.find(b => b.id === conn.from);
      const dstBlock = DIAGRAM_LAYOUT.blocks.find(b => b.id === conn.to);
      if (!srcBlock || !dstBlock) return;

      let x1 = srcBlock.x + srcBlock.w;
      let y1 = srcBlock.y + srcBlock.h / 2;
      let x2 = dstBlock.x;
      let y2 = dstBlock.y + dstBlock.h / 2;

      // Handle vertical or retrograde connections
      if (srcBlock.x > dstBlock.x) {
        x1 = srcBlock.x;
        x2 = dstBlock.x + dstBlock.w;
      }

      let strokeColor = '#0284C7';
      let markerId = 'arrow-cmd';
      if (conn.type === 'pixel') { strokeColor = '#16A34A'; markerId = 'arrow-pixel'; }
      else if (conn.type === 'memory') { strokeColor = '#D97706'; markerId = 'arrow-mem'; }
      else if (conn.type === 'display') { strokeColor = '#8B5CF6'; markerId = 'arrow-disp'; }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const dx = Math.abs(x2 - x1) * 0.5;
      const d = `M ${x1} ${y1} C ${x1 + (x2 > x1 ? dx : -dx)} ${y1}, ${x2 - (x2 > x1 ? dx : -dx)} ${y2}, ${x2} ${y2}`;
      
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', strokeColor);
      path.setAttribute('stroke-width', conn.width > 1 ? '2.5' : '1.5');
      path.setAttribute('marker-end', `url(#${markerId})`);
      path.setAttribute('opacity', '0.75');

      g.appendChild(path);
    });

    svg.appendChild(g);
  }

  function selectBlock(blockId) {
    state.selectedBlock = blockId;
    renderArchitectureDiagram();
    updateModuleInspector();
  }

  function updateModuleInspector() {
    const manifest = window.MINIGPU_MANIFEST;
    if (!manifest) return;

    const block = manifest.blocks.find(b => b.id === state.selectedBlock);
    if (!block) return;

    els.moduleTitle.textContent = `${block.name} (${block.module})`;
    els.moduleDesc.textContent = block.description;

    // Render Ports Table
    let portsHtml = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">';
    
    // Inputs
    portsHtml += '<div><h4 style="font-size:0.8rem;margin-bottom:0.4rem;color:var(--mgpu-text);">INPUT PORTS</h4>';
    block.inputs.forEach(p => {
      portsHtml += `
        <div style="font-size:0.75rem;padding:0.25rem 0.4rem;border-bottom:1px solid var(--mgpu-border);display:flex;justify-content:space-between">
          <span style="font-family:monospace;font-weight:700;color:var(--mgpu-primary)">${p.name}</span>
          <span style="color:var(--mgpu-text-muted)">[${p.width}-bit] ${p.desc}</span>
        </div>
      `;
    });
    portsHtml += '</div>';

    // Outputs
    portsHtml += '<div><h4 style="font-size:0.8rem;margin-bottom:0.4rem;color:var(--mgpu-text);">OUTPUT PORTS</h4>';
    block.outputs.forEach(p => {
      portsHtml += `
        <div style="font-size:0.75rem;padding:0.25rem 0.4rem;border-bottom:1px solid var(--mgpu-border);display:flex;justify-content:space-between">
          <span style="font-family:monospace;font-weight:700;color:var(--mgpu-success)">${p.name}</span>
          <span style="color:var(--mgpu-text-muted)">[${p.width}-bit] ${p.desc}</span>
        </div>
      `;
    });
    portsHtml += '</div></div>';
    els.modulePorts.innerHTML = portsHtml;

    // Registers & FSM
    let regHtml = `<p><strong>Registers:</strong> ${block.registers.join(', ')}</p>`;
    regHtml += `<p style="margin-top:0.4rem"><strong>FSM / Operation:</strong> ${block.fsm.join(', ')}</p>`;
    els.moduleRegisters.innerHTML = regHtml;

    // RTL Code
    const sources = window.MINIGPU_RTL_SOURCES;
    if (sources && sources[block.module]) {
      els.moduleCode.textContent = sources[block.module];
    } else {
      els.moduleCode.textContent = '// RTL source not loaded.';
    }
  }

  // ===========================================================================
  // 3. Hardware Stepper & Simulation Engine
  // ===========================================================================
  function resetHardwareState() {
    const s = state.stepper;
    s.running = false;
    if (s.timer) clearInterval(s.timer);
    els.btnPlayPause.textContent = '▶ Play';

    s.cycleCount = 0;
    s.clk = 0;
    s.rst_n = 0;
    s.total_pixels_rendered = 0;
    s.total_cmds_done = 0;
    
    // Clear Framebuffer
    s.framebuffer.fill(0);
    
    // Reset FIFO
    s.fifo_mem = JSON.parse(JSON.stringify(state.commandQueue));
    s.fifo_count = s.fifo_mem.length;
    s.fifo_rd_ptr = 0;
    s.fifo_wr_ptr = s.fifo_count;
    
    // Reset FSMs
    s.dec_state = 0;
    s.cur_cmd = null;
    s.raster_state = 0;
    s.cur_pixel_x = 0;
    s.cur_pixel_y = 0;
    s.eval_enable = false;
    s.fb_we = false;
    
    s.h_count = 0;
    s.v_count = 0;
    s.disp_x = 0;
    s.disp_y = 0;
    s.hsync = true;
    s.vsync = true;
    s.display_enable = false;
    
    s.trace = [];

    // Clock once to release reset
    stepClockCycle();
    s.rst_n = 1;

    updateUI();
    renderFramebufferCanvas();
    renderWaveform();
  }

  function stepClockCycle() {
    const s = state.stepper;
    s.cycleCount++;
    s.clk = s.clk ? 0 : 1;

    if (!s.clk) {
      // Falling edge: capture trace for waveform viewer
      recordTraceSample();
      return;
    }

    // =========================================================================
    // POSITIVE CLOCK EDGE EXECUTION (Synthesizable RTL Matching)
    // =========================================================================

    // 1. Decoder Execution
    if (s.dec_state === 0) { // DEC_IDLE
      if (s.fifo_count > 0 && s.raster_state === 0) {
        s.cur_cmd = s.fifo_mem[s.fifo_rd_ptr];
        s.dec_state = 1; // DEC_WAIT
      }
    } else if (s.dec_state === 1) { // DEC_WAIT
      if (s.raster_state === 4) { // Rasterizer finished (STATE_COMPLETE)
        s.dec_state = 2; // DEC_POP
        s.fifo_rd_ptr = (s.fifo_rd_ptr + 1) % 16;
        s.fifo_count = Math.max(0, s.fifo_count - 1);
      }
    } else if (s.dec_state === 2) { // DEC_POP
      s.dec_state = 0; // Return to IDLE after FIFO pop
      s.cur_cmd = null;
    }

    // 2. Rasterizer Controller Execution
    if (s.raster_state === 0) { // STATE_IDLE
      s.fb_we = false;
      s.eval_enable = false;
      if (s.dec_state === 1 && s.cur_cmd) {
        // Setup Bounding Box
        setupBoundingBox(s.cur_cmd);
        s.raster_state = 1; // STATE_SETUP
      }
    } else if (s.raster_state === 1) { // STATE_SETUP
      s.cur_pixel_x = s.bbox_min_x;
      s.cur_pixel_y = s.bbox_min_y;
      s.eval_enable = true;
      s.raster_state = 2; // STATE_RASTERIZE
    } else if (s.raster_state === 2) { // STATE_RASTERIZE
      s.eval_enable = true;
      
      // Coverage evaluation
      const hit = evaluateShapeCoverage(s.cur_cmd, s.cur_pixel_x, s.cur_pixel_y);
      s.shape_hit = hit;
      s.pixel_valid = hit;

      if (hit) {
        s.fb_we = true;
        s.fb_addr = s.cur_pixel_y * 160 + s.cur_pixel_x;
        s.fb_data = parseColorHex(s.cur_cmd.color);
        s.framebuffer[s.fb_addr] = s.fb_data;
        s.total_pixels_rendered++;
      } else {
        s.fb_we = false;
      }

      // Traversal step
      if (s.cur_pixel_x < s.bbox_max_x) {
        s.cur_pixel_x++;
      } else {
        s.cur_pixel_x = s.bbox_min_x;
        if (s.cur_pixel_y < s.bbox_max_y) {
          s.cur_pixel_y++;
        } else {
          s.eval_enable = false;
          s.raster_state = 4; // STATE_COMPLETE
        }
      }
    } else if (s.raster_state === 4) { // STATE_COMPLETE
      s.fb_we = false;
      s.eval_enable = false;
      s.total_cmds_done++;
      s.raster_state = 0; // Return to IDLE
    }

    // 3. Display Controller Raster Scanning
    s.h_count = (s.h_count + 1) % 200;
    if (s.h_count === 0) {
      s.v_count = (s.v_count + 1) % 130;
    }

    s.display_enable = (s.h_count < 160 && s.v_count < 120);
    s.hsync = !(s.h_count >= 168 && s.h_count < 184);
    s.vsync = !(s.v_count >= 122 && s.v_count < 126);

    if (s.display_enable) {
      s.disp_x = s.h_count;
      s.disp_y = s.v_count;
      s.disp_rgb = s.framebuffer[s.disp_y * 160 + s.disp_x];
    } else {
      s.disp_rgb = 0;
    }
  }

  function setupBoundingBox(cmd) {
    const s = state.stepper;
    if (cmd.type === 0) { // Rect
      s.bbox_min_x = Math.max(0, Math.min(159, cmd.params.x0));
      s.bbox_max_x = Math.max(0, Math.min(159, cmd.params.x0 + cmd.params.x1 - 1));
      s.bbox_min_y = Math.max(0, Math.min(119, cmd.params.y0));
      s.bbox_max_y = Math.max(0, Math.min(119, cmd.params.y0 + cmd.params.y1 - 1));
    } else if (cmd.type === 1) { // Circle
      s.bbox_min_x = Math.max(0, cmd.params.x0 - cmd.params.x1);
      s.bbox_max_x = Math.min(159, cmd.params.x0 + cmd.params.x1);
      s.bbox_min_y = Math.max(0, cmd.params.y0 - cmd.params.x1);
      s.bbox_max_y = Math.min(119, cmd.params.y0 + cmd.params.x1);
    } else if (cmd.type === 2) { // Triangle
      s.bbox_min_x = Math.max(0, Math.min(cmd.params.x0, cmd.params.x1, cmd.params.x2));
      s.bbox_max_x = Math.min(159, Math.max(cmd.params.x0, cmd.params.x1, cmd.params.x2));
      s.bbox_min_y = Math.max(0, Math.min(cmd.params.y0, cmd.params.y1, cmd.params.y2));
      s.bbox_max_y = Math.min(119, Math.max(cmd.params.y0, cmd.params.y1, cmd.params.y2));
    } else if (cmd.type === 3) { // Clear
      s.bbox_min_x = 0;
      s.bbox_max_x = 159;
      s.bbox_min_y = 0;
      s.bbox_max_y = 119;
    }
  }

  function evaluateShapeCoverage(cmd, x, y) {
    if (!cmd) return false;
    if (x >= 160 || y >= 120) return false;

    if (cmd.type === 3) return true; // Clear screen covers all

    if (cmd.type === 0) { // Rectangle
      return (x >= cmd.params.x0 && x < cmd.params.x0 + cmd.params.x1 &&
              y >= cmd.params.y0 && y < cmd.params.y0 + cmd.params.y1);
    }

    if (cmd.type === 1) { // Circle (Squared distance arithmetic)
      const dx = x - cmd.params.x0;
      const dy = y - cmd.params.y0;
      return (dx * dx + dy * dy) <= (cmd.params.x1 * cmd.params.x1);
    }

    if (cmd.type === 2) { // Triangle (Pineda Edge Function)
      const e01 = (x - cmd.params.x0) * (cmd.params.y1 - cmd.params.y0) - (y - cmd.params.y0) * (cmd.params.x1 - cmd.params.x0);
      const e12 = (x - cmd.params.x1) * (cmd.params.y2 - cmd.params.y1) - (y - cmd.params.y1) * (cmd.params.x2 - cmd.params.x1);
      const e20 = (x - cmd.params.x2) * (cmd.params.y0 - cmd.params.y2) - (y - cmd.params.y2) * (cmd.params.x0 - cmd.params.x2);

      const allPos = (e01 >= 0 && e12 >= 0 && e20 >= 0);
      const allNeg = (e01 <= 0 && e12 <= 0 && e20 <= 0);
      return (allPos || allNeg);
    }

    return false;
  }

  function parseColorHex(hexStr) {
    if (!hexStr) return 0;
    return parseInt(hexStr.replace('#', ''), 16);
  }

  function recordTraceSample() {
    const s = state.stepper;
    if (s.trace.length > 200) s.trace.shift(); // Keep latest 200 cycles

    s.trace.push({
      cycle: s.cycleCount,
      clk: s.clk,
      rst_n: s.rst_n,
      cmd_valid: (s.dec_state === 1),
      cmd_ready: (s.fifo_count < 16),
      raster_state: s.raster_state,
      cur_x: s.cur_pixel_x,
      cur_y: s.cur_pixel_y,
      fb_we: s.fb_we ? 1 : 0,
      fb_addr: s.fb_addr,
      display_enable: s.display_enable ? 1 : 0,
      hsync: s.hsync ? 1 : 0,
      vsync: s.vsync ? 1 : 0
    });
  }

  function updateUI() {
    const s = state.stepper;
    els.metricCycles.textContent = s.cycleCount;
    els.metricRendered.textContent = s.total_pixels_rendered.toLocaleString();
    els.metricCmds.textContent = `${s.total_cmds_done} / ${state.commandQueue.length}`;
    
    const stateNames = ['IDLE', 'SETUP', 'RASTERIZE', 'WRITE', 'COMPLETE'];
    els.metricState.textContent = stateNames[s.raster_state] || 'IDLE';

    els.telemCurPixel.textContent = `(${s.cur_pixel_x}, ${s.cur_pixel_y})`;
    els.telemFbAddr.textContent = `0x${s.fb_addr.toString(16).toUpperCase()} (${s.fb_addr})`;
    els.telemFbWe.textContent = s.fb_we ? 'ACTIVE HIGH (1)' : 'IDLE (0)';
    els.telemDispScan.textContent = `(${s.disp_x}, ${s.disp_y}) | DE=${s.display_enable ? 1 : 0}`;
  }

  // ===========================================================================
  // 4. Framebuffer Canvas Rendering
  // ===========================================================================
  function renderFramebufferCanvas() {
    const canvas = els.fbCanvas;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(160, 120);
    const fb = state.stepper.framebuffer;

    for (let i = 0; i < 19200; i++) {
      const rgb = fb[i];
      const r = (rgb >> 16) & 0xFF;
      const g = (rgb >> 8) & 0xFF;
      const b = rgb & 0xFF;
      const idx = i * 4;
      imgData.data[idx] = r;
      imgData.data[idx + 1] = g;
      imgData.data[idx + 2] = b;
      imgData.data[idx + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);

    // If rasterizer is active, draw tiny crosshair at cur_pixel
    if (state.stepper.raster_state === 2) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.strokeRect(state.stepper.cur_pixel_x - 1, state.stepper.cur_pixel_y - 1, 3, 3);
    }
  }

  // ===========================================================================
  // 5. Remote Icarus Verilog Execution
  // ===========================================================================
  function runRemoteVerilogSimulation() {
    const sources = window.MINIGPU_RTL_SOURCES;
    if (!sources || !sources['combined_minigpu_sim.v']) {
      els.consoleBox.textContent = 'Error: Verilog testbench source not found.';
      return;
    }

    els.btnRunBackend.disabled = true;
    els.btnRunBackend.textContent = '⏳ Compiling RTL...';
    els.consoleBox.textContent = 'Submitting synthesizable Verilog RTL + testbench to remote Icarus Verilog runner...\nCompiler: iverilog -g2012\nSimulator: vvp\n';

    fetch('https://ecrionix-ecrionix-verilog.hf.space/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: sources['combined_minigpu_sim.v'] })
    })
      .then(res => res.json())
      .then(data => {
        els.btnRunBackend.disabled = false;
        els.btnRunBackend.textContent = '⚙️ Run Remote RTL Sim';
        if (data && (data.stdout || data.output)) {
          els.consoleBox.textContent = data.stdout || data.output;
          // Switch to Console Tab
          switchTab('tab-console');
        } else if (data && data.stderr) {
          els.consoleBox.textContent = 'Simulation Error:\n' + data.stderr;
          switchTab('tab-console');
        }
      })
      .catch(err => {
        els.btnRunBackend.disabled = false;
        els.btnRunBackend.textContent = '⚙️ Run Remote RTL Sim';
        els.consoleBox.textContent = 'Remote execution endpoint error: ' + err.message + '\nYou can still use the in-browser cycle-accurate hardware stepper!';
      });
  }

  // ===========================================================================
  // 6. Interactive VCD Waveform Viewer
  // ===========================================================================
  function renderWaveform() {
    const canvas = els.waveCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = canvas.parentElement.clientHeight || 360;

    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, w, h);

    const trace = state.stepper.trace;
    if (trace.length < 2) {
      ctx.fillStyle = '#64748B';
      ctx.font = '12px monospace';
      ctx.fillText('Waveform trace is empty. Step or run simulation to record clock cycles.', 20, h / 2);
      return;
    }

    const signals = [
      { name: 'clk', color: '#38BDF8', type: 'digital' },
      { name: 'rst_n', color: '#4ADE80', type: 'digital' },
      { name: 'cmd_valid', color: '#818CF8', type: 'digital' },
      { name: 'cmd_ready', color: '#818CF8', type: 'digital' },
      { name: 'raster_state', color: '#FBBF24', type: 'bus' },
      { name: 'cur_x', color: '#F472B6', type: 'bus' },
      { name: 'cur_y', color: '#F472B6', type: 'bus' },
      { name: 'fb_we', color: '#22C55E', type: 'digital' },
      { name: 'fb_addr', color: '#34D399', type: 'bus' },
      { name: 'display_enable', color: '#A78BFA', type: 'digital' },
      { name: 'hsync', color: '#E879F9', type: 'digital' },
      { name: 'vsync', color: '#E879F9', type: 'digital' }
    ];

    const rowH = (h - 30) / signals.length;
    const colW = (w - 140) / trace.length;

    // Time Axis Header
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(130, 0, w - 130, 24);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px monospace';

    for (let i = 0; i < trace.length; i += 10) {
      const x = 140 + i * colW;
      ctx.fillText(`T+${trace[i].cycle}`, x, 16);
      ctx.strokeStyle = '#1E293B';
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Signals
    signals.forEach((sig, sIdx) => {
      const yBase = 30 + sIdx * rowH;
      
      // Label
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '11px monospace';
      ctx.fillText(sig.name, 10, yBase + rowH * 0.65);

      // Grid line
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.moveTo(0, yBase + rowH);
      ctx.lineTo(w, yBase + rowH);
      ctx.stroke();

      // Trace line
      ctx.strokeStyle = sig.color;
      ctx.lineWidth = 1.5;

      if (sig.type === 'digital') {
        ctx.beginPath();
        trace.forEach((sample, idx) => {
          const x = 140 + idx * colW;
          const val = sample[sig.name];
          const y = val ? (yBase + 4) : (yBase + rowH - 6);
          if (idx === 0) ctx.moveTo(x, y);
          else {
            const prevVal = trace[idx - 1][sig.name];
            const prevY = prevVal ? (yBase + 4) : (yBase + rowH - 6);
            ctx.lineTo(x, prevY);
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      } else { // Bus type
        trace.forEach((sample, idx) => {
          const x = 140 + idx * colW;
          const val = sample[sig.name];
          ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
          ctx.fillRect(x, yBase + 4, colW - 1, rowH - 10);
          ctx.strokeRect(x, yBase + 4, colW - 1, rowH - 10);
          if (colW > 25) {
            ctx.fillStyle = '#F8FAFC';
            ctx.font = '9px monospace';
            ctx.fillText(String(val), x + 2, yBase + rowH * 0.65);
          }
        });
      }
    });
  }

  // ===========================================================================
  // 7. Tab Management & Event Handlers
  // ===========================================================================
  function switchTab(tabId) {
    state.activeTab = tabId;
    els.tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    els.tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
    if (tabId === 'tab-waveform') {
      renderWaveform();
    }
  }

  function setupEvents() {
    // Toolbar buttons
    els.btnPlayPause.addEventListener('click', () => {
      const s = state.stepper;
      s.running = !s.running;
      els.btnPlayPause.textContent = s.running ? '⏸ Pause' : '▶ Play';
      if (s.running) {
        s.timer = setInterval(() => {
          stepClockCycle();
          updateUI();
          renderFramebufferCanvas();
          renderWaveform();
        }, 1000 / s.speedHz);
      } else {
        clearInterval(s.timer);
      }
    });

    els.btnStep1.addEventListener('click', () => {
      stepClockCycle();
      updateUI();
      renderFramebufferCanvas();
      renderWaveform();
    });

    els.btnStep10.addEventListener('click', () => {
      for (let i = 0; i < 10; i++) stepClockCycle();
      updateUI();
      renderFramebufferCanvas();
      renderWaveform();
    });

    els.btnStep100.addEventListener('click', () => {
      for (let i = 0; i < 100; i++) stepClockCycle();
      updateUI();
      renderFramebufferCanvas();
      renderWaveform();
    });

    els.btnReset.addEventListener('click', resetHardwareState);

    els.speedSelect.addEventListener('change', (e) => {
      state.stepper.speedHz = parseInt(e.target.value, 10);
      if (state.stepper.running) {
        clearInterval(state.stepper.timer);
        state.stepper.timer = setInterval(() => {
          stepClockCycle();
          updateUI();
          renderFramebufferCanvas();
          renderWaveform();
        }, 1000 / state.stepper.speedHz);
      }
    });

    els.btnRunBackend.addEventListener('click', runRemoteVerilogSimulation);

    // Studio inputs
    els.shapeSelect.addEventListener('change', updateShapeParamFields);
    els.inputColor.addEventListener('input', (e) => {
      els.hexColor.value = e.target.value.toUpperCase();
    });
    els.hexColor.addEventListener('input', (e) => {
      els.inputColor.value = e.target.value;
    });
    els.btnAddCommand.addEventListener('click', addCommandFromInputs);
    els.btnClearQueue.addEventListener('click', () => {
      state.commandQueue = [];
      renderQueueList();
      resetHardwareState();
    });
    els.presetSelect.addEventListener('change', (e) => {
      loadPreset(e.target.value);
    });

    // Diagram zoom / pan
    els.btnZoomIn.addEventListener('click', () => {
      state.diagramZoom = Math.min(2.0, state.diagramZoom + 0.15);
      renderArchitectureDiagram();
    });
    els.btnZoomOut.addEventListener('click', () => {
      state.diagramZoom = Math.max(0.5, state.diagramZoom - 0.15);
      renderArchitectureDiagram();
    });
    els.btnZoomFit.addEventListener('click', () => {
      state.diagramZoom = 1.0;
      state.diagramPan = { x: 0, y: 0 };
      renderArchitectureDiagram();
    });

    els.diagramViewport.addEventListener('mousedown', (e) => {
      state.isPanning = true;
      state.panStart = { x: e.clientX - state.diagramPan.x, y: e.clientY - state.diagramPan.y };
    });
    window.addEventListener('mousemove', (e) => {
      if (state.isPanning) {
        state.diagramPan.x = e.clientX - state.panStart.x;
        state.diagramPan.y = e.clientY - state.panStart.y;
        renderArchitectureDiagram();
      }
    });
    window.addEventListener('mouseup', () => {
      state.isPanning = false;
    });

    // Framebuffer pixel hover inspection
    els.fbCanvas.addEventListener('mousemove', (e) => {
      const rect = els.fbCanvas.getBoundingClientRect();
      const scaleX = 160 / rect.width;
      const scaleY = 120 / rect.height;
      const x = Math.min(159, Math.max(0, Math.floor((e.clientX - rect.left) * scaleX)));
      const y = Math.min(119, Math.max(0, Math.floor((e.clientY - rect.top) * scaleY)));
      const addr = y * 160 + x;
      const color = state.stepper.framebuffer[addr];
      const hex = '#' + color.toString(16).padStart(6, '0').toUpperCase();

      els.pixelHoverCoord.textContent = `(${x}, ${y})`;
      els.pixelHoverColor.textContent = hex;
      els.pixelHoverAddr.textContent = `${addr}`;
    });

    // Tabs
    els.tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = e.currentTarget.getAttribute('data-tab');
        switchTab(tabId);
      });
    });

    // Window resize
    window.addEventListener('resize', () => {
      renderArchitectureDiagram();
      if (state.activeTab === 'tab-waveform') renderWaveform();
    });
  }

  // ===========================================================================
  // Initializer
  // ===========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    updateShapeParamFields();
    setupEvents();
    loadPreset('default');
    renderArchitectureDiagram();
    updateModuleInspector();
    resetHardwareState();

    // Theme Change Observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          renderArchitectureDiagram();
          if (state.activeTab === 'tab-waveform') renderWaveform();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  });

})();
