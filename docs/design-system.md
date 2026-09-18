# Design system notes

The demo app is a standalone Vite + React app, but it is not generic: it uses
the real Bookmi (by Qorelly) look, lifted from `qorelly/bookmi/apps/web`.

| Piece | Source | Where it lives here |
|---|---|---|
| Tailwind theme | `apps/web/tailwind.config.js` | `demo-app/tailwind.config.js` |
| CSS tokens + component classes | `apps/web/src/index.css` | `demo-app/src/index.css` |
| Display font (Ciscela) | `apps/web/public/fonts` | `demo-app/public/fonts` |
| Logo, avatars, login imagery | `apps/web/public/images` | `demo-app/public/images` |
| Landing page | `apps/web/src/pages/LandingPage.tsx` | `demo-app/src/pages/LandingPage.tsx` — every section ported |
| Scroll reveal | `components/ui/Reveal.tsx` | `demo-app/src/components/Reveal.tsx` |
| Split-screen auth | `components/layouts/SplitAuthLayout.tsx` | `demo-app/src/components/SplitAuthLayout.tsx` |
| Sign in / sign up | `auth/LoginPage.tsx`, `auth/SignupPage.tsx` | `demo-app/src/pages/LoginPage.tsx`, `SignupPage.tsx` |
| Claim your page | `onboarding/OnboardingPage.tsx` | `demo-app/src/pages/OnboardingPage.tsx` |
| Dashboard stat cards | `dashboard/DashboardHomePage.tsx` | `demo-app/src/pages/DashboardPage.tsx` |

House style, so new screens match: **violet `#7856FF` primary, pill buttons
(`rounded-button`), sharp cards and inputs (`rounded-none`), Ciscela for display
type.** Reach for the shared classes `.card`, `.card-elevated`, `.input-field`,
`.btn-primary`, `.btn-secondary` before writing new utilities.

Icons are Iconify's Solar set, as in Bookmi — but the handful this app uses are
bundled in `demo-app/src/data/solar-icons.json` and registered at startup, so
the demo renders with no network (conference wifi is not a dependency).

## What was deliberately left out

- Supabase auth, TanStack Query, the NestJS API, Monnify payments
- Public booking pages, wallet, payouts, customers and services screens
- Email verification: signup is instant and the account lives in sessionStorage
- The turbo monorepo. This is a small pnpm workspace so `make install && make dev`
  is all a workshop attendee needs.

## Fake by design

- `demo-app/src/data/credentials.json` **is** the auth backend. Hardcoded, no API.
- Signup writes to `sessionStorage`, so a new account lives until the tab closes.
- `demo-app/src/data/seed.ts` holds the dashboard numbers.
- The four stat cards drift every 3 seconds so tests have something dynamic to
  cope with.
- No real payments, no real customers, no network calls at all.
