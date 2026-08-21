/* Bootstraps a /problems/<slug>/ solve page from EcrioniXProblemCatalog */
(function () {
  'use strict';

  const ADMIN_UID = 'aUH4VdmtHKZQbFqXJqCOcQRNVOG2';
  let currentUser = null;
  let problem = null;
  let editorApi = null;

  function qs(id) { return document.getElementById(id); }

  function showWaveform(vcdText) {
    const wrap = qs('waveform-wrap');
    if (!wrap) return;
    if (!vcdText || !problem) { wrap.style.display = 'none'; return; }
    const J = window.EcrioniXProblems;
    const signals = problem.waveSignals || [];
    const events = J.parseVCDSignals(vcdText, signals);
    const allTimes = signals.flatMap(n => (events[n] || []).map(e => e.time));
    const endTime = Math.max(3, ...(allTimes.length ? allTimes : [0])) + 1;
    qs('waveform-svg').innerHTML = J.renderTimingDiagram(events, signals, endTime);
    wrap.style.display = 'block';
  }

  function paintExpectedWave() {
    const host = qs('wd-expected');
    if (!host || !problem || !problem.wavedrom || typeof WaveDrom === 'undefined') return;
    host.innerHTML = '';
    try {
      WaveDrom.RenderWaveForm(0, JSON.parse(JSON.stringify(problem.wavedrom)), 'wd-expected-');
      // RenderWaveForm looks up prefix+index → rename mount
    } catch (e) {
      // fallback: use ProcessAll-style mount
      host.id = 'wd-expected-0';
      try { WaveDrom.RenderWaveForm(0, JSON.parse(JSON.stringify(problem.wavedrom)), 'wd-expected-'); }
      catch (err) { host.innerHTML = '<div class="empty-state">Expected waveform unavailable.</div>'; }
    }
  }

  async function runSubmit() {
    const J = window.EcrioniXProblems;
    const editor = qs('editor');
    const out = qs('console');
    const btn = qs('submit-btn');
    const combined = editor.value + '\n' + problem.hiddenTb;

    btn.disabled = true;
    btn.textContent = 'Running...';
    out.innerHTML = '<span class="info">Connecting to simulation server...</span>\n';

    try {
      const res = await J.apiFetch(J.API, { code: combined }, (attempt, s) => {
        out.innerHTML = `<span class="warn">Server waking up — retrying in ${Math.round(s)}s... (attempt ${attempt + 1}/3)</span>`;
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const d = await res.json();

      if (!d.success && d.stage === 'compile') {
        out.innerHTML = `<span class="err">── Compile Error ──────────────────────\n${J.esc(d.stderr)}</span>`;
        showWaveform(null);
        if (currentUser) await J.bumpAttempt(currentUser, problem.slug);
      } else {
        showWaveform(d.vcd);
        const judged = J.parseJudgeStdout(d.stdout);
        if (judged.passed) {
          out.innerHTML = `<span class="ok">✅ All tests passed!\n\n${J.esc(judged.log)}</span>`;
          const result = await J.recordSolve(currentUser, problem.slug, problem.difficulty);
          qs('solvedBadge').style.display = 'inline-block';
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
          out.innerHTML = `<span class="err">❌ Not quite — check the log below.\n\n${J.esc(judged.log)}</span>${d.stderr ? `\n<span class="warn">${J.esc(d.stderr)}</span>` : ''}`;
        }
      }
    } catch (e) {
      out.innerHTML = `<span class="err">── Error ───────────────────────────────\n${J.esc(e.message)}\n</span><span class="dim">Tip: the simulation server starts after inactivity — click Run again.</span>`;
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

    // Soft accent glow blobs
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
    ctx.fillText('Verilog Problems', 220, 76);

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

    // Title (wrapped)
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

  async function markSolvedIfDone(user) {
    try {
      const doc = await firebase.firestore().collection('users').doc(user.uid).get();
      const done = doc.data()?.completedChallenges || [];
      if (done.includes(problem.slug)) qs('solvedBadge').style.display = 'inline-block';
    } catch (_) { /* ignore */ }
  }

  function bootUI() {
    qs('authLoading').style.display = 'none';
    qs('pageContent').style.display = 'block';

    qs('problemTitle').textContent = problem.title;
    qs('problemLede').textContent = problem.lede;
    qs('diffBadge').textContent = problem.difficulty;
    qs('diffBadge').className = 'diff-badge ' + problem.difficulty;
    qs('pointsBadge').textContent = problem.points + ' pts';
    qs('categoryLabel').textContent = problem.category;
    qs('specBox').innerHTML = 'Write a module named <code>top_module</code> that matches the ports below <b>exactly</b>. Hidden tests instantiate your module and check behaviour.';
    qs('conceptBox').innerHTML = problem.concept || '';
    if (!problem.concept) qs('conceptBox').style.display = 'none';
    qs('portsWrap').innerHTML = problem.portsHtml || '';
    qs('editor').value = problem.starter;
    editorApi = window.EcrioniXProblems.wireEditor('editor', 'hl-layer');

    // Expected WaveDrom: mount id must be prefix+0
    const wdHost = qs('wd-expected-0');
    if (wdHost && problem.wavedrom && typeof WaveDrom !== 'undefined') {
      try {
        WaveDrom.RenderWaveForm(0, JSON.parse(JSON.stringify(problem.wavedrom)), 'wd-expected-');
      } catch (e) {
        console.warn(e);
      }
    }

    qs('submit-btn').onclick = runSubmit;
    qs('resetBtn').onclick = resetCode;
  }

  window.EcrioniXBootProblem = function (slug) {
    problem = window.EcrioniXProblemCatalog.getProblem(slug);
    if (!problem) {
      document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">Problem not found. <a href="/problems/">Back</a></p>';
      return;
    }

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        window.location.href = '/premium-course/';
        return;
      }
      currentUser = user;
      bootUI();
      if (window.EcrioniXProblems?.ensureLeaderboardMember) {
        window.EcrioniXProblems.ensureLeaderboardMember(user);
      }
      await markSolvedIfDone(user);
    });
  };
})();
