/**
 * EcrioniX Interactive Memory Explorer
 * RAM vs ROM vs Cache vs SSD - Hardware Architecture Simulator
 * (C) 2026 EcrioniX. Open & Free Educational Artifact.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    activeHeroCard: 'cache',
    activeHierarchyLevel: 1, // L1 Cache
    powerOn: true,
    ramBlocks: new Array(32).fill(0), // 0: free, 1: OS, 2: App
    cacheSim: {
      address: '0x1040',
      cached: false,
      running: false,
      mode: 'with-cache', // 'with-cache' or 'without-cache'
      step: 0
    },
    ssdSim: {
      writtenPages: [0, 1, 2], // initial system pages
      writing: false
    },
    quiz: {
      score: 0,
      answered: 0,
      userAnswers: {}
    }
  };

  // Initialize 4 OS blocks in RAM
  for (let i = 0; i < 6; i++) {
    state.ramBlocks[i] = 1; // OS kernel
  }

  // =========================================================================
  // Hierarchy Level Specifications
  // =========================================================================
  const HIERARCHY_DATA = [
    {
      level: 0,
      name: "CPU Registers",
      fullName: "General-Purpose & Vector Registers",
      tech: "Flip-Flops / SRAM Register File (6T-8T)",
      capacity: "1 – 2 KB (e.g. 16×64-bit GPRs + 32×512-bit Vector)",
      latency: "0.5 – 1 Clock Cycle (~0.2 – 0.5 ns)",
      bandwidth: "Multiple Terabytes/sec (>10 TB/s aggregate)",
      proximity: "Inside Execution Units (ALU, FPU)",
      cost: "Ultra-High (consumes core logic area)",
      volatility: "Volatile (cleared when powered down)",
      purpose: "Holds active operands, immediate calculation results, and stack pointer directly accessed by execution pipelines without memory bus delays.",
      details: "Registers are not addressed by memory buses; they are directly encoded into machine instructions (e.g., `ADD RAX, RBX`). Modern x86-64 and ARM processors utilize Register Renaming to map architectural registers to an internal pool of ~180-256 physical registers to eliminate false RAW/WAR hazards."
    },
    {
      level: 1,
      name: "L1 Cache",
      fullName: "Level 1 Cache (Split Instruction & Data)",
      tech: "Static RAM (SRAM, 6-Transistor / 8-Transistor Cells)",
      capacity: "32 – 64 KB per core (e.g. 32 KB L1-I + 32 KB L1-D)",
      latency: "4 – 5 Clock Cycles (~1.0 – 1.2 ns)",
      bandwidth: "~1.5 – 2.5 TB/s per core",
      proximity: "Integrated directly inside CPU core die",
      cost: "Very High",
      volatility: "Volatile",
      purpose: "Caches immediate instruction streams (L1-I) and active stack/heap memory (L1-D) to eliminate CPU pipeline stalls.",
      details: "L1 is typically Harvard architecture (split instruction and data caches) to allow simultaneous instruction fetch and data read/write on the same clock cycle. It is virtually indexed and physically tagged (VIPT) to overlap virtual address translation with cache tag lookup."
    },
    {
      level: 2,
      name: "L2 Cache",
      fullName: "Level 2 Cache (Unified per Core)",
      tech: "Static RAM (SRAM)",
      capacity: "512 KB – 1 MB per core",
      latency: "12 – 14 Clock Cycles (~3.0 – 4.0 ns)",
      bandwidth: "~600 – 1,000 GB/s per core",
      proximity: "Dedicated to individual core or dual-core cluster",
      cost: "High",
      volatility: "Volatile",
      purpose: "Catches L1 cache misses. Balances higher capacity with ultra-low latency.",
      details: "L2 caches are typically physically indexed and physically tagged (PIPT) and 8-way to 16-way set-associative. When an L1 miss occurs, L2 supplies the full 64-byte cache line in roughly 3 nanoseconds."
    },
    {
      level: 3,
      name: "L3 Cache (LLC)",
      fullName: "Level 3 Last-Level Cache (Shared)",
      tech: "High-Density Static RAM (SRAM)",
      capacity: "16 – 96 MB (Up to 768 MB with AMD 3D V-Cache)",
      latency: "35 – 50 Clock Cycles (~10 – 15 ns)",
      bandwidth: "~250 – 400 GB/s",
      proximity: "On CPU die, shared across all processor cores",
      cost: "Moderate-High (occupies up to 30-40% of die area)",
      volatility: "Volatile",
      purpose: "Last on-die defense before accessing slow off-chip DRAM. Maintains cache coherence across multi-core CPUs.",
      details: "L3 cache is shared across all cores via an on-chip ring or mesh interconnect. If Core 0 writes data that Core 4 needs, L3 allows direct inter-core communication via the MESI cache coherence protocol without going to external RAM."
    },
    {
      level: 4,
      name: "Main Memory (RAM)",
      fullName: "Random Access Memory (DDR4 / DDR5 SDRAM)",
      tech: "Dynamic RAM (1-Transistor 1-Capacitor Cells)",
      capacity: "8 GB – 128 GB (Desktop) / up to 4 TB (Servers)",
      latency: "150 – 200 Clock Cycles (~50 – 80 ns)",
      bandwidth: "40 – 90 GB/s (Dual-Channel DDR5)",
      proximity: "Motherboard DIMM slots / On-package LPDDR5",
      cost: "Moderate (~$2 - $4 per GB)",
      volatility: "Volatile (Contents vanish when power cuts)",
      purpose: "Holds active operating system kernel, running applications, documents, and datasets ready for CPU processing.",
      details: "Unlike SRAM (which uses 6 transistors to lock state), DRAM stores bits as microscopic electrical charges inside capacitors. These capacitors leak charge within milliseconds and must be refreshed every 64 ms (Auto-Refresh). This is why RAM is volatile and slower than SRAM, but 50× cheaper per bit!"
    },
    {
      level: 5,
      name: "Persistent Storage (SSD)",
      fullName: "Solid State Drive (NVMe PCIe 4.0/5.0 NAND Flash)",
      tech: "3D NAND Flash Memory (Charge Trap / Floating Gate)",
      capacity: "256 GB – 4 TB (Consumer) / up to 64 TB (Enterprise)",
      latency: "~50 – 100 Microseconds (50,000 – 100,000 ns!)",
      bandwidth: "3.5 – 14 GB/s (Sequential) / ~1 GB/s (Random 4K)",
      proximity: "M.2 slot on PCIe bus / Motherboard U.2",
      cost: "Low (~$0.06 - $0.10 per GB)",
      volatility: "Non-Volatile (Retains data without power for years)",
      purpose: "Permanent storage of the operating system, installed software, games, media files, and virtual memory swap files.",
      details: "Even the fastest PCIe 5.0 SSD is nearly 1,000× slower in random latency than DRAM! SSDs write data in Pages (4-16 KB) and erase data in entire Blocks (2-8 MB). An on-drive SSD controller executes a Flash Translation Layer (FTL) to manage wear leveling and garbage collection."
    }
  ];

  // =========================================================================
  // DOM Initialization
  // =========================================================================
  function init() {
    initHeroCards();
    initHierarchyStack();
    initRamSimulator();
    initBootSimulator();
    initCacheSimulator();
    initSsdSimulator();
    initQuiz();
    initScenario();
    initAdvancedAccordions();
  }

  // =========================================================================
  // 1. Hero Section Cards
  // =========================================================================
  function initHeroCards() {
    const cards = document.querySelectorAll('.mem-hero-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
        state.activeHeroCard = card.dataset.type;
      });
    });
  }

  // =========================================================================
  // 2. Interactive Memory Hierarchy Stack
  // =========================================================================
  function initHierarchyStack() {
    const stackContainer = document.getElementById('hierarchyStack');
    if (!stackContainer) return;

    stackContainer.innerHTML = '';
    HIERARCHY_DATA.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'hierarchy-level-btn' + (item.level === state.activeHierarchyLevel ? ' is-active' : '');
      btn.dataset.level = item.level;
      btn.innerHTML = `
        <div class="level-indicator">
          <span class="level-badge-num">L${item.level}</span>
          <div>
            <div class="level-name">${item.name}</div>
            <div class="level-tech">${item.tech}</div>
          </div>
        </div>
        <div class="level-latency">${item.latency}</div>
      `;
      btn.addEventListener('click', () => {
        selectHierarchyLevel(item.level);
      });
      stackContainer.appendChild(btn);
    });

    renderHierarchyDetail(state.activeHierarchyLevel);
  }

  function selectHierarchyLevel(level) {
    state.activeHierarchyLevel = level;
    document.querySelectorAll('.hierarchy-level-btn').forEach(btn => {
      btn.classList.toggle('is-active', parseInt(btn.dataset.level, 10) === level);
    });
    renderHierarchyDetail(level);
  }

  function renderHierarchyDetail(level) {
    const data = HIERARCHY_DATA.find(d => d.level === level) || HIERARCHY_DATA[1];
    const container = document.getElementById('hierarchyDetail');
    if (!container) return;

    const isVolatile = data.volatility.toLowerCase().includes('volatile') && !data.volatility.toLowerCase().includes('non-volatile');

    container.innerHTML = `
      <div class="detail-head">
        <div>
          <h3 class="detail-title">${data.name}</h3>
          <div style="font-size:0.84rem; color:var(--mem-text-muted); margin-top:0.2rem;">${data.fullName}</div>
        </div>
        <span class="detail-type-tag ${isVolatile ? 'tag-volatile' : 'tag-nonvolatile'}">
          ${isVolatile ? '⚡ Volatile' : '🔒 Non-Volatile'}
        </span>
      </div>

      <div class="detail-grid">
        <div class="detail-stat">
          <div class="stat-label">Access Latency</div>
          <div class="stat-val" style="color:var(--mem-amber);">${data.latency}</div>
        </div>
        <div class="detail-stat">
          <div class="stat-label">Typical Capacity</div>
          <div class="stat-val" style="color:var(--mem-cyan);">${data.capacity}</div>
        </div>
        <div class="detail-stat">
          <div class="stat-label">Physical Proximity</div>
          <div class="stat-val">${data.proximity}</div>
        </div>
        <div class="detail-stat">
          <div class="stat-label">Cost per Bit</div>
          <div class="stat-val">${data.cost}</div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.03); border:1px solid var(--mem-border); border-radius:8px; padding:1rem; margin-bottom:1rem;">
        <strong style="color:var(--mem-cyan); font-size:0.88rem; display:block; margin-bottom:0.25rem;">Primary Role:</strong>
        <p style="margin:0; font-size:0.9rem; color:var(--mem-text);">${data.purpose}</p>
      </div>

      <div class="detail-notes">
        <strong style="color:var(--mem-purple); font-size:0.88rem; display:block; margin-bottom:0.25rem;">Silicon Microarchitecture:</strong>
        ${data.details}
      </div>
    `;
  }

  // =========================================================================
  // 3. RAM Explained – Application Launch & Block Allocator
  // =========================================================================
  function initRamSimulator() {
    // Application Launch Simulator
    const btnLaunch = document.getElementById('btnLaunchApp');
    const stageLog = document.getElementById('stageStatusLog');
    const nodeSsd = document.getElementById('nodeSsd');
    const nodeRam = document.getElementById('nodeRam');
    const nodeCpu = document.getElementById('nodeCpu');
    const nodeApp = document.getElementById('nodeApp');

    if (btnLaunch) {
      btnLaunch.addEventListener('click', () => {
        if (btnLaunch.disabled) return;
        btnLaunch.disabled = true;
        btnLaunch.textContent = '⏳ Loading Application...';

        const nodes = [nodeSsd, nodeRam, nodeCpu, nodeApp];
        nodes.forEach(n => n && n.classList.remove('is-active'));

        // Step 1: SSD Read
        stageLog.textContent = "[Step 1/4] OS requests executable files from SSD (Permanent Storage).\nReading 140 MB binary, assets, and dynamic libraries...";
        if (nodeSsd) nodeSsd.classList.add('is-active');

        setTimeout(() => {
          // Step 2: RAM Allocation
          if (nodeSsd) nodeSsd.classList.remove('is-active');
          if (nodeRam) nodeRam.classList.add('is-active');
          stageLog.textContent = "[Step 2/4] DMA Controller transfers executable pages into RAM.\nRAM allocates 4 free memory blocks for program heap & stack.";
          allocateRamBlocks(4, 'App');

          setTimeout(() => {
            // Step 3: CPU Execution
            if (nodeRam) nodeRam.classList.remove('is-active');
            if (nodeCpu) nodeCpu.classList.add('is-active');
            stageLog.textContent = "[Step 3/4] CPU fetches instructions into L3/L2/L1 cache.\nInstruction decoder executes program entry point (main)...";

            setTimeout(() => {
              // Step 4: Running
              if (nodeCpu) nodeCpu.classList.remove('is-active');
              if (nodeApp) nodeApp.classList.add('is-active');
              stageLog.textContent = "[Step 4/4] ✅ Application is actively RUNNING in RAM!\nCPU continues accessing data through high-speed cache & RAM.";
              btnLaunch.disabled = false;
              btnLaunch.textContent = '🚀 Launch Application Again';
            }, 1200);
          }, 1200);
        }, 1200);
      });
    }

    // RAM Block Grid Render
    renderRamGrid();

    // RAM Controls
    document.getElementById('btnAddTab')?.addEventListener('click', () => allocateRamBlocks(2, 'Tab'));
    document.getElementById('btnAddEditor')?.addEventListener('click', () => allocateRamBlocks(6, 'Video'));
    document.getElementById('btnAddService')?.addEventListener('click', () => allocateRamBlocks(1, 'Svc'));
    document.getElementById('btnCloseRandom')?.addEventListener('click', freeRamBlocks);
    document.getElementById('btnClearRam')?.addEventListener('click', resetRamBlocks);
  }

  function renderRamGrid() {
    const container = document.getElementById('ramGridContainer');
    if (!container) return;

    container.innerHTML = '';
    let usedCount = 0;

    state.ramBlocks.forEach((val, idx) => {
      const block = document.createElement('div');
      block.className = 'ram-block';
      if (val === 1) {
        block.classList.add('is-os');
        block.textContent = 'OS';
        usedCount++;
      } else if (val >= 2) {
        block.classList.add('is-filled');
        block.textContent = 'APP';
        usedCount++;
      } else {
        block.textContent = idx;
      }
      container.appendChild(block);
    });

    const usedEl = document.getElementById('ramUsedCount');
    const pctEl = document.getElementById('ramUsedPct');
    const alertEl = document.getElementById('ramPressureAlert');

    if (usedEl) usedEl.textContent = `${usedCount} / 32 Blocks (${usedCount * 512} MB)`;
    const pct = Math.round((usedCount / 32) * 100);
    if (pctEl) pctEl.textContent = `${pct}%`;

    if (alertEl) {
      if (pct >= 90) {
        alertEl.style.display = 'block';
        alertEl.textContent = '⚠️ Memory Pressure Critical (90%+)! System thrashing virtual swap files onto SSD.';
      } else {
        alertEl.style.display = 'none';
      }
    }
  }

  function allocateRamBlocks(count, type) {
    let allocated = 0;
    for (let i = 0; i < state.ramBlocks.length; i++) {
      if (state.ramBlocks[i] === 0) {
        state.ramBlocks[i] = 2; // App memory
        allocated++;
        if (allocated === count) break;
      }
    }
    renderRamGrid();
  }

  function freeRamBlocks() {
    // Find last app block and free 3 blocks
    let freed = 0;
    for (let i = state.ramBlocks.length - 1; i >= 0; i--) {
      if (state.ramBlocks[i] >= 2) {
        state.ramBlocks[i] = 0;
        freed++;
        if (freed === 3) break;
      }
    }
    renderRamGrid();
  }

  function resetRamBlocks() {
    for (let i = 6; i < state.ramBlocks.length; i++) {
      state.ramBlocks[i] = 0;
    }
    renderRamGrid();
  }

  // =========================================================================
  // 4. ROM & Firmware Boot / Power Simulator
  // =========================================================================
  function initBootSimulator() {
    const powerBtn = document.getElementById('powerToggleBtn');
    const chipRom = document.getElementById('chipRom');
    const chipRam = document.getElementById('chipRam');
    const chipCpu = document.getElementById('chipCpu');
    const bootSteps = document.querySelectorAll('.boot-step-item');

    if (powerBtn) {
      powerBtn.addEventListener('click', () => {
        state.powerOn = !state.powerOn;
        powerBtn.classList.toggle('is-on', state.powerOn);
        powerBtn.innerHTML = state.powerOn ? '<span>🟢 Power: ON</span>' : '<span>🔴 Power: OFF</span>';

        const statusEl = document.getElementById('bootStatusMsg');

        if (!state.powerOn) {
          // POWER CUT
          if (chipRam) {
            chipRam.style.background = '#2a0808';
            chipRam.style.borderColor = '#ef4444';
          }
          if (chipCpu) chipCpu.classList.remove('is-active');
          if (chipRom) chipRom.classList.remove('is-active');

          bootSteps.forEach(s => {
            s.classList.remove('is-current', 'is-done');
          });

          // RAM is instantly wiped!
          resetRamBlocks();
          for (let i = 0; i < 6; i++) state.ramBlocks[i] = 0; // Even OS vanishes!
          renderRamGrid();

          if (statusEl) {
            statusEl.innerHTML = '<strong style="color:#ef4444;">POWER REMOVED:</strong> RAM capacitors lose charge in milliseconds — ALL active working memory wiped to 0!<br><strong style="color:#10b981;">ROM / Flash:</strong> Retains UEFI/BIOS code permanently via non-volatile floating-gate transistors!';
          }
        } else {
          // POWER RESTORED -> RUN BOOT SEQUENCE
          if (chipRam) {
            chipRam.style.background = '';
            chipRam.style.borderColor = '';
          }
          runBootSequence(bootSteps, chipCpu, chipRom, chipRam, statusEl);
        }
      });
    }

    // Run initial boot once
    const statusEl = document.getElementById('bootStatusMsg');
    runBootSequence(bootSteps, chipCpu, chipRom, chipRam, statusEl);
  }

  function runBootSequence(steps, cpu, rom, ram, statusEl) {
    if (!steps || steps.length === 0) return;

    let curStep = 0;
    steps.forEach(s => s.classList.remove('is-current', 'is-done'));

    function nextStep() {
      if (!state.powerOn) return;
      if (curStep > 0) {
        steps[curStep - 1].classList.remove('is-current');
        steps[curStep - 1].classList.add('is-done');
      }

      if (curStep < steps.length) {
        steps[curStep].classList.add('is-current');

        if (curStep === 0) {
          // Power Good
          if (statusEl) statusEl.textContent = "1. PSU signals Power Good. CPU reset pin de-asserted.";
        } else if (curStep === 1) {
          // Reset Vector
          if (cpu) cpu.classList.add('is-active');
          if (statusEl) statusEl.textContent = "2. CPU program counter jumps to fixed hardware reset vector (0xFFFFFFF0).";
        } else if (curStep === 2) {
          // ROM SPI Flash
          if (rom) rom.classList.add('is-active');
          if (statusEl) statusEl.textContent = "3. UEFI/BIOS firmware executes from SPI NOR Flash ROM chip.";
        } else if (curStep === 3) {
          // POST
          if (statusEl) statusEl.textContent = "4. Power-On Self-Test (POST) detects DRAM DIMMs and PCIe devices.";
        } else if (curStep === 4) {
          // OS loaded into RAM
          if (ram) ram.classList.add('is-active');
          for (let i = 0; i < 6; i++) state.ramBlocks[i] = 1;
          renderRamGrid();
          if (statusEl) statusEl.textContent = "5. Bootloader reads OS kernel from SSD into RAM. Desktop loaded!";
        }

        curStep++;
        setTimeout(nextStep, 900);
      } else {
        if (cpu) cpu.classList.remove('is-active');
        if (rom) rom.classList.remove('is-active');
        if (ram) ram.classList.remove('is-active');
      }
    }

    nextStep();
  }

  // =========================================================================
  // 5. Cache Simulator (Hit vs Miss & Latency)
  // =========================================================================
  function initCacheSimulator() {
    const btnWithCache = document.getElementById('btnRunCache');
    const btnWithoutCache = document.getElementById('btnRunNoCache');
    const btnRepeatAccess = document.getElementById('btnRepeatAccess');
    const cacheLog = document.getElementById('cacheSimLog');
    const latencyEl = document.getElementById('cacheLatencyVal');
    const resultBadge = document.getElementById('cacheResultBadge');

    const tierL1 = document.getElementById('tierL1');
    const tierL2 = document.getElementById('tierL2');
    const tierL3 = document.getElementById('tierL3');
    const tierRam = document.getElementById('tierRam');
    const tiers = [tierL1, tierL2, tierL3, tierRam];

    function clearTierHighlights() {
      tiers.forEach(t => t && t.classList.remove('is-hit', 'is-miss'));
    }

    // Mode 1: First Access With Cache (Miss -> Miss -> Miss -> RAM Fetch)
    if (btnWithCache) {
      btnWithCache.addEventListener('click', () => {
        clearTierHighlights();
        state.cacheSim.cached = false;
        if (cacheLog) cacheLog.textContent = `[CPU Request] Read address 0x1040 (Variable: 'player_score')...\nChecking L1 Cache...`;

        setTimeout(() => {
          if (tierL1) tierL1.classList.add('is-miss');
          if (cacheLog) cacheLog.textContent += `\n❌ L1 Cache MISS (Elapsed: 1 ns). Querying L2 Cache...`;

          setTimeout(() => {
            if (tierL2) tierL2.classList.add('is-miss');
            if (cacheLog) cacheLog.textContent += `\n❌ L2 Cache MISS (Elapsed: 4 ns). Querying L3 Cache...`;

            setTimeout(() => {
              if (tierL3) tierL3.classList.add('is-miss');
              if (cacheLog) cacheLog.textContent += `\n❌ L3 Cache MISS (Elapsed: 15 ns). Accessing off-die DRAM...`;

              setTimeout(() => {
                if (tierRam) tierRam.classList.add('is-hit');
                if (latencyEl) latencyEl.textContent = '75 ns (~190 cycles)';
                if (resultBadge) {
                  resultBadge.textContent = 'RAM Hit / Cache Miss';
                  resultBadge.style.color = 'var(--mem-amber)';
                }
                if (cacheLog) {
                  cacheLog.textContent += `\n✅ RAM RETRIEVAL COMPLETE (Total: 75 ns)!\nData and 64-byte adjacent line loaded into L3, L2, and L1 cache!`;
                }
                state.cacheSim.cached = true;
                if (btnRepeatAccess) btnRepeatAccess.disabled = false;
              }, 1000);
            }, 800);
          }, 800);
        }, 800);
      });
    }

    // Mode 2: Repeat Access (Instant L1 Hit!)
    if (btnRepeatAccess) {
      btnRepeatAccess.addEventListener('click', () => {
        clearTierHighlights();
        if (cacheLog) cacheLog.textContent = `[CPU Request] Repeat read for address 0x1040 (or adjacent 0x1044)...\nQuerying L1 Cache...`;

        setTimeout(() => {
          if (tierL1) tierL1.classList.add('is-hit');
          if (latencyEl) latencyEl.textContent = '1.0 ns (4 cycles)';
          if (resultBadge) {
            resultBadge.textContent = '⚡ L1 CACHE HIT!';
            resultBadge.style.color = 'var(--mem-green)';
          }
          if (cacheLog) {
            cacheLog.textContent += `\n⚡ INSTANT L1 CACHE HIT!\nLatency: 1.0 ns (75× faster than RAM access)! Temporal Locality achieved.`;
          }
        }, 500);
      });
    }

    // Mode 3: Without Cache (Direct to RAM every single time)
    if (btnWithoutCache) {
      btnWithoutCache.addEventListener('click', () => {
        clearTierHighlights();
        if (cacheLog) cacheLog.textContent = `[SIMULATION: NO CACHE]\nCPU issues memory read. Must bypass all SRAM caches...`;

        setTimeout(() => {
          if (tierRam) tierRam.classList.add('is-hit');
          if (latencyEl) latencyEl.textContent = '65 ns (~160 cycles)';
          if (resultBadge) {
            resultBadge.textContent = 'Uncached RAM Fetch';
            resultBadge.style.color = 'var(--mem-red)';
          }
          if (cacheLog) {
            cacheLog.textContent += `\n⚠️ DIRECT RAM FETCH: 65 ns latency.\nWithout cache, the CPU stalls for ~160 clock cycles on EVERY single read!`;
          }
        }, 800);
      });
    }
  }

  // =========================================================================
  // 6. SSD NAND Flash Simulator
  // =========================================================================
  function initSsdSimulator() {
    const btnSave = document.getElementById('btnSaveFile');
    const btnGc = document.getElementById('btnTriggerGc');
    const ssdLog = document.getElementById('ssdActionLog');
    const pages = document.querySelectorAll('.ssd-page-cell');

    let nextPageIndex = 3;

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        if (nextPageIndex >= pages.length) {
          if (ssdLog) ssdLog.textContent = "Flash Block is full! Click 'Run Garbage Collection' to erase stale blocks.";
          return;
        }

        if (ssdLog) {
          ssdLog.textContent = `[OS File Save] Writing 16 KB file 'design.sv'...\nSSD Controller receives NVMe write command. Translating LBA to PPA...`;
        }

        setTimeout(() => {
          if (pages[nextPageIndex]) {
            pages[nextPageIndex].classList.add('is-written');
            if (ssdLog) {
              ssdLog.textContent += `\n✅ Page ${nextPageIndex} written successfully via high-voltage electron tunneling!\nPage state: VALID. Written without moving mechanical heads!`;
            }
            nextPageIndex++;
          }
        }, 600);
      });
    }

    if (btnGc) {
      btnGc.addEventListener('click', () => {
        if (ssdLog) {
          ssdLog.textContent = `[SSD Garbage Collection] Identifying stale blocks...\nValid pages copied to clean block. Block erased with high erase voltage.\nReady for fresh writes!`;
        }
        pages.forEach((p, idx) => {
          if (idx >= 3) p.classList.remove('is-written');
        });
        nextPageIndex = 3;
      });
    }
  }

  // =========================================================================
  // 7. Interactive Knowledge Quiz (10 Questions)
  // =========================================================================
  const QUIZ_QUESTIONS = [
    {
      q: "1. Which type of memory loses all stored information immediately when power is removed?",
      options: ["ROM / Firmware", "NAND Flash SSD", "RAM (Random Access Memory)", "Magnetic Tape"],
      answer: 2,
      explain: "RAM is volatile memory. Main memory (DRAM) uses tiny capacitors that leak charge and require continuous electrical refresh to preserve data."
    },
    {
      q: "2. Which semiconductor memory is physically closest to the CPU execution units?",
      options: ["L3 Cache", "CPU Registers", "RAM", "L2 Cache"],
      answer: 1,
      explain: "CPU Registers are located directly inside the ALU/execution pipeline, offering sub-nanosecond (0.5 - 1 clock cycle) access."
    },
    {
      q: "3. Where does the operating system reside when a desktop computer is powered completely OFF?",
      options: ["RAM", "CPU Registers", "SSD / Persistent Storage", "L1 Cache"],
      answer: 2,
      explain: "When powered off, volatile caches and RAM are wiped. The OS kernel, user files, and programs persist safely on the non-volatile SSD or HDD."
    },
    {
      q: "4. What sequence occurs when the CPU experiences an L1, L2, and L3 cache miss?",
      options: [
        "The computer restarts immediately",
        "Data is retrieved from off-chip RAM and loaded into cache",
        "The CPU writes directly to the SSD",
        "The instruction is permanently dropped"
      ],
      answer: 1,
      explain: "On a cache miss across all on-die levels, the memory controller fetches a 64-byte cache line from DRAM, placing copies in L3, L2, and L1 for future access."
    },
    {
      q: "5. What underlying semiconductor circuit technology is typically used to implement CPU caches?",
      options: [
        "Static RAM (SRAM, typically 6-transistor bistable latches)",
        "Dynamic RAM (1-transistor 1-capacitor cells)",
        "NAND Flash floating-gate transistors",
        "Optical disc pits"
      ],
      answer: 0,
      explain: "Caches are built with Static RAM (SRAM), which uses cross-coupled inverters (6T cells). SRAM needs no refresh cycles and achieves nanosecond speeds, but consumes more die area than DRAM."
    },
    {
      q: "6. Is modern PC motherboard firmware (UEFI/BIOS) stored in traditional read-only mask ROM?",
      options: [
        "Yes, it can never be altered under any circumstances",
        "No, it is stored in rewritable SPI NOR Flash memory to allow firmware updates",
        "No, it is generated fresh by the CPU on every boot",
        "Yes, firmware is stored in the CPU registers"
      ],
      answer: 1,
      explain: "Historically, computers used mask ROM. Modern motherboards use rewritable non-volatile SPI Flash EEPROMs so manufacturers can deploy UEFI firmware and security updates."
    },
    {
      q: "7. Why can a solid-state drive (SSD) not overwrite a single byte in place like RAM?",
      options: [
        "SSDs have no controllers",
        "NAND flash can write in pages (4-16 KB) but can only erase entire blocks (2-8 MB)",
        "SSDs are optical devices",
        "PCIe buses do not support byte addressing"
      ],
      answer: 1,
      explain: "NAND flash cells can only transition from 1 to 0 during writes. Resetting them back to 1 requires a high-voltage bulk erase across an entire block (Block Erase)."
    },
    {
      q: "8. What is the primary operational difference between L1 cache and L3 cache?",
      options: [
        "L1 is non-volatile; L3 is volatile",
        "L1 is small, private to each core, and ultra-fast; L3 is large, shared across all cores, with higher latency",
        "L1 is on the SSD; L3 is on the motherboard",
        "L1 uses DRAM; L3 uses NAND Flash"
      ],
      answer: 1,
      explain: "L1 cache is dedicated to each individual core (~32-64 KB, 1 ns latency), whereas L3 is a shared Last-Level Cache (~16-96 MB, 10-15 ns) maintaining coherence across all cores."
    },
    {
      q: "9. Which principle explains why fetching an array element makes subsequent adjacent array accesses much faster?",
      options: ["Temporal Locality", "Spatial Locality", "Virtual Paging", "Branch Prediction"],
      answer: 1,
      explain: "Spatial Locality states that if a memory location is accessed, nearby memory locations are likely to be accessed soon. Memory is always transferred in full 64-byte cache lines."
    },
    {
      q: "10. Why do computers not build all 64 GB of system memory out of ultra-fast SRAM instead of DRAM?",
      options: [
        "SRAM cannot store binary data",
        "SRAM requires 6 transistors per bit, making 64 GB exorbitantly expensive and too physically massive to fit on a chip",
        "SRAM is slower than DRAM",
        "SRAM emits magnetic radiation"
      ],
      answer: 1,
      explain: "A 6-transistor SRAM cell takes up ~10-20× more silicon area than a 1-transistor 1-capacitor DRAM cell. 64 GB of SRAM would require a wafer larger than an entire dinner plate and cost thousands of dollars!"
    }
  ];

  function initQuiz() {
    const quizContainer = document.getElementById('quizQuestionsContainer');
    if (!quizContainer) return;

    quizContainer.innerHTML = '';
    QUIZ_QUESTIONS.forEach((qItem, qIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      card.id = `quizCard_${qIdx}`;

      let optionsHtml = '';
      qItem.options.forEach((opt, optIdx) => {
        optionsHtml += `<button class="quiz-opt-btn" data-qid="${qIdx}" data-oid="${optIdx}">${opt}</button>`;
      });

      card.innerHTML = `
        <div class="quiz-q-text">${qItem.q}</div>
        <div class="quiz-options-list">${optionsHtml}</div>
        <div class="quiz-explanation" id="quizExp_${qIdx}">
          <strong>Explanation:</strong> ${qItem.explain}
        </div>
      `;

      quizContainer.appendChild(card);
    });

    // Option clicks
    quizContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-opt-btn');
      if (!btn || btn.disabled) return;

      const qId = parseInt(btn.dataset.qid, 10);
      const oId = parseInt(btn.dataset.oid, 10);
      const qItem = QUIZ_QUESTIONS[qId];

      const parentList = btn.closest('.quiz-options-list');
      const allBtns = parentList.querySelectorAll('.quiz-opt-btn');
      allBtns.forEach(b => b.disabled = true);

      const expEl = document.getElementById(`quizExp_${qId}`);
      if (expEl) expEl.style.display = 'block';

      if (oId === qItem.answer) {
        btn.classList.add('is-correct');
        state.quiz.score++;
      } else {
        btn.classList.add('is-wrong');
        allBtns[qItem.answer].classList.add('is-correct');
      }

      state.quiz.answered++;
      updateQuizScore();
    });

    document.getElementById('btnRetryQuiz')?.addEventListener('click', resetQuiz);
  }

  function updateQuizScore() {
    const badge = document.getElementById('quizScoreBadge');
    if (badge) {
      badge.textContent = `Score: ${state.quiz.score} / ${QUIZ_QUESTIONS.length}`;
    }
  }

  function resetQuiz() {
    state.quiz.score = 0;
    state.quiz.answered = 0;
    initQuiz();
    updateQuizScore();
  }

  // =========================================================================
  // 8. Real-World Laptop Scenario
  // =========================================================================
  const SCENARIOS = [
    {
      q: "Scenario 1: Where does Windows 11 stay when your laptop is in your backpack, turned off?",
      options: [
        { text: "SSD (Solid State Drive)", correct: true, exp: "Correct! The SSD is non-volatile. Operating system files stay stored on flash memory without any battery drain." },
        { text: "RAM (Main Memory)", correct: false, exp: "Incorrect. RAM loses all its contents the instant the laptop is powered off." },
        { text: "L3 Cache", correct: false, exp: "Incorrect. CPU caches are volatile SRAM and lose data when power drops." }
      ]
    },
    {
      q: "Scenario 2: When you open Premiere Pro and import a 4K video, where are the active frames held for real-time scrubbing?",
      options: [
        { text: "RAM (Working Memory)", correct: true, exp: "Correct! Working data and active video frames are decompressed directly into RAM so the CPU and GPU can read them at ~50-80 GB/s." },
        { text: "SSD", correct: false, exp: "Incorrect. Scrubbing uncompressed 4K video directly from an SSD causes stuttering due to SSD read latency." },
        { text: "Motherboard ROM", correct: false, exp: "Incorrect. ROM holds BIOS firmware (MBs), not user video frames!" }
      ]
    },
    {
      q: "Scenario 3: If your battery suddenly dies with zero warning, what happens to your unsaved Photoshop edits?",
      options: [
        { text: "They vanish forever because RAM is volatile", correct: true, exp: "Correct! Unsaved edits exist only as electrical charge in RAM capacitors. Without power, the charges dissipate in milliseconds." },
        { text: "They are automatically saved to the L1 Cache", correct: false, exp: "Incorrect. Caches are also volatile SRAM and lose power simultaneously." },
        { text: "The CPU writes them to the SSD after power dies", correct: false, exp: "Incorrect. The CPU cannot execute instructions without power!" }
      ]
    }
  ];

  function initScenario() {
    const container = document.getElementById('scenarioContainer');
    if (!container) return;

    container.innerHTML = '';
    SCENARIOS.forEach((sc, idx) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';

      let optsHtml = '';
      sc.options.forEach((opt, oIdx) => {
        optsHtml += `<button class="quiz-opt-btn sc-opt-btn" data-scid="${idx}" data-oid="${oIdx}">${opt.text}</button>`;
      });

      card.innerHTML = `
        <div class="quiz-q-text">${sc.q}</div>
        <div class="quiz-options-list">${optsHtml}</div>
        <div class="quiz-explanation" id="scExp_${idx}"></div>
      `;

      container.appendChild(card);
    });

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.sc-opt-btn');
      if (!btn || btn.disabled) return;

      const scId = parseInt(btn.dataset.scid, 10);
      const oId = parseInt(btn.dataset.oid, 10);
      const opt = SCENARIOS[scId].options[oId];

      const parent = btn.closest('.quiz-options-list');
      parent.querySelectorAll('.sc-opt-btn').forEach(b => b.disabled = true);

      const expEl = document.getElementById(`scExp_${scId}`);
      if (expEl) {
        expEl.style.display = 'block';
        expEl.innerHTML = `<strong>${opt.correct ? '✅ ' : '❌ '}</strong> ${opt.exp}`;
      }

      if (opt.correct) {
        btn.classList.add('is-correct');
      } else {
        btn.classList.add('is-wrong');
      }
    });
  }

  // =========================================================================
  // 9. Advanced Learning Accordions
  // =========================================================================
  function initAdvancedAccordions() {
    document.querySelectorAll('.adv-card-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.adv-card');
        card.classList.toggle('is-open');
      });
    });
  }

  // Auto-boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
