# Project prompt ledger

This is the append-only record of prompts used while researching, designing, building, testing, and preparing the Build What Moves India submission.

## Logging rules

1. Record each material user prompt verbatim.
2. Add the date, phase, purpose, and resulting artifact or decision.
3. Never silently rewrite an earlier prompt; add a correction or follow-up entry.
4. Do not record passwords, tokens, personal identifiers, or real sensitive government data.
5. Keep generated implementation prompts, evaluation prompts, and submission prompts in this same ledger.

---

## Prompt 001

- **Date:** 19 August 2026
- **Phase:** Problem discovery
- **Purpose:** Understand the hackathon and organize the initial research without selecting a specific government website.
- **Result:** Research reviewed and reorganized; project scope kept deliberately broad.

### Prompt (verbatim)

> [http://instagram.com/p/DcK\_fcbBo6T/?hl=en](http://instagram.com/p/DcK_fcbBo6T/?hl=en) [https://buildwhatmovesindia.com/brief](https://buildwhatmovesindia.com/brief) So, working on this hackathon, this project is related to this hackathon only. So, in the research folder, I have initial thoughts and notes, .txt file, which while researching different sources, I wrote vaguely down about what I think about things and what is a problem, how should we proceed. So, first I want you to organize my thoughts. First, you understand all the problem. In my initial thoughts.txt, there are multiple links. You go through them, understand everything, and then I want you to segregate properly my thoughts and all. Like, what is the current problem statement, current problem statement, and which direction I am thinking. So you plan what would be a better segregation of my thoughts, and you segregate them. Also, I want you to, so this research thing, I'm not planning to put on GitHub for now. So you add this in .gitignore. Also, I want you to make another repository folder here named, in that repository, you create a prompts.md file where every prompt which I will be using in this project, we will be storing that in that .md file. Because later I will be having to submit everything, all the prompts I use and everything. So we need to track everything in this project. And yeah, if you have any questions, you ask me first. Also, I cannot, not found the exact government website problem which I will be solving. I'm just accumulating the overall issue as a whole right now, and I'm yet to figure out what website problem I will be working on. So don't make any assumptions on what I'm working on for now. Just think of this problem as a whole for now and for this hackathon. We'll start thinking about a specific problem later.

---

## Prompt 002

- **Date:** 19 August 2026
- **Phase:** Repository setup
- **Purpose:** Name, structure, initialize, and commit the project repository.
- **Result:** Repository named `Build What Moves India`; initial structure and private-research boundary established.

### Prompt (verbatim)

> Name the repository as the hackathon's name, and segregate the thoughts and everything as I told you. Then commit, and before committing, everything should be in proper structured folder and all. And then start committing so I can track my work later stage of the project.

---

## Temporary curated research record

The entries in this section are temporary, faithful paraphrases of the planning-phase research requests. They are intentionally not the user's exact wording. They preserve the hackathon-relevant intent, decisions, and public project documentation only. Exact prompts will be appended later as a separate, append-only record; these summaries should not be treated as a replacement for them.

## Prompt 003 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Candidate selection
- **Purpose:** Compare the hackathon's eligible official platforms using public impact, citizen reach, current friction, existing digital coverage, differentiation, and demo feasibility; avoid repeating the most obvious examples.
- **Result:** CPGRAMS was selected as the working service because its strongest opportunity is an end-to-end grievance journey improvement rather than a superficial visual redesign.
- **Public record:** `docs/project-status.md`; `docs/architecture/01-evidence-and-current-baseline.md`

---

## Prompt 004 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Firsthand service validation
- **Purpose:** Walk through CPGRAMS as a citizen and record observable friction across registration, session continuity, grievance lodging, department selection, language handling, status, appeal, and the Samadhan Didi entry point.
- **Result:** Verified interface and flow observations were separated from hypotheses. The priority problems became continuity, routing clarity, immediate reassurance, status context, and appeal continuity.
- **Public record:** `docs/architecture/01-evidence-and-current-baseline.md`; `docs/architecture/07-design-system-and-current-vs-proposed.md`

---

## Prompt 005 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Existing-capability and gap analysis
- **Purpose:** Compare the existing CPGRAMS website, mobile experience, chatbot capability, and stated modernization direction so the prototype would add a meaningful capability instead of duplicating Samadhan Didi or merely changing the skin.
- **Result:** The differentiated opportunity was defined as an assured journey that preserves citizen context from description through routing, resolution, and appeal, using synthetic data and no live-system interference.
- **Public record:** `docs/project-status.md`; `docs/architecture/01-evidence-and-current-baseline.md`; `docs/architecture/05-security-privacy-and-ai-governance.md`

---

## Prompt 006 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Product definition
- **Purpose:** Convert the validated gap into a focused, citizen-first prototype journey: describe the issue, confirm or override routing, answer only relevant questions, receive an immediate receipt and timeline, understand the outcome, and appeal without retyping the case.
- **Result:** The working concept became CPGRAMS Assured Journey with a Resolution Receipt and a single canonical synthetic citizen story for the demonstration.
- **Public record:** `docs/architecture/03-prototype-architecture.md`; `docs/architecture/09-finalized-development-gates.md`

---

## Prompt 007 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Technology, security, and operations research
- **Purpose:** Study government technology patterns, security expectations, accessibility and service standards, scalability, observability, and production operating models; then select a prototype stack that can evolve toward a government-grade implementation.
- **Result:** The plan separates a browser-accessible modular-monolith prototype from a future production target. The prototype uses a typed web stack, relational persistence, replaceable AI integration, server-side authorization, auditability, automated testing, and DevSecOps-ready boundaries.
- **Public record:** `docs/architecture/02-stack-decision-and-adrs.md`; `docs/architecture/03-prototype-architecture.md`; `docs/architecture/04-production-target-architecture.md`; `docs/architecture/05-security-privacy-and-ai-governance.md`; `docs/architecture/06-devsecops-sre-and-operations.md`

---

## Prompt 008 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Inclusive civic design research
- **Purpose:** Compare Indian government design and accessibility guidance with established public-service systems from other countries, then derive a restrained Indian visual language that remains usable across devices, languages, literacy levels, and assistive technologies.
- **Result:** The design direction became Indian Civic Calm: task-first layouts, semantic controls, plain language, progressive disclosure, multilingual readiness, keyboard and screen-reader support, responsive behavior, and restrained civic color and typography.
- **Public record:** `docs/architecture/07-design-system-and-current-vs-proposed.md`; `docs/architecture/10-inclusive-civic-design-architecture.md`

---

## Prompt 009 (temporary paraphrase)

- **Date:** 20–24 August 2026
- **Phase:** Development readiness
- **Purpose:** Turn the research into measurable implementation gates so the prototype can be judged as a reliable public-service journey rather than a collection of screens.
- **Result:** Five gates were finalized: freeze the judge story, complete the accessibility/design spike, prove session continuity, evaluate routing with a synthetic test set and safe fallback, and deliver the Resolution Receipt with context-preserving appeal.
- **Public record:** `docs/architecture/08-pre-development-gates-and-roadmap.md`; `docs/architecture/09-finalized-development-gates.md`; `docs/project-status.md`

---

## Prompt 010

- **Date:** 24 August 2026
- **Phase:** Implementation kickoff
- **Purpose:** Begin implementation in logical, testable phases with user checkpoints, iteration opportunities, structured prompt/progress records, and no unapproved expansion beyond the frozen plan.
- **Result:** Implementation phases and the checkpoint/change-control process were established; Phase 0A became the active build slice.
- **Public record:** `docs/implementation/README.md`; `docs/implementation/progress-log.md`

### Prompt (verbatim)

> okay now as we are done with the design and architecting of our application, lets start our implementation, lets divide it into phases and checkpoints , where i can test the plans in between and we can reiterate and change our plans if needed, store the prompts and progress structurally as we discussed before, divide the plan into logical testable phases, document every major progress and updates, only follow what we have discussed until yet dont assume ask if any doubt

---

## Prompt 011

- **Date:** 24 August 2026
- **Phase:** Checkpoint 0A feedback and deployment/language/identity constraints
- **Purpose:** Approve the first component-foundation checkpoint with required follow-ups, require a genuinely zero-cost and resilient public-demo path, retain government identity/communication content in a better hierarchy, and raise multilingual coverage to the current service baseline.
- **Result:** Phase 0B opened under a new zero-cost, identity, and language-parity decision. Neon Free is the initial PostgreSQL target; host compatibility must be proven before commitment; the interface target is English plus 22 scheduled Indian languages; the unofficial prototype will retain civic identity and public updates without restricted official emblems.
- **Public record:** `docs/implementation/decisions/001-zero-cost-identity-and-language.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> Yeah, it looks very basic. I'm not sure if this is what you wanted to do in the first iteration, but it's okay. Let's continue. And also a few things, like you remember this is a demo, and you're talking about some Postgres and all. So you plan ahead of time that we have to deploy this, and we have to deploy this in a free environment. So make sure you don't take anything paid or something, or some database which might not work and which might create issues later. So you think that as well, because I'm just in free tier, I don't want to pay anything for this hackathon, and if we use database, there can be availability issues also. So you think before you act what you're gonna do. Next thing, the UI looks very basic. It seems like you have just copied the United Kingdom ones. I won't comment for now because I don't know what have you planned for the future. Also, even though those logos and poster banners were like very distracting in the main website, but in the future we should have them, because that is the identity of the website, and those are some of the important things which government want to communicate. So we should design them better, but we should not, I think, remove them completely. I don't know, maybe you will be fixing that in the next build. Also just this is English and Hindi for now, I think so. But the original website features, I think all Indian languages. So I think so. I don't know if you're gonna do this in future or not. But make sure it has all 21 languages, at least whatever the original website had. Because we don't want to set the bar below the original website. Even though maybe all the languages won't work 100%, but it should be demoable at least. So these are the feedbacks. I know you don't have. This is the first phase, and you must have not done any specific things. Format, it's fine, whatever. I don't know whatever you have planned for the future. Let's move to the next phases and see how it turns out.

---

## Prompt 012

- **Date:** 25 August 2026
- **Phase:** Deadline acceleration and judge-ready vertical slice
- **Purpose:** Connect the user-owned free Neon project and accelerate implementation so the most important end-to-end citizen journey is presentable within one day.
- **Result:** The free database was created and migrated. Following the hackathon's mock-backend allowance, Phases 1–4 were compressed into a deterministic browser journey that prioritizes visible citizen value while retaining the real persistence foundation for deployment.
- **Public record:** `docs/implementation/checkpoints/accelerated-judge-slice.md`; `docs/implementation/progress-log.md`

### Prompt (verbatim)

> okay lets continue, lets speed up the progress a little bit we have deadline soon, tell me what you need, i have logged in the neon db in my browser, tell me next step, as the deadline is in 1 day, we need to quickly wrap up hackathon presentable prototype

---

## Prompt 013

- **Date:** 25 August 2026
- **Phase:** Deployable product completion and original-service parity
- **Purpose:** Finish the complete deployable prototype before visual refinement, compare it with the live CPGRAMS public service, and close functional, accessibility, resilience, language and deployment gaps without duplicating capabilities the original already provides.
- **Result:** The product gained complete assisted and manual filing paths, reviewed English/Hindi core journeys, service guidance and scope handoffs, runtime recovery, production metadata and headers, container/CI delivery assets, and a documented live parity audit.
- **Public record:** `docs/implementation/original-parity-audit.md`; `docs/implementation/checkpoints/deployable-product.md`; `docs/implementation/progress-log.md`

### Prompt (verbatim)

> lets finish the whole deplpoyable project first, ill tell the ui changes once evrything is done then we will start making is sumbission ready, so lets try finishing the project, also i want you to compare with the original website where we are lacking and re itrate to complete the project
