/* ==========================================================================
   EcrioniX AI Engineering Assistant & Global Floating Community Controller (v4)
   - 100% Client-Side / Local Knowledge Base (Zero External APIs, Zero Keys, Offline Ready)
   - Intelligent Intent Parsing, Keyword & Synonym Matching, Contextual Follow-ups
   - Synthesizable Verilog / SystemVerilog Code Generation & Copy Support
   - Universal High-Contrast Light (Default) & Dark Mode Adaptation
   - Integrated Global Floating WhatsApp Community Component (Audited across all pages)
   ========================================================================== */
(function () {
  'use strict';
  if (window.__ecxBotInitialized) return;
  window.__ecxBotInitialized = true;

  // ──────────────────────────────────────────────────────────────────────────
  // 1. DYNAMIC KNOWLEDGE BASE LOADER (Instant Offline Fallback + Async Fetch)
  // ──────────────────────────────────────────────────────────────────────────
  var KB = window.__ECX_KB || null;
  var currentContextTopicId = null;

  function loadKnowledgeBase(callback) {
    if (window.__ECX_KB && window.__ECX_KB.topics) {
      KB = window.__ECX_KB;
      if (callback) callback(KB);
      return;
    }
    // Attempt fetch from JSON
    fetch('/assets/ecrionix-kb.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        window.__ECX_KB = data;
        KB = data;
        if (callback) callback(KB);
      })
      .catch(function () {
        // Fallback: inject ecrionix-kb.js script
        var s = document.createElement('script');
        s.src = '/assets/ecrionix-kb.js';
        s.onload = function () {
          KB = window.__ECX_KB;
          if (callback) callback(KB);
        };
        document.head.appendChild(s);
      });
  }

  // Preload KB in background
  loadKnowledgeBase();

  // ──────────────────────────────────────────────────────────────────────────
  // 2. QUERY PARSER, INTENT ENGINE & SYNONYM DICTIONARY
  // ──────────────────────────────────────────────────────────────────────────
  var SYNONYMS = {
    'setup': ['setup', 'setuptime', 'tsetup', 'max delay', 'max-delay'],
    'hold': ['hold', 'holdtime', 'thold', 'min delay', 'min-delay'],
    'blocking': ['blocking', 'blocking assignment', '='],
    'nonblocking': ['non-blocking', 'nonblocking', '<=', 'nba'],
    'metastability': ['metastability', 'metastable', 'mtbf', 'oscillate', 'intermediate voltage'],
    'cdc': ['cdc', 'clock domain crossing', 'multi clock', 'cross clock', 'asynchronous clock', 'unsynchronized'],
    'fifo': ['fifo', 'first in first out', 'async fifo', 'asynchronous fifo', 'sync fifo', 'dual clock fifo'],
    'counter': ['counter', '4-bit counter', '4 bit counter', 'up counter', 'binary counter', 'four bit counter'],
    'axi': ['axi', 'axi4', 'axi protocol', 'valid ready', 'axi stream', 'axi-stream', 'amba axi'],
    'apb': ['apb', 'apb protocol', 'amba apb', 'peripheral bus'],
    'ahb': ['ahb', 'ahb protocol', 'amba ahb'],
    'cts': ['cts', 'clock tree synthesis', 'clock tree', 'clock skew', 'skew', 'clock balancing'],
    'asic': ['asic', 'application specific integrated circuit', 'full custom'],
    'fpga': ['fpga', 'field programmable gate array', 'lut', 'look up table', 'xilinx', 'altera'],
    'ucie': ['ucie', 'universal chiplet interconnect express', 'chiplet', 'die to die', 'd2d'],
    'gds': ['gds', 'gdsii', 'rtl to gds', 'rtl to gdsii', 'tapeout', 'backend flow', 'physical design flow', 'openlane'],
    'gray': ['gray code', 'gray', 'binary to gray', 'gray to binary', 'gray counter'],
    'vlsi': ['vlsi', 'very large scale integration', 'semiconductor', 'chip design', 'microchip'],
    'dft': ['dft', 'design for test', 'scan chain', 'atpg', 'mbist', 'jtag', 'stuck at'],
    'riscv': ['risc-v', 'riscv', 'rv32i', 'rv64i', 'open isa'],
    'arm': ['arm', 'arm architecture', 'cortex', 'aarch64', 'cortex-m', 'cortex-a'],
    'cache': ['cache', 'cache memory', 'amat', 'direct mapped', 'set associative', 'l1 cache', 'l2 cache'],
    'pipeline': ['pipeline', 'pipelining', 'hazards', 'data hazard', 'forwarding', 'branch prediction', 'stalls', 'bubbles'],
    'ai': ['ai chip', 'ai accelerator', 'npu', 'tpu', 'systolic array', 'matrix multiply', 'gemm', 'mac unit'],
    'interview': ['interview', 'interview questions', '10 rtl interview questions', 'interview prep', 'interview q&a'],
    'simulator': ['simulator', 'verilog simulator', 'compiler', 'practice verilog', 'run verilog', 'iverilog'],
    'labs': ['labs', 'tools', 'interactive labs', 'simulators', 'all tools', 'all labs']
  };

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .replace(/[^\w\s\-+]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function detectIntent(text) {
    var raw = normalize(text);
    if (/^(hi|hello|hey|greetings|start|help)\b/i.test(raw)) return 'GREET';
    if (/open|show me|take me to|where can i|navigate|link|launch|run|view/i.test(raw) && /simulator|lab|tool|course|hub|guide/i.test(raw)) return 'NAVIGATE';
    if (/code|write|verilog|rtl|module|testbench|implement|coding|syntax/i.test(raw)) return 'CODE';
    if (/diff|difference|vs|versus|compare|comparison/i.test(raw)) return 'COMPARE';
    if (/why|cause|reason|violation|violate|fail|error/i.test(raw)) return 'CAUSE';
    if (/how to fix|fix|resolve|mitigate|solution|repair|cure/i.test(raw)) return 'FIX';
    if (/interview|question|questions|q&a|prep|quiz/i.test(raw)) return 'INTERVIEW';
    if (/how it works|how does|explain|what is|tell me about|deep dive|architecture/i.test(raw)) return 'EXPLAIN';
    return 'SEARCH';
  }

  function searchKnowledgeBase(query) {
    if (!KB || !KB.topics || !KB.topics.length) return [];
    var q = normalize(query);
    var toks = q.split(' ').filter(function (t) { return t.length > 1; });
    var intent = detectIntent(query);

    // Context continuation check
    if (currentContextTopicId && toks.length <= 4) {
      if (/code|verilog|rtl|module/i.test(q)) {
        var ctxMatch = KB.topics.find(function (t) { return t.id === currentContextTopicId; });
        if (ctxMatch && ctxMatch.verilog_example) return [{ topic: ctxMatch, score: 500, intent: 'CODE' }];
      }
      if (/fix|violation|why/i.test(q)) {
        var ctxMatch2 = KB.topics.find(function (t) { return t.id === currentContextTopicId; });
        if (ctxMatch2 && ctxMatch2.violations_and_fixes) return [{ topic: ctxMatch2, score: 500, intent: 'FIX' }];
      }
    }

    var scored = KB.topics.map(function (topic) {
      var score = 0;
      var titleNorm = normalize(topic.title);
      var hay = (topic.title + ' ' + (topic.keywords || []).join(' ') + ' ' + topic.summary + ' ' + (topic.definition || '')).toLowerCase();

      // Exact title or keyword match
      if (q === titleNorm || topic.keywords.indexOf(q) !== -1) {
        score += 300;
      } else if (titleNorm.indexOf(q) !== -1) {
        score += 180;
      }

      // Keyword & Synonym matching
      toks.forEach(function (token) {
        if (topic.keywords.some(function (k) { return k.indexOf(token) !== -1; })) score += 35;
        if (titleNorm.indexOf(token) !== -1) score += 25;
        if (hay.indexOf(token) !== -1) score += 8;

        // Synonym expansion
        for (var key in SYNONYMS) {
          if (SYNONYMS[key].indexOf(token) !== -1) {
            if (topic.keywords.indexOf(key) !== -1 || hay.indexOf(key) !== -1) {
              score += 20;
            }
          }
        }
      });

      // Intent boost
      if (intent === 'CODE' && topic.verilog_example) score += 40;
      if (intent === 'INTERVIEW' && topic.id.indexOf('interview') !== -1) score += 60;
      if (intent === 'COMPARE' && topic.id.indexOf('vs') !== -1) score += 40;
      if (intent === 'NAVIGATE' && topic.id.indexOf('nav-') !== -1) score += 50;

      return { topic: topic, score: score, intent: intent };
    }).filter(function (item) { return item.score > 0; });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. MARKDOWN & RESPONSE FORMATTER
  // ──────────────────────────────────────────────────────────────────────────
  function escapeHTML(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatMarkdown(text) {
    if (!text) return '';
    var out = escapeHTML(text);

    // Code blocks with syntax copy button
    out = out.replace(/```(?:verilog|systemverilog|)([\s\S]*?)```/g, function (match, code) {
      var raw = code.trim();
      return '<div class="ecx-code-wrap">'
        + '<div class="ecx-code-bar"><span>Verilog / SystemVerilog</span><button type="button" class="ecx-copy-btn" data-code="' + encodeURIComponent(raw) + '">📋 Copy Code</button></div>'
        + '<pre class="ecx-code-pre"><code>' + raw + '</code></pre>'
        + '</div>';
    });

    // Inline code `code`
    out = out.replace(/`([^`]+)`/g, '<code class="ecx-inline-code">$1</code>');

    // Bold **text**
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Ordered / numbered lines
    out = out.replace(/(?:^|\n)(\d+\.\s+[^\n]+)/g, '<div class="ecx-num-item">$1</div>');

    // Bullet lines
    out = out.replace(/(?:^|\n)(?:[-*]\s+[^\n]+)/g, function (m) {
      return '<div class="ecx-bullet-item">' + m.replace(/^[\s\n]*[-*]\s+/, '• ') + '</div>';
    });

    // Line breaks
    out = out.replace(/\n\n/g, '<div class="ecx-spacer"></div>');
    out = out.replace(/\n/g, '<br>');

    return out;
  }

  function renderTopicResponse(topic, intent) {
    currentContextTopicId = topic.id;
    var html = '';

    // Header badge
    html += '<div class="ecx-topic-badge">' + (topic.category ? topic.category.toUpperCase() : 'VLSI') + '</div>';
    html += '<h3 class="ecx-res-title">' + topic.title + '</h3>';

    // Summary / Definition
    if (topic.definition) {
      html += '<div class="ecx-section-block"><strong>Definition:</strong> ' + formatMarkdown(topic.definition) + '</div>';
    } else if (topic.summary) {
      html += '<div class="ecx-section-block">' + formatMarkdown(topic.summary) + '</div>';
    }

    // How it works / Deep dive
    if (topic.how_it_works && intent !== 'CODE') {
      html += '<div class="ecx-section-block"><div class="ecx-block-hd">⚙️ How It Works & Architecture</div>' + formatMarkdown(topic.how_it_works) + '</div>';
    }

    // Violations & Fixes (for STA/CDC)
    if (topic.violations_and_fixes && (intent === 'CAUSE' || intent === 'FIX' || intent === 'EXPLAIN' || intent === 'SEARCH')) {
      html += '<div class="ecx-section-block ecx-highlight-block"><div class="ecx-block-hd">🔧 Violations & Fixes</div>' + formatMarkdown(topic.violations_and_fixes) + '</div>';
    }

    // Verilog Code
    if (topic.verilog_example) {
      html += '<div class="ecx-section-block"><div class="ecx-block-hd">💻 Synthesizable Verilog / RTL Code</div>'
        + formatMarkdown('```verilog\n' + topic.verilog_example + '\n```')
        + '<div class="ecx-code-note">✓ Synthesizable RTL. Clock & asynchronous active-low reset included.</div>'
        + '</div>';
    }

    // Hardware / Silicon Application
    if (topic.silicon_example && intent !== 'CODE') {
      html += '<div class="ecx-section-block ecx-silicon-block"><span class="ecx-chip-icon">🔬</span> <strong>Real-World Silicon:</strong> ' + formatMarkdown(topic.silicon_example) + '</div>';
    }

    // Common Mistakes / Gotchas
    if (topic.common_mistakes && intent !== 'CODE') {
      html += '<div class="ecx-section-block ecx-gotcha-block">⚠️ <strong>Common Interview Trap / Gotcha:</strong> ' + formatMarkdown(topic.common_mistakes) + '</div>';
    }

    // Internal Resources Links
    if (topic.resources && topic.resources.length) {
      html += '<div class="ecx-resources-block"><div class="ecx-res-hd">📚 EcrioniX Learning Resources & Tools:</div>';
      topic.resources.forEach(function (r) {
        html += '<a href="' + r.url + '" class="ecx-res-card" target="_self">'
          + '<div class="ecx-res-card-title">' + r.title + ' →</div>'
          + '<div class="ecx-res-card-desc">' + (r.desc || 'Explore guide on EcrioniX') + '</div>'
          + '</a>';
      });
      html += '</div>';
    }

    // Follow-up Suggestion Chips
    if (topic.follow_ups && topic.follow_ups.length) {
      html += '<div class="ecx-followup-block"><div class="ecx-followup-hd">💡 Suggested Follow-Up Questions:</div><div class="ecx-chips-wrap">';
      topic.follow_ups.forEach(function (fu) {
        html += '<button type="button" class="ecx-fu-chip" data-query="' + encodeURIComponent(fu) + '">' + fu + '</button>';
      });
      html += '</div></div>';
    }

    return html;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4. CHATBOT UI INJECTION & STYLES
  // ──────────────────────────────────────────────────────────────────────────
  var css = `
    /* EcrioniX Assistant Unified Theme Styles */
    #ecx-bot-btn {
      position: fixed;
      left: 20px;
      bottom: 20px;
      z-index: 100000;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1px solid rgba(2, 132, 199, 0.3);
      cursor: pointer;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #ffffff;
      box-shadow: 0 4px 18px rgba(2, 132, 199, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
      user-select: none;
    }
    #ecx-bot-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(2, 132, 199, 0.55);
    }
    #ecx-bot-btn .ecx-bot-dot {
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;
      background: #10b981;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }

    /* Chat Container */
    #ecx-bot-wrap {
      position: fixed;
      left: 20px;
      bottom: 86px;
      z-index: 100002;
      width: 440px;
      max-width: calc(100vw - 32px);
      height: 620px;
      max-height: calc(100vh - 110px);
      border-radius: 18px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Outfit', system-ui, -apple-system, sans-serif;
      box-shadow: 0 16px 48px rgba(15, 23, 42, 0.22);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #ecx-bot-wrap.open {
      display: flex;
      animation: ecxBotSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes ecxBotSlideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Light Theme (Default) */
    :root:not([data-theme="dark"]) #ecx-bot-wrap {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #0f172a;
    }
    :root:not([data-theme="dark"]) .ecx-hd {
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    :root:not([data-theme="dark"]) .ecx-hd-title { color: #0f172a; }
    :root:not([data-theme="dark"]) .ecx-hd-sub { color: #64748b; }
    :root:not([data-theme="dark"]) .ecx-chat-body { background: #f8fafc; }
    :root:not([data-theme="dark"]) .ecx-msg.bot {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    }
    :root:not([data-theme="dark"]) .ecx-ft {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
    }
    :root:not([data-theme="dark"]) .ecx-input {
      background: #f8fafc;
      color: #0f172a;
      border: 1px solid #cbd5e1;
    }

    /* Dark Theme */
    :root[data-theme="dark"] #ecx-bot-wrap {
      background: #0d1424;
      border: 1px solid #334155;
      color: #f8fafc;
      box-shadow: 0 20px 56px rgba(0, 0, 0, 0.6);
    }
    :root[data-theme="dark"] .ecx-hd {
      background: #111827;
      border-bottom: 1px solid #1e293b;
    }
    :root[data-theme="dark"] .ecx-hd-title { color: #f8fafc; }
    :root[data-theme="dark"] .ecx-hd-sub { color: #94a3b8; }
    :root[data-theme="dark"] .ecx-chat-body { background: #070b14; }
    :root[data-theme="dark"] .ecx-msg.bot {
      background: #0d1424;
      color: #e2e8f0;
      border: 1px solid #1e293b;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    }
    :root[data-theme="dark"] .ecx-ft {
      background: #0d1424;
      border-top: 1px solid #1e293b;
    }
    :root[data-theme="dark"] .ecx-input {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #334155;
    }

    /* Header Bar */
    .ecx-hd {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .ecx-av {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0284c7, #0d9488);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: #fff;
      flex-shrink: 0;
    }
    .ecx-hd-info { flex: 1; min-width: 0; }
    .ecx-hd-title {
      font-size: 14.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      line-height: 1.2;
    }
    .ecx-status-pill {
      font-size: 10px;
      font-weight: 700;
      color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      padding: 2px 7px;
      border-radius: 999px;
      border: 1px solid rgba(16, 185, 129, 0.25);
    }
    .ecx-hd-sub {
      font-size: 11.5px;
      line-height: 1.3;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ecx-hd-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ecx-icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .ecx-icon-btn:hover {
      background: rgba(148, 163, 184, 0.15);
      color: #0f172a;
    }
    :root[data-theme="dark"] .ecx-icon-btn:hover { color: #f8fafc; }

    /* Chat Area */
    .ecx-chat-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scroll-behavior: smooth;
    }
    .ecx-msg {
      max-width: 92%;
      padding: 12px 15px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.6;
      word-wrap: break-word;
    }
    .ecx-msg.me {
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #ffffff;
      border-bottom-right-radius: 3px;
      align-self: flex-end;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }
    .ecx-msg.bot {
      border-bottom-left-radius: 3px;
      align-self: flex-start;
      width: 100%;
      box-sizing: border-box;
    }

    /* Content Elements Inside Messages */
    .ecx-topic-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(2, 132, 199, 0.12);
      color: #0284c7;
      margin-bottom: 6px;
    }
    .ecx-res-title {
      font-size: 16px;
      font-weight: 800;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }
    .ecx-section-block {
      margin-top: 10px;
    }
    .ecx-block-hd {
      font-weight: 700;
      font-size: 12.5px;
      color: #0284c7;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    :root[data-theme="dark"] .ecx-block-hd { color: #38bdf8; }
    .ecx-highlight-block {
      background: rgba(2, 132, 199, 0.05);
      border-left: 3px solid #0284c7;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
    }
    .ecx-silicon-block {
      background: rgba(16, 185, 129, 0.06);
      border-left: 3px solid #10b981;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      font-size: 12.5px;
    }
    .ecx-gotcha-block {
      background: rgba(245, 158, 11, 0.08);
      border-left: 3px solid #f59e0b;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      font-size: 12.5px;
    }

    /* Code Block */
    .ecx-code-wrap {
      margin: 10px 0;
      border-radius: 8px;
      overflow: hidden;
      background: #0b1120;
      border: 1px solid #1e293b;
    }
    .ecx-code-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      background: #111827;
      border-bottom: 1px solid #1e293b;
      font-size: 11px;
      color: #94a3b8;
      font-family: monospace;
    }
    .ecx-copy-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 10.5px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .ecx-copy-btn:hover { background: rgba(2, 132, 199, 0.4); color: #fff; }
    .ecx-code-pre {
      margin: 0;
      padding: 10px 12px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', Consolas, Monaco, monospace;
      font-size: 11.5px;
      line-height: 1.55;
      color: #f8fafc;
    }
    .ecx-inline-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(2, 132, 199, 0.1);
      color: #0284c7;
    }
    :root[data-theme="dark"] .ecx-inline-code { color: #38bdf8; background: rgba(56, 189, 248, 0.15); }
    .ecx-code-note {
      font-size: 11px;
      color: #10b981;
      margin-top: 3px;
    }

    /* Resource Cards */
    .ecx-resources-block {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ecx-res-hd {
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ecx-res-card {
      display: block;
      padding: 8px 12px;
      border-radius: 8px;
      background: rgba(2, 132, 199, 0.05);
      border: 1px solid rgba(2, 132, 199, 0.18);
      text-decoration: none;
      transition: transform 0.15s, border-color 0.15s, background 0.15s;
    }
    .ecx-res-card:hover {
      transform: translateX(3px);
      border-color: #0284c7;
      background: rgba(2, 132, 199, 0.1);
    }
    .ecx-res-card-title {
      font-size: 13px;
      font-weight: 700;
      color: #0284c7;
    }
    :root[data-theme="dark"] .ecx-res-card-title { color: #38bdf8; }
    .ecx-res-card-desc {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }

    /* Chips */
    .ecx-followup-block {
      margin-top: 12px;
    }
    .ecx-followup-hd {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ecx-chips-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .ecx-fu-chip {
      background: rgba(2, 132, 199, 0.08);
      border: 1px solid rgba(2, 132, 199, 0.25);
      color: #0284c7;
      font-size: 11.5px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      cursor: pointer;
      transition: background 0.15s, transform 0.15s;
    }
    .ecx-fu-chip:hover {
      background: #0284c7;
      color: #ffffff;
      transform: translateY(-1px);
    }
    :root[data-theme="dark"] .ecx-fu-chip {
      color: #38bdf8;
      border-color: rgba(56, 189, 248, 0.3);
      background: rgba(56, 189, 248, 0.1);
    }
    :root[data-theme="dark"] .ecx-fu-chip:hover {
      background: #0284c7;
      color: #ffffff;
    }

    /* Footer & Input Area */
    .ecx-ft {
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }
    .ecx-input-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ecx-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13.5px;
      outline: none;
      transition: border-color 0.15s;
      font-family: inherit;
    }
    .ecx-input:focus { border-color: #0284c7; }
    .ecx-send-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #0284c7;
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: background 0.15s, transform 0.15s;
      flex-shrink: 0;
    }
    .ecx-send-btn:hover { background: #0369a1; transform: scale(1.04); }
    .ecx-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ─── GLOBAL FLOATING WHATSAPP BUTTON ─── */
    #ecx-wa-btn {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 9980;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #25d366;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      user-select: none;
    }
    #ecx-wa-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 26px rgba(37, 211, 102, 0.65);
    }
    #ecx-wa-btn svg { width: 28px; height: 28px; fill: #ffffff; }

    /* Pulse animation */
    #ecx-wa-btn::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #25d366;
      animation: ecxWaPulse 2.4s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: none;
    }
    @keyframes ecxWaPulse {
      0%   { transform: scale(0.95); opacity: 0.8; }
      50%  { transform: scale(1.22); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }

    /* Tooltip */
    #ecx-wa-btn .ecx-wa-tooltip {
      position: absolute;
      right: 64px;
      background: #0f172a;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: translateX(8px);
      transition: opacity 0.2s, transform 0.2s;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }
    #ecx-wa-btn:hover .ecx-wa-tooltip {
      opacity: 1;
      transform: translateX(0);
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
      #ecx-bot-wrap {
        left: 10px;
        right: 10px;
        bottom: 80px;
        width: auto;
        height: min(540px, calc(100vh - 120px));
      }
      #ecx-bot-btn {
        width: 50px;
        height: 50px;
        font-size: 22px;
        left: 14px;
        bottom: 14px;
      }
      #ecx-wa-btn {
        width: 50px;
        height: 50px;
        right: 14px;
        bottom: 14px;
      }
      #ecx-wa-btn svg { width: 25px; height: 25px; }
      /* Adjust WhatsApp when bot is open on mobile */
      body.ecx-bot-opened #ecx-wa-btn {
        opacity: 0.2;
        pointer-events: none;
      }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ──────────────────────────────────────────────────────────────────────────
  // 5. DOM MOUNTING: CHATBOT WIDGET & GLOBAL WHATSAPP BUTTON
  // ──────────────────────────────────────────────────────────────────────────
  function setupUI() {
    // 1. Launch Button
    if (!document.getElementById('ecx-bot-btn')) {
      var btn = document.createElement('button');
      btn.id = 'ecx-bot-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Open EcrioniX AI Assistant');
      btn.title = 'Ask EcrioniX Engineering Assistant';
      btn.innerHTML = '🤖<span class="ecx-bot-dot"></span>';
      document.body.appendChild(btn);
    }

    // 2. Chatbot Window
    if (!document.getElementById('ecx-bot-wrap')) {
      var wrap = document.createElement('div');
      wrap.id = 'ecx-bot-wrap';
      wrap.innerHTML = `
        <div class="ecx-hd">
          <div class="ecx-av">🤖</div>
          <div class="ecx-hd-info">
            <div class="ecx-hd-title">
              EcrioniX Assistant
              <span class="ecx-status-pill">● Local AI / Offline</span>
            </div>
            <div class="ecx-hd-sub">Your VLSI & Engineering Learning Companion</div>
          </div>
          <div class="ecx-hd-actions">
            <button type="button" class="ecx-icon-btn" id="ecxClearBtn" title="Clear conversation" aria-label="Clear chat">🗑</button>
            <button type="button" class="ecx-icon-btn" id="ecxMinBtn" title="Minimize" aria-label="Minimize chat">_</button>
            <button type="button" class="ecx-icon-btn" id="ecxCloseBtn" title="Close" aria-label="Close chat">✕</button>
          </div>
        </div>
        <div class="ecx-chat-body" id="ecxChatBody"></div>
        <div class="ecx-ft">
          <div class="ecx-input-row">
            <input type="text" id="ecxInput" class="ecx-input" placeholder="Ask: 'Setup time', 'AXI protocol', '4-bit counter'..." autocomplete="off">
            <button type="button" id="ecxSendBtn" class="ecx-send-btn" aria-label="Send query">➤</button>
          </div>
        </div>
      `;
      document.body.appendChild(wrap);
    }

    // 3. Global Floating WhatsApp Button
    var existingWa = document.querySelector('a[href*="whatsapp.com/channel"]');
    if (!existingWa) {
      var waBtn = document.createElement('a');
      waBtn.id = 'ecx-wa-btn';
      waBtn.href = 'https://whatsapp.com/channel/0029Vb7U7jxKAwEmqonaUu2x';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      waBtn.setAttribute('aria-label', 'Join EcrioniX WhatsApp Community');
      waBtn.title = 'Join EcrioniX Community on WhatsApp';
      waBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span class="ecx-wa-tooltip">Join EcrioniX Community</span>
      `;
      document.body.appendChild(waBtn);
    } else {
      // Ensure ID and styling on existing WhatsApp button
      existingWa.id = 'ecx-wa-btn';
      if (!existingWa.querySelector('.ecx-wa-tooltip')) {
        var span = document.createElement('span');
        span.className = 'ecx-wa-tooltip';
        span.textContent = 'Join EcrioniX Community';
        existingWa.appendChild(span);
      }
    }

    bindEvents();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 6. EVENT BINDING & INTERACTION
  // ──────────────────────────────────────────────────────────────────────────
  function bindEvents() {
    var botBtn = document.getElementById('ecx-bot-btn');
    var botWrap = document.getElementById('ecx-bot-wrap');
    var closeBtn = document.getElementById('ecxCloseBtn');
    var minBtn = document.getElementById('ecxMinBtn');
    var clearBtn = document.getElementById('ecxClearBtn');
    var input = document.getElementById('ecxInput');
    var sendBtn = document.getElementById('ecxSendBtn');
    var chatBody = document.getElementById('ecxChatBody');

    function openBot() {
      botWrap.classList.add('open');
      document.body.classList.add('ecx-bot-opened');
      if (!chatBody.children.length) {
        showWelcome();
      }
      setTimeout(function () { input.focus(); }, 150);
    }

    function closeBot() {
      botWrap.classList.remove('open');
      document.body.classList.remove('ecx-bot-opened');
    }

    botBtn.onclick = function () {
      botWrap.classList.contains('open') ? closeBot() : openBot();
    };
    closeBtn.onclick = closeBot;
    minBtn.onclick = closeBot;

    clearBtn.onclick = function () {
      chatBody.innerHTML = '';
      currentContextTopicId = null;
      showWelcome();
    };

    function appendUserMessage(text) {
      var msg = document.createElement('div');
      msg.className = 'ecx-msg me';
      msg.textContent = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendBotMessage(html) {
      var msg = document.createElement('div');
      msg.className = 'ecx-msg bot';
      msg.innerHTML = html;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Bind copy buttons inside this message
      msg.querySelectorAll('.ecx-copy-btn').forEach(function (btn) {
        btn.onclick = function () {
          var code = decodeURIComponent(btn.getAttribute('data-code') || '');
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(function () {
              var old = btn.textContent;
              btn.textContent = '✓ Copied!';
              setTimeout(function () { btn.textContent = old; }, 1800);
            });
          }
        };
      });

      // Bind follow-up chips
      msg.querySelectorAll('.ecx-fu-chip').forEach(function (chip) {
        chip.onclick = function () {
          var q = decodeURIComponent(chip.getAttribute('data-query') || chip.textContent);
          handleUserQuery(q);
        };
      });
    }

    function showWelcome() {
      var welcomeHTML = `
        <div style="text-align:center;padding:10px 0 16px;">
          <div style="font-size:32px;margin-bottom:6px;">👋</div>
          <h2 style="font-size:18px;font-weight:800;margin:0 0 4px;color:var(--heading,#0f172a);">Welcome to EcrioniX Assistant!</h2>
          <p style="font-size:13px;color:#64748b;margin:0 auto 12px;max-width:320px;">Your engineering learning companion. Explore VLSI, RTL Design, Verilog, SystemVerilog, STA, CDC, Physical Design, Computer Architecture and more.</p>
          <div style="font-size:11.5px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Choose a topic shortcut or ask any question:</div>
          <div class="ecx-chips-wrap" style="justify-content:center;">
            <button type="button" class="ecx-fu-chip" data-query="What is VLSI?">⚡ VLSI Fundamentals</button>
            <button type="button" class="ecx-fu-chip" data-query="Explain setup time">⏱️ Setup & Hold Time</button>
            <button type="button" class="ecx-fu-chip" data-query="Difference between blocking and non-blocking">💻 Blocking vs Non-Blocking</button>
            <button type="button" class="ecx-fu-chip" data-query="How does an asynchronous FIFO work?">🔄 Asynchronous FIFO</button>
            <button type="button" class="ecx-fu-chip" data-query="Explain AXI protocol">🔌 AXI4 Protocol</button>
            <button type="button" class="ecx-fu-chip" data-query="What is clock tree synthesis?">📐 Clock Tree Synthesis</button>
            <button type="button" class="ecx-fu-chip" data-query="Difference between ASIC and FPGA">🔲 ASIC vs FPGA</button>
            <button type="button" class="ecx-fu-chip" data-query="Write a Verilog 4-bit counter">🔢 4-Bit Counter Code</button>
            <button type="button" class="ecx-fu-chip" data-query="Give me 10 RTL interview questions">🎯 10 RTL Interview Q&A</button>
            <button type="button" class="ecx-fu-chip" data-query="Show me the Verilog simulator">🛠️ Verilog Simulator</button>
            <button type="button" class="ecx-fu-chip" data-query="Explain Gray code with an example">🔀 Gray Code</button>
            <button type="button" class="ecx-fu-chip" data-query="What is UCIe?">💡 UCIe Chiplets</button>
            <button type="button" class="ecx-fu-chip" data-query="Explain the RTL-to-GDS flow">🏭 RTL-to-GDS Flow</button>
          </div>
        </div>
      `;
      appendBotMessage(welcomeHTML);
    }

    function handleUserQuery(query) {
      if (!query || !query.trim()) return;
      var q = query.trim();
      appendUserMessage(q);
      input.value = '';

      // Ensure KB is loaded
      loadKnowledgeBase(function () {
        var results = searchKnowledgeBase(q);

        if (!results.length) {
          var fallback = '<div style="margin-bottom:8px;">Hmm, I couldn’t find an exact match for <strong>' + escapeHTML(q) + '</strong> in the local repository.</div>'
            + '<div style="font-size:12.5px;color:#64748b;margin-bottom:10px;">Try asking about <strong>Setup time</strong>, <strong>Blocking vs Non-blocking</strong>, <strong>Async FIFO</strong>, <strong>AXI</strong>, <strong>CTS</strong>, or <strong>Verilog Counter</strong>, or tap a topic below:</div>'
            + '<div class="ecx-chips-wrap">'
            + '<button type="button" class="ecx-fu-chip" data-query="Explain setup time">Setup Time</button>'
            + '<button type="button" class="ecx-fu-chip" data-query="What is metastability?">Metastability</button>'
            + '<button type="button" class="ecx-fu-chip" data-query="Write a Verilog 4-bit counter">4-bit Counter Verilog</button>'
            + '<button type="button" class="ecx-fu-chip" data-query="Explain AXI protocol">AXI Protocol</button>'
            + '<button type="button" class="ecx-fu-chip" data-query="Give me 10 RTL interview questions">10 Interview Q&A</button>'
            + '<button type="button" class="ecx-fu-chip" data-query="Show me the Verilog simulator">Open Simulator</button>'
            + '</div>';
          appendBotMessage(fallback);
          return;
        }

        var top = results[0];
        var responseHTML = renderTopicResponse(top.topic, top.intent);

        // If there is a strong secondary match, surface it as a related exploration
        if (results.length > 1 && results[1].score >= 80 && results[1].topic.id !== top.topic.id) {
          var sec = results[1].topic;
          responseHTML += '<div style="margin-top:12px;padding-top:10px;border-top:1px dashed rgba(148,163,184,0.25);font-size:12px;color:#64748b;">'
            + '🔗 <em>Also related:</em> <button type="button" class="ecx-fu-chip" data-query="' + encodeURIComponent(sec.title) + '" style="margin-left:4px;">' + sec.title + '</button>'
            + '</div>';
        }

        appendBotMessage(responseHTML);
      });
    }

    sendBtn.onclick = function () { handleUserQuery(input.value); };
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserQuery(input.value);
      }
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. INITIALIZE ON DOM READY
  // ──────────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupUI);
  } else {
    setupUI();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 8. UNIVERSAL MOBILE NAVIGATION REPAIR
  // ──────────────────────────────────────────────────────────────────────────
  (function () {
    function findMenu(ham, nav) {
      return (nav && (nav.querySelector('.mobile-menu') || nav.querySelector('.mob-menu')))
        || document.getElementById('mobileMenu')
        || document.getElementById('mob')
        || document.querySelector('.mobile-menu')
        || document.querySelector('.mob-menu');
    }

    function bindHamburger(ham, menu) {
      if (!ham || !menu || ham.dataset.ecxBound === '1') return;
      ham.dataset.ecxBound = '1';
      ham.removeAttribute('onclick');
      ham.setAttribute('aria-expanded', 'false');
      ham.setAttribute('type', 'button');
      ham.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = menu.classList.toggle('open');
        ham.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('open');
          ham.setAttribute('aria-expanded', 'false');
        });
      });
    }

    function repairNav() {
      document.querySelectorAll('.hamburger').forEach(function (ham) {
        var nav = ham.closest('.navbar, .nav, nav') || ham.parentElement;
        var menu = findMenu(ham, nav);
        if (!menu) return;
        if (ham.dataset.ecxBound !== '1') {
          var fresh = ham.cloneNode(true);
          fresh.removeAttribute('onclick');
          ham.parentNode.replaceChild(fresh, ham);
          bindHamburger(fresh, menu);
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', repairNav);
    } else {
      repairNav();
    }
  })();
})();
