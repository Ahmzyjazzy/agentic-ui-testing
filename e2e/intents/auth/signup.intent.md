---
id: auth-signup-host
tags: [smoke, auth, signup]
baseUrl: ${APP_URL}
---

## Intent

Create a brand-new Bookmi host account from the landing page, claim a page
name, and land on the dashboard. Use a unique email each run so the account
doesn't collide with an earlier one.

## Assertions

1. The signup page is reachable from the landing page without typing a URL
2. A password shorter than 8 characters is rejected with a visible message
3. After signing up, the claim-your-page step suggests a link from the display name
4. After claiming the page, the dashboard heading reads "Wallet overview"
5. The dashboard shows the new host's name and their bookmi.co link

## Evidence

- Screenshot of the claim-your-page step saved to output/onboarding.png
- Screenshot of the dashboard saved to output/signup-dashboard.png
