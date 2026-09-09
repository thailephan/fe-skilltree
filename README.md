# Frontend Mastery — Lộ trình luyện tập từ Mid lên Senior

> Workspace luyện tập theo dự án. Triết lý: **hiểu browser trước, framework sau**. Mỗi bài bám vào một use case thực tế, không học API rời rạc.

## Cách dùng workspace này

1. Đi **tuần tự** từ `00` → `05`. Mỗi phase build trên phase trước.
2. Mỗi bài (mỗi folder con) có `README.md` gồm 6 phần cố định:
   - **Bối cảnh** — vấn đề thực tế bạn đang giải
   - **Mục tiêu** — học được gì sau bài này
   - **Nhiệm vụ** — các bước làm cụ thể
   - **Gợi ý** — hướng đi khi bí (không phải lời giải)
   - **Tiêu chí hoàn thành** — làm sao biết "đã đủ sâu"
   - **Bẫy thường gặp** — lỗi kinh điển senior đã trả giá
3. **Tự làm trước, hỏi sau.** Khi bí, quay lại hỏi mình (Claude) — mình sẽ giải thích kèm ví dụ đo được, không đưa đáp án ngay.
4. Cuối mỗi bài, mở `PROGRESS.md` tick ✅ và viết 1-2 câu "hiểu ra gì".

## Cấu trúc

| Phase | Chủ đề | Thời lượng gợi ý |
|-------|--------|------------------|
| `00-js-browser-foundations` | Event loop, memory, async sâu | 2-3 tuần |
| `01-how-browser-works` | Rendering path, reflow/repaint, layers, loading | 3-4 tuần |
| `02-performance` | Web Vitals, re-render, bundle, web workers | 4-5 tuần |
| `03-browser-apis` | IndexedDB, Service Worker, WebSocket | 5-6 tuần |
| `04-mui-theming` | Theme, customization, dark mode, design tokens | 3-4 tuần |
| `05-security-maintainability` | XSS/CSP, auth/CORS, testing, observability/CI | 4 tuần |
| `project-dashboard` | Dự án xương sống — đi xuyên suốt mọi phase | cả lộ trình |

## Quy tắc vàng

- **Đo được thì phải đo.** Mọi tối ưu phải có số trước/sau (DevTools Performance panel, Lighthouse).
- **Viết lại bằng lời của mình.** Không giải thích được cho người khác = chưa hiểu.
- **Đọc source, không chỉ đọc docs.**

## Setup tối thiểu

- Node.js LTS + pnpm (hoặc npm)
- Chrome (DevTools là công cụ chính)
- VS Code + extension: ESLint, Prettier
- Dự án xương sống dùng: React + TypeScript + Vite + MUI (dựng ở `project-dashboard`)
