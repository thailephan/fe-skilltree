# Bài 02.04 — Web Workers (offload main thread)

## Bối cảnh
Dashboard cần xử lý/parse một file CSV 50MB hoặc tính toán thống kê nặng. Làm trên main thread → UI freeze (nối bài 00.01). Giải pháp: đẩy sang Web Worker chạy ở thread khác.

## Mục tiêu
- Hiểu Web Worker chạy thread riêng, không chia sẻ DOM
- Biết giao tiếp qua `postMessage` / `onmessage`
- Biết khi nào đáng dùng worker (và chi phí serialize dữ liệu)

## Nhiệm vụ
1. Tạo một tác vụ nặng (ví dụ tính số nguyên tố tới 10 triệu, hoặc parse + aggregate mảng lớn). Chạy trên main thread, quan sát UI freeze + long task trong Performance panel.
2. Chuyển tác vụ sang `worker.js`. Main thread gửi input qua `postMessage`, nhận kết quả qua `onmessage`. Xác nhận UI vẫn mượt (scroll/click được) trong lúc worker chạy.
3. Đo overhead: dữ liệu lớn truyền qua postMessage bị copy (structured clone). Thử `Transferable` (ArrayBuffer) để tránh copy.
4. Bọc worker trong một API Promise-based dễ dùng (`runInWorker(data): Promise<result>`).

## Gợi ý
- Worker không truy cập được `window`/`document`/DOM — chỉ tính toán thuần.
- Dữ liệu qua postMessage bị clone (tốn), trừ khi dùng Transferable objects.
- Với Vite: `new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })`.

## Tiêu chí hoàn thành
- [ ] Chứng minh tác vụ nặng không còn freeze UI sau khi chuyển sang worker
- [ ] So sánh long task trên main thread trước/sau (Performance panel)
- [ ] Giải thích được chi phí serialize và khi nào worker KHÔNG đáng

## Bẫy thường gặp
- Dùng worker cho tác vụ nhẹ → overhead khởi tạo + truyền dữ liệu lớn hơn lợi ích.
- Truyền object khổng lồ qua postMessage mỗi lần → nghẽn vì clone.
- Quên terminate worker → leak thread.
