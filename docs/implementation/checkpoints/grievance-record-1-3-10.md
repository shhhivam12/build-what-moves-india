# Grievance record 1–3–10 UX checkpoint

Date: 26 August 2026

Prompt: Prompt 017

Status: Ready for user review

## Problem corrected

The shared masthead and dashboard opening used too much vertical space, while the grievance-detail page gave the title, routing, outcomes, evidence, history and appeal nearly equal prominence. The result was visually busy but cognitively unclear.

## 1–3–10 second information model

### One second

The first record surface answers: which case is this and what is its status?

- status;
- registration number;
- concise grievance title;
- submission date;
- completed-versus-requested action count.

### Three seconds

The next visible layer answers: where is it now and what changed?

- current status and outstanding-action count;
- concerned organisation;
- latest update and timestamp;
- four-stage visual progress path: registered, forwarded, action taken and appeal.

### Ten seconds

The detailed layer lets the citizen verify the response and decide what to do.

- each requested relief is paired with department action and supporting information;
- completed and pending outcomes are visually distinct without relying on colour alone;
- pending work is called out as `What remains`;
- the history, original submission and requested relief are progressively disclosed;
- the appeal action is presented only when an outcome remains pending;
- page-level jump links provide direct access to progress, action report, history and appeal.

## Shared-shell corrections

- Reduced the official masthead from 24rem in the earlier design to 14.75rem at desktop widths.
- Reduced identity-row and navigation height.
- Reduced dashboard top padding, greeting size and summary-card height.
- Preserved the official source image and bilingual service identity.

## Responsive and accessibility evidence

- Visually inspected the dashboard and grievance record in the live local browser.
- Verified the grievance record at 390 × 844 with no horizontal overflow.
- Verified the primary filing and Action Taken Report/appeal journeys at 320 × 568 and 1440 × 900.
- Corrected all new serious colour-contrast findings reported by automated accessibility checks.
- The compact record uses a vertical progress path; desktop uses a horizontal path.

## Review route

Use `/grievances/CPG-DEMO-2026-001` after choosing **Continue with sample account**. Review the page in this order: hero summary, at-a-glance cards, progress visual, Action Taken Report, history and appeal.
