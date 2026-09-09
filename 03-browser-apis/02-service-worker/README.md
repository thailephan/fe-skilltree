# Bài 03.02 — Service Worker & Offline (PWA)

## Bối cảnh
Người dùng dashboard đi tàu điện, mất mạng liên tục. Yêu cầu: app vẫn mở được, xem được dữ liệu đã tải. Service Worker là proxy nằm giữa app và network, cho phép cache và phục vụ offline.

> ⚠️ Đây là API dễ gây tai nạn production nhất. SW cấu hình sai có thể "khóa" người dùng ở phiên bản cũ. Làm chậm, hiểu kỹ update flow.

## Mục tiêu
- Hiểu lifecycle: install → activate → fetch; và vấn đề update
- Áp dụng caching strategies: cache-first, network-first, stale-while-revalidate
- Biến app thành PWA installable, chạy offline

## Nhiệm vụ
1. Đăng ký một Service Worker tối giản. Quan sát lifecycle trong DevTools **Application → Service Workers**.
2. Cache "app shell" (HTML/CSS/JS) trong sự kiện `install`, phục vụ **cache-first** khi `fetch`. Tắt mạng (DevTools Offline), xác nhận app vẫn load.
3. Với API data: áp dụng **stale-while-revalidate** (trả cache ngay, đồng thời fetch nền cập nhật). Kết hợp IndexedDB từ bài 03.01.
4. Thực hành update flow: sửa SW, quan sát "waiting" state, hiểu `skipWaiting` + `clients.claim` và rủi ro của chúng.
5. Thêm `manifest.json` để app installable. Test "Add to Home Screen".
6. (Thực tế) Dùng **Workbox** để làm lại phần caching — so sánh với bản viết thô.

## Gợi ý
- Cache-first: nhanh nhưng dễ phục vụ đồ cũ → hợp asset có hash trong tên.
- Network-first: luôn mới nếu có mạng, fallback cache → hợp dữ liệu quan trọng.
- Stale-while-revalidate: cân bằng tốc độ + độ mới → hợp phần lớn API data.

## Tiêu chí hoàn thành
- [ ] App load được khi offline (app shell + dữ liệu cache)
- [ ] Áp dụng đúng 3 chiến lược cache cho 3 loại resource khác nhau
- [ ] Giải thích được update flow và cách tránh "khóa người dùng ở bản cũ"

## Bẫy thường gặp
- Cache-first cho HTML gốc → user kẹt bản cũ mãi dù đã deploy bản mới.
- `skipWaiting` bừa bãi → SW mới tiếp quản giữa chừng, app đang chạy dùng asset không khớp.
- Quên chiến lược dọn cache cũ trong `activate` → phình storage.
- Test SW trên `file://` (không chạy) — cần HTTPS hoặc `localhost`.
