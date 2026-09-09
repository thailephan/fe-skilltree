# Bài 01.01 — Critical Rendering Path

## Bối cảnh
Trang hiển thị nội dung chậm (màn trắng lâu). Sếp hỏi "sao lâu vậy?". Để trả lời, bạn phải hiểu chuỗi bước browser biến HTML/CSS/JS thành pixel: đó là Critical Rendering Path.

## Mục tiêu
- Hiểu 5 bước: DOM → CSSOM → Render Tree → Layout → Paint → Composite
- Biết mỗi bước tốn gì và cái gì chặn nó
- Hiểu vì sao CSS "render-blocking" còn JS có thể "parser-blocking"

## Nhiệm vụ
1. Vẽ sơ đồ 5 bước của Critical Rendering Path, ghi rõ input/output mỗi bước.
2. Tạo `slow.html`: đặt một `<link>` CSS nặng (giả lập bằng CSS lớn hoặc delay) trong `<head>`. Mở Network waterfall + Performance panel, quan sát thời điểm "First Paint".
3. Thử: chuyển `<script>` từ trong `<head>` (chặn parse) xuống cuối `<body>`, hoặc thêm `defer`. Đo lại thời điểm nội dung xuất hiện.
4. Dùng Performance panel record load, chỉ ra các mốc: Parse HTML, Recalculate Style, Layout, Paint, Composite Layers.

## Gợi ý
- Render Tree = DOM ∩ CSSOM (bỏ `display:none`, thêm pseudo-elements).
- CSS chặn render vì browser không muốn "flash" nội dung chưa có style.
- `<script>` không `async/defer` chặn cả HTML parser đứng chờ tải + chạy JS.

## Tiêu chí hoàn thành
- [ ] Vẽ và thuyết trình được 5 bước CRP
- [ ] Chỉ ra được trên Performance panel từng bước xảy ra khi nào
- [ ] Giải thích được vì sao đặt script sai chỗ làm chậm First Paint

## Bẫy thường gặp
- Nhét CSS/JS không cần thiết vào `<head>` → chặn paint.
- Nghĩ DOM = HTML. DOM là cây object; HTML chỉ là text nguồn.
- Bỏ qua bước Composite — với animation nó là bước quyết định mượt hay giật.
