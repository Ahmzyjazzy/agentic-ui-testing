# Step 1 — Testing by hand

**Branch:** `step-1-manual` · **Time:** ~5 minutes · **Automation:** none, on purpose.

This is where every team starts: a human opens the app and clicks through the
critical journey before each release.

## Run the app

```bash
make install     # pnpm install (workspace: root + demo-app)
make dev         # http://localhost:5173
```

## The app under test

Bookmi (by Qorelly) — a shareable link where anyone can book and pay for your
services. This demo build has three screens and no backend at all:

| Screen | Route | What it does |
|---|---|---|
| Landing | `/` | The full Bookmi marketing page: hero, how it works, bookings/tips mockups, features, who it's for, FAQ, CTA |
| Sign up | `/auth/signup` | Mock account creation — kept in sessionStorage, no API, no email verification |
| Claim your page | `/onboarding` | Display name → auto-generated slug → dashboard |
| Sign in | `/auth/login` | Checks `demo-app/src/data/credentials.json` — no API call |
| Dashboard | `/dashboard` | Wallet overview, four stat cards, recent bookings, services |

**Demo credentials:** `host@bookmi.test` / `password` (also `demo@bookmi.test` / `password`).

The four stat cards update every 3 seconds, so the numbers you read now are not
the numbers you read in ten seconds. Remember that — it matters in step 2.

## The release checklist

Do this by hand, out loud, while the room watches:

- [ ] Open http://localhost:5173 — the hero renders and the notification marquee scrolls
- [ ] Scroll the whole page — every section reveals: how it works, bookings/tips mockups, features, who it's for, FAQ
- [ ] Click **Get started** — sign up with a new name, email and password
- [ ] On "Claim your page", check the slug is suggested from your name, then continue
- [ ] You land on the dashboard as the new host; log out
- [ ] Click **Sign in** in the nav — the split-screen login page opens
- [ ] Enter `host@bookmi.test` / `password`, submit
- [ ] The dashboard heading reads **Wallet overview**
- [ ] Four stat cards show values: wallet balance, 30-day earnings, bookings today, payout in transit
- [ ] The recent bookings table has 5 rows
- [ ] Click **Log out** — you land back on the sign-in page
- [ ] Repeat on another browser
- [ ] Repeat next release. And the one after that.

## Talking points

- Manual exploratory testing is genuinely valuable — a human notices "this feels
  wrong" in a way no script does.
- What hurts is the **regression** part: the same clicks, every release, by a
  person who is tired and under pressure.
- It doesn't scale: two browsers, three screen sizes, ten journeys, one you.
- Feedback comes late — usually after the code is already merged.

**Next:** [Step 2 — Playwright the normal way](step-2-playwright.md) (branch `step-2-playwright`).
