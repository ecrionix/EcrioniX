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
      await markSolvedIfDone(user);
    });
  };
})();
