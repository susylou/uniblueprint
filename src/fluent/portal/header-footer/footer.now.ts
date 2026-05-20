import { SPHeaderFooter } from '@servicenow/sdk/core'

/**
 * Footer for the Aotearoa Uni student portal.
 * Minimal: cultural acknowledgement placeholder + service links.
 */
export const StudentFooter = SPHeaderFooter({
    $id: Now.ID['headerfooter.au-footer'],
    name: 'AU Student Footer',
    id: 'au-student-footer',
    description: 'Footer with cultural acknowledgement and service links.',
    category: 'custom',
    htmlTemplate: Now.include('./footer.template.html'),
    customCss: Now.include('./footer.styles.scss'),
})
