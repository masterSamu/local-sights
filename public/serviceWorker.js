/* eslint-disable no-restricted-globals */
let CACHE_NAME = "version-10"; // Update version before every deployment
const urlsToCache = ["/", "/bookmarks", "/index.html", "../src"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  
  this.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  
  event.respondWith(
    /*fetch(event.request)
    .catch(error => {
      return caches.match(event.request)
    })*/
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("response:", response)
        return response;
      }
      console.log("event:", event.request)
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  this.registration
    .unregister()
    .then(() => {
      console.log("activated cache");
      return this.clients.matchAll();
    })
    .then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    });
    
});


