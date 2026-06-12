/*
 * au-today widget — server script.
 * "Today / I tēnei rā" persona-first panel (portal-wireframes.html v0.3).
 *
 * Demo-static for v0.1 so the panel renders identically on any instance,
 * matching the design comp exactly. On the Australia port this is the seam
 * to query live records:
 *   - active card  -> the student's open CSM case + booked appointment
 *   - resolved card -> their most recent closed REQ
 *   - coming-up card -> an assessment / deadline feed
 *
 * Binding note: SDK widgets expose no `c` controllerAs — everything the
 * template needs lands on `data`, and links use ng-href (never ng-click).
 */
data.heading = {
    title: 'Today',
    reo: 'I tēnei rā',
    link: 'See your week →',
    // "Your week" detail view is a later iteration (same as My place / Knowledge).
    href: '#'
};

data.cards = [
    {
        tone: 'active',
        pulse: true,
        tag: 'Conversation in progress',
        title: 'James is working on your wellbeing kōrero',
        sub: 'He replied to your message 2 hours ago and booked a triage chat for Thursday at 10am.',
        metaEmph: 'Thu 23 May',
        metaEmphPos: 'start',
        meta: '· 10:00 — 10:30 · Te Aro Wellbeing Centre'
    },
    {
        tone: 'resolved',
        pulse: false,
        tag: 'IT request · sorted yesterday',
        title: 'Eduroam set up on your new phone',
        sub: 'Otto walked you through it on Tuesday evening · works on campus and at halls.',
        meta: 'REQ001047 · ',
        metaEmph: 'Resolved',
        metaEmphPos: 'end'
    },
    {
        tone: 'coming',
        pulse: false,
        tag: 'Coming up',
        title: 'Assignment 2 due Friday',
        sub: 'FINA 201 · Financial statement analysis · 30%',
        meta: 'Need an extension? ',
        metaEmph: 'Ask Otto',
        metaEmphPos: 'end'
    }
];
