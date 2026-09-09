# Phase 17 — Advanced Specializations

Các chuyên biệt cao cấp — không phải ai cũng cần, nhưng khi dự án chạm tới thì đây là kiến thức tạo khác biệt lớn. Học theo nhu cầu.

> Bẫy tư duy: nhảy vào những thứ "ngầu" (WASM, CRDT) khi bài toán chưa cần. Chỉ dùng khi có lý do rõ — nếu không, phức tạp thừa là nợ.

---

## 17.01 — WebAssembly
**Bối cảnh:** Bước tiếp theo của "xử lý dữ liệu nặng" (nối Web Workers 02.04). JS đã tối ưu vẫn không đủ nhanh cho: xử lý ảnh/video, mã hoá, giả lập, parse khối lượng lớn. WASM chạy code near-native trong browser.
**Cần nắm:**
- WASM là gì: bytecode chạy tốc độ gần native, biên dịch từ Rust/C++/Go; KHÔNG thay JS mà bổ trợ
- Khi nào đáng: tính toán nặng CPU-bound (nối 02.04); khi nào KHÔNG (DOM, I/O — WASM không giỏi)
- Tương tác JS ↔ WASM (memory, truyền dữ liệu), chạy WASM trong Worker; ví dụ thực tế (ffmpeg.wasm, sql.js, image codec)
**Đã đủ khi:** giải thích được khi nào WASM thắng JS và khi nào không, và chạy một module WASM có sẵn xử lý tác vụ nặng.

## 17.02 — Local-first & CRDT
**Bối cảnh:** App kiểu Figma/Linear/Notion: chỉnh sửa offline, nhiều người cùng lúc, tự merge không xung đột, sync khi có mạng. Đây là kiến trúc "local-first" (nối IndexedDB 03.01 + Service Worker 03.02).
**Cần nắm:**
- Local-first: nguồn chân lý ở client, server chỉ để sync/backup — UX tức thì, hoạt động offline
- **CRDT** (Conflict-free Replicated Data Type): cấu trúc dữ liệu tự merge không cần khoá — nguyên lý; thư viện **Yjs**/Automerge
- Sync engine, conflict resolution vs last-write-wins, offline queue (nối 03.03), optimistic (nối 07.02)
**Đã đủ khi:** giải thích được vì sao CRDT merge không xung đột, và dựng demo 2 client sửa cùng document tự đồng bộ bằng Yjs.

## 17.03 — Product Engineering (Flags · Experiment · Analytics)
**Bối cảnh:** Ship tính năng cho 100% user rồi mới biết nó tệ = rủi ro. Frontend cấp cao gắn với phân phối an toàn và đo lường sản phẩm.
**Cần nắm:**
- **Feature flags**: bật/tắt tính năng runtime, canary/gradual rollout, kill switch (không cần deploy lại)
- **A/B testing & experimentation**: chia nhóm, đo lường, tránh làm hỏng CLS/perf khi thí nghiệm
- **Analytics & event tracking**: đo hành vi có chủ đích, privacy (consent, không gửi PII — nối 05.02), kết hợp RUM (nối 05.04)
**Đã đủ khi:** gate một tính năng sau feature flag với gradual rollout, và đặt event tracking tôn trọng privacy.

---

## Elective sâu hơn (khi thật sự cần)
- **WebGPU** — tính toán/đồ hoạ song song trên GPU (ML client-side, đồ hoạ nặng).
- **WebTransport** — thay thế WebSocket thế hệ mới trên HTTP/3.
- **Micro-frontend nâng cao** — nối 11.03, module federation runtime, độc lập deploy quy mô lớn.
