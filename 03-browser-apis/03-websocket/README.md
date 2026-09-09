# Bài 03.03 — WebSocket & Real-time

## Bối cảnh
Dashboard cần cập nhật giá/thông báo tức thời. Polling mỗi giây thì lãng phí và trễ. WebSocket cho kết nối 2 chiều thời gian thực. Nhưng mạng thực tế hay rớt → phần khó nhất là **reconnect bền bỉ**.

## Mục tiêu
- Chọn đúng: WebSocket vs SSE vs polling
- Hiểu vòng đời connection và các event (`open`/`message`/`close`/`error`)
- Tự viết lớp reconnect (exponential backoff) + heartbeat (ping/pong)
- Cleanup đúng khi unmount / khi tab ẩn

## Nhiệm vụ
1. Viết bảng so sánh WebSocket / SSE / long-polling: chiều dữ liệu, độ phức tạp, use case. Khi nào nên dùng SSE thay vì WebSocket?
2. Kết nối tới một echo server (`wss://echo.websocket.org` hoặc tự dựng bằng `ws` trong Node). Gửi/nhận message, log lifecycle.
3. Viết class `ReconnectingSocket`:
   - Tự kết nối lại khi `close`, với **exponential backoff** (1s, 2s, 4s... trần ~30s)
   - **Heartbeat**: gửi ping định kỳ, nếu không nhận pong trong X giây coi như chết → reconnect
   - Hàng đợi message gửi khi đang mất kết nối, flush khi kết nối lại
4. Tích hợp vào React: hook `useSocket`, cleanup trong `useEffect` return. Test unmount không leak.
5. Xử lý tab ẩn: dùng `visibilitychange`/Page Visibility API để giảm hoạt động khi tab nền.

## Gợi ý
- SSE (EventSource) đơn giản hơn cho luồng 1 chiều server→client, tự reconnect sẵn.
- Backoff phải có **jitter** (random nhỏ) để tránh cả ngàn client reconnect cùng lúc (thundering herd).
- Heartbeat phát hiện "half-open connection" mà event `close` không bắn.

## Tiêu chí hoàn thành
- [ ] `ReconnectingSocket` tự hồi phục sau khi tắt/bật mạng, có backoff + jitter
- [ ] Heartbeat phát hiện được kết nối chết
- [ ] Hook React cleanup sạch, không leak khi unmount (kiểm bằng Memory panel)

## Bẫy thường gặp
- Reconnect ngay lập tức không backoff → spam server, tự DDoS.
- Quên clear heartbeat timer khi reconnect → nhiều timer chồng nhau (leak).
- Không cleanup socket khi component unmount → connection ma + memory leak.
- Tin rằng `onclose` luôn bắn khi mất mạng — không phải; cần heartbeat.
