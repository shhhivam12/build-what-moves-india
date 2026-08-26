# Checkpoint — Rajasthani civic cultural layer

Status: Ready for user test  
Date: 26 August 2026  
Prompt: Prompt 018

## Intent

Make the grievance portal feel recognisably Indian and emotionally reassuring without turning a public-service interface into a decorative tourism page. The cultural layer must support comprehension, dignity and trust while preserving the current official identity, responsive layout and accessibility targets.

## Implemented

- Added a standing namaste citizen-service figure in a quiet jharokha-inspired frame on the homepage.
- Added the Hindi reassurance message “असुविधा के लिए खेद है।” with the service-oriented follow-up “समाधान के लिए हम आपके साथ हैं।” as real HTML text so it remains selectable, translatable and accessible.
- Added low-contrast Rajasthani jaali and mandana-inspired geometry to the reassurance panel, service-section divider and shared footer.
- Kept motifs secondary to portal tasks and removed decorative patterns from forms, case records and dense information surfaces.
- Replaced tricolour and status-coloured step numerals with one neutral ink-and-ivory treatment across the homepage, sign-in journey, grievance intake, tracking guidance, help sections and grievance progress.
- Changed one-click sample access to use the database-independent fictional session directly. The real sign-in form remains the Better Auth and Neon path, while evaluator access no longer waits for an unavailable free database.

## Design rationale

- The jharokha silhouette gives the page a specific Indian architectural reference without competing with the official masthead.
- The namaste figure communicates reception and empathy before the citizen reads the service options.
- The apology is paired with a constructive reassurance so the message acknowledges inconvenience without sounding passive or ceremonial.
- Cultural color is confined to the illustration, borders and atmosphere. Numeric steps use neutral colors because their job is sequence recognition, not branding.
- All motifs are CSS decoration or transparent imagery and do not alter reading order, keyboard access or semantic structure.

## Generated asset

- Project path: `public/culture/namaste-citizen-guide.png`
- Generation mode: built-in image generation
- Transparency check: corner alpha is zero; the image has a genuine transparent background.
- Selected prompt:

> Use case: illustration-story  
> Asset type: transparent cutout for an Indian public grievance portal  
> Primary request: One full-body adult Indian woman standing front-facing with palms joined in a respectful namaste, calm dignified reassuring expression, modest contemporary Rajasthani-inspired sari in ivory, muted terracotta, soft marigold and forest green, refined semi-realistic editorial illustration, clean silhouette, natural proportions, crisp edges, soft diffuse daylight.  
> Scene/backdrop: genuinely transparent alpha background.  
> Text: none.  
> Constraints: culturally respectful, no politician resemblance, no logos, no flag, no emblem, no watermark, no background, no excessive jewelry, no cartoon style, no tourist-poster styling.

## Validation

- Live desktop and 390 × 844 browser review completed.
- The figure loads successfully and the 390px layout has no horizontal overflow.
- Computed styles confirm homepage process numerals have no gradient and use neutral foreground/background colors.
- Strict TypeScript, ESLint, seven unit/component tests and the production build pass.
- Ten compact/wide judge journeys pass, including homepage accessibility, fictional sign-in, filing, RTI handoff, Action Taken Report, appeal and signed-in tracking.

## Manual review

1. Open `/` on desktop and mobile.
2. Confirm the welcome panel feels Indian, dignified and subtle rather than decorative-heavy.
3. Confirm the Hindi copy and the woman remain legible without overshadowing Lodge Public Grievance and View Status.
4. Scroll through the process and inspect sign-in, grievance filing, tracking and help to confirm all numbered steps use a neutral treatment.
5. Confirm the illustration style is suitable for the final submission or request one focused visual adjustment.
