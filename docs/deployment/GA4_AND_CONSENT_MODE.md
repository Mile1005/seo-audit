# GA4 + Consent Mode v2

This project installs Google Analytics 4 globally and implements Consent Mode v2 with a custom banner.

## Measurement ID

- Environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Fallback (if env is not set): `G-VL8V8L4G7X`
- Set this in Vercel → Project Settings → Environment Variables.

## Where GA4 is injected

- `app/layout.tsx` adds the GA4 scripts immediately after `<head>`:
  - Consent Mode default (denied) is set before loading `gtag.js`.
  - GA4 loader `https://www.googletagmanager.com/gtag/js?id=...` is added once.
  - GA4 config uses `send_page_view: false` (pageviews are sent on route changes).

## SPA pageview tracking

- `components/layout/client-analytics.tsx` sends a `gtag('config', id, {...})` on every route change.
- The component is mounted once in `app/layout.tsx`.

## Consent Mode v2

- Default consent is set to denied for ad and analytics, granted for functionality/security.
- A custom banner is shown site-wide and persists choice to `localStorage`.
- Accept → grants analytics/ad storage; Reject → denies. Consent is applied with `gtag('consent','update', ...)`.

### Files

- `app/layout.tsx` — head scripts (consent init, gtag.js, GA config) and `<ConsentBanner />` mount.
- `components/privacy/consent-banner.tsx` — banner UI and consent persistence.
- `components/layout/client-analytics.tsx` — SPA pageview tracking only.
- `lib/analytics.ts` — safe helpers for pageview/event tracking without duplicating tag injection.

## Notes

- If you also use Google Tag Manager (GTM), integrate consent there to keep sources in sync.
- To reset consent during QA, clear `localStorage` key: `ga_consent_v2`.
