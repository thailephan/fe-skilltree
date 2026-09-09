# Bài 00.03 — Async sâu

## Bối cảnh
Bạn gọi 5 API để dựng dashboard. Có cái phụ thuộc nhau, có cái độc lập. Gọi sai cách → trang tải chậm gấp 3 lần cần thiết, và một API lỗi làm sập cả trang. Bạn cần làm chủ async để orchestrate đúng.

## Mục tiêu
- Hiểu async/await chỉ là đường cú pháp trên Promise
- Chọn đúng: tuần tự vs song song
- Phân biệt `Promise.all` / `allSettled` / `race` / `any`
- Xử lý lỗi async đúng cách (try/catch, error boundary logic)

## Nhiệm vụ
1. Tạo `fetchers.js` với các hàm giả lập API (dùng `setTimeout` trả Promise sau 500-1500ms ngẫu nhiên).
2. Viết 2 phiên bản gọi 3 API độc lập: một dùng `await` tuần tự, một dùng `Promise.all`. Đo thời gian mỗi bên (`performance.now()`), giải thích chênh lệch.
3. Tình huống: 1 trong 3 API fail. So sánh hành vi `Promise.all` (reject toàn bộ) vs `Promise.allSettled` (báo cáo từng cái). Khi nào dùng cái nào?
4. Viết một hàm `fetchWithTimeout(promise, ms)` dùng `Promise.race` để bỏ cuộc sau `ms`.
5. Xử lý lỗi: bọc try/catch đúng chỗ, đảm bảo 1 API lỗi không làm crash cả app.

## Gợi ý
- API độc lập → luôn song song (`Promise.all`). API phụ thuộc → tuần tự (`await` từng cái).
- `allSettled` không bao giờ reject — trả mảng `{status, value|reason}`.
- `race` resolve/reject theo cái xong trước; `any` chỉ quan tâm cái resolve đầu tiên.

## Tiêu chí hoàn thành
- [ ] Đo và giải thích được chênh lệch thời gian tuần tự vs song song
- [ ] Chọn đúng combinator cho từng tình huống và giải thích lý do
- [ ] Có `fetchWithTimeout` chạy đúng

## Bẫy thường gặp
- `await` trong vòng `for` với các call độc lập = tự làm chậm mình (nên `Promise.all`).
- Quên rằng `Promise.all` fail-fast: 1 reject là mất hết → dùng `allSettled` khi cần từng kết quả.
- Nuốt lỗi (empty catch) → bug ẩn. Luôn log/handle tử tế.
