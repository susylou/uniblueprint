/**
 * Quick-actions widget — server script.
 * For v0.1 the four wellbeing cards are static. Future iterations will
 * read active modules from a contribution table and emit per-module cards.
 */
(function () {
    data.cards = [
        {
            id: 'counsellor',
            tone: 'teal',
            icon: 'people',
            title: 'Talk to a counsellor',
            sub: 'Book a confidential 1-on-1 — usually within 48 hours.',
            href: '?id=book-counsellor',
            external: false,
        },
        {
            id: 'self-check',
            tone: 'pounamu',
            icon: 'check',
            title: 'Try a wellbeing self-check',
            sub: 'A 5-minute reflection — see what kind of support might help right now.',
            href: '?id=self-check',
            external: false,
        },
        {
            id: 'articles',
            tone: 'gold',
            icon: 'book',
            title: 'Browse wellbeing articles',
            sub: 'Practical reads on stress, sleep, finances, relationships, study load.',
            href: '?id=knowledge&topic=wellbeing',
            external: false,
        },
        {
            id: 'urgent',
            tone: 'terra',
            icon: 'phone',
            title: 'Need help right now?',
            sub: 'Free, confidential, 24/7. Call or text 1737 — the national helpline.',
            href: 'tel:1737',
            external: true,
        },
    ];
})();
