# Implementation plan and checkpoint contract

Status: active
Started: 24 August 2026
Product: CPGRAMS Assured Journey, an unofficial synthetic hackathon prototype

## Purpose

This plan converts the frozen architecture and design decisions into small, testable product slices. Each phase ends at a user checkpoint. Feedback is recorded before the next phase begins so implementation can be corrected without silently changing the agreed product direction.

The source of truth for product and architecture decisions remains `docs/architecture/`. This implementation plan may refine sequencing and technical details, but it must not reopen the selected CPGRAMS problem or introduce features outside the agreed journey without an explicit decision.

## Cross-cutting implementation constraints added after checkpoint 0A

- The public demo must run on verified free tiers without a credit card, paid add-on, paid overage, or dependency on the developer's computer.
- English plus all 22 scheduled Indian languages are interface targets. English/Hindi are human-reviewed first-class catalogues; other catalogues carry visible translation provenance until reviewed.
- Government identity and public communications are retained as accessible content patterns, while the hackathon build remains unmistakably unofficial and does not use restricted official emblems.
- The component laboratory is not the final visual direction. Authenticated product routes must use the refined Indian civic masthead, task hierarchy, and public-updates pattern described in [Decision 001](decisions/001-zero-cost-identity-and-language.md).

## Checkpoint contract

Every checkpoint follows the same sequence:

1. Build one coherent, bounded slice.
2. Run the automated checks that apply to that slice.
3. Publish a short manual test checklist in `docs/implementation/checkpoints/`.
4. Mark the phase `Ready for user test` in `progress-log.md`.
5. Stop planned feature work while the user tests it. Blocking build/runtime fixes are allowed and logged.
6. Record the user's feedback as accepted, deferred, rejected, or requiring iteration.
7. Re-test the changed slice and ask for checkpoint approval.
8. Begin the next phase only after approval.

Checkpoint statuses are: `Not started`, `In progress`, `Ready for user test`, `Needs iteration`, `Approved`, and `Complete`.

## Delivery phases

### Phase 0A — Application shell and critical-component design lab

Build:

- Next.js App Router and strict TypeScript foundation with pnpm;
- Indian Civic Calm design tokens and project-owned semantic primitives;
- shared unofficial-prototype shell, skip link, language switch, and responsive navigation;
- a critical-component design lab containing form fields, validation, route choices, alerts, step indicator, session warning, timeline item, and actions;
- English and Hindi representative content;
- base unit, component, lint, type, and accessibility test configuration.

Do not add database, authentication, AI, uploads, or live integrations in this slice.

Automated evidence:

- production build succeeds;
- strict type checking and lint pass;
- component tests pass;
- automated accessibility scan has no blocker/critical issue;
- the route renders at the expected local URL.

User checkpoint 0A:

- test the visual direction at compact and desktop widths;
- test English/Hindi switching and long-text wrapping;
- complete the design-lab controls using keyboard and mouse/touch;
- inspect focus visibility, hierarchy, contrast, content tone, and prototype identity;
- decide whether the shared shell and primitives are approved before they spread across the application.

### Phase 0B — Runtime, data, authentication, and delivery foundation

Build:

- zero-cost deployment compatibility spike and recorded host decision;
- Neon Free PostgreSQL over a serverless driver and reviewed Drizzle migrations;
- Better Auth database sessions and two seeded synthetic citizens;
- environment validation with safe example values;
- deterministic synthetic fixture and reset/seed path;
- health and readiness endpoints;
- privacy-safe structured logs and correlation identifiers;
- CI checks and a portable multi-stage Docker build.
- 23-choice language registry with provenance/fallback tests;
- refined civic identity boundary and compact public-updates pattern before the shell spreads to product routes.

User checkpoint 0B:

- start the application from a fresh setup;
- use the visible demo-account action to sign in;
- verify the synthetic/unofficial identity remains clear;
- verify incorrect credentials fail without exposing account details;
- verify seed/reset produces the same fictional starting state.
- switch among representative reviewed, preview, fallback, and right-to-left language states without a broken layout;
- confirm the masthead and updates feel recognisably Indian and informative while the prototype status remains unambiguous;
- verify an idle database wake produces a recoverable delay rather than a dead screen.

### Phase 1 — Signed-in continuity vertical slice

Build:

- `My grievances` with the seeded Asha Verma case;
- stable authorised case-detail URLs;
- append-only case events and current case projection;
- same-tab, new-tab, direct-link, refresh, back/forward, and reauthentication recovery;
- safe denial when Citizen B requests Citizen A's case;
- plain-language not-found, forbidden, expired-session, and recovery states.

User checkpoint 1:

- execute the full continuity sequence from Gate 3;
- confirm no registration number, contact information, or CAPTCHA is re-entered;
- confirm the original destination is restored after reauthentication;
- approve the case list/detail information hierarchy.

### Phase 2 — Describe-first intake and route confirmation

Build:

- English/Hindi grievance draft with autosave and recovery;
- requested-outcome editor;
- four-area fictional route catalogue and manual search/browse;
- explainable advisory route candidates behind `AiAssistPort`;
- strict schema, timeout, invalid-response, disabled-AI, and manual fallback paths;
- route confirmation/override and route-specific questions after confirmation;
- synthetic sample-evidence selection only.

User checkpoint 2:

- complete the main story with AI available and disabled;
- intentionally override the suggested route;
- interrupt and resume a draft;
- verify original citizen text remains unchanged;
- approve the clarity of route reasons, controls, and evidence guidance.

### Phase 3 — Submission, immediate receipt, and assured timeline

Build:

- review page with state-preserving change links;
- idempotent synthetic submission;
- immediate receipt with reference, time, route, current state, and next checkpoint;
- transactional outbox and in-application notification simulation;
- meaningful citizen timeline and protected demo-state transitions.

User checkpoint 3:

- retry/refresh during submission and confirm only one case exists;
- verify receipt copy feedback is visible without relying on a toast;
- inspect every timeline event for actor, action, time, reason, and next step;
- approve the assurance created immediately after submission.

### Phase 4 — Resolution Receipt and context-preserving appeal

Build:

- versioned outcome/action/evidence/result/gap receipt;
- resolved, partly resolved, unresolved, and undetermined presentation;
- item-level citizen feedback;
- appeal draft inheriting the selected disputed outcome and exact source context;
- simulated appeal submission and print-friendly receipt.

User checkpoint 4:

- verify partial resolution never appears as blanket success;
- compare both requested outcomes with the action and proof received;
- create an appeal for only the disputed ₹499 item;
- verify complaint, evidence, receipt version, and disputed item require no re-entry;
- approve the project's differentiating end-to-end journey.

### Phase 5 — Accessibility, resilience, security, and evaluation

Build and verify:

- keyboard, screen-reader, zoom/reflow, forced-colour, Hindi/English parity, and reduced-motion checks;
- 320px through wide-viewport responsive matrix;
- offline/intermittent-network, AI-timeout, expired-session, duplicate-submit, and recovery paths;
- routing evaluation against the frozen 48-input synthetic set;
- authorization, validation, log-redaction, dependency, container, and negative tests;
- performance budgets and documented known limitations.

User checkpoint 5:

- repeat the main journey under the published test matrix;
- review measured results and known limitations;
- approve which claims are supported for the submission.

### Phase 6 — Judge packaging and public delivery

Build:

- stable public browser URL and instant test credentials;
- deterministic demo reset and health rehearsal;
- two-minute demo path and recording script;
- evidence-grounded 250-word summary;
- current-versus-proposed and architecture visuals drawn from committed documentation;
- live-demo fallback that retains the manual route path.

User checkpoint 6:

- complete the flow as an uninstructed judge;
- approve the exact demo script, summary, credentials, URL, and limitations;
- freeze the submission build.

## Change control

- Small implementation choices that do not alter the agreed journey may be made and logged.
- A change to the core journey, product wedge, data boundary, selected stack, language scope, or accessibility target requires an explicit decision before implementation.
- New features remain deferred unless they unblock a phase exit criterion.
- Voice, additional categories, real notifications, external identity, official emblems/logos, and live government integration remain outside the core build.
- Every major implementation update must add an append-only entry to `progress-log.md` and reference the relevant prompt number.

## Current checkpoint

Phase 0A is approved as a component-foundation checkpoint with required visual, language, identity, and hosting follow-ups. Phase 0B is active under [Decision 001](decisions/001-zero-cost-identity-and-language.md).
