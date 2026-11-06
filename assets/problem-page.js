/* Bootstraps a /problems/<slug>/ solve page from EcrioniXProblemCatalog */
(function () {
  'use strict';

  const ADMIN_UID = 'aUH4VdmtHKZQbFqXJqCOcQRNVOG2';
  let currentUser = null;
  let problem = null;
  let editorApi = null;
  let currentZoom = 1;
  let lastVcdText = null;

  function qs(id) { return document.getElementById(id); }

  function showWaveform(vcdText) {
    const wrap = qs('waveform-wrap');
    if (!wrap) return;
    lastVcdText = vcdText;
    if (!vcdText || !problem) { wrap.style.display = 'none'; return; }
    const J = window.EcrioniXProblems;
    const signals = problem.waveSignals || [];
    const events = J.parseVCDSignals(vcdText, signals);
    const allTimes = signals.flatMap(n => (events[n] || []).map(e => e.time));
    const endTime = Math.max(4, ...(allTimes.length ? allTimes : [0])) + 1;
    
    const svgContainer = qs('waveform-svg');
    if (svgContainer) {
      svgContainer.innerHTML = J.renderTimingDiagram(events, signals, endTime, currentZoom);
    }
    wrap.style.display = 'block';

    // Auto-switch to waveform on mobile if tests ran
    if (window.innerWidth < 900) {
      setMobileTab('waveform');
    }
  }

  function setWaveZoom(delta) {
    if (delta === 0) currentZoom = 1;
    else currentZoom = Math.min(2.5, Math.max(0.6, currentZoom + delta));
    const zoomVal = qs('waveZoomVal');
    if (zoomVal) zoomVal.textContent = Math.round(currentZoom * 100) + '%';
    if (lastVcdText) showWaveform(lastVcdText);
  }

  function paintExpectedWave() {
    const host = qs('wd-expected-0');
    if (!host || !problem || !problem.wavedrom || typeof WaveDrom === 'undefined') return;
    host.innerHTML = '';
    try {
      WaveDrom.RenderWaveForm(0, JSON.parse(JSON.stringify(problem.wavedrom)), 'wd-expected-');
    } catch (e) {
      console.warn('WaveDrom render error:', e);
      host.innerHTML = '<div class="empty-state">Expected waveform unavailable.</div>';
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const cred = await firebase.auth().signInWithPopup(provider);
      currentUser = cred.user;
      await markSolvedIfDone(currentUser);
      return currentUser;
    } catch (e) {
      console.warn('sign-in failed or cancelled:', e);
      return null;
    }
  }

  function formatTestResults(logText) {
    const J = window.EcrioniXProblems;
    const lines = (logText || '').split('\n').filter(Boolean);
    let passCount = 0;
    let failCount = 0;
    
    const formattedLines = lines.map(line => {
      if (line.includes('PASS')) {
        passCount++;
        return `<div class="log-row pass"><span class="badge-pass">PASS</span> <span>${J.esc(line.replace(/PASS:?/g, '').trim())}</span></div>`;
      } else if (line.includes('FAIL')) {
        failCount++;
        return `<div class="log-row fail"><span class="badge-fail">FAIL</span> <span>${J.esc(line.replace(/FAIL:?/g, '').trim())}</span></div>`;
      }
      return `<div class="log-row info">${J.esc(line)}</div>`;
    }).join('');

    const total = passCount + failCount;
    let summaryHtml = '';
    if (total > 0) {
      summaryHtml = `<div class="test-summary ${failCount === 0 ? 'all-pass' : 'has-fail'}">
        <span>Test Summary: <b>${passCount}/${total}</b> test vectors passed</span>
        <span class="status-indicator">${failCount === 0 ? '✓ ALL TESTS PASSED' : '✕ FAILURES DETECTED'}</span>
      </div>`;
    }

    return summaryHtml + formattedLines;
  }

  async function runSubmit() {
    const J = window.EcrioniXProblems;
    const editor = qs('editor');
    const out = qs('console');
    const btn = qs('submit-btn');

    if (!currentUser) {
      btn.disabled = true;
      btn.textContent = 'Sign in...';
      out.innerHTML = '<span class="info">Sign in with Google to run tests and save your progress...</span>\n';
      const user = await signInWithGoogle();
      btn.disabled = false;
      btn.textContent = 'Run tests';
      if (!user) {
        out.innerHTML = '<span class="warn">Sign-in was cancelled — sign in to run tests and track solves on the leaderboard.</span>';
        return;
      }
      out.innerHTML = '<span class="ok">Signed in! Click Run tests again.</span>';
      return;
    }

    const combined = editor.value + '\n' + problem.hiddenTb;

    btn.disabled = true;
    btn.textContent = 'Running...';
    out.innerHTML = '<div class="sim-loading"><span class="auth-spinner mini"></span> <span>Compiling RTL and running testbench on simulation server...</span></div>';

    try {
      const res = await J.apiFetch(J.API, { code: combined }, (attempt, s) => {
        out.innerHTML = `<span class="warn">Server waking up — retrying in ${Math.round(s)}s... (attempt ${attempt + 1}/3)</span>`;
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const d = await res.json();

      if (!d.success && d.stage === 'compile') {
        out.innerHTML = `<div class="err-box"><div class="err-title">── RTL Compilation Error ──</div><pre class="err-pre">${J.esc(d.stderr || d.stdout)}</pre></div>`;
        showWaveform(null);
        if (currentUser) await J.bumpAttempt(currentUser, problem.slug);
      } else {
        showWaveform(d.vcd);
        const judged = J.parseJudgeStdout(d.stdout);
        if (judged.passed) {
          out.innerHTML = `<div class="pass-box"><div class="pass-title">🎉 All Tests Passed!</div><div class="test-log">${formatTestResults(judged.log)}</div></div>`;
          const result = await J.recordSolve(currentUser, problem.slug, problem.difficulty);
          if (qs('solvedBadge')) qs('solvedBadge').style.display = 'inline-block';
          const banner = qs('passBanner');
          if (banner) {
            banner.classList.add('show');
            banner.innerHTML = result.firstSolve
              ? `🎉 First solve! +${result.points} points. <a href="/problems/leaderboard/">View leaderboard →</a>`
              : `✅ Solved again. Points already counted. <a href="/problems/leaderboard/">View leaderboard →</a>`;
          }
          renderShareCard(problem, result);
        } else {
          if (currentUser) await J.bumpAttempt(currentUser, problem.slug);
          out.innerHTML = `<div class="fail-box"><div class="fail-title">❌ Verification Failed — Inspect Discrepancies Below</div><div class="test-log">${formatTestResults(judged.log)}</div>${d.stderr ? `<pre class="err-pre">${J.esc(d.stderr)}</pre>` : ''}</div>`;
        }
      }
    } catch (e) {
      out.innerHTML = `<div class="err-box"><div class="err-title">── Connection Error ──</div><p>${J.esc(e.message)}</p><span class="dim">Tip: The remote simulation container sleeps after inactivity — please click Run again.</span></div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Run tests';
    }
  }

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function drawShareCard(p, result) {
    const W = 1200, H = 630;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(1, '#0c1526');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Accent glow blobs
    const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 20, W * 0.85, H * 0.1, 420);
    glow.addColorStop(0, 'rgba(56,189,248,.18)');
    glow.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    const glow2 = ctx.createRadialGradient(W * 0.1, H * 0.95, 20, W * 0.1, H * 0.95, 420);
    glow2.addColorStop(0, 'rgba(167,139,250,.14)');
    glow2.addColorStop(1, 'rgba(167,139,250,0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Wordmark
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '700 30px Outfit, sans-serif';
    ctx.fillText('EcrioniX', 64, 76);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px Outfit, sans-serif';
    ctx.fillText('RTL Design & Verilog Problems', 220, 76);

    // "Solved" pill
    ctx.fillStyle = 'rgba(74,222,128,.14)';
    roundRect(ctx, 64, 130, 150, 42, 21);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.font = '700 18px Outfit, sans-serif';
    ctx.fillText('✅ SOLVED', 84, 157);

    // Difficulty pill
    const diffColors = { easy: ['rgba(74,222,128,.14)', '#4ade80'], medium: ['rgba(251,191,36,.14)', '#fbbf24'], hard: ['rgba(248,113,113,.14)', '#f87171'] };
    const [diffBg, diffFg] = diffColors[p.difficulty] || diffColors.easy;
    ctx.fillStyle = diffBg;
    roundRect(ctx, 230, 130, 130, 42, 21);
    ctx.fill();
    ctx.fillStyle = diffFg;
    ctx.font = '700 16px Outfit, sans-serif';
    ctx.fillText((p.difficulty || '').toUpperCase(), 254, 157);

    // Points pill
    ctx.fillStyle = 'rgba(45,212,191,.14)';
    roundRect(ctx, 376, 130, 110, 42, 21);
    ctx.fill();
    ctx.fillStyle = '#2dd4bf';
    ctx.font = '700 16px Outfit, sans-serif';
    ctx.fillText(p.points + ' PTS', 398, 157);

    // Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 52px Outfit, sans-serif';
    wrapText(ctx, p.title, 64, 260, 1070, 62);

    // Stats line
    const total = (window.ECRIONIX_PROBLEMS || []).length;
    const solvedCount = result && result.solvedCount ? result.solvedCount : null;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 24px Outfit, sans-serif';
    const statsLine = solvedCount ? `${solvedCount} of ${total} problems solved` : `Free, auto-graded Verilog problems`;
    ctx.fillText(statsLine, 64, H - 130);

    // Footer URL
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 26px Outfit, sans-serif';
    ctx.fillText('ecrionix.org/problems/', 64, H - 64);

    return canvas;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    let lines = 0;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, curY);
        line = word;
        curY += lineHeight;
        lines++;
        if (lines >= 3) { line += '…'; break; }
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, x, curY);
  }

  function renderShareCard(p, result) {
    let panel = qs('shareCardPanel');
    if (!panel) {
      const banner = qs('passBanner');
      if (!banner || !banner.parentNode) return;
      panel = document.createElement('div');
      panel.id = 'shareCardPanel';
      panel.className = 'share-card-panel';
      banner.parentNode.insertBefore(panel, banner.nextSibling);
    }

    const build = () => {
      let canvas;
      try {
        canvas = drawShareCard(p, result);
      } catch (e) {
        console.warn('share card render failed:', e);
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      const pageUrl = 'https://ecrionix.org/problems/' + p.slug + '/';
      const shareText = `I just solved "${p.title}" on EcrioniX 🧩 — free, auto-graded Verilog problems.`;

      panel.innerHTML = `
        <div class="share-card-label">Share your solve</div>
        <div class="share-card-canvas-wrap"><img src="${dataUrl}" alt="Solved ${esc(p.title)} on EcrioniX"></div>
        <div class="share-actions">
          <button type="button" class="share-btn" id="shareDownloadBtn">⬇ Download image</button>
          <button type="button" class="share-btn" id="shareCopyBtn">🔗 Copy link</button>
          <a class="share-btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}">WhatsApp</a>
          <a class="share-btn linkedin" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}">LinkedIn</a>
          <a class="share-btn x" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}">X</a>
        </div>
      `;
      panel.classList.add('show');

      const dlBtn = qs('shareDownloadBtn');
      if (dlBtn) dlBtn.addEventListener('click', () => {
        canvas.toBlob(blob => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ecrionix-' + p.slug + '-solved.png';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 4000);
        }, 'image/png');
      });

      const copyBtn = qs('shareCopyBtn');
      if (copyBtn) copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => { copyBtn.textContent = '🔗 Copy link'; }, 1800);
        }).catch(() => {});
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build).catch(build);
    } else {
      build();
    }
  }

  function resetCode() {
    qs('editor').value = problem.starter;
    qs('console').innerHTML = '<span class="dim">// Output appears after you run tests.</span>';
    if (editorApi) editorApi.sync();
    showWaveform(null);
  }

  function copyCode() {
    const editor = qs('editor');
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
      const btn = qs('copyBtn');
      if (btn) {
        btn.textContent = '✓ Copied';
        setTimeout(() => { btn.textContent = 'Copy RTL'; }, 1800);
      }
    });
  }

  function setMobileTab(tabName) {
    document.querySelectorAll('.mob-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    const specCol = qs('specCol');
    const editorCol = qs('editorCol');
    const waveWrap = qs('waveform-wrap');
    const consoleWrap = qs('consoleWrap');

    if (window.innerWidth < 900) {
      if (tabName === 'spec') {
        if (specCol) specCol.style.display = 'block';
        if (editorCol) editorCol.style.display = 'none';
      } else if (tabName === 'code') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
        if (consoleWrap) consoleWrap.style.display = 'none';
        if (waveWrap) waveWrap.style.display = 'none';
      } else if (tabName === 'waveform') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
        if (waveWrap) waveWrap.style.display = 'block';
        if (consoleWrap) consoleWrap.style.display = 'none';
      } else if (tabName === 'output') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
        if (consoleWrap) consoleWrap.style.display = 'block';
      }
    } else {
      if (specCol) specCol.style.display = 'block';
      if (editorCol) editorCol.style.display = 'block';
      if (consoleWrap) consoleWrap.style.display = 'block';
      if (waveWrap && lastVcdText) waveWrap.style.display = 'block';
    }
  }

  async function markSolvedIfDone(user) {
    try {
      const doc = await firebase.firestore().collection('users').doc(user.uid).get();
      const done = doc.data()?.completedChallenges || [];
      if (done.includes(problem.slug) && qs('solvedBadge')) {
        qs('solvedBadge').style.display = 'inline-block';
      }
    } catch (_) { /* ignore */ }
  }

  function renderCircuitDiagram(p) {
    const wrap = qs('circuitDiagramWrap');
    if (!wrap) return;
    
    // Core schematic diagrams for major digital design circuits
    let svg = '';
    const slug = p.slug || '';
    if (slug.includes('and-gate')) {
      svg = `<svg viewBox="0 0 200 80" class="circuit-svg"><path d="M 30,25 L 70,25 M 30,55 L 70,55 M 70,10 L 110,10 A 30 30 0 0 1 110,70 L 70,70 Z M 140,40 L 180,40" stroke="#38bdf8" stroke-width="2.5" fill="none"/><text x="12" y="29" fill="#94a3b8" font-size="12">a</text><text x="12" y="59" fill="#94a3b8" font-size="12">b</text><text x="185" y="44" fill="#2dd4bf" font-size="12" font-weight="700">out</text><text x="88" y="44" fill="#64748b" font-size="11">AND</text></svg>`;
    } else if (slug.includes('not-gate') || slug.includes('inverter')) {
      svg = `<svg viewBox="0 0 200 80" class="circuit-svg"><path d="M 30,40 L 70,40 L 70,15 L 125,40 L 70,65 Z M 137,40 L 180,40" stroke="#38bdf8" stroke-width="2.5" fill="none"/><circle cx="131" cy="40" r="6" stroke="#38bdf8" stroke-width="2.5" fill="none"/><text x="12" y="44" fill="#94a3b8" font-size="12">in</text><text x="185" y="44" fill="#2dd4bf" font-size="12" font-weight="700">out</text></svg>`;
    } else if (slug.includes('mux2to1')) {
      svg = `<svg viewBox="0 0 220 100" class="circuit-svg"><polygon points="70,15 130,30 130,70 70,85" stroke="#38bdf8" stroke-width="2" fill="rgba(56,189,248,0.06)"/><path d="M 30,30 L 70,30 M 30,70 L 70,70 M 130,50 L 180,50 M 100,77 L 100,95" stroke="#38bdf8" stroke-width="2" fill="none"/><text x="15" y="34" fill="#94a3b8" font-size="12">a (0)</text><text x="15" y="74" fill="#94a3b8" font-size="12">b (1)</text><text x="186" y="54" fill="#2dd4bf" font-size="12" font-weight="700">out</text><text x="92" y="99" fill="#fbbf24" font-size="11">sel</text><text x="90" y="54" fill="#64748b" font-size="10">2:1 MUX</text></svg>`;
    } else if (slug.includes('dff')) {
      svg = `<svg viewBox="0 0 220 100" class="circuit-svg"><rect x="70" y="15" width="80" height="70" rx="6" stroke="#a78bfa" stroke-width="2" fill="rgba(167,139,250,0.06)"/><path d="M 30,35 L 70,35 M 30,65 L 70,65 M 70,60 L 78,65 L 70,70 M 150,35 L 190,35 M 110,85 L 110,95" stroke="#a78bfa" stroke-width="2" fill="none"/><text x="16" y="39" fill="#94a3b8" font-size="12">d</text><text x="10" y="69" fill="#38bdf8" font-size="11">>clk</text><text x="195" y="39" fill="#2dd4bf" font-size="12" font-weight="700">q</text><text x="96" y="99" fill="#f43f5e" font-size="10">rst_n</text><text x="98" y="52" fill="#e2e8f0" font-size="12" font-weight="700">DFF</text></svg>`;
    } else if (slug.includes('fifo')) {
      svg = `<svg viewBox="0 0 240 100" class="circuit-svg"><rect x="60" y="20" width="120" height="60" rx="6" stroke="#f472b6" stroke-width="2" fill="rgba(244,114,182,0.06)"/><line x1="90" y1="20" x2="90" y2="80" stroke="rgba(244,114,182,0.3)"/><line x1="120" y1="20" x2="120" y2="80" stroke="rgba(244,114,182,0.3)"/><line x1="150" y1="20" x2="150" y2="80" stroke="rgba(244,114,182,0.3)"/><path d="M 20,40 L 60,40 M 180,40 L 220,40 M 40,65 L 60,65 M 180,65 L 205,65" stroke="#f472b6" stroke-width="2" fill="none"/><text x="10" y="44" fill="#fbbf24" font-size="10">din</text><text x="10" y="69" fill="#94a3b8" font-size="9">wr_en</text><text x="222" y="44" fill="#2dd4bf" font-size="10" font-weight="700">dout</text><text x="100" y="54" fill="#e2e8f0" font-size="11" font-weight="700">FIFO</text></svg>`;
    } else if (slug.includes('apb') || slug.includes('axi')) {
      svg = `<svg viewBox="0 0 240 100" class="circuit-svg"><rect x="40" y="15" width="60" height="70" rx="4" stroke="#38bdf8" stroke-width="1.8" fill="rgba(56,189,248,0.08)"/><rect x="140" y="15" width="60" height="70" rx="4" stroke="#fb923c" stroke-width="1.8" fill="rgba(251,146,60,0.08)"/><path d="M 100,35 L 140,35 M 140,55 L 100,55 M 100,70 L 140,70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/><text x="48" y="54" fill="#38bdf8" font-size="11" font-weight="700">MASTER</text><text x="150" y="54" fill="#fb923c" font-size="11" font-weight="700">SLAVE</text><text x="108" y="31" fill="#38bdf8" font-size="8">PSEL</text><text x="106" y="51" fill="#2dd4bf" font-size="8">PREADY</text><text x="106" y="67" fill="#fbbf24" font-size="8">PWDATA</text></svg>`;
    }

    if (svg) {
      wrap.innerHTML = `<div class="circuit-card"><div class="circuit-title">📐 Circuit Schematic Diagram</div>${svg}</div>`;
      wrap.style.display = 'block';
    } else {
      wrap.style.display = 'none';
    }
  }

  function bootUI() {
    if (qs('authLoading')) qs('authLoading').style.display = 'none';
    if (qs('pageContent')) qs('pageContent').style.display = 'block';

    if (qs('problemTitle')) qs('problemTitle').textContent = problem.title;
    if (qs('problemLede')) qs('problemLede').textContent = problem.lede;
    if (qs('diffBadge')) {
      qs('diffBadge').textContent = problem.difficulty;
      qs('diffBadge').className = 'diff-badge ' + problem.difficulty;
    }
    if (qs('pointsBadge')) qs('pointsBadge').textContent = problem.points + ' pts';
    if (qs('levelBadge')) {
      qs('levelBadge').textContent = 'Level ' + (problem.level || 1);
      qs('levelBadge').className = 'level-pill level-' + (problem.level || 1);
    }
    if (qs('categoryLabel')) qs('categoryLabel').textContent = problem.category;
    if (qs('specBox')) {
      qs('specBox').innerHTML = 'Write a synthesizable Verilog module named <code>top_module</code> that matches the ports below <b>exactly</b>. Hidden testbenches simulate your design and evaluate every corner case.';
    }
    if (qs('conceptBox')) {
      qs('conceptBox').innerHTML = problem.concept || '';
      if (!problem.concept) qs('conceptBox').style.display = 'none';
    }
    if (qs('portsWrap')) qs('portsWrap').innerHTML = problem.portsHtml || '';
    
    renderCircuitDiagram(problem);

    const editorEl = qs('editor');
    if (editorEl) editorEl.value = problem.starter;
    if (window.EcrioniXProblems?.wireEditor) {
      editorApi = window.EcrioniXProblems.wireEditor('editor', 'hl-layer');
    }

    paintExpectedWave();

    if (qs('submit-btn')) qs('submit-btn').onclick = runSubmit;
    if (qs('resetBtn')) qs('resetBtn').onclick = resetCode;
    if (qs('copyBtn')) qs('copyBtn').onclick = copyCode;

    // Waveform zoom handlers
    const zIn = qs('waveZoomIn');
    const zOut = qs('waveZoomOut');
    const zReset = qs('waveZoomReset');
    if (zIn) zIn.onclick = () => setWaveZoom(0.25);
    if (zOut) zOut.onclick = () => setWaveZoom(-0.25);
    if (zReset) zReset.onclick = () => setWaveZoom(0);

    // Mobile navigation tab clicks
    document.querySelectorAll('.mob-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMobileTab(btn.dataset.tab);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        const specCol = qs('specCol');
        const editorCol = qs('editorCol');
        const consoleWrap = qs('consoleWrap');
        if (specCol) specCol.style.display = 'block';
        if (editorCol) editorCol.style.display = 'block';
        if (consoleWrap) consoleWrap.style.display = 'block';
      }
    });
  }

  window.EcrioniXBootProblem = function (slug) {
    problem = window.EcrioniXProblemCatalog.getProblem(slug);
    if (!problem) {
      document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">Problem not found. <a href="/problems/">Back to Problems Hub</a></p>';
      return;
    }

    bootUI();

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) return;
      currentUser = user;
      if (window.EcrioniXProblems?.ensureLeaderboardMember) {
        window.EcrioniXProblems.ensureLeaderboardMember(user);
      }
      await markSolvedIfDone(user);
    });
  };
})();
