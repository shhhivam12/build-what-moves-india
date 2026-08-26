# Accelerated judge slice checkpoint

> Superseded on 26 August 2026 by [the full civic redesign checkpoint](full-civic-redesign.md). The legacy `/demo` presentation and named Asha fixture no longer ship in the citizen interface; `/demo` now safely redirects to the signed-in dashboard.

Status: ready for user test
Date: 25 August 2026
Prompt: Prompt 012

## Why phases were compressed

The deadline is one day away and the event permits a complete proof of concept with mock accounts, data, and backend behaviour. The implementation therefore protects the differentiating citizen journey first. Neon Free remains connected as the deployment-ready relational foundation, while the visible journey uses deterministic synthetic state so judges cannot encounter seed drift, email delivery, or cold-auth failures.

## What is included

- instant fictional Asha Verma judge access;
- a responsive citizen dashboard and existing partly resolved case;
- describe-first grievance input with separately identified requested outcomes;
- sample evidence with explicit fictional/safety labels;
- explainable suggested route, citizen confirmation, and manual-route escape;
- review page and immediate acknowledgement with reference and next checkpoint;
- meaningful case timeline;
- Resolution Receipt comparing action, evidence, result, and gap per outcome;
- focused appeal inheriting the exact unresolved ₹499 context;
- 23 language choices with English/Hindi reviewed-shell behaviour and preview provenance elsewhere;
- persistent unofficial/synthetic identity boundary.

## Five-minute manual test

1. Open `/demo` at desktop width and select `Try as Asha Verma`.
2. Open the existing grievance and confirm that activation is resolved while the ₹499 reversal remains visibly incomplete.
3. Start the focused appeal and confirm that the original grievance, route, evidence, and receipt are already carried forward.
4. Exit the demo, enter again, and select `Lodge a grievance`.
5. Continue through description, route confirmation, review, and submission.
6. Confirm that the acknowledgement explains what was received, where it went, current state, and the next expected update.
7. Repeat the entry page at 320px width and switch to Hindi plus one preview/RTL language.

## Approval question

Does the journey now feel hackathon-presentable and distinctive enough to deploy? Report only blocking issues under these labels: `visual`, `mobile`, `language`, `journey`, or `content`. Non-blocking polish will be timeboxed after the public URL works.
