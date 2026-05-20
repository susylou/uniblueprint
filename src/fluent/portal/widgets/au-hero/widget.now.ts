import { SPWidget } from '@servicenow/sdk/core'

/**
 * au-hero — the persona-first landing hero.
 *
 * - Greets the logged-in student by first name (server script pulls from gs.getUser)
 * - Presents Otto as the dominant CTA in Wellbeing mode (warm gradient)
 * - Search card alongside with quick-topic chips
 *
 * Reference: portal-wireframes.html v0.3, Slide 2 "Desktop landing".
 */
export const HeroWidget = SPWidget({
    $id: Now.ID['widget.au-hero'],
    name: 'AU Hero',
    id: 'au-hero',
    description: 'Aotearoa Uni hero — greeting, Otto CTA, search.',
    category: 'custom',
    htmlTemplate: Now.include('./template.html'),
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    customCss: Now.include('./styles.scss'),
})
