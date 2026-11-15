/**
 * EcrioniX Global Responsive Navigation
 * Handles mobile drawer, accordions, search shortcuts, and theme toggle
 */

(function () {
  'use strict';

  function initGlobalNav() {
    const hamburger = document.getElementById('ecxHamburger');
    const drawer = document.getElementById('ecxMobileDrawer');
    const backdrop = document.getElementById('ecxMobileBackdrop');
    const closeBtn = document.getElementById('ecxDrawerClose');
    const drawerSearch = document.getElementById('ecxDrawerSearchInput');

    function openDrawer() {
      if (drawer && backdrop) {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        if (hamburger) hamburger.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawer && backdrop) {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        if (hamburger) hamburger.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        if (drawer && drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    // Escape key closes drawer
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Drawer Search Input
    if (drawerSearch) {
      drawerSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          const q = drawerSearch.value.trim();
          if (q) {
            window.location.href = '/explore/?q=' + encodeURIComponent(q);
          } else {
            window.location.href = '/explore/';
          }
        }
      });
    }

    // Accordions in mobile drawer
    const accordions = document.querySelectorAll('.ecx-accordion-group');
    accordions.forEach(function (group) {
      const header = group.querySelector('.ecx-accordion-header');
      if (header) {
        header.addEventListener('click', function () {
          const isOpen = group.classList.contains('is-open');
          // Optional: close other accordions
          accordions.forEach(function (g) {
            if (g !== group) g.classList.remove('is-open');
          });
          if (isOpen) {
            group.classList.remove('is-open');
          } else {
            group.classList.add('is-open');
          }
        });
      }
    });

    // Highlight active link based on current path
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const allLinks = document.querySelectorAll('.ecx-link, .ecx-card-link, .ecx-drawer-link');
    allLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href) {
        const cleanHref = href.replace(/\/+$/, '') || '/';
        if (cleanHref === currentPath && cleanHref !== '/') {
          link.classList.add('is-active');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalNav);
  } else {
    initGlobalNav();
  }
})();
