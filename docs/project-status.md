# Project status

Last updated: 28 August 2026

## Phase

The production-style civic product rebuild and release audit are complete. The public landing page, complete service directory, resilient identity entry, describe-first filing, citizen-confirmed route assistance, searchable grievance dashboard, private tracking, case timeline, Action Taken Report and focused appeal now share one responsive premium Indian civic system. The core citizen journey has persistent English/Hindi presentation, original civic vector artwork, a six-step live-element spotlight guide and the multilingual Samadhan Sahayak for grievance drafting, tracking and direct service access. Public/authentication pages and the signed-in account experience are explicitly separated, while a subtle mandala/jaali paper texture and structured publication typography now unify the visual system. Vercel production and preview origins are supported through an explicit Better Auth allowlist, the release toolchain is pinned, and the deployment handoff is documented in [docs/deployment/vercel.md](deployment/vercel.md). User checkpoints and change control are defined in [docs/implementation/README.md](implementation/README.md).

## Confirmed

- This project is for the Build What Moves India hackathon.
- The final build must address one real problem on an Indian public-service website or digital service.
- The main journey must work from start to finish.
- The prototype must account for backend, infrastructure, and process needs rather than only changing the interface.
- Codex or an OpenAI model must contribute meaningfully.
- Sensitive interactions must use mock or synthetic data.
- The research folder is private and excluded from Git.
- Prompts are tracked in `prompts.md` for later submission evidence.
- CPGRAMS is the selected public-service candidate for the prototype.
- The product direction is a production-style CPGRAMS citizen journey: describe-first intake, citizen-confirmed route assistance, immediate receipt, durable timeline, Action Taken Report, and context-preserving appeal.
- The proof of concept will use synthetic data and mock government/channel integrations only.
- The selected proof-of-concept architecture is a Next.js/TypeScript modular monolith with PostgreSQL, UX4G-aligned design, and a replaceable AI adapter.
- The future reference architecture maps to the official NextGen CPGRAMS direction: open-source, modular, API-led, observable, auditable, scalable, and deployable on an authorised MeitY-empanelled/NIC cloud after formal approval.

## Decided for the proof of concept

- Primary user: a citizen filing and following a public grievance.
- Exact journey: describe → confirm route → submit → receipt/timeline → Action Taken Report → appeal draft.
- OpenAI role: advisory route candidates/summary using strict schemas and synthetic data; never autonomous rejection, closure, or appeal decision.
- Browser-first responsive public demo with seeded test credentials.
- One deeply complete synthetic category journey before breadth.
- Main evaluator fixture: a session-owned fictional telecommunications activation and ₹499 fee case, with one resolved and one partly resolved requested outcome. The quick evaluator account is Raghav Mehta.
- Frozen initial catalogue: telecommunications, banking, labour/employment and posts; 48 publication-safe English/Hindi/Hinglish evaluation inputs.
- Current design direction: a premium sandstone, ivory, saffron and deep-green civic-publication aesthetic with formal bilingual service language, compact official identity, original Parliament/India Gate/Constitution line illustrations, a subtle jharokha/jaali/mandala paper layer, neutral numbered steps, precise keylines, restrained radii, semantic compact-first layouts, controlled-width Noto English/Devanagari typography and WCAG 2.2 AA as the engineering target. This supersedes the earlier gradient-heavy glass treatment and the dark-blue Indian Civic Calm and India Next Civic presentations.
- Zero-cost demo decision: retain PostgreSQL and initially target Neon Free through a serverless driver; no payment method, paid add-on, or automatic paid overage is permitted.
- Language parity decision: English plus all 22 scheduled Indian languages remain interface targets. English/Hindi are the active reviewed first-class catalogues for this prototype; every other language remains visible but disabled and marked coming soon until its human-reviewed catalogue is ready.
- Identity decision: use the unaltered official-source DARPG/CPGRAMS masthead at a restrained scale, formal government-style banners and a compact demonstration disclaimer. Do not imply endorsement or live government integration.
- Identity decision: use Better Auth with Neon for fictional accounts entered through the normal sign-in and registration forms. The explicit sample-account action opens an isolated HTTP-only fictional session directly so an evaluator never waits on the free database.
- Deadline decision: keep government case actions synthetic while progressively replacing the client-only journey with real application persistence; prioritize a stable public URL and complete citizen value over simulated government integrations.
- Information-parity decision: retain the original service's useful public breadth through concise About, process, reminder, appeal, officer, pension, mobile, FAQ, contact and site-map content. Current officer and pension details remain official external handoffs rather than copied data.

## Still open

- Final project/product name; the design-system direction and palette are selected but the public name remains open.
- Exact public demo URL; the Vercel-ready release and deployment runbook are complete, but the Vercel project and production environment variables still need to be created by the user.
- Human/policy review of the frozen Hindi/English fixture, route labels and Action Taken Report wording.
- Whether optional voice fits after the core journey is complete.
- All production owner, procurement, identity, cloud, retention, integration, LLM-hosting, and certification decisions.

## Current decision gate

The five product gates remain the research baseline in [docs/architecture/09-finalized-development-gates.md](architecture/09-finalized-development-gates.md). The current gate is the documented [Vercel deployment and production verification](deployment/vercel.md): create the project, configure protected synthetic environment values, deploy, and confirm live health, readiness, authentication and citizen-journey checks.

## Guardrail

Do not reduce the selected direction to a cosmetic redesign, generic chatbot, or autonomous complaint classifier. Samadhan Didi and official NextGen plans already cover voice, multilingual filing, and AI-assisted routing. The differentiator is accountable continuity from filing through resolution evidence and appeal. Do not connect the POC to live CPGRAMS, identity, Bhashini, OTP, SMS/email/WhatsApp, or government systems.

## Architecture reference

See [docs/architecture/README.md](architecture/README.md) for the decision package, diagrams, DevSecOps/security design, current-vs-proposed product design, and development roadmap.
