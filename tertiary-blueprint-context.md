# Tertiary Education Blueprint — Context Brief for Claude Code

**Date:** 13 May 2026
**Author:** Susy (SC, ServiceNow NZ)
**Purpose:** Keep Claude Code aligned on the broader blueprint vision and USP workshop context.

---

## What We're Building

A **reusable tertiary education demo blueprint** built on ServiceNow CSM, designed to work across multiple higher-ed customers in NZ/Pacific. Modular architecture — shared platform spine with swappable use case modules.

### Architecture Spine (constant across all customers)

- Student Portal (CSM portal)
- AI Agent intake (Now Assist / AI Agent)
- Case management (CSM)
- Agent Workspace
- Knowledge Base
- Integration layer to SIS / Student ERP / LMS

### Use Case Modules

| Module | Status | Lead Customer | Focus |
|--------|--------|---------------|-------|
| **1 — Wellbeing Intake & Care Coordination** | v0.1 draft complete | Aotearoa University (fictional) | Emotional/pastoral. AI empathic intake → triage → clinical escalation → care plan with academic accommodation. |
| **2 — Student Services Operations** | Not yet built | USP (University of the South Pacific) | Transactional/high-volume. Enrolment queries, fee payments, status changes, transcript requests, multi-team coordination (finance + student services). |
| **3 — IT Service Management (student/staff)** | Future | TBD | Standard ITSM with student-facing service catalog, asset management, after-hours self-service. |

---

## Use Case 1 — Wellbeing (Built)

### File
`personas-and-flows.html` — three slides: Personas, Flow 1 (Intake & Triage), Flow 2 (Care Coordination & Resolution).

### Personas
- **Aria Tupou** — Year 2 BCom student, 19, first-in-family, anxiety/sleep issues
- **James Patel** — Student Wellbeing Advisor (front-line triage)
- **Dr. Sarah O'Connor** — Senior Wellbeing Counsellor (clinical lead)
- **Care** — AI Wellbeing Intake Assistant (portal first responder)

### Flow 1 — Intake & Triage
Student opens portal → engages AI agent "Care" → describes feelings → AI triages risk, suggests KB self-help → student requests human contact → AI creates CSM case with full context → routes to advisor queue → advisor reviews context and reaches out within 2 hours.

### Flow 2 — Care Coordination & Resolution
Advisor books triage appointment → student completes pre-session questionnaire → triage session → advisor identifies clinical need → escalates to senior counsellor with full context → counselling session → care plan documented → academic accommodation linked → follow-up cadence set → case closed.

### Products Shown
Student Portal, Now Assist / AI Agent, Knowledge, CSM Case, Agent Workspace, Integrated Booking.

### Design Notes
- Cultural note flagged: Māori personas and Te Reo need review by appropriate colleague before real audience use
- Format: HTML slides, dark ServiceNow aesthetic, swim-lane flow diagrams
- "Aotearoa University" is the fictional institution name

---

## Use Case 2 — Student Services Operations (USP Context)

### About USP
University of the South Pacific. Multi-campus across Pacific Island nations. Hub operations in Fiji (highest request volume). Shared services model. Currently on ManageEngine, hitting integration walls. Going live target: end of 2026.

### Key Facts from Discovery
- **Support staff:** 10 contact centre + 16 direct support, distributed across campuses
- **Channels today:** Email (primary), phone, walk-in (mainly Laucala/Fiji). No portal self-service. Increasing digital/remote demand from regional students.
- **After-hours:** Emergency protocols only; support waits till Monday. They want to change this.
- **Current integrations:** SSO with Azure AD. Point-to-point, no ESB/middleware. ManageEngine integration with other apps is painful.
- **Systems to integrate:** Student ERP, Student LMS (Moodle). Finance APIs are "limited and require reconciliation."
- **Identity:** Active Directory + Azure AD
- **AI readiness:** No hesitation. Want automation for status updates, common inquiries, automated ticket resolution. Have explored chatbots but cross-platform integration limited.
- **Data:** Some cleanup required on student records. Management consumes analytical reports. Key metrics: SLA performance, issue category identification.
- **CRM scope:** Student services only for now, with consideration for expansion.
- **Undergrad vs Postgrad:** Different admission paths (centralised vs school-based). Postgrad less reliant on contact centre.
- **Domestic vs International:** International students have additional visa, credit transfer, accommodation, and cultural transition needs.
- **IT assets:** Planning move to Microsoft Intune.
- **Change management:** Flexible, IT team assigned. Main concern: retraining IT team on new system.

### USP Student Lifecycle (6 stages from V2 discovery)
1. **Enquiry & Application** — EnRolMe portal, offer letters
2. **Admission & Registration** — program audit, course registration, add/drop, invoicing, fee payment/sponsorship
3. **Orientation & Transition** — Moodle access, student systems, support services
4. **Academic Progression** — classes, assessments, special exams, grade reconsideration, transcripts, at-risk support
5. **Support & Engagement** — contact centre touchpoints: academic, IT, admin (confirmation/visa/English letters), finance, campus life
6. **Completion & Graduation** — completion application, official transcript, graduation ceremony, course descriptions, verification of qualifications, alumni

### Student Status Triggers
- Course Registration → Enrolled/Active
- Credit Transfer
- Withdrawal → Withdrawn/Inactive
- Program Change → Re-admitted/Updated Program
- Academic Standing → Good Standing/At Risk
- Fee Payment Issues → Restricted/Hold/Deregister
- Graduation Approval → Completed/Graduated

### Chargeable Services (case types)
Visa letters, English letters, confirmation letters, program audit, course descriptions, verification of qualifications, transcripts (official and unofficial), reconsideration of grades, letter of certification.

### Key Touchpoints
Website/application portal, USP Contact Centre (phone/email/live support), Student Portal (registration/fees/results), Moodle, academic departments/course coordinators, Finance & ReST office, International Office, campus services (IT, library, CFL).

### Discovery Gaps (unanswered)
- Monthly ticket/case volumes and category breakdown
- Current SLA/response time targets
- Most common incident categories and self-solve percentage
- Financial reporting/compliance requirements (said N/A for CRM for now)

### Proposed Demo Story Direction
A regional student (e.g. in Tonga — timezone gap, language barrier) needs to withdraw from a course due to unpaid fees and apply for a payment plan. Today this requires email → wait → bounce between finance and student services → repeat story. With ServiceNow: AI agent handles intake → pulls enrolment status and financial hold from student ERP → identifies multi-team case → creates case with full context → routes to correct queue so management accountant and student services see the same picture.

**Key themes to demonstrate:**
- Integration visibility (multi-system data in one workspace)
- Cross-team coordination (finance + student services on same case)
- Self-service deflection (status updates, common inquiries)
- Multi-campus/timezone coverage (virtual agent for after-hours)
- Student portal replacing email/phone dependency

---

## Blueprint Design Principles

1. **Modular** — Each use case is a standalone module that plugs into the shared architecture spine
2. **Persona-driven** — Every flow tells a human story, not a system walkthrough
3. **Product-mapped** — Each step explicitly tags the ServiceNow product (CSM, Now Assist, Agent Workspace, Knowledge, etc.)
4. **Swim-lane format** — Personas as lanes, steps as cards, clear escalation paths
5. **Reusable but personalised** — Generic enough for any tertiary customer, specific enough that a given customer sees themselves in it
6. **AI-forward** — AI agent is always the first responder; human escalation is the second step, not the default
7. **Cultural sensitivity** — Flag anything that needs local cultural review before customer-facing use

---

## What's Next

- Build Use Case 2 (Student Services Operations) as additional HTML slides in the same format as Use Case 1
- USP workshops are upcoming — Module 2 becomes the hero flow, Module 1 referenced as "where the platform goes next"
- Eventually add Module 3 (ITSM) to complete the triptych
