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

---

## Prompt 014

- **Date:** 25 August 2026
- **Phase:** Production-style identity experience
- **Purpose:** Replace the judge-only entry treatment with real sign-in and account-creation pages while retaining fast fictional access for evaluators.
- **Result:** Added persistent Better Auth email/password accounts, separate responsive sign-in and registration pages, fictional-data autofill, one-click demo-citizen provisioning, protected dashboard entry and secure sign-out.
- **Public record:** `docs/implementation/checkpoints/identity-experience.md`; `docs/implementation/progress-log.md`

### Prompt (verbatim)

> make actual pages of login/sign up with by adding some button to fill mock data and login quicky, but it should be there as i want to show them my vision

---

## Prompt 015

- **Date:** 26 August 2026
- **Phase:** Full civic product and visual rebuild
- **Purpose:** Replace the underwhelming judge-only interface with a complete production-style civic website using verified Indian government identity, a modern functional tricolour system, responsive and inclusive interaction, consistent signed-in identity, real product pages and working citizen-facing intelligence.
- **Result:** Rebuilt the complete public and signed-in experience, removed the legacy Asha presentation, added a first-visit orientation, persistent filing/tracking/receipt/appeal workflows, a free explainable route assistant and a shared official-identity-aware responsive design system.
- **Public record:** `docs/implementation/checkpoints/full-civic-redesign.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> You still have not fixed the UI and UX. I told you in the last message to add back the Indian actual logos. You didn't even change in the demo part. You only added this sign up and sign in. Fix everything and come back to me. I need a full website now with proper UI and without this Asha logo. We are logging in as Raghav and in the demo it is showing as Asha Verma. I told you to remove this whole thing and I want you. You follow my last prompt, whatever I said. I told a big prompt where you have to put the UI very nicely and put the official website's logo as well and give it a tricolor theme. Now I give you freedom to use any buttons and transitions, but it should be functional and should work on scale and with proper colors. The colors are very bad of this application and not inconsistent as well. You'll have to fix it all. You didn't fix anything. You just added sign up page now.

---

## Prompt 016

- **Date:** 26 August 2026
- **Phase:** Modern tricolour government portal replacement
- **Purpose:** Replace the remaining institutional dark-blue and generic international visual language with a credible, modern Indian public-service experience; use restrained tricolour gradients, glass surfaces and transitions; remove promotional and prototype-facing language; restore formal government identity and banners; and ensure the complete demonstration remains available when the free database is unavailable.
- **Result:** Rebuilt the public shell, homepage, identity pages and signed-in service surfaces in a light saffron/ivory/green system; formalised portal content and hierarchy; reduced the masthead; removed prohibited copy and dark-blue surfaces; and added a bounded database-independent sample session supporting the complete citizen journey.
- **Public record:** `docs/implementation/checkpoints/tricolour-government-portal-redesign.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> The design is at least better than last time, but it is nowhere close to where my vision is. First of all, you're not using a tri-color theme. I don't want the website to be blue, yellow, and whatever colors you have given. I want it to be some clean, modern gradient tri-color with modern aesthetics. And this website is not giving a safe feeling and not an Indian feeling. It seems very unreliable and non-Indian website. Also, the government logo is very big. You're not following any UX standards. These aesthetics are not good. Stop using the government guidelines, and we will be using our own aesthetics. You can use some transparency, glass metrics, and smooth animation, smooth transitions, while making sure it is accessible for all the users. Also stop using keywords like one account, every grievance, clear process, sign in to log the grievance, follow every action, challenge only what remains unresolved. Stop using the commas and all. This is not how Indian things work. Also stop using these green dots, which I have shown in the picture, and stop using these keywords like design for every citizen. Government would never put anything on a website like this. I have to present a concept, which the actual government would deploy. This looks very fake. Why aren't you not understanding? I don't understand. Just follow what I'm saying. Make it a real website, a real government website. Don't use these keywords, like which government would never use in the website. This website is not at all giving an Indian feel. I hate the website currently, man. This is nowhere close to my vision. Also add Indian banners, Indian versions, give a glass design, aesthetic design, modern design. Stop using these keywords. remove all these kinds of text - A citizen-first redesign concept for clearer routing, accountable progress and focused appeals.  , Mobile-first · Keyboard accessible · Multilingual-ready  , Our aim is to make it helpful for the end customer. You assume the end customer is very dumb. You can show him indicators like that they can navigate with keyboard and mouse. Try to spoon-feed everything to them. Also use government banners, which they use on their official websites. Make it an actual website, please. We need to rethink the whole plan. You go through the entire previous plan and update with what I am saying right now. Don't follow previous instructions, which you are following currently and not updating it properly. Stop using the government design theme. We have to fix the government design theme. Give it an aesthetic tri-color theme. Also the database is not working. So for this demo, this should not happen in production. So if somehow the database is not working, you just log it in with mock data. You wait for one, two seconds and log it in with mock data if there is some issue from database, because we can't afford this in the final demo when the evaluator is seeing it. They will reject our project in an instant, and we'll just keep on crying for that our new database, Postgres, this, that. We don't want this thing. Also fix the colorings. I hate the colorings. Stop using this dark blue. I should not see dark blue from the next iteration, where you make changes.

---

## Prompt 017

- **Date:** 26 August 2026
- **Phase:** Dashboard density and grievance-record clarity
- **Purpose:** Reduce oversized identity and empty space, then restructure the individual grievance record using the 1–3–10 second comprehension rule so status, progress, outcomes, evidence and next action are immediately understandable.
- **Result:** Compressed the shared masthead and dashboard opening; replaced the grievance detail with a staged summary, at-a-glance facts, interactive jump navigation, visual case progress, explicit completed/pending relief rows, progressively disclosed original information and a contextual appeal action.
- **Public record:** `docs/implementation/checkpoints/grievance-record-1-3-10.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> this place is empty not looking good resuce size of main logo, also individual http://localhost:3000/grievances/CPG-DEMO-2026-001 is not clear, follow 1-3-10 sec rules with interactive visuals, right now it is very confusing ui , make it structured proper where important info is displayed first and , put , original website looks more clean and structutred than ours

---

## Prompt 018

- **Date:** 26 August 2026
- **Phase:** Rajasthani civic cultural layer
- **Purpose:** Add a restrained Indian cultural identity to the grievance portal using a namaste service figure, humane Hindi reassurance and subtle Rajasthani architectural and geometric references while preserving task clarity and neutral numeric hierarchy.
- **Result:** Added a responsive jharokha-inspired reassurance panel with a transparent namaste figure, subtle jaali and mandana accents, neutralised step numerals across the product and made one-click evaluator access independent of Neon availability.
- **Public record:** `docs/implementation/checkpoints/rajasthani-civic-cultural-layer.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> can we make it more for grievence like with indian rajasthani art elements in the website maybe, and a lady will be standing with namaste hands and tagline of the website maybe asuvidha ke liye khed hai, indian elemets should be very subtle but marvolouly beautiful showcasing indian culture, also dont put the tricolor on the numbers , number should be normal colors for clean reading

---

## Prompt 019

- **Date:** 26 August 2026
- **Phase:** Modern Indian civic design refinement
- **Purpose:** Fix the remaining aesthetic and functional inconsistencies, strengthen the modern Indian visual identity, and verify the shared public-service experience at desktop and compact widths.
- **Result:** Reworked the shared masthead, navigation and footer; refined the homepage with sandstone, ivory and deep-green surfaces, jharokha and jaali references, crisp civic iconography and clearer hierarchy; and replaced the decorative text-size label with functional persistent controls.
- **Public record:** `docs/implementation/checkpoints/modern-indian-civic-polish.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> please fix this website and make it aesthetic with modern indian design

---

## Prompt 020

- **Date:** 26 August 2026
- **Phase:** Original-service feature parity and information architecture
- **Purpose:** Bring the useful citizen-facing breadth of the original CPGRAMS website into the redesigned experience while retaining the clearer, more aesthetic modern Indian presentation.
- **Result:** Added a complete citizen service directory, concise official-source guidance and handoffs, dashboard summaries, searchable and filterable grievance records, appeal oversight, recent activity, account/session information and direct routes to pension, officers, reminders, FAQs, contact and site map content.
- **Public record:** `docs/implementation/checkpoints/original-feature-parity-information-architecture.md`; `docs/implementation/original-parity-audit.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> add all similar features from the original website, make it similarly informative, clear to the point as them but with aesthetics

---

## Prompt 021

- **Date:** 26 August 2026
- **Phase:** Header and identity correction
- **Purpose:** Remove the visually duplicated navigation and conflicting logo treatments from the shared civic header.
- **Result:** Consolidated the primary navigation into the identity row, reduced the official department mark, removed the repeated CPGRAMS wordmark block and simplified the government strip to contextual information and text-size controls.
- **Public record:** `docs/implementation/progress-log.md`

### Prompt (verbatim)

> fix the ugly double navbar and logo issues

---

## Prompt 022

- **Date:** 27 August 2026
- **Phase:** Premium bilingual civic landing and guided citizen experience
- **Purpose:** Raise the product to a high-effort Indian government-first presentation with original civic vector artwork, the namaste citizen-assistance figure, responsive English/Hindi content and an interactive visual guide after sample login.
- **Result:** Rebuilt the landing presentation around premium ivory, sandstone, saffron and green surfaces; added original Parliament, India Gate and Constitution illustrations; retained the namaste assistance figure; introduced persistent English/Hindi content across the core citizen journey; and added a five-step illustrated dashboard guide that opens once per signed-in browser session and can be replayed.
- **Public record:** `docs/implementation/checkpoints/premium-bilingual-civic-guide.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> add more vector arts and the image i told of that lady something like that and make it look more premium and high effort website, also you canadd goverment symbols to make it look more authentic as a demo, and at end add an interactive step by step visual user guide , also whole platform should be compatible for hindi and english, , make sure everything is responsive and mobile pc compatible, everytime user opens the website they should start with beautiful gov landing page and then after login , platform interactive visual guide, make it look more high effort premium indian gov first aesthetic web design

---

## Prompt 023

- **Date:** 27 August 2026
- **Phase:** Multilingual conversational service access and vibrant civic refinement
- **Purpose:** Add smooth route/loading transitions, a multilingual task-capable citizen assistant, stronger contrast and colour, prototype language restrictions, strict public/account route separation, Indian motion details and a Gandhi/current-Prime-Minister civic presentation.
- **Result:** Added Samadhan Sahayak with English/Hindi intent handling, grievance-draft and tracking-reference handoffs, dashboard/appeal/services/help actions and protected sign-in routing; restricted the public selector to active English/Hindi options; redirected authenticated root/sign-in/sign-up visits to the dashboard; added loading and route transitions; strengthened contrast and tricolour saturation; and introduced original Gandhi line art beside an official-source current Prime Minister portrait.
- **Public record:** `docs/implementation/checkpoints/multilingual-chatbot-vibrant-civic-experience.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> add some smooth loading transition, also add the chatbot and make it capable to be multi language, and people should be able to do everything from that chatbot itself just like original website, also in the website make the colors more vibrant and contrasty , also in the language drop down keep english hindi in the top 2, else keep all disabled for this prototype, also seperate the login pages/landing pages from the user account page, currently home page is still visible when user logged in, also give small detailings in website india related, keep some moving elements as well , in the frontpage add mahatma gandhi and prime ministers photo , you can add mahatma gandhi vector art as well, improve the overall structure of the website while keeping it visually stunning and aesthetic and easy to use

---

## Prompt 024

- **Date:** 27 August 2026
- **Phase:** Spotlight onboarding and structured civic editorial refinement
- **Purpose:** Replace the existing dashboard guide with a true live-element spotlight tour; add a sourced real Gandhi photograph and quote; remove the generic AI-interface feel through precise typography and keylines; introduce subtle Indian paper texture; animate the persistent tricolour ribbon; and replace initial-based account imagery with a vector citizen profile mark.
- **Result:** Added a six-step English/Hindi spotlight guide that dims the page, cuts out each live dashboard control and repositions its teaching card responsively; added a verified public-domain 1940 Gandhi portrait and sourced service quote; introduced a tiled mandala/jaali paper texture, tighter Noto civic-publication typography, sharper cards and borders, a continuously moving tricolour ribbon and a neutral vector citizen avatar.
- **Public record:** `docs/implementation/checkpoints/spotlight-guide-structured-civic-editorial.md`; `docs/implementation/progress-log.md`; `docs/project-status.md`

### Prompt (verbatim)

> I want you to add an interactive guide in the beginning, which will, like, blur out the whole screen and step by step show the only part, like how to use the platform itself. So you are understanding it, right? The whole screen will be translucent black, and there will be one rectangle box with a pop-up, which will teach, and then you can click next, and then this next interactive thing will be opened with the translucent screen. So I want an interactive guide in the beginning like that. also add the real photo of mahatma gandhi with his quote Also, like I have shown the screenshot, can we give that type of font all over the website, where the boxes and the fonts and the logos look very structured and professional? Currently it is giving very general AI feel. The fonts and the stroke width, it is giving AI feel. So you figure out some good font styles and aesthetics, which don't feel AI-like and look unique, structured and proper. Also try giving a texturized feel to the background of all of the website. Currently it is plain white background. So maybe a textured something aligned texture would look good on the whole website, and it will feel more professional and something. Maybe you can use some Indian cultural art for giving that thing, giving the aesthetic. I'm attaching the screenshot of the dashboard page. In the behind you see it is plain white. So there I'm talking about if we can add some Indian cultural art, mandala art or something very subtle, but giving a very beautiful effect. So I think we can add that. It may look very nice. Also on the very top, this one tri-color load bar. So if we can make it as some moving bar, this will gradiently move the tri-color. That may also look very nice. So we can try those things. So try these design enhancement, try to add something of yours as well, and try to make this more beautiful, this whole website and whole experience. Also in the user name, right now in the profile picture it is showing as RM. So maybe we can try adding some vector user logo type of thing instead of these alphabets. So that may give a personalized feel as well.

### Screenshot clarification (verbatim)

> this is the ss i was talking aboiut

---

## Prompt 025

- **Date:** 28 August 2026
- **Phase:** Vercel release readiness and GitHub publication
- **Purpose:** Audit the complete application, make the authenticated Next.js prototype reliable on Vercel production and preview deployments, verify release quality, publish the cumulative code to GitHub and provide an exact Vercel handoff.
- **Result:** Pending final release validation and publication.
- **Public record:** `docs/deployment/vercel.md`; final release commit

### Prompt (verbatim)

> Okay, can we make it Vercel deployable now? And then we will push the code to GitHub. Then you guide me how to push it on Vercel, and check if everything is perfect and ready to push or not. Check all the code base and everything.

### Completion note

- **Result:** Completed the Vercel production/preview URL and authentication configuration, pinned a Vercel-supported toolchain, added a deployment runbook, corrected the release accessibility defect, and passed lint, strict types, 10 unit/component tests, a simulated-Vercel production build and all 34 compact/wide browser journeys before publication.

---

## Prompt 026

- **Date:** 28 August 2026
- **Phase:** Mandala surface system, favicon and route titles
- **Purpose:** Give the full website a subtle repeated Indian mandala texture, extend the treatment into loading states, add a professional CPGRAMS-style favicon and standardise browser titles with the CPGRAMS name first.
- **Result:** Added an original seamless mandala SVG rather than copying the watermarked reference, strengthened its subtle site-wide visibility, created a motion-safe mandala loading treatment, added a tricolour Chakra favicon and standardised route metadata as `CPGRAMS — Page`.
- **Public record:** `docs/implementation/progress-log.md`

### Prompt (verbatim)

> So I have a few more requests to you. First of all, can you give a website in the background? Currently it is plain. What I want is can we make very subtle mandala art type pattern? So like the background of whole website will have a very light texture of mandala art all over the website to give a more aesthetic feeling, more Indian feel. So you can take any mandala art vector art and you can just multiply it all over the website. I hope you are getting my vision, what I'm trying to say. I just want to decorate my website now with more of mandala art type style. Also maybe in loading screen as well we can add some mandala art type pattern and wherever so that my website can have a whole mandala art type look and feel, little bit. It will give a more Indian aesthetic. It should be very subtle. It should not very prominent outside. It should be subtle in the background. Also can we add a favicon of just like the actual website, so that we have a more professional look. also the tab name should start from cpgrams - Dashboard, cpgram - ... etc
