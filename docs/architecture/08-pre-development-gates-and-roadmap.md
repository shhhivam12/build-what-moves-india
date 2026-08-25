# 08 — Pre-development gates and delivery roadmap

> The five gates below have now been converted into frozen fixtures, thresholds and acceptance contracts in [09 — Finalized development gates](09-finalized-development-gates.md). This document remains the delivery roadmap.

## Recommendation before coding

Do **not** perform another broad idea search. CPGRAMS and the assured-lifecycle wedge are sufficiently validated to begin.

Run five short implementation gates at the start of development. These are bounded spikes, not reasons to delay the project for days:

1. freeze the judge journey and synthetic scenario;
2. validate UX4G in Next.js;
3. validate session/deep-link continuity;
4. approve the small route catalogue/evaluation set;
5. approve Resolution Receipt content and state transitions.

The scaffold, CI, data model, and design tokens can begin while content/evaluation review is happening.

## Gate 1 — Freeze one winning demo story

### Primary scenario

Use one fictional telecommunications grievance because the private audit already examined that category structure and it demonstrates a request with more than one outcome.

Suggested synthetic story:

> Asha paid for a mobile-service activation, but the service remains inactive and a fee appears on the bill. She asks for (1) activation and (2) reversal of the incorrect fee.

The mock outcome resolves activation but only partly addresses the fee. This makes the Resolution Receipt and appeal useful rather than decorative.

### Required variants

- Hindi or English original input;
- a medium-confidence route suggestion with a visible alternative;
- citizen route confirmation or override;
- one safe sample evidence item;
- immediate receipt and notification preview;
- timeline with at least four meaningful events;
- one resolved and one partly/unresolved requested outcome;
- appeal draft for the unresolved item;
- AI-unavailable/manual-route fallback.

### Gate output

A versioned fixture file with fictional people, units, route codes, statements, outcomes, evidence metadata, timeline, and appeal. Every value is publication-safe and clearly synthetic.

## Gate 2 — UX4G/Next.js accessibility spike

Build a throwaway or isolated route containing:

- header/service notice;
- language selector;
- labelled textarea and validation error;
- route-choice radios/cards;
- alert/status message;
- step indicator;
- session-warning dialog;
- timeline item;
- primary/secondary buttons.

Pass criteria:

- package imports/builds in the selected Next.js setup;
- no hydration/runtime error;
- keyboard order and focus are correct;
- screen-reader names/roles/states are useful;
- focus is visible and not obscured;
- English and Hindi strings render with intended fonts/line height;
- 320px and 200% zoom reflow;
- contrast passes in all states;
- package size/client JavaScript is acceptable.

If a component fails, keep UX4G tokens/patterns and replace the component with semantic project-owned HTML. Do not spend the hackathon repairing the entire library.

## Gate 3 — Session and deep-link spike

Before building feature breadth, prove the defect class we intend to fix:

1. sign in as synthetic Citizen A;
2. list Citizen A's cases;
3. open a case in the same tab;
4. open it in a new tab and direct URL;
5. refresh and navigate back;
6. attempt the same case as Citizen B and receive a safe denial;
7. expire/revoke the session and return through reauthentication;
8. verify the intended case/draft resumes;
9. verify no registration number, contact, or CAPTCHA is repeated.

This slice should use the real auth library and PostgreSQL access checks, not a front-end-only mock. If it fails, the project is not ready to add AI or visual polish.

## Gate 4 — Route catalogue and AI evaluation set

Create a small fictional, versioned taxonomy:

- 3–5 top-level service areas;
- 2–4 categories each;
- deterministic allow/exclusion rules;
- positive/negative examples;
- out-of-scope/handoff examples;
- bilingual labels and route explanations.

Create at least 30–50 synthetic labelled inputs if time permits, balanced across routes and including ambiguity, mixed language, missing details, adversarial instructions, irrelevant text, and out-of-scope cases.

Report:

- top-1 and top-3 accuracy/usefulness;
- false scope-exclusion rate;
- schema-valid response rate;
- manual-fallback success;
- route correction/override rate in usability testing;
- results by language/category where sample size is honest.

Do not advertise the score as production accuracy. The value of the demo is explainability and correction, not a benchmark inflated by a tiny hand-crafted set.

## Gate 5 — Resolution Receipt and state/content review

Review the receipt with three perspectives:

- citizen: can I tell whether each thing I asked for actually happened?
- grievance-policy expert: are actor, action, reason, evidence, and appeal fields meaningful?
- accessibility/content reviewer: is the comparison understandable without colour/layout alone?

Pass criteria:

- at least one requested outcome is required at filing;
- every outcome is linked to action, proof, result, and unresolved gap;
- closure cannot display a blanket success when an item remains unresolved;
- receipt version and official/mock actor are explicit;
- feedback and appeal target individual disputed items;
- appeal inherits the exact receipt/case/evidence version;
- original and AI summary are distinguishable.

## Build sequence

### Phase 0 — Foundation

- Scaffold Next.js/TypeScript, UX4G tokens/wrappers, PostgreSQL/Drizzle, Better Auth, Zod, tests, CI, Docker, environment schema.
- Add synthetic-data banner and unofficial project identity.
- Implement health/readiness and privacy-safe logging/correlation.
- Add migration/seed framework.

**Exit:** fresh clone → one command local start → seed → sign in; CI green; public placeholder deploy reachable.

### Phase 1 — Continuity vertical slice

- Synthetic user/session.
- `My grievances` list and case detail.
- Append-only events and current case projection.
- Same/new-tab/direct-link/refresh/expiry access.
- Plain-language error/recovery.

**Exit:** the P0 current-portal continuity defect class is demonstrably solved before AI exists.

### Phase 2 — Describe-first intake and route confirmation

- Draft/autosave and language preferences.
- Requested-outcome builder.
- Route catalogue, rules, manual search/override.
- OpenAI adapter with strict schema and synthetic data.
- AI timeout/invalid/disabled fallback.
- Relevant category fields/evidence checklist after confirmation.

**Exit:** a citizen can reach a confirmed, reviewable submission without knowing a department and without needing AI to be available.

### Phase 3 — Receipt and assured timeline

- Idempotent case submission.
- Immediate receipt and next checkpoint.
- Transactional outbox and notification simulator.
- Full citizen timeline and detail sections.
- Protected demo state-transition controller.

**Exit:** receipt appears once, every action produces one event, and retry/refresh does not duplicate the case.

### Phase 4 — Resolution Receipt and appeal

- Requested-outcome/action/evidence/gap model.
- Versioned Resolution Receipt.
- Citizen per-item feedback.
- Context-preserving appeal draft/submission simulation.
- Print-friendly receipt.

**Exit:** the uncommon winning wedge works interactively end to end.

### Phase 5 — Resilience, accessibility, and evaluation

- Auth/object/function negative tests.
- Session warning/autosave/reauth recovery.
- Keyboard, screen-reader, zoom/reflow, language testing.
- AI route evaluation and adversarial inputs.
- Performance/load/idempotency/failure tests.
- Log redaction and dependency/container scans.

**Exit:** evidence supports claims; known limitations are documented rather than hidden.

### Phase 6 — Judge packaging

- Stable public URL and instant test credentials.
- Seed/reset rehearsal and demo health check.
- Exact 2-minute recording script and no-scroll surprises.
- 250-word summary cut from evidence after product is working.
- Architecture/current-vs-proposed visual and source notes.
- Failure backup: prerecorded clean demo plus manual-route path, while live URL remains primary.

**Exit:** an uninstructed reviewer can sign in and complete the path; the video fits the required duration and tells one product story.

## Priority order if time compresses

1. Resolution Receipt and context-preserving appeal.
2. Durable receipt/timeline and signed-in continuity.
3. Describe-first manual routing and category-relevant questions.
4. Explainable OpenAI route suggestion.
5. Bilingual switch and session recovery polish.
6. Additional departments, voice, notification channels, analytics.

If necessary, cut voice, extra categories, external delivery, and dashboards. Never cut the Resolution Receipt to make room for a chatbot animation.

## Implementation backlog by epic

| Epic | P0 stories |
| --- | --- |
| Foundation | Reproducible local/CI build, schema/migrations, seed, environment validation, public deploy |
| Identity | Judge login, session, ownership, expiry/recovery, cross-account denial |
| Intake | Original text, outcomes, language, autosave, review |
| Routing | Catalogue/rules, AI adapter/schema, explain/confirm/override, fallback |
| Case | Idempotent submission, projection/events, stable deep links |
| Assurance | Receipt, next checkpoint, timeline, notification simulator |
| Resolution | Requested/action/evidence/gap mapping, versioning, feedback |
| Appeal | Eligibility display, inherited context, disputed items, submission simulation |
| Accessibility | Semantic controls, focus/status/errors, zoom/reflow, language, manual test record |
| Quality/ops | CI gates, logs/traces, error states, scans, load/failure tests, runbooks |
| Submission | Public URL, test credentials, 2-minute demo, 250-word summary, source/limitations |

## Acceptance matrix

| Product promise | Acceptance test |
| --- | --- |
| Describe first | First grievance step has no required ministry/category |
| Citizen-controlled routing | Suggested route explains why and can be searched/overridden before submit |
| AI is optional | Full journey succeeds with the AI adapter disabled |
| Original preserved | Submitted original matches entered text; summary is separate/labeled |
| Immediate assurance | Receipt shows ID, time, confirmed route, state, next checkpoint, notification event |
| Durable continuity | Same/new-tab/direct-link/refresh/reauth all return to authorised case without repeated identity fields |
| Accountable history | Every transition has event, actor class, time, reason, correlation; no duplicate on retry |
| Resolution quality | Each requested outcome has action, proof, result, gap/reason |
| Context-preserving appeal | Appeal starts with case, evidence, receipt version, and disputed item prefilled |
| Privacy-safe demo | Automated/manual check finds no real PII or production endpoint/credential |
| Accessible | Automated plus recorded manual keyboard/screen-reader/zoom/reflow/language pass |
| Honest architecture | UI/readme state synthetic demo; future integrations and compliance are proposals, not claims |

## Risk register

| Risk | Likelihood/impact | Mitigation | Cut/decision trigger |
| --- | --- | --- | --- |
| Team builds a chatbot instead of lifecycle | High/high | Keep Resolution Receipt as first-class epic and demo ending | Stop AI polish until receipt/appeal work |
| UX4G integration causes accessibility/build issues | Medium/medium | Day-one spike and semantic wrappers | Use tokens/native controls, not failing components |
| Auth/session consumes time | Medium/high | Maintained library and early vertical slice | Reduce sign-up/account settings; keep seeded login |
| AI routing looks unreliable | Medium/medium | Small constrained catalogue, strict schema, rules, citizen override | Default to manual searchable route with AI suggestion optional |
| Vague mock official actions weaken credibility | Medium/high | Versioned fixture reviewed against Resolution Receipt contract | Reduce to one deeply credible scenario |
| Too many infrastructure tools | High/medium | POC modular monolith, Postgres outbox, one deployable | Defer broker/cache/search/Kubernetes |
| Accessibility left to the end | High/high | Component spike and PR gates | Block feature merge on critical path regression |
| Public demo exposes real data/key | Low/high | Synthetic fixtures, server-only key, secret/log scans, spend/rate limits | Disable AI/provider and redeploy if uncertain |
| Public URL fails during judging | Medium/high | stable host, smoke monitor, recorded backup, known-good artifact | Use manual fallback/pre-recorded evidence while restoring |
| Team overclaims official/compliant status | Medium/high | Unofficial demo banner and claim checklist | Remove logo/claim until evidence exists |

## Metrics to collect for the write-up

- median completion time and completion without help;
- number of required fields before the citizen can describe the problem;
- route confirmation/correction/override and manual-fallback rates;
- zero repeated identity/case fields in authenticated case access;
- retry/idempotency and session recovery success;
- time from submit to on-screen receipt;
- ability to identify owner/current state/next event;
- ability to identify partly/unresolved items from the Resolution Receipt;
- appeal preparation time and repeated attachment count;
- keyboard/screen-reader/zoom/reflow pass record;
- AI schema validity, top-k usefulness, false exclusion, latency, fallback;
- automated test and security scan results with known limitations.

Do not invent large-scale impact figures from a synthetic POC. Present potential national reach separately from measured prototype outcomes.

## Immediate next action

Development can start after a short design/fixture freeze. The first implementation milestone should be:

> A seeded citizen can sign in, open `My grievances`, and open the same synthetic case reliably in the same tab, a new tab, and a direct URL, while a second citizen is safely denied.

That proves the most severe observed continuity problem is being solved before the project invests in AI or visual polish.
