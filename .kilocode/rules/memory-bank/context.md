# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Pokemon card grading service landing page (グレサ)
  - Dark luxury theme with gold accents and animated stars/particles
  - Hero section with stats, PSA/BGS/CGC service cards
  - Why grading section with grade visualization
  - 6-step how-it-works flow
  - Pricing plans (Economy/Standard/Express)
  - FAQ accordion
  - Contact/CTA section with LINE and email
  - Responsive navigation with mobile menu
  - Noto Sans JP font via next/font/google
- [x] サービス名を「グレサ」から「ポケグレ」に変更
  - `src/app/page.tsx`: ナビロゴ・フッターのサービス名を更新
  - `src/app/layout.tsx`: タイトル・OGP・キーワードを更新
- [x] Revamped to Pokemon card ONLY specialization
  - Removed "Supported Card Genres" section (was showing Sports/MTG/Yu-Gi-Oh)
  - Added "Pokemon Card Types" section (旧裏・初期, SR/SAR/UR, プロモ, スタンダード, 旧裏リバイバル, 海外版)
  - Updated hero badge and copy to emphasize Pokemon card specialty
  - Updated FAQ with Pokemon-specific questions (旧裏カード, 枚数制限など)
  - Updated all service descriptions to reference Pokemon cards specifically
  - Updated footer tagline to "ポケカ鑑定代行"
  - Updated layout.tsx keywords with Pokemon-specific SEO terms

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-02-27 | Revamped UI to futuristic light gradient theme (aurora blobs, glass morphism, indigo/violet/pink palette) |
