const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';

// here we need to store request urls !
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

// if SW is installed
self.addEventListener('install', evt => {
  // need to be sure caching is done before the install event stop !
  evt.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log("caching assets !");
      return cache.addAll(assets);
    })
  );
});

// activate service worker
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then((keys => {
      console.log(keys); // get all versions of caches
      return Promise.all(keys
        .filter(key => key != staticCache)
        .map(key => caches.delete(key)) // delete all but not the cache names atline first
        )
    }))
  )
})

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => { // if cachesRes is empty --> redo the fetch request and store in dynamic cache
      return cacheRes || fetch(evt.request).then((fetchRes) => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      })
    })
  )
});