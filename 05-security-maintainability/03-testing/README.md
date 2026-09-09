# Bài 05.03 — Testing (Unit / Component / E2E)

## Bối cảnh
Mỗi lần sửa 1 chỗ lại vỡ 3 chỗ khác mà không ai biết cho tới khi user report. Test tự động là lưới an toàn để refactor tự tin. Bài này bạn học test cái gì ở tầng nào.

## Mục tiêu
- Hiểu testing pyramid: nhiều unit, vừa component, ít e2e
- Viết được unit test (Vitest), component test (Testing Library), e2e (Playwright)
- Biết test hành vi người dùng, không test chi tiết cài đặt

## Nhiệm vụ
1. **Unit** (Vitest): test các hàm thuần bạn đã viết (debounce ở 00.04, backoff ở 03.03, format...). Cover edge case.
2. **Component** (React Testing Library): test một component — render, tương tác (click/type), assert theo cái người dùng thấy (`getByRole`, `getByText`), không test state nội bộ.
3. **E2E** (Playwright): viết 1 flow thật trên dashboard — mở app, filter bảng, thấy kết quả. Chạy headless.
4. Cố tình gây regression (sửa vỡ logic), xác nhận test bắt được.

## Gợi ý
- Testing Library triết lý: "test như người dùng dùng", truy vấn theo role/label, không theo class/id.
- Unit cho logic, component cho UI + tương tác, e2e cho luồng nghiệp vụ quan trọng.
- Đừng chạy theo 100% coverage — cover phần rủi ro cao, giá trị cao.

## Tiêu chí hoàn thành
- [ ] Có unit + component + e2e test chạy xanh
- [ ] Test bắt được regression khi bạn cố tình phá
- [ ] Giải thích được test nào thuộc tầng nào và vì sao

## Bẫy thường gặp
- Test chi tiết cài đặt (state, tên hàm nội bộ) → refactor là vỡ test dù hành vi đúng.
- Quá nhiều e2e (chậm, dễ flaky) thay vì đẩy xuống unit/component.
- Mock quá đà đến mức test không còn phản ánh thực tế.
