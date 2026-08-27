# Spotlight guide and structured civic editorial checkpoint

Date: 27 August 2026
Prompt: Prompt 024
Status: Ready for user review

## What changed

- Replaced the previous in-page illustrated tutorial with a six-step spotlight tour attached to live dashboard elements.
- The tour dims the full viewport, leaves one target visible inside a saffron keyline, scrolls that target into view when required and positions a bilingual teaching card around the available viewport space.
- Covered the signed-in workspace, grievance counters, searchable register, lodge action, language selector and Samadhan Sahayak.
- Kept Back, Next, Skip, Escape-to-close, progress, automatic first-session launch and dashboard replay controls.
- Added a persistent animated tricolour ribbon, with reduced-motion fallback.
- Replaced the initials avatar with an original gender-neutral citizen-profile vector mark.
- Added a subtle tiled paper, jaali and mandala surface across the product while keeping content cards highly legible.
- Tightened the Noto English/Devanagari system with controlled width, restrained heading tracking, precise one-pixel keylines, smaller radii and quieter shadows.

## Gandhi photograph and quotation

- Photograph: `public/culture/mahatma-gandhi-1940.jpg`.
- Source: Wikimedia Commons, *Gandhi portrait, 1940*.
- Rights note: the source page marks the photograph public domain in India and under PD-1996 for the United States.
- Quote: “Service is not possible unless it is rooted in love or ahimsa.”
- Quote source: M. K. Gandhi epigram collection, service section, reference `TIG-138`.
- Both photograph and quotation sources are linked directly from the public landing page.

## Responsive and accessibility behavior

- The spotlight and popover recalculate on step changes, scrolling and resizing.
- The popover remains within the viewport at compact and wide widths.
- English and Hindi copy share the same guide targets and interaction model.
- The dark overlay blocks accidental background interaction while the live target remains visually visible.
- Dialog semantics, accessible labels, progress values, keyboard focus and Escape-to-close are provided.
- All motion stops when the user requests reduced motion.

## Verification

- Live visual review at the browser default compact width, 390 × 844 and 1440 × 900.
- All six spotlight targets advanced successfully on desktop.
- English and Hindi first-step content verified.
- Compact document and guide bounds verified without horizontal overflow.
- Strict TypeScript and ESLint pass.
- Targeted compact/wide citizen browser journeys pass, including a dedicated live spotlight-guide regression.

## Boundary

This remains an unofficial hackathon demonstration. It uses a fictional citizen account and synthetic grievance data, does not submit to CPGRAMS and does not imply government endorsement.
