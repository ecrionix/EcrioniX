/* Bootstraps a /problems/<slug>/ solve page from EcrioniXProblemCatalog */
(function () {
  'use strict';

  const ADMIN_UID = 'aUH4VdmtHKZQbFqXJqCOcQRNVOG2';
  let currentUser = null;
  let problem = null;
  let editorApi = null;
  let currentZoom = 1;
  let lastVcdText = null;
  let lastCompileErr = '';
  let lastRawStdout = '';

  function qs(id) { return document.getElementById(id); }

  function getDraftKey() {
    return problem ? 'ecrionix_draft_' + problem.slug : null;
  }

  function saveDraft(code) {
    const k = getDraftKey();
    if (!k) return;
    try {
      localStorage.setItem(k, code);
      showDraftBadge('Draft saved');
    } catch (_) {}
  }

  function showDraftBadge(msg) {
    const badge = qs('draftStatus');
    if (!badge) return;
    badge.textContent = msg;
    badge.classList.add('visible');
    setTimeout(() => { badge.classList.remove('visible'); }, 1800);
  }

  function showWaveform(vcdText) {
    lastVcdText = vcdText;
    const svgContainer = qs('waveform-svg');
    const emptyNotice = qs('waveform-empty');
    if (!svgContainer) return;

    if (!vcdText || !problem) {
      svgContainer.innerHTML = '';
      if (emptyNotice) emptyNotice.style.display = 'block';
      return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';
    const J = window.EcrioniXProblems;
    const signals = problem.waveSignals || [];
    const events = J.parseVCDSignals(vcdText, signals);
    const allTimes = signals.flatMap(n => (events[n] || []).map(e => e.time));
    const endTime = Math.max(4, ...(allTimes.length ? allTimes : [0])) + 1;
    
    svgContainer.innerHTML = J.renderTimingDiagram(events, signals, endTime, currentZoom);

    // If on mobile and user clicked waveform, update
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

  function setResultTab(tabName) {
    document.querySelectorAll('.res-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.res-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === 'pane-' + tabName);
    });
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
    
    const formattedRows = lines.map(line => {
      if (line.includes('PASS')) {
        passCount++;
        return `<div class="test-row pass"><span class="badge-pass">PASS</span> <span class="test-msg">${J.esc(line.replace(/PASS:?/g, '').trim())}</span></div>`;
      } else if (line.includes('FAIL')) {
        failCount++;
        return `<div class="test-row fail"><span class="badge-fail">FAIL</span> <span class="test-msg">${J.esc(line.replace(/FAIL:?/g, '').trim())}</span></div>`;
      }
      return `<div class="test-row info"><span>${J.esc(line)}</span></div>`;
    }).join('');

    const total = passCount + failCount;
    let summaryHtml = '';
    if (total > 0) {
      summaryHtml = `<div class="test-summary-card ${failCount === 0 ? 'all-pass' : 'has-fail'}">
        <div class="summary-left">
          <span class="summary-status-icon">${failCount === 0 ? '✓' : '✕'}</span>
          <span class="summary-text">${failCount === 0 ? 'All Test Vectors Passed' : 'Test Vector Discrepancy Detected'}</span>
        </div>
        <div class="summary-right">
          <span class="summary-pill">${passCount}/${total} Vectors Correct</span>
        </div>
      </div>`;
    }

    return summaryHtml + formattedRows;
  }

  async function runSubmit() {
    const J = window.EcrioniXProblems;
    const editor = qs('editor');
    const resultsPane = qs('pane-test-results');
    const compilePane = qs('pane-compile-output');
    const simLogPane = qs('pane-sim-log');
    const btn = qs('submit-btn');

    if (!currentUser) {
      btn.disabled = true;
      btn.textContent = 'Sign in...';
      if (resultsPane) {
        resultsPane.innerHTML = '<div class="notice-box info">Sign in with Google to run tests and save your points on the global leaderboard.</div>';
      }
      setResultTab('test-results');
      const user = await signInWithGoogle();
      btn.disabled = false;
      btn.textContent = 'Run Tests';
      if (!user) {
        if (resultsPane) {
          resultsPane.innerHTML = '<div class="notice-box warn">Sign-in was cancelled — sign in to compile and simulate RTL.</div>';
        }
        return;
      }
      if (resultsPane) {
        resultsPane.innerHTML = '<div class="notice-box ok">Signed in! Click "Run Tests" to execute.</div>';
      }
      return;
    }

    const combined = editor.value + '\n' + problem.hiddenTb;

    btn.disabled = true;
    btn.textContent = 'Running...';
    if (resultsPane) {
      resultsPane.innerHTML = '<div class="sim-loading"><span class="auth-spinner mini"></span> <span>Compiling RTL and simulating testbench on Icarus Verilog runner...</span></div>';
    }
    setResultTab('test-results');

    try {
      const res = await J.apiFetch(J.API, { code: combined }, (attempt, s) => {
        if (resultsPane) {
          resultsPane.innerHTML = `<div class="notice-box warn">Simulation container waking up — retrying in ${Math.round(s)}s... (attempt ${attempt + 1}/3)</div>`;
        }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const d = await res.json();

      lastCompileErr = d.stderr || '';
      lastRawStdout = d.stdout || '';

      // Populate Compilation Output Pane
      if (compilePane) {
        if (!d.success && d.stage === 'compile') {
          compilePane.innerHTML = `<div class="diag-card err"><div class="diag-header">❌ Compilation / Syntax Error</div><pre class="diag-pre">${J.esc(d.stderr || d.stdout)}</pre></div>`;
        } else {
          compilePane.innerHTML = `<div class="diag-card ok"><div class="diag-header">✓ Compilation Successful</div><pre class="diag-pre">${J.esc(d.stderr || 'Elaboration clean. 0 errors, 0 warnings.')}</pre></div>`;
        }
      }

      // Populate Simulation Log Pane
      if (simLogPane) {
        simLogPane.innerHTML = `<pre class="diag-pre">${J.esc(d.stdout || 'No simulation output recorded.')}</pre>`;
      }

      if (!d.success && d.stage === 'compile') {
        if (resultsPane) {
          resultsPane.innerHTML = `<div class="diag-card err"><div class="diag-header">❌ Compilation Failed</div><p style="font-size:0.85rem;margin:0 0 0.5rem 0;">Icarus Verilog reported syntax or port errors in your RTL module.</p><pre class="diag-pre">${J.esc(d.stderr || d.stdout)}</pre></div>`;
        }
        setResultTab('compile-output');
        showWaveform(null);
        if (currentUser) await J.bumpAttempt(currentUser, problem.slug);
      } else {
        showWaveform(d.vcd);
        const judged = J.parseJudgeStdout(d.stdout);
        if (judged.passed) {
          if (resultsPane) {
            resultsPane.innerHTML = `<div class="pass-box"><div class="pass-title">🎉 All Tests Passed!</div><div class="test-log">${formatTestResults(judged.log)}</div></div>`;
          }
          setResultTab('test-results');

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
          if (resultsPane) {
            resultsPane.innerHTML = `<div class="fail-box"><div class="fail-title">❌ Verification Failed — Inspect Discrepancies Below</div><div class="test-log">${formatTestResults(judged.log)}</div>${d.stderr ? `<pre class="diag-pre">${J.esc(d.stderr)}</pre>` : ''}</div>`;
          }
          setResultTab('test-results');
        }
      }
    } catch (e) {
      if (resultsPane) {
        resultsPane.innerHTML = `<div class="diag-card err"><div class="diag-header">── Connection Error ──</div><p style="font-size:0.85rem;margin:0 0 0.5rem;">${J.esc(e.message)}</p><span class="dim">Tip: The remote simulation container sleeps after inactivity — please click Run Tests again.</span></div>`;
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Run Tests';
    }
  }

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function drawShareCard(p, result) {
    const W = 1200, H = 630;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(1, '#0c1526');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 20, W * 0.85, H * 0.1, 420);
    glow.addColorStop(0, 'rgba(56,189,248,.18)');
    glow.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '700 30px Outfit, sans-serif';
    ctx.fillText('EcrioniX', 64, 76);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px Outfit, sans-serif';
    ctx.fillText('RTL Design & Verilog Problems', 220, 76);

    ctx.fillStyle = 'rgba(74,222,128,.14)';
    roundRect(ctx, 64, 130, 150, 42, 21);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.font = '700 18px Outfit, sans-serif';
    ctx.fillText('✅ SOLVED', 84, 157);

    const diffColors = { easy: ['rgba(74,222,128,.14)', '#4ade80'], medium: ['rgba(251,191,36,.14)', '#fbbf24'], hard: ['rgba(248,113,113,.14)', '#f87171'] };
    const [diffBg, diffFg] = diffColors[p.difficulty] || diffColors.easy;
    ctx.fillStyle = diffBg;
    roundRect(ctx, 230, 130, 130, 42, 21);
    ctx.fill();
    ctx.fillStyle = diffFg;
    ctx.font = '700 16px Outfit, sans-serif';
    ctx.fillText((p.difficulty || '').toUpperCase(), 254, 157);

    ctx.fillStyle = 'rgba(45,212,191,.14)';
    roundRect(ctx, 376, 130, 110, 42, 21);
    ctx.fill();
    ctx.fillStyle = '#2dd4bf';
    ctx.font = '700 16px Outfit, sans-serif';
    ctx.fillText(p.points + ' PTS', 398, 157);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 52px Outfit, sans-serif';
    wrapText(ctx, p.title, 64, 260, 1070, 62);

    const total = (window.ECRIONIX_PROBLEMS || []).length;
    const solvedCount = result && result.solvedCount ? result.solvedCount : null;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 24px Outfit, sans-serif';
    const statsLine = solvedCount ? `${solvedCount} of ${total} problems solved` : `Free, auto-graded Verilog problems`;
    ctx.fillText(statsLine, 64, H - 130);

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
    if (!problem) return;
    const k = getDraftKey();
    if (k) {
      try { localStorage.removeItem(k); } catch (_) {}
    }
    const ed = qs('editor');
    if (ed) ed.value = problem.starter;
    if (editorApi) editorApi.sync();
    showDraftBadge('Starter restored');
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

  function setFontSize(sizePx) {
    const edWrap = qs('editorWrap');
    if (!edWrap) return;
    edWrap.style.fontSize = sizePx + 'px';
    document.querySelectorAll('.font-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.size === String(sizePx));
    });
    try { localStorage.setItem('ecrionix_editor_font', sizePx); } catch (_) {}
  }

  function toggleFullscreen() {
    const layout = qs('solveLayout');
    const btn = qs('fullscreenBtn');
    if (!layout) return;
    const isFull = layout.classList.toggle('ide-fullscreen');
    if (btn) {
      btn.textContent = isFull ? '⛶ Exit' : '⛶ Fullscreen';
      btn.title = isFull ? 'Exit Fullscreen' : 'Fullscreen Editor';
    }
  }

  function setMobileTab(tabName) {
    document.querySelectorAll('.mob-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    const specCol = qs('specCol');
    const editorCol = qs('editorCol');

    if (window.innerWidth < 900) {
      if (tabName === 'spec') {
        if (specCol) specCol.style.display = 'block';
        if (editorCol) editorCol.style.display = 'none';
      } else if (tabName === 'code') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
      } else if (tabName === 'waveform') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
        setResultTab('waveform');
      } else if (tabName === 'output') {
        if (specCol) specCol.style.display = 'none';
        if (editorCol) editorCol.style.display = 'block';
        setResultTab('test-results');
      }
    } else {
      if (specCol) specCol.style.display = 'block';
      if (editorCol) editorCol.style.display = 'block';
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
    
    if (p.circuitSvg) {
      wrap.innerHTML = `<div class="circuit-card"><div class="circuit-title">📐 Circuit Schematic Diagram</div>${p.circuitSvg}</div>`;
      wrap.style.display = 'block';
      return;
    }

    let svg = '';
    const slug = p.slug || '';
    if (slug.includes('and-gate')) {
      svg = `<svg viewBox="0 0 520 130" class="circuit-svg"><line x1="140" y1="46" x2="210" y2="46" stroke="#38bdf8" stroke-width="2.5"/><line x1="140" y1="84" x2="210" y2="84" stroke="#38bdf8" stroke-width="2.5"/><path d="M 210,28 L 260,28 A 37 37 0 0 1 260,102 L 210,102 Z" stroke="#38bdf8" stroke-width="2.5" fill="rgba(56,189,248,0.08)"/><line x1="297" y1="65" x2="380" y2="65" stroke="#2dd4bf" stroke-width="2.5"/><text x="128" y="50" fill="#94a3b8" font-size="12" font-family="'JetBrains Mono',monospace" text-anchor="end">a</text><text x="128" y="88" fill="#94a3b8" font-size="12" font-family="'JetBrains Mono',monospace" text-anchor="end">b</text><text x="392" y="69" fill="#2dd4bf" font-size="12" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">out</text><text x="235" y="69" fill="#64748b" font-size="11" text-anchor="middle">AND</text></svg>`;
    } else if (slug.includes('not-gate') || slug.includes('inverter')) {
      svg = `<svg viewBox="0 0 520 130" class="circuit-svg"><line x1="140" y1="65" x2="210" y2="65" stroke="#38bdf8" stroke-width="2.5"/><polygon points="210,30 290,65 210,100" stroke="#38bdf8" stroke-width="2.5" fill="rgba(56,189,248,0.08)"/><circle cx="297" cy="65" r="7" stroke="#38bdf8" stroke-width="2.5" fill="none"/><line x1="304" y1="65" x2="375" y2="65" stroke="#2dd4bf" stroke-width="2.5"/><text x="128" y="69" fill="#94a3b8" font-size="12" font-family="'JetBrains Mono',monospace" text-anchor="end">in</text><text x="388" y="69" fill="#2dd4bf" font-size="12" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">out</text><text x="240" y="69" fill="#64748b" font-size="11" text-anchor="middle">NOT</text></svg>`;
    } else if (slug.includes('mux2to1')) {
      svg = `<svg viewBox="0 0 680 140" class="circuit-svg"><line x1="185" y1="45" x2="240" y2="45" stroke="#38bdf8" stroke-width="2.5"/><text x="175" y="49" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">a</text><line x1="185" y1="95" x2="240" y2="95" stroke="#38bdf8" stroke-width="2.5"/><text x="175" y="99" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">b</text><line x1="340" y1="130" x2="340" y2="105" stroke="#fbbf24" stroke-width="2.5"/><text x="340" y="138" fill="#fbbf24" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="middle">sel</text><polygon points="240,25 440,45 440,95 240,115" stroke="#38bdf8" stroke-width="2.5" fill="rgba(56,189,248,0.06)"/><line x1="440" y1="70" x2="495" y2="70" stroke="#2dd4bf" stroke-width="2.5"/><text x="505" y="74" fill="#2dd4bf" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">out</text><text x="330" y="74" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">2:1 MUX</text></svg>`;
    } else if (slug.includes('dff')) {
      svg = `<svg viewBox="0 0 680 140" class="circuit-svg"><rect x="240" y="25" width="200" height="90" rx="8" stroke="#a78bfa" stroke-width="2.5" fill="rgba(167,139,250,0.06)"/><line x1="185" y1="50" x2="240" y2="50" stroke="#38bdf8" stroke-width="2"/><text x="175" y="54" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">d</text><line x1="185" y1="90" x2="240" y2="90" stroke="#38bdf8" stroke-width="2"/><path d="M 240,84 L 248,90 L 240,96" stroke="#38bdf8" stroke-width="2" fill="none"/><text x="175" y="94" fill="#38bdf8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">&gt;clk</text><line x1="340" y1="130" x2="340" y2="120" stroke="#f43f5e" stroke-width="2"/><circle cx="340" cy="116.5" r="3.5" stroke="#f43f5e" stroke-width="2" fill="none"/><text x="340" y="138" fill="#f43f5e" font-size="10" font-family="'JetBrains Mono',monospace" text-anchor="middle">rst_n</text><line x1="440" y1="50" x2="495" y2="50" stroke="#2dd4bf" stroke-width="2.5"/><text x="505" y="54" fill="#2dd4bf" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">q</text><text x="340" y="74" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">D-FLIP FLOP</text></svg>`;
    } else if (slug.includes('fifo')) {
      svg = `<svg viewBox="0 0 720 150" class="circuit-svg"><rect x="240" y="22" width="210" height="100" rx="8" stroke="#f472b6" stroke-width="2.5" fill="rgba(244,114,182,0.06)"/><line x1="185" y1="40" x2="240" y2="40" stroke="#38bdf8" stroke-width="2"/><text x="175" y="44" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">din[7:0]</text><line x1="185" y1="70" x2="240" y2="70" stroke="#38bdf8" stroke-width="2"/><text x="175" y="74" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">wr_en</text><line x1="185" y1="100" x2="240" y2="100" stroke="#38bdf8" stroke-width="2"/><text x="175" y="104" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">rd_en</text><line x1="450" y1="40" x2="505" y2="40" stroke="#2dd4bf" stroke-width="2.5"/><text x="515" y="44" fill="#2dd4bf" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">dout[7:0]</text><line x1="450" y1="70" x2="505" y2="70" stroke="#4ade80" stroke-width="2.5"/><text x="515" y="74" fill="#4ade80" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">full</text><line x1="450" y1="100" x2="505" y2="100" stroke="#4ade80" stroke-width="2.5"/><text x="515" y="104" fill="#4ade80" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">empty</text><text x="345" y="72" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">SYNCHRONOUS FIFO</text></svg>`;
    } else if (slug.includes('apb') || slug.includes('axi')) {
      svg = `<svg viewBox="0 0 720 150" class="circuit-svg"><rect x="240" y="22" width="210" height="100" rx="8" stroke="#38bdf8" stroke-width="2.5" fill="rgba(56,189,248,0.06)"/><line x1="185" y1="36" x2="240" y2="36" stroke="#38bdf8" stroke-width="2"/><text x="175" y="40" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">psel</text><line x1="185" y1="62" x2="240" y2="62" stroke="#38bdf8" stroke-width="2"/><text x="175" y="66" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">penable</text><line x1="185" y1="88" x2="240" y2="88" stroke="#38bdf8" stroke-width="2"/><text x="175" y="92" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">pwrite</text><line x1="185" y1="112" x2="240" y2="112" stroke="#38bdf8" stroke-width="2"/><text x="175" y="116" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono',monospace" text-anchor="end">paddr</text><line x1="450" y1="52" x2="505" y2="52" stroke="#2dd4bf" stroke-width="2.5"/><text x="515" y="56" fill="#2dd4bf" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">prdata</text><line x1="450" y1="90" x2="505" y2="90" stroke="#4ade80" stroke-width="2.5"/><text x="515" y="94" fill="#4ade80" font-size="11" font-weight="700" font-family="'JetBrains Mono',monospace" text-anchor="start">pready</text><text x="345" y="74" fill="#e2e8f0" font-size="13" font-weight="700" text-anchor="middle">AMBA APB CONTROLLER</text></svg>`;
    }

    if (svg) {
      wrap.innerHTML = `<div class="circuit-card"><div class="circuit-title">📐 Circuit Schematic Diagram</div>${svg}</div>`;
      wrap.style.display = 'block';
    } else {
      wrap.style.display = 'none';
    }
  }

  function renderTimingConstraints(p) {
    const wrap = qs('timingWrap');
    if (!wrap) return;
    if (p.timingReqs || p.constraints) {
      const esc = window.EcrioniXProblems?.esc || (s => String(s || ''));
      wrap.innerHTML = `
        <div class="timing-card">
          <div class="timing-title">⚡ Timing &amp; Synthesizability Constraints</div>
          <div class="timing-body">
            <p><strong>Timing Contract:</strong> ${esc(p.timingReqs || 'Standard zero-delay functional timing.')}</p>
            <p><strong>RTL Constraints:</strong> ${esc(p.constraints || 'Synthesizable Verilog-2001. No #delays.')}</p>
          </div>
        </div>
      `;
      wrap.style.display = 'block';
    } else {
      wrap.style.display = 'none';
    }
  }

  function renderHints(p) {
    const wrap = qs('hintsWrap');
    if (!wrap) return;
    const hints = p.hints || [];
    if (!hints.length) {
      wrap.style.display = 'none';
      return;
    }
    const esc = window.EcrioniXProblems?.esc || (s => String(s || ''));
    const titles = [
      'Hint 1: Conceptual Direction & Primitives',
      'Hint 2: Implementation Architecture & Approach',
      'Hint 3: Edge Cases, Timing & Verilog Syntax'
    ];
    let itemsHtml = '';
    hints.forEach((h, idx) => {
      itemsHtml += `
        <details class="hint-item">
          <summary class="hint-summary"><span>${titles[idx] || ('Hint ' + (idx + 1))}</span></summary>
          <div class="hint-body">${esc(h)}</div>
        </details>
      `;
    });

    wrap.innerHTML = `
      <div class="hints-accordion">
        <div class="hints-header">
          <span>💡 Need Guidance? Progressive Hints (${hints.length} Levels)</span>
        </div>
        ${itemsHtml}
      </div>
    `;
    wrap.style.display = 'block';
  }

  function renderSolutionDrawer(p) {
    const wrap = qs('solutionWrap');
    if (!wrap) return;
    if (!p.referenceRtl) {
      wrap.style.display = 'none';
      return;
    }
    const esc = window.EcrioniXProblems?.esc || (s => String(s || ''));
    wrap.innerHTML = `
      <details class="solution-drawer">
        <summary class="solution-summary">
          <span>🔒 Reveal Verified Reference RTL Solution (Click to expand)</span>
        </summary>
        <div class="solution-content">
          <div class="solution-warn">
            ⚠️ <b>Self-Discovery Warning:</b> Try solving and simulating first! Viewing the verified reference implementation will bypass the real debugging experience.
          </div>
          <div class="solution-code-bar">
            <span class="solution-tag">Verified Synthesizable RTL</span>
            <button type="button" class="ide-tool-btn" id="copySolutionBtn">Copy Solution</button>
          </div>
          <pre class="solution-pre"><code>${esc(p.referenceRtl)}</code></pre>
        </div>
      </details>
    `;
    wrap.style.display = 'block';

    const copyBtn = qs('copySolutionBtn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(p.referenceRtl).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Solution'; }, 1800);
        }).catch(() => {});
      };
    }
  }

  function initSplitter() {
    const gutter = qs('splitGutterH');
    const layout = qs('solveLayout');
    if (!gutter || !layout) return;

    let isDragging = false;
    gutter.addEventListener('mousedown', e => {
      isDragging = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const rect = layout.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const pct = Math.max(25, Math.min(75, (offset / rect.width) * 100));
      layout.style.gridTemplateColumns = `${pct}% 10px calc(${100 - pct}% - 10px)`;
      try { localStorage.setItem('ecrionix_h_split', pct); } catch (_) {}
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });

    // Restore saved split
    try {
      const saved = localStorage.getItem('ecrionix_h_split');
      if (saved && window.innerWidth >= 900) {
        layout.style.gridTemplateColumns = `${saved}% 10px calc(${100 - saved}% - 10px)`;
      }
    } catch (_) {}
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
    renderTimingConstraints(problem);
    renderHints(problem);
    renderSolutionDrawer(problem);

    const editorEl = qs('editor');
    if (editorEl) {
      // Check saved draft
      const k = getDraftKey();
      let restored = false;
      if (k) {
        try {
          const draft = localStorage.getItem(k);
          if (draft) {
            editorEl.value = draft;
            restored = true;
          }
        } catch (_) {}
      }
      if (!restored) {
        editorEl.value = problem.starter;
      }
      if (restored) showDraftBadge('Restored from draft');
    }

    if (window.EcrioniXProblems?.wireEditor) {
      editorApi = window.EcrioniXProblems.wireEditor('editor', 'hl-layer', 'gutter-layer', {
        onRun: runSubmit,
        onSave: (code) => saveDraft(code),
        onInput: (code) => saveDraft(code)
      });
    }

    // Restore saved font size
    try {
      const savedFont = localStorage.getItem('ecrionix_editor_font');
      if (savedFont) setFontSize(Number(savedFont));
    } catch (_) {}

    paintExpectedWave();
    initSplitter();

    if (qs('submit-btn')) qs('submit-btn').onclick = runSubmit;
    if (qs('resetBtn')) qs('resetBtn').onclick = resetCode;
    if (qs('copyBtn')) qs('copyBtn').onclick = copyCode;
    if (qs('fullscreenBtn')) qs('fullscreenBtn').onclick = toggleFullscreen;

    // Font size selector clicks
    document.querySelectorAll('.font-btn').forEach(btn => {
      btn.onclick = () => setFontSize(Number(btn.dataset.size));
    });

    // Results panel tab switcher clicks
    document.querySelectorAll('.res-tab-btn').forEach(btn => {
      btn.onclick = () => setResultTab(btn.dataset.tab);
    });

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
        if (specCol) specCol.style.display = 'block';
        if (editorCol) editorCol.style.display = 'block';
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
