/**
 * Upload Aotearoa Uni KB content to a ServiceNow instance.
 *
 * - Reads all .md files in kb-content/student-services and kb-content/it
 * - Parses frontmatter (title, topic, read_time_minutes, etc.)
 * - Converts the markdown body to ServiceNow-compatible HTML
 * - Creates two kb_knowledge_base records (idempotent: looks up by title first)
 * - Creates kb_knowledge articles, one per .md file (idempotent: looks up by short_description)
 * - Publishes each article (workflow_state=published)
 *
 * Usage:
 *   node tools/upload-kb.js
 *
 * Env vars expected (set them in your shell before running):
 *   SN_INSTANCE   e.g. dev377833.service-now.com
 *   SN_USER       e.g. admin
 *   SN_PASSWORD   e.g. your-admin-password
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const INSTANCE = process.env.SN_INSTANCE;
const USER = process.env.SN_USER;
const PASS = process.env.SN_PASSWORD;

if (!INSTANCE || !USER || !PASS) {
    console.error('Missing required env vars: SN_INSTANCE, SN_USER, SN_PASSWORD');
    process.exit(1);
}

const AUTH = 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64');

const KB_SETS = [
    {
        title: 'Aotearoa Student Services',
        description: 'Student wellbeing, academic and pastoral knowledge.',
        srcDir: path.join(__dirname, '..', 'kb-content', 'student-services'),
    },
    {
        title: 'Aotearoa IT',
        description: 'IT and digital self-service knowledge for students.',
        srcDir: path.join(__dirname, '..', 'kb-content', 'it'),
    },
];

// ---------- HTTP helper ----------

function snRequest(method, urlPath, body) {
    return new Promise((resolve, reject) => {
        const data = body ? JSON.stringify(body) : null;
        const opts = {
            hostname: INSTANCE,
            path: urlPath,
            method,
            headers: {
                Authorization: AUTH,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        if (data) opts.headers['Content-Length'] = Buffer.byteLength(data);

        const req = https.request(opts, (res) => {
            let chunks = '';
            res.on('data', (c) => (chunks += c));
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(chunks));
                } else {
                    reject(new Error(`${method} ${urlPath} -> ${res.statusCode}: ${chunks}`));
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

// ---------- Frontmatter + markdown ----------

function parseFrontmatter(src) {
    const m = src.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!m) return { meta: {}, body: src };
    const meta = {};
    m[1].split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            const k = line.slice(0, idx).trim();
            let v = line.slice(idx + 1).trim();
            if (/^\d+$/.test(v)) v = Number(v);
            meta[k] = v;
        }
    });
    return { meta, body: m[2] };
}

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineFormat(line) {
    let s = escapeHtml(line);
    // Inline code first
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic (avoid greedy)
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    // Markdown links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return s;
}

function markdownToHtml(md) {
    const lines = md.split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];

        // Headings
        const h = line.match(/^(#{1,4})\s+(.+)$/);
        if (h) {
            const lvl = h[1].length;
            out.push(`<h${lvl}>${inlineFormat(h[2])}</h${lvl}>`);
            i++;
            continue;
        }

        // Numbered list
        if (/^\d+\.\s+/.test(line)) {
            out.push('<ol>');
            while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
                const item = lines[i].replace(/^\d+\.\s+/, '');
                out.push(`<li>${inlineFormat(item)}</li>`);
                i++;
            }
            out.push('</ol>');
            continue;
        }

        // Bullet list
        if (/^[-*]\s+/.test(line)) {
            out.push('<ul>');
            while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
                const item = lines[i].replace(/^[-*]\s+/, '');
                out.push(`<li>${inlineFormat(item)}</li>`);
                i++;
            }
            out.push('</ul>');
            continue;
        }

        // Blank line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Paragraph (collect until blank line or block start)
        const para = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !/^(#{1,4})\s/.test(lines[i]) &&
            !/^\d+\.\s/.test(lines[i]) &&
            !/^[-*]\s/.test(lines[i])
        ) {
            para.push(lines[i]);
            i++;
        }
        if (para.length) {
            out.push(`<p>${inlineFormat(para.join(' '))}</p>`);
        }
    }
    return out.join('\n');
}

// ---------- SN helpers ----------

async function findOrCreateKb(title, description) {
    const q = encodeURIComponent(`title=${title}`);
    const existing = await snRequest(
        'GET',
        `/api/now/table/kb_knowledge_base?sysparm_query=${q}&sysparm_limit=1`
    );
    if (existing.result.length) {
        console.log(`  KB exists: ${title} (${existing.result[0].sys_id})`);
        return existing.result[0].sys_id;
    }
    const created = await snRequest('POST', '/api/now/table/kb_knowledge_base', {
        title,
        description,
        active: 'true',
    });
    console.log(`  KB created: ${title} (${created.result.sys_id})`);
    return created.result.sys_id;
}

async function findOrCreateArticle(kbId, meta, htmlBody) {
    const q = encodeURIComponent(
        `kb_knowledge_base=${kbId}^short_description=${meta.title}`
    );
    const existing = await snRequest(
        'GET',
        `/api/now/table/kb_knowledge?sysparm_query=${q}&sysparm_limit=1`
    );
    const payload = {
        kb_knowledge_base: kbId,
        short_description: meta.title,
        text: htmlBody,
        workflow_state: 'published',
        active: 'true',
        meta: `Topic: ${meta.topic || ''} | Read: ${meta.read_time_minutes || ''} min`,
    };
    if (existing.result.length) {
        const id = existing.result[0].sys_id;
        await snRequest('PUT', `/api/now/table/kb_knowledge/${id}`, payload);
        console.log(`    Updated: ${meta.title}`);
        return id;
    }
    const created = await snRequest('POST', '/api/now/table/kb_knowledge', payload);
    console.log(`    Created: ${meta.title}`);
    return created.result.sys_id;
}

// ---------- main ----------

(async () => {
    console.log(`Uploading to ${INSTANCE} as ${USER}\n`);
    let totalArticles = 0;
    let failures = [];

    for (const set of KB_SETS) {
        console.log(`Knowledge Base: ${set.title}`);
        const kbId = await findOrCreateKb(set.title, set.description);

        const files = fs
            .readdirSync(set.srcDir)
            .filter((f) => f.endsWith('.md'))
            .sort();

        for (const fname of files) {
            const fpath = path.join(set.srcDir, fname);
            const src = fs.readFileSync(fpath, 'utf8');
            const { meta, body } = parseFrontmatter(src);
            if (!meta.title) {
                failures.push(`${fname}: missing title in frontmatter`);
                continue;
            }
            const html = markdownToHtml(body);
            try {
                await findOrCreateArticle(kbId, meta, html);
                totalArticles++;
            } catch (e) {
                failures.push(`${fname}: ${e.message}`);
            }
        }
        console.log('');
    }

    console.log(`\nDone. ${totalArticles} articles processed.`);
    if (failures.length) {
        console.log(`\nFailures (${failures.length}):`);
        failures.forEach((f) => console.log(`  - ${f}`));
        process.exit(1);
    }
})();
