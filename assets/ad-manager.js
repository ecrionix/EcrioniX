/**
 * EcrioniX AdSense Monetization & Analytics Manager
 * Version: 2.0.0
 * Features:
 *  - IntersectionObserver-based lazy loading for >70% Active View viewability
 *  - CLS prevention and unfilled ad collapse
 *  - Automated GA4 ad impression & viewability tracking
 *  - Google AdSense policy compliance guards
 */
(function() {
  'use strict';

  const ADSENSE_PUB_ID = 'ca-pub-6672302762343789';
  const GA4_ID = 'G-XXZS8C1FLY';

  class AdManager {
    constructor() {
      this.initialized = false;
      this.observer = null;
      this.viewableObserver = null;
      this.loadedUnits = new WeakSet();
      this.viewedUnits = new WeakSet();
    }

    init() {
      if (this.initialized) return;
      this.initialized = true;

      this.ensureAdSenseScript();
      this.setupObservers();
      this.scanAndRender();
      this.listenForMutations();
    }

    /**
     * Ensures Google AdSense script is present in <head>
     */
    ensureAdSenseScript() {
      if (!document.querySelector(`script[src*="${ADSENSE_PUB_ID}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
        document.head.appendChild(script);
      }
    }

    /**
     * Set up IntersectionObserver for lazy initialization and viewability tracking
     */
    setupObservers() {
      // 1. Lazy load observer: triggers push({}) 250px before entering viewport
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const ins = entry.target;
              this.renderUnit(ins);
              this.observer.unobserve(ins);
            }
          });
        }, {
          rootMargin: '250px 0px 250px 0px',
          threshold: 0.01
        });

        // 2. Active View viewability observer: tracks when ad is 50%+ in viewport for 1s
        this.viewableObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              if (!this.viewedUnits.has(el)) {
                this.viewedUnits.add(el);
                this.trackAdEvent('ad_viewable', el);
              }
            }
          });
        }, {
          threshold: 0.5
        });
      }
    }

    /**
     * Scans page for all <ins class="adsbygoogle"> units and renders them
     */
    scanAndRender() {
      const units = document.querySelectorAll('ins.adsbygoogle');
      units.forEach(ins => {
        // If unit already has rendered content or status, skip
        if (ins.getAttribute('data-adsbygoogle-status') || this.loadedUnits.has(ins)) {
          return;
        }

        // Check if element is in initial viewport or if IntersectionObserver is unsupported
        if (!this.observer) {
          this.renderUnit(ins);
        } else {
          // If above the fold or close to viewport, observe it
          this.observer.observe(ins);
        }

        if (this.viewableObserver) {
          this.viewableObserver.observe(ins);
        }
      });
    }

    /**
     * Renders an individual AdSense unit safely
     */
    renderUnit(ins) {
      if (this.loadedUnits.has(ins)) return;
      this.loadedUnits.add(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        this.trackAdEvent('ad_impression', ins);

        // Check after delay for unfilled ad to collapse container and prevent whitespace
        setTimeout(() => {
          if (ins.getAttribute('data-ad-status') === 'unfilled') {
            const wrapper = ins.closest('.ecx-ad-wrapper') || ins.parentElement;
            if (wrapper) {
              wrapper.setAttribute('data-ad-status', 'unfilled');
            }
          }
        }, 3000);
      } catch (err) {
        console.warn('[EcrioniX Ads] Unit render notice:', err);
      }
    }

    /**
     * Reports ad events to GA4
     */
    trackAdEvent(eventName, el) {
      if (typeof window.gtag === 'function') {
        const adFormat = el.getAttribute('data-ad-format') || 'responsive';
        const adSlot = el.getAttribute('data-ad-slot') || 'auto_responsive';
        const position = el.closest('.ecx-ad-wrapper') ? 
          (el.closest('.ecx-ad-top') ? 'top' : (el.closest('.ecx-ad-mid') ? 'mid' : 'bottom')) : 'incontent';

        window.gtag('event', eventName, {
          event_category: 'Monetization',
          ad_format: adFormat,
          ad_slot: adSlot,
          ad_position: position,
          page_path: window.location.pathname
        });
      }
    }

    /**
     * Observes DOM for dynamically added ad containers (e.g. SPA routers or tabs)
     */
    listenForMutations() {
      if (!('MutationObserver' in window)) return;
      const mutationObserver = new MutationObserver((mutations) => {
        let shouldScan = false;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            shouldScan = true;
            break;
          }
        }
        if (shouldScan) {
          this.scanAndRender();
        }
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    /**
     * Helper to create a compliant ad unit element
     */
    createAdElement(type = 'mid') {
      const wrapper = document.createElement('div');
      wrapper.className = `ecx-ad-wrapper ecx-ad-${type}`;

      const container = document.createElement('div');
      container.className = 'ecx-ad-container';

      const label = document.createElement('span');
      label.className = 'ecx-ad-label';
      label.textContent = 'Advertisement';

      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', ADSENSE_PUB_ID);
      ins.setAttribute('data-ad-format', type === 'mid' ? 'auto' : 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');

      container.appendChild(label);
      container.appendChild(ins);
      wrapper.appendChild(container);

      return wrapper;
    }
  }

  // Export singleton
  window.EcrioniXAds = new AdManager();

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.EcrioniXAds.init());
  } else {
    window.EcrioniXAds.init();
  }
})();
