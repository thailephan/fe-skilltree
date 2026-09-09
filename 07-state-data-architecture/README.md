# Phase 07 — State & Data Architecture

Nơi hầu hết bug "khó tái hiện" của app lớn nằm: dữ liệu cũ, race condition, state phình to, đồng bộ sai. Level 1 dạy *gọi* API (bài 00.03); phase này dạy *kiến trúc* luồng dữ liệu.

> Bẫy tư duy lớn nhất: coi mọi thứ là "state" và nhét hết vào Redux/useState. Senior tách rõ **client state** và **server state** — hai thứ có vòng đời hoàn toàn khác nhau.

---

## 07.01 — Client State vs Server State (mô hình cốt lõi)
**Bối cảnh:** Bạn fetch data vào `useState`, rồi tự quản loading/error/refetch/cache... và code phình ra, dữ liệu giữa các component lệch nhau.
**Cần nắm:**
- **Server state**: dữ liệu sở hữu bởi server, bạn chỉ *mượn về cache* — cần refetch, invalidation, đồng bộ. KHÁC hẳn client state.
- **Client state**: UI state thuần (modal mở/đóng, tab active, form nháp) — bạn sở hữu 100%.
- Vì sao dùng `useState`/Redux cho server state là sai gốc rễ (không có TTL, không dedupe, không background refetch).
**Đã đủ khi:** nhìn một biến state là phân loại được client hay server và biết công cụ nào hợp.

## 07.02 — Data Fetching với TanStack Query
**Bối cảnh:** Cần cache, tự refetch khi focus lại tab, dedupe request trùng, optimistic update khi user bấm like.
**Cần nắm:**
- Query key, staleTime vs gcTime, background refetch, dedupe, retry
- **Invalidation** sau mutation (nguồn của "dữ liệu không tự cập nhật")
- **Optimistic update** + rollback khi lỗi; pagination & infinite query
- So sánh TanStack Query vs SWR vs RTK Query
**Đã đủ khi:** một mutation cập nhật UI lạc quan rồi rollback đúng khi API lỗi, và cache invalidate đúng chỗ.

## 07.03 — Client State: Context / Zustand / Redux / XState
**Bối cảnh:** Còn lại phần client state — chọn công cụ nào? Chọn sai → re-render toàn cây (nối 02.02) hoặc boilerplate ngập đầu.
**Cần nắm:**
- `useState`/`useReducer` local → Context (nhỏ, ít đổi) → **Zustand** (global gọn) → **Redux Toolkit** (lớn, cần devtools/time-travel)
- Vì sao Context không phải state manager (re-render mọi consumer khi value đổi)
- **XState / state machines**: khi flow có nhiều trạng thái phức tạp (wizard, upload, auth) — mô hình hoá thay vì rải boolean `isLoading/isError/isSuccess`
**Đã đủ khi:** biện hộ được lựa chọn state tool cho một feature cụ thể, và refactor được một "boolean soup" thành state machine.

## 07.04 — Forms & Validation at Scale
**Bối cảnh:** Form 30 field, validate phức tạp, mỗi keystroke re-render cả form → lag (nối 02.02).
**Cần nắm:**
- Controlled vs uncontrolled; vì sao **react-hook-form** (uncontrolled) nhanh hơn cho form lớn
- Schema validation với **zod** dùng chung cho cả form lẫn API boundary (nối Phase 08)
- Async validation, field array, error UX
**Đã đủ khi:** form lớn không re-render thừa mỗi keystroke, và schema zod tái dùng được cho cả client lẫn type.

## 07.05 — Reactivity & JS Proxy (dưới lớp vỏ)
**Bối cảnh:** Vì sao sửa `state.count++` trong Zustand/Valtio/Vue là UI tự cập nhật, còn React thì phải `setState`? Bí mật là **JS Proxy**. Hiểu nó, bạn hiểu cách mọi state library hoạt động.
**Cần nắm:**
- `Proxy` + `Reflect`: trap `get`/`set`/`has`/`deleteProperty` — chặn và can thiệp mọi thao tác lên object
- Cách reactivity dựng trên Proxy: track dependency lúc `get`, trigger update lúc `set` (Vue 3, Valtio, MobX)
- **immer**: dùng Proxy để viết "mutate" nhưng sinh ra immutable state (nền của Redux Toolkit) — giải thích copy-on-write
- Giới hạn Proxy: không bắt được thao tác trên primitive, chi phí, dev-tools khó debug
**Đã đủ khi:** tự viết được một object "reactive" tối giản bằng Proxy (log mỗi lần get/set), và giải thích immer biến mutate thành immutable thế nào.

## 07.06 — API Client Layer (axios best practices)
**Bối cảnh:** Mỗi component tự `axios.get` với config riêng, token gắn tay, lỗi xử lý mỗi nơi một kiểu, request cũ không huỷ khi user chuyển trang. Cần **một tầng API tập trung**.
**Cần nắm:**
- **Instance tập trung** (`axios.create`) + **interceptors**: gắn auth token, base URL, header chung một chỗ
- **Refresh token flow**: interceptor bắt 401 → refresh → retry, và hàng đợi request khi đang refresh (tránh refresh nhiều lần) — nối 05.02
- **Huỷ request**: `AbortController` khi component unmount / user gõ tiếp (nối autocomplete) — tránh race & set state trên component đã unmount
- **Retry + backoff** cho lỗi mạng (nối 03.03 jitter), chuẩn hoá error (normalize) để UI xử lý nhất quán
- **Nhận & biến đổi** (transform response), **gửi form**: `FormData`/multipart cho upload, progress event
- Kết hợp với TanStack Query (07.02): axios là "transport", Query lo cache/state
**Đã đủ khi:** có một `apiClient` tập trung: tự gắn token, tự refresh khi 401, huỷ được request đang bay, và mọi lỗi về một dạng chuẩn.
