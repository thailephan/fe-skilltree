# Bài 05.01 — XSS & Content Security Policy

## Bối cảnh
Dashboard hiển thị comment/tên do người dùng nhập. Một kẻ xấu nhập `<script>đánh cắp cookie</script>`. Nếu bạn render thẳng, script chạy trên trình duyệt nạn nhân → XSS, lỗ hổng phổ biến nhất ở FE.

## Mục tiêu
- Hiểu 3 loại XSS: stored, reflected, DOM-based
- Biết cách phòng: output encoding, sanitize, tránh `dangerouslySetInnerHTML`
- Dựng Content Security Policy làm lớp phòng thủ chiều sâu

## Nhiệm vụ
1. Tạo lỗ hổng XSS cố ý: render input người dùng bằng `dangerouslySetInnerHTML` (hoặc `innerHTML`). Nhập payload `<img src=x onerror=alert(1)>`, xác nhận nó chạy.
2. Sửa: (a) để React tự escape (render như text), (b) nếu buộc render HTML thì sanitize bằng **DOMPurify**.
3. Cấu hình CSP header (hoặc `<meta http-equiv>`): chặn inline script, chỉ cho phép script từ origin tin cậy. Quan sát CSP chặn payload trong console.
4. Liệt kê nơi dữ liệu không tin cậy chảy vào: URL params, localStorage, postMessage, response API. Kiểm mỗi chỗ.

## Gợi ý
- React tự escape khi render `{userInput}` — đừng phá vỡ bằng `dangerouslySetInnerHTML`.
- CSP không thay thế sanitize; nó là lớp phòng thủ khi sanitize sót.
- `href="javascript:..."` cũng là vector XSS — validate URL scheme.

## Tiêu chí hoàn thành
- [ ] Tái hiện được XSS rồi vá bằng cả escape lẫn DOMPurify
- [ ] CSP chặn được inline script (thấy log vi phạm trong console)
- [ ] Liệt kê được các nguồn dữ liệu không tin cậy trong app

## Bẫy thường gặp
- Dùng `dangerouslySetInnerHTML` với dữ liệu người dùng mà không sanitize.
- Tin dữ liệu từ URL/localStorage/API là "an toàn" — không có gì an toàn cho tới khi được xử lý.
- CSP quá lỏng (`unsafe-inline`) → coi như không có CSP.
