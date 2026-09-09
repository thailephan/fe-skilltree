# Bài 00.04 — Debounce & Throttle (tự viết từ đầu)

## Bối cảnh
Ô search gọi API mỗi ký tự gõ → 20 request cho 1 từ khóa, backend gào thét. Sự kiện scroll chạy handler 100 lần/giây → giật lag. Hai vũ khí kinh điển: debounce và throttle. Tự viết để hiểu tận gốc, đừng chỉ `import lodash`.

## Mục tiêu
- Hiểu khác biệt bản chất giữa debounce và throttle
- Tự implement cả hai bằng closure + timer
- Biết chọn cái nào cho tình huống nào

## Nhiệm vụ
1. Tạo `debounce.js`: viết `debounce(fn, delay)` — chỉ chạy `fn` sau khi ngừng gọi `delay` ms.
2. Tạo `throttle.js`: viết `throttle(fn, interval)` — chạy `fn` tối đa 1 lần mỗi `interval` ms.
3. Tạo `demo.html`: ô input dùng debounce cho search, và `window.onscroll` dùng throttle. Đếm số lần handler thực chạy so với số lần event bắn.
4. Nâng cao: thêm option `leading`/`trailing` cho debounce (chạy ngay lần đầu hay chờ lần cuối).

## Gợi ý
- Debounce: mỗi lần gọi thì `clearTimeout` cái cũ rồi `setTimeout` cái mới.
- Throttle: giữ một cờ/timestamp, bỏ qua các lần gọi trong khoảng interval.
- Đừng quên giữ đúng `this` và `arguments` (`fn.apply(this, args)`).

## Tiêu chí hoàn thành
- [ ] Debounce & throttle tự viết chạy đúng, không dùng thư viện
- [ ] Demo cho thấy số lần handler chạy giảm rõ rệt
- [ ] Giải thích được: search dùng debounce, scroll/resize dùng throttle — tại sao

## Bẫy thường gặp
- Định nghĩa timer/flag ngoài closure → dùng chung cho mọi instance (sai).
- Debounce cho scroll → UI không phản hồi gì cho tới khi ngừng scroll (nên throttle).
- Quên cleanup timer khi component unmount (leak — nối lại bài 00.02).
