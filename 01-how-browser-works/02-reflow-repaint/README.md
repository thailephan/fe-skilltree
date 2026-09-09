# Bài 01.02 — Reflow vs Repaint vs Composite

## Bối cảnh
Một animation giật cục (janky). Một trang khác lag khi bạn thêm 100 item vào list. Cả hai đều do bạn vô tình bắt browser làm lại việc đắt tiền: reflow. Đây là bài học "tiền" của mọi tối ưu runtime.

## Mục tiêu
- Phân biệt Reflow (Layout) vs Repaint vs Composite theo độ đắt
- Biết thao tác nào gây cái nào
- Biết kỹ thuật batch DOM read/write tránh "layout thrashing"

## Nhiệm vụ
1. Tạo `thrash.html` với "layout thrashing storm" cố ý:
   ```js
   const boxes = document.querySelectorAll('.box');
   boxes.forEach(b => {
     const h = b.offsetHeight;      // READ (buộc layout)
     b.style.height = h + 10 + 'px'; // WRITE (invalidate layout)
   });
   ```
   Record Performance panel, đếm số lần "Layout" bị trigger.
2. Fix: tách toàn bộ READ ra trước, WRITE ra sau (batch). Đo lại số lần Layout.
3. Bật **Paint flashing** trong DevTools Rendering tab. Tạo animation dùng `left`/`top` (gây layout+paint) vs `transform` (chỉ composite). Quan sát vùng nào bị paint lại.
4. Lập bảng: 10 thao tác CSS/JS phổ biến → gây Reflow / Repaint / chỉ Composite.

## Gợi ý
- Đọc geometry (`offsetHeight`, `getBoundingClientRect`, `scrollTop`) sau khi vừa ghi style → buộc reflow đồng bộ.
- `transform` và `opacity` chỉ chạy ở tầng Composite (GPU) → rẻ nhất.
- Đổi `width/height/top/left/margin` → reflow. Đổi `color/background/box-shadow` → repaint.

## Tiêu chí hoàn thành
- [ ] Chứng minh được batch read/write giảm số lần Layout (có số liệu)
- [ ] Dùng được Paint flashing để thấy vùng repaint
- [ ] Có bảng phân loại thao tác → reflow/repaint/composite

## Bẫy thường gặp
- Vòng lặp xen kẽ read-write DOM = layout thrashing kinh điển.
- Animate bằng `left/top` thay vì `transform` → giật vì reflow mỗi frame.
- Lạm dụng `will-change` cho mọi thứ (bài 01.03) → ngốn bộ nhớ GPU.
