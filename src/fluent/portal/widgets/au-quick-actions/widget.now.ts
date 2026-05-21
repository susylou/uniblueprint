import { SPWidget } from '@servicenow/sdk/core'

/**
 * au-quick-actions — module-contributed quick-action cards on the landing.
 *
 * Renders below the hero. For v0.1 (M1 Wellbeing only) we hardcode the
 * four wellbeing cards. When M2 / M3 land, this widget reads from a
 * module-contribution table so each module declares its own cards.
 *
 * Reference: portal-design-brief.md → "Module contribution contract".
 */
export const QuickActionsWidget = SPWidget({
    $id: Now.ID['widget.au-quick-actions'],
    name: 'AU Quick Actions',
    id: 'au-quick-actions',
    description: 'Aotearoa Uni quick-action cards — module-contributed entry points.',
    category: 'custom',
    htmlTemplate: Now.include('./template.html'),
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    customCss: Now.include('./styles.scss'),
})
