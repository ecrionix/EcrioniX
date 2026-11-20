/**
 * EcrioniX Theme Toggle & Theme Controller
 * Centralized, accessible, rock-solid Light/Dark theme switching.
 * Default Theme: LIGHT MODE for all first-time visitors.
 */
(function () {
  'use strict';

  // Selectors to strictly exempt from any contrast manipulation (IDEs, waveforms, canvases, editors)
  var ISOLATED_SELECTORS = [
    '.ide-workspace',
    '.ide-editor-pane',
    '.editor-pane',
    '.editor-body',
    '.editor-wrap',
    '#editor',
    '#hl-layer',
    '#lnums',
    'canvas',
    'svg',
    '.waveform-box',
    '.wave-body',
    '#wave-canvas',
    '#netlist-svg-container',
    '#netlist-svg-wrap',
    '.circuit-workspace',
    '.simulator-canvas',
    '.canvas-area',
    '.canvas-container',
    '.mini-editor',
    '.compiler-mini-editor',
    '.code-panel',
    '.diagram-wrap',
    '.wave-ascii',
    'pre',
    'code',
    '.hljs',
    '.theme-toggle-btn'
  ].join(',');

  function isIsolated(el) {
    if (!el) return false;
    try {
      return !!(el.closest && el.closest(ISOLATED_SELECTORS));
    } catch (e) {
      return false;
    }
  }

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem('ecrionix-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    // Strict requirement: Light Mode is the universal default
    return 'light';
  }

  function getCurrentTheme() {
    var dt = document.documentElement.getAttribute('data-theme');
    if (dt === 'dark') return 'dark';
    if (dt === 'light') return 'light';
    return getSavedTheme();
  }

  function isLight() {
    return getCurrentTheme() !== 'dark';
  }

  function updateAllToggleButtons() {
    var light = isLight();
    var btns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle, #themeToggleBtn, #themeToggle');
    btns.forEach(function (btn) {
      btn.textContent = light ? '🌙' : '☀️';
      var label = light ? 'Switch to dark theme' : 'Switch to light theme';
      btn.setAttribute('title', label);
      btn.setAttribute('aria-label', label);
      btn.setAttribute('aria-pressed', light ? 'false' : 'true');
    });
  }

  function applyTheme(nextTheme, save) {
    var theme = (nextTheme === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);

    if (document.body) {
      if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      }
    }

    if (save !== false) {
      try {
        localStorage.setItem('ecrionix-theme', theme);
      } catch (e) {}
    }

    updateAllToggleButtons();

    // Broadcast theme change event for custom canvas re-renders (waveforms, netlists, etc.)
    try {
      window.dispatchEvent(new CustomEvent('ecx-theme-change', {
        detail: { theme: theme, isLight: theme === 'light' }
      }));
    } catch (e) {}
  }

  function toggleTheme() {
    var current = getCurrentTheme();
    var next = (current === 'dark') ? 'light' : 'dark';
    applyTheme(next, true);
  }

  function initThemeButton(btn) {
    if (!btn || btn.dataset.ecxBound === '1') return;
    btn.dataset.ecxBound = '1';
    btn.type = 'button';
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleTheme();
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  function setupToggleUI() {
    // 1. Check if designated slots or buttons exist
    var slot = document.getElementById('themeToggleSlot');
    var existingBtn = document.getElementById('themeToggleBtn') || document.getElementById('themeToggle') || document.querySelector('.theme-toggle-btn') || document.querySelector('.theme-toggle');

    if (existingBtn) {
      initThemeButton(existingBtn);
    } else if (slot) {
      var slotBtn = document.createElement('button');
      slotBtn.id = 'themeToggleBtn';
      slotBtn.className = 'theme-toggle-btn';
      slot.appendChild(slotBtn);
      initThemeButton(slotBtn);
    } else if (!document.querySelector('.theme-toggle-btn, .theme-toggle, #themeToggleBtn, #themeToggle')) {
      // Create a clean floating toggle button if no slot is on the page
      var floatingBtn = document.createElement('button');
      floatingBtn.id = 'themeToggleBtn';
      floatingBtn.className = 'theme-toggle-btn theme-toggle-floating';
      document.body.appendChild(floatingBtn);
      initThemeButton(floatingBtn);
    }

    // Bind any buttons with matching classes or IDs
    document.querySelectorAll('.theme-toggle-btn, .theme-toggle, #themeToggleBtn, #themeToggle').forEach(initThemeButton);

    updateAllToggleButtons();
  }

  // Initial immediate application
  var initialTheme = getSavedTheme();
  applyTheme(initialTheme, false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggleUI);
  } else {
    setupToggleUI();
  }

  // Expose API for simulators / custom components
  window.ecxTheme = {
    get: getCurrentTheme,
    isLight: isLight,
    set: function (t) { applyTheme(t, true); },
    toggle: toggleTheme,
    isIsolated: isIsolated
  };
})();
