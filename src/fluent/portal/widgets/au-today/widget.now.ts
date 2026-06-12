import { SPWidget } from '@servicenow/sdk/core'

/**
 * au-today — "Today / I tēnei rā" persona-first panel.
 *
 * The "what's happening for you" block from portal-wireframes.html v0.3
 * (desktop landing, sits between the hero and quick actions). Three cards:
 * an in-progress wellbeing conversation, a recently-resolved IT request,
 * and an upcoming assignment deadline — the design's proof that the portal
 * shows real life, not a generic welcome.
 *
 * v0.1: demo-static cards (see server.js) so the panel renders identically
 * on any instance. On the Australia port this is the seam to read live
 * CSM case / REQ / enrolment records.
 *
 * Reference: portal-wireframes.html v0.3, "Today" section (slide 2).
 */
export const TodayWidget = SPWidget({
    $id: Now.ID['widget.au-today'],
    name: 'AU Today',
    id: 'au-today',
    description: 'Aotearoa Uni "Today / I tēnei rā" panel — persona-first what\'s-happening cards.',
    category: 'custom',
    htmlTemplate: Now.include('./template.html'),
    serverScript: Now.include('./server.js'),
    customCss: Now.include('./styles.scss'),
})
