/* Generated at build time. Precaches the full app for offline use. */
const CACHE = 'wm-mv2qkfsp';
const PRECACHE = ["./","./index.html","./assets/index-BqFPdb4f.js","./assets/demo-_UByVI-p.js","./assets/ibm-plex-mono-latin-400-normal-CvHOgSBP.woff","./assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","./assets/ibm-plex-mono-latin-500-normal-CB9ihrfo.woff","./assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2","./assets/ibm-plex-sans-latin-400-normal-CDDApCn2.woff2","./assets/ibm-plex-sans-latin-400-normal-CYLoc0-x.woff","./assets/ibm-plex-sans-latin-500-normal-6ng42L7E.woff2","./assets/ibm-plex-sans-latin-500-normal-BgVn5rGT.woff","./assets/ibm-plex-sans-latin-600-normal-Cu4Hd6ag.woff","./assets/ibm-plex-sans-latin-600-normal-CuJfVYMP.woff2","./assets/index-DM8TN0z3.css","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  // Only this app's caches: other sites on the same origin (e.g. a GitHub Pages user site) keep theirs.
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('wm-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Pages: network first, so a rebuilt app shows up on the next load; the cached copy covers offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Hashed assets never change, so the cache always wins.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).catch(() => caches.match('./index.html')))
  );
});
