---
id: dashboard-wallet-overview
tags: [smoke, dashboard]
baseUrl: ${APP_URL}
---

## Intent

As a signed-in host, read the wallet overview and report what the page shows.
The stat cards update every few seconds, so read them twice, three seconds apart.

## Assertions

1. Four stat cards are visible: wallet balance, 30-day earnings, bookings today, payout in transit
2. Every stat card shows a value, not a placeholder or a dash
3. The recent bookings table lists five bookings, the newest first
4. At least one stat value changes between the first and second read

## Evidence

- A markdown table of both reads, with the delta for each card
