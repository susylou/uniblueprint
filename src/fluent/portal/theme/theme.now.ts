import { SPTheme } from '@servicenow/sdk/core'
import { StudentHeader } from '../header-footer/header.now'
import { StudentFooter } from '../header-footer/footer.now'

/**
 * Aotearoa Coastal — the theme that carries the design language of the
 * Tertiary Blueprint portal. Pacific-coastal palette, Newsreader serif
 * for display + Inter for body, generous typography, plain language.
 *
 * SCSS variables defined here are available to every widget rendered
 * under this theme. Widgets reference them as $au-teal, $au-ink, etc.,
 * so swapping the theme is the entire job of re-skinning the portal
 * for USP, Canterbury, or any other institution.
 *
 * See portal-wireframes.html (design comp v0.3) for the visual reference.
 */
export const AotearoaCoastalTheme = SPTheme({
    $id: Now.ID['theme.aotearoa.coastal'],
    name: 'Aotearoa Coastal',

    // Sticky topbar matches the design comp (logo + nav always visible).
    // Footer scrolls with content rather than anchored to viewport.
    fixedHeader: true,
    fixedFooter: false,
    header: StudentHeader,
    footer: StudentFooter,

    // SCSS variable bank — referenced by all widget SCSS in this scope.
    // Naming convention: $au-* (Aotearoa Uni) so widget authors know
    // which tokens are theme-scoped vs Bootstrap 3 defaults.
    customCss: `
        // === Pacific-coastal palette ===
        $au-teal:         #0F4C5C;
        $au-teal-2:       #1A6B7A;
        $au-teal-soft:    #D6E5E7;
        $au-terracotta:   #C45D3F;
        $au-terra-soft:   #F4D9CC;
        $au-gold:         #E8B14E;
        $au-pounamu:      #4A6F4F;
        $au-cream:        #F8F2E7;
        $au-paper:        #FFFCF6;
        $au-sand:         #EDE3D2;
        $au-ink:          #1A2329;
        $au-mute:         #5A6770;
        $au-line:         rgba(26, 35, 41, 0.10);

        // === Otto's tonal gradients ===
        // Otto is the single AI assistant whose tone adapts to context.
        // Same agent, three registers: warm for wellbeing, cool for IT,
        // formal-warm for admin / student services.
        $au-otto-warm:    linear-gradient(135deg, #1A6B7A 0%, #C45D3F 100%);
        $au-otto-cool:    linear-gradient(135deg, #0F4C5C 0%, #4A6F4F 100%);
        $au-otto-admin:   linear-gradient(135deg, #0F4C5C 0%, #E8B14E 100%);

        // === Typography ===
        // Newsreader for display copy (greetings, section heads) — warm,
        // considered, university register. Inter for body and UI.
        $au-font-display: "Newsreader", Georgia, serif;
        $au-font-body:    "Inter", -apple-system, BlinkMacSystemFont,
                          "Segoe UI", system-ui, sans-serif;

        // === Bootstrap 3 brand-* mapping ===
        // So default Service Portal components inherit our palette
        // instead of stock blue. Keeps everything visually coherent
        // even before we override individual widgets.
        $brand-primary:   #0F4C5C;
        $brand-success:   #4A6F4F;
        $brand-warning:   #E8B14E;
        $brand-danger:    #C45D3F;
        $brand-info:      #1A6B7A;

        $body-bg:         #FFFCF6;
        $text-color:      #1A2329;
        $link-color:      #0F4C5C;

        // === Component tokens ===
        $au-radius-sm:    6px;
        $au-radius-md:    12px;
        $au-radius-lg:    16px;
        $au-radius-pill:  999px;

        $au-shadow-card:  0 1px 2px rgba(26, 35, 41, 0.04),
                          0 4px 12px rgba(26, 35, 41, 0.06);
        $au-shadow-hero:  0 12px 30px rgba(15, 76, 92, 0.18);
    `,
})
