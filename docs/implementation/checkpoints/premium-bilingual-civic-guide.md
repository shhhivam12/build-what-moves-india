# Premium bilingual civic landing and guide checkpoint

Date: 27 August 2026
Prompt: 022
Status: Ready for user review

## Delivered

- A premium public landing page at `/` that remains the starting point on every direct visit, including for signed-in citizens.
- Original code-native Parliament, India Gate and Constitution vector illustrations, plus the existing namaste citizen-assistance figure in a restrained jharokha setting.
- One compact official identity row with responsive navigation and intermediate-width protection for longer Hindi and authenticated labels.
- Persistent English/Hindi switching across the shared shell and core citizen journey: landing, authentication, dashboard, grievance intake and tracking.
- A five-step illustrated dashboard guide covering dashboard orientation, grievance filing, tracking, appeal and service/help routes. It opens once after sample login, can be skipped or completed and can be replayed.
- Explicit unofficial demonstration language; no live grievance or government action is implied.

## Review path

1. Open `/` and inspect the landing page at desktop width.
2. Switch the language to हिन्दी and confirm the masthead, hero and public-service content update without losing the original official department mark.
3. Repeat at a compact phone width and open the single navigation menu.
4. Use **Continue with sample account** on `/signin`.
5. Advance through all five illustrated guide steps, then use **Replay guide** on the dashboard.

## Verification evidence

- Live browser review at 1440 × 1000 and 390 × 844, including English, Hindi and authenticated guide states.
- Strict TypeScript and ESLint pass.
- Seven unit/component tests pass.
- Thirty compact/wide Playwright journeys pass, including English/Hindi switching, dashboard onboarding and automated accessibility checks with no serious or critical findings on evaluated routes.
- Next.js production build completes successfully.

## Boundaries

- Government marks and service references establish authentic context for this unofficial hackathon demonstration; they do not imply endorsement.
- English and Hindi are the reviewed first-class content catalogues. The wider language selector remains visible as the planned catalogue, with English fallback until each additional language is reviewed.
- Case data, route outcomes and government-side actions remain fictional or simulated.
