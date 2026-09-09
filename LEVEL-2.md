# LEVEL 2 — Architecture & Engineering Leadership

> Level 1 (Phase 00–05) dạy bạn **làm một app tốt**: hiểu browser, tối ưu, bảo mật, bảo trì.
> Level 2 dạy bạn **thiết kế hệ thống frontend cho quy mô**: nhiều người dùng, nhiều team, sống nhiều năm.
> Đây là ranh giới **Senior IC → Staff / Architect**.

## Bản đồ Level 2

| Phase | Chủ đề | Biến bạn thành |
|-------|--------|----------------|
| `06-web-platform-media-seo` | Intl, geolocation, media hiện đại, SEO, observers, delivery | Người tận dụng hết web platform, không chỉ React |
| `07-state-data-architecture` | Client vs server state, TanStack Query, state machines, forms | Người thiết kế luồng dữ liệu không sinh bug |
| `08-typescript-advanced` | Generics, conditional/mapped types, type-safe boundaries | Người dùng compiler để bắt lỗi thay con người |
| `09-rendering-architectures` | CSR/SSR/SSG/ISR, hydration, streaming, RSC, meta-frameworks | Người ra quyết định kiến trúc render đúng |
| `10-accessibility` | Semantic HTML, ARIA, keyboard, focus, screen reader, WCAG | Người ship UI ai cũng dùng được |
| `11-design-systems-scale` | Component API, monorepo, micro-frontend, system design, leadership | Người dẫn dắt kiến trúc & team |

## Nguyên tắc Level 2

- **Trade-off thay vì đúng/sai.** Level 1 có câu trả lời đúng ("transform rẻ hơn top"). Level 2 phần lớn là *đánh đổi có bối cảnh* — senior giỏi ở chỗ chọn đúng cho tình huống, và giải thích được vì sao.
- **Thiết kế cho người khác đọc.** Code, type, component API, tài liệu — tất cả viết cho đồng đội tương lai, không phải cho compiler chạy được là xong.
- **Quyết định có dấu vết.** Mỗi lựa chọn kiến trúc lớn → viết lại thành RFC/ADR để team hiểu và phản biện.

## Elective / Deep-dives (chọn theo nhu cầu, không bắt buộc)

- **WebAssembly** — bước tiếp theo của "xử lý dữ liệu nặng" (nối bài 02.04): chạy code C++/Rust tốc độ near-native trong browser.
- **Advanced animation** — Web Animations API, FLIP, spring physics, View Transitions chuyên sâu.
- **Local-first & CRDT** — đồng bộ offline, giải quyết xung đột (nối 03.01/03.02) kiểu Linear/Figma.
- **WebGPU** — tính toán/đồ hoạ song song trên GPU.

## Thứ tự đề xuất

`06` → `07` → `08` chạy song song được (nền tảng). `09` cần `06`+`07`. `10` học bất cứ lúc nào (và nên bắt đầu sớm). `11` là capstone — học sau cùng, khi đã có đủ nền để nói chuyện kiến trúc.
