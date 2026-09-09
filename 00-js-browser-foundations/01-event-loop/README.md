# Bài 00.01 — Event Loop thực sự

## Bối cảnh
Sếp báo: "Trang bị đơ 2 giây mỗi khi bấm nút Export." Bạn mở code thấy một vòng lặp tính toán nặng chạy đồng bộ. Để hiểu vì sao nó "đơ" cả UI và cách sửa, bạn phải hiểu event loop — trái tim của mọi thứ chạy trong browser.

## Mục tiêu
- Hiểu call stack, task queue (macrotask), microtask queue
- Biết thứ tự thực thi: đồng bộ → microtask → macrotask
- Biết `requestAnimationFrame` và `requestIdleCallback` xen vào đâu
- Hiểu vì sao code đồng bộ nặng làm "đơ" UI (main thread bị block)

## Nhiệm vụ
1. Tạo `predict.js`. Viết đoạn code sau, **đoán output trước khi chạy**, rồi chạy bằng `node predict.js` (hoặc trong console browser) để kiểm chứng:
   ```js
   console.log('1');
   setTimeout(() => console.log('2'), 0);
   Promise.resolve().then(() => console.log('3'));
   console.log('4');
   ```
   Giải thích tại sao thứ tự là `1 4 3 2`.
2. Thêm case khó hơn: lồng `Promise.then` bên trong `setTimeout` và ngược lại. Đoán → kiểm chứng → giải thích.
3. Trong browser: viết một nút bấm chạy `for` loop 3 tỷ vòng. Quan sát UI bị freeze (không scroll được, không click được). Ghi lại hiện tượng.
4. Vẽ (trên giấy/Excalidraw) sơ đồ: call stack, microtask queue, macrotask queue, và luồng đi của một tick.

## Gợi ý
- Sau **mỗi** macrotask, event loop rút cạn **toàn bộ** microtask queue trước khi qua macrotask tiếp theo.
- `await x` ≈ `.then()` — phần sau `await` là một microtask.
- `requestAnimationFrame` chạy ngay trước lần paint kế tiếp (~mỗi 16ms ở 60fps).

## Tiêu chí hoàn thành
- [ ] Đoán đúng output của 3 đoạn code trộn async khác nhau
- [ ] Giải thích được bằng lời tại sao microtask chạy trước macrotask
- [ ] Vẽ được sơ đồ event loop và thuyết trình nó trong 2 phút

## Bẫy thường gặp
- Nghĩ `setTimeout(fn, 0)` chạy "ngay lập tức" — không, nó vào macrotask queue, chờ hết microtask.
- Nghĩ Promise là "chạy song song" — JS đơn luồng, Promise chỉ lập lịch callback, không tạo thread.
- Quên rằng main thread lo cả JS **lẫn** rendering → code nặng đồng bộ = UI freeze.
