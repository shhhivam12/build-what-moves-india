# Checkpoint 0A — application shell and critical-component design lab

Status: ready for user test
Date: 24 August 2026
Prompt: Prompt 010

## What is ready

The first bounded implementation slice is available at:

`http://localhost:3000/design-lab/critical-components`

It includes:

- persistent unofficial-prototype and synthetic-data identity;
- calm two-row civic shell and compact-first layout;
- English/Hindi interface switch with preserved original citizen text;
- step indicator, grievance field, hints, validation, error summary, draft status, route choices, advisory explanation, timeline item, buttons, and native session-warning dialog;
- Noto Sans and Noto Sans Devanagari served from the application;
- 44px minimum controls, visible focus, reduced-motion and forced-colour support;
- no database, account, AI, upload, or live-government integration.

An isolated package check is available at:

`http://localhost:3000/design-lab/ux4g-package-spike`

That route proves the published UX4G stylesheet imports and renders in Next.js. It is not the proposed product interface.

## Automated evidence

| Check | Result |
| --- | --- |
| Dependency compatibility | Pass; no unresolved peer dependency issues |
| Lint | Pass |
| Strict TypeScript | Pass |
| Component tests | 2 passed |
| Automated accessibility at 320 × 568 | 2 passed, including Hindi/dialog state |
| Automated accessibility at 1440 × 900 | 2 passed, including Hindi/dialog state |
| Production build | Pass; both design-lab routes prerendered |
| Local route response | HTTP 200 |

Automated accessibility tests do not establish WCAG conformance. Keyboard, screen-reader, zoom/reflow, language, content, and visual review remain manual checkpoint tasks.

## UX4G adoption result

- The `ux4g-web-components` package installs, imports, and compiles in the selected Next.js version.
- Its published all-components stylesheet produces an approximately 8,179,770-byte build asset.
- The agreed critical-route CSS budget is 45 KB compressed, and the package also bundles many components and fonts the citizen journey does not need.
- Decision for this checkpoint: retain UX4G foundations and patterns, use project-owned semantic components, and do not load the complete UX4G stylesheet on product routes.
- The isolated package-spike route will be removed or excluded before the final public submission build unless it remains necessary as test evidence.

## Manual test sequence

### 1. Identity and first impression

- Open the critical-component URL.
- Confirm it is immediately clear that this is an unofficial prototype using synthetic data.
- Check whether the page feels calm, trustworthy, functional, and recognisably Indian without resembling an official government site.
- Note anything that feels decorative, visually heavy, too empty, or too technical.

### 2. Keyboard and focus

- Reload and use only `Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys.
- Confirm the skip link appears first and moves focus to the main task.
- Reach both language buttons, grievance field, route radios, primary action, and session-warning action in a logical order.
- Use arrow keys within the route choices.
- Confirm every focused control has a clearly visible focus indicator and no focus is hidden.

### 3. Validation and recovery

- Clear the grievance statement.
- Select `Banking services`.
- Choose `Continue to route confirmation`.
- Confirm the error summary appears, links back to the field, and the selected route is preserved.
- Enter at least 20 characters and continue again.
- Confirm the ready message appears without removing the entered text.

### 4. Hindi and long text

- Choose `हिन्दी` at the top of the page.
- Confirm headings, hints, actions, route explanations, footer, and dialog change language.
- Confirm the original English citizen statement is not silently translated or replaced.
- Check that Hindi text wraps naturally and no label is clipped.
- Switch back to English and confirm entered text and selected route remain.

### 5. Session-warning pattern

- Open `Test session warning` / `सत्र चेतावनी जाँचें`.
- Confirm the dialog is visually and semantically clear, focus is contained by the browser, and both actions close it.
- Confirm the message reassures the citizen that the draft is saved without weakening the security warning.

### 6. Compact and zoom behaviour

- Test near 320px width and at 200% browser zoom.
- Confirm the critical journey remains one column, actions become full-width, the step indicator can be reached by keyboard, and no essential content requires horizontal page scrolling.
- Test a normal laptop width and confirm the form remains restrained instead of stretching across the screen.

## Feedback to record

Please report:

1. what felt clear and trustworthy;
2. what felt confusing, visually wrong, or unlike the intended Indian civic character;
3. any English/Hindi content that should change;
4. any keyboard, focus, zoom, wrapping, or dialog problem;
5. whether checkpoint 0A is approved or needs iteration.

## Known limitations at this checkpoint

- This is a component laboratory, not the complete grievance journey.
- Language and form state persist only while this page remains open; durable draft/session recovery begins in later phases.
- Hindi wording still requires the planned human/content review.
- Footer links are structural placeholders.
- Screen-reader testing has not yet been completed manually.
- Database, authentication, case ownership, AI routing, notifications, receipt, and appeal are intentionally absent.

## Stop rule

Phase 0B does not begin until checkpoint 0A feedback is recorded and the shared shell/components are approved or revised.
