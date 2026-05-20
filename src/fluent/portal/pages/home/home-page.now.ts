import { SPPage } from '@servicenow/sdk/core'
import { HeroWidget } from '../../widgets/au-hero/widget.now'

/**
 * Student portal home page — the landing experience.
 *
 * v0.3 of the design comp shows: hero → Today panel → quick actions → KB rail.
 * For first cut, we ship the hero only. Today/quick-actions/KB widgets
 * arrive in subsequent iterations of Phase 2.
 */
export const HomePage = SPPage({
    pageId: 'home',
    title: 'Aotearoa University · Home',
    shortDescription: 'Landing page for Aotearoa University student portal.',
    category: 'custom',
    containers: [
        {
            $id: Now.ID['page.home.container.hero'],
            name: 'Hero',
            cssClass: 'au-page-container au-page-container--hero',
            parentClass: 'container-fluid',
            order: 100,
            rows: [
                {
                    $id: Now.ID['page.home.row.hero'],
                    cssClass: 'au-page-row',
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['page.home.col.hero'],
                            size: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['page.home.instance.hero'],
                                    title: 'Hero',
                                    id: 'au-home-hero',
                                    widget: HeroWidget,
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
        /* Page-level: paper background, no Bootstrap container chrome */
        body.sp { background: var(--au-paper, #FFFCF6); }
        .au-page-container--hero { padding: 0; }
        .au-page-row { margin: 0; }
        .au-page-row > [class^="col"] { padding: 0; }
    `,
})
