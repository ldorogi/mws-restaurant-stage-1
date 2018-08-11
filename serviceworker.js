let staticCacheName = 'pages-cache-1';

/**
 * List of URL's to be cached
 */
let urlsToCache = [
    '.',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',

];

/**
 * Install event listener of the service worker: add UL's to the cache
 */
self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            console.log(cache);
            return cache.addAll(urlsToCache);

        }).catch(err => {
            console.log(err);
        })
    );
});

/**
 * Activate service worker and delete old cache
 */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('pages-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/**
 * If a request doesn't match anything in the cache, 
 * get it from the network,
 * send it to the page & add it to the cache at the same time.
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});