import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const source = fs.readFileSync(new URL('../src/site.js', import.meta.url), 'utf8');
const registry = fs.readFileSync(new URL('../src/site-data.mjs', import.meta.url), 'utf8');
const publication = `${html}\n${source}\n${registry}`;

test('publication freshness labels and structured data reflect the current review', () => {
    assert.doesNotMatch(publication, /Updated March 2026|Data (?:verified|reviewed) March 2026|2026-03-28/);
    assert.match(html, /Updated July 27, 2026/);
    assert.match(html, /"dateModified": "2026-07-27"/);
});

test('obsolete plan and workflow claims are absent', () => {
    assert.doesNotMatch(publication, /100GB BW, 300 build mins|No true free tier \(Trial \$5 credit|Basic \$5\/mo sleeps|~60 seconds|free tier allows commercial use/i);
    assert.doesNotMatch(publication, /Speed and code quality are inversely correlated|Apple Blocks Vibe Coding/i);
    assert.doesNotMatch(publication, /Most Generous Free Tier|Zero-config for Next\.js apps|No Dockerfile needed|Growing fast|Cloud from \$5\/mo/i);
    assert.doesNotMatch(html, /href=["']#stack-builder["']/);
    assert.match(html, /href=["']#view-stack-builder["']/);
});

test('error guidance avoids unsourced incident statistics and unsafe secret-copy advice', () => {
    assert.doesNotMatch(publication, /18,697|40[–-]48%|400\+ credits|50K free MAU|copy every key-value pair/i);
    assert.doesNotMatch(publication, /AI tools generate \.env files[\s\S]{0,160}excluded from Git/i);
    assert.match(source, /Never commit \.env files/i);
    assert.match(source, /server-side secret/i);
});
