// Asignar nombre y versión de la Cache

const CACHE_NAME = 'v1_cache_pavel_pwa';
const RUNTIME = 'runtime';

// Ficheros a cachear en la aplicación

var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/imagen1.png',
	'./img/imagen2.png',
	'./img/imagen3.png',
	"./img/android-icon-192x192.png",
	"./img/android-icon-144x144.png",
	"./img/android-icon-48x48.png",
	"./img/android-icon-36x36.png"
];

// Evento Install
// Instalación del serviceWorker y guardar en cache los recursos estaticos

self.addEventListener('install', event => {
  console.log('LLego al evento Install...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(self.skipWaiting())
  );
});


// Evento Activate
// Que la App funcione sin conexión
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});



// Evento Fetch
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});


