'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'qcard-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  'manifest.json',
  'index.html',
  'global.css',
  '/build/bundle.js',
  '/build/bundle.css',
  'favicon.png',
  'icons/'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');

  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );

  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {

	// Clone the request for fetch and cache
	// A request is a stream and can be consumed only once.
	var fetchRequest = event.request.clone(),
		cacheRequest = event.request.clone();

	// Respond with content from fetch or cache
	event.respondWith(

		// Try fetch
		fetch(fetchRequest)

			// when fetch is successful, we update the cache
			.then(function(response) {

				// A response is a stream and can be consumed only once.
				// Because we want the browser to consume the response,
				// as well as cache to consume the response, we need to
				// clone it so we have 2 streams
				var responseToCache = response.clone();

				// and update the cache
				caches
					.open(self.CACHE_NAME)
					.then(function(cache) {

						// Clone the request again to use it
						// as the key for our cache
						var cacheSaveRequest = event.request.clone();
						cache.put(cacheSaveRequest, responseToCache);

					});

				// Return the response stream to be consumed by browser
				return response;

			})

			// when fetch times out or fails
			.catch(function(err) {

				// Return the promise which
				// resolves on a match in cache for the current request
				// ot rejects if no matches are found
				return caches.match(cacheRequest);

			})
	);
});

// Now we need to clean up resources in the previous versions
// of Service Worker scripts
self.addEventListener('activate', function(event) {

	// Destroy the cache
	event.waitUntil(caches.delete(self.CACHE_NAME));

});