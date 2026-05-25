import { SPWidget } from '@servicenow/sdk/core'

/**
 * au-kb-rail — "Worth a read / Mātauranga" knowledge recommendations.
 *
 * v0.1: three hardcoded cards matching the wireframe (Wellbeing / Studying
 * / Money). When CSM + Knowledge are properly populated on the instance,
 * this widget will read top KB articles per topic with student-helpfulness
 * counts.
 *
 * Reference: portal-wireframes.html v0.3, KB rail section.
 */
export const KbRailWidget = SPWidget({
    $id: Now.ID['widget.au-kb-rail'],
    name: 'AU KB Rail',
    id: 'au-kb-rail',
    description: 'Aotearoa Uni knowledge recommendations rail - "Worth a read / Mātauranga".',
    category: 'custom',
    htmlTemplate: Now.include('./template.html'),
    serverScript: Now.include('./server.js'),
    customCss: Now.include('./styles.scss'),
})
