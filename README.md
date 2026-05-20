# Tertiary Blueprint

A reusable tertiary-education demo blueprint built on ServiceNow, designed to work across multiple higher-ed customers in NZ and the Pacific. Modular architecture — shared platform spine with swappable use-case modules.

Lead reference: `tertiary-blueprint-context.md`.

---

## What's in this repo

This repo contains **both** the design comp (HTML wireframes) and the **Fluent SDK app** that builds the spine on a ServiceNow instance.

### Design artefacts

| File | What |
|---|---|
| `tertiary-blueprint-context.md` | The brief — what we're building and why |
| `architecture-overview.html` | The modular spine + 3 use-case modules diagram |
| `personas-and-flows.html` | M1 Wellbeing personas and flow swimlanes (v0.1) |
| `portal-design-brief.md` | Portal IA, theming model, key states to wireframe |
| `portal-wireframes.html` | Portal design comp v0.2 — desktop + mobile, multi-tonal-register |
| `mcp-connector-setup-dev377076.md` | Playbook for connecting Claude to the PDI via MCP |
| `pdi-audit/` | Audit of the target PDI (factory state, capability gaps) |

### Fluent SDK app

| File | What |
|---|---|
| `package.json` | npm dependencies: `@servicenow/sdk`, `@servicenow/glide`, TypeScript |
| `now.config.json` | Fluent SDK config — scope `x_uni_blueprint`, app name "Uni Blueprint" |
| `src/fluent/` | Fluent declarations — tables, portal record, theme, widgets, business logic |
| `src/server/` | Server-side scripts (Business Rules, Script Includes) referenced from Fluent declarations |

---

## Target

**Instance:** dev377076.service-now.com (factory-fresh PDI)
**Scope:** `x_uni_blueprint`
**Build approach:** Hybrid — Fluent SDK for structural code (tables, portal record, theme, configuration), Service Portal Designer for widget authoring (faster live-preview), all widget source kept in git.

See `pdi-audit/audit-findings.md` for what's already on the PDI and what needs installing.

---

## Getting started

### Prerequisites

- `@servicenow/sdk` v4.6.0+ installed globally (CLI `now-sdk` on PATH)
- Node.js + npm
- Auth alias for dev377076 set up via `now-sdk auth --add dev377076 --type basic --alias dev377076`

### Local commands

```bash
npm install            # one-time, install dev dependencies
npm run build          # compile Fluent source → ServiceNow app package
npm run deploy         # install/update on configured instance
npm run types          # download type definitions for instance dependencies
npm run transform      # download + convert XML records to Fluent source
```

### First deploy

1. Run `now-sdk auth --add dev377076 --type basic --alias dev377076` (interactive — enter admin credentials).
2. `npm install`
3. `npm run build`
4. `npm run deploy`
5. Open `https://dev377076.service-now.com/now/nav/ui/` and verify the scope appears under System Applications → Application Scopes.

---

## Architecture (modular spine + modules)

```
                   ┌────────────────────────┐
                   │  Use-case modules      │
                   │  M1 Wellbeing          │
                   │  M2 Student Services   │
                   │  M3 ITSM (future)      │
                   └─────────┬──────────────┘
                             │
                   ┌─────────▼──────────────┐
                   │  Shared platform spine │
                   ├────────────────────────┤
                   │  Student Portal        │
                   │  AI Agent intake       │
                   │  Case Management (CSM) │
                   │  Agent Workspace       │
                   │  Knowledge Base        │
                   │  Analytics             │
                   └─────────┬──────────────┘
                             │
                   ┌─────────▼──────────────┐
                   │  Integration layer     │
                   │  SIS · ERP · LMS · SSO │
                   └────────────────────────┘
```

The spine is constant across all institutional deployments. Modules plug into the spine via a declared contract (quick-action cards, KB topics, AI agent persona, case types). One portal shell with tonal registers per module — wellbeing warm, IT cool, admin formal.

---

## License

Internal blueprint artefact. Not for external distribution without ServiceNow approval.
