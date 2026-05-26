// au-hub-grid - server script.
// Publishes the hub intro and the six category cards. Cards resolve to
// kb_search queries today; will route to module-specific hub subpages
// once those exist.

data.intro = {
    eyebrow: 'Get help · Āwhina',
    title_lead: 'What do you need a',
    title_em: 'hand',
    title_trail: 'with today?',
    sub: "Five places to start. Each one has people, articles, and Otto's mode-specific help. If you're not sure where to look, just talk to Otto - they'll route you.",
    quick_strong: 'Not sure?',
    quick_text: "Tell Otto what's going on in your own words - they'll point you to the right place.",
    quick_cta: 'Talk to Otto',
    quick_href: '?id=kb_search&q=help'
};

data.cards = [
    {
        id: 'wellbeing',
        tone: 'wellbeing',
        icon: 'heart',
        cat: 'Wellbeing',
        cat_reo: 'Hauora',
        agent_strong: 'Otto',
        agent_text: 'listens, slows down',
        tasks: [
            "Talk to Otto about how you're feeling",
            'Book counselling or a triage chat',
            'Self-help articles and exercises',
            'Crisis support (24/7)'
        ],
        cta: 'Open Wellbeing',
        href: '?id=kb_search&q=wellbeing'
    },
    {
        id: 'studying',
        tone: 'studying',
        icon: 'cap',
        cat: 'Studying',
        cat_reo: 'Ako',
        agent_strong: '',
        agent_text: 'Otto can help here too · or your tutor',
        tasks: [
            'Ask for an extension',
            'Academic accommodation',
            'Reconsider a grade',
            'Exam preparation resources'
        ],
        cta: 'Open Studying',
        href: '?id=kb_search&q=extension'
    },
    {
        id: 'it',
        tone: 'it',
        icon: 'screen',
        cat: 'IT & tech',
        cat_reo: '[Te Reo TBC]',
        agent_strong: 'Otto',
        agent_text: 'quick and clear',
        tasks: [
            'Reset my password',
            'Connect to eduroam wifi',
            'Report a broken something',
            'Request software or access'
        ],
        cta: 'Open IT & tech',
        href: '?id=kb_search&q=password'
    },
    {
        id: 'money',
        tone: 'money',
        icon: 'wallet',
        cat: 'Money & fees',
        cat_reo: 'Pūtea',
        agent_strong: 'Otto',
        agent_text: 'routes to a real person fast',
        tasks: [
            'Check what I owe',
            'Set up a payment plan',
            'Apply for a hardship grant',
            'Scholarships and bursaries'
        ],
        cta: 'Open Money & fees',
        href: '?id=kb_search&q=hardship'
    },
    {
        id: 'admin',
        tone: 'admin',
        icon: 'doc',
        cat: 'Admin',
        cat_reo: 'Whakahaere',
        agent_strong: 'Otto',
        agent_text: 'routes to the right team',
        tasks: [
            'Request a transcript',
            'Letter of confirmation / visa',
            'Replace my student ID card',
            'Change my programme'
        ],
        cta: 'Open Admin',
        href: '?id=kb_search&q=transcript'
    },
    {
        id: 'otto',
        tone: 'otto',
        icon: 'chat',
        cat: 'Or just kōrero',
        cat_reo: 'Talk it out',
        agent_strong: '',
        agent_text: 'Otto will route you to the right place',
        tasks: [],
        blurb: "Don't know which category you're in? That's normal. Tell Otto what's going on in plain words - money trouble making it hard to study, a tech glitch that's wrecked your assignment, anything - and they'll get you to the right help fast.",
        cta: 'Talk to Otto',
        href: '?id=kb_search&q=help'
    }
];
