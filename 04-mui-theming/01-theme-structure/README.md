# Bài 04.01 — Theme Structure

## Bối cảnh
Mỗi dev trong team tự chế màu, spacing, font riêng → UI loạn, sửa 1 màu phải grep 200 chỗ. Giải pháp: một `theme` tập trung là nguồn chân lý duy nhất.

## Mục tiêu
- Hiểu các nhánh theme: palette, typography, spacing, breakpoints, shadows, transitions, zIndex, shape
- Biết `createTheme` + `ThemeProvider` và cách truy cập theme trong component
- Hiểu spacing scale và breakpoints thay vì hardcode px

## Nhiệm vụ
1. Tạo `theme.ts`: định nghĩa palette (primary/secondary/error/background), typography (font family, scale), spacing unit, breakpoints. Bọc app bằng `ThemeProvider`.
2. Dựng một trang demo dùng **chỉ** giá trị từ theme (`theme.spacing(2)`, `theme.palette.primary.main`) — không hardcode màu/px.
3. Đổi 1 giá trị trong theme (ví dụ primary color) và xác nhận toàn app đổi theo — chứng minh sức mạnh của nguồn tập trung.
4. Dùng `useTheme()` và `useMediaQuery(theme.breakpoints.down('md'))` để làm responsive theo breakpoint của theme.

## Gợi ý
- `theme.spacing(2)` = 16px mặc định (unit 8px). Dùng nó thay vì gõ px cứng.
- Palette có `main/light/dark/contrastText` — MUI tự tính nếu bạn chỉ cho `main`.
- Với TypeScript: khai báo `declare module '@mui/material/styles'` để mở rộng type theme an toàn.

## Tiêu chí hoàn thành
- [ ] Theme tập trung, trang demo không có màu/spacing hardcode
- [ ] Đổi 1 token → cả app đổi theo
- [ ] Responsive dùng breakpoints của theme, không phải media query rời

## Bẫy thường gặp
- Hardcode màu/px trong component thay vì lấy từ theme → mất khả năng đổi brand.
- Tạo theme mới mỗi render (đặt `createTheme` trong body component) → re-render toàn cây.
- Không mở rộng type theme khi thêm key custom → TS báo lỗi hoặc mất type safety.
