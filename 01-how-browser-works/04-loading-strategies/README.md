# Bài 01.04 — Resource Loading Strategies

## Bối cảnh
Trang tải font trễ nên chữ nhảy (FOUT), ảnh hero xuất hiện chậm, và một script analytics chặn cả trang. Bạn cần kiểm soát thứ tự và độ ưu tiên tải resource.

## Mục tiêu
- Hiểu `async` vs `defer` cho `<script>`
- Biết `preload`, `prefetch`, `preconnect`, `dns-prefetch` dùng khi nào
- Hiểu HTTP caching cơ bản (Cache-Control, ETag) qua Network panel

## Nhiệm vụ
1. Tạo 3 phiên bản `<script>`: mặc định, `async`, `defer`. Với mỗi cái, dùng Network + Performance panel xác định: nó chặn parse HTML không? chạy khi nào?
2. Thêm `<link rel="preload">` cho font/ảnh hero. Quan sát priority thay đổi trong cột "Priority" của Network panel.
3. Thêm `<link rel="preconnect">` tới một origin API bên thứ 3, đo cải thiện thời gian kết nối (TLS+DNS).
4. Trong Network panel, xem response header `Cache-Control` và `ETag`. Reload và quan sát "304 Not Modified" / "from disk cache".

## Gợi ý
- `defer`: tải song song, chạy sau khi parse xong HTML, giữ thứ tự. Tốt cho hầu hết script app.
- `async`: tải song song, chạy ngay khi tải xong, không đảm bảo thứ tự. Tốt cho analytics độc lập.
- `preload` = "tôi chắc chắn cần cái này sớm"; `prefetch` = "có thể cần cho trang sau".

## Tiêu chí hoàn thành
- [ ] Giải thích chính xác khác biệt async vs defer bằng quan sát thực tế
- [ ] Dùng preload/preconnect và đo được cải thiện
- [ ] Đọc được cache header và giải thích 304 vs from-cache

## Bẫy thường gặp
- Preload mọi thứ → phản tác dụng, cạnh tranh băng thông với resource thật sự cần.
- Dùng `async` cho script phụ thuộc nhau → chạy sai thứ tự, lỗi.
- Quên `font-display: swap` → màn hình trống chữ (FOIT) khi font tải chậm.
