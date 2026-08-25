# Identity experience checkpoint

Date: 25 August 2026
Status: complete and ready for visual review

## Product behavior

- `/signin` is a normal citizen sign-in page rather than a judge-story launcher.
- `/signup` creates a persistent fictional email/password identity in Neon.
- **Fill fictional details** provides editable, unique registration data using the reserved `.example` domain.
- **Enter as demo citizen** creates or reuses one fictional account and establishes a real session in one action.
- `/dashboard` verifies the session server-side and redirects anonymous visitors to sign in.
- Sign-out invalidates the current session and returns to citizen sign in.

## Experience direction

This slice introduces the India Next Civic direction: deep navy, restrained tricolour light, contemporary type hierarchy, high-contrast controls, product-specific explanations and a compact concept disclosure. It is the representative visual system for approval before the public landing page and citizen workflow are rebuilt.

## Security and honesty

- Passwords are handled by Better Auth and are never stored in browser state after navigation.
- Sessions use server-issued cookies and an eight-hour limit.
- Trusted origins are explicit; loopback origins are accepted only during local development.
- Demo emails use the reserved `.example` domain.
- The pages state that they are not connected to live government systems.

## Validation

- Real sign-up and one-click demo access pass at 320 × 568 and 1440 × 900.
- Both pages have no serious or critical findings in the automated axe check.
- The dashboard is inaccessible without a valid server-side session.
