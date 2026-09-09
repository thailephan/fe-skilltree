# Bài 03.01 — IndexedDB

## Bối cảnh
Dashboard cần cache hàng nghìn dòng dữ liệu để xem offline. `localStorage` không đủ (giới hạn ~5MB, đồng bộ, chỉ lưu string). Giải pháp đúng: IndexedDB — database async trong browser, lưu được object/blob dung lượng lớn.

## Mục tiêu
- Biết chọn: localStorage vs sessionStorage vs IndexedDB vs Cache API
- Hiểu object store, key, index, transaction, versioning
- Dùng được IndexedDB (thô một lần, rồi qua wrapper `idb`)

## Nhiệm vụ
1. Viết bảng so sánh 4 kiểu lưu trữ: dung lượng, đồng bộ/bất đồng bộ, kiểu dữ liệu, use case.
2. Dùng IndexedDB **API thô**: mở DB, tạo object store + index, thêm/đọc/xóa record. Chịu đau với event-based API (`onupgradeneeded`, `onsuccess`) để hiểu bản chất.
3. Viết lại bằng thư viện `idb` (Promise wrapper). So sánh độ dễ đọc.
4. Thực hành versioning: bump version, thêm index mới trong `onupgradeneeded`, xử lý migration dữ liệu cũ.
5. Áp dụng vào dự án: cache dữ liệu bảng dashboard vào IndexedDB, đọc từ đó khi mở app.

## Gợi ý
- localStorage đồng bộ → block main thread; chỉ hợp dữ liệu nhỏ (token, setting).
- IndexedDB bất đồng bộ, transaction-based; index cho phép query nhanh theo field.
- `idb` của Jake Archibald làm IndexedDB dễ thở hơn nhiều — nhưng hiểu thô trước.

## Tiêu chí hoàn thành
- [ ] Bảng so sánh lưu trữ và giải thích chọn cái nào khi nào
- [ ] CRUD được với IndexedDB thô lẫn `idb`
- [ ] Xử lý được versioning/migration không mất dữ liệu

## Bẫy thường gặp
- Lưu dữ liệu lớn vào localStorage → block main thread, tràn quota.
- Quên transaction tự đóng khi hết microtask → lỗi "transaction is not active".
- Không xử lý `onupgradeneeded` cho user có version DB cũ → app crash.
