/**
 * EcrioniX PWA Registration & Install Experience
 * Enables seamless app installation on Android, iOS, Windows, Mac, and Linux.
 */
(function() {
  'use strict';

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => {
          // Check for worker updates
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New content available; please refresh.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('[PWA] ServiceWorker registration failed:', err);
        });
    });
  }

  // 2. Check if already running as installed standalone PWA
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;

  if (isStandalone) {
    return; // Already installed and running in app mode
  }

  // Check dismissal cooldown (dismiss for 7 days if user closed it)
  const DISMISS_KEY = 'ecrionix_pwa_dismissed';
  const dismissedTime = localStorage.getItem(DISMISS_KEY);
  if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10)) < (7 * 24 * 60 * 60 * 1000)) {
    return;
  }

  let deferredPrompt = null;
  const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

  // Inject Scoped Styles for the Install Banner
  function injectStyles() {
    if (document.getElementById('pwa-install-styles')) return;
    const style = document.createElement('style');
    style.id = 'pwa-install-styles';
    style.textContent = `
      #pwa-install-banner {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 14px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(6, 182, 212, 0.35);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 12px 16px;
        border-radius: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(6, 182, 212, 0.15);
        max-width: 380px;
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #f8fafc;
        animation: pwaSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes pwaSlideUp {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      #pwa-install-banner .pwa-icon {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        flex-shrink: 0;
        background: #030516;
        border: 1px solid rgba(255, 255, 255, 0.1);
        object-fit: contain;
      }
      #pwa-install-banner .pwa-info {
        flex: 1;
        min-width: 0;
      }
      #pwa-install-banner .pwa-title {
        font-size: 0.92rem;
        font-weight: 700;
        color: #fff;
        line-height: 1.25;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #pwa-install-banner .pwa-subtitle {
        font-size: 0.78rem;
        color: #94a3b8;
        line-height: 1.3;
        margin-top: 2px;
      }
      #pwa-install-banner .pwa-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      #pwa-install-banner .pwa-btn-install {
        background: linear-gradient(135deg, #06b6d4, #10b981);
        color: #020617;
        font-weight: 700;
        font-size: 0.82rem;
        border: none;
        border-radius: 8px;
        padding: 7px 13px;
        cursor: pointer;
        transition: transform 0.15s, opacity 0.15s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      #pwa-install-banner .pwa-btn-install:hover {
        opacity: 0.92;
        transform: scale(1.02);
      }
      #pwa-install-banner .pwa-btn-close {
        background: transparent;
        color: #64748b;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: color 0.15s, background 0.15s;
      }
      #pwa-install-banner .pwa-btn-close:hover {
        color: #cbd5e1;
        background: rgba(255, 255, 255, 0.08);
      }
      /* iOS Instructions Modal */
      #pwa-ios-modal {
        position: fixed;
        inset: 0;
        z-index: 100000;
        background: rgba(2, 6, 23, 0.75);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 16px;
      }
      #pwa-ios-modal .modal-content {
        background: #0f172a;
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 18px;
        padding: 24px;
        max-width: 420px;
        width: 100%;
        color: #f8fafc;
        text-align: center;
      }
      #pwa-ios-modal h3 {
        font-size: 1.15rem;
        margin-bottom: 8px;
        color: #38bdf8;
      }
      #pwa-ios-modal p {
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.5;
        margin-bottom: 16px;
      }
      #pwa-ios-modal .step-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(255, 255, 255, 0.04);
        padding: 10px 14px;
        border-radius: 10px;
        margin-bottom: 8px;
        text-align: left;
        font-size: 0.88rem;
      }
      #pwa-ios-modal .btn-gotit {
        width: 100%;
        margin-top: 12px;
        padding: 10px;
        background: #06b6d4;
        color: #020617;
        font-weight: 700;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }
      @media (max-width: 480px) {
        #pwa-install-banner {
          bottom: 16px;
          right: 16px;
          left: 16px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create & Show the Banner
  function showInstallBanner(onInstallClick) {
    if (document.getElementById('pwa-install-banner')) return;
    injectStyles();

    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.innerHTML = `
      <img src="/icons/icon-192x192.png" alt="EcrioniX" class="pwa-icon">
      <div class="pwa-info">
        <div class="pwa-title">Install EcrioniX</div>
        <div class="pwa-subtitle">Fast, offline-ready VLSI learning app</div>
      </div>
      <div class="pwa-actions">
        <button class="pwa-btn-install" id="pwa-trigger-btn">Install</button>
        <button class="pwa-btn-close" id="pwa-close-btn" aria-label="Dismiss">✕</button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('pwa-trigger-btn').addEventListener('click', onInstallClick);
    document.getElementById('pwa-close-btn').addEventListener('click', () => {
      banner.remove();
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    });
  }

  // Show iOS Instructions Modal
  function showIosInstructions() {
    if (document.getElementById('pwa-ios-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'pwa-ios-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Install EcrioniX on iOS</h3>
        <p>Install EcrioniX directly to your iPhone or iPad home screen in two simple steps:</p>
        <div class="step-item">
          <span style="font-size:1.2rem;">1️⃣</span>
          <span>Tap the <strong>Share</strong> icon at the bottom of your Safari browser.</span>
        </div>
        <div class="step-item">
          <span style="font-size:1.2rem;">2️⃣</span>
          <span>Scroll down and tap <strong>"Add to Home Screen"</strong> (⊞).</span>
        </div>
        <button class="btn-gotit" id="pwa-ios-gotit">Got it!</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('pwa-ios-gotit').addEventListener('click', () => {
      modal.remove();
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.remove();
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    });
  }

  // Listen for beforeinstallprompt (Android, Chrome, Edge, Desktop)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    showInstallBanner(async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted install prompt');
      }
      deferredPrompt = null;
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.remove();
    });
  });

  // Handle iOS Safari (show banner if visited on Safari on mobile)
  if (isIos && !isStandalone) {
    // Show banner after 3 seconds on iOS
    setTimeout(() => {
      showInstallBanner(() => {
        showIosInstructions();
      });
    }, 3000);
  }

  // Listen for appinstalled
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] EcrioniX installed successfully!');
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.remove();
  });
})();
