# Bài 00.02 — Memory, Reference & Closure Leaks

## Bối cảnh
App chạy lâu (dashboard mở cả ngày) càng lúc càng chậm, tab ngốn 2GB RAM rồi crash. Đây gần như luôn là **memory leak**. Muốn tìm và sửa, bạn phải hiểu JS quản lý bộ nhớ thế nào và closure giữ reference ra sao.

## Mục tiêu
- Phân biệt stack (primitive) vs heap (object/reference)
- Hiểu "pass by value" vs "pass by reference" thực chất
- Hiểu closure giữ reference tới scope ngoài → nguồn leak
- Biết dùng Chrome DevTools **Memory** panel (heap snapshot)

## Nhiệm vụ
1. Tạo `references.js`: chứng minh gán object rồi sửa property ảnh hưởng cả hai biến; gán primitive thì không. Giải thích bằng mô hình stack/heap.
2. Tạo một leak cố ý trong browser:
   ```js
   const leaks = [];
   function attach() {
     const bigData = new Array(1_000_000).fill('*');
     document.getElementById('btn').addEventListener('click', () => {
       console.log(bigData.length); // closure giữ bigData mãi mãi
     });
   }
   ```
   Gọi `attach()` nhiều lần, mở Memory panel chụp heap snapshot, quan sát bộ nhớ tăng không giảm.
3. Sửa leak: gỡ listener đúng cách (`removeEventListener`), hoặc không capture `bigData` nếu không cần.
4. Liệt kê 4 nguồn leak phổ biến nhất ở FE: listeners không gỡ, timers/intervals không clear, detached DOM nodes, biến toàn cục vô tình.

## Gợi ý
- Heap snapshot: chụp trước → hành động → chụp sau → so sánh "Objects allocated between snapshots".
- "Detached DOM tree" trong snapshot là dấu hiệu kinh điển của leak.
- Garbage collector chỉ dọn object không còn ai reference tới. Closure = còn reference.

## Tiêu chí hoàn thành
- [ ] Giải thích được reference vs value bằng sơ đồ stack/heap
- [ ] Tạo được leak, thấy nó trong Memory panel, rồi sửa và chứng minh đã hết
- [ ] Kể được 4 nguồn leak và cách phòng mỗi loại

## Bẫy thường gặp
- Quên `clearInterval`/`clearTimeout` khi component unmount.
- Trong React: đăng ký listener trong `useEffect` nhưng không return cleanup.
- Giữ reference tới DOM node đã bị remove khỏi cây → detached node leak.
