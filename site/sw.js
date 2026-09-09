// Service Worker cho Frontend Mastery — minh hoạ chiến lược an toàn ở bài 18.02 & 03.02.
// Đổi CACHE version mỗi lần deploy nội dung mới để activate dọn cache cũ.
const CACHE = 'fm-v1';
const PRECACHE = ['/', '/index.html', '/manifest.webmanifest', '/icon.svg'];

self.addEventListener('install', (event) => {
  // Không skipWaiting tự động: tránh SW mới tiếp quản giữa chừng (bẫy ở 03.02).
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // NETWORK-FIRST cho điều hướng: luôn lấy bản mới nếu có mạng → không bao giờ kẹt bản cũ.
  // Mất mạng thì fallback về app shell đã cache → vẫn mở được offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/index.html', copy));
          return res;
        })
        .catch(() => caches.match('/index.html').then((r) => r || caches.match('/')))
    );
    return;
  }

  // CACHE-FIRST cho static asset cùng origin (nhanh, tiết kiệm mạng).
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res.ok && new URL(req.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
