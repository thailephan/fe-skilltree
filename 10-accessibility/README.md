# Phase 10 — Accessibility & Inclusive UI

⚠️ Gap nghiêm trọng nhất của Level 1. Một senior **không ship UI mà người khiếm thị / chỉ dùng bàn phím không dùng được** — đây vừa là chất lượng kỹ thuật, vừa là yêu cầu pháp lý ở nhiều thị trường.

> Bẫy tư duy: coi a11y là "tính năng thêm cuối dự án". Thực chất nó là hệ quả của HTML đúng ngữ nghĩa — làm đúng từ đầu gần như miễn phí, vá sau thì đắt.

---

## 10.01 — Semantic HTML & Accessibility Tree
**Bối cảnh:** App toàn `<div onClick>`. Screen reader đọc ra một mớ vô nghĩa, Tab không tới được. Gốc rễ đa số lỗi a11y là dùng sai thẻ.
**Cần nắm:**
- Accessibility tree là gì (browser sinh ra song song DOM cho công nghệ hỗ trợ)
- Dùng đúng element: `<button>` không phải `<div onClick>`; `<a>` cho điều hướng; heading/landmark (`<nav>`, `<main>`)
- Element native "tặng" miễn phí: focusable, keyboard, role, state
**Đã đủ khi:** duyệt được một trang chỉ bằng bàn phím và mở a11y tree trong DevTools giải thích cấu trúc.

## 10.02 — ARIA — và khi nào KHÔNG dùng
**Bối cảnh:** Bạn nghe "thêm ARIA cho accessible" nên rắc `role`/`aria-*` khắp nơi — và làm nó tệ hơn.
**Cần nắm:**
- Quy tắc số 1 của ARIA: **đừng dùng ARIA nếu có HTML native** làm được
- `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live` (thông báo động), `aria-expanded/selected`
- ARIA chỉ đổi *ngữ nghĩa*, KHÔNG thêm hành vi (bạn vẫn phải tự code keyboard)
**Đã đủ khi:** giải thích được vì sao "no ARIA is better than bad ARIA" và dùng `aria-live` cho một cập nhật động.

## 10.03 — Keyboard Navigation & Focus Management
**Bối cảnh:** Mở modal nhưng focus vẫn ở dưới nền, Tab chạy ra sau modal, Esc không đóng. Đây là lỗi a11y phổ biến nhất của component tương tác.
**Cần nắm:**
- Thứ tự Tab, `tabindex` (và vì sao `tabindex > 0` là anti-pattern)
- **Focus trap** trong modal/dialog, trả focus về trigger khi đóng, Esc để thoát
- Roving tabindex cho menu/list; skip-link
**Đã đủ khi:** một modal tự viết quản focus đúng: trap khi mở, Esc đóng, trả focus về nút đã mở nó.

## 10.04 — Screen Readers, Testing & WCAG
**Bối cảnh:** Bạn "nghĩ" nó accessible nhưng chưa bao giờ nghe screen reader đọc app mình. Phải kiểm thật.
**Cần nắm:**
- Dùng thử screen reader (VoiceOver trên Mac) duyệt app của bạn
- Tự động: **axe DevTools**, lint `eslint-plugin-jsx-a11y`; thủ công: keyboard-only, contrast (nối Phase 04 palette)
- **WCAG** ở mức thực dụng (perceivable/operable/understandable/robust), form a11y (label, error liên kết `aria-describedby`)
**Đã đủ khi:** chạy axe sạch lỗi trên một trang, và điều hướng được form đó bằng screen reader + chỉ bàn phím.
