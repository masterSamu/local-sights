let CACHE_NAME = "version-10"; // Update version before every deployment
const urlsToCache = ["/", "/bookmarks"];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache, { cache: "reload" });
    })
  );
  this.skipWaiting();
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

this.addEventListener("activate", (event) => {
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
