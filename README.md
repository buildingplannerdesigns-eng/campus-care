# ACT Campus Care — Website

**The Diaspora VR Sanctuary**, from ACT Healing (Dr. Cammie Connor).
Built by **Celestial Web Solutions** — Next.js 15, React 19, TypeScript, Tailwind CSS.

This scaffold follows the stack and Phase 1 scope agreed in
`Campus_Care_2_0_Project_Breakdown.docx`: Next.js/TypeScript frontend, Sanity CMS for
editable content, Supabase for donation records, Stripe for payments, Resend for
transactional email, deployed on Vercel.

## Getting started

```bash
npm install
# fill .env.local with Sanity / Stripe / Turnstile / Resend keys
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                  Routes (App Router) — Home, About, Solutions, Programs,
                        Team, Payments, Contact, plus /api routes
  components/           Reusable UI (header, footer, cards, forms)
  data/                 Static site copy, sourced from the client's web-page-content doc
  lib/                  Sanity / Supabase / Resend client wrappers
  types/                Shared TypeScript types
```

## Pages

| Route          | Purpose                                                    |
|----------------|-------------------------------------------------------------|
| `/`            | Home — hero, mission, ACT Campus Care intro, evidence       |
| `/about`       | About Us — mission, guiding statement, therapeutic services |
| `/act`         | ACT — Dr. Cammie Connor                                     |
| `/solutions`   | Solutions dropdown targets: `#therapy`, `#interventions`    |
| `/courses`     | Courses — ACT Campus Care deep dive                         |
| `/blog`        | Blog (Sanity CMS + fallback posts)                          |
| `/studio`      | Embedded Sanity Studio (edit site content)                  |
| `/payments`    | Become a Partner via Stripe                                 |
| `/campus-care` | ACT Campus Care immersive platform                          |
| `/contact`     | Contact form → Resend notification                           |

## Integrations

- **Sanity CMS** — edit live content via Sanity Studio (`npm run sanity` or hosted Studio).
  - Blog posts, authors, categories
  - Team members (About page)
  - Site settings (homepage hero/mission, contact details)
  - 5 Core Elements (Courses page)
  - Static fallbacks in `src/data/` keep the site running without credentials
  - Edit content locally with `npm run sanity` (or a hosted Sanity Studio URL)
- **Supabase** (`src/lib/supabase.ts`) — `recordDonation()` inserts into a `donations`
  table (suggested schema in the file's comments).
- **Stripe** (`NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, `STRIPE_SECRET_KEY`)
  — payment link plus Checkout. Receipts are sent from `/payments/thank-you` using the
  Checkout session id (no webhook secret required).
- **Resend** (`RESEND_API_KEY`, `RESEND_FROM_EMAIL=info@actcampuscare.com`) — contact notifications, Stripe donor receipts,
  and staff donation alerts. All mail is sent from `info@actcampuscare.com`.
- **Cloudflare Turnstile** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`)
  — bot protection for the contact form with server-side token verification.

### Donation receipts

After Stripe checkout, donors return to `/payments/thank-you?session_id={CHECKOUT_SESSION_ID}`.
The page loads the paid session with `STRIPE_SECRET_KEY` and Resend sends the receipt.

In the Stripe Payment Link settings, set the after-payment redirect to:

`https://www.actcampuscare.com/payments/thank-you?session_id={CHECKOUT_SESSION_ID}`

### Sanity quick start

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy the project ID into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Run the Studio locally with `npm run sanity` (or deploy with `npm run sanity:deploy`)
4. Optionally set `NEXT_PUBLIC_SANITY_STUDIO_URL` to your hosted Studio URL
5. Open Sanity Studio locally (`npm run sanity`) or your hosted Studio, then publish Blog, Team, Site Settings, and Core Elements
6. The public site revalidates about every 60 seconds

Until env vars are set, pages fall back to `src/data/` content.

## Content notes for the client

- The **Nature Element** description on `/courses` is a placeholder — the source
  document didn't include copy for it. Please confirm the final language.
- Preferred external links (footer + `/about`) are pulled from
  `Links to preferred links.docx`: patricewashington.com and ReflectXR.

## Deployment

Designed for Vercel:

```bash
vercel
```

Set environment variables in the Vercel project dashboard,
and point the domain's DNS per your registrar (e.g. Namecheap) once the project is live.

## Cloudflare security hardening

Recommended Cloudflare settings for production:

- Proxy your DNS record through Cloudflare (orange cloud enabled).
- SSL/TLS mode: Full (strict).
- Enable Always Use HTTPS.
- Enable WAF managed rules.
- Enable Bot Fight Mode (or Super Bot Fight Mode, if available).
- Add a rate-limit rule for `POST /api/contact` as a perimeter control.
- Create a Turnstile widget and set site/secret keys in your environment.

This project already includes:

- Security headers via Next.js config (`next.config.ts`).
- Contact endpoint rate limiting using visitor IP, including support for
  `cf-connecting-ip` when behind Cloudflare.
- Contact form bot verification via Cloudflare Turnstile.
