# Full civic product redesign checkpoint

Date: 26 August 2026
Status: Ready for user test

## Scope completed

The legacy judge-only presentation has been replaced by a production-style citizen service. The same responsive civic shell now covers the public landing page, first-visit orientation, registration, sign-in, dashboard, grievance filing, tracking, case detail, Resolution Receipt, appeal and help.

The interface uses an unaltered DARPG/CPGRAMS masthead downloaded from the official CPGRAMS portal, compact official ecosystem marks and a persistent statement that this is a hackathon redesign concept using demonstration data. No Samadhan Didi/Asha illustration or hard-coded citizen protagonist ships in the product.

## Working routes

- `/` — public service landing page and optional three-step orientation;
- `/signup` and `/signin` — real Better Auth identity with fictional-data quick access;
- `/dashboard` — signed-in citizen cases and service summary;
- `/grievances/new` — describe, confirm route/outcomes, review and persist;
- `/track` — account-owned tracking without re-entering contact details;
- `/grievances/[reference]` — acknowledgement, timeline and Resolution Receipt;
- `/help` — scope, correct-channel, accessibility, privacy and limitation guidance.

## Product and design decisions

- Deep navy supplies continuity and trust; saffron is reserved for primary action/emphasis; green communicates verified progress. Semantic states do not rely on colour alone.
- The official masthead is informative rather than a dominating poster. The service identity, task navigation and prototype boundary remain visible at every route.
- English and Hindi are reviewed first-class options. All 23 interface choices remain available with honest preview/fallback provenance.
- The responsive shell collapses to a clear mobile menu and the primary journey is tested at 320 × 568 as well as desktop.
- Route assistance is a deterministic, explainable classifier requiring no paid API. It proposes a department and requested outcomes, shows its reason/confidence, and always permits citizen override.
- New citizen submissions are acknowledged and persisted but never receive fabricated officer decisions. The fictional sample case alone demonstrates a partial Resolution Receipt and focused appeal.
- The signed-in session owns the visible sample data, so the same Raghav identity appears throughout the evaluator journey.

## Manual test path

1. Open `/` in a fresh browser profile and complete or skip the orientation.
2. Select `Sign in`, then use `Continue as demo citizen` for Raghav Mehta.
3. Open the sample case from the dashboard and inspect its timeline and outcome-by-outcome Resolution Receipt.
4. Create a focused appeal for only the unresolved ₹499 outcome.
5. Return to the dashboard and select `Lodge a grievance`.
6. Fill the fictional example, inspect the route explanation, override it once, restore the suggestion and submit.
7. Open the new reference from the dashboard or `/track`; verify it shows acknowledgement without a fake resolution.
8. Repeat the main path at a compact mobile width and with keyboard-only navigation.

## Automated evidence

- lint passes;
- strict TypeScript passes;
- seven unit/component tests pass;
- twenty Playwright journeys pass across 320 × 568 and 1440 × 900;
- serious/critical automated accessibility checks pass on the evaluated routes;
- the standalone production build succeeds;
- reviewed database migrations are applied to Neon.

## Known boundaries

- This is not the live CPGRAMS service and has no government-system integration.
- All cases and identities are fictional demonstration data.
- Route assistance covers a focused demo catalogue and is advisory, not an official jurisdiction decision.
- Voice entry, OTP, real notifications, evidence upload scanning and officer workflows are intentionally not claimed.
- Public hosting and the final submission package follow user approval of this checkpoint.
