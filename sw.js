/**
 * EcrioniX Service Worker - High-Performance PWA Cache
 * Version: ecrionix-pwa-v1
 */

const CACHE_NAME = 'ecrionix-pwa-v1';

// Core shell assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon1.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png'
];

// Domains that should NEVER be intercepted or cached (Ads & Analytics)
const BYPASS_DOMAINS = [
  'googlesyndication.com',
  'doubleclick.net',
  'googleads.g.doubleclick.net',
  'adservice.google.com',
  'media.ethicalads.io',
  'ethicalads.io',
  'googletagmanager.com',
  'google-analytics.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Bypass third-party ad networks, trackers, and external APIs
  if (BYPASS_DOMAINS.some(domain => url.hostname.includes(domain))) {
    return;
  }

  // Handle HTML document navigations (Network First with Offline Fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // If valid response, clone and update cache
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails (offline), check cache or fallback to offline.html
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // Handle static assets (CSS, JS, Fonts, Images) - Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, nothing to update
          });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
