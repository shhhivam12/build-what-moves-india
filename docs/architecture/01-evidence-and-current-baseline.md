# 01 — Evidence and current CPGRAMS baseline

## The most important correction

There is no public evidence that the current CPGRAMS citizen portal uses Java as its primary backend.

The most recent detailed official technology inventory found is DARPG's 2024 NextGen CPGRAMS RFP. It records CPGRAMS 7.0 as:

| Layer | Officially documented CPGRAMS 7.0 baseline |
| --- | --- |
| Framework | .NET Framework 4.5 / ASP.NET |
| Application architecture | MVC |
| Language | C# |
| Server operating system | Windows Server 2012 R2 |
| Browser layer | JavaScript, HTML, CSS, jQuery |
| Integration | Web services and APIs |
| MVC/database details | MVC .NET 5.2.8 and Microsoft SQL Server 2012 |
| Character support | Unicode enabled |
| Hosting | National Data Centre, Shastri Park, New Delhi |
| Infrastructure | 10 VMs, plus documented DR, replication, and staging availability |

Source: [DARPG, Request for Proposal Volume I, sections 3.3 and 4](https://darpg.gov.in/sites/default/files/RFPVolume1.pdf).

This is a **2024 procurement snapshot**, not proof that every active component still runs unchanged in August 2026. Public 2026 sources announce new modules and capabilities but do not disclose a replacement production language/framework. We must therefore say “the documented CPGRAMS 7.0 baseline is .NET/C#/SQL Server,” not “the current portal definitely runs this exact build today.”

## Government of India does not use one mandatory programming stack

Different public platforms use different enterprise stacks. For example, an official NeGD UMANG backend RFP describes an open-source, loosely coupled platform using Java/Tomcat, PostgreSQL, Kafka, WSO2 API Manager, Redis/Memcached, HAProxy/Nginx, Ansible, and monitoring tools. CPGRAMS 7.0, by contrast, is documented on the Microsoft stack above. See the [NeGD UMANG backend RFP](https://negd.gov.in/wp-content/uploads/2025/01/UMANG-BE-RFP_Final_0_compressed.pdf).

**Inference:** Java is common in Indian e-governance because of its long enterprise lifecycle, mature application-server ecosystem, skills availability, integration tooling, and open-source options. Microsoft stacks offer similarly mature enterprise support and historically fit Windows/NIC operations. Neither language is itself a government standard. The binding concerns are service reliability, open standards, security, interoperability, accessibility, auditability, lifecycle support, and procurement constraints.

## Documented scale and operational strengths of CPGRAMS 7.0

The RFP's July 2024 snapshot reports:

- 822 GB database size with approximately 20% annual growth;
- 27 lakh public users and 74,000 active grievance redressal officers;
- approximately 18,000 public-user and 18,000 GRO logins per day;
- more than 10,000 citizen accesses per hour at peak;
- DR availability, replication servers for downstream stakeholders, and staging servers;
- dynamic CPU and memory allocation within allotted resources.

These figures should not be mixed with later public registration or grievance-volume reports because their definitions and periods differ.

### Strong points worth preserving

| Strength | Why it matters | What the proposal preserves |
| --- | --- | --- |
| Mature relational case store | Grievance, officer, route, appeal, and status data require consistency | PostgreSQL transactions, foreign keys, immutable events, and versioned state transitions |
| Proven national-scale workflow | The system already connects many ministries, departments, states, and officers | Adapter/API boundaries and explicit jurisdiction, not a fake universal autonomous router |
| Role-based processing | Citizen, GRO, nodal authority, and appellate roles have different authority | Attribute/role checks and immutable actor/reason audit records |
| Unicode and multi-channel direction | Indian-language access and multiple delivery channels are essential | Unicode-first content, durable language preferences, and a channel-neutral case model |
| DR, staging, and replication | Government service continuity is an operational requirement | Separate environments, backup/restore tests, event replication, and a production DR design |
| APIs and reporting | The platform already exchanges data and supports MIS/analytics | OpenAPI contracts, privacy-safe event feeds, and a separate operational/analytics boundary |
| Human accountability | Officials, not algorithms, own routing decisions, remedies, closure, and appeals | AI remains advisory and every official action has an actor, timestamp, reason, and evidence |

## Documented baseline constraints

The same RFP records the 2024 CPGRAMS 7.0 system as not GIGW compliant, not compliant with Local Government Directory codes, and only partly compliant with MeitY naming standards. It also names software versions that were already old in 2024.

That does not mean the system is badly engineered overall. It means a nationally important, operationally mature service has accumulated technology and interaction debt while continuing to serve at scale. The right migration strategy preserves working jurisdiction, records, operational knowledge, and integrations while replacing fragile citizen journeys and ageing components incrementally.

The private authenticated audit adds one observed product-level concern: a signed-in dashboard could show a case while record, status, and reminder destinations failed or repeated public-lookup fields. No private screenshot, citizen identifier, or authenticated URL is reproduced in this document.

## What is already live or announced by August 2026

The product landscape moved after the 2024 RFP:

- A dedicated senior Review Module has been operational since June 2025 according to 2026 monthly reports.
- DARPG and Bhashini announced a 22-language, voice-capable grievance-filing collaboration in March 2025.
- The AI voice chatbot “Samadhan Didi” launched on 30 May 2026.
- An August 2026 PIB release still describes broader NextGen CPGRAMS as being advanced, which suggests staged delivery rather than evidence of a single completed platform replacement.

Sources: [PIB on the DARPG–Bhashini collaboration](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2116333), [PIB on Samadhan Didi and NextGen progress](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2296724), and the [June 2026 CPGRAMS monthly-report release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290923).

### Competitive implication for the hackathon

“Add AI classification,” “let users speak a grievance,” and “build a grievance chatbot” are no longer uncommon ideas. They overlap with official work already live or explicitly planned. Our architecture uses route assistance only as a supporting capability.

The uncommon, defensible product layer is:

1. authenticated continuity around one durable case record;
2. a receipt that shows owner, next event, and service expectation immediately;
3. a citizen-visible, append-only timeline of what actually happened;
4. a Resolution Receipt that tests the requested outcome against official action and relied-upon evidence;
5. an appeal draft that carries the case and disputed items forward.

## Official NextGen direction

The RFP specifies a future system that is:

- modular and microservice-based on open-source technology;
- technology-neutral across common desktop and mobile browsers;
- API-centric, with Bhashini, chatbot, WhatsApp, analytics, and other modules loosely coupled from the core;
- deployed only on a MeitY-empanelled cloud for the contracted system;
- scalable, load-balanced, highly available, portable between cloud providers, and backed by DC, Near-DR, and DR arrangements;
- interoperable with central, state, Parichay, UMANG, document, SMS/email, and other systems;
- OpenTelemetry-aligned, with open non-PII APIs and structured audit trails;
- supported by a data lake/lakehouse for batch, real-time, and event-driven analytics;
- tested through unit, integration, security, functional, performance, load/stress, UAT, and pre-go-live certification;
- security-audited through CERT-In-empanelled and STQC routes before go-live, with quarterly preventive maintenance/security audit during operations.

The RFP also explicitly identifies the current department-first filing flow as offloading institutional complexity onto citizens. It proposes text/speech-first filing, follow-up questions, ranked route options, and citizen choice. This validates our problem evidence but removes the right to claim describe-first routing as the sole novelty.

## Availability and recovery targets from the RFP

| Measure | Official NextGen requirement |
| --- | --- |
| Monthly platform availability baseline | At least 99.7%, measured through the enterprise monitoring system |
| Near-DR compute/storage | At least 75% compute and 100% database storage |
| Near-DR RPO/RTO | RPO no more than 5 minutes; RTO under 30 minutes |
| Full DR compute/storage | 100% compute and 100% database storage |
| Full DR RPO/RTO | RPO no more than 15 minutes; RTO under 1 hour |
| Environments | Development, test, staging, and production provisioned in cloud |

These are future reference targets, not claims about the hackathon host.

## Government digital standards that affect architecture

### GIGW 3.0

GIGW 3.0 covers quality, accessibility, cybersecurity, and lifecycle management. It sets WCAG 2.1 Level AA as the current government baseline, incorporates cybersecurity guidance based on ISO 27001, OWASP ASVS, OWASP Top 10, and CIS benchmarks, and retains the requirement for a “safe to host” certificate. It also emphasises a designated Web Information Manager and continuing governance after launch. Sources: [GIGW 3.0 new features](https://guidelines.india.gov.in/new-features-of-gigw-3-0/) and [GIGW introduction](https://guidelines.india.gov.in/introduction/).

### UX4G Design System 3.0

UX4G provides government-oriented foundations, tokens, components, and patterns for React, Angular, Flutter, and Web Components. Its developer documentation states compatibility with React and Next.js App Router and requires WCAG 2.1 AA as the minimum. Using a design-system package does not remove the need for semantic HTML, keyboard, contrast, screen-reader, reflow, and user testing. Sources: [UX4G developer guidance](https://www.ux4g.gov.in/get-started/for-developers), [foundations](https://www.ux4g.gov.in/foundations), and [accessibility guidance](https://www.ux4g.gov.in/foundations/accessibility).

### STQC certification

STQC's Certified Quality Website process evaluates more than pages. It asks for a website quality manual, application/database vulnerability-assessment reports, network architecture, recent security clearance, and data-centre details; it combines tool and manual evaluation with backend process assessment. The certificate is valid for three years with annual and surprise surveillance. Source: [STQC Website Quality Certification](https://www.stqc.gov.in/website-quality-certification-0).

### Open APIs and interoperability

The Government's Open API policy requires stable, scalable, platform/language-independent, documented APIs and lifecycle publication; it calls for backward compatibility with at least two earlier versions and permits authentication/SSO. API Setu promotes OpenAPI, RESTful APIs, consent-driven exchange, usage controls, logs, and OAuth2-capable authentication. Sources: [Open API policy statement](https://docs.apisetu.gov.in/document-central/api-policy/Policy%20Statement.html) and [API Setu](https://apisetu.gov.in/aboutus).

### Enterprise architecture principles

The draft InDEA 2.0 framework is useful architectural guidance—not a final binding standard. It promotes open APIs by default, open source and open standards, national portability, localisation/inclusion, participatory design, and responsible deployment of emerging technology. Source: [draft InDEA 2.0](https://www.meity.gov.in/writereaddata/files/InDEA%202_0%20Report%20Draft%20V6%2024%20Jan%2022_Rev.pdf).

## Architectural conclusion from the baseline

The best prototype stack is not the one that most closely imitates CPGRAMS 7.0. It is the smallest credible open, accessible, API-ready system that demonstrates the missing accountable journey and can be mapped to the official NextGen direction.

That means:

- do not rebuild old .NET simply for visual authenticity;
- do not choose Spring Boot merely because Java appears in other government platforms;
- do not build microservices before service boundaries, load, and teams justify them;
- do preserve relational integrity, jurisdiction, roles, audit history, Unicode, DR thinking, and integration discipline;
- do show exactly how the POC can migrate to the official open-source, modular, cloud, API, observability, and security target.
