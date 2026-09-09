# Phase 11 — Design Systems & Frontend Architecture at Scale

Capstone của Level 2. Đến đây bạn không còn "viết feature" mà **thiết kế nền tảng cho người khác viết feature**, và dẫn dắt quyết định kỹ thuật. Đây là công việc thực sự của staff/architect.

> Bẫy tư duy: đo giá trị bằng "code mình viết". Ở level này giá trị đo bằng "code người khác viết tốt hơn nhờ nền tảng & quyết định của mình".

---

## 11.01 — Component API Design & Composition
**Bối cảnh:** Một `<Button>` có 25 props (`isPrimary`, `isLarge`, `hasIcon`...) — mỗi nhu cầu mới lại thêm prop, không ai dùng nổi. API component tốt là kỹ năng thiết kế thật.
**Cần nắm:**
- Prop drilling vs **compound components** (`<Select><Select.Option/></Select>`)
- **Headless components** (logic tách khỏi style — Radix/Headless UI): tái dùng hành vi, tự do giao diện
- `children`/composition thay vì config prop bùng nổ; controlled vs uncontrolled API
**Đã đủ khi:** thiết kế lại một component "God-props" thành compound/headless mà vẫn linh hoạt hơn.

## 11.02 — Design System Packaging & Docs
**Bối cảnh:** Nối Phase 04 (theme/tokens). Giờ đóng gói thành thư viện nhiều team import, versioning và tài liệu tử tế.
**Cần nắm:**
- **Storybook**: tài liệu sống + test tương tác + a11y addon (nối Phase 10)
- Đóng gói: build ESM, tree-shakable (nối 02.03), semver, changelog, publish (npm/registry nội bộ)
- Token pipeline → Figma (Style Dictionary), giữ design & code đồng bộ
**Đã đủ khi:** publish được một package component có Storybook, versioned, một team khác import dùng được.

## 11.03 — Monorepo, Boundaries & Micro-frontends
**Bối cảnh:** 5 team, 1 sản phẩm. Code chung ở đâu? Deploy độc lập thế nào? Sai kiến trúc → mọi thay đổi nhỏ phải build cả thế giới.
**Cần nắm:**
- **Monorepo** (Turborepo/Nx): chia package, ranh giới phụ thuộc, cache build, task graph
- **Micro-frontends** & **Module Federation**: khi nào đáng (nhiều team autonomy) và cái giá (phức tạp, bundle trùng)
- Contract giữa các phần (types dùng chung, versioning API nội bộ)
**Đã đủ khi:** biện hộ được monorepo vs micro-frontend cho một bối cảnh tổ chức cụ thể, có trade-off rõ.

## 11.04 — Frontend System Design
**Bối cảnh:** "Thiết kế news feed / chat / autocomplete cho 10 triệu user" — câu hỏi phỏng vấn staff và cũng là công việc thật.
**Cần nắm:**
- Khung phân tích: yêu cầu → data model → API/giao tiếp (nối WebSocket 03.03) → render strategy (Phase 09) → state (Phase 07) → performance (Phase 02) → a11y (Phase 10)
- Case thật: infinite feed (virtualization + caching), autocomplete (debounce + cancel + cache), real-time chat (optimistic + reconnect + ordering)
- Quản lý bộ nhớ/perf ở quy mô, đo bằng RUM (nối 05.04)
**Đã đủ khi:** trình bày được thiết kế đầu-cuối cho một trong các case trên, gọi tên trade-off ở mỗi lớp.

## 11.05 — Technical Leadership
**Bối cảnh:** Phần "không code" quyết định bạn có lên staff không: dẫn dắt quyết định, nâng cả team, quản nợ kỹ thuật.
**Cần nắm:**
- **RFC / ADR**: viết đề xuất kiến trúc để team phản biện; ghi lại "vì sao" của quyết định
- Văn hoá **code review** (nối kỹ năng review từ Phase 05): review kiến trúc & khả năng bảo trì, không chỉ bắt lỗi
- Quản **tech debt** có chủ đích (nợ nào trả, nào chịu), estimation, mentor junior, dẫn dắt migration lớn
**Đã đủ khi:** viết được một RFC cho một quyết định kỹ thuật thật (có bối cảnh, phương án, trade-off, đề xuất) mà đồng đội đọc hiểu và phản biện được.
