# Dự án xương sống — Real-time Offline-first Dashboard

> Một dự án theo bạn qua toàn bộ lộ trình. Mỗi phase thêm một lớp năng lực vào đây. Cuối cùng bạn có sản phẩm portfolio chứng minh được tất cả.

## Ý tưởng sản phẩm

Một dashboard theo dõi dữ liệu real-time (ví dụ: giá coin/cổ phiếu, hoặc metrics hệ thống, hoặc đơn hàng shop). Yêu cầu:
- Hiển thị bảng dữ liệu lớn (hàng nghìn dòng) mượt mà
- Cập nhật real-time qua WebSocket
- Hoạt động offline (xem lại dữ liệu đã cache)
- Theme đẹp, có dark mode, có thể đổi brand
- An toàn, có test, deploy được

## Vì sao chọn dự án này

Nó ép bạn chạm vào **mọi** chủ đề trong lộ trình một cách tự nhiên:
- Bảng lớn → virtualization + performance (Phase 02)
- Offline → IndexedDB + Service Worker (Phase 03)
- Real-time → WebSocket (Phase 03)
- Giao diện → MUI theming (Phase 04)
- Production-ready → security + test + CI (Phase 05)

## Milestones (làm dần theo phase)

### Milestone 1 — Skeleton (sau Phase 00-01)
- Dựng React + TypeScript + Vite + MUI
- Layout cơ bản: sidebar + header + content
- Mock data (chưa cần backend thật)

### Milestone 2 — Performance (Phase 02)
- Render bảng 10.000 dòng bằng virtualization
- Route-based code splitting
- Lighthouse: LCP < 2.5s, INP < 200ms, CLS < 0.1

### Milestone 3 — Offline-first (Phase 03a + 03b)
- Cache dữ liệu vào IndexedDB
- Service Worker: app shell cache-first, data stale-while-revalidate
- Tắt mạng vẫn xem được dữ liệu cũ (PWA installable)

### Milestone 4 — Real-time (Phase 03c)
- Kết nối WebSocket, cập nhật bảng live
- Tự viết lớp reconnect (exponential backoff + heartbeat)
- Xử lý cleanup khi unmount, khi tab ẩn

### Milestone 5 — Theming (Phase 04)
- Theme tập trung, dark mode mượt (CSS variables)
- Tạo brand theme thứ 2, chuyển đổi được runtime

### Milestone 6 — Hardening (Phase 05)
- CSP, sanitize input, auth an toàn
- Unit + component + e2e test
- CI: lint + typecheck + test + build gate

## Cách khởi tạo (khi bắt đầu Milestone 1)

```bash
pnpm create vite@latest dashboard -- --template react-ts
cd dashboard
pnpm add @mui/material @emotion/react @emotion/styled
pnpm dev
```

> Nói mình biết khi bạn tới Milestone 1, mình sẽ tra Context7 lấy lệnh và cấu hình MUI mới nhất, rồi cùng bạn dựng chuẩn.
