const staticCacheName = 'site-static';


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