# Tricolour government portal redesign checkpoint

Date: 26 August 2026

Prompt: Prompt 016

Status: Ready for user review

## Outcome

The public and signed-in experience now presents CPGRAMS as an operational public-service portal rather than a hackathon concept page. This direction supersedes the earlier India Next Civic presentation and removes its dark-blue palette, promotional claims, design-system self-description and evaluator-oriented narration.

## Current visual direction

- A light saffron, ivory and green visual system with restrained glass surfaces, soft depth and accessible solid-control fallbacks.
- A compact official-source DARPG/CPGRAMS masthead instead of an oversized identity block.
- A Government of India utility strip, bilingual system name, formal service navigation and a 23-language selector.
- Government-style public-information banners for grievance redressal, Digital India and the no-fee notice.
- Smooth hover, focus and disclosure transitions that respect reduced-motion preferences.
- Responsive layouts tested at compact and wide viewports; no dark-blue interface surfaces remain in shipped application code.

## Content direction

The interface uses service language a department could plausibly publish: lodge grievance, view status, concerned organisation, Action Taken Report and appeal. Marketing phrases, prototype walkthrough copy and claims about the design itself have been removed. The only prototype disclosure is a restrained footer statement that no real grievance is submitted.

## Resilient evaluator path

The real Better Auth and Neon path remains primary. The visible **Continue with sample account** action gives the database 1.5 seconds to respond. If it is unavailable, an isolated HTTP-only demonstration session opens automatically within roughly two seconds. This fallback does not import or query the database.

The fallback supports the complete citizen journey rather than only bypassing sign-in:

1. open the Raghav Mehta dashboard;
2. lodge and route a fictional grievance;
3. receive a unique `CPG-DEMO-*` registration number;
4. find and open the grievance from the dashboard or status service;
5. inspect the Action Taken Report and timeline;
6. submit an appeal and see its recorded status;
7. sign out without waiting for the database.

Synthetic content is stored only in bounded HTTP-only demonstration cookies. Real CPGRAMS, identity, notification and government systems remain disconnected.

## Verification

- Strict TypeScript: passed.
- ESLint: passed.
- Unit/component tests: 7 passed.
- Chromium end-to-end and accessibility journeys: 22 passed across compact and wide layouts.
- Automated serious/critical accessibility checks: passed on the tested public, component and case-detail paths.
- Homepage liveness: HTTP 200 at `http://localhost:3000`.

## Manual review path

1. Open `/` and inspect identity scale, banners, tricolour balance and mobile navigation.
2. Open `/signin` and select **Continue with sample account**.
3. Review the dashboard and open the sample grievance.
4. Inspect the Action Taken Report and submit the prefilled appeal.
5. Lodge another grievance using **Use realistic sample** and verify its new registration number.
6. Open **View status**, use the sample registration number and confirm that no contact detail is requested again.

Public deployment remains deliberately pending until this visual checkpoint is accepted.
