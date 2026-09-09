# Phase 15 — Animation & Graphics

Level 1 (01.03) hiểu compositor để animation *mượt*. Phase này về *tạo ra* animation & đồ hoạ: Web Animations API, SVG, Canvas, và xử lý ảnh nâng cao (fallback, placeholder, quick display).

> Bẫy tư duy: animate mọi thứ vì "trông xịn". Animation tốt phục vụ ý nghĩa (phản hồi, hướng dẫn, không gian) — thừa thì rối và tốn. Ít mà đúng hơn nhiều mà loạn.

---

## 15.01 — Web Animations API & Animation Craft
**Bối cảnh:** CSS transition không đủ cho animation phức tạp (điều khiển play/pause/seek, chuỗi động). WAAPI cho kiểm soát bằng JS mà vẫn chạy trên compositor.
**Cần nắm:**
- **Web Animations API**: `element.animate()`, keyframes, timeline, play/pause/reverse/seek — mạnh hơn CSS mà vẫn hiệu năng tốt (nối 01.03)
- **FLIP** technique (First-Last-Invert-Play) — animate layout change mượt mà không reflow mỗi frame
- Spring physics, easing, stagger; **View Transitions API** (nối 06.05) cho chuyển trang; `prefers-reduced-motion` (nối a11y 10)
- Khi nào CSS đủ, khi nào WAAPI, khi nào thư viện (Framer Motion / GSAP)
**Đã đủ khi:** làm một list reorder animate mượt bằng FLIP, và tôn trọng `prefers-reduced-motion`.

## 15.02 — SVG chuyên sâu
**Bối cảnh:** Icon, biểu đồ, minh hoạ cần sắc nét ở mọi độ phân giải và animate được. SVG làm được nhưng nhiều dev chỉ biết dán code.
**Cần nắm:**
- `viewBox` & coordinate system (gốc của mọi hiểu lầm SVG), `preserveAspectRatio`
- `path` (lệnh M/L/C/A), `stroke-dasharray` (animate vẽ nét), gradient, mask, clip
- SVG sprite, tối ưu (SVGO), inline vs `<img>` vs background — trade-off; a11y cho SVG (`title`, `role`)
**Đã đủ khi:** đọc/sửa được path SVG bằng tay, làm một icon animate "vẽ nét", và biết khi nào inline vs sprite.

## 15.03 — Canvas & Image Processing
**Bối cảnh:** Cần vẽ hàng nghìn phần tử (biểu đồ real-time, game, whiteboard) — DOM/SVG quá chậm. Canvas vẽ pixel trực tiếp.
**Cần nắm:**
- Canvas 2D context: vẽ shape/text/image, transform, `requestAnimationFrame` loop (nối 00.01)
- **Xử lý ảnh**: vẽ ảnh lên canvas, đọc/sửa pixel (`getImageData`), resize/crop/filter client-side, export blob
- Canvas vs SVG (retained vs immediate mode) — khi nào cái nào; **OffscreenCanvas** + Worker (nối 02.04) cho vẽ nặng; giới thiệu WebGL/WebGPU
**Đã đủ khi:** vẽ được một visualization động bằng canvas với rAF loop, và resize/nén một ảnh phía client bằng canvas.

## 15.04 — Image Handling nâng cao (fallback · lazy · quick display)
**Bối cảnh:** Ảnh lỗi mạng → icon vỡ xấu; lazy load → khoảng trống rồi ảnh "bụp" ra gây CLS; ảnh nặng → chờ lâu mới thấy gì. Cần trải nghiệm ảnh mượt production-grade.
**Cần nắm:**
- **Xử lý lỗi tải**: `onerror` → ảnh fallback/placeholder, retry, tránh icon vỡ
- **Quick display / progressive**: **LQIP / blur-up** (ảnh mờ nhẹ hiện ngay rồi thay ảnh nét), BlurHash, dominant-color placeholder — lấp khoảng trống, chống CLS (nối 02.01)
- Kết hợp lazy load (06.03) + `fetchpriority` + `decoding="async"`; skeleton; preload ảnh quan trọng
- Responsive theo DPR & `sizes` (nối 06.03), fallback format (AVIF → WebP → JPEG) bằng `<picture>`
**Đã đủ khi:** một ảnh có: placeholder blur hiện ngay, lazy load ngoài viewport, fallback khi lỗi, và không gây CLS.
