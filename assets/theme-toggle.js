(function () {
  function updateBtn(btn) {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function addToggle() {
    if (document.getElementById('themeToggleBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'themeToggleBtn';
    btn.type = 'button';
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
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('ecrionix-theme', next); } catch (e) {}
      updateBtn(btn);
      try { window.dispatchEvent(new CustomEvent('ecx-theme-change', { detail: { theme: next } })); } catch (e) {}
    };
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle);
  } else {
    addToggle();
  }
})();
