# Bài 02.02 — React Re-render & Virtualization

## Bối cảnh
Dashboard render bảng 10.000 dòng → gõ vào 1 ô filter là cả trang khựng 1 giây. Nguyên nhân: render quá nhiều DOM + re-render thừa. Đây là bài trung tâm của Milestone 2 dự án.

## Mục tiêu
- Hiểu khi nào React re-render và vì sao re-render lan rộng
- Dùng đúng `React.memo`, `useMemo`, `useCallback` — và biết khi nào KHÔNG cần
- Áp dụng virtualization cho list/table lớn

## Nhiệm vụ
1. Dựng một component render list 10.000 item (dữ liệu giả). Dùng React DevTools **Profiler** record một lần gõ filter, xem cái gì re-render.
2. Xác định re-render thừa: child re-render dù props không đổi. Bọc `React.memo`, truyền callback ổn định bằng `useCallback`. Profiler lại, so sánh.
3. Áp dụng **virtualization** (chỉ render item trong viewport) — tự viết bản tối giản trước (tính index theo scrollTop + item height), rồi dùng thư viện (`@tanstack/react-virtual`).
4. Đo: số DOM node và thời gian render trước/sau virtualization.

## Gợi ý
- React re-render khi: state đổi, parent re-render, context đổi. Không phải vì "props đổi" trừ khi có memo.
- `useMemo`/`useCallback` chỉ đáng dùng khi: tính toán thật sự đắt, hoặc cần reference ổn định cho memo child. Lạm dụng = thêm overhead + rối.
- Virtualization: chỉ render ~30 dòng thấy được thay vì 10.000.

## Tiêu chí hoàn thành
- [ ] Dùng Profiler chỉ ra re-render thừa và loại bỏ nó (có ảnh trước/sau)
- [ ] Virtualization chạy: DOM node giảm từ hàng nghìn xuống hàng chục
- [ ] Giải thích được khi nào KHÔNG nên dùng useMemo/useCallback

## Bẫy thường gặp
- Bọc `memo` nhưng vẫn truyền object/function inline mới mỗi render → memo vô dụng.
- Nhét mọi thứ vào `useMemo` "cho chắc" → tăng độ phức tạp, có khi chậm hơn.
- Dùng `index` làm `key` trong list động → bug reconciliation.
