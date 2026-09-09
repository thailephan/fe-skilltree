# Bài 04.03 — Dark Mode với CSS Variables

## Bối cảnh
Khách yêu cầu dark mode. Cách cũ (đổi theme object) làm re-render toàn cây và nhấp nháy khi chuyển. MUI hỗ trợ CSS variables mode để chuyển theme không re-render, không flash.

## Mục tiêu
- Bật CSS variables mode của MUI (`cssVariables: true`)
- Định nghĩa palette cho light + dark trong cùng theme
- Chuyển mode không nhấp nháy, tôn trọng `prefers-color-scheme`

## Nhiệm vụ
1. Bật CSS variables trong `createTheme`, định nghĩa `colorSchemes: { light, dark }`.
2. Thêm nút toggle dùng `useColorScheme()`. Chuyển light/dark, quan sát: không re-render toàn cây (chỉ CSS variables đổi).
3. Xử lý FOUC (flash sai theme lúc load): áp mode sớm trước khi hydrate (script chặn/`InitColorSchemeScript`).
4. Tôn trọng `prefers-color-scheme` của hệ điều hành làm mặc định, lưu lựa chọn user vào localStorage.
5. Mở DevTools Elements xem CSS variables (`--mui-palette-...`) đổi giá trị khi toggle.

## Gợi ý
- CSS variables mode: đổi theme = đổi giá trị biến CSS, browser tự repaint, không cần React render lại.
- Lưu preference vào localStorage để giữ lựa chọn qua các lần vào.
- FOUC xử lý bằng cách set thuộc tính/class mode trên `<html>` trước paint đầu tiên.

## Tiêu chí hoàn thành
- [ ] Toggle dark mode mượt, không nhấp nháy, không re-render toàn cây
- [ ] Tôn trọng prefers-color-scheme + nhớ lựa chọn user
- [ ] Xem được CSS variables đổi trong DevTools

## Bẫy thường gặp
- Hardcode màu thay vì dùng palette token → dark mode không đổi được chỗ đó.
- Không xử lý FOUC → chớp trắng/sai màu lúc load, trải nghiệm xấu.
- Đổi cả theme object thay vì dùng CSS vars mode → re-render nặng + flash.
