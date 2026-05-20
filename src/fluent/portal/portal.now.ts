import { ServicePortal } from '@servicenow/sdk/core'
import { AotearoaCoastalTheme } from './theme/theme.now'
import { StudentMenu } from './menu/student-menu.now'
import { HomePage } from './pages/home/home-page.now'

/**
 * The student portal record.
 *
 * Lives at https://<instance>/student. Themed with Aotearoa Coastal
 * (Pacific palette), navigated by StudentMenu, lands on HomePage.
 *
 * Title is intentionally short — the brand identity carries in the
 * topbar (logo + word mark + Te Reo subtitle), not in the browser-tab text.
 */
export const StudentPortal = ServicePortal({
    $id: Now.ID['portal.au-student'],
    title: 'Aotearoa University',
    urlSuffix: 'student',
    theme: AotearoaCoastalTheme,
    mainMenu: StudentMenu,
    homePage: HomePage,
    logoAltText: 'Aotearoa University',
    hidePortalName: false,
})
