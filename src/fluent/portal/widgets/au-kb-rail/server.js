// KB rail widget - server script.
// v0.1: three hardcoded recommendations matching the design wireframe.
// Future: query kb_knowledge ranked by helpfulness/views per active module.
data.articles = [];

data.articles.push({
    id: 'kb-sleep',
    imageTone: 'a',
    topic: 'Wellbeing',
    title: "Sleep when your brain won't switch off - five small things that help",
    meta: '4 min - 312 students found this helpful',
    href: '?id=kb_article&kb_id=kb-sleep'
});

data.articles.push({
    id: 'kb-extension',
    imageTone: 'b',
    topic: 'Studying',
    title: 'How to ask for an extension without it feeling awkward',
    meta: '3 min - 587 students found this helpful',
    href: '?id=kb_article&kb_id=kb-extension'
});

data.articles.push({
    id: 'kb-hardship',
    imageTone: 'c',
    topic: 'Money',
    title: 'Hardship grants - what we offer and how to apply',
    meta: '5 min - Updated last week',
    href: '?id=kb_article&kb_id=kb-hardship'
});
