# Phase 06 — Web Platform, Media & SEO

Cầu nối Level 1 → Level 2. Level 1 dạy browser *chạy* thế nào; phase này dạy tận dụng những **API nền tảng** mà lập trình viên React hay bỏ quên — trong khi chúng giải quyết nhu cầu thật: hiển thị đúng ngôn ngữ/giờ địa phương, xin vị trí, tải media nhanh, và để search/AI hiểu trang.

> Bẫy tư duy: nhiều dev import cả thư viện cho việc browser đã làm sẵn (format ngày, lazy load, intersection). Senior biết cái gì đã có native.

---

## 06.01 — Intl & Internationalization
**Bối cảnh:** App bán ra 5 nước. Ngày `09/10/2026` là 9 tháng 10 hay 10 tháng 9? Giá `1.000` là một nghìn hay một phẩy không? Format bằng tay là sai.
**Cần nắm:**
- `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`, `Intl.Collator` (sort theo locale)
- Timezone IANA (`Asia/Ho_Chi_Minh`), lưu UTC — hiển thị local; giới thiệu **Temporal API** (thay `Date` cũ nát)
- `navigator.language`, thuộc tính HTML `lang` và `dir` (RTL cho tiếng Ả Rập), pluralization
**Đã đủ khi:** format được ngày/giờ/số/tiền theo locale bất kỳ không dùng thư viện, và giải thích được vì sao luôn lưu UTC.

## 06.02 — Geolocation & Context APIs
**Bối cảnh:** Tính năng "cửa hàng gần bạn" cần vị trí. Xin sai cách → user từ chối vĩnh viễn, hoặc vi phạm luật riêng tư.
**Cần nắm:**
- Geolocation API + **Permissions API** (kiểm tra trạng thái quyền trước khi xin), xin quyền đúng ngữ cảnh (sau hành động của user, không phải lúc load)
- Fallback IP-geolocation (xu hướng 2026 vì luật riêng tư siết) khi user từ chối toạ độ
- Page Visibility API, Network Information API (`navigator.connection`) để thích ứng theo mạng/tab
**Đã đủ khi:** xin quyền đúng thời điểm, xử lý gọn 3 trạng thái (granted/denied/prompt), có fallback khi bị từ chối.

## 06.03 — Media hiện đại (ảnh & video)
**Bối cảnh:** Ảnh hero 2MB làm LCP 5 giây trên mobile. Đây là nguyên nhân performance phổ biến nhất thực tế.
**Cần nắm:**
- `<picture>` + `srcset` + `sizes` (responsive), **AVIF/WebP** (mặc định 2026), luôn set `width`/`height` (chống CLS)
- `loading="lazy"` native — **KHÔNG** đặt lên ảnh LCP; `decoding="async"`; `fetchpriority="high"` cho ảnh LCP
- `<video>`: `preload`, `poster`, lazy-load, adaptive streaming (HLS/DASH ở mức khái niệm)
**Đã đủ khi:** giảm được LCP đo bằng số nhờ tối ưu ảnh, và giải thích được vì sao lazy-load ảnh LCP là phản tác dụng.

## 06.04 — SEO & Document Head
**Bối cảnh:** Trang không lên Google, share Facebook ra thẻ trống. Với SPA điều này càng dễ sai.
**Cần nắm:**
- Semantic HTML (`<article>`, `<nav>`, `<main>`, heading hierarchy) — nền của cả SEO lẫn a11y
- Meta tags (title, description, canonical), **Open Graph** + Twitter Card, quản lý `<head>` động
- **JSON-LD structured data** (Schema.org) — 2026 là metadata có upside cao nhất vì AI/search trích thẳng
- Vì sao CSR thuần hại SEO → dẫn sang Phase 09 (SSR/SSG)
**Đã đủ khi:** một trang có đủ meta + OG + JSON-LD, test được bằng Rich Results Test và share preview.

## 06.05 — Observers & Delivery nâng cao
**Bối cảnh:** Bạn viết tay `scroll` listener để lazy load / infinite scroll → giật và tốn. Có API native làm việc đó tốt hơn.
**Cần nắm:**
- **IntersectionObserver** (lazy load, infinite scroll, active section) — nền của mọi kỹ thuật viewport
- **ResizeObserver**, **MutationObserver** — phản ứng theo kích thước/thay đổi DOM đúng cách
- Delivery: `fetchpriority`, **Speculation Rules API** (prerender/prefetch trang kế) — nâng cấp bài 01.04
- **View Transitions API** — chuyển trang/state mượt như native (hot 2026)
**Đã đủ khi:** thay được một scroll-listener thủ công bằng IntersectionObserver và giải thích lợi ích; dùng Speculation Rules cho một điều hướng.

## 06.06 — Iframe, Embedding & Cross-origin Communication
**Bối cảnh:** Bạn nhúng widget bên thứ 3 (map, cổng thanh toán, chat), hoặc app của bạn bị nhúng vào trang khác, hoặc inject một iframe/widget vào trang (kiểu Intercom/Disqus, hay content script của extension — nối 18.04). Giao tiếp qua ranh giới origin phải an toàn.
**Cần nắm:**
- iframe cơ bản: `src` vs `srcdoc`, `loading="lazy"` (nối 06.03), `allow` (permissions policy), `referrerpolicy`, resize theo nội dung
- **Cross-origin communication**: `window.postMessage` + sự kiện `message` — **LUÔN** kiểm tra `event.origin` và chỉ định `targetOrigin` (không dùng `*` cho dữ liệu nhạy cảm)
- **Sandbox** (`sandbox` attribute): cô lập nội dung không tin cậy, chỉ cấp quyền tối thiểu (`allow-scripts`, `allow-forms`…)
- **Inject frame**: dựng một widget nhúng được (script tạo iframe vào trang chủ nhà), tự co giãn chiều cao qua postMessage
- Khi *bị* nhúng — chống **clickjacking**: `X-Frame-Options` / CSP `frame-ancestors` (nối 05.01) để chặn nhúng trái phép
**Đã đủ khi:** nhúng một iframe cross-origin và giao tiếp 2 chiều bằng postMessage có kiểm tra origin, đồng thời cấu hình được chặn trang mình khỏi bị nhúng trái phép.
