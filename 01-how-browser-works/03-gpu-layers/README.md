# Bài 01.03 — GPU Layers & Compositing

## Bối cảnh
Bạn nghe "dùng `transform` cho nhanh", "thêm `will-change` cho mượt" nhưng không rõ vì sao, và có lần thêm `will-change` xong app còn chậm hơn. Bài này làm sáng tỏ compositing layer.

## Mục tiêu
- Hiểu compositor layer là gì, khi nào browser tách layer
- Hiểu vì sao `transform`/`opacity` animation mượt (chạy trên compositor thread)
- Biết dùng `will-change` đúng liều và tác hại khi lạm dụng

## Nhiệm vụ
1. Bật **Layer borders** trong Rendering tab. Tạo trang với vài element, quan sát cái nào được tách thành layer riêng.
2. Thêm `transform: translateZ(0)` hoặc `will-change: transform` cho một element, xem nó được promote thành layer riêng.
3. Mở tab **Layers** trong DevTools, xem cây layer và lý do mỗi layer tồn tại ("Compositing Reasons").
4. Thí nghiệm phản tác dụng: thêm `will-change` cho 500 element, quan sát memory GPU tăng và app có thể chậm hơn. Ghi lại.

## Gợi ý
- Animation `transform/opacity` có thể chạy trên compositor thread → không bị block dù main thread bận.
- Element được promote layer khi: có 3D transform, `will-change`, `<video>`/`<canvas>`, một số trường hợp `position:fixed`.
- `will-change` là lời hứa "sắp animate" — dùng đúng chỗ, gỡ ra sau khi xong.

## Tiêu chí hoàn thành
- [ ] Thấy và giải thích được cây layer trong tab Layers
- [ ] Chứng minh `transform` animation không bị block bởi main thread bận
- [ ] Giải thích được vì sao lạm dụng `will-change` phản tác dụng

## Bẫy thường gặp
- Rắc `will-change` khắp nơi "cho chắc" → ngốn RAM, chậm hơn.
- Nhầm "GPU accelerated" = luôn nhanh. Tách layer cũng tốn chi phí quản lý.
- Quá nhiều layer nhỏ → "layer explosion", tệ hơn không tách.
