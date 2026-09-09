# Bài 02.05 — Virtual Scrolling (cách hoạt động) & Lazy Rendering

## Bối cảnh
Bài 02.02 bạn đã *dùng* virtualization qua thư viện. Bài này bạn phải **hiểu nó chạy thế nào bên trong** — vì thư viện sẽ có lúc không vừa nhu cầu (chiều cao động, sticky header, nested list) và bạn phải tự sửa hoặc tự viết. Cùng với đó là "lazy rendering": trì hoãn render phần chưa cần.

## Mục tiêu
- Hiểu cơ chế windowing của virtual scroll: tính toán chỉ render những item đang thấy
- Xử lý được fixed-height vs variable-height, overscan, scroll anchoring
- Phân biệt virtual scrolling vs lazy rendering vs infinite scroll (hay bị gộp nhầm)
- Biết các công cụ native hỗ trợ lazy render: `content-visibility`, Suspense, IntersectionObserver

## Nhiệm vụ
1. **Tự viết virtual list fixed-height từ đầu** (không thư viện):
   - Một container cao cố định có `overflow: auto`
   - Một "spacer" bên trong cao `itemCount * itemHeight` để scrollbar đúng tỉ lệ
   - Nghe `scroll`, tính <code>startIndex = Math.floor(scrollTop / itemHeight)</code>, <code>endIndex = startIndex + visibleCount</code>
   - Chỉ render các item trong [start, end], đặt chúng bằng <code>transform: translateY(startIndex * itemHeight)</code>
   - Đo: 100.000 item nhưng DOM chỉ ~20 node.
2. Thêm **overscan** (render dư vài item trên/dưới viewport) để tránh khoảng trắng khi scroll nhanh. Quan sát khác biệt.
3. **Variable-height**: khi item cao khác nhau, `itemHeight * index` không còn đúng. Nghiên cứu 2 hướng: (a) đo rồi cache chiều cao thật + prefix-sum để tra offset; (b) ước lượng rồi hiệu chỉnh sau khi đo (cách `@tanstack/react-virtual` dùng). Ghi lại trade-off.
4. **Lazy rendering (khác virtual scroll)**: lấy một trang có nhiều section nặng. Thêm CSS <code>content-visibility: auto</code> + <code>contain-intrinsic-size</code> cho các section dưới màn hình. Đo lại thời gian render/layout ban đầu (browser bỏ qua layout phần ngoài màn hình).
5. Render trì hoãn theo tương tác: một component nặng chỉ mount khi vào viewport (IntersectionObserver, nối 06.05) hoặc khi rảnh (`requestIdleCallback`, nối 00.01).

## Gợi ý
- **Virtual scroll** = danh sách rất dài, chỉ render phần thấy được (windowing).
- **Lazy rendering** = trì hoãn render phần chưa cần (offscreen/đắt), kể cả khi không phải list.
- **Infinite scroll** = tải thêm dữ liệu khi cuộn tới cuối — trực giao, thường *kết hợp* với virtual scroll.
- Dùng `transform: translateY` để đặt vị trí (chỉ composite, nối 01.03) thay vì `top` (gây reflow).
- `content-visibility: auto` là cách rẻ nhất để "lazy render" mà không cần JS — nhưng cần `contain-intrinsic-size` để tránh nhảy scrollbar (CLS).

## Tiêu chí hoàn thành
- [ ] Virtual list tự viết chạy đúng: 100.000 item, DOM ~20 node, scroll mượt
- [ ] Giải thích được toán windowing (startIndex/offset) và vai trò overscan
- [ ] Phân biệt rạch ròi virtual scroll vs lazy rendering vs infinite scroll
- [ ] Dùng `content-visibility` giảm được thời gian layout ban đầu (có số)

## Bẫy thường gặp
- Đặt item bằng `top`/`margin` thay vì `transform` → reflow mỗi frame khi scroll, giật.
- Variable-height mà giả định height cố định → item chồng nhau hoặc nhảy lung tung.
- Quên `contain-intrinsic-size` với `content-visibility: auto` → scrollbar nhảy, CLS xấu.
- Nhầm infinite scroll = virtual scroll: tải thêm data nhưng vẫn render hết vào DOM → vẫn nghẽn.
- Không có overscan → khoảng trắng chớp khi scroll nhanh (bàn di chuột/momentum).
