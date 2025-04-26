self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('aether-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/manifest.json',
        '/aether192.png',
        '/aether512.png',
        '/globals.css'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});