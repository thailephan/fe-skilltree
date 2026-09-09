# Bài 04.04 — Design Tokens & Multi-brand

## Bối cảnh
Công ty có 2 sản phẩm dùng chung codebase nhưng khác nhận diện thương hiệu. Bạn cần một hệ thống nơi đổi "brand" là đổi toàn bộ giao diện, không sửa component. Đó là design tokens.

## Mục tiêu
- Hiểu design token: tách "giá trị thiết kế" khỏi "cách dùng"
- Phân tầng token: primitive → semantic → component
- Tạo nhiều brand theme từ chung một bộ token semantic

## Nhiệm vụ
1. Định nghĩa **primitive tokens** (bảng màu gốc: `blue-500`, `gray-900`...) tách riêng.
2. Định nghĩa **semantic tokens** map vào primitive (`color.action.primary = blue-500`, `color.text.primary = gray-900`). Component chỉ dùng semantic, không dùng primitive trực tiếp.
3. Tạo `themeBrandA` và `themeBrandB`: chỉ đổi mapping semantic → primitive, component giữ nguyên. Chuyển brand runtime.
4. Kết hợp với bài 04.03: mỗi brand có cả light + dark.
5. Áp vào dự án: dashboard chuyển được giữa 2 brand, chứng minh kiến trúc theme scale được.

## Gợi ý
- Primitive = "màu gì tồn tại". Semantic = "màu này dùng để làm gì". Component chỉ biết semantic.
- Đây là mô hình các design system lớn (Material, Salesforce Lightning, GitHub Primer) dùng.
- Token nên có thể export ra JSON để đồng bộ với Figma (Phase sau/Figma tokens).

## Tiêu chí hoàn thành
- [ ] Tách được 3 tầng token và component chỉ dùng semantic
- [ ] Đổi brand runtime, toàn app đổi giao diện, không sửa component
- [ ] Mỗi brand hỗ trợ cả light/dark

## Bẫy thường gặp
- Component dùng thẳng primitive (`blue-500`) → đổi brand phải sửa component (thất bại).
- Trộn lẫn semantic và primitive → mất tính nhất quán, khó bảo trì.
- Tạo quá nhiều token semantic không ai dùng → rối; token phải sinh ra từ nhu cầu thật.
