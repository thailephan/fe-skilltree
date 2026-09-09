# Phase 16 — Network, Adaptive Delivery & Platform

Cùng một app, trải nghiệm rất khác giữa 4G điện thoại Android và cáp quang PC. Phase này về hiểu tầng mạng và **phân phối thích ứng theo thiết bị/mạng**.

> Bẫy tư duy: test trên máy dev mạnh + wifi văn phòng rồi tưởng ai cũng vậy. Phần lớn người dùng thật ở mobile + mạng chập chờn — thiết kế cho họ.

---

## 16.01 — HTTP/1.1 → HTTP/2 → HTTP/3
**Bối cảnh:** Bạn từng nghe "gộp file để giảm request" — lời khuyên đúng thời HTTP/1.1 nhưng có thể *sai* với HTTP/2. Hiểu tầng vận chuyển đổi cách bạn tối ưu.
**Cần nắm:**
- **HTTP/1.1**: mỗi kết nối 1 request tại một thời điểm → head-of-line blocking → thời đó phải bundle/sprite/domain-sharding
- **HTTP/2**: multiplexing (nhiều request trên 1 kết nối), header compression, server push (đã deprecated) → bớt cần bundle cực đoan
- **HTTP/3 (QUIC over UDP)**: bỏ head-of-line blocking ở tầng transport, kết nối lại nhanh khi đổi mạng (4G↔wifi) — hợp mobile
- Ảnh hưởng tới chiến lược loading (nối 01.04, 02.03): bundle bao nhiêu là đủ với HTTP/2·3
**Đã đủ khi:** giải thích vì sao "gộp mọi thứ vào 1 file" không còn tối ưu với HTTP/2, và HTTP/3 lợi gì cho mobile.

## 16.02 — Adaptive Loading (mobile vs PC, theo mạng/thiết bị)
**Bối cảnh:** Điện thoại Android tầm trung trên 3G không nên tải cùng bundle/ảnh/video như PC. Adaptive loading phục vụ theo năng lực thật của thiết bị.
**Cần nắm:**
- Đo năng lực: **Network Information API** (`navigator.connection.effectiveType`, `saveData`), `navigator.deviceMemory`, `hardwareConcurrency` (nối 06.02)
- Phân phối thích ứng: ảnh/video chất lượng thấp hơn cho mạng yếu, hoãn/không tải tính năng nặng, giảm animation khi `saveData`
- Responsive theo **DPR** (màn retina), mobile-first bundle, conditional import theo thiết bị; server-side UA hints (Client Hints)
- Kiểm thử: throttle mạng/CPU trong DevTools (nối 01.x), test trên thiết bị thật
**Đã đủ khi:** app tải nhẹ hơn có kiểm chứng trên mạng 3G/thiết bị yếu (ảnh nhỏ hơn, hoãn phần nặng), dùng Network Information API.

## 16.03 — Cross-tab & Background
**Bối cảnh:** User mở app ở 3 tab; đăng xuất tab này thì tab kia vẫn đăng nhập. Cần đồng bộ giữa tab và xử lý nền.
**Cần nắm:**
- **BroadcastChannel** — nhắn tin giữa các tab cùng origin (đồng bộ auth/logout, theme, cache); `storage` event
- **Notifications API** & **Push API** (nối Service Worker 03.02) — thông báo khi app đóng
- **Background Sync** / Periodic Sync — gửi dữ liệu khi có mạng lại (nối offline 03.02)
**Đã đủ khi:** logout ở một tab tự đăng xuất mọi tab qua BroadcastChannel; hiểu luồng push notification.

## 16.04 — i18n Workflow (ngoài Intl API)
**Bối cảnh:** 06.01 dạy format bằng Intl API. Nhưng dịch cả app (hàng nghìn chuỗi, số nhiều, ngữ cảnh) cần cả một quy trình.
**Cần nắm:**
- **react-i18next** / FormatJS: file dịch, namespace, **lazy-load locale** (không tải hết mọi ngôn ngữ)
- **ICU message format**: số nhiều (plural), giới tính, biến trong câu — thứ nối chuỗi tay không làm được
- Quy trình dịch: tách chuỗi, key, fallback ngôn ngữ, RTL (nối 06.01/12.02), test thiếu bản dịch
**Đã đủ khi:** app đổi ngôn ngữ runtime, chỉ tải locale đang dùng, và xử lý đúng số nhiều bằng ICU.
