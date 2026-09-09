# Phase 14 — Testing chuyên sâu

Level 1 (05.03) dạy test là gì và tầng nào. Phase này đi vào **cơ chế** và **chiến lược**: hiểu test runner chạy ra sao, mock mạng đúng cách, E2E production-grade với Playwright.

> Bẫy tư duy: viết test cho có coverage. Test tốt là test *bắt được regression thật* và *không vỡ khi refactor đúng*. Số coverage không đo điều đó.

---

## 14.01 — Unit Testing cơ chế
**Bối cảnh:** Bạn viết test nhưng không hiểu `expect`, mock, fake timer hoạt động ra sao — nên khi test "flaky" hoặc mock sai là bí.
**Cần nắm:**
- Test runner làm gì (Vitest/Jest): collect → run → assert → report; test isolation, `beforeEach`/`afterEach`
- **Assertion** hoạt động thế nào; **mock vs stub vs spy** (khác nhau ra sao), `vi.fn()`, mock module
- **Fake timers** (test debounce/throttle 00.04 mà không chờ thật), fake `Date`, test async/promise
- Test-driven khi hợp lý; edge case & boundary
**Đã đủ khi:** test được một hàm dùng `setTimeout` bằng fake timer (không chờ thật), và giải thích khác biệt mock/stub/spy.

## 14.02 — Component & Integration + MSW
**Bối cảnh:** Test component gọi API — mock `fetch` bằng tay thì giòn và không giống thật. **MSW** chặn ở tầng network, test như thật.
**Cần nắm:**
- React Testing Library sâu: query theo role/label, `userEvent` (khác `fireEvent`), test async UI, `waitFor`
- **MSW (Mock Service Worker)**: intercept request ở network level, dùng chung mock cho cả test lẫn dev
- Integration test: nhiều component + data layer (nối TanStack Query 07.02) làm việc cùng nhau
**Đã đủ khi:** test một luồng "load → hiển thị → tương tác → mutate" với MSW mock API, không mock fetch thủ công.

## 14.03 — E2E với Playwright
**Bối cảnh:** Unit/component xanh nhưng luồng thật vẫn vỡ (routing, auth, tích hợp). E2E chạy trên browser thật bắt những lỗi đó.
**Cần nắm:**
- Playwright: locator (auto-wait, chống flaky), fixtures, `expect` retry, chạy đa trình duyệt
- **Network interception** (mock/spy request), auth state tái dùng (storageState — login 1 lần), parallel & sharding
- **Trace viewer** debug lỗi CI, **visual regression** (screenshot diff), chạy trong CI (nối 05.04)
**Đã đủ khi:** một flow nghiệp vụ chính chạy E2E xanh trong CI, tái dùng auth state, và bạn debug được 1 lỗi bằng trace viewer.

## 14.04 — Test Strategy & Architecture
**Bối cảnh:** Test suite chậm 30 phút, flaky, ai cũng ngại chạy → vô dụng. Chiến lược test quan trọng hơn số lượng test.
**Cần nắm:**
- Testing **pyramid** vs **trophy** (nhiều integration hơn cho FE hiện đại) — chọn tỉ lệ hợp lý
- Chống **flaky test** (nguồn gốc: timing, thứ tự, state chung), test độc lập
- Contract testing (FE–BE khớp API), khi nào test và khi nào KHÔNG (đừng test framework/thư viện)
**Đã đủ khi:** đề xuất được chiến lược test cho một dự án (tầng nào bao nhiêu, cái gì không test) và lý giải.
