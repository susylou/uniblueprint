import { SPPage } from '@servicenow/sdk/core'
import { HubGridWidget } from '../../widgets/au-hub-grid/widget.now'

/**
 * Get Help / Awhina hub page.
 *
 * Single container holding the au-hub-grid widget, which renders both the
 * hub intro block (eyebrow + headline + "Not sure?" pill) and the 3-up
 * category card grid. Mirrors slide 3 of portal-wireframes.html.
 */
export const GetHelpPage = SPPage({
    pageId: 'au-get-help',
    title: 'Aotearoa University · Get help',
    shortDescription: 'Categorised hub of help routes - Wellbeing, Studying, IT, Money, Admin, and Otto.',
    category: 'custom',
    containers: [
        {
            $id: Now.ID['page.gethelp.container.hub'],
            name: 'Hub',
            cssClass: 'au-page-container au-page-container--hub',
            parentClass: 'container-fluid',
            order: 100,
            rows: [
                {
                    $id: Now.ID['page.gethelp.row.hub'],
                    cssClass: 'au-page-row',
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['page.gethelp.col.hub'],
                            size: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['page.gethelp.instance.hub'],
                                    title: 'Hub Grid',
                                    id: 'au-gethelp-hub',
                                    widget: HubGridWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    css: `
        body.sp { background: var(--au-paper, #FFFCF6); }
        .au-page-container--hub { padding: 0; }
        .au-page-row { margin: 0; }
        .au-page-row > [class^="col"] { padding: 0; }
    `,
})
