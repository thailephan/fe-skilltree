# Phase 12 — CSS & Layout Mastery

❗ Mảng bị bỏ qua lớn nhất ở Level 1 (nhảy thẳng vào MUI). Một frontend giỏi phải làm chủ CSS gốc — vì thư viện nào rồi cũng có lúc không vừa, và debug layout là việc hằng ngày.

> Bẫy tư duy: "dùng framework CSS là đủ, không cần hiểu CSS". Sai — framework chỉ đóng gói CSS. Không hiểu gốc thì mọi bug layout thành phép thử-sai.

---

## 12.01 — Flexbox & Grid tới nơi
**Bối cảnh:** Bạn canh layout bằng `margin`/`float`/`position` chắp vá, responsive vỡ liên tục. Flexbox & Grid giải quyết triệt để nhưng nhiều người chỉ dùng 20% sức mạnh.
**Cần nắm:**
- Flexbox: `flex-grow/shrink/basis` (hiểu `flex: 1` thực sự là gì), `align`/`justify`, khi nào 1 chiều
- Grid: `grid-template`, `fr`, `minmax()`, `auto-fit`/`auto-fill`, `grid-area`, layout 2 chiều
- Chọn Flex vs Grid đúng: Flex cho luồng 1 chiều, Grid cho lưới 2 chiều — không lạm dụng
**Đã đủ khi:** dựng được layout dashboard phức tạp (sidebar co giãn, grid card responsive) chỉ bằng Flex/Grid, không hack.

## 12.02 — Responsive & Adaptive (fluid, không breakpoint cứng)
**Bối cảnh:** Bạn viết 5 media query cho 5 kích thước và vẫn vỡ ở giữa. CSS hiện đại làm responsive mượt hơn nhiều.
**Cần nắm:**
- **Container queries** — responsive theo *container* thay vì viewport (component thật sự tái dùng được)
- Fluid: `clamp()`, `min()`, `max()` cho type/spacing co giãn mượt không breakpoint
- Logical properties (`inline`/`block`) cho RTL (nối 06.01), `aspect-ratio`, mobile-first
**Đã đủ khi:** một card component tự thích ứng theo container (không phải viewport) và type co giãn mượt bằng `clamp()`.

## 12.03 — Modern CSS (2026)
**Bối cảnh:** Bạn viết JS để làm việc CSS giờ đã làm được native (chọn parent, đóng gói scope). Bỏ lỡ = code thừa.
**Cần nắm:**
- `:has()` — "parent selector", chọn theo con (thay nhiều JS)
- **Cascade layers** (`@layer`) — quản lý độ ưu tiên có chủ đích, hết chiến tranh specificity (nối bài học CSS ở 04.02)
- CSS nesting native, subgrid, `:is()`/`:where()`, custom properties nâng cao (nối design tokens 04.04)
**Đã đủ khi:** thay được một đoạn JS bằng `:has()`, và dùng `@layer` để kiểm soát cascade thay vì `!important`.

## 12.04 — Kiến trúc CSS & Styling Strategy
**Bối cảnh:** Codebase lớn, CSS phình, đè nhau, không ai dám xoá dòng nào vì sợ vỡ chỗ khác. Cần chiến lược.
**Cần nắm:**
- So sánh: BEM, **CSS Modules**, **Tailwind** (utility-first), **CSS-in-JS** (Emotion — nối 04.02), zero-runtime (vanilla-extract) — trade-off runtime/DX/bundle
- Scoping, tránh global leak, dead-code elimination cho CSS
- Khi nào chọn cái nào cho quy mô team nào (nối 11.02 design system)
**Đã đủ khi:** biện hộ được lựa chọn styling strategy cho một dự án cụ thể với trade-off rõ ràng.

## 12.05 — CSS Image Handling cơ bản
**Bối cảnh:** Ảnh bị méo, tràn khung, không canh giữa; background không vừa; avatar hình vuông thành méo. Xử lý ảnh bằng CSS là việc hằng ngày mà rất nhiều người làm sai.
**Cần nắm:**
- **`object-fit`** (`cover`/`contain`/`fill`) + **`object-position`** — cho `<img>` vừa khung mà **không méo** (mấu chốt của avatar/thumbnail/card)
- `background-image` + `background-size` (`cover`/`contain`) + `background-position` + `background-repeat`; **khi nào `<img>` vs background**: nội dung thật (có ý nghĩa, cần a11y/SEO) → `<img>`; trang trí → background
- **`aspect-ratio`** giữ tỉ lệ khung chống CLS (nối 02.01); ảnh responsive: `max-width: 100%; height: auto`
- CSS sprite (gộp icon), `image-rendering` (pixel art), overlay ảnh (gradient + image), `filter`/`backdrop-filter`
- Blur/placeholder bằng CSS (nối image handling nâng cao 15.04)
**Đã đủ khi:** đặt được ảnh bất kỳ vào một khung cố định không méo/không tràn bằng `object-fit`, giữ đúng tỉ lệ bằng `aspect-ratio`, và chọn đúng `<img>` vs background theo ngữ cảnh.
