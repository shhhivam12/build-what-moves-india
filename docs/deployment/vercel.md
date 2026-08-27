# Vercel deployment runbook

This repository is prepared for Vercel's native Next.js deployment flow. It does not need a custom `vercel.json`: keep the detected framework, install command, build command and output directory on their defaults.

## Before importing the repository

1. Create a synthetic PostgreSQL database in Neon. Do not use real citizen data.
2. Copy `.env.example` to `.env.local`, insert the synthetic Neon connection string and generate a private authentication secret of at least 32 characters.
3. Apply the reviewed schema once from a trusted machine with `pnpm db:migrate`.
4. Confirm `pnpm check` and `pnpm test:e2e` pass.
5. Push the release commit to the GitHub `main` branch.

Database migrations are deliberately not part of `pnpm build`: a Vercel build must not mutate production data.

## Import from GitHub

1. In Vercel, choose **Add New → Project** and import `shhhivam12/build-what-moves-india`.
2. Keep **Framework Preset: Next.js**. Because this GitHub repository starts at the application root, leave **Root Directory** as `./`.
3. Keep the automatically detected install and build settings. The repository pins Node 24 and a Vercel-supported pnpm 10 release.
4. Add the environment variables below before the first production deployment.

## Environment variables

Add each value to **Production**, **Preview** and **Development** unless a separate preview database is available.

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Synthetic Neon pooled PostgreSQL URL with `sslmode=require` |
| `BETTER_AUTH_SECRET` | Private, high-entropy value of at least 32 characters |
| `BETTER_AUTH_URL` | Canonical production origin, for example `https://your-project.vercel.app` |
| `AUTH_TRUSTED_ORIGINS` | Canonical production origin; add approved custom origins as a comma-separated list |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin, with no trailing slash |

The application also recognises Vercel's system deployment URLs, so authenticated preview deployments are permitted without weakening the allowlist on other hosts. Environment changes only apply after a redeploy.

## Production verification

After Vercel reports a successful deployment, verify these in order:

1. `/api/health` returns HTTP 200 and `{"status":"ok"}`.
2. `/api/ready` returns HTTP 200 and `{"status":"ready"}`. A 503 means the database URL, schema or network connection needs attention.
3. `/` loads the public landing page without an account dashboard.
4. **Enter as demo citizen** reaches `/dashboard` and opens the guided tour.
5. Registration and password sign-in work with fictional data.
6. Lodge, track, receipt and appeal journeys work in English and Hindi on a phone-width and desktop-width browser.
7. The browser console and Vercel runtime logs show no unhandled errors.

## Rollback

Vercel retains immutable deployments. If a production check fails, promote the previous healthy deployment from the Vercel dashboard, correct the configuration or code, and redeploy. Never paste secrets into GitHub issues, screenshots or chat logs.
