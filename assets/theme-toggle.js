/**
 * EcrioniX Theme Toggle & Controller (v4)
 * Centralized, accessible, site-wide Light/Dark theme switching.
 * STRICT POLICY: LIGHT MODE is the default for all visitors.
 * Persists user choice when explicitly selected.
 */
(function () {
  'use strict';

  // Prevent double-initialization
  if (window.__ecxThemeControllerLoaded) return;
  window.__ecxThemeControllerLoaded = true;

  var STORAGE_KEY = 'ecrionix-theme';
  var EXPLICIT_KEY = 'ecrionix-theme-explicit';

  /**
   * Determine the current theme.
   * If the user has NEVER explicitly chosen a theme, ALWAYS return 'light'.
   * This migrates any legacy automatic dark mode defaults cleanly.
   */
  function getSavedTheme() {
    try {
      var isExplicit = localStorage.getItem(EXPLICIT_KEY) === 'true';
      var saved = localStorage.getItem(STORAGE_KEY);
      if (isExplicit && (saved === 'dark' || saved === 'light')) {
        return saved;
      }
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
    var btns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle, #themeToggleBtn, #themeToggle, button[onclick*="toggleTheme"]');
    btns.forEach(function (btn) {
      btn.textContent = light ? '🌙' : '☀️';
      var label = light ? 'Switch to dark theme' : 'Switch to light theme';
      btn.setAttribute('title', label);
      btn.setAttribute('aria-label', label);
      btn.setAttribute('aria-pressed', light ? 'false' : 'true');
    });
  }

  function applyTheme(nextTheme, isUserAction) {
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

    if (isUserAction === true) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
        localStorage.setItem(EXPLICIT_KEY, 'true');
      } catch (e) {}
    }

    updateAllToggleButtons();

    // Broadcast theme change event for simulators, canvas drawings, and waveforms
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
    if (btn.tagName.toLowerCase() === 'button') {
      btn.type = 'button';
    }
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');

    // If button does not already have an inline onclick with toggleTheme, bind click
    var onclickAttr = btn.getAttribute('onclick') || '';
    if (!onclickAttr.includes('toggleTheme')) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
      });
    }

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  function setupToggleUI() {
    // 1. Check if designated slots exist
    var slot = document.getElementById('themeToggleSlot');
    var existingBtns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle, #themeToggleBtn, #themeToggle, button[onclick*="toggleTheme"]');

    if (existingBtns.length > 0) {
      existingBtns.forEach(initThemeButton);
    } else if (slot) {
      var slotBtn = document.createElement('button');
      slotBtn.id = 'themeToggleBtn';
      slotBtn.className = 'theme-toggle-btn';
      slot.appendChild(slotBtn);
      initThemeButton(slotBtn);
    } else {
      // Find suitable header or navigation container to inject button
      var navContainer = document.querySelector('.nav-actions, .ecx-actions, .nav-inner, .navbar .nav-links, .navbar, .nav, .app-nav, header');
      if (navContainer) {
        var navBtn = document.createElement('button');
        navBtn.id = 'themeToggleBtn';
        navBtn.className = 'theme-toggle-btn';
        navBtn.style.marginLeft = '0.5rem';
        navContainer.appendChild(navBtn);
        initThemeButton(navBtn);
      } else {
        // Fallback: create floating toggle button in bottom-left
        var floatingBtn = document.createElement('button');
        floatingBtn.id = 'themeToggleBtn';
        floatingBtn.className = 'theme-toggle-btn theme-toggle-floating';
        if (document.body) {
          document.body.appendChild(floatingBtn);
          initThemeButton(floatingBtn);
        }
      }
    }

    updateAllToggleButtons();

    // Ensure EcrioniX Assistant & Global Floating WhatsApp Component are active
    ensureBotScript();
  }

  function ensureBotScript() {
    if (window.__ecxBotInitialized || window.__ecxBotLoading) return;
    if ([].some.call(document.scripts, function (s) { return s.src && s.src.indexOf('ecrionix-bot.js') !== -1; })) return;
    window.__ecxBotLoading = true;
    var s = document.createElement('script');
    s.src = '/assets/ecrionix-bot.js?v=4';
    s.defer = true;
    document.head.appendChild(s);
  }

  // Initial immediate application
  var initialTheme = getSavedTheme();
  applyTheme(initialTheme, false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggleUI);
  } else {
    setupToggleUI();
  }

  // Expose global controller
  window.ecxTheme = {
    get: getCurrentTheme,
    isLight: isLight,
    set: function (t) { applyTheme(t, true); },
    toggle: toggleTheme
  };

  // Global toggle function alias for legacy onclick attributes
  window.toggleTheme = toggleTheme;
})();
