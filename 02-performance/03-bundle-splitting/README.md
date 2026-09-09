# Bài 02.03 — Bundle & Code Splitting

## Bối cảnh
`main.js` nặng 3MB, người dùng mobile chờ 8 giây mới thấy gì. Điều tối quan trọng nhất về performance: **ship ít JS hơn**. Bài này bạn học phân tích và cắt bundle.

## Mục tiêu
- Phân tích bundle, biết cái gì đang chiếm dung lượng
- Route-based & component-based code splitting (lazy loading)
- Hiểu tree shaking và vì sao đôi khi nó không hoạt động

## Nhiệm vụ
1. Build dự án (Vite), dùng `rollup-plugin-visualizer` (hoặc `source-map-explorer`) để xem treemap bundle. Tìm 3 thư viện nặng nhất.
2. Áp dụng `React.lazy` + `Suspense` cho các route. Build lại, xác nhận mỗi route thành chunk riêng, chunk ban đầu nhỏ hơn.
3. Tìm một import "nặng cả thư viện chỉ để dùng 1 hàm" (ví dụ import cả `lodash`). Sửa thành import cụ thể (`lodash/debounce`) hoặc thay bằng hàm tự viết. Đo lại.
4. Kiểm tra tree shaking: import 1 hàm từ 1 module, build, xác nhận phần không dùng bị loại.

## Gợi ý
- Chunk ban đầu nhỏ = First load nhanh. Phần còn lại tải khi cần.
- Tree shaking cần ES modules (`import`), không hoạt động tốt với CommonJS hoặc code có side effects.
- Xem `"sideEffects"` trong `package.json` của thư viện.

## Tiêu chí hoàn thành
- [ ] Có treemap bundle và chỉ ra được thủ phạm nặng
- [ ] Route lazy loading chạy, chunk ban đầu giảm đo được
- [ ] Giải thích được một trường hợp tree shaking không ăn và cách khắc phục

## Bẫy thường gặp
- `import _ from 'lodash'` kéo cả thư viện. Dùng `lodash-es` + import cụ thể.
- Lazy load quá mịn → nhiều request nhỏ, waterfall chậm.
- Quên `Suspense` fallback → màn trắng khi chunk đang tải.
