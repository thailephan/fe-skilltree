# Bài 05.04 — Observability & CI/CD

## Bối cảnh
App lỗi trên máy user nhưng bạn không tái hiện được, không có log. Và mỗi lần deploy là hồi hộp vì không có gì chặn code lỗi lên production. Bài này khép vòng: quan sát được lỗi thật + cổng chất lượng tự động.

## Mục tiêu
- Bắt và báo cáo lỗi runtime (Error Boundary + error tracking)
- Đo Web Vitals của người dùng thật (field data)
- Dựng CI gate: lint + typecheck + test + build

## Nhiệm vụ
1. Thêm React **Error Boundary**: khi component con throw, hiện UI fallback thay vì màn trắng. Log lỗi ra một endpoint (giả lập hoặc Sentry).
2. Bắt lỗi async toàn cục: `window.onerror`, `window.onunhandledrejection`. Đảm bảo không nuốt lỗi thầm lặng.
3. Cài `web-vitals`, gửi LCP/INP/CLS thật của user về một endpoint (RUM). Đối chiếu với lab data ở bài 02.01.
4. Dựng CI (GitHub Actions): pipeline chạy `lint → typecheck → test → build`, chặn merge nếu fail. Thêm preview deploy nếu có thể.

## Gợi ý
- Error Boundary chỉ bắt lỗi render của con — lỗi async/event handler cần bắt riêng.
- Field data (RUM) mới là cái Google xếp hạng và phản ánh user thật; lab data chỉ để debug.
- CI gate là "hợp đồng chất lượng" của team — code không xanh không lên được main.

## Tiêu chí hoàn thành
- [ ] Error Boundary + global handler bắt được lỗi, có fallback UI, có log
- [ ] Web Vitals field data gửi về được và đọc được
- [ ] CI chặn được PR khi lint/type/test/build fail

## Bẫy thường gặp
- Chỉ dựa Error Boundary → bỏ lọt lỗi async/promise rejection.
- Log lỗi kèm dữ liệu nhạy cảm (token, PII) → rò rỉ qua hệ thống tracking.
- CI chỉ chạy test mà bỏ typecheck/lint → lỗi type/style vẫn lọt lên production.
