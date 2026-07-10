# Campus Care 2.0 — Website

**The Diaspora VR Sanctuary**, from ACT Healing (Dr. Cammie Connor).
Built by **Celestial Web Solutions** — Next.js 15, React 19, TypeScript, Tailwind CSS.

This scaffold follows the stack and Phase 1 scope agreed in
`Campus_Care_2_0_Project_Breakdown.docx`: Next.js/TypeScript frontend, Sanity CMS for
editable content, Supabase for donation records, Donorbox for payments, Resend for
transactional email, deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Sanity / Supabase / Donorbox / Turnstile / Resend keys
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
| `/`            | Home — hero, mission, Campus Care 2.0 intro, evidence       |
| `/about`       | About Us — mission, guiding statement, therapeutic services |
| `/solutions`   | Solutions dropdown targets: `#therapy`, `#interventions`    |
| `/programs`    | Campus Care 2.0 deep dive — 5 Core Elements, ecosystem, data|
| `/team`        | Meet the Team + point of contact                            |
| `/payments`    | Donations via Donorbox                                         |
| `/contact`     | Contact form → Resend notification                           |

## Integrations (wired, awaiting credentials)

- **Sanity CMS** (`src/lib/sanity.ts`) — swap the static content in `src/data/` for
  live queries once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set.
- **Supabase** (`src/lib/supabase.ts`) — `recordDonation()` inserts into a `donations`
  table (suggested schema in the file's comments).
- **Donorbox** (`NEXT_PUBLIC_DONORBOX_CAMPAIGN_URL`)
  — hosted checkout for one-time and recurring donations.
- **Resend** (`src/lib/resend.ts`) — contact form notifications and donation receipts.
- **Cloudflare Turnstile** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`)
  — bot protection for the contact form with server-side token verification.

Until env vars are set, these fall back to `console.info` logging so the site still
runs end-to-end locally.

## Content notes for the client

- The **Nature Element** description on `/programs` is a placeholder — the source
  document didn't include copy for it. Please confirm the final language.
- **Professional Courses** was listed as a page title in the source doc but had no
  content yet; add a route under `src/app/` once copy is ready.
- Preferred external links (footer + `/about`) are pulled from
  `Links to preferred links.docx`: patricewashington.com and ReflectXR.

## Deployment

Designed for Vercel:

```bash
vercel
```

Set the environment variables from `.env.example` in the Vercel project dashboard,
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
