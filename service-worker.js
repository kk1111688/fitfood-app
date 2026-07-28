const CACHE_NAME = 'fitfood-v3';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg'
];

// 安装：预缓存基础资源，立即跳过等待激活
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// 激活：删除所有旧版本缓存，立即接管页面
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) return;

  // 导航请求（HTML 页面）：网络优先，确保拿到最新版本
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(request, networkResponse.clone()));
          return networkResponse;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源：缓存优先，回退到网络
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // 后台更新缓存
        fetch(request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
        return networkResponse;
      });
    })
  );
});
