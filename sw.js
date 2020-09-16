const staticCache = 'site-static-v1';
const pokemonCache = 'pokemon-dynamic-v1';

// here we need to store request urls !
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  'img/dresseur_16x16.ico',
  'img/icons/pokedex_80x80.png',
  'img/icons/pokedex_512x512.png',
  'img/icons/maskable_icon.png',
];



// if SW is installed
self.addEventListener('install', evt => {
  // need to be sure caching is done before the install event stop ! 
  evt.waitUntil(
    caches.open(staticCache).then(cache => {
      // getAllPokemon(); // after we cached static file --> cache pokemon info 
      console.log("Caching static assets !");
      return cache.addAll(assets);
    })
  );
});
 



// fetch event --> if a file was cached and we're offline --> return this page
// the pokemon cache will be created after every pokemon are loaded
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => { // if cachesRes is empty --> redo the fetch request and store in dynamic cache
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(pokemonCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });    
    })
  )
});





// activate service worker
// self.addEventListener('activate', evt => {
//   evt.waitUntil(
//     caches.keys().then((keys => {
//       console.log(keys); // get all versions of caches
//       return Promise.all(keys
//         .filter(key => key != staticCache)
//         .map(key => caches.delete(key)) // delete all but not the cache names atline first
//         )
//     }))
//   )
// })


// we want to cache all pokemon informations once and be able to retrieve those offline 
// self.addEventListener("fetch", event => {
//   if (event.request.url.includes("/api/")) {
//     console.log("yeah yeah"); // test
//   } else {
//     console.log("euh...");
//   }
// });