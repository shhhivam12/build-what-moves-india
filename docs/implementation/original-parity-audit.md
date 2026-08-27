# Live CPGRAMS parity audit and completion scope

Audit date: 25 August 2026
Source: public, read-only inspection of [pgportal.gov.in](https://pgportal.gov.in/), [sign-in](https://pgportal.gov.in/Signin), and [public status](https://pgportal.gov.in/Status)
Product: unofficial synthetic CPGRAMS Assured Journey prototype

## What the current service already provides

The public portal already provides 24×7 grievance lodging, unique-reference status tracking, appeal and feedback, a mobile application/UMANG route, a voice chatbot described as supporting 22 Eighth Schedule languages, OTP/password entry, an unauthenticated status form, officer/process information, help/contact/site-map pages, scope exclusions, a no-government-fee warning, and dated public notices.

The prototype should not claim these capabilities are absent. Its differentiator is making the citizen's context and requested outcomes survive across routing, progress, resolution evidence and appeal.

## Capability comparison

| Citizen need | Current public portal | Assured Journey prototype | Completion decision |
| --- | --- | --- | --- |
| Government/service identity | Strong official identity, owner and NIC attribution | Restrained civic identity with persistent unofficial/synthetic warning | Keep; never imitate an official seal or domain |
| Public information | About, help, contact, site map, process, officer information | Previously only dead footer anchors | Add concise help, privacy, scope, limitations and no-fee content |
| Entry and account recovery | Password, OTP, registration, recovery, CAPTCHA | Instant fictional judge account | Keep mock entry; clearly label it and defer production identity |
| Language access | English selector and stated chatbot support for 22 scheduled languages | 23 choices; English/Hindi reviewed shell, others preview | Complete the core Hindi journey; keep honest provenance elsewhere |
| Voice/chatbot | Samadhan Didi voice-based lodging | No voice; explainable route-assistance demonstration | Do not duplicate voice; demonstrate safe assistance-off fallback |
| Department selection | Citizen selects a ministry/department hierarchy | Suggested fictional route with explanation | Complete manual browse/override so AI is never required |
| Public status | Reference, contact detail and CAPTCHA are re-entered | Signed-in synthetic dashboard with one-click case access | Keep as the deliberate continuity improvement |
| Receipt and progress | Unique reference and status/appeal tracking | Immediate receipt plus meaningful actor/action/next-step timeline | Keep and make every action functional |
| Resolution | Closure, feedback and appeal are available | Outcome-level action/evidence/result/gap comparison | Keep as the primary differentiator |
| Appeal | Enabled after poor feedback; registration reference reused | Starts from the exact disputed outcome with inherited context | Keep as the demo climax |
| Service scope | Excluded subjects and pension/DPG handoffs are visible | Previously absent from product route | Add plain-language scope/handoff guidance |
| Public trust notices | No-fee warning and dated notices | Synthetic/unofficial notice and prototype update | Add no-fee warning; retain compact updates |
| Mobile availability | Standalone app and UMANG | Browser-first responsive site | Demonstrate 320px support; no app-download dependency |

## Hackathon-complete scope

Required before deployment:

1. Both end-to-end judge journeys work without dead controls.
2. Route suggestion, override and assistance-off manual completion work.
3. Help, privacy, limitations, scope handoffs and no-fee content exist.
4. English journey is complete; Hindi covers the complete primary judge path; all other languages retain explicit preview provenance.
5. Deterministic reset, unavailable/retry states and mobile reflow are verified.
6. The build succeeds without secrets in source control and the public route does not depend on a live government integration.

Explicitly deferred:

- real citizen registration, OTP, password recovery and CAPTCHA;
- public officer/admin experiences;
- real voice, notification, upload and mobile-app integrations;
- live CPGRAMS routing codes or departmental claims;
- pension, RTI, emergency and court workflows beyond safe handoff guidance;
- production-grade identity, retention, audit and government-cloud decisions.

This is feature discipline, not missing scope: these capabilities either already exist in the original service, require official integration, or do not strengthen the assured-lifecycle demonstration.

## Implemented parity layer — 26 August 2026

The citizen-facing information gaps identified above are now closed in the prototype:

- `/services` provides concise About, redressal-process, reminder, clarification, feedback, appeal, officer, pension, mobile-access, FAQ, contact and site-map sections.
- `/dashboard` provides summary totals, citizen-service navigation, search, status filters, sorting, pagination, appeal oversight, recent activity and account/session details.
- The homepage, primary navigation and footer now expose the service directory and the most important public-information routes.
- Current officer directories, pension access and real CPGRAMS actions remain official external handoffs; no live government action is simulated.

The explicitly deferred integration scope remains unchanged.
