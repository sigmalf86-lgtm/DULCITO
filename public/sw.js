// Dulcito Service Worker - High-Performance Asset Caching
const CACHE_NAME = 'dulcito-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/aistudio/sello_circle_exact.png',
  '/assets/aistudio/PONCHE_CREMA_LOGO_bbe2a4ae.jpg',
  '/assets/aistudio/DULCE_DE_LECHE_LOGO_34768add.jpg',
  '/assets/aistudio/CHOCOLATES_LOGO_51b91f48.jpg',
  '/assets/aistudio/QUESILLO_LOGO_5a52b8cf.jpg',
  '/assets/aistudio/Gemini_Generated_Image_7c4os47c4os47c4o_b0abb632.jpg',
  '/assets/aistudio/PAN_DE_JAMON_LOGO_f66ef27c.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Continue even if an asset fails
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache heavy videos in Service Worker to avoid device disk filling
  if (url.pathname.endsWith('.mp4') || event.request.destination === 'video') {
    return;
  }

  // Stale-While-Revalidate for images, fonts, styles, and scripts
  if (
    event.request.destination === 'image' ||
    event.request.destination === 'font' ||
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Network first with cache fallback for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
  }
});
