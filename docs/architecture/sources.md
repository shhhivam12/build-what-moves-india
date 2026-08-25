# Primary source register

Last verified: 24 August 2026

This register lists the principal official and standards-body sources used in the architecture package. A source supports only the claim described; it does not imply that the project is certified, approved, or affiliated with the publisher.

## CPGRAMS and DARPG

| Source | Supports | Evidence note |
| --- | --- | --- |
| [DARPG — NextGen CPGRAMS RFP Volume I](https://darpg.gov.in/sites/default/files/RFPVolume1.pdf) | CPGRAMS 7.0 stack/deployment/scale snapshot; official NextGen modular, open-source, API, cloud, data, AI, security, testing, DR, SLO, and audit requirements | Most detailed technical primary source; issued in 2024, so current-stack statements are explicitly dated snapshots |
| [PIB — DARPG/Bhashini multilingual multimodal collaboration](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2116333) | Planned 22-language voice/text grievance filing and Bhashini collaboration | Published 28 March 2025; expected launch language is not proof every feature shipped exactly as planned |
| [PIB — Samadhan Didi and NextGen CPGRAMS progress](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2296724) | AI voice chatbot launch on 30 May 2026; broader NextGen described as advancing | Current as of August 2026 and directly affects hackathon differentiation |
| [PIB — CPGRAMS States/UTs June 2026 report release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290923) | 2026 operation and Review Module status | Operational/product update; does not disclose backend framework |
| [MeitY — CPGRAMS grievance redressal overview](https://www.meity.gov.in/connect/grievance-redressal) | Role-based 24×7 platform, mobile/UMANG access, status, feedback/appeal and excluded topics | Citizen-service overview, not a technical architecture document |

## Government web quality and design

| Source | Supports | Evidence note |
| --- | --- | --- |
| [GIGW 3.0 — Introduction](https://guidelines.india.gov.in/introduction/) | Scope, government lifecycle, API integrations, STQC/CERT-In context | Official NIC/MeitY-hosted guidance |
| [GIGW 3.0 — New features](https://guidelines.india.gov.in/new-features-of-gigw-3-0/) | WCAG 2.1 AA, cybersecurity basis, lifecycle management, safe-to-host requirement | Official summary of version 3.0 additions |
| [GIGW 3.0 — Scope and objective](https://guidelines.india.gov.in/scope-and-objective/) | Government applicability, ISO 23026/WCAG/RPwD/IT Act basis | Used for standards context |
| [GIGW 3.0 — Guidelines](https://guidelines.india.gov.in/guidelines/) | Consistent IA/navigation/terminology/visual identity, API integration and detailed checkpoints | Use the current conformity matrix during implementation, not this summary alone |
| [STQC — Website Quality Certification](https://www.stqc.gov.in/website-quality-certification-0) | CQW process, quality manual, VA/network/data-centre/security evidence, manual/tool/backend evaluation, surveillance | Certification belongs to STQC; project makes no certification claim |
| [UX4G — Developer guidance](https://www.ux4g.gov.in/get-started/for-developers) | React/Next.js-compatible package and WCAG 2.1 AA baseline | Package/component behaviour still requires project testing |
| [UX4G — Foundations](https://www.ux4g.gov.in/foundations) | Tokens, typography, spacing/grid, accessibility/content foundations | Design starting point |
| [UX4G — Accessibility](https://www.ux4g.gov.in/foundations/accessibility) | Semantics/manual-testing disclaimer and accessibility principles | Explicitly rejects treating an overlay/toolkit as conformance |
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Voluntary higher engineering target and new criteria relevant to focus, target size, redundant entry, authentication | GIGW 3.0's formal stated baseline remains WCAG 2.1 AA |

## Security, privacy, and cloud

| Source | Supports | Evidence note |
| --- | --- | --- |
| [CERT-In — Directions under section 70B, 28 April 2022](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) | NIC/NPL-traceable time sync, six-hour incident reporting, CERT-In PoC, 180-day logs in India | Production operating requirement where applicable |
| [OWASP — ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Verifiable application-security control catalogue; latest page states ASVS 5.0.0 | GIGW cites ASVS generally; verification level must be selected with owners/auditor |
| [OWASP — API Security](https://owasp.org/www-project-api-security/) | API-specific threat awareness including broken object authorisation and unsafe consumption | Complements, not replaces, ASVS/other testing |
| [MeitY — Cloud Service Offering Empanelment, March 2024](https://www.meity.gov.in/writereaddata/files/Empanelment-Cloud-Service-Offering-March%202024.pdf) | India hosting/processing/residency, portability/disposal, audits, certification checklist | Applies to relevant empanelment/procurement; not the commercial synthetic POC host |
| [MeitY — Guidelines for Procurement of Cloud Services](https://www.meity.gov.in/writereaddata/files/4.%20Guidelines%20for%20Procurement%20of%20Cloud%20Services%20-%20V%202.0.pdf) | Responsibilities, DR/managed service, portability and exit/transition | Production procurement reference |
| [DPDP Act 2023](https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf) | Security safeguards, processor contracts, accuracy, breach, erasure/retention duties subject to commencement/exemptions | Architecture guidance only; legal interpretation requires counsel |
| [DPDP commencement notification, November 2025](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf) | Phased commencement of Act provisions | Current date matters; full framework not in force on 24 August 2026 |
| [DPDP Rules 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf) | Rule content and phased one-year/eighteen-month commencement | Check corrigenda and current legal advice at implementation time |

## APIs, enterprise architecture, and language infrastructure

| Source | Supports | Evidence note |
| --- | --- | --- |
| [API Setu — Open API policy statement](https://docs.apisetu.gov.in/document-central/api-policy/Policy%20Statement.html) | Stable/scalable, platform/language-independent documented APIs, lifecycle and two-version backward compatibility | Government Open API policy |
| [API Setu — About and characteristics](https://apisetu.gov.in/aboutus) | API-first/interoperability, consent management, security, authentication/SSO context | Official platform overview |
| [API Setu — Partner/API management features](https://docs.apisetu.gov.in/document-central/explore-apisetu/Partners.html) | OAuth2-capable auth, rate controls, logs, caching, schemas, REST/OpenAPI direction | Implementation detail still depends on provider/API agreement |
| [Draft InDEA 2.0](https://www.meity.gov.in/writereaddata/files/InDEA%202_0%20Report%20Draft%20V6%2024%20Jan%2022_Rev.pdf) | Open API by default, open source/open standards, portability, inclusion, participatory/responsible design | Explicitly a draft architectural reference, not presented as binding final policy |
| [MeitY Annual Report 2025–26 — Bhashini](https://www.meity.gov.in/static/uploads/2026/04/46face7d48c8f6a97030f713ad5fdab4.pdf) | Bhashini capabilities including ASR, translation, TTS, OCR, transliteration and language detection | Official capability overview |
| [MeitY Annual Report 2023–24 — CPGRAMS/Bhashini](https://www.meity.gov.in/writereaddata/files/MEITY-AR-2023-24.pdf) | CPGRAMS use of Bhashini for grievance/reply translation | Shows existing integration; prevents false novelty claim |
| [NeGD — UMANG backend RFP](https://negd.gov.in/wp-content/uploads/2025/01/UMANG-BE-RFP_Final_0_compressed.pdf) | Example of a different Indian government open-source Java/PostgreSQL/Kafka/API platform | Demonstrates that government does not mandate one application language |

## Selected implementation technologies

| Source | Supports | Evidence note |
| --- | --- | --- |
| [Next.js — App Router](https://nextjs.org/docs/app) | Server/client component architecture and application model | Pin supported stable version at implementation time |
| [Next.js — Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) | Server endpoint support in App Router | Use as BFF/API implementation, not as public contract definition |
| [Next.js — Self-hosting](https://nextjs.org/docs/app/guides/self-hosting) | Node/Docker deployment, reverse-proxy recommendation, multi-instance considerations | Supports portability beyond one commercial host |
| [PostgreSQL documentation](https://www.postgresql.org/docs/current/) | Transactions, constraints, JSONB, indexing, replication and operational database features | Select supported major/version with operations/security owner |
| [OpenTelemetry](https://opentelemetry.io/docs/) | Vendor-neutral traces, metrics, and logs | RFP also asks for OpenTelemetry alignment |
| [OpenTelemetry JavaScript](https://opentelemetry.io/docs/languages/js/) | Node.js telemetry implementation and current signal status | Browser instrumentation maturity must be reviewed before use |
| [Playwright — Accessibility testing](https://playwright.dev/docs/next/accessibility-testing) | Automated accessibility checks plus explicit manual-testing limitation | Used in CI, not as sole conformance evidence |
| [Next.js — Authentication guidance](https://nextjs.org/docs/app/guides/authentication) | Distinguishes authentication/session/authorisation and recommends auth libraries | Better Auth selected for POC; library due diligence remains required |
| [Better Auth — Next.js integration](https://better-auth.com/docs/integrations/next) | Current Next.js/session integration | POC synthetic auth; production uses approved government federation |

## Cross-government design, accessibility, and content research

| Source | Supports | Evidence note |
| --- | --- | --- |
| [GIGW 3.0 — conformity matrix](https://guidelines.india.gov.in/annexure-ii-matrix-to-check-conformity/) | Consistent experience/identity, lifecycle policies, synchronised multilingual pages, bilingual Unicode, accessible formats and WCAG-linked checkpoints | India already has detailed requirements; this project must not frame the gap as absence of standards |
| [UX4G — Foundations](https://www.ux4g.gov.in/foundations?lang=en) | Colour, typography, 4px spacing/grid, elevation, iconography, tokens, WCAG 2.1 AA and multilingual content foundations | Project uses foundations even when a library component is replaced |
| [UX4G — Accessibility](https://www.ux4g.gov.in/foundations/accessibility) | POUR, contrast, keyboard, screen reader, semantics, forms/errors and known-limitations model | Explicitly says the toolkit does not replace semantic implementation and testing |
| [UX4G — Patterns](https://www.ux4g.gov.in/patterns) | Progressive disclosure, clear feedback, mobile-first, multilingual, dashboards, notifications and assisted flows | Pattern documentation is a starting point, not proof the project page conforms |
| [UX4G — UX Handbook](https://www.ux4g.gov.in/assets/img/pdf/UX4G-Handbook.pdf) | Noto Sans/Indic typography and brand-token rationale | Used to justify the matching Noto English/Devanagari type system |
| [USWDS — Design principles](https://designsystem.digital.gov/design-principles/) | Real user needs, earned trust, accessibility, continuity and listening | Official U.S. federal design-system principles |
| [USWDS — Accessibility](https://designsystem.digital.gov/documentation/accessibility/) | Ability-specific needs, page-level testing, assistive technology, automated/manual testing and continuous accessibility | Accessible components do not eliminate product-level testing |
| [GOV.UK — WCAG 2.2](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag) | WCAG 2.2 AA, 400% reflow, focus, target size, errors, redundant entry and accessible authentication | Higher project engineering target; India's formal GIGW baseline remains WCAG 2.1 AA |
| [GOV.UK — progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) | HTML-first government transactions, minimal client JavaScript, low-powered/slow-network resilience and no-SPA warning | Applied as an architecture principle even though the implementation uses Next.js |
| [GOV.UK — validation recovery](https://design-system.service.gov.uk/patterns/validation/) | Preserve entries, focus error summary, connect specific messages to fields, avoid premature validation | Used for form/error contract |
| [Government of Canada — designing content](https://design.canada.ca/designing-content.html) | Task focus, trusted shell, findability, comprehension, usability and non-negotiable inclusion | Supports consistent shell with flexible task body |
| [GC Design System — start to use](https://design-system.canada.ca/en/start-to-use/) | Bilingual, accessible, framework-independent web components and tokens | Supports multilingual parity and technology-neutral components |
| [Australia — Digital Experience Policy](https://www.dta.gov.au/articles/digital-experience-policy-and-standards-now-live-digitalgovau) | Inclusive, cohesive services, diverse research, measurable outcomes, interoperability and continuous improvement | Policy effective from 2025; use current linked standard for formal assessment |
| [Australia — GOLD principles](https://gold.designsystemau.org/about) | Users first, consistent not uniform, function over fashion, reuse and evidence over opinion | GOLD is not mandatory; cited as a government design-system principle source |
| [Singapore Government Design System](https://www.designsystem.tech.gov.sg/) | Fast, accessible, mobile-friendly shared foundations | Current official SGDS overview |
| [Singapore — content standards](https://www.designsystem.tech.gov.sg/get-started/content) | Direct/respectful/plain content, sentence case, specific buttons/errors, accessible headings/links | Used for UI content rules rather than Singapore-specific spelling conventions |
| [New Zealand — Web Standards](https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards) | WCAG 2.2 and usability standards, self-assessment, risk planning and central monitoring | Demonstrates lifecycle governance beyond component adoption |
| [New Zealand — Web Accessibility Standard 1.2](https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-accessibility-standard-1-2/about-the-web-accessibility-standard) | WCAG 2.2 AA for full pages and complete processes | Used to reinforce end-to-end conformance thinking |
| [European Commission — ECL guidelines](https://ec.europa.eu/component-library/eu/guidelines/) | User-centred evidence, shared vocabulary, consistency, reuse/flexibility and inclusive design | Official Commission design-system guidance |
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | International accessibility success criteria | Project engineering target; test complete critical process |
| [W3C — What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) | Focus not obscured, target size, redundant entry, consistent help and accessible authentication | Particularly relevant to CPGRAMS session/status issues |
| [W3C — Internationalisation quick tips](https://www.w3.org/International/quicktips/) | UTF-8, language metadata, local formats, concise text, visible language navigation and RTL support | Used for language/data/component contract |
| [web.dev — Core Web Vitals](https://web.dev/articles/vitals) | Current LCP, INP and CLS field thresholds and p75 measurement | Performance metric source; not a government conformance standard |
| [web.dev — performance budget](https://web.dev/articles/your-first-performance-budget) | Critical-path transfer budgets for low-cost devices and slow networks | Project's exact budgets are proposals and must be adjusted with measured builds |

## OpenAI POC adapter

| Source | Supports | Evidence note |
| --- | --- | --- |
| [OpenAI — Data controls](https://developers.openai.com/api/docs/guides/your-data#default-usage-policies-by-endpoint) | Training/default retention/application-state/ZDR distinctions and Responses API storage behaviour | Justifies synthetic-only POC and `store: false`; does not satisfy the RFP's isolated production LLM controls |
| [OpenAI — Responses API reference](https://developers.openai.com/api/reference/cli/resources/beta/subresources/responses) | JSON Schema Structured Outputs and stateless options | Adapter is server-side and provider-neutral at the domain boundary |

## Evidence not published here

The repository's ignored `/research/` folder contains the private authenticated CPGRAMS audit and screenshots. It is deliberately excluded from this source register's public artefacts. Any future submission image must be a separately redacted derivative with names, contact information, registration IDs, complaint content, browser-profile indicators, and opaque identifiers removed.
