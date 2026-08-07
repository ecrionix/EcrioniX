/* Theme toggle + site-wide contrast repair for light/dark readability */
(function () {
  var SKIP = 'pre,code,.code-panel,.diagram-wrap,.wave-ascii,.mini-editor,.compiler-mini-editor,.hljs,.cp-card,.promo-banner,.theme-toggle-btn,.q-body code';

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function parseRGB(str) {
    if (!str || str === 'transparent' || str === 'rgba(0, 0, 0, 0)') return null;
    var m = String(str).match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
  }

  function lum(c) {
    return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
  }

  function isAccent(c) {
    var max = Math.max(c.r, c.g, c.b);
    var min = Math.min(c.r, c.g, c.b);
    var sat = max === 0 ? 0 : (max - min) / max;
    var L = lum(c);
    return sat > 0.32 && L > 0.22 && L < 0.88;
  }

  function shouldSkip(el) {
    try { return !!(el.closest && el.closest(SKIP)); } catch (e) { return false; }
  }

  function setImp(el, prop, val) {
    el.style.setProperty(prop, val, 'important');
    el.setAttribute('data-ecx-contrast', '1');
  }

  function clearRepairs() {
    document.querySelectorAll('[data-ecx-contrast]').forEach(function (el) {
      el.style.removeProperty('background');
      el.style.removeProperty('background-color');
      el.style.removeProperty('border-color');
      el.style.removeProperty('color');
      el.style.removeProperty('-webkit-text-fill-color');
      el.removeAttribute('data-ecx-contrast');
    });
  }

  function fixTextOnSurface(root, surfaceDark) {
    var nodes = [root];
    try { root.querySelectorAll('*').forEach(function (n) { nodes.push(n); }); } catch (e) {}

    nodes.forEach(function (node) {
      if (shouldSkip(node)) return;
      var cs = getComputedStyle(node);
      var c = parseRGB(cs.color);
      if (!c || c.a < 0.4) return;
      if (isAccent(c)) return;

      var L = lum(c);
      var weight = parseInt(cs.fontWeight, 10) || 400;
      var isHeading = weight >= 600 || /^H[1-6]$/i.test(node.tagName);
      var cls = (node.className && typeof node.className === 'string') ? node.className : '';
      if (/\bq-(?:text|num|chevron)\b/.test(cls) || /\bcat-tag\b/.test(cls)) {
        isHeading = /\bq-text\b/.test(cls) || isHeading;
      }

      if (surfaceDark) {
        if (L < 0.42) {
          setImp(node, 'color', isHeading ? '#f1f5f9' : '#94a3b8');
          setImp(node, '-webkit-text-fill-color', isHeading ? '#f1f5f9' : '#94a3b8');
        } else if (L < 0.55 && !isHeading) {
          setImp(node, 'color', '#94a3b8');
          setImp(node, '-webkit-text-fill-color', '#94a3b8');
        } else if (L < 0.72 && isHeading) {
          setImp(node, 'color', '#f1f5f9');
          setImp(node, '-webkit-text-fill-color', '#f1f5f9');
        }
      } else if (L > 0.55) {
        setImp(node, 'color', isHeading ? '#0f172a' : '#334155');
        setImp(node, '-webkit-text-fill-color', isHeading ? '#0f172a' : '#334155');
      }
    });
  }

  function repairContrast() {
    var light = isLight();
    var candidates = document.querySelectorAll(
      '[style*="background"], .card, .why-card, .topic-card, .ccard, .module, .item, .cat, .panel, .day-card, .lesson-card, .tool-card, .qa-card, .flow-node, .post-card, .q-card, .q-header, .q-body, .co-card, .pd-day-card'
    );

    candidates.forEach(function (el) {
      if (shouldSkip(el)) return;
      var cs = getComputedStyle(el);
      var bg = parseRGB(cs.backgroundColor);
      if (!bg || bg.a < 0.12) return;

      var surfaceDark = lum(bg) < 0.45;

      if (light && surfaceDark) {
        setImp(el, 'background', '#ffffff');
        setImp(el, 'background-color', '#ffffff');
        setImp(el, 'border-color', 'rgba(15, 23, 42, 0.12)');
        fixTextOnSurface(el, false);
      } else if (surfaceDark) {
        fixTextOnSurface(el, true);
      } else if (light) {
        fixTextOnSurface(el, false);
      }
    });

    if (light) {
      document.querySelectorAll('h1,h2,h3,h4,.section-title,.card-title,.q-text').forEach(function (el) {
        if (shouldSkip(el)) return;
        var c = parseRGB(getComputedStyle(el).color);
        if (c && !isAccent(c) && lum(c) > 0.62) {
          setImp(el, 'color', '#0f172a');
          setImp(el, '-webkit-text-fill-color', '#0f172a');
        }
      });
      document.querySelectorAll('.q-num,.q-chevron').forEach(function (el) {
        var c = parseRGB(getComputedStyle(el).color);
        if (c && !isAccent(c) && lum(c) > 0.55) {
          setImp(el, 'color', '#475569');
          setImp(el, '-webkit-text-fill-color', '#475569');
        }
      });
    } else {
      document.querySelectorAll('.q-text').forEach(function (el) {
        var c = parseRGB(getComputedStyle(el).color);
        if (c && !isAccent(c) && lum(c) < 0.72) {
          setImp(el, 'color', '#f1f5f9');
          setImp(el, '-webkit-text-fill-color', '#f1f5f9');
        }
      });
      document.querySelectorAll('.q-num,.q-chevron').forEach(function (el) {
        var c = parseRGB(getComputedStyle(el).color);
        if (c && !isAccent(c) && lum(c) < 0.45) {
          setImp(el, 'color', '#94a3b8');
          setImp(el, '-webkit-text-fill-color', '#94a3b8');
        }
      });
    }
  }

  function updateBtn(btn) {
    var light = isLight();
    btn.textContent = light ? '🌙' : '☀️';
    btn.setAttribute('title', light ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function applyTheme(next) {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ecrionix-theme', next); } catch (e) {}
    clearRepairs();
    try { window.dispatchEvent(new CustomEvent('ecx-theme-change', { detail: { theme: next } })); } catch (e) {}
    setTimeout(repairContrast, 20);
    setTimeout(repairContrast, 120);
  }

  function addToggle() {
    var existing = document.getElementById('themeToggleBtn');
    if (existing) {
      if (!existing.dataset.ecxBound) {
        existing.dataset.ecxBound = '1';
        existing.onclick = function () {
          applyTheme(isLight() ? 'dark' : 'light');
          updateBtn(existing);
        };
      }
      updateBtn(existing);
      repairContrast();
      return;
    }

    var btn = document.createElement('button');
    btn.id = 'themeToggleBtn';
    btn.type = 'button';
    btn.dataset.ecxBound = '1';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    var slot = document.getElementById('themeToggleSlot');
    if (slot) {
      btn.className = 'theme-toggle-btn';
      slot.appendChild(btn);
    } else {
      btn.className = 'theme-toggle-btn theme-toggle-floating';
      document.body.appendChild(btn);
    }
    updateBtn(btn);
    btn.onclick = function () {
      applyTheme(isLight() ? 'dark' : 'light');
      updateBtn(btn);
    };
    repairContrast();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle);
  } else {
    addToggle();
  }

  window.addEventListener('load', function () { setTimeout(repairContrast, 50); });
  window.addEventListener('ecx-theme-change', function () { setTimeout(repairContrast, 30); });
  window.__ecxRepairContrast = repairContrast;
})();
