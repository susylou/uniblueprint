// Quick-actions widget - server script.
// 4 hardcoded entry-point cards. Each resolves to a real destination -
// either a specific KB article (looked up by short_description) or a
// kb_search query, falling back to a placeholder href if the article
// isn't on this instance yet.
data.cards = [];

function articleHref(prefix, fallback) {
    var gr = new GlideRecord('kb_knowledge');
    gr.addQuery('short_description', 'STARTSWITH', prefix);
    gr.addQuery('workflow_state', 'published');
    gr.setLimit(1);
    gr.query();
    if (gr.next()) {
        return '?id=kb_article_view&sys_kb_id=' + gr.getUniqueValue();
    }
    return fallback;
}

data.cards.push({
    id: 'counsellor',
    tone: 'teal',
    icon: 'people',
    title: 'Talk to a counsellor',
    sub: 'Book a confidential 1-on-1 - usually within 48 hours.',
    href: articleHref('Talk to someone now', '?id=kb_search&q=counselling'),
    external: false
});

data.cards.push({
    id: 'self-check',
    tone: 'pounamu',
    icon: 'check',
    title: 'Try a wellbeing self-check',
    sub: 'A 5-minute reflection - see what kind of support might help right now.',
    href: '?id=otto',
    external: false
});

data.cards.push({
    id: 'articles',
    tone: 'gold',
    icon: 'book',
    title: 'Browse wellbeing articles',
    sub: 'Practical reads on stress, sleep, finances, relationships, study load.',
    href: '?id=kb_search&q=wellbeing',
    external: false
});

data.cards.push({
    id: 'urgent',
    tone: 'terra',
    icon: 'phone',
    title: 'Need help right now?',
    sub: 'Free, confidential, 24/7. Call or text 1737 - the national helpline.',
    href: 'tel:1737',
    external: true
});
