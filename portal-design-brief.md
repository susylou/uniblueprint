# Tertiary Blueprint — Portal Design Brief

**Date:** 20 May 2026
**Author:** Susy + Claude
**Purpose:** Capture the portal design intent before we build wireframes or touch the PDI. This is the design judgement layer between the spine spec (`tertiary-blueprint-context.md`) and the build (Fluent SDK on dev377076).

---

## Why the portal matters here

The portal is the surface customers see in the workshop. It's the demo. Three things have to be true for it to do its job:

1. **It must feel like a student portal, not a service desk.** Tertiary students are not enterprise employees — the tone, language and visual rhythm should reflect that. Warm, plain-English, mobile-first.
2. **It must visibly plug modules in.** The whole point of the blueprint is modular reuse. The portal needs to *show* the spine staying constant while M1 (Wellbeing), M2 (Student Services Ops), and M3 (ITSM) plug in and out. Without that visual proof, the workshop argument doesn't land.
3. **It must re-skin cleanly for USP, Canterbury, and the polytech.** Same IA, same components, different branding and language. The theming model is part of the design, not an afterthought.

---

## Design principles

Carrying forward from `tertiary-blueprint-context.md` and extending for portal specifics:

- **AI-forward, not AI-only.** "Talk to Care" / "Talk to a Student Services Assistant" is the first-class CTA on the landing, but search, browse and direct human contact remain visible. The AI is the easiest path, not the only path.
- **Persona-first hero.** When a student is logged in, the hero shows *their* situation — open cases, upcoming appointments, deadlines — not a generic "welcome".
- **Single column for content, generous whitespace.** This isn't a corporate intranet. Two-column dashboards feel cold.
- **Plain language over jargon.** No "case", no "ticket". "Things you've asked about", "Conversations in progress", "Help with…".
- **Cultural and language awareness baked in, not bolted on.** Language toggle is a portal-level component, not a per-module hack. Cultural labels go through a review process before going customer-facing.
- **Mobile is the primary form factor.** Design phone-up, then scale to desktop.
- **Accessibility from day one.** WCAG 2.1 AA contrast, keyboard navigable, screen-reader semantics. NZ public sector requires it; USP and polytech will too.

---

## Information architecture

### Persistent shell (always present)

| Region | Contents |
|--------|----------|
| **Top bar** | Institution logo · institution name · language toggle (En / Te Reo / Pacific lang per institution) · profile menu |
| **Primary nav** | Home · Get Help · My Stuff · Knowledge · *(module-contributed sections appear here when active)* |
| **Page region** | Page content (varies by route) |
| **AI agent dock** | Persistent floating "Talk to …" button, expands to chat panel. Module-aware: defaults to spine agent, switches when student is in a module context. |
| **Footer** | Contact · accessibility statement · privacy · institution branding · te reo / cultural acknowledgement |

### Page hierarchy

```
/ (Home / landing)
├── /get-help              — top-level "I need help" router (lists active modules' help paths)
├── /my-stuff              — student's open conversations, appointments, deadlines
│   └── /my-stuff/:id      — single conversation/case detail
├── /knowledge             — browse + search across all KB
│   ├── /knowledge/:topic
│   └── /knowledge/article/:id
├── /<module>/...          — module-contributed routes (e.g. /wellbeing, /student-services)
└── /profile               — language, notification prefs, accessibility prefs
```

### Module contribution contract

When a module is activated on an instance, it declares:

- **Quick-action cards** to surface on the landing (e.g. M1 contributes "Get wellbeing support", M2 contributes "Request a transcript", "Pay fees", "Check enrolment status").
- **Primary nav items** (optional — most modules just feed Get Help and My Stuff).
- **Knowledge categories** to surface in /knowledge.
- **AI agent persona** to use when the student enters that module's context.
- **Case types** to show in My Stuff.
- **Routes** to register under `/<module>/`.

This contract is the structural reusability — modules don't reach into the portal, the portal reads from modules.

---

## Theming model

The reusable bit. Each institution's instance gets a thin theming layer; the portal shell, IA and components are identical.

### Brand variables (CSS custom properties or scoped app config)

```
--inst-name          : "University of the South Pacific"
--inst-short-name    : "USP"
--inst-logo-url      : "/inst/usp/logo.svg"
--inst-favicon       : "/inst/usp/favicon.png"
--inst-primary       : "#003E7E"          /* primary brand colour */
--inst-primary-text  : "#FFFFFF"          /* contrast on primary */
--inst-accent        : "#F5A623"          /* secondary highlight */
--inst-hero-image    : "/inst/usp/hero.jpg"
--inst-hero-overlay  : "rgba(0, 30, 60, 0.55)"   /* darken hero image for legibility */
--inst-font-display  : "Inter, sans-serif"       /* most institutions stick with system fonts */
```

### Content slots

```
inst.tagline                : "Where the Pacific learns together"
inst.welcome.unauth         : "Kia ora — sign in to get started"
inst.welcome.auth           : "Bula, {first_name}"           /* per-institution greeting in local language */
inst.footer.acknowledgement : "[institution-specific cultural acknowledgement]"
inst.support.contact_email  : "studentservices@usp.ac.fj"
inst.support.contact_phone  : "+679 …"
```

### Language packs

- One JSON-style language pack per supported language per institution.
- Spine ships English; institutions add language packs as needed.
- USP: English + Fijian + (optionally Tongan, Samoan as the South Pacific reach grows).
- NZ institutions: English + Te Reo Māori. **Te Reo strings must go through cultural review before any customer-facing demo** — placeholder strings stay as `[Te Reo TBC: <english fallback>]` until reviewed.
- Language toggle persists in user profile + falls back to browser locale.

### Module branding hooks

A module can optionally override its own brand within a portal (e.g. Wellbeing module may have a softer palette than the institution's general brand to feel less clinical). Two-level theming: institution shell + module skin.

---

## Key portal states to wireframe

These are the deliverables — one HTML slide per state, same family as `personas-and-flows.html`.

| # | State | Why it matters |
|---|-------|----------------|
| 1 | **Landing — unauthenticated** | First impression. Search-first, "Talk to Care" CTA prominent, language toggle visible, no module sprawl. |
| 2 | **Landing — logged in, M1 active, no open cases** | Shows the personalised greeting + quick-action cards from active modules. Calm state. |
| 3 | **Landing — logged in, M1 active, Aria has an open wellbeing case** | The "what's happening for you" panel takes precedence over quick-actions. Demonstrates the persona-first hero. |
| 4 | **AI agent in chat — Care responding to Aria** | Shows the chat panel expanded over the landing, mid-conversation, with KB suggestions surfacing inline. |
| 5 | **My Stuff — list view** | Aria's open and recently closed conversations. Plain-language labels, no "case number" front-and-centre. |
| 6 | **My Stuff — single conversation detail** | Full thread + status + next step. Shows how the case ID is *available* but de-emphasised. |
| 7 | **Knowledge browse — module-faceted** | Topics surface from active modules. Shows how the same shell looks different on M1-only vs M1+M2 instances. |
| 8 | **Theming proof — same portal, three institutions** | One slide, three small portal screenshots side by side: USP, Canterbury, polytech. Identical IA, different brand. The "it's reusable" money shot for the workshop. |
| 9 | **Mobile — landing + chat** | Same content stack, phone width. Confirms mobile-first claim. |

Optional / stretch:

| # | State | Why |
|---|-------|-----|
| 10 | **Module activation pattern** | A diagram-style slide showing how M1, M2, M3 declare into the portal. More architecture than UI; useful for the architect-audience portion of a workshop. |
| 11 | **Accessibility annotations** | One of the existing slides re-rendered with WCAG annotation overlays. For procurement-anxious customers. |

---

## Open questions for Susy

These are things I'd want your view on before I lock the wireframes.

1. **Module-active vs spine-only landing** — should the spine portal render anything useful at all with no modules activated, or should it be a "configure your first module" empty state? I lean spine-only being usable (Knowledge, profile, language) so the spine itself is demoable.

2. **AI agent dock vs hero CTA** — both? Or just one? My instinct: hero CTA on the landing (front and centre, hard to miss), persistent dock on every other page (low-friction continuation). But this is a judgement call.

3. **"My Stuff" naming** — that's a placeholder. Is there a phrase that lands better in NZ tertiary context? "My place", "My space", "Things I'm doing" — none feel perfect. Worth picking one consciously.

4. **Te Reo placeholder strategy** — confirm you want the `[Te Reo TBC: ...]` convention so I don't fake any Te Reo in the wireframes. (Per your no-confabulation rule.)

5. **Theming demo institutions** — for state #8 (the three-institution money shot), should I use USP, Canterbury, and a real polytech name (e.g. Open Polytechnic / Te Pūkenga branding), or keep them fictional like "Aotearoa University" to avoid claiming endorsement?

6. **Are there portals you've seen at other unis (NZ or international) that you want to consciously *not* look like, or consciously borrow from?** Helpful framing input.

---

## What's intentionally out of scope for this brief

- Portal Designer configuration steps on the PDI — those come once wireframes are signed off.
- Specific KB article content — covered by module content design, not portal design.
- AI agent prompts / behaviour — covered by the agent design work, not portal design.
- Integration patterns to SIS/ERP/LMS — covered by spine architecture work, not portal design.
