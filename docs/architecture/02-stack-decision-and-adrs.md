# 02 — Stack decision and architecture decision records

## Decision

Use a **Next.js + TypeScript + PostgreSQL modular monolith** for the hackathon proof of concept.

The production reference architecture is polyglot-capable, but the proof of concept is deliberately one application, one database, one deployable, and one primary language. That is the strongest balance of speed, reliability, accessibility, meaningful AI integration, and future portability.

## Why this is a better choice than “use Java because government uses Java”

Technology should follow the stage and risk:

- A two-minute judged POC rewards a complete, responsive, working citizen journey.
- A government implementation rewards longevity, operational skills, procurement fit, service isolation, integration, and audit evidence.
- OpenAPI/event contracts and clean domain boundaries make a later Spring Boot, .NET, Go, or Python service possible without changing the citizen-facing product contract.

Spring Boot would be a credible choice for a large multi-team government backend. It is not automatically safer or more scalable than a well-designed TypeScript application, and it would add a second framework/runtime to the hackathon build without improving the core demo. If the future system integrator standardises on Java, the proposed case modules can be extracted behind the same APIs and events.

## Option comparison

Scores are relative to this hackathon and range from 1 (weak) to 5 (strong).

| Option | POC speed | One-team simplicity | Citizen UI | AI/schema integration | Government-scale evolution | Operational burden now | Weighted result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Next.js full-stack TypeScript | 5 | 5 | 5 | 5 | 4 | 5 | **4.8** |
| Next.js + FastAPI/Python | 4 | 3 | 5 | 5 | 4 | 3 | 4.0 |
| React + Spring Boot/Java | 3 | 2 | 5 | 4 | 5 | 2 | 3.6 |
| Angular + modern .NET | 3 | 2 | 4 | 4 | 5 | 2 | 3.4 |

### When the other options would win

- Add FastAPI only if the POC needs a custom Python model, specialised NLP pipeline, or library that cannot reasonably run behind the TypeScript AI adapter.
- Prefer Spring Boot when multiple backend teams, extensive Java estates, enterprise integration libraries, and long procurement/support cycles outweigh prototype velocity.
- Prefer modern .NET when the owning team has a strategic Microsoft platform, migration tooling, and operational capability; do not preserve .NET Framework 4.5 simply because the legacy system used it.

## Selected prototype stack

| Concern | Selection | Decision notes |
| --- | --- | --- |
| Runtime | Supported Node.js LTS | Pin the exact supported version in the container and CI; do not rely on a developer's global install |
| Package manager | pnpm with committed lockfile | Deterministic dependency graph and faster CI cache reuse |
| Web/UI/API | Next.js App Router with TypeScript in strict mode | Server-rendered pages, Server Components where useful, Route Handlers for BFF/API endpoints, browser-first delivery |
| Design system | `ux4g-web-components` plus project-owned semantic wrappers and CSS modules | Reuse tokens/patterns selectively; verify every adopted component in context |
| Internationalisation | ICU-style JSON message catalogues with `next-intl` or an equivalent thin adapter | Separate interface, input, and preferred-response language; no language embedded in images |
| Database | PostgreSQL | Transactional case integrity, append-only events, constraints, JSONB only for bounded extension fields |
| Data access | Drizzle ORM and reviewed SQL migrations | Type-safe queries without hiding schema/index decisions; migrations are first-class artefacts |
| Validation | Zod | One source of runtime schemas for forms, API requests, events, and AI Structured Outputs |
| Demo auth | Better Auth with PostgreSQL sessions and seeded synthetic test users | Use a maintained auth library; validate the session at every protected data access, not only at page navigation |
| AI adapter | Official OpenAI JavaScript SDK using the Responses API | Server-side only, Structured Outputs, `store: false`, synthetic data only, timeouts/retries/circuit breaker |
| AI contract | `AiAssistPort` | Core code knows capabilities and schemas, not a provider/model name |
| Attachments | `ObjectStorePort`; bundled synthetic sample objects for the first demo | Avoid public arbitrary uploads until malware scanning, quotas, and object storage are implemented |
| Notifications | `NotificationPort` with an in-app delivery simulator | Demonstrates immediate acknowledgement without sending real SMS, email, or WhatsApp |
| Background work | PostgreSQL transactional outbox plus small worker/cron | Avoid Kafka/Redis in the POC; keep event semantics compatible with later brokers |
| Testing | Vitest, React Testing Library, Playwright, `@axe-core/playwright`, Lighthouse CI | Automate high-value checks; manual accessibility remains mandatory |
| Observability | OpenTelemetry server instrumentation and privacy-safe structured JSON logs | Correlation/trace IDs across actions; never log grievance text or attachment content |
| Build/deploy | Multi-stage Docker image; public Node/Docker host; managed PostgreSQL containing synthetic data only | Next.js remains self-hostable; no production claim is made about the hackathon host |

Next.js officially supports Route Handlers and self-hosting as a Node server or Docker container. Its self-hosting guide recommends a reverse proxy for rate limits, request limits, and slow-connection protection. Sources: [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) and [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting).

## Repository shape to implement

```text
app/
  (public)/
  (auth)/
  (citizen)/cases/[caseId]/
  api/v1/
src/
  modules/
    identity/
    intake/
    routing/
    cases/
    timeline/
    resolution-receipt/
    appeals/
    notifications/
    audit/
  application/
    commands/
    queries/
    ports/
  infrastructure/
    database/
    auth/
    ai/openai/
    objects/demo/
    notifications/demo/
    telemetry/
  ui/
    components/
    patterns/
    messages/
db/
  migrations/
  seeds/
tests/
  unit/
  integration/
  e2e/
  accessibility/
  fixtures/
```

Import rules should prevent UI and route handlers from reaching database/provider code directly. The expected path is UI/handler → application command/query → domain module → port → adapter.

## Architecture decision records

### ADR-001 — Modular monolith before microservices

**Status:** accepted for POC.

**Context:** The official NextGen target requests modular microservices. The hackathon has one small team, one dominant citizen journey, mock integrations, and no evidence that modules need independent deploy/release teams.

**Decision:** Build one deployable with strong module boundaries and no cross-module table access outside published repositories/use cases.

**Consequences:**

- faster local development, atomic transactions, simpler testing, one public URL;
- fewer network/security/failure modes during judging;
- future extraction requires contract and data-ownership work, but boundaries are visible now;
- no claim that the POC itself demonstrates production horizontal isolation.

**Extraction triggers:** different scaling curve, different confidentiality boundary, separate owning team, independent release cadence, or a repeated reliability problem that isolation solves.

### ADR-002 — TypeScript end to end

**Status:** accepted.

**Decision:** Use strict TypeScript for UI, server handlers, domain modules, events, and provider adapters.

**Why:** One language reduces handoff and schema drift. Zod provides runtime validation where TypeScript's compile-time types stop.

**Trade-off:** Python ML libraries are not native. If custom modelling becomes necessary, extract the AI adapter into a Python service without moving case decisions into it.

### ADR-003 — PostgreSQL as the system of record

**Status:** accepted.

**Decision:** Model citizens, cases, routes, requests, events, evidence metadata, resolution items, and appeals relationally. Use JSONB only for versioned provider responses or category-extension data that is validated by schema.

**Why:** Case processing requires atomic writes, uniqueness, referential integrity, and queryable history. A document-only database would make core invariants application-dependent.

**Trade-off:** Category-specific fields need a controlled extension model. Do not create an ungoverned “everything JSON” record.

### ADR-004 — Append-only case event ledger plus current projections

**Status:** accepted.

**Decision:** Every meaningful transition writes a `case_event` with case ID, event type/version, actor class/ID, source, timestamp, reason code, correlation ID, and privacy-safe metadata. A current `case` row/projection supports fast reads.

**Why:** The product is an accountable timeline. Overwriting a status field would make the most important promise unverifiable.

**Trade-off:** Events need versioning and projection tests. Event history is not editable; corrections are new events.

### ADR-005 — Transactional outbox before an event broker

**Status:** accepted.

**Decision:** Store integration/notification events in an outbox in the same transaction as the case change. A worker marks delivery attempts.

**Why:** This prevents a case transition from succeeding while its acknowledgement event disappears. It keeps the POC simple and creates a direct path to Kafka/Pulsar later.

**Trade-off:** The POC worker is not a high-throughput broker. Delivery is at-least-once, so consumers must be idempotent.

### ADR-006 — Ports for identity, AI, language, notification, object storage, and government routing

**Status:** accepted.

**Decision:** Define provider-neutral interfaces in the application layer. Keep provider credentials and request/response shapes inside adapters.

**Why:** The POC will use mock and commercial services that are not valid government-production choices. Provider portability is a safety and procurement requirement, not premature abstraction.

### ADR-007 — Advisory AI with deterministic and citizen controls

**Status:** accepted.

**Decision:** Store the original statement before invoking AI. AI returns a versioned schema containing suggested routes, confidence band, short explanation, clarification questions, and safety flags. Deterministic jurisdiction rules validate candidates. The citizen confirms/overrides.

**Forbidden:** silent rejection, autonomous closure, ranking a person's entitlement, changing the original statement, or treating model confidence as calibrated probability without evaluation.

### ADR-008 — OpenAI only for the synthetic POC

**Status:** accepted with a production prohibition.

**Decision:** Use the Responses API server-side with Structured Outputs and `store: false` for synthetic demonstration text. Do not upload real grievance text, personal data, IDs, images, or documents.

Official OpenAI documentation says API data is not used for training by default, but standard abuse-monitoring retention and endpoint application-state rules still apply; approved Zero Data Retention is a separate control. This does **not** meet the RFP's stricter production LLM requirement by itself. Sources: [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data#default-usage-policies-by-endpoint) and [Responses API Structured Outputs](https://developers.openai.com/api/reference/cli/resources/beta/subresources/responses).

Production must replace or formally approve this adapter with an isolated government-controlled environment satisfying the RFP's no-external-access, no-egress, no-provider-retention, customer-managed-key, secure-deletion, audit, and MFA requirements.

### ADR-009 — UX4G-aligned, semantics-first interface

**Status:** accepted.

**Decision:** Use UX4G foundations and proven components behind project wrappers. Prefer native HTML for critical controls. Reject any component that fails keyboard, screen-reader, contrast, language, zoom/reflow, or performance tests.

**Why:** Government familiarity and consistency matter, but package adoption does not equal GIGW/WCAG conformance.

### ADR-010 — Synthetic data is an architectural control

**Status:** accepted.

**Decision:** The demo seed uses fictional people, departments, IDs, complaints, evidence, and outcomes. All UI and API responses include a discreet demo marker. Production adapters are disabled at build/runtime.

**Why:** This lets the judges exercise the entire journey without touching live grievances or exposing private research evidence.

### ADR-011 — Version policy

**Status:** accepted.

**Decision:** At scaffold time, pin currently supported stable/LTS releases in the lockfile and container. Add automated dependency update PRs, but merge only after CI, changelog review, and security assessment. Do not hard-code an architecture document to a framework version that will age before procurement.

### ADR-012 — API compatibility over framework compatibility

**Status:** accepted.

**Decision:** Publish versioned OpenAPI 3.1 contracts and versioned domain events. Use idempotency keys for submissions/appeals, correlation IDs, predictable pagination, and Problem Details responses. Do not expose sensitive values in query strings.

**Why:** A future Java or .NET service can implement the same contract; external consumers should not depend on Next.js internals.

## Explicitly rejected for the first build

- Microservices, Kubernetes, service mesh, Kafka, Redis, Elasticsearch/OpenSearch, and a lakehouse in the POC.
- A custom password/authentication implementation.
- A second Python backend with no custom ML workload.
- Blockchain or a hash-chain marketed as “tamper proof.” Database permissions, append-only events, signed audit exports, and independent logs are more useful.
- Direct browser calls to OpenAI or any government/external API.
- Real OTP, Aadhaar, MeriPehchaan, Parichay, Bhashini, SMS, email, WhatsApp, or CPGRAMS integration.
- Arbitrary public file upload before quotas, type validation, malware scanning, content disarm/reconstruction decisions, and object-store isolation exist.
- Tailwind/shadcn as the visual source of truth. Utility CSS may be used internally only if it does not override UX4G tokens and semantic component ownership.

## Decision to revisit after selection

If the team is selected for real implementation, hold formal ADR reviews for:

1. government owner and data-controller/fiduciary roles;
2. approved identity federation and assurance levels;
3. actual MeitY-empanelled/NIC cloud and managed-service catalogue;
4. service extraction and data ownership;
5. LLM hosting/provider approval;
6. event broker and analytics platform;
7. document storage/scanning;
8. availability, RPO/RTO, retention, and encryption/KMS design;
9. API Setu and state/central integration contracts;
10. STQC/CERT-In audit and certification plan.
