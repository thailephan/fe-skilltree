# Phase 09 — Rendering Architectures & Meta-frameworks

Quyết định kiến trúc lớn nhất của một frontend: **render ở đâu, khi nào?** Nó ảnh hưởng thẳng Web Vitals (Phase 02), SEO (Phase 06) và trải nghiệm. Level 1 nhắc qua; đây là chỗ hiểu tận gốc.

> Bẫy tư duy: mặc định "SPA cho mọi thứ". Senior chọn chiến lược render theo *loại nội dung* — trang marketing, dashboard, và trang tin có nhu cầu khác nhau.

---

## 09.01 — CSR / SSR / SSG / ISR — Trade-offs
**Bối cảnh:** Trang blog cần SEO + tải nhanh; dashboard sau đăng nhập thì không cần SEO. Một chiến lược không hợp mọi trang.
**Cần nắm:**
- **CSR**: nhanh khi điều hướng nội bộ, hại SEO, first paint chậm — hợp app sau auth
- **SSR**: HTML sẵn từ server, tốt SEO/LCP, tốn server — hợp nội dung động cá nhân hoá
- **SSG**: build sẵn, nhanh nhất, hợp nội dung ít đổi (docs, marketing)
- **ISR**: SSG + revalidate định kỳ — cân bằng cho nội dung đổi vừa phải
**Đã đủ khi:** cho một loại trang cụ thể, chọn được chiến lược và giải thích trade-off về SEO/tốc độ/chi phí.

## 09.02 — Hydration, Streaming & Islands
**Bối cảnh:** SSR trả HTML đẹp nhưng trang "chết" vài giây (bấm không ăn) — đó là chờ hydration. Với app lớn, hydration là bottleneck.
**Cần nắm:**
- Hydration là gì, vì sao tốn, **TTI vs FCP** lệch nhau
- **Streaming SSR** (`Suspense` boundaries gửi HTML dần), progressive hydration
- **Islands architecture** (Astro): chỉ hydrate phần tương tác, phần tĩnh để nguyên
**Đã đủ khi:** giải thích được "vì sao trang SSR hiện ra nhưng chưa bấm được" và streaming/islands giảm điều đó thế nào.

## 09.03 — React Server Components & App Router
**Bối cảnh:** RSC (Next.js App Router) đổi hẳn mô hình: component chạy trên server, không gửi JS xuống client. Đây là hướng đi chính của React 2026.
**Cần nắm:**
- Server Component vs Client Component (`"use client"`), ranh giới và cái gì được serialize
- Fetch data ngay trong server component (không cần useEffect/loading), giảm JS bundle client
- Khi nào cần client component (state, event, browser API); server actions
**Đã đủ khi:** phân loại được một component nên server hay client và giải thích lợi ích bundle/SEO của RSC.

## 09.04 — Edge, Caching & tác động lên Vitals
**Bối cảnh:** Cùng một app, đặt render/cache ở đâu quyết định TTFB và LCP của user ở xa server.
**Cần nắm:**
- Edge rendering/functions (chạy gần user), CDN caching, cache layers (browser → CDN → server)
- `Cache-Control`/`stale-while-revalidate` ở tầng HTTP (nối 01.04) áp cho cả trang render
- Nối vòng lại Phase 02: mỗi chiến lược render map ra LCP/INP/CLS thế nào
**Đã đủ khi:** vẽ được đường đi của một request qua các lớp cache và chỉ ra chỗ tối ưu TTFB/LCP.

## 09.05 — Astro & Multi-framework Interop
**Bối cảnh:** Trang marketing cần tĩnh + nhanh, nhưng vài widget cần React (có sẵn từ team A) và một phần Vue (team B). Astro cho nhúng nhiều framework trong một trang, mỗi cái là một "island" chỉ hydrate khi cần.
**Cần nắm:**
- **Islands architecture** thực chiến: mặc định 0 JS (HTML tĩnh), chỉ hydrate phần tương tác
- **Client directives**: `client:load` / `client:idle` / `client:visible` / `client:only` — kiểm soát *khi nào* island hydrate (nối IntersectionObserver 06.05 & rIC 00.01)
- Nhúng **React + Vue + Svelte** cùng lúc: mỗi island là runtime riêng — hiểu cái giá (bundle mỗi framework, không share component instance)
- Chia sẻ state giữa các island: qua nano stores / custom events / URL, KHÔNG qua context (mỗi island tách biệt)
- Khi nào Astro hợp (content-heavy, marketing, blog, docs) vs khi nào không (app tương tác nặng sau auth → dùng Next/Remix)
**Đã đủ khi:** dựng một trang Astro có ít nhất 2 island khác framework, mỗi cái dùng client directive khác nhau, và giải thích được cái giá của multi-framework + cách chia sẻ state giữa island.
