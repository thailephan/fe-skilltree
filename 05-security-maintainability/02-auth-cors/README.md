# Bài 05.02 — Auth an toàn, CORS & CSRF

## Bối cảnh
Bạn lưu JWT vào localStorage vì "tiện". Rồi một lỗ hổng XSS nhỏ để lộ toàn bộ token → mất tài khoản người dùng. Lưu token ở đâu và bảo vệ request thế nào là quyết định bảo mật quan trọng.

## Mục tiêu
- Hiểu trade-off lưu token: localStorage vs httpOnly cookie
- Hiểu CORS thực chất là gì (bảo vệ, không phải rào cản để tắt)
- Hiểu CSRF và SameSite cookie

## Nhiệm vụ
1. Viết bảng trade-off: localStorage (dễ bị XSS lấy) vs httpOnly cookie (chống XSS đọc, nhưng cần chống CSRF). Kết luận cách nào an toàn hơn cho token.
2. Dựng demo CORS: gọi API khác origin, quan sát preflight `OPTIONS`, các header `Access-Control-Allow-*`. Hiểu vì sao lỗi CORS là server chưa cho phép, không phải bug FE.
3. Mô phỏng CSRF (khái niệm): vì sao cookie tự gửi kèm request khiến site độc hại lợi dụng được; `SameSite=Lax/Strict` chặn thế nào.
4. Checklist auth an toàn cho FE: không log token, refresh token flow, logout xóa sạch, không tin claim client-side.

## Gợi ý
- httpOnly cookie: JS không đọc được → XSS khó lấy token; nhưng cần chống CSRF (SameSite + token).
- CORS do trình duyệt thực thi để bảo vệ user; "tắt CORS" ở FE là hiểu sai — phải cấu hình server.
- FE không bao giờ là nơi thực thi bảo mật cuối; server luôn phải verify lại.

## Tiêu chí hoàn thành
- [ ] Giải thích được vì sao httpOnly cookie thường an toàn hơn localStorage cho token
- [ ] Đọc được preflight CORS và giải thích lỗi CORS đúng bản chất
- [ ] Hiểu CSRF và vai trò của SameSite

## Bẫy thường gặp
- Lưu token nhạy cảm vào localStorage rồi có XSS → mất sạch.
- "Tắt CORS" bằng cách thêm proxy bừa hoặc `mode: no-cors` — hiểu sai vấn đề.
- Tin vào role/permission phía client để ẩn UI mà không có server verify → bypass dễ dàng.
