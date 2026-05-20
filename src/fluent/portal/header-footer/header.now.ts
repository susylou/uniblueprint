import { SPHeaderFooter } from '@servicenow/sdk/core'

/**
 * Top-bar header for the Aotearoa Uni student portal.
 * Logo + word mark, dynamic nav fed by the portal's main_menu,
 * language toggle, profile avatar.
 *
 * Reference: portal-wireframes.html v0.3 (topbar across all desktop slides).
 */
export const StudentHeader = SPHeaderFooter({
    $id: Now.ID['headerfooter.au-header'],
    name: 'AU Student Header',
    id: 'au-student-header',
    description: 'Top-bar header with bilingual nav and profile.',
    category: 'custom',
    htmlTemplate: Now.include('./header.template.html'),
    clientScript: Now.include('./header.client.js'),
    serverScript: Now.include('./header.server.js'),
    customCss: Now.include('./header.styles.scss'),
})
