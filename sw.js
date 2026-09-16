const CACHE_NAME = "bower-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/config.js",
  "./js/no-auth.js",
  "./js/knockout-engine.js",
  "./js/allergy-sort-engine.js",
  "./js/app.js",
  "./manifest.json",
  "./images/food-hero.jpg",
  "./images/wine-circle.jpg",
  "./images/bar-circle.jpg",
  "./images/coffee-circle.jpg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./fonts/gloock-latin-400-normal.woff2",
  "./fonts/inter-latin-400-normal.woff2",
  "./fonts/inter-latin-500-normal.woff2",
  "./fonts/inter-latin-600-normal.woff2",
  "./fonts/inter-latin-700-normal.woff2",
  "./fonts/space-mono-latin-400-normal.woff2",
  "./fonts/space-mono-latin-700-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
