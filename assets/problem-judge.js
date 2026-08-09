/* EcrioniX Problems — shared judge, VCD, editor highlight, Firestore progress */
(function (global) {
  'use strict';

  const API = 'https://ecrionix-ecrionix-verilog.hf.space/run';
  const POINTS = { easy: 10, medium: 25, hard: 50 };

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  async function apiFetch(url, body, onProgress) {
    const TIMEOUTS = [8000, 80000, 80000];
    const WAITS = [12000, 20000, 30000];
    let lastErr;
    for (let attempt = 0; attempt < TIMEOUTS.length; attempt++) {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), TIMEOUTS[attempt]);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: ctrl.signal
        });
        clearTimeout(tid);
        return res;
      } catch (e) {
        clearTimeout(tid);
        lastErr = e;
        if (attempt < TIMEOUTS.length - 1) {
          if (onProgress) onProgress(attempt, WAITS[attempt] / 1000);
          await new Promise(r => setTimeout(r, WAITS[attempt]));
        }
      }
    }
    throw lastErr;
  }

  function parseJudgeStdout(stdout) {
    const raw = (stdout || '')
      .split('\n')
      .filter(line => !/\$finish called/.test(line))
      .join('\n')
      .trim();
    const passed = raw.includes('ALL_TESTS_PASSED');
    const failed = raw.includes('TEST_FAILED');
    const log = raw.replace('ALL_TESTS_PASSED', '').replace('TEST_FAILED', '').trim();
    return { passed, failed, log, raw };
  }

  function parseVCDSignals(vcdText, wantedNames) {
    const nameToId = {};
    const idToName = {};
    const events = {};
    wantedNames.forEach(n => { events[n] = []; });

    let inDefs = true;
    let time = 0;
    for (const raw of (vcdText || '').split('\n')) {
      const l = raw.trim();
      if (!l) continue;
      if (l.startsWith('$var')) {
        const m = l.match(/^\$var\s+\S+\s+\d+\s+(\S+)\s+(\S+)/);
        if (m) {
          const [, id, name] = m;
          if (wantedNames.includes(name) && !nameToId[name]) {
            nameToId[name] = id;
            idToName[id] = name;
          }
        }
        continue;
      }
      if (l === '$enddefinitions $end') { inDefs = false; continue; }
      if (inDefs) continue;
      if (l.startsWith('#')) { time = parseInt(l.slice(1), 10) || 0; continue; }
      if (l.startsWith('$')) continue;

      let m = l.match(/^([01xzXZ])(\S+)$/);
      if (m) {
        const name = idToName[m[2]];
        if (name) events[name].push({ time, value: m[1].toLowerCase() });
        continue;
      }
      m = l.match(/^b([01xzXZ]+)\s+(\S+)$/);
      if (m) {
        const name = idToName[m[2]];
        if (name) events[name].push({ time, value: (m[1].slice(-1) || '0').toLowerCase() });
      }
    }
    return events;
  }

  function renderTimingDiagram(events, signalOrder, endTime) {
    const cellW = 70, laneH = 46, labelW = 72, topPad = 24, botPad = 34;
    const hiY = 12, loY = 34;
    const width = labelW + (endTime + 1) * cellW + 20;
    const height = topPad + signalOrder.length * laneH + botPad;
    const yFor = v => (v === '1' ? hiY : loY);

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="'JetBrains Mono',monospace">`;
    for (let t = 0; t <= endTime; t++) {
      const x = labelW + t * cellW;
      svg += `<line x1="${x}" y1="${topPad - 6}" x2="${x}" y2="${height - botPad + 6}" stroke="#1e2b40" stroke-width="1"/>`;
      svg += `<text x="${x}" y="${height - botPad + 20}" font-size="10" fill="#64748b" text-anchor="middle">${t}ns</text>`;
    }
    signalOrder.forEach((name, idx) => {
      const laneTop = topPad + idx * laneH;
      const evs = (events[name] || []).slice().sort((a, b) => a.time - b.time);
      svg += `<text x="8" y="${laneTop + 27}" font-size="12" fill="#e2e8f0" font-weight="700">${esc(name)}</text>`;
      if (!evs.length) return;
      let prevVal = evs[0].value;
      let d = `M ${labelW} ${laneTop + yFor(prevVal)}`;
      for (let i = 1; i < evs.length; i++) {
        const xAt = labelW + evs[i].time * cellW;
        d += ` L ${xAt} ${laneTop + yFor(prevVal)} L ${xAt} ${laneTop + yFor(evs[i].value)}`;
        prevVal = evs[i].value;
      }
      d += ` L ${labelW + endTime * cellW} ${laneTop + yFor(prevVal)}`;
      svg += `<path d="${d}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linejoin="round"/>`;
    });
    svg += '</svg>';
    return svg;
  }

  function pointsFor(difficulty) {
    const d = String(difficulty || 'easy').toLowerCase();
    return POINTS[d] || POINTS.easy;
  }

  function recomputeStats(completedSlugs) {
    const catalog = global.ECRIONIX_PROBLEMS || [];
    let points = 0;
    const list = Array.isArray(completedSlugs) ? completedSlugs : [];
    list.forEach(slug => {
      const p = catalog.find(x => x.slug === slug);
      if (p) points += Number(p.points) || pointsFor(p.difficulty);
      else points += POINTS.easy;
    });
    return { solvedCount: list.length, points };
  }

  async function upsertLeaderboard(user, data, solvedCount, points) {
    const displayName = user.displayName || data.displayName || data.name || 'Member';
    const photoURL = user.photoURL || data.photoURL || null;
    await firebase.firestore().collection('leaderboard').doc(user.uid).set({
      uid: user.uid,
      name: displayName,
      photoURL,
      solvedCount,
      points,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return { displayName, photoURL };
  }

  /** Ensure every signed-in user appears on the leaderboard (0 pts until they solve). */
  async function ensureLeaderboardMember(user) {
    if (!user || !global.firebase) return null;
    try {
      const db = firebase.firestore();
      const uref = db.collection('users').doc(user.uid);
      let data = {};
      try {
        const snap = await uref.get();
        data = snap.data() || {};
      } catch (_) { /* may not have a user doc yet */ }

      const done = Array.isArray(data.completedChallenges) ? data.completedChallenges : [];
      const stats = recomputeStats(done);
      const displayName = user.displayName || data.displayName || data.name || 'Member';
      const photoURL = user.photoURL || data.photoURL || null;

      // Keep user profile name in sync for board display
      try {
        await uref.set({
          displayName,
          photoURL,
          email: user.email || data.email || null,
          problemStats: {
            solvedCount: stats.solvedCount,
            points: stats.points,
            lastSolvedAt: data.problemStats?.lastSolvedAt || null
          }
        }, { merge: true });
      } catch (_) { /* ignore */ }

      const lref = db.collection('leaderboard').doc(user.uid);
      let existing = null;
      try {
        const lsnap = await lref.get();
        existing = lsnap.exists ? lsnap.data() : null;
      } catch (_) { /* ignore */ }

      const points = Math.max(stats.points, existing?.points || 0);
      const solvedCount = Math.max(stats.solvedCount, existing?.solvedCount || 0);

      await lref.set({
        uid: user.uid,
        name: displayName,
        photoURL,
        solvedCount,
        points,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      return { solvedCount, points, displayName };
    } catch (err) {
      console.warn('ensureLeaderboardMember failed:', err);
      return null;
    }
  }

  async function recordSolve(user, slug, difficulty) {
    if (!user || !global.firebase) return { firstSolve: false, points: 0 };
    try {
      const db = firebase.firestore();
      const uref = db.collection('users').doc(user.uid);
      const snap = await uref.get();
      const data = snap.data() || {};
      const done = Array.isArray(data.completedChallenges) ? data.completedChallenges.slice() : [];
      const firstSolve = !done.includes(slug);
      const pts = pointsFor(difficulty);

      const attemptId = `${user.uid}_${slug}`;
      const attemptRef = db.collection('problemAttempts').doc(attemptId);
      let prevAttempts = 0;
      try {
        const attemptSnap = await attemptRef.get();
        prevAttempts = attemptSnap.exists ? (attemptSnap.data().attempts || 0) : 0;
      } catch (_) { /* ignore */ }

      try {
        await attemptRef.set({
          uid: user.uid,
          slug,
          attempts: prevAttempts + 1,
          passed: true,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('problemAttempts write failed:', err);
      }

      if (firstSolve) done.push(slug);
      const stats = recomputeStats(done);

      await uref.set({
        completedChallenges: firstSolve
          ? firebase.firestore.FieldValue.arrayUnion(slug)
          : done,
        displayName: user.displayName || data.displayName || data.name || 'Member',
        photoURL: user.photoURL || data.photoURL || null,
        problemStats: {
          solvedCount: stats.solvedCount,
          points: stats.points,
          lastSolvedAt: firebase.firestore.FieldValue.serverTimestamp()
        }
      }, { merge: true });

      try {
        await upsertLeaderboard(user, data, stats.solvedCount, stats.points);
      } catch (err) {
        console.warn('leaderboard write failed:', err);
      }

      return {
        firstSolve,
        points: firstSolve ? pts : 0,
        solvedCount: stats.solvedCount,
        totalPoints: stats.points
      };
    } catch (err) {
      console.error('recordSolve failed:', err);
      return { firstSolve: false, points: 0, error: err };
    }
  }

  async function bumpAttempt(user, slug) {
    if (!user || !global.firebase) return;
    try {
      const attemptId = `${user.uid}_${slug}`;
      const ref = firebase.firestore().collection('problemAttempts').doc(attemptId);
      let prev = 0;
      let passed = false;
      try {
        const snap = await ref.get();
        prev = snap.exists ? (snap.data().attempts || 0) : 0;
        passed = snap.exists ? !!snap.data().passed : false;
      } catch (_) { /* ignore */ }
      await ref.set({
        uid: user.uid,
        slug,
        attempts: prev + 1,
        passed,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('bumpAttempt failed:', err);
    }
  }

  /* ── Syntax highlight ── */
  const KW_MOD = new Set(['module', 'endmodule', 'macromodule', 'primitive', 'endprimitive', 'task', 'endtask', 'function', 'endfunction', 'generate', 'endgenerate']);
  const KW_TYPE = new Set(['input', 'output', 'inout', 'wire', 'reg', 'logic', 'integer', 'real', 'time', 'realtime', 'parameter', 'localparam', 'defparam', 'signed', 'unsigned', 'supply0', 'supply1', 'tri', 'triand', 'trior', 'tri0', 'tri1', 'wor', 'wand', 'bit', 'byte', 'int', 'shortint', 'longint', 'string', 'genvar', 'event']);
  const KW_CTRL = new Set(['always', 'always_ff', 'always_comb', 'always_latch', 'initial', 'begin', 'end', 'if', 'else', 'case', 'casex', 'casez', 'endcase', 'for', 'foreach', 'while', 'forever', 'repeat', 'do', 'fork', 'join', 'join_any', 'join_none', 'disable', 'assign', 'deassign', 'force', 'release', 'wait', 'return', 'break', 'continue', 'unique', 'priority']);
  const KW_EDGE = new Set(['posedge', 'negedge', 'or', 'and', 'not', 'nand', 'nor', 'xor', 'xnor', 'buf', 'bufif0', 'bufif1', 'notif0', 'notif1', 'pullup', 'pulldown']);

  function hlEsc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function kwSpan(w) {
    if (KW_MOD.has(w)) return `<span class="hl-mod">${w}</span>`;
    if (KW_TYPE.has(w)) return `<span class="hl-type">${w}</span>`;
    if (KW_CTRL.has(w)) return `<span class="hl-ctrl">${w}</span>`;
    if (KW_EDGE.has(w)) return `<span class="hl-edge">${w}</span>`;
    return null;
  }
  function hlLine(line) {
    let out = '', i = 0;
    while (i < line.length) {
      const ch = line[i];
      if (ch === '/' && line[i + 1] === '/') { out += `<span class="hl-cmt">${hlEsc(line.slice(i))}</span>`; break; }
      if (ch === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') { if (line[j] === '\\') j++; j++; }
        out += `<span class="hl-str">${hlEsc(line.slice(i, j + 1))}</span>`;
        i = j + 1; continue;
      }
      if (ch === '$') {
        let j = i + 1;
        while (j < line.length && /\w/.test(line[j])) j++;
        out += `<span class="hl-sys">${hlEsc(line.slice(i, j))}</span>`;
        i = j; continue;
      }
      if (ch === '`') {
        let j = i + 1;
        while (j < line.length && /\w/.test(line[j])) j++;
        out += `<span class="hl-pre">${hlEsc(line.slice(i, j))}</span>`;
        i = j; continue;
      }
      if (/[0-9]/.test(ch)) {
        const m = line.slice(i).match(/^(\d+'[bBoOhHdD][0-9a-fA-FxXzZ_]+|\d[\d_]*)/);
        if (m) { out += `<span class="hl-num">${hlEsc(m[0])}</span>`; i += m[0].length; continue; }
      }
      if (/[a-zA-Z_]/.test(ch)) {
        let j = i;
        while (j < line.length && /[\w$]/.test(line[j])) j++;
        const word = line.slice(i, j);
        out += kwSpan(word) || hlEsc(word);
        i = j; continue;
      }
      const opMatch = line.slice(i).match(/^(<=|>=|===|!==|==|!=|&&|\|\||<<|>>|\+=|-=|=>|=)/);
      if (opMatch) {
        out += `<span class="hl-op">${hlEsc(opMatch[0])}</span>`;
        i += opMatch[0].length; continue;
      }
      out += hlEsc(ch); i++;
    }
    return out;
  }
  function highlight(code) { return code.split('\n').map(hlLine).join('\n'); }

  function wireEditor(editorId, hlId) {
    const ed = document.getElementById(editorId);
    const hl = document.getElementById(hlId);
    if (!ed || !hl) return;
    const sync = () => { hl.innerHTML = highlight(ed.value) + '\n'; };
    sync();
    ed.addEventListener('input', sync);
    ed.addEventListener('scroll', () => { hl.scrollTop = ed.scrollTop; hl.scrollLeft = ed.scrollLeft; });
    ed.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ed.selectionStart, end = ed.selectionEnd;
        ed.value = ed.value.slice(0, start) + '  ' + ed.value.slice(end);
        ed.selectionStart = ed.selectionEnd = start + 2;
        sync();
      }
    });
    return { sync };
  }

  global.EcrioniXProblems = {
    API,
    POINTS,
    esc,
    apiFetch,
    parseJudgeStdout,
    parseVCDSignals,
    renderTimingDiagram,
    pointsFor,
    recomputeStats,
    upsertLeaderboard,
    ensureLeaderboardMember,
    recordSolve,
    bumpAttempt,
    highlight,
    wireEditor
  };
})(typeof window !== 'undefined' ? window : globalThis);
