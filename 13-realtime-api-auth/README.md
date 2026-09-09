# Phase 13 — Real-time, API & Auth mở rộng

Level 1 có WebSocket thô (03.03), REST/axios (07.06). Phase này mở rộng ra bức tranh đầy đủ: real-time production-grade, các API paradigm khác, và auth hiện đại.

> Bẫy tư duy: dùng một búa cho mọi đinh. WebSocket thô, Socket.IO, SSE, WebRTC giải các bài toán khác nhau — chọn sai là gánh phức tạp vô ích.

---

## 13.01 — Socket.IO
**Bối cảnh:** WebSocket thô (03.03) bạn phải tự lo reconnect, room, fallback, ack. Socket.IO đóng gói sẵn — nhưng thêm một lớp trừu tượng cần hiểu.
**Cần nắm:**
- Socket.IO **KHÁC** WebSocket thô: có auto-reconnect, **rooms** & **namespaces**, **acknowledgement** (callback xác nhận nhận), fallback long-polling khi WS chặn
- Kiến trúc room cho chat/notification theo nhóm; broadcast vs emit tới room
- Cái giá: không phải WebSocket chuẩn (cần server Socket.IO), payload lớn hơn — khi nào dùng nó vs WS thô
**Đã đủ khi:** dựng một demo chat nhiều phòng với ack, và giải thích được khi nào chọn Socket.IO thay vì WebSocket thô.

## 13.02 — SSE & WebRTC
**Bối cảnh:** Không phải real-time nào cũng cần 2 chiều. Server chỉ đẩy xuống (giá live, notification) → SSE gọn hơn. Còn video call/P2P → WebRTC.
**Cần nắm:**
- **SSE (EventSource)**: 1 chiều server→client, tự reconnect, chạy trên HTTP thường — đơn giản hơn WS nhiều; khi nào đủ dùng
- **WebRTC**: P2P audio/video + **data channel**, signaling server, STUN/TURN, ICE — khái niệm và luồng kết nối
- So sánh toàn cảnh: polling / SSE / WebSocket / Socket.IO / WebRTC — bảng chọn công cụ
**Đã đủ khi:** chọn đúng công nghệ real-time cho 4 tình huống khác nhau và giải thích; dựng một luồng SSE chạy được.

## 13.03 — GraphQL
**Bối cảnh:** REST trả over-fetch (thừa field) hoặc under-fetch (phải gọi nhiều endpoint). GraphQL cho client hỏi đúng cái cần — nhưng đổi lại độ phức tạp.
**Cần nắm:**
- Query / Mutation / Subscription; schema, resolver (mức khái niệm)
- Client: **Apollo** hoặc **urql** — normalized cache, cache update sau mutation (nối invalidation 07.02), optimistic
- Trade-off vs REST: over/under-fetch giải quyết được, nhưng caching phức tạp hơn, N+1, học phí cao
**Đã đủ khi:** viết được query/mutation với biến, hiểu normalized cache cập nhật UI thế nào, và nói được khi nào KHÔNG nên dùng GraphQL.

## 13.04 — OAuth2 / OIDC / PKCE
**Bối cảnh:** "Đăng nhập với Google", SSO công ty. Auth cơ bản (05.02) chưa đủ — cần hiểu flow chuẩn để không tự chế sai (rất dễ tạo lỗ hổng).
**Cần nắm:**
- OAuth2 (authorization) vs OIDC (authentication) — khác nhau chỗ nào
- **Authorization Code + PKCE** (flow đúng cho SPA/mobile, thay implicit flow đã lỗi thời), redirect, token exchange
- Access token vs refresh token vs ID token, lưu ở đâu (nối 05.02 httpOnly), silent refresh, SSO
**Đã đủ khi:** vẽ được sơ đồ Authorization Code + PKCE và giải thích vì sao SPA không dùng implicit flow nữa.

## 13.05 — WebAuthn / Passkeys
**Bối cảnh:** Mật khẩu là điểm yếu bảo mật lớn nhất. 2026 xu hướng chuyển sang passkey (đăng nhập bằng vân tay/Face ID, không mật khẩu).
**Cần nắm:**
- WebAuthn API: `navigator.credentials.create()` / `.get()`, public-key cryptography (private key ở thiết bị, không gửi đi)
- Passkey vs mật khẩu: chống phishing, chống rò rỉ DB; luồng đăng ký & xác thực
- Fallback & UX khi thiết bị không hỗ trợ
**Đã đủ khi:** giải thích được vì sao passkey chống phishing (khác mật khẩu/OTP) và luồng WebAuthn cơ bản.
