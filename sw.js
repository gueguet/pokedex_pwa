const staticCache = 'site-static';

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
  // console.log("Service Worker has been activated !");
})

// fetch event
self.addEventListener('fetch', evt => {
  // console.log("Fetch event !! ", evt);
})