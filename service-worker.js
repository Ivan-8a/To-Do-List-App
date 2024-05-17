const staticCacheName = 'site-static';

// En el archivo service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/script.js'
      ]);
    })
  );
});

// En el archivo service-worker.js
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// En el archivo service-worker.js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('v1').then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request);
      });
    })
  );
});

// En el archivo service-worker.js
self.addEventListener('updatefound', event => {
  console.log('New service worker found:', event);
});

self.addEventListener('controllerchange', event => {
  console.log('Service worker updated:', event);
});

const assets = [
  '/',
  '/index.html',
  '/script.js',
  '/style.css',
  '/lista.png'
]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  )
})

self.addEventListener('activate', evt => {

});

self.addEventListener('activate', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  )
});