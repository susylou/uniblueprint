# Spine Build Plan — Fluent SDK on dev377076

**Date:** 20 May 2026
**Status:** Plan only — waiting on CSM + AI Agent Studio installs to land on PDI before first real declarations.

This doc maps the spine concepts to **specific Fluent SDK primitives** discovered via `now-sdk explain`. When CSM is in, we follow this plan top-to-bottom and skip the speculation.

---

## What the Fluent SDK can author for us

After exploring the SDK's `explain` topics, **every spine component is authorable in Fluent code**, not just the structural metadata. That's stronger than we'd assumed.

### Portal stack — fully Fluent-authorable

| Spine concept | Fluent API | ServiceNow table |
|---|---|---|
| The student portal itself | `ServicePortal()` | `sp_portal` |
| Aotearoa Coastal theme + SCSS variables | `SPTheme()` | `sp_theme` |
| Portal pages (Home, Get Help hub, My Stuff, Knowledge) | `SPPage()` | `sp_page` |
| Custom widgets (Hero, Today panel, Quick Actions, Otto chat) | `SPWidget()` | `sp_widget` |
| Portal navigation menu | `SPMenu()` | `sp_instance_menu` |
| Header / footer | `Record()` *(per SDK guide)* | `sp_header_footer` |
| Widget dependencies (external libs if needed) | `SPWidgetDependency()` | `sp_dependency` |
| Page route map (vanity URLs) | `SPPageRouteMap()` | `sp_page_route_map` |

### AI Agent stack — Fluent-authorable

| Spine concept | Fluent API |
|---|---|
| Otto the AI agent (single agent, multi-mode) | `AiAgent()` |
| Empathic intake agentic workflow | `AiAgenticWorkflow()` |
| Now Assist skills (KB search, summarisation, etc.) | `NowAssistSkillConfig()` |

### Case management — Fluent-authorable

| Spine concept | Fluent API |
|---|---|
| Wellbeing case type (likely extending CSM `customer_case`) | `Table()` extending `customer_case` |
| Case fields (intake context, escalation reason, care plan link) | column-type APIs (`StringColumn`, `ReferenceColumn`, `ChoiceColumn`, `HtmlColumn`, etc.) |
| Business rules (auto-route to wellbeing queue, escalate on risk signal) | `BusinessRule()` |
| ACLs (who can read/write a wellbeing case) | `Acl()` |
| Form layout for advisor (Agent Workspace) | `Form()`, `List()`, `View()` |

### Glue and infrastructure

| Need | Fluent API |
|---|---|
| Application menu / nav for advisor staff | `ApplicationMenu()` |
| Scoped roles (student, wellbeing_advisor, senior_counsellor) | `Role()` |
| System properties (feature flags, config) | `Property()` |
| Email notifications (advisor pickup, follow-up cadence) | `EmailNotification()` |
| Flow Designer flows (escalation routing, care plan workflow) | `Flow()`, `Subflow()` |
| Scheduled scripts (follow-up cadence trigger) | `ScheduledScript()` |

---

## Technology constraints (Service Portal specifically)

The Fluent guide is explicit: **Service Portal runs AngularJS 1.x + Bootstrap 3**. Important implications for the build:

- **Visual design**: we have full reign with CSS/SCSS — modern layouts, our Pacific palette, custom typography, CSS Grid, animation. The v0.2 design comp ports cleanly.
- **Interactivity**: must be AngularJS controllers using controller alias `c` (no `$scope`). Modern JS modules don't apply *inside widgets*. This is fine — interactions like "Talk to Otto", chat input, today panel are all simple AngularJS patterns.
- **No React** inside Service Portal widgets. For modern Next-Experience surfaces (UI Builder, workspaces) different rules apply — but the student portal stays AngularJS.
- **Theme variables in SCSS** — palette goes in the theme as SCSS variables, never hardcoded into widget CSS. Means swap-to-USP-or-Canterbury later is one theme change.
- **No `Record()` for portal components** — always use the dedicated API (`SPWidget`, `SPTheme`, etc.). Validation differs.

This is fine for our design ambitions — the only thing it constrains is the JS framework inside widgets, which is invisible to the student.

---

## File structure for the spine

Per the SDK guide's recommended organisation, our `src/fluent/` becomes:

```
src/fluent/
├── _example.now.ts                ← SDK starter — replace once we're ready
├── generated/                     ← SDK-managed sys_id key map (don't edit)
│
├── spine/
│   ├── tables/
│   │   ├── module-registry.now.ts        ← x_uni_blueprint_module (modules contributing to portal)
│   │   ├── wellbeing-case.now.ts         ← extends customer_case (once CSM is in)
│   │   └── readme.md
│   ├── roles/
│   │   ├── student.now.ts
│   │   ├── wellbeing-advisor.now.ts
│   │   └── senior-counsellor.now.ts
│   ├── acls/
│   │   └── wellbeing-case-acls.now.ts
│   ├── properties/
│   │   └── feature-flags.now.ts
│   └── email-notifications/
│       └── advisor-pickup.now.ts
│
├── portal/
│   ├── portal.now.ts                     ← ServicePortal() — the /student record
│   ├── theme/
│   │   ├── theme.now.ts                  ← SPTheme() — Aotearoa Coastal
│   │   └── variables.scss                ← SCSS variable definitions (palette, type)
│   ├── menu/
│   │   └── student-menu.now.ts           ← SPMenu() — Home / Get help / My place / Knowledge
│   ├── pages/
│   │   ├── home/
│   │   │   └── home-page.now.ts          ← landing
│   │   ├── get-help/
│   │   │   └── get-help-page.now.ts      ← the categorised hub
│   │   ├── my-stuff/
│   │   │   └── my-stuff-page.now.ts
│   │   └── conversation/
│   │       └── conversation-page.now.ts  ← Otto chat full-screen
│   ├── widgets/
│   │   ├── au-topbar/
│   │   │   ├── widget.now.ts
│   │   │   ├── client.js
│   │   │   ├── template.html
│   │   │   └── styles.scss
│   │   ├── au-hero/                       ← greeting + Otto CTA + search
│   │   ├── au-today-panel/                ← heterogeneous case+class+deadline cards
│   │   ├── au-quick-actions/              ← 6-card grid, category-coloured
│   │   ├── au-hub-grid/                   ← Get Help hub cards (Wellbeing, IT, Money, …)
│   │   ├── au-kb-rail/                    ← "Worth a read" recommendation rail
│   │   ├── au-chat/                       ← Otto chat surface (mode-aware gradient)
│   │   └── au-footer/
│   └── header-footer/
│       └── student-portal-header-footer.now.ts
│
└── modules/
    └── m1-wellbeing/
        ├── ai-agent/
        │   ├── otto-agent.now.ts          ← AiAgent() definition (Wellbeing mode)
        │   └── prompt.md                  ← Otto's wellbeing-mode empathic prompt
        ├── agentic-workflow/
        │   └── intake-triage.now.ts       ← AiAgenticWorkflow()
        └── flows/
            └── care-coordination.now.ts   ← Flow Designer flow
```

---

## Order of build (bottom-up per SDK guidance)

The SDK guide is explicit: build components **bottom-up** — dependencies and providers first, then widgets, then pages, then themes/menus, finally the portal itself. Our adapted sequence:

### Phase 1 — Foundations (no install dependencies)
1. **Theme** — `SPTheme()` with our Pacific palette in SCSS variables. The single act of dropping our theme into the platform makes everything that follows feel right.
2. **Header/Footer** — minimal, Aotearoa Uni branded.
3. **Roles** — student, wellbeing_advisor, senior_counsellor.
4. **Properties** — feature flags and config.
5. **Module registry table** — `x_uni_blueprint_module` so we can declare M1, M2, M3 module records.

*Output: deployable build that lays down the brand layer with nothing depending on CSM or AI Agent Studio.*

### Phase 2 — Portal shell (no install dependencies)
6. **Topbar widget** — logo, nav, language toggle, profile avatar.
7. **Footer widget** — acknowledgement, links.
8. **Menu** — `SPMenu()` connecting Home / Get help / My place / Knowledge.
9. **Static pages** — Home (skeleton), Get help (skeleton).
10. **Portal record** — `ServicePortal()` pointing `/student` to our pages with our theme.

*Output: a deployable portal at `https://dev377076.service-now.com/student` that loads with Aotearoa Uni branding, even if pages are still light on content.*

### Phase 3 — Data layer (needs CSM installed)
11. **Wellbeing case table** extending `customer_case`.
12. **Field definitions** — intake context, risk signal, care plan link, etc.
13. **ACLs** — who can see what.
14. **Form layout** for advisor workspace.

*Output: data model on which AI agent and workflow operate.*

### Phase 4 — Hero widgets (depends on Phase 2 + 3)
15. **Hero widget** — greeting + Otto CTA + search.
16. **Today panel widget** — pulls case data + timetable.
17. **Quick actions widget** — category-coloured 6-card grid.
18. **KB rail widget** — recommended articles.

### Phase 5 — AI agent (needs AI Agent Studio + Now Assist)
19. **Otto agent (Wellbeing mode)** — `AiAgent()` with empathic intake prompt.
20. **Agentic workflow** — `AiAgenticWorkflow()` for triage routing.
21. **Chat widget** — surface for the agent.

### Phase 6 — Get Help hub (depends on M1)
22. **Hub grid widget** — categorised cards with agent routing.
23. **Hub page** wired up.

### Phase 7 — Wiring and polish
24. **My Stuff page + widgets**.
25. **Email notifications**.
26. **Flows for care coordination**.

---

## What we can build *right now* (no installs needed)

**Phase 1 + Phase 2** are independent of CSM and AI Agent Studio. We can:
- Author the theme with our Pacific palette
- Build the topbar, footer, menu
- Stand up the `/student` portal record pointing at skeleton pages

Net effect: by the time CSM finishes installing, we'll have a working portal URL that already feels like Aotearoa Uni, just light on content. That's a real artefact and a real morale boost.

---

## Smallest meaningful first move (when you give the go-ahead)

**The theme alone.** A single `.now.ts` file with `SPTheme()` + a `variables.scss` defining our Pacific palette, ink, paper, and type tokens. Then deploy with `npm run deploy`. Result: the theme exists on the instance, ready to apply to whatever portal record we create next. Smallest possible win, biggest possible morale lift — the platform now *contains* our design language.

After that, we keep moving down the Phase 1 list.

---

## Open questions to revisit when we're ready to start writing code

1. Should we use **the OOTB Coral theme as a base** and override SCSS variables, or author a clean theme from scratch? Coral is the SDK-recommended OOTB default — extending it might be the path of least resistance, *if* its SCSS variable surface is broad enough to express our palette.
2. **Bootstrap 3 + AngularJS** — confirm widget interactions degrade gracefully (or noticeably, in a planned way) if JS fails to load. Accessibility consideration.
3. Should the **language toggle** be a single boolean property per user (En/Reo), or richer per-string overrides? The latter is more flexible for USP (multiple Pacific languages later); the former is simpler.
4. **Mobile** — Service Portal is responsive via Bootstrap 3 by default, but our v0.2 mobile is custom. Confirm we can override Bootstrap 3 breakpoints with our own CSS Grid layouts cleanly.
