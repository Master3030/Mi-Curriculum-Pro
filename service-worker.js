const CACHE_NAME = 'mi-curriculum-pro-v1.0.0';
const urlsToCache = ['./','./index.html','./manifest.json','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>{
    const fp = fetch(e.request).then(r=>{ if(r&&r.status===200&&r.type==='basic'){ const cl=r.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(e.request,cl)); } return r; }).catch(()=>cached);
    return cached||fp;
  }));
});
