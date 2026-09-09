# Bài 02.01 — Core Web Vitals

## Bối cảnh
Google báo trang bạn "Poor" trên PageSpeed, ảnh hưởng SEO. Ba chỉ số: LCP (tải), INP (tương tác), CLS (ổn định layout). Bạn phải hiểu từng cái đo gì và chữa thế nào.

## Mục tiêu
- Hiểu LCP, INP (thay FID từ 2024), CLS đo gì và ngưỡng "tốt"
- Biết nguyên nhân phổ biến và cách chữa từng chỉ số
- Đo được cả lab (Lighthouse) lẫn field (web-vitals library)

## Nhiệm vụ
1. Chạy Lighthouse trên một trang thật (app công ty hoặc trang bất kỳ). Ghi lại LCP/INP/CLS và các "Opportunities".
2. **LCP**: xác định LCP element (thường ảnh hero hoặc heading). Thử preload nó, tối ưu ảnh (kích thước, format), đo lại.
3. **CLS**: tạo cố ý layout shift (ảnh không set kích thước, banner chèn động). Sửa bằng `width/height` hoặc `aspect-ratio`. Đo CLS trước/sau.
4. **INP**: tạo một handler click chạy tác vụ nặng gây phản hồi chậm. Đo INP, rồi chia nhỏ tác vụ (yield to main thread) và đo lại.
5. Cài `web-vitals` library, log 3 chỉ số ra console — hiểu khác biệt lab vs field data.

## Gợi ý
- Ngưỡng "Good": LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- LCP hay bị hại bởi: ảnh lớn, render-blocking CSS/JS, TTFB chậm.
- CLS: luôn đặt kích thước cho ảnh/ads/iframe; tránh chèn nội dung phía trên nội dung đang xem.
- INP: bottleneck thường là long task > 50ms trên main thread khi tương tác.

## Tiêu chí hoàn thành
- [ ] Cải thiện đo được ít nhất 1 chỉ số (số trước/sau)
- [ ] Giải thích được nguyên nhân gốc mỗi chỉ số khi nó kém
- [ ] Phân biệt được lab data vs field data

## Bẫy thường gặp
- Tối ưu điểm Lighthouse mà quên field data (người dùng thật) mới là cái Google xếp hạng.
- Sửa CLS chỗ này lại tạo shift chỗ khác vì không set kích thước triệt để.
- Nghĩ INP chỉ về JS — nó gồm cả input delay, processing, và presentation delay.
