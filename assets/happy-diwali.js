/**
 * EcrioniX Happy Diwali — Interactive Celebration & Greeting Engine
 * Theme: "Light Up the World with Innovation"
 * (c) 2026 EcrioniX. Open educational & celebration microsite.
 */

(function (global) {
  'use strict';

  // ==========================================
  // 1. DATA: CURATED FESTIVE & ENGINEERING WISHES
  // ==========================================
  const ENGINEERING_WISHES = [
    {
      badge: "LOGIC & SIGNALS",
      text: "May your happiness permanently stay at logic HIGH, your stress remain at logic LOW, and your life have zero propagation delays!",
      short: "May your happiness stay HIGH and your stress stay LOW this Diwali!"
    },
    {
      badge: "BANDWIDTH & DREAMS",
      text: "May your dreams operate with infinite bandwidth, zero packet loss, and unlimited dynamic power to achieve greatness!",
      short: "May your dreams operate with infinite bandwidth and zero packet loss!"
    },
    {
      badge: "TIMING & CLOSURE",
      text: "May your hard work achieve effortless timing closure, zero hold violations, and positive slack in every chapter of life!",
      short: "Wishing you zero timing violations and positive slack in life this Diwali!"
    },
    {
      badge: "POWER & EFFICIENCY",
      text: "May your inner motivation never suffer from IR drop, and your energy remain 100% efficient under every heavy workload!",
      short: "May your inner power never experience a voltage drop this festive season!"
    },
    {
      badge: "CLOCK & HARMONY",
      text: "May your heart's clock domain always stay in perfect synchronous harmony with joy, peace, and family togetherness!",
      short: "May your clock domains always stay in perfect sync with peace and joy!"
    },
    {
      badge: "ZERO ERRORS",
      text: "May your upcoming year synthesize with zero syntax errors, 100% functional coverage, and first-pass tape-out success!",
      short: "May your upcoming year tape-out with zero errors and first-pass success!"
    },
    {
      badge: "METASTABILITY",
      text: "May your positive thoughts resolve all life's metastabilities and settle into peaceful, stable states of abundance!",
      short: "May positive energy resolve all uncertainties in your life this Diwali!"
    },
    {
      badge: "CROSSBAR & CONNECTIONS",
      text: "May your network of loved ones stay securely connected with ultra-low latency, high throughput, and unconditional warmth!",
      short: "Wishing you deep connections and high-throughput happiness this Diwali!"
    },
    {
      badge: "ARCHITECTURAL BREAKTHROUGHS",
      text: "May every engineering hurdle transform into an architectural breakthrough that illuminates your professional journey!",
      short: "May every challenge synthesize into a breakthrough achievement!"
    },
    {
      badge: "RTL TO SILICON",
      text: "May the sacred festival of lights brighten your journey from RTL concept to Silicon reality with radiant triumph!",
      short: "May your journey from RTL to Silicon shine bright this Happy Diwali!"
    }
  ];

  const TRADITIONAL_WISHES = [
    {
      badge: "LAKSHMI & GANESHA",
      text: "May Goddess Lakshmi bless your home with eternal wealth, and Lord Ganesha remove every obstacle from your path to prosperity.",
      short: "May Goddess Lakshmi and Lord Ganesha bless you with wealth and wisdom!"
    },
    {
      badge: "TRIUMPH OF LIGHT",
      text: "Just as the humble earthen lamp banishes the deepest dark, may your goodness and wisdom illuminate the world around you.",
      short: "May your wisdom banish all darkness. Happy Diwali to you and your family!"
    },
    {
      badge: "HEALTH & PEACE",
      text: "Wishing you and your family boundless good health, serene peace of mind, and the sweetest festive celebrations.",
      short: "Wishing you sound health, deep peace, and sweet celebrations this Diwali!"
    },
    {
      badge: "AUSPICIOUS BEGINNINGS",
      text: "May this auspicious festival of lights mark the dawn of glorious opportunities, joyous laughter, and fulfilling triumphs.",
      short: "May this Diwali mark the dawn of glorious new opportunities in your life!"
    },
    {
      badge: "GOLDEN BLESSINGS",
      text: "May the golden glow of countless diyas fill your home with radiant happiness, warmth, and enduring harmony.",
      short: "May the golden glow of diyas fill your home with joy and prosperity!"
    },
    {
      badge: "SACRED ABUNDANCE",
      text: "May your days be blessed with spiritual serenity, professional accomplishment, and unconditional love.",
      short: "Wishing you sacred abundance and unconditional joy this festive season!"
    },
    {
      badge: "SWEET HARMONY",
      text: "May the sweetness of festive mithai and the sparkle of festival lamps brighten every corner of your life.",
      short: "May your life be as sweet as festive mithai and as bright as festival diyas!"
    },
    {
      badge: "FAMILY & TOGETHERNESS",
      text: "Celebrating the sacred bond of family, friendship, and cherished memories. Have a safe, blessed, and joyous Diwali!",
      short: "Wishing you precious moments of togetherness with loved ones this Diwali!"
    },
    {
      badge: "ETERNAL RADIANCE",
      text: "May the divine light of Diwali enter your life and banish every shadow of doubt, giving you courage to shine.",
      short: "May the divine light of Diwali give you strength and eternal radiance!"
    },
    {
      badge: "FESTIVE PROSPERITY",
      text: "May your business, career, and household flourish with unending prosperity, good fortune, and noble success.",
      short: "Wishing you endless prosperity, good fortune, and noble success. Happy Diwali!"
    }
  ];

  const COMMUNITY_SEEDS = [
    { author: "Vikram Shenoy", role: "RTL Design Lead, Bengaluru", msg: "Happy Diwali to all fellow hardware architects! May our clock frequencies rise and our power leakage drop to zero!" },
    { author: "Ananya Sharma", role: "M.Tech Microelectronics, IIT Bombay", msg: "Wishing the entire EcrioniX community a radiant Diwali. Keep learning, keep building silicon!" },
    { author: "Karthik Raja", role: "DV Engineer, Hyderabad", msg: "May our testbenches pass with 100% assertions and our homes shine brighter than a clean wafer fab!" },
    { author: "Prof. S. Ranganathan", role: "VLSI Faculty, Chennai", msg: "Knowledge is the greatest diya. Light up your curiosity and enlighten young engineers worldwide." },
    { author: "Neha Deshmukh", role: "Physical Design Engineer, Pune", msg: "Zero DRC violations, zero setup slack drops, and 100% festive joy for everyone! Happy Diwali!" }
  ];

  // ==========================================
  // 2. SYNTHESIZED WEB AUDIO (RAAG BHUPALI FESTIVE CHIME)
  // ==========================================
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudioContext() {
    if (!audioCtx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playFestiveChime() {
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      // Raag Bhupali Pentatonic Notes: Sa, Re, Ga, Pa, Dha, Sa' (Hz)
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      const now = audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Warm harmonic combination
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        // Bell envelope
        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.85);
      });
    } catch (e) {
      console.warn('Web Audio chime playback skipped:', e);
    }
  }

  // ==========================================
  // 3. BACKGROUND SPARKLER CANVAS ENGINE
  // ==========================================
  let sparklerCanvas = null;
  let sparklerCtx = null;
  let particles = [];
  let isSparklerRunning = true;

  function initSparklerCanvas() {
    sparklerCanvas = document.getElementById('sparklerCanvas');
    if (!sparklerCanvas) return;
    sparklerCtx = sparklerCanvas.getContext('2d');

    function resize() {
      sparklerCanvas.width = window.innerWidth;
      sparklerCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Seed floating embers
    for (let i = 0; i < 35; i++) {
      particles.push(createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, false));
    }

    animateSparklers();

    // Tap/Click anywhere triggers celebratory burst
    window.addEventListener('pointerdown', (e) => {
      // Don't trigger if clicking interactive buttons or inputs
      if (e.target.closest('button, input, select, textarea, a, .diwali-gen-card')) return;
      spawnBurst(e.clientX, e.clientY, 16);
    }, { passive: true });
  }

  function createParticle(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = isBurst ? (Math.random() * 4.5 + 1.5) : (Math.random() * 0.4 + 0.1);
    return {
      x: x,
      y: y,
      vx: isBurst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 0.4,
      vy: isBurst ? Math.sin(angle) * speed : -speed,
      size: Math.random() * (isBurst ? 3.5 : 2.0) + 1.0,
      alpha: 1.0,
      decay: isBurst ? (Math.random() * 0.02 + 0.015) : (Math.random() * 0.005 + 0.002),
      color: Math.random() > 0.4 ? '#fbbf24' : (Math.random() > 0.5 ? '#f59e0b' : '#38bdf8'),
      isBurst: isBurst
    };
  }

  function spawnBurst(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(x, y, true));
    }
  }

  function animateSparklers() {
    if (!isSparklerRunning || !sparklerCtx) return;
    sparklerCtx.clearRect(0, 0, sparklerCanvas.width, sparklerCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.isBurst) {
        p.vy += 0.06; // slight gravity
        p.alpha -= p.decay;
      } else {
        // Floating ember recycling
        if (p.y < -10) {
          p.y = sparklerCanvas.height + 10;
          p.x = Math.random() * sparklerCanvas.width;
          p.alpha = 1.0;
        }
      }

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      sparklerCtx.save();
      sparklerCtx.globalAlpha = Math.max(0, p.alpha);
      sparklerCtx.fillStyle = p.color;
      sparklerCtx.shadowColor = p.color;
      sparklerCtx.shadowBlur = 6;
      sparklerCtx.beginPath();
      sparklerCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      sparklerCtx.fill();
      sparklerCtx.restore();
    }

    requestAnimationFrame(animateSparklers);
  }

  // ==========================================
  // 4. TOAST NOTIFICATION HELPER
  // ==========================================
  function showToast(message) {
    let toast = document.getElementById('diwaliToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'diwaliToast';
      toast.className = 'diwali-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ==========================================
  // 5. HIGH-RESOLUTION CANVAS CARD GENERATOR
  // ==========================================
  const CARD_THEMES = {
    1: { id: 1, name: 'Traditional Golden Diya', type: 'traditional', bg: '#130409', accent: '#fbbf24' },
    2: { id: 2, name: 'Circuit Board Diwali', type: 'circuit', bg: '#030712', accent: '#38bdf8' },
    3: { id: 3, name: 'Semiconductor Chip Rangoli', type: 'silicon', bg: '#020b1e', accent: '#fbbf24' },
    4: { id: 4, name: 'Elegant Floral Diwali', type: 'floral', bg: '#09092b', accent: '#f59e0b' },
    5: { id: 5, name: 'Modern Golden Celebration', type: 'golden', bg: '#0a0d14', accent: '#fef08a' },
    6: { id: 6, name: 'Minimal Premium Diwali', type: 'minimal', bg: '#02040a', accent: '#fbbf24' }
  };

  let currentThemeId = 1;
  let currentAspectRatio = 'portrait'; // 'portrait' (1080x1920) or 'square' (1080x1080)

  function renderGreetingCard() {
    const canvas = document.getElementById('greetingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const senderName = (document.getElementById('cardSenderName')?.value || '').trim() || 'Your Friend';
    const recipientName = (document.getElementById('cardRecipientName')?.value || '').trim();
    const wishText = (document.getElementById('cardCustomWish')?.value || '').trim() || 
                     'May your happiness never run out of power, your dreams never lose their signal, and your success operate without errors!';

    const isPortrait = (currentAspectRatio === 'portrait');
    const width = 1080;
    const height = isPortrait ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    const theme = CARD_THEMES[currentThemeId] || CARD_THEMES[1];

    // 1. Draw Base Background Gradient
    drawCardBackground(ctx, width, height, theme);

    // 2. Draw Decorative Motifs according to theme
    if (theme.type === 'circuit') {
      drawCircuitTraces(ctx, width, height);
    } else if (theme.type === 'silicon') {
      drawSiliconDieRangoli(ctx, width, height);
    } else if (theme.type === 'floral') {
      drawFloralGarlands(ctx, width, height);
    } else if (theme.type === 'golden') {
      drawModernGoldenGeometry(ctx, width, height);
    } else if (theme.type === 'minimal') {
      drawMinimalGrid(ctx, width, height);
    } else {
      drawTraditionalMandala(ctx, width, height);
    }

    // 3. Draw Central Glowing Diya & Flame
    const diyaY = isPortrait ? 620 : 360;
    drawCardDiya(ctx, width / 2, diyaY, isPortrait ? 1.35 : 1.05, theme);

    // 4. Render Greeting Typography
    drawCardTypography(ctx, width, height, isPortrait, recipientName, senderName, wishText, theme);

    // 5. Draw Subtle EcrioniX Branding Watermark
    drawCardFooter(ctx, width, height);
  }

  function drawCardBackground(ctx, w, h, theme) {
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.35, 100, w / 2, h / 2, w * 0.85);
    if (theme.type === 'circuit') {
      bgGrad.addColorStop(0, '#0a1628');
      bgGrad.addColorStop(0.6, '#030712');
      bgGrad.addColorStop(1, '#010205');
    } else if (theme.type === 'traditional') {
      bgGrad.addColorStop(0, '#2d0815');
      bgGrad.addColorStop(0.65, '#130409');
      bgGrad.addColorStop(1, '#080104');
    } else if (theme.type === 'silicon') {
      bgGrad.addColorStop(0, '#071630');
      bgGrad.addColorStop(0.65, '#020b1e');
      bgGrad.addColorStop(1, '#01040a');
    } else if (theme.type === 'floral') {
      bgGrad.addColorStop(0, '#190a36');
      bgGrad.addColorStop(0.6, '#09092b');
      bgGrad.addColorStop(1, '#030311');
    } else if (theme.type === 'golden') {
      bgGrad.addColorStop(0, '#1c180e');
      bgGrad.addColorStop(0.6, '#0a0d14');
      bgGrad.addColorStop(1, '#020306');
    } else {
      bgGrad.addColorStop(0, '#0c101c');
      bgGrad.addColorStop(0.7, '#02040a');
      bgGrad.addColorStop(1, '#000103');
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle outer golden card border
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, w - 72, h - 72);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, w - 96, h - 96);

    // Corner decorative accents
    drawCornerAccent(ctx, 48, 48, 1, 1);
    drawCornerAccent(ctx, w - 48, 48, -1, 1);
    drawCornerAccent(ctx, 48, h - 48, 1, -1);
    drawCornerAccent(ctx, w - 48, h - 48, -1, -1);
  }

  function drawCornerAccent(ctx, x, y, dx, dy) {
    ctx.save();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 24 * dx, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + 24 * dy);
    ctx.stroke();
    ctx.restore();
  }

  function drawTraditionalMandala(ctx, w, h) {
    ctx.save();
    ctx.translate(w / 2, h * 0.35);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.18)';
    ctx.lineWidth = 2;

    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      ctx.arc(0, 0, ring * 75, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 16 Petals
    for (let i = 0; i < 16; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 8);
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.quadraticCurveTo(35, -160, 0, -220);
      ctx.quadraticCurveTo(-35, -160, 0, -60);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.04)';
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawCircuitTraces(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillStyle = '#38bdf8';
    ctx.lineWidth = 3;

    // Outer perimeter circuit runs
    const lines = [
      [80, 120, 320, 120, 360, 160],
      [w - 80, 120, w - 320, 120, w - 360, 160],
      [80, h - 140, 320, h - 140, 380, h - 200],
      [w - 80, h - 140, w - 320, h - 140, w - 380, h - 200],
      [120, 240, 120, 480, 180, 540],
      [w - 120, 240, w - 120, 480, w - 180, 540]
    ];

    lines.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0], pts[1]);
      for (let i = 2; i < pts.length; i += 2) {
        ctx.lineTo(pts[i], pts[i + 1]);
      }
      ctx.stroke();

      // End solder via
      const lastX = pts[pts.length - 2];
      const lastY = pts[pts.length - 1];
      ctx.beginPath();
      ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function drawSiliconDieRangoli(ctx, w, h) {
    ctx.save();
    ctx.translate(w / 2, h * 0.35);

    // Silicon Chip floorplan blocks
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 2;

    const blocks = [
      [-220, -140, 90, 70],
      [-220, -50, 90, 100],
      [130, -140, 90, 70],
      [130, -50, 90, 100],
      [-110, -220, 220, 60],
      [-110, 160, 220, 60]
    ];

    blocks.forEach(b => {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.fillRect(b[0], b[1], b[2], b[3]);
      ctx.strokeRect(b[0], b[1], b[2], b[3]);
    });

    // Concentric silicon wafer rings
    ctx.beginPath();
    ctx.arc(0, 0, 175, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawFloralGarlands(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = '#f59e0b';

    // Hanging garland arc across top
    for (let i = 0; i < 18; i++) {
      const x = 90 + i * (w - 180) / 17;
      const arc = Math.sin((i / 17) * Math.PI) * 45;
      const y = 95 + arc;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();

      // Hanging marigold drop
      if (i % 3 === 0) {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y + 38, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawModernGoldenGeometry(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.25)';
    ctx.lineWidth = 2;

    // Diamond lozenge frame
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.12);
    ctx.lineTo(w - 120, h * 0.35);
    ctx.lineTo(w / 2, h * 0.58);
    ctx.lineTo(120, h * 0.35);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function drawMinimalGrid(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
    for (let x = 120; x <= w - 120; x += 60) {
      for (let y = 140; y <= 560; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawCardDiya(ctx, cx, cy, scale, theme) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Radiant flame ambient halo
    const halo = ctx.createRadialGradient(0, -55, 10, 0, -55, 120);
    halo.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
    halo.addColorStop(0.3, 'rgba(251, 191, 36, 0.45)');
    halo.addColorStop(0.7, 'rgba(245, 158, 11, 0.15)');
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, -55, 120, 0, Math.PI * 2);
    ctx.fill();

    // Diya Brass & Terracotta Body
    const bodyGrad = ctx.createLinearGradient(0, -10, 0, 45);
    bodyGrad.addColorStop(0, '#f59e0b');
    bodyGrad.addColorStop(0.4, '#d97706');
    bodyGrad.addColorStop(0.8, '#b45309');
    bodyGrad.addColorStop(1, '#78350f');

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(-75, 0);
    ctx.quadraticCurveTo(-60, 45, 0, 45);
    ctx.quadraticCurveTo(60, 45, 75, 0);
    ctx.quadraticCurveTo(45, -12, 0, -14);
    ctx.quadraticCurveTo(-45, -12, -75, 0);
    ctx.closePath();
    ctx.fill();

    // Diya Rim highlight
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -5, 72, 12, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Terracotta Base Pedestal
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(0, 42, 45, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Layered Flame
    // 1. Outer golden flame
    const outerFlame = ctx.createRadialGradient(0, -55, 4, 0, -55, 45);
    outerFlame.addColorStop(0, '#ffffff');
    outerFlame.addColorStop(0.4, '#fbbf24');
    outerFlame.addColorStop(0.8, '#f59e0b');
    outerFlame.addColorStop(1, 'rgba(225, 29, 72, 0)');
    ctx.fillStyle = outerFlame;
    ctx.beginPath();
    ctx.moveTo(0, -95);
    ctx.bezierCurveTo(24, -65, 22, -25, 0, -15);
    ctx.bezierCurveTo(-22, -25, -24, -65, 0, -95);
    ctx.closePath();
    ctx.fill();

    // 2. Inner bright white core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -75);
    ctx.bezierCurveTo(12, -55, 10, -25, 0, -18);
    ctx.bezierCurveTo(-10, -25, -12, -55, 0, -75);
    ctx.closePath();
    ctx.fill();

    // 3. Blue wick base
    ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.beginPath();
    ctx.ellipse(0, -17, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCardTypography(ctx, w, h, isPortrait, recipient, sender, wish, theme) {
    ctx.save();
    ctx.textAlign = 'center';

    // 1. Festive Header
    let startY = isPortrait ? 860 : 540;

    ctx.font = '700 24px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(251, 191, 36, 0.85)';
    ctx.fillText('SHUBH DEEPAVALI 2026', w / 2, startY);

    // 2. Main "HAPPY DIWALI" Title
    ctx.font = '900 68px "Outfit", sans-serif';
    const titleGrad = ctx.createLinearGradient(w * 0.2, 0, w * 0.8, 0);
    titleGrad.addColorStop(0, '#ffffff');
    titleGrad.addColorStop(0.4, '#fef08a');
    titleGrad.addColorStop(0.8, '#fbbf24');
    titleGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = titleGrad;
    ctx.fillText('HAPPY DIWALI', w / 2, startY + 80);

    // 3. Recipient Greeting Line
    let textY = startY + 160;
    if (recipient) {
      ctx.font = '600 34px "Outfit", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Dearest ${recipient},`, w / 2, textY);
      textY += 60;
    }

    // 4. Core Blessing / Wish Paragraph (Word Wrapped)
    ctx.font = '400 32px "Outfit", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    const maxTextWidth = w - 240;
    const lineHeight = 48;
    const lines = getWordWrappedLines(ctx, wish, maxTextWidth);

    lines.forEach((line) => {
      ctx.fillText(line, w / 2, textY);
      textY += lineHeight;
    });

    // 5. Sender Signature Box
    textY += isPortrait ? 50 : 25;
    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.fillText('WARM WISHES FROM', w / 2, textY);

    ctx.font = '800 44px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(sender, w / 2, textY + 54);

    ctx.restore();
  }

  function getWordWrappedLines(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawCardFooter(ctx, w, h) {
    ctx.save();
    ctx.textAlign = 'center';

    // Thin separator line
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 160, h - 110);
    ctx.lineTo(w / 2 + 160, h - 110);
    ctx.stroke();

    // Diamond center pip
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(w / 2, h - 110, 4, 0, Math.PI * 2);
    ctx.fill();

    // EcrioniX Watermark
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
    ctx.fillText('🪔 EcrioniX • Light Up the World With Innovation', w / 2, h - 75);

    ctx.restore();
  }

  // ==========================================
  // 6. SHARING & DOWNLOAD COORDINATOR
  // ==========================================
  function downloadCardImage() {
    const canvas = document.getElementById('greetingCanvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const sender = (document.getElementById('cardSenderName')?.value || 'EcrioniX').trim().replace(/[^a-zA-Z0-9]/g, '-');
      a.href = url;
      a.download = `Happy-Diwali-EcrioniX-${sender}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      showToast('Card image downloaded successfully!');
    }, 'image/png');
  }

  function shareOnWhatsApp() {
    const sender = (document.getElementById('cardSenderName')?.value || '').trim();
    const recipient = (document.getElementById('cardRecipientName')?.value || '').trim();
    const wish = (document.getElementById('cardCustomWish')?.value || '').trim() || 
                 'May your life shine brighter than a thousand diyas and your dreams turn into reality!';

    let shareUrl = 'https://ecrionix.org/happy-diwali/';
    if (sender || recipient) {
      const params = new URLSearchParams();
      if (sender) params.set('from', sender);
      if (recipient) params.set('to', recipient);
      params.set('theme', currentThemeId);
      shareUrl += '?' + params.toString();
    }

    const greetingLine = recipient ? `🪔✨ Happy Diwali, ${recipient}!` : `🪔✨ Happy Diwali!`;
    const fromLine = sender ? `\n\n— With warm wishes from ${sender}` : '';

    const text = `${greetingLine}\n\n${wish}${fromLine}\n\nI illuminated a special Diwali lamp for you! Open your greeting here:\n👉 ${shareUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  async function shareNative() {
    const sender = (document.getElementById('cardSenderName')?.value || '').trim();
    const recipient = (document.getElementById('cardRecipientName')?.value || '').trim();
    const wish = (document.getElementById('cardCustomWish')?.value || '').trim();

    let shareUrl = 'https://ecrionix.org/happy-diwali/';
    if (sender || recipient) {
      const params = new URLSearchParams();
      if (sender) params.set('from', sender);
      if (recipient) params.set('to', recipient);
      shareUrl += '?' + params.toString();
    }

    const shareData = {
      title: 'Happy Diwali 2026 – EcrioniX',
      text: `🪔 Happy Diwali! ${wish || 'Light Up the World with Innovation!'}`,
      url: shareUrl
    };

    const canvas = document.getElementById('greetingCanvas');
    if (navigator.canShare && canvas && canvas.toBlob) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'diwali-greeting.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: shareData.title,
                text: shareData.text
              });
              return;
            }
          }
          await navigator.share(shareData);
        }, 'image/png');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Native file share fallback:', err);
        }
      }
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyPageLink();
        }
      }
    } else {
      copyPageLink();
    }
  }

  function copyGreetingText() {
    const sender = (document.getElementById('cardSenderName')?.value || '').trim();
    const recipient = (document.getElementById('cardRecipientName')?.value || '').trim();
    const wish = (document.getElementById('cardCustomWish')?.value || '').trim();

    let text = `🪔✨ Happy Diwali! ${wish}`;
    if (recipient) text = `Dearest ${recipient},\n\n${text}`;
    if (sender) text += `\n\n— Warm wishes from ${sender}`;
    text += `\n\nhttps://ecrionix.org/happy-diwali/`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('Greeting text copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy automatically. Please copy manually.');
    });
  }

  function copyPageLink() {
    const sender = (document.getElementById('cardSenderName')?.value || '').trim();
    const recipient = (document.getElementById('cardRecipientName')?.value || '').trim();

    let shareUrl = 'https://ecrionix.org/happy-diwali/';
    if (sender || recipient) {
      const params = new URLSearchParams();
      if (sender) params.set('from', sender);
      if (recipient) params.set('to', recipient);
      params.set('theme', currentThemeId);
      shareUrl += '?' + params.toString();
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Personalized link copied to clipboard!');
    }).catch(() => {
      showToast('Link copied!');
    });
  }

  function openInstagramModal() {
    const modal = document.getElementById('igModalBackdrop');
    if (modal) modal.classList.add('open');
  }

  function closeInstagramModal() {
    const modal = document.getElementById('igModalBackdrop');
    if (modal) modal.classList.remove('open');
  }

  // ==========================================
  // 7. ORACLE OF LIGHT: RANDOM WISH GENERATOR
  // ==========================================
  function generateRandomWish() {
    const quoteEl = document.getElementById('oracleQuote');
    const catEl = document.getElementById('oracleCategory');
    if (!quoteEl) return;

    const allWishes = [
      ...ENGINEERING_WISHES.map(w => ({ ...w, type: 'Engineering & VLSI' })),
      ...TRADITIONAL_WISHES.map(w => ({ ...w, type: 'Traditional Vedic' }))
    ];

    const pick = allWishes[Math.floor(Math.random() * allWishes.length)];
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      quoteEl.textContent = `"${pick.text}"`;
      if (catEl) catEl.textContent = `${pick.type} Blessing • ${pick.badge}`;
      quoteEl.style.transition = 'all 0.3s ease';
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
      spawnBurst(window.innerWidth / 2, window.innerHeight * 0.45, 15);
    }, 200);
  }

  function shareOracleWish() {
    const quoteEl = document.getElementById('oracleQuote');
    if (!quoteEl) return;
    const wish = quoteEl.textContent.replace(/^"|"$/g, '');
    const text = `🪔✨ Happy Diwali!\n\n${wish}\n\nLight your diya and generate your engineering wish on EcrioniX:\n👉 https://ecrionix.org/happy-diwali/`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  // ==========================================
  // 8. POPULATE STREAMLINED WISHES (TABBED)
  // ==========================================
  let currentWishesTab = 'eng';

  function renderCuratedWishes() {
    const container = document.getElementById('curatedWishesGrid');
    if (!container) return;
    const list = (currentWishesTab === 'trad') ? TRADITIONAL_WISHES : ENGINEERING_WISHES;

    container.innerHTML = list.map((w) => `
      <div class="diwali-wish-card">
        <span class="diwali-wish-badge" ${currentWishesTab === 'trad' ? 'style="background:rgba(225,29,72,0.12); color:#fb7185; border-color:rgba(225,29,72,0.25);"' : ''}>${w.badge}</span>
        <p class="diwali-wish-text">${w.text}</p>
        <div class="diwali-wish-actions">
          <button type="button" class="diwali-btn diwali-btn-primary use-wish-btn" style="padding:0.35rem 0.75rem; font-size:0.78rem;" data-wish="${encodeURIComponent(w.text)}">
            <span>🎨</span> Use on Card
          </button>
          <button type="button" class="diwali-icon-btn wa-wish-btn" data-text="${encodeURIComponent(w.text)}" title="Share on WhatsApp">
            <span>💬</span> WhatsApp
          </button>
          <button type="button" class="diwali-icon-btn copy-wish-btn" data-text="${encodeURIComponent(w.text)}" title="Copy wish">
            <span>📋</span> Copy
          </button>
        </div>
      </div>
    `).join('');

    // Wire up "Use on Card"
    container.querySelectorAll('.use-wish-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const wish = decodeURIComponent(btn.dataset.wish);
        const customWishInput = document.getElementById('cardCustomWish');
        if (customWishInput) {
          customWishInput.value = wish;
          renderGreetingCard();
        }
        document.getElementById('cardStudio')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Wish applied to your card!');
      });
    });

    // Wire up WhatsApp & Copy
    container.querySelectorAll('.wa-wish-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.dataset.text);
        const msg = `🪔✨ Happy Diwali!\n\n${text}\n\nCelebrate and create your personal greeting here:\n👉 https://ecrionix.org/happy-diwali/`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      });
    });

    container.querySelectorAll('.copy-wish-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.dataset.text);
        navigator.clipboard.writeText(`🪔 Happy Diwali! ${text}\n\nhttps://ecrionix.org/happy-diwali/`).then(() => {
          showToast('Wish copied to clipboard!');
        });
      });
    });
  }

  global.switchWishesTab = function(type) {
    currentWishesTab = type;
    const engBtn = document.getElementById('tabEngBtn');
    const tradBtn = document.getElementById('tabTradBtn');
    if (engBtn) engBtn.classList.toggle('active', type === 'eng');
    if (tradBtn) tradBtn.classList.toggle('active', type === 'trad');
    renderCuratedWishes();
  };

  // ==========================================
  // 10. URL QUERY PARAMETER INTEGRATION
  // ==========================================
  function checkUrlPersonalization() {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    const fromParam = params.get('from');
    const themeParam = parseInt(params.get('theme'));

    if (toParam || fromParam) {
      const banner = document.getElementById('personalAlertBanner');
      if (banner) {
        const toText = toParam ? `<b>${sanitize(toParam)}</b>` : 'Friend';
        const fromText = fromParam ? `from <b>${sanitize(fromParam)}</b>` : '';
        banner.innerHTML = `<span>🪔</span> <span>A special Diwali greeting has arrived for ${toText} ${fromText}! Light the diya below to unveil your wish!</span>`;
        banner.style.display = 'flex';
      }

      // Pre-fill card generator inputs
      const senderInput = document.getElementById('cardSenderName');
      const recipInput = document.getElementById('cardRecipientName');

      if (fromParam && senderInput) senderInput.value = fromParam;
      if (toParam && recipInput) recipInput.value = toParam;
    }

    if (themeParam && CARD_THEMES[themeParam]) {
      currentThemeId = themeParam;
      document.querySelectorAll('.diwali-theme-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.theme) === themeParam);
      });
    }
  }

  // ==========================================
  // 11. CENTRAL DIYA LIGHTING LOGIC
  // ==========================================
  let isDiyaLit = false;

  function toggleDiyaLighting() {
    isDiyaLit = !isDiyaLit;
    const btn = document.getElementById('lightDiyaBtn');
    const flame = document.getElementById('diwaliFlame');
    const rangoli = document.getElementById('diwaliRangoliSvg');
    const revealCard = document.getElementById('diwaliRevealCard');

    if (isDiyaLit) {
      if (flame) flame.classList.add('lit');
      if (rangoli) rangoli.classList.add('lit');
      if (btn) {
        btn.classList.add('is-lit');
        btn.innerHTML = `<span>✨</span> <span>Diya is Radiant • Extinguish</span>`;
      }
      if (revealCard) {
        revealCard.style.display = 'block';
        revealCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      playFestiveChime();
      spawnBurst(window.innerWidth / 2, window.innerHeight * 0.42, 35);
      showToast('🪔 May the light of innovation bless your journey!');
    } else {
      if (flame) flame.classList.remove('lit');
      if (rangoli) rangoli.classList.remove('lit');
      if (btn) {
        btn.classList.remove('is-lit');
        btn.innerHTML = `<span>🪔</span> <span>Light Your Diya</span>`;
      }
      if (revealCard) {
        revealCard.style.display = 'none';
      }
      showToast('Diya extinguished. Click anytime to relight!');
    }
  }

  // ==========================================
  // 12. INITIALIZATION ON DOM READY
  // ==========================================
  function initHappyDiwali() {
    initSparklerCanvas();
    checkUrlPersonalization();
    renderCuratedWishes();

    // Central Diya Light Button
    const lightBtn = document.getElementById('lightDiyaBtn');
    if (lightBtn) {
      lightBtn.addEventListener('click', toggleDiyaLighting);
    }

    // Audio Toggle Button
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        audioBtn.classList.toggle('playing', isSoundEnabled);
        const icon = document.getElementById('soundIcon');
        const label = document.getElementById('soundLabel');
        if (icon) icon.textContent = isSoundEnabled ? '🔔' : '🔕';
        if (label) label.textContent = isSoundEnabled ? 'Sound: On' : 'Sound: Muted';
        if (isSoundEnabled) playFestiveChime();
      });
    }

    // Card Generator Inputs
    const senderInput = document.getElementById('cardSenderName');
    const recipInput = document.getElementById('cardRecipientName');
    const customWishText = document.getElementById('cardCustomWish');

    [senderInput, recipInput, customWishText].forEach(input => {
      if (input) input.addEventListener('input', renderGreetingCard);
    });

    // Theme Chips
    document.querySelectorAll('.diwali-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.diwali-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentThemeId = parseInt(chip.dataset.theme) || 1;
        renderGreetingCard();
      });
    });

    // Preset Pills
    document.querySelectorAll('.diwali-preset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (customWishText && pill.dataset.wish) {
          customWishText.value = pill.dataset.wish;
          renderGreetingCard();
          showToast('Message loaded!');
        }
      });
    });

    // Actions
    document.getElementById('downloadCardBtn')?.addEventListener('click', downloadCardImage);
    document.getElementById('shareWhatsAppBtn')?.addEventListener('click', shareOnWhatsApp);
    document.getElementById('shareWhatsAppBtnReveal')?.addEventListener('click', shareOnWhatsApp);
    document.getElementById('shareNativeBtn')?.addEventListener('click', shareNative);
    document.getElementById('copyGreetingBtn')?.addEventListener('click', copyGreetingText);

    // Initial render of greeting card
    setTimeout(renderGreetingCard, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHappyDiwali);
  } else {
    initHappyDiwali();
  }

})(typeof window !== 'undefined' ? window : globalThis);
