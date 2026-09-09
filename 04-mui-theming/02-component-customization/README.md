# Bài 04.02 — Component Customization đúng cách

## Bối cảnh
Nút bấm trong app có 15 kiểu khác nhau vì mỗi người style một kiểu bằng `sx` rải rác. Cần chuẩn hóa: định nghĩa style/variant tập trung, dùng lại nhất quán.

## Mục tiêu
- Phân biệt 3 cách style MUI: `sx` prop, `styled()`, `theme.components`
- Biết dùng cái nào khi nào và chi phí runtime của mỗi cách
- Tạo custom variant cho component qua theme

## Nhiệm vụ
1. Style cùng một Button bằng 3 cách: `sx`, `styled()`, và `theme.components.MuiButton.styleOverrides`. Ghi lại khác biệt về tái sử dụng và nơi đặt code.
2. Trong `theme.components`, thêm `defaultProps` (ví dụ `disableRipple`) và `styleOverrides` áp cho mọi Button toàn app.
3. Tạo một **custom variant** (ví dụ `variant="dashed"`) qua `theme.components.MuiButton.variants`. Dùng nó như variant có sẵn.
4. Quyết định quy ước cho team: khi nào `sx` (one-off), khi nào `styled` (component tái dùng), khi nào `theme.components` (áp toàn cục). Viết thành guideline ngắn.

## Gợi ý
- `sx`: nhanh, cục bộ, nhưng rải rác → khó bảo trì nếu lặp lại.
- `styled()`: tạo component tái dùng có style gắn liền.
- `theme.components`: áp toàn cục + tạo variant → nguồn chân lý cho design system.
- Emotion (CSS-in-JS) có chi phí runtime; MUI đang dịch chuyển hướng zero-runtime.

## Tiêu chí hoàn thành
- [ ] Làm được cùng 1 style bằng cả 3 cách và giải thích trade-off
- [ ] Tạo được custom variant qua theme và dùng lại
- [ ] Có guideline "dùng cách nào khi nào" cho team

## Bẫy thường gặp
- Lạm dụng `sx` cho style lặp lại → nên nâng lên `theme.components`.
- Style đè bằng CSS specificity thay vì qua theme → dễ vỡ khi MUI cập nhật.
- Định nghĩa `styled()` bên trong render → tạo lại component mỗi lần, mất state + chậm.
