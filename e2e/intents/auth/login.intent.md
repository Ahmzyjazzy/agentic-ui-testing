---
id: auth-login-host
tags: [smoke, auth]
baseUrl: ${APP_URL}
---

## Intent

Sign in to Bookmi as the demo host and land on the dashboard.
Credentials come from the environment: TEST_HOST_EMAIL / TEST_HOST_PASSWORD.
If the app is already signed in, log out first.

## Assertions

1. The sign-in page is reachable from the landing page without typing a URL
2. After signing in, the dashboard heading reads "Wallet overview"
3. The page greets the host by name
4. The "Wallet balance" card shows an amount in naira

## Evidence

- Screenshot of the dashboard saved to output/dashboard.png
