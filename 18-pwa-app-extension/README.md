# Phase 18 — PWA, Offline, App & Extension

Đóng gói mọi kiến thức trước đó thành sản phẩm cài được, chạy offline, và mang lên nhiều nền tảng (mobile app, desktop, extension). Nối trực tiếp Service Worker (03.02), IndexedDB (03.01), cross-tab/background (16.03).

> Bẫy tư duy: "PWA/offline là bật cho có". Sai — offline là *quyết định kiến trúc dữ liệu*: chọn nhầm cái để offline vừa tốn vừa nguy hiểm (hiển thị dữ liệu tài chính cũ, thanh toán trùng).

---

## 18.01 — PWA Fundamentals & Installability
**Bối cảnh:** Muốn app cài lên màn hình chính, mở toàn màn hình như native, có icon riêng — không qua app store.
**Cần nắm:**
- **Web App Manifest**: `name`, `icons` (192/512 + maskable), `display: standalone`, `start_url`, `theme_color`, `background_color`
- Điều kiện installable: manifest hợp lệ + **Service Worker** + HTTPS; `beforeinstallprompt` (custom install button)
- Lighthouse PWA audit; giới hạn trên **iOS/Safari** (không có install prompt, storage bị giới hạn, push muộn) — thiết kế fallback
**Đã đủ khi:** app qua Lighthouse PWA, cài được lên home screen Android, và bạn biết rõ iOS thiếu gì.

## 18.02 — Offline Strategy: cái gì nên offline & offline thế nào
**Bối cảnh:** Câu hỏi cốt lõi. Không phải mọi thứ nên offline — cần một **ma trận quyết định** theo loại dữ liệu.
**Cần nắm — MA TRẬN "loại dữ liệu → chiến lược":**
| Loại | Nên offline? | Cách làm |
|---|---|---|
| App shell (HTML/CSS/JS) | ✅ Luôn | Precache, **cache-first** (asset có hash trong tên) |
| Ảnh/static asset | ✅ | Cache-first + giới hạn dung lượng |
| Dữ liệu đọc (list, profile) | ✅ Với cảnh báo "dữ liệu cũ" | **Stale-while-revalidate** + IndexedDB (03.01), gắn timestamp |
| Mutation của user (tạo/sửa) | ✅ Queue lại | Offline queue → **Background Sync** (16.03) gửi khi có mạng |
| Dữ liệu tài chính/giá real-time | ❌ Không | Luôn network; offline thì hiện trạng thái "cần mạng" |
| Thanh toán / hành động không idempotent | ❌ Tuyệt đối không | Chặn khi offline, tránh gửi trùng |
- **How**: Cache API cho asset, IndexedDB cho data + queue; offline fallback page; **optimistic UI** offline rồi **reconcile** khi sync; xung đột → last-write-wins hoặc CRDT (17.02)
- ⚠️ Update trap (nối 03.02): network-first cho navigation để không kẹt bản cũ
**Đã đủ khi:** có ma trận offline cho app của bạn, và một mutation tạo offline được queue rồi tự sync khi online, không mất/không trùng.

## 18.03 — Build cho App (mobile & desktop)
**Bối cảnh:** Sếp muốn "app trên App Store / Play Store" từ codebase web. Có nhiều đường, chi phí và đánh đổi rất khác nhau.
**Cần nắm — 4 lựa chọn & khi nào dùng:**
- **PWA / TWA**: rẻ nhất, cài từ browser; **TWA** (Trusted Web Activity) đưa PWA lên **Play Store**. Hạn chế native, iOS khó lên store.
- **Capacitor / Ionic**: bọc web app thành native shell, truy cập **native API** (camera, contacts), lên được cả 2 store — tái dùng ~100% code web.
- **React Native / Expo**: native thật (không WebView), chia sẻ *logic/JS* nhưng **không** chia sẻ DOM/CSS — hiệu năng UI native, tốn viết lại UI.
- **Tauri / Electron**: đóng gói web thành app **desktop** (Tauri nhẹ hơn Electron nhiều).
- Tiêu chí chọn: cần bao nhiêu native? store policy? hiệu năng UI? kỹ năng team?
**Đã đủ khi:** cho một yêu cầu cụ thể (VD "app đặt hàng cần camera quét QR, lên cả 2 store"), chọn được đường ship và lý giải trade-off.

## 18.04 — Browser Extension
**Bối cảnh:** Muốn build extension (Chrome/Edge/Firefox) — áp dụng lại toàn bộ kiến thức FE trong một môi trường có luật riêng.
**Cần nắm:**
- **Manifest V3**: `background` = **service worker** (nối 03.02), `content_scripts` (chạy *trong* trang web), `action`/popup, `permissions` (xin tối thiểu — nối bảo mật 05)
- Kiến trúc & giao tiếp: content script ↔ background ↔ popup qua **message passing**; `chrome.storage`; vượt CORS có kiểm soát
- Áp dụng kiến thức: React/Vite cho popup (bundling 02.03), CSP nghiêm ngặt, không `eval`; publish lên store & review policy
**Đã đủ khi:** build một extension nhỏ chạy được: popup (UI) + content script (chèn/sửa trang) + message passing giữa chúng.

---

## Áp dụng ngay vào chính trang học này
Trang `site/` của workspace đã được biến thành **PWA thật**: có `manifest.webmanifest`, `sw.js` (network-first cho navigation — chiến lược an toàn ở 18.02), icon, cài được và mở offline sau lần đầu. Mở `site/sw.js` đọc để thấy chiến lược cache áp dụng đúng lý thuyết.
