# CPGRAMS Assured Journey — architecture package

Status: proposed and ready for prototype implementation
Decision date: 24 August 2026
Scope: citizen-facing, browser-accessible hackathon proof of concept using synthetic data

## Executive recommendation

Build the hackathon proof of concept as a **modular monolith** using:

- Next.js App Router and TypeScript for the responsive web application and server endpoints;
- UX4G Design System 3.0 tokens, patterns, and selectively adopted components;
- PostgreSQL for transactional case data, with Drizzle for typed SQL and migrations;
- Better Auth for seeded synthetic test accounts and database-backed sessions;
- Zod at every input, API, AI-output, and configuration boundary;
- the OpenAI Responses API behind an `AiAssistPort`, using Structured Outputs and `store: false`, only for synthetic demo data;
- Playwright, axe-core, Vitest, Lighthouse CI, and manual accessibility checks;
- OpenTelemetry-compatible traces, metrics, and privacy-safe structured logs;
- a Docker image as the portable deployment artifact, with a public Node-compatible host for judging.

This is intentionally not a microservice implementation. A small team can ship and test one coherent citizen journey faster and more reliably in one deployable. The code is divided into explicit domain modules and adapter ports so that a future government implementation can extract services without rewriting the product model.

## Three honest architecture horizons

| Horizon | What it means | Deployment claim |
| --- | --- | --- |
| Current documented baseline | CPGRAMS 7.0 technology and deployment recorded in DARPG's 2024 NextGen RFP, plus publicly announced capabilities live by August 2026 | Evidence, not a claim that every 2026 production component still uses that stack |
| Hackathon proof of concept | Complete consumer journey, mock backend, synthetic records, seeded test accounts, simulated notifications and government adapters | Public demo only; not government-grade hosting and not connected to CPGRAMS |
| Production target | Reference architecture for a future authorised implementation on NIC or a MeitY-empanelled cloud | Design target; requires procurement, threat modelling, audits, load tests, integration agreements, and formal owner approval |

## Core product invariants

1. The citizen's original statement is immutable and is never silently replaced by an AI summary.
2. AI can suggest, explain, translate, or summarise; it cannot reject, close, downgrade, or decide an appeal.
3. The citizen confirms or overrides the suggested route before submission.
4. Every accepted write creates an append-only case event and an auditable actor/reason record.
5. A signed-in citizen never re-enters the registration number or contact detail to open their own case.
6. Reauthentication returns the citizen to the same case or draft.
7. Closure is not merely a status: it produces a Resolution Receipt that compares the requested outcome, official action, evidence, and unresolved gap.
8. An appeal preserves the original complaint, evidence, receipt, and disputed items.
9. The proof of concept stores only synthetic identities, complaints, attachments, and government actions.
10. External systems are accessed only through replaceable adapters; no page directly calls an AI, notification, identity, or government API.

## Decision summary

| Decision | Selected approach | Reason |
| --- | --- | --- |
| Application shape | Modular monolith | Lowest delivery and operational risk for the hackathon; preserves extractable boundaries |
| Primary language | TypeScript end to end | One runtime and one type system across citizen UI, API handlers, tests, and AI schemas |
| Web framework | Next.js App Router | Fast browser-first delivery, server rendering, route handlers, container/self-host portability |
| Database | PostgreSQL | Strong transactions and relational integrity for cases/events, plus JSONB for bounded extension data |
| Authentication | Better Auth for demo; OIDC federation adapter in production | Avoid custom session security; future identity remains replaceable |
| AI | Provider-neutral port; OpenAI adapter for synthetic POC | Meaningful hackathon AI without coupling core case logic or exposing real citizen data |
| Design | UX4G-aligned semantic web UI | Government consistency and GIGW/WCAG baseline without copying the current portal |
| Events | Transactional outbox inside PostgreSQL | Reliable event semantics now; can feed Kafka/Pulsar after service extraction |
| Observability | OpenTelemetry-compatible | Matches NextGen CPGRAMS' stated direction and avoids monitoring lock-in |
| Production platform | Containers on Kubernetes/OpenShift on an authorised MeitY-empanelled/NIC cloud | Portable, scalable target; not required for the POC |

## Architecture package map

- [01 — Evidence and current baseline](01-evidence-and-current-baseline.md)
- [02 — Stack decision and architecture decision records](02-stack-decision-and-adrs.md)
- [03 — Prototype architecture](03-prototype-architecture.md)
- [04 — Production target architecture](04-production-target-architecture.md)
- [05 — Security, privacy, and AI governance](05-security-privacy-and-ai-governance.md)
- [06 — DevSecOps, SRE, and operations](06-devsecops-sre-and-operations.md)
- [07 — Design system and current-vs-proposed experience](07-design-system-and-current-vs-proposed.md)
- [08 — Pre-development gates and delivery roadmap](08-pre-development-gates-and-roadmap.md)
- [09 — Finalized development gates](09-finalized-development-gates.md)
- [10 — Inclusive civic design architecture](10-inclusive-civic-design-architecture.md)
- [11 — Multilingual voice-to-grievance agents](11-multilingual-voice-grievance-agents.md)
- [Primary source register](sources.md)

## What is already settled before coding

- CPGRAMS is the selected public-service candidate.
- The prototype is not a reskin and not another chatbot.
- The bounded end-to-end journey is describe → confirm route → submit → receipt/timeline → Resolution Receipt → appeal draft.
- One synthetic category journey will be complete; breadth across every ministry is explicitly deferred.
- Notification, Bhashini, identity, and government assignment integrations will be mocked behind contracts.
- The browser is the primary channel; no new mobile app is required.
- The main synthetic fixture is Asha Verma's fictional telecommunications activation-and-fee grievance, with one resolved and one partly resolved requested outcome.
- The initial fictional route catalogue covers telecommunications, banking, labour/employment and posts, with a 48-input English/Hindi/Hinglish evaluation contract.
- The design direction is **Indian Civic Calm**: UX4G-aligned, compact-first, WCAG 2.2 AA as the engineering target, restrained Indian civic identity, and no accessibility overlay or decorative spectacle.

## What must still be validated during implementation

- UX4G's current React/Next.js components must pass a short integration and accessibility spike before broad adoption.
- The frozen synthetic routing taxonomy, bilingual content and Resolution Receipt require implementation review and measured evaluation; fixture results cannot be presented as production accuracy.
- Closed-case and appeal wording still need policy/content review before any real-world implementation.
- Accessibility conformance requires manual keyboard, zoom/reflow, screen-reader, and language testing; automated scans alone are insufficient.
- Production hosting, SSO, retention, encryption, notification, and external-API decisions require the responsible government owner and formal security/privacy review.

## Source and claim discipline

Architecture statements are tagged in the detailed documents as one of:

- **Verified baseline:** directly documented by an official source.
- **Observed:** reproduced in the private citizen-journey audit; no sensitive evidence is copied here.
- **Inference:** a reasoned interpretation of evidence, not an official technical fact.
- **Proposal:** a design decision for this project.

This package intentionally does not modify `prompts.md` and does not publish the private `/research/` evidence folder.
