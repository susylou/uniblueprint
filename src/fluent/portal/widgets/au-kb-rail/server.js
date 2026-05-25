// KB rail widget - server script.
// Queries the 3 featured KB articles by short_description (deterministic
// for demo purposes — represents Wellbeing / Studying / Money topics).
// When KB analytics are populated, this can switch to top-viewed.
data.articles = [];

var FEATURED = [
    { match: 'Talk to someone now', topic: 'Wellbeing', tone: 'a' },
    { match: 'Apply for an assignment extension', topic: 'Studying', tone: 'b' },
    { match: 'Hardship grants', topic: 'Money', tone: 'c' }
];

for (var i = 0; i < FEATURED.length; i++) {
    var f = FEATURED[i];
    var gr = new GlideRecord('kb_knowledge');
    gr.addQuery('short_description', 'STARTSWITH', f.match);
    gr.addQuery('workflow_state', 'published');
    gr.setLimit(1);
    gr.query();
    if (gr.next()) {
        data.articles.push({
            id: gr.getUniqueValue(),
            imageTone: f.tone,
            topic: f.topic,
            title: gr.short_description.toString(),
            meta: estimateMeta(gr),
            href: '?id=kb_article_view&sys_kb_id=' + gr.getUniqueValue()
        });
    }
}

function estimateMeta(gr) {
    // Use view count if available, else a reasonable placeholder.
    var views = parseInt(gr.sys_view_count || '0', 10);
    var bits = [];
    bits.push('4 min');
    if (views > 50) {
        bits.push(views + ' students found this helpful');
    } else {
        bits.push('Updated recently');
    }
    return bits.join(' - ');
}
