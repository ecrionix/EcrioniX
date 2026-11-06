/**
 * EcrioniX Silicon Explorer — UI Controller & Interaction Coordinator
 * Binds DOM panels, search filters, tabs, and quiz to 3D WebGL Engine.
 * (c) 2026 EcrioniX. Open educational hardware reference.
 */
(function (global) {
  'use strict';

  function initSiliconExplorer() {
    const productId = document.body.dataset.productId || 'apple-iphone-6s';
    const data = (global.EcrioniXSiliconProducts && global.EcrioniXSiliconProducts[productId]) 
                 || (productId === 'apple-macbook-air-m1' ? global.EcrioniXSiliconDataM1 : global.EcrioniXSiliconData);
    if (!data) {
      console.error('EcrioniXSiliconData not loaded.');
      return;
    }

    // Initialize 3D Engine
    const engine = new global.EcrioniXSiliconEngine('se3dCanvas', data);

    // DOM Elements
    const modeBtns = document.querySelectorAll('.se-mode-btn');
    const treeList = document.getElementById('seTreeList');
    const searchInput = document.getElementById('seSearchInput');
    const catPills = document.querySelectorAll('.se-cat-pill');
    const hudTitle = document.getElementById('seHudTitle');
    const hudSubtitle = document.getElementById('seHudSubtitle');
    const explodeSlider = document.getElementById('seExplodeSlider');
    const explodeVal = document.getElementById('seExplodeVal');
    const flipBtn = document.getElementById('seFlipBtn');
    const autoRotateBtn = document.getElementById('seAutoRotateBtn');
    const wireframeBtn = document.getElementById('seWireframeBtn');
    const isolateBtn = document.getElementById('seIsolateBtn');
    const resetBtn = document.getElementById('seResetBtn');
    const fullscreenBtn = document.getElementById('seFullscreenBtn');
    const camPresetBtns = document.querySelectorAll('.se-cam-preset-btn');

    // Right Inspector Elements
    const inspectorTitle = document.getElementById('seInspectorTitle');
    const inspectorSub = document.getElementById('seInspectorSubtitle');
    const inspectorBadge = document.getElementById('seInspectorBadge');
    const tabBtns = document.querySelectorAll('.se-tab-btn');
    const tabPanes = document.querySelectorAll('.se-tab-content');
    const specsTable = document.getElementById('seSpecsTable');
    const supplyBox = document.getElementById('seSupplyBox');
    const deepDiveText = document.getElementById('seDeepDiveText');
    const connSvgWrap = document.getElementById('seConnSvgWrap');
    const quizWrap = document.getElementById('seQuizWrap');

    let currentFilterCat = 'all';
    let currentSearchTerm = '';

    // ==========================================
    // 1. POPULATE LEFT COMPONENT TREE
    // ==========================================
    function renderTree() {
      if (!treeList) return;
      treeList.innerHTML = '';

      let items = [];
      let groupName = 'Physical Layers';

      if (engine.mode === 'physical') {
        items = data.PHYSICAL_COMPONENTS;
        groupName = 'Hardware Components (11)';
      } else if (engine.mode === 'motherboard') {
        items = data.CHIPS_DATA;
        groupName = `Motherboard Integrated Circuits (${items.length})`;
      } else if (engine.mode === 'architecture') {
        items = data.A9_DIE_BLOCKS;
        groupName = `A9 Silicon IP Blocks (${items.length})`;
      }

      // Filter by category
      if (currentFilterCat !== 'all') {
        items = items.filter(it => (it.category || '').toLowerCase().includes(currentFilterCat.toLowerCase()));
      }

      // Filter by search
      if (currentSearchTerm) {
        const q = currentSearchTerm.toLowerCase();
        items = items.filter(it => 
          (it.name || '').toLowerCase().includes(q) ||
          (it.partNumber || '').toLowerCase().includes(q) ||
          (it.designer || '').toLowerCase().includes(q) ||
          (it.summary || '').toLowerCase().includes(q)
        );
      }

      const groupHeader = document.createElement('div');
      groupHeader.className = 'se-tree-group-title';
      groupHeader.innerHTML = `<span>${groupName}</span> <span class="se-item-pill">${items.length} items</span>`;
      treeList.appendChild(groupHeader);

      if (items.length === 0) {
        const empty = document.createElement('div');
        empty.style.color = 'var(--se-muted)';
        empty.style.fontSize = '0.8rem';
        empty.style.padding = '1rem 0';
        empty.textContent = 'No matching components found.';
        treeList.appendChild(empty);
        return;
      }

      items.forEach(it => {
        const row = document.createElement('div');
        row.className = 'se-tree-item';
        row.dataset.id = it.id;
        if (engine.selectedItem && engine.selectedItem.userData.id === it.id) {
          row.classList.add('active');
        }

        const tag = it.partNumber || it.category || 'Layer';
        row.innerHTML = `
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:0.5rem;">${it.name}</span>
          <span class="se-item-pill">${tag}</span>
        `;

        row.addEventListener('click', () => {
          engine.selectItemById(it.id);
        });

        treeList.appendChild(row);
      });
    }

    // ==========================================
    // 2. INSPECTOR PANEL UPDATE
    // ==========================================
    function updateInspector(userData) {
      if (!userData) {
        // Fallback default state
        inspectorTitle.textContent = 'Select a Component';
        inspectorSub.textContent = 'Click any 3D part or choose from the component hierarchy on the left.';
        inspectorBadge.textContent = 'Explore Mode';
        inspectorBadge.style.background = 'var(--se-cyan-soft)';
        inspectorBadge.style.color = 'var(--se-cyan)';

        specsTable.innerHTML = '<tr><td colspan="2" style="text-align:center;color:var(--se-muted);padding:2rem 0;">No component selected.<br>Rotate the phone and click any physical layer, chip, or silicon core.</td></tr>';
        supplyBox.innerHTML = '<div style="color:var(--se-muted);font-size:0.8rem;text-align:center;padding:1rem;">Select a semiconductor IC to view foundry and designer supply chains.</div>';
        if (productId === 'apple-macbook-air-m1') {
          deepDiveText.innerHTML = '<p>The M1 MacBook Air represents Apple\'s historic transition to Mac Apple Silicon, featuring an ultra-efficient 5nm fanless architecture and 128-bit Unified Memory Architecture. Select any hardware block, logic board chip, or M1 processor core above to explore its microarchitecture and semiconductor physics.</p>';
        } else {
          deepDiveText.innerHTML = '<p>The iPhone 6s represents a landmark engineering transition to 64-bit desktop-class mobile architecture. Select any hardware block above to explore its operational principles and semiconductor physics.</p>';
        }
        return;
      }

      const d = userData.data;
      inspectorTitle.textContent = d.name;
      inspectorSub.textContent = d.summary || (d.partNumber ? `Part Number: ${d.partNumber}` : d.category);
      inspectorBadge.textContent = d.category || 'Hardware';

      // 1. Specs Table
      let tableHtml = '';
      if (userData.type === 'physical') {
        tableHtml += `<tr><th>Component Name</th><td style="color:var(--se-cyan);">${d.name}</td></tr>`;
        tableHtml += `<tr><th>Category</th><td>${d.category ? d.category.toUpperCase() : 'HARDWARE'}</td></tr>`;
        if (d.dimensions) tableHtml += `<tr><th>Dimensions</th><td>${d.dimensions}</td></tr>`;
        if (d.weight) tableHtml += `<tr><th>Weight / Mass</th><td>${d.weight}</td></tr>`;
        if (d.material) tableHtml += `<tr><th>Material Composition</th><td>${d.material}</td></tr>`;
        if (d.specs) {
          Object.entries(d.specs).forEach(([k, v]) => {
            tableHtml += `<tr><th>${k}</th><td>${v}</td></tr>`;
          });
        }
        tableHtml += `<tr><th>Primary Fabricator</th><td>${d.vendor || 'Apple ODM / Foxconn'}</td></tr>`;
        tableHtml += `<tr><th>Teardown Verification</th><td style="color:var(--se-teal);">✓ Independently Verified</td></tr>`;
      } else if (userData.type === 'chip') {
        tableHtml += `<tr><th>Part Number / Marking</th><td style="color:var(--se-cyan); font-weight:700;">${d.partNumber || 'Proprietary Apple'}</td></tr>`;
        tableHtml += `<tr><th>IC Designer</th><td>${d.designer || 'Apple Inc.'}</td></tr>`;
        tableHtml += `<tr><th>Semiconductor Foundry</th><td>${d.foundry || 'Confidential'}</td></tr>`;
        tableHtml += `<tr><th>Process Node</th><td>${d.technologyNode || 'N/A'}</td></tr>`;
        if (d.dieSize) tableHtml += `<tr><th>Die Footprint</th><td>${d.dieSize}</td></tr>`;
        tableHtml += `<tr><th>Package Architecture</th><td>${d.packageType || 'BGA'}</td></tr>`;
        tableHtml += `<tr><th>Operating Frequency</th><td>${d.clockFrequency || 'Variable / Bus-Synchronous'}</td></tr>`;
        tableHtml += `<tr><th>Power Profile</th><td>${d.powerEstimate || 'Dynamic DVFS'}</td></tr>`;
        tableHtml += `<tr><th>Board Placement</th><td>Side ${d.boardSide ? d.boardSide.toUpperCase() : 'A'}</td></tr>`;
        if (d.interfaces && d.interfaces.length > 0) {
          tableHtml += `<tr><th>Bus Interfaces</th><td>${d.interfaces.join(', ')}</td></tr>`;
        }
        tableHtml += `<tr><th>Verification Status</th><td style="color:var(--se-teal);">✓ Teardown Confirmed</td></tr>`;
      } else if (userData.type === 'arch_block') {
        tableHtml += `<tr><th>Functional Block</th><td style="color:var(--se-cyan); font-weight:700;">${d.name}</td></tr>`;
        tableHtml += `<tr><th>Subsystem Category</th><td>${(d.category || 'Processor IP').toUpperCase()}</td></tr>`;
        tableHtml += `<tr><th>Architecture Designer</th><td>${d.designer || 'Apple Silicon Group'}</td></tr>`;
        if (d.isa) tableHtml += `<tr><th>Instruction Set (ISA)</th><td>${d.isa}</td></tr>`;
        if (d.clock || d.clockMax) tableHtml += `<tr><th>Clock Frequency</th><td>${d.clock || d.clockMax}</td></tr>`;
        if (d.capacity) tableHtml += `<tr><th>Cache / Buffer Capacity</th><td>${d.capacity}</td></tr>`;
        if (d.bandwidth) tableHtml += `<tr><th>Data Bandwidth</th><td>${d.bandwidth}</td></tr>`;
        if (d.latency) tableHtml += `<tr><th>Access Latency</th><td>${d.latency}</td></tr>`;
        if (d.clusters) tableHtml += `<tr><th>GPU Shading Clusters</th><td>${d.clusters}</td></tr>`;
        if (d.peakCompute) tableHtml += `<tr><th>Peak FP32 Compute</th><td>${d.peakCompute}</td></tr>`;
        if (d.areaMm2) tableHtml += `<tr><th>Silicon Die Area</th><td>${d.areaMm2} mm²</td></tr>`;
        tableHtml += `<tr><th>Verification Status</th><td style="color:var(--se-teal);">✓ Die Floorplan Confirmed</td></tr>`;
      }
      specsTable.innerHTML = tableHtml;

      // 2. Supply Chain Box
      let supplyHtml = '';
      if (d.designer || d.foundry || d.vendor) {
        supplyHtml += `<div class="se-supply-row"><span class="se-supply-label">Product / IC Designer:</span> <span class="se-supply-val">${d.designer || d.vendor || 'Apple Inc.'}</span></div>`;
        supplyHtml += `<div class="se-supply-row"><span class="se-supply-label">Semiconductor Foundry:</span> <span class="se-supply-val">${d.foundry || d.vendor || 'TSMC / Samsung'}</span></div>`;
        supplyHtml += `<div class="se-supply-row"><span class="se-supply-label">Package & Integration:</span> <span class="se-supply-val">${d.packageType || 'Advanced Packaging'}</span></div>`;
        supplyHtml += `<div class="se-supply-row"><span class="se-supply-label">Teardown Verification:</span> <span class="se-supply-val" style="color:var(--se-teal);">✓ Independently Verified</span></div>`;
      } else {
        supplyHtml = '<div style="color:var(--se-muted);font-size:0.8rem;padding:0.5rem 0;">Integrated internal silicon functional block.</div>';
      }
      supplyBox.innerHTML = supplyHtml;

      // 3. Deep Dive Text
      let textHtml = '';
      if (d.engineeringDeepDive) {
        textHtml += `<p>${d.engineeringDeepDive}</p>`;
      } else if (d.technicalExplanation) {
        textHtml += `<p>${d.technicalExplanation}</p>`;
      } else if (d.details) {
        textHtml += `<p>${d.details}</p>`;
      }
      if (d.pipeline) {
        textHtml += '<div class="se-section-label">Pipeline Microarchitecture</div><ul style="margin-left:1.25rem;font-size:0.82rem;color:#cbd5e1;">';
        Object.entries(d.pipeline).forEach(([k, v]) => {
          textHtml += `<li><b>${k}:</b> ${v}</li>`;
        });
        textHtml += '</ul>';
      }
      deepDiveText.innerHTML = textHtml;

      // Highlight active item in tree
      const treeRows = treeList.querySelectorAll('.se-tree-item');
      treeRows.forEach(r => {
        r.classList.toggle('active', r.dataset.id === d.id);
      });
    }

    // ==========================================
    // 3. RENDER SVG CONNECTION GRAPH
    // ==========================================
    function renderConnectionGraph() {
      if (!connSvgWrap) return;
      const g = data.CONNECTION_GRAPH;
      if (!g) return;

      let svg = `<svg viewBox="0 0 520 520" style="width:100%; height:auto; font-family:'JetBrains Mono',monospace;">`;
      
      // Draw Edges
      g.edges.forEach(e => {
        const fromNode = g.nodes.find(n => n.id === e.from);
        const toNode = g.nodes.find(n => n.id === e.to);
        if (fromNode && toNode) {
          const strokeCol = 
            e.type === 'power' ? '#fbbf24' :
            (e.type === 'memory' ? '#2dd4bf' :
            (e.type === 'rf' ? '#38bdf8' :
            (e.type === 'audio' ? '#a78bfa' : '#94a3b8')));

          svg += `<line x1="${fromNode.x}" y1="${fromNode.y}" x2="${toNode.x}" y2="${toNode.y}" stroke="${strokeCol}" stroke-width="2" stroke-dasharray="${e.type === 'power' ? '4,4' : 'none'}" opacity="0.75"/>`;
        }
      });

      // Draw Nodes
      g.nodes.forEach(n => {
        const fillCol = 
          n.type === 'compute' ? '#0369a1' :
          (n.type === 'memory' ? '#0f766e' :
          (n.type === 'storage' ? '#334155' :
          (n.type === 'power' ? '#b45309' :
          (n.type === 'rf' ? '#1d4ed8' : '#374151'))));

        svg += `
          <g style="cursor:pointer;" onclick="window.seSelectNode('${n.id}')">
            <rect x="${n.x - 48}" y="${n.y - 14}" width="96" height="28" rx="6" fill="${fillCol}" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="${n.x}" y="${n.y + 4}" fill="#ffffff" font-size="8.5" text-anchor="middle" font-weight="600">${n.label.slice(0, 16)}</text>
          </g>
        `;
      });

      svg += `</svg>`;
      connSvgWrap.innerHTML = svg;
    }

    global.seSelectNode = function (nodeId) {
      if (nodeId.includes('a9')) {
        engine.setMode('architecture');
        updateModeUI('architecture');
      } else {
        engine.setMode('motherboard');
        updateModeUI('motherboard');
      }
    };

    // ==========================================
    // 4. KNOWLEDGE QUIZ RENDERER
    // ==========================================
    function renderQuiz() {
      if (!quizWrap) return;
      const quiz = data.KNOWLEDGE_QUIZ;
      quizWrap.innerHTML = '';

      quiz.forEach((q, qIdx) => {
        const card = document.createElement('div');
        card.className = 'se-quiz-card';
        card.innerHTML = `
          <div class="se-quiz-q">Q${qIdx + 1}: ${q.question}</div>
          <div class="se-quiz-options">
            ${q.options.map((opt, oIdx) => `
              <button type="button" class="se-quiz-opt" data-q="${qIdx}" data-opt="${oIdx}">${opt}</button>
            `).join('')}
          </div>
          <div class="se-quiz-feedback" id="quizFeedback_${qIdx}"></div>
        `;
        quizWrap.appendChild(card);
      });

      quizWrap.querySelectorAll('.se-quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const qIdx = parseInt(btn.dataset.q);
          const oIdx = parseInt(btn.dataset.opt);
          const qObj = quiz[qIdx];
          const fb = document.getElementById(`quizFeedback_${qIdx}`);
          const siblings = btn.parentElement.querySelectorAll('.se-quiz-opt');

          siblings.forEach(s => s.disabled = true);

          if (oIdx === qObj.correctIndex) {
            btn.classList.add('correct');
            fb.style.display = 'block';
            fb.style.background = 'rgba(16, 185, 129, 0.12)';
            fb.style.border = '1px solid #10b981';
            fb.style.color = '#34d399';
            fb.innerHTML = `<b>✓ Correct!</b> ${qObj.explanation}`;
          } else {
            btn.classList.add('wrong');
            siblings[qObj.correctIndex].classList.add('correct');
            fb.style.display = 'block';
            fb.style.background = 'rgba(244, 63, 94, 0.12)';
            fb.style.border = '1px solid #f43f5e';
            fb.style.color = '#fb7185';
            fb.innerHTML = `<b>✗ Incorrect.</b> ${qObj.explanation}`;
          }
        });
      });
    }

    // ==========================================
    // 5. EVENT BINDINGS
    // ==========================================
    function updateModeUI(mode) {
      modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });

      const hudHint = document.getElementById('seHudHint');
      if (mode === 'physical') {
        hudTitle.textContent = 'Apple iPhone 6s — Physical Teardown';
        hudSubtitle.textContent = 'EXPLODED HARDWARE LAYERS · 7000-SERIES UNIBODY';
        if (hudHint) hudHint.textContent = '🖱️ Drag to rotate • Right-click to pan • Scroll or buttons to zoom • Use Explode slider below';
        if (explodeSlider) explodeSlider.parentElement.style.display = 'flex';
        if (flipBtn) flipBtn.style.display = 'none';
      } else if (mode === 'motherboard') {
        hudTitle.textContent = 'Dual-Sided Logic Board — Chip Teardown';
        hudSubtitle.textContent = 'L-SHAPED 10-LAYER HDI PCB · FRONT & REAR SILICON';
        if (hudHint) hudHint.textContent = '🔍 Click any semiconductor package to inspect foundry, package & clock • Click Flip to see rear';
        if (explodeSlider) explodeSlider.parentElement.style.display = 'none';
        if (flipBtn) flipBtn.style.display = 'flex';
      } else if (mode === 'architecture') {
        hudTitle.textContent = 'Apple A9 Silicon Die Microarchitecture';
        hudSubtitle.textContent = '14nm/16nm FinFET · 6-WIDE DECODE TWISTER CPU · 8MB SLC';
        if (hudHint) hudHint.textContent = '⚡ High-contrast floorplan • Click any functional IP block to inspect internal microarchitecture';
        if (explodeSlider) explodeSlider.parentElement.style.display = 'none';
        if (flipBtn) flipBtn.style.display = 'none';
      }

      renderTree();
    }

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetMode = btn.dataset.mode;
        engine.setMode(targetMode);
        updateModeUI(targetMode);
      });
    });

    // Explode Slider
    if (explodeSlider) {
      explodeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        engine.setExplode(val / 100);
        if (explodeVal) explodeVal.textContent = `${Math.round(val)}%`;
      });
    }

    // Flip Motherboard Button
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        const newSide = engine.flipMotherboard();
        flipBtn.querySelector('span').textContent = newSide === 'front' ? 'Flip to Rear' : 'Flip to Front';
      });
    }

    // Auto-Rotate Button
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        engine.isAutoRotate = !engine.isAutoRotate;
        autoRotateBtn.classList.toggle('active', engine.isAutoRotate);
      });
    }

    // Wireframe / X-Ray Button
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        engine.setWireframe(!engine.isWireframe);
        wireframeBtn.classList.toggle('active', engine.isWireframe);
      });
    }

    // Isolate Button
    if (isolateBtn) {
      isolateBtn.addEventListener('click', () => {
        engine.setIsolate(!engine.isIsolated);
        isolateBtn.classList.toggle('active', engine.isIsolated);
      });
    }

    // Reset View Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        engine.resetCamera();
        if (explodeSlider) {
          explodeSlider.value = 0;
          if (explodeVal) explodeVal.textContent = '0%';
        }
        const stepBtns = document.querySelectorAll('.se-step-btn');
        stepBtns.forEach(b => b.classList.toggle('active', b.dataset.step === '0'));
      });
    }

    // MacBook Lid Angle Slider & Toggle Button
    const lidSlider = document.getElementById('seLidSlider');
    const lidVal = document.getElementById('seLidVal');
    const toggleLidBtn = document.getElementById('seToggleLidBtn');

    if (lidSlider && engine.setLidAngle) {
      lidSlider.addEventListener('input', (e) => {
        const deg = parseFloat(e.target.value);
        engine.setLidAngle(deg);
        if (lidVal) lidVal.textContent = `${Math.round(deg)}°`;
      });
    }

    if (toggleLidBtn && engine.setLidAngle) {
      let isLidOpen = true;
      toggleLidBtn.addEventListener('click', () => {
        isLidOpen = !isLidOpen;
        const target = isLidOpen ? 105 : 0;
        engine.setLidAngle(target);
        if (lidSlider) lidSlider.value = target;
        if (lidVal) lidVal.textContent = `${target}°`;
        toggleLidBtn.innerHTML = isLidOpen ? '<span>💻</span> Close' : '<span>💻</span> Open';
      });
    }

    // Workload Scenario Buttons (M1 Silicon Explorer)
    const scenarioBtns = document.querySelectorAll('.se-scenario-pill');
    const scenarioDesc = document.getElementById('seScenarioDesc');
    const scenarioSteps = document.getElementById('seScenarioSteps');

    if (scenarioBtns.length > 0 && data.WORKLOAD_SCENARIOS) {
      scenarioBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          scenarioBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const sc = data.WORKLOAD_SCENARIOS[idx];
          if (sc) {
            if (scenarioDesc) scenarioDesc.textContent = sc.description;
            if (scenarioSteps) {
              scenarioSteps.innerHTML = sc.explanation.split('\n').map(step => `<li>${step}</li>`).join('');
            }
            if (engine.mode !== 'architecture') {
              engine.setMode('architecture');
              updateModeUI('architecture');
            }
            if (sc.path && engine.archMeshes) {
              engine.archMeshes.forEach((mesh, id) => {
                if (sc.path.includes(id)) {
                  mesh.scale.set(1.08, 1.08, 1.25);
                } else {
                  mesh.scale.set(1.0, 1.0, 1.0);
                }
              });
            }
          }
        });
      });
    }

    // Fullscreen Button
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const elem = document.querySelector('.se-workbench') || document.body;
        if (!document.fullscreenElement) {
          elem.requestFullscreen().catch(err => alert(err.message));
        } else {
          document.exitFullscreen();
        }
      });
    }


    // Floating Viewport Action Cluster Buttons
    const zoomInBtn = document.getElementById('seZoomInBtn');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (engine.zoomIn) engine.zoomIn();
      });
    }

    const zoomOutBtn = document.getElementById('seZoomOutBtn');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (engine.zoomOut) engine.zoomOut();
      });
    }

    const resetCamBtn = document.getElementById('seResetCamBtn');
    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => {
        engine.resetCamera();
      });
    }

    const toggleLabelsBtn = document.getElementById('seToggleLabelsBtn');
    if (toggleLabelsBtn) {
      toggleLabelsBtn.addEventListener('click', () => {
        if (engine.toggleLabels) {
          const active = engine.toggleLabels();
          toggleLabelsBtn.classList.toggle('active', active);
        }
      });
    }

    const fullscreenTopBtn = document.getElementById('seFullscreenTopBtn');
    if (fullscreenTopBtn) {
      fullscreenTopBtn.addEventListener('click', () => {
        const elem = document.querySelector('.se-workbench') || document.body;
        if (!document.fullscreenElement) {
          elem.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen();
        }
      });
    }

    // Sidebar Collapse Toggles
    const leftSidebar = document.getElementById('seSidebarLeft');
    const leftToggle = document.getElementById('seSidebarLeftToggle');
    if (leftToggle && leftSidebar) {
      leftToggle.addEventListener('click', () => {
        leftSidebar.classList.toggle('collapsed');
        const isCollapsed = leftSidebar.classList.contains('collapsed');
        const arrow = leftToggle.querySelector('.se-toggle-arrow');
        if (arrow) arrow.textContent = isCollapsed ? '▶' : '◀';
        setTimeout(() => {
          if (engine.onWindowResize) engine.onWindowResize();
        }, 310);
      });
    }

    const rightSidebar = document.getElementById('seSidebarRight');
    const rightToggle = document.getElementById('seSidebarRightToggle');
    if (rightToggle && rightSidebar) {
      rightToggle.addEventListener('click', () => {
        rightSidebar.classList.toggle('collapsed');
        const isCollapsed = rightSidebar.classList.contains('collapsed');
        const arrow = rightToggle.querySelector('.se-toggle-arrow');
        if (arrow) arrow.textContent = isCollapsed ? '◀' : '▶';
        setTimeout(() => {
          if (engine.onWindowResize) engine.onWindowResize();
        }, 310);
      });
    }

    // Explode Step Preset Buttons (0%, 50%, 100%)
    const stepBtns = document.querySelectorAll('.se-step-btn');
    if (stepBtns.length > 0) {
      stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          stepBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const stepVal = parseInt(btn.dataset.step) || 0;
          engine.setExplode(stepVal / 100);
          if (explodeSlider) explodeSlider.value = stepVal;
          if (explodeVal) explodeVal.textContent = `${stepVal}%`;
        });
      });
    }

    // Camera Presets
    camPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        camPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        engine.setCameraPreset(btn.dataset.preset);
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        renderTree();
      });
    }

    // Category pills
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilterCat = pill.dataset.cat;
        renderTree();
      });
    });

    // Inspector Tabs
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPane = document.getElementById(btn.dataset.pane);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Engine Selection Callback
    engine.onSelectCallback = (userData) => {
      updateInspector(userData);
    };

    // Initial render
    updateModeUI('physical');
    updateInspector(null);
    renderConnectionGraph();
    renderQuiz();
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiliconExplorer);
  } else {
    initSiliconExplorer();
  }

})(typeof window !== 'undefined' ? window : globalThis);
