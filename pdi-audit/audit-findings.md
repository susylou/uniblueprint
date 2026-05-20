# PDI Audit — dev377076

**Audited:** 20 May 2026
**Method:** Playwright + REST API table probes (sys_plugins itself is ACL-locked; we inferred capability by hitting tables that would exist if a plugin were active).

## What's already on the box

### Active capabilities (confirmed)
| Capability | Evidence | Notes |
|---|---|---|
| **Service Portal** | `sp_portal` table populated, 9 portals exist | Foundational — what we need for the portal build |
| **Knowledge Base** | `kb_knowledge` has data | Foundational — KB articles for Otto to suggest |
| **Virtual Agent / Conversational Interfaces** | `sys_cs_topic` exists | VA framework present, can author topics |
| **UI Builder / Now Experience** | `sys_ux_app` exists, lots of `sn_*` UI components | Modern surface available |
| **NLU Studio v2.0.0** | Scoped app present | Foundation for natural language understanding |
| **ITSM** | Studio shows it as default | Incident/Problem/Change present (not relevant to our build, but it's the default PDI workload) |
| **ITSM Workspace v1.0.0** | Scoped app present | Modern workspace surface for ITSM |
| **Process Automation Content v28.1.4** | Scoped app present | Workflow content |
| **Employee Center (`/esc`) + theming** | EC Theme, Coral, La Jolla all present | Reference for "modern-ish" portal patterns already on the platform |

### Existing portals
- `/cab` — CAB Workbench
- `/esc` — Employee Center
- `/kb` — Knowledge Portal
- `/mesp` — Mobile Employee Service Portal
- `/sp` — Service Portal (the default ITSM-flavoured one)
- `/sp_config` — SP Configuration (admin tool)
- `/swp` — Service Workspace Portal
- `/benchmarks`, `/perf` — analytics

No `/csm`, no `/student`. We'll be creating our portal record fresh.

### Available themes
Stock, La Jolla, Coral, EC Theme, Customer Experience Coral, ESC Theme, Mobile Employee Next Experience, Portal Next Experience, HRM Theme, ITSM workspaces. We'll author our own `Aotearoa Coastal Theme` per the design comp.

## What's missing — and we need

| Missing capability | Why we need it | Install via |
|---|---|---|
| **Customer Service Management (CSM)** | Spine spec names "CSM Case" as the workflow product. Right fit for student-services use case (account/contact model, external customer pattern). | ServiceNow Store via developer.servicenow.com |
| **AI Agent Studio (`sn_aia_*`)** | Otto (the single AI assistant) needs to live somewhere agentic. Same product family Susy used for the OIA build on PSDS. | Store / dev portal request |
| **Now Assist Skill Kit / Now Assist platform** | For the empathic intake conversation (more than just NLU). | Store / dev portal request |

## Recommendation

**Install CSM + AI Agent Studio + Now Assist before scaffolding the Fluent SDK app.** Three reasons:

1. **Blueprint integrity.** The context brief explicitly names CSM Case and AI Agent. Building the spine on `incident` to work around this would diverge from what USP, Canterbury, and the polytech would actually install themselves.
2. **It's a 30–60 min Store job, not a project.** Each one is a guided install from developer.servicenow.com → Manage Instance → Available Apps.
3. **It blocks nothing visible yet.** Portal craft (the design ceiling work) can proceed in parallel because Service Portal is already there. CSM tables and AI agents only matter when we start wiring real case + agent behaviour.

## What the PDI's posture tells us about platform direction

When this PDI lands you on **ServiceNow Studio** as the home (not the classic Now Platform UI), that's a strong product-direction signal:
- Studio + IDE are the modern build surfaces
- App development as code (Fluent SDK) is featured front and centre
- UI Builder for modern UX
- The "platform-as-development-platform" story is being foregrounded

That aligns *exactly* with the hybrid Fluent SDK + Service Portal Designer approach we picked. Reassuring.

## Decisions / next moves

1. Install CSM, AI Agent Studio, Now Assist (your clicks — developer portal).
2. Once installed, re-audit to confirm `customer_case` and `sn_aia_agent` are present.
3. Scaffold the Fluent SDK app (`x_uni_blueprint`) and start with the scope + theme + a hello-world widget.
