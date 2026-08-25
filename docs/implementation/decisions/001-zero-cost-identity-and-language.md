# Decision 001 — zero-cost delivery, civic identity, and language parity

Status: accepted for implementation
Date: 24 August 2026
Prompt: Prompt 011

## Decision summary

The proof of concept will remain a Next.js/TypeScript/PostgreSQL application, but every public-demo dependency must have a verified zero-cost path. The initial database target is Neon Free through its serverless HTTP driver. A deployment compatibility spike will choose between the hackathon-supported Sites path and Vercel Hobby before the application depends on either host. No credit card, paid add-on, custom paid domain, or automatic paid overage is permitted.

The citizen shell will support **English plus all 22 scheduled Indian languages** as interface choices. English and Hindi remain the first human-reviewed, end-to-end catalogues. The other scheduled-language catalogues will be introduced as clearly labelled translation previews and must cover the critical judge journey before the submission is frozen. A missing translation must fall back visibly and safely; it must never show a blank label, corrupt the layout, or pretend to be human-reviewed.

Government identity and public communications remain part of the information architecture. The prototype will add a restrained service masthead and a compact, dated public-updates region instead of deleting identity or banner content. Because this is not an authorised government deployment, it will not use the State Emblem of India or present itself as an official CPGRAMS property. The persistent `Unofficial hackathon prototype · synthetic data` label must remain adjacent to the service identity.

## Why this changes the first implementation plan

Checkpoint 0A correctly tested primitives, but its visual result is a laboratory rather than the intended civic product. The user's feedback is accepted:

- the current shell is too basic and too close to a generic UK-style public-service layout;
- identity and government communication content should be redesigned, not removed;
- the demo must not set language coverage below the current service;
- deployment and persistence choices must be free and resilient enough for judging.

These are cross-cutting requirements, not optional polish. They are scheduled before the shell spreads across authenticated routes.

## Zero-cost runtime decision

### Selected database path

**Neon Free PostgreSQL + Drizzle over the Neon serverless driver** is the initial demo target.

Reasons:

- preserves the approved PostgreSQL schema, migrations, constraints, transactional outbox, and future production mapping;
- supports serverless HTTP/WebSocket access rather than requiring a long-lived TCP connection;
- currently advertises a $0 plan with no time limit and no credit card, 0.5 GB storage per project, and 100 CU-hours per month per project;
- resumes automatically after scaling to zero, normally within a few hundred milliseconds;
- avoids adding a second SQLite-specific data model solely for the hackathon host.

The fixed five-minute scale-to-zero behaviour on the free plan is a known limitation, not hidden. The public demo therefore requires:

1. a `/api/ready` check that verifies database and seed readiness;
2. a one-click pre-demo warm-up/rehearsal step;
3. short, plain-language retry handling for the first cold request;
4. a deterministic seed/reset procedure;
5. a deployment-independent recorded demo and static architecture evidence for presentation resilience.

### Rejected for the primary path

| Option | Decision | Reason |
| --- | --- | --- |
| Supabase Free | Reject as primary | Free projects may pause after low activity; that adds a preventable judging-day recovery risk. |
| Cloudflare D1 | Keep as contingency only | Predictable free allowance and no separate server are attractive, but SQLite semantics would reopen the frozen PostgreSQL ADR and duplicate schema/auth work. |
| Paid managed PostgreSQL | Reject | Violates the zero-spend requirement. |
| Local PostgreSQL as public dependency | Reject | The judge must not depend on the user's computer remaining online. |
| Browser-only local storage | Reject for system-of-record data | It cannot prove server-side authorization, shared state, audit history, or database-backed sessions. |

### Hosting gate

The application will not be coupled to a public host in code. Before Phase 1, a minimal deployment spike must prove:

- the current Next.js build deploys on the selected free host;
- server routes can reach Neon over a supported serverless connection;
- the free plan does not require a payment method or enable paid overage;
- environment secrets remain server-only;
- `/api/health` and `/api/ready` work after an idle period;
- the exact judge route opens in a browser without installation.

The hackathon-supported Sites path is tested first if it can preserve the existing application architecture. Vercel Hobby is the fallback for the native Next.js build. Vercel Hobby is suitable only while this remains a personal, non-commercial hackathon prototype and within its free-plan terms and limits.

## Language contract

### Interface choices

The language registry will contain English plus the 22 languages in the Eighth Schedule:

1. Assamese
2. Bengali
3. Bodo
4. Dogri
5. Gujarati
6. Hindi
7. Kannada
8. Kashmiri
9. Konkani
10. Maithili
11. Malayalam
12. Manipuri (Meitei)
13. Marathi
14. Nepali
15. Odia
16. Punjabi
17. Sanskrit
18. Santali
19. Sindhi
20. Tamil
21. Telugu
22. Urdu

English is an additional interface choice, matching the current CPGRAMS multilingual claim of 22 scheduled languages besides English.

### Quality levels

Every catalogue declares its provenance:

- `reviewed`: human-reviewed for the demonstrated journey;
- `preview`: translated but awaiting human/policy review;
- `fallback`: English content is being shown because a translation is missing.

By the final demo:

- all 23 choices must switch locale, direction, font fallback, number/date formatting, and essential journey labels without a broken screen;
- English and Hindi must cover the complete judge journey and automated parity tests;
- each remaining scheduled language must cover the primary navigation, route choice, form instructions, validation, receipt/timeline headings, and appeal entry point;
- Urdu and any other right-to-left script behaviour used by the catalogue must be explicitly tested;
- original citizen text must never be silently translated or overwritten.

This is deliberately more honest than displaying 23 choices that silently fall back to English.

## Identity and communication contract

### Keep

- service/project name, owner context, and purpose in a compact masthead;
- a persistent and prominent unofficial/synthetic-data status;
- dated, source-labelled public notices relevant to the current task;
- language, help, accessibility, and sign-in actions in predictable positions;
- one optional contextual illustration or campaign item only when it supports the citizen's task.

### Redesign

- promotional posters become a compact `Public updates` region below the primary task or in a secondary rail on wide screens;
- no automatic carousel, flashing content, surprise motion, or image-only message;
- each update has text, date, source/owner, expiry state, and a clear link;
- urgent service notices use a semantic alert and are never communicated only by colour;
- campaign content never pushes the main grievance action below the first useful viewport on compact devices.

### Do not use without authorisation

- State Emblem of India;
- copied CPGRAMS/ministry wordmarks presented as this prototype's owner;
- photographs of ministers or officials as decorative branding;
- official seals, certification marks, or claims of GIGW/STQC compliance;
- live government notices copied without date/source and content review.

For the hackathon build, project-owned typography and a restrained tricolour edge motif provide Indian civic character. The implementation will expose an `OfficialIdentitySlot` boundary so an authorised owner could later supply approved emblems/logos without changing the citizen journey.

## Sources checked for this decision

- [PIB — Samadhan Didi supports 22 scheduled languages besides English](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2296724&lang=1&reg=1)
- [GIGW 3.0 — identity, ownership, bilingual/Unicode and regional-language guidance](https://guidelines.india.gov.in/guidelines/)
- [UX4G — accessibility foundations](https://www.ux4g.gov.in/foundations/accessibility)
- [Neon — Free plan](https://neon.com/pricing)
- [Neon — scale to zero](https://neon.com/docs/introduction/scale-to-zero)
- [Drizzle — Neon serverless connections](https://orm.drizzle.team/docs/connect-neon)
- [Supabase — free project pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Vercel — account plans](https://vercel.com/docs/plans)
- [Vercel — Hobby plan terms](https://vercel.com/legal/terms)

## Exit evidence

This decision is complete when:

- the 23-choice language registry and provenance model have unit tests;
- the refined shell contains the identity boundary and public-updates pattern;
- the project has a zero-cost environment contract and no paid dependency;
- the database schema and migrations build without a secret in source control;
- the deployment spike and idle-readiness check have recorded results.
