/* 8-deep async FIFO visual model — Gray pointers + 2FF, Cummings-style flags. */
(function () {
  'use strict';
  var DEPTH = 8, PTRM = 15, ADDRM = 7;

  function bin2gray(n) { return (n ^ (n >> 1)) & PTRM; }
  function gray2bin(g) {
    var b = g & PTRM;
    b ^= b >> 1; b ^= b >> 2;
    return b & PTRM;
  }
  function invert2(g) { return (((~g) & 0xC) | (g & 0x3)) & PTRM; }

  window.initFifoLab = function () {
    var canvas = document.getElementById('fifoCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var wbin = 0, rbin = 0, wgray = 0, rgray = 0;
    var wq1 = 0, wq2 = 0, rq1 = 0, rq2 = 0;
    var mem = [null, null, null, null, null, null, null, null];
    var nextData = 1, playing = false, tick = 0, timer = null;
    var overflowAttempts = 0, underflowAttempts = 0;

    function occ() { return (wbin - rbin) & PTRM; }

    function isFull() {
      return bin2gray((wbin + 1) & PTRM) === invert2(wq2);
    }
    function isEmpty() {
      return rgray === rq2;
    }

    function stepWrite(want) {
      if (want && isFull()) overflowAttempts++;
      if (want && !isFull()) {
        mem[wbin & ADDRM] = nextData++;
        wbin = (wbin + 1) & PTRM;
        wgray = bin2gray(wbin);
      }
      wq2 = wq1;
      wq1 = rgray;
    }
    function stepRead(want) {
      if (want && isEmpty()) underflowAttempts++;
      if (want && !isEmpty()) {
        mem[rbin & ADDRM] = null;
        rbin = (rbin + 1) & PTRM;
        rgray = bin2gray(rbin);
      }
      rq2 = rq1;
      rq1 = wgray;
    }

    function roundRect(x, y, w, h, r) {
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
      else { ctx.beginPath(); ctx.rect(x, y, w, h); }
    }

    function draw() {
      var o = occ();
      var full = isFull();
      var empty = isEmpty();
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, 720, 420);
      var i;
      for (i = 0; i < DEPTH; i++) {
        var x = 40 + i * 82, y = 88;
        ctx.fillStyle = mem[i] != null ? '#0f766e' : '#1e293b';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        roundRect(x, y, 70, 56, 8);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '16px Outfit,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mem[i] == null ? '—' : String(mem[i]), x + 35, y + 34);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Outfit,sans-serif';
        ctx.fillText(String(i), x + 35, y + 74);
      }
      var wx = 40 + (wbin & ADDRM) * 82 + 35;
      var rx = 40 + (rbin & ADDRM) * 82 + 35;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.moveTo(wx, 78); ctx.lineTo(wx - 7, 64); ctx.lineTo(wx + 7, 64); ctx.fill();
      ctx.font = '13px Outfit,sans-serif'; ctx.fillText('WR', wx, 56);
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath(); ctx.moveTo(rx, 160); ctx.lineTo(rx - 7, 174); ctx.lineTo(rx + 7, 174); ctx.fill();
      ctx.fillText('RD', rx, 192);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13px JetBrains Mono,monospace';
      ctx.fillText('wbin=' + wbin + '  wgray=' + wgray.toString(2).padStart(4, '0') + '  wq2=' + wq2.toString(2).padStart(4, '0') + '  gray2bin(wq2)=' + gray2bin(wq2), 40, 230);
      ctx.fillText('rbin=' + rbin + '  rgray=' + rgray.toString(2).padStart(4, '0') + '  rq2=' + rq2.toString(2).padStart(4, '0') + '  gray2bin(rq2)=' + gray2bin(rq2), 40, 252);

      ctx.font = '22px Outfit,sans-serif';
      ctx.fillStyle = full ? '#f87171' : '#4ade80';
      ctx.fillText(full ? 'FULL' : 'not full', 40, 300);
      ctx.fillStyle = empty ? '#fbbf24' : '#4ade80';
      ctx.fillText(empty ? 'EMPTY' : 'not empty', 240, 300);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Outfit,sans-serif';
      ctx.fillText('True occupancy (this simulation) = ' + o + ' / ' + DEPTH, 40, 338);
      ctx.fillText('Flags use 2FF-synced Gray (wq2 / rq2), so they lag the opposite side — conservative, not optimistic.', 40, 362);

      var el = document.getElementById('labStats');
      if (el) el.textContent = 'next write data = ' + nextData +
        '  |  blocked writes (stall, not overflow) = ' + overflowAttempts +
        '  |  blocked reads (stall, not underflow) = ' + underflowAttempts;
    }

    function playTick() {
      tick++;
      var wdiv = +document.getElementById('labWdiv').value;
      var rdiv = +document.getElementById('labRdiv').value;
      stepWrite(tick % wdiv === 0);
      stepRead(tick % rdiv === 0);
      draw();
    }

    document.getElementById('labWdiv').oninput = function (e) {
      document.getElementById('labWdivL').textContent = e.target.value;
    };
    document.getElementById('labRdiv').oninput = function (e) {
      document.getElementById('labRdivL').textContent = e.target.value;
    };
    document.getElementById('labPlay').onclick = function () {
      playing = !playing;
      document.getElementById('labPlay').textContent = playing ? 'Pause' : 'Play';
      if (playing) timer = setInterval(playTick, 300);
      else clearInterval(timer);
    };
    document.getElementById('labStepW').onclick = function () { stepWrite(true); draw(); };
    document.getElementById('labStepR').onclick = function () { stepRead(true); draw(); };
    document.getElementById('labReset').onclick = function () {
      wbin = rbin = wgray = rgray = wq1 = wq2 = rq1 = rq2 = 0;
      nextData = 1; tick = 0; overflowAttempts = 0; underflowAttempts = 0;
      mem = [null, null, null, null, null, null, null, null];
      draw();
    };
    draw();
  };
})();
