# Project status

Last updated: 25 August 2026

## Phase

The deployable citizen journey baseline is undergoing a production-style product and visual rebuild. Real Better Auth email/password identities, Neon-backed sessions, separate sign-in/registration pages, one-click fictional evaluator access and a protected dashboard are now implemented. The earlier synthetic case flow remains behind the dashboard until its filing, tracking, receipt and appeal screens are rebuilt in the same India Next Civic direction. User checkpoints and change control are defined in [docs/implementation/README.md](implementation/README.md).

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
- The product direction is `CPGRAMS Assured Journey` (working, unofficial name): describe-first intake, citizen-confirmed route assistance, immediate receipt, durable timeline, Resolution Receipt, and context-preserving appeal.
- The proof of concept will use synthetic data and mock government/channel integrations only.
- The selected proof-of-concept architecture is a Next.js/TypeScript modular monolith with PostgreSQL, UX4G-aligned design, and a replaceable AI adapter.
- The future reference architecture maps to the official NextGen CPGRAMS direction: open-source, modular, API-led, observable, auditable, scalable, and deployable on an authorised MeitY-empanelled/NIC cloud after formal approval.

## Decided for the proof of concept

- Primary user: a citizen filing and following a public grievance.
- Exact journey: describe → confirm route → submit → receipt/timeline → Resolution Receipt → appeal draft.
- OpenAI role: advisory route candidates/summary using strict schemas and synthetic data; never autonomous rejection, closure, or appeal decision.
- Browser-first responsive public demo with seeded test credentials.
- One deeply complete synthetic category journey before breadth.
- Frozen main fixture: fictional citizen Asha Verma, telecommunications activation plus ₹499 fee, with one resolved and one partly resolved requested outcome.
- Frozen initial catalogue: telecommunications, banking, labour/employment and posts; 48 publication-safe English/Hindi/Hinglish evaluation inputs.
- Frozen design direction: Indian Civic Calm, using UX4G-aligned foundations, restrained civic blue/saffron/green accents, Noto English/Devanagari typography, semantic compact-first layouts and WCAG 2.2 AA as the engineering target.
- Zero-cost demo decision: retain PostgreSQL and initially target Neon Free through a serverless driver; no payment method, paid add-on, or automatic paid overage is permitted.
- Language parity decision: English plus all 22 scheduled Indian languages are interface targets. English/Hindi are reviewed first-class catalogues; other languages must be demoable with explicit translation provenance before submission freeze.
- Identity decision: retain a restrained service masthead and accessible public-updates pattern, but do not use the State Emblem or present this unofficial prototype as a government-owned site.
- Identity decision: use Better Auth with Neon for real fictional accounts and sessions; retain one-click judge access without making the interface look like a judge-only prototype.
- Deadline decision: keep government case actions synthetic while progressively replacing the client-only journey with real application persistence; prioritize a stable public URL and complete citizen value over simulated government integrations.

## Still open

- Final project/product name; the design-system direction and palette are selected but the public name remains open.
- Exact public demo host; the standalone production/container build is ready, and free public deployment follows the visual checkpoint.
- Human/policy review of the frozen Hindi/English fixture, route labels and Resolution Receipt wording.
- Whether optional voice fits after the core journey is complete.
- All production owner, procurement, identity, cloud, retention, integration, LLM-hosting, and certification decisions.

## Current decision gate

The five product gates remain frozen in [docs/architecture/09-finalized-development-gates.md](architecture/09-finalized-development-gates.md). The current checkpoint is approval of `/signin` and `/signup` as the visual and interaction direction before rebuilding the public landing page and remaining citizen workflow.

## Guardrail

Do not reduce the selected direction to a cosmetic redesign, generic chatbot, or autonomous complaint classifier. Samadhan Didi and official NextGen plans already cover voice, multilingual filing, and AI-assisted routing. The differentiator is accountable continuity from filing through resolution evidence and appeal. Do not connect the POC to live CPGRAMS, identity, Bhashini, OTP, SMS/email/WhatsApp, or government systems.

## Architecture reference

See [docs/architecture/README.md](architecture/README.md) for the decision package, diagrams, DevSecOps/security design, current-vs-proposed product design, and development roadmap.
