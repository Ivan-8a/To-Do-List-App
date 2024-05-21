const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/script.js',
  '/lista.png',
  '/style.css'
]

// Install Service Worker
self.addEventListener('install', evt => {
  console.log('Service Worker has been installed')
  evt.waitUntil(caches.open(staticCacheName).then(cache => {
    console.log('caching shell assets')
    cache.addAll(assets)
  }))
  
});

self.addEventListener('activate', evt => {
  console.log('Service Worker has been activated')
})

self.addEventListener('fetch', evt => {
  console.log('fetch evt', evt)

  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  )
})