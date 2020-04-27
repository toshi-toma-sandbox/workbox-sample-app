console.log("Hello from service-worker.js");

/**
 * Strategy 
 * workbox.strategies.CacheFirst;
 * workbox.strategies.CacheOnly;
 * workbox.strategies.NetworkFirst;
 * workbox.strategies.NetworkOnly;
 * workbox.strategies.StaleWhileRevalidate;;
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(html|css)$/,
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  /^http:\/\/dummy.restapiexample.com\/api\/v1\/create/,
  new workbox.strategies.NetworkOnly({
    plugins: [new workbox.backgroundSync.BackgroundSyncPlugin("bgSync")],
  }),
  "POST"
);

const jsHandler = () => {
  console.log("handle js requests");
  return new workbox.strategies.StaleWhileRevalidate();
};

workbox.routing.registerRoute(/\.(js)$/, new workbox.strategies.StaleWhileRevalidate());

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);
