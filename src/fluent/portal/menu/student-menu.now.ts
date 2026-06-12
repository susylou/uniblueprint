import { SPMenu } from '@servicenow/sdk/core'
import { HomePage } from '../pages/home/home-page.now'
import { GetHelpPage } from '../pages/get-help/get-help-page.now'

/**
 * Student portal main menu — bilingual English/Te Reo lock-ups.
 *
 * Home and Get help are live pages; My place / Knowledge are still URL
 * placeholders pointing to home (those pages arrive in subsequent iterations).
 * Each item carries its Te Reo subtitle in the `hint` field so the header
 * widget can render the bilingual pair.
 */
export const StudentMenu = SPMenu({
    $id: Now.ID['menu.au-student'],
    id: 'au-student-menu',
    items: [
        {
            $id: Now.ID['menu.au-student.home'],
            label: 'Home',
            hint: 'Kāinga',
            type: 'page',
            page: HomePage,
            order: 100,
        },
        {
            $id: Now.ID['menu.au-student.gethelp'],
            label: 'Get help',
            hint: 'Āwhina',
            type: 'page',
            page: GetHelpPage,
            order: 200,
        },
        {
            $id: Now.ID['menu.au-student.myplace'],
            label: 'My place',
            hint: '[Te Reo TBC]',
            type: 'url',
            url: '?id=au-home',
            order: 300,
        },
        {
            $id: Now.ID['menu.au-student.knowledge'],
            label: 'Knowledge',
            hint: 'Mātauranga',
            type: 'url',
            url: '?id=au-home',
            order: 400,
        },
    ],
})
