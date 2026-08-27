# Build What Moves India

Working repository for the **Build What Moves India** hackathon.

## Current status

CPGRAMS is the selected public-service candidate. The product now includes persistent fictional citizen accounts, real password/session handling, separate sign-in and registration pages, one-click evaluator access, a protected dashboard, describe-first intake, explainable and manually overridable routing, immediate acknowledgement, meaningful timeline, outcome-level Resolution Receipt, and context-preserving appeal.

The working product direction is **CPGRAMS Assured Journey**, an unofficial synthetic prototype covering describe-first intake, citizen-confirmed routing, immediate receipt, a durable timeline, a Resolution Receipt, and context-preserving appeal.

## Run locally

1. Copy `.env.example` to `.env.local` and replace placeholders with a synthetic Neon connection and a private random authentication secret.
2. Install the pinned dependencies with `pnpm install --frozen-lockfile`.
3. Apply the reviewed schema with `pnpm db:migrate`.
4. Start the site with `pnpm dev` and open `http://localhost:3000`.

Identity and sessions persist in Neon through Better Auth. The government case journey still uses deterministic synthetic state, as permitted by the hackathon proof-of-concept rules; no live CPGRAMS or real citizen system is contacted.

For evaluation, choose **Enter as demo citizen** on `/signin`. The app creates or reuses the fictional account and signs in with a real server-issued session. `/signup` also provides editable fictional registration data.

## Validate

- `pnpm check` — lint, strict types, unit/component tests and production build.
- `pnpm test:e2e` — responsive journeys and automated accessibility checks.
- `docker build -t cpgrams-assured-journey .` — optional portable production image.

## Deployment configuration

Configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `AUTH_TRUSTED_ORIGINS`, and `NEXT_PUBLIC_SITE_URL` in the free host's protected environment settings. Never commit `.env.local` or paste secrets into issues, prompts or documentation.

For Vercel, import the GitHub repository as a Next.js project and keep the detected build settings. The repository pins Node 24 and a Vercel-supported pnpm release, supports Vercel preview origins for Better Auth, and derives public metadata from Vercel system URLs when needed. Apply database migrations separately before deployment; builds never mutate the database. Follow the exact environment and post-deploy checks in [`docs/deployment/vercel.md`](docs/deployment/vercel.md).

The live comparison and deliberate parity/defer decisions are recorded in [`docs/implementation/original-parity-audit.md`](docs/implementation/original-parity-audit.md).

## Repository structure

- `docs/` — committed project status and decision records.
- `docs/architecture/` — evidence, design, security, system architecture, and finalized development gates.
- `docs/implementation/` — phased delivery plan, checkpoint instructions, and append-only progress.
- `prompts.md` — append-only ledger of prompts used for this project.
- `research/` — private raw notes, source reviews, and synthesis; intentionally ignored by Git.

## Working principles

- Preserve the selected CPGRAMS problem and assured-lifecycle product wedge unless implementation evidence invalidates it.
- Solve a user journey, not merely a visual redesign.
- Treat accessibility, low-bandwidth performance, mobile use, language, security, privacy, and maintainability as core requirements.
- Use only mock or synthetic sensitive data during the hackathon.
- Clearly distinguish verified facts, user reports, hypotheses, decisions, mocks, limitations, and future work.
- Keep Codex/OpenAI usage meaningful and record the prompts used.

## Source of truth

The current status is documented in [`docs/project-status.md`](docs/project-status.md). The implementation checkpoint plan is in [`docs/implementation/README.md`](docs/implementation/README.md). Private research synthesis lives under `research/` and is not uploaded to Git hosting.
