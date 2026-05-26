import { SPWidget } from '@servicenow/sdk/core'

/**
 * au-hub-grid - the Get Help / Awhina hub.
 *
 * Renders the hub intro block (eyebrow + headline + "Not sure? Talk to Otto"
 * pill) and a 3-up grid of category cards: Wellbeing, Studying, IT, Money,
 * Admin, plus a sixth Otto-routing card. Mirrors slide 3 of
 * portal-wireframes.html.
 *
 * For v0.1 (M1 only) cards are hardcoded with kb_search hrefs. When the
 * module-contribution table lands, this widget reads cards from it so each
 * future module can declare its own category.
 */
export const HubGridWidget = SPWidget({
    $id: Now.ID['widget.au-hub-grid'],
    name: 'AU Hub Grid',
    id: 'au-hub-grid',
    description: 'Aotearoa Uni Get Help hub - five categories plus Otto routing.',
    category: 'custom',
    htmlTemplate: Now.include('./template.html'),
    clientScript: Now.include('./client.js'),
    serverScript: Now.include('./server.js'),
    customCss: Now.include('./styles.scss'),
})
