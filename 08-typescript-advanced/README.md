# Phase 08 — TypeScript nâng cao

Level 1 dùng TS ở mức "annotate cho khỏi lỗi". Level 2: **thiết kế type để compiler bắt lỗi thay con người**, và để API của bạn tự-tài-liệu-hoá. Đây là kỹ năng phân biệt rõ senior FE.

> Bẫy tư duy: rải `any`/`as` khi type khó. Mỗi `any` là một lỗ hổng nơi compiler ngừng bảo vệ bạn. Senior xem `any` là mùi code cần điều tra.

---

## 08.01 — Generics & Inference
**Bối cảnh:** Bạn viết một hàm `getById` trả `any`, mất hết gợi ý và an toàn. Generic giữ được quan hệ type giữa input và output.
**Cần nắm:**
- Generic function/type, ràng buộc `extends`, default type param
- Type inference: để TS tự suy thay vì annotate thừa; `as const` và literal types
- Viết hàm util generic tái dùng (ví dụ `pick`, `groupBy`) giữ nguyên type
**Đã đủ khi:** viết được một hàm generic mà IDE tự suy đúng type trả về theo input, không cần ép kiểu.

## 08.02 — Union, Discriminated Unions & Narrowing
**Bối cảnh:** State có 4 dạng (idle/loading/success/error) nhưng bạn dùng nhiều boolean rời → tổ hợp bất khả thi vẫn lọt (loading + error cùng true).
**Cần nắm:**
- Discriminated union (`{ status: 'success', data } | { status: 'error', error }`) — làm trạng thái sai *không biểu diễn được*
- Type narrowing (typeof, in, type guard), `never` cho **exhaustiveness check** (thêm case là compiler báo)
- Nối trực tiếp với XState/07.03
**Đã đủ khi:** mô hình state bằng discriminated union và có exhaustive switch mà compiler ép xử lý đủ case.

## 08.03 — Mapped, Conditional & Template Literal Types
**Bối cảnh:** Bạn muốn một type "giống type kia nhưng tất cả optional", hoặc suy type từ giá trị runtime. Đây là type-level programming.
**Cần nắm:**
- Utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`) và tự viết lại chúng để hiểu
- Mapped types, conditional types (`T extends U ? X : Y`), `infer`
- Template literal types (route type-safe, event name), khi nào dừng lại (đừng over-engineer type)
**Đã đủ khi:** tự viết được `Partial`/`Pick` từ đầu và một conditional type giải quyết một nhu cầu thật.

## 08.04 — Type-safe Boundaries (Runtime meets Types)
**Bối cảnh:** API trả JSON bạn *khai* là `User`, nhưng runtime nó thiếu field → crash. TS không kiểm tra runtime; ranh giới I/O là nơi type "nói dối".
**Cần nắm:**
- **zod** (hoặc valibot): validate runtime + suy type từ schema (một nguồn chân lý)
- Type hoá `fetch`/API layer, parse response tại biên, không tin dữ liệu ngoài (nối 05.01)
- End-to-end type safety (khái niệm tRPC), tránh `any` ở ranh giới
**Đã đủ khi:** mọi dữ liệu vào app (API, localStorage, URL) được validate tại biên và có type suy ra từ schema.
