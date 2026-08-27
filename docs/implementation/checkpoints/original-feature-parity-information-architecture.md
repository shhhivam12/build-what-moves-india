# Original-service feature parity and information architecture

Date: 26 August 2026
Prompt: Prompt 020
Status: Ready for user review

## Outcome

The redesigned prototype now carries the useful citizen-facing breadth visible in the original CPGRAMS service without copying its dated visual presentation or implying a live government connection. The new service directory gives direct, concise routes to lodging, status, appeal, reminders, feedback, pension, officer directories, mobile-access information, FAQs, contact guidance and a site map. The signed-in dashboard now provides the same practical overview expected from a grievance portal while retaining the project’s modern Indian civic aesthetic.

## Dashboard additions

- Summary counts for total, in-progress, decided and appealed grievances.
- A citizen-services rail covering grievance, appeal, pension, activity and account routes.
- Search by registration number, subject, organisation or status.
- Status filtering, sorting, adjustable row count and pagination.
- A structured grievance table with received date, organisation, current state and record action.
- Separate appeal overview, recent activity and account/session information.
- Safe reminder and technical-support guidance that does not simulate government action.

## Public information additions

- About CPGRAMS and no-fee guidance.
- Five-stage redressal process.
- Reminder, clarification, feedback and appeal guidance.
- Live official handoffs to central, state and appeal-authority directories.
- Dedicated official pension-service handoff.
- Mobile and UMANG information without claiming a prototype app.
- Frequently asked questions, technical contact guidance and a complete site map.

## Integrity boundary

All case data remains fictional. The prototype does not send reminders, grievances or appeals to CPGRAMS, does not reproduce potentially stale officer data and does not claim working OTP, CAPTCHA, voice, mobile-app or government-system integrations. Real actions use clearly labelled official external links.

## Verification

- Browser review at 1440-pixel desktop and 320-pixel compact widths.
- No document-level compact horizontal overflow after containing the wide grievance table within its own scroll region.
- Dashboard search and decision filtering verified interactively.
- Strict TypeScript, ESLint and seven unit/component tests pass.
- All 26 compact and wide browser journeys pass, including the service directory and dashboard controls, with no serious or critical automated accessibility findings on the evaluated routes.
- The standalone production build passes.

## Review routes

- `/dashboard`
- `/services`
