import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), 'utf8');
const pages = ['about.html', 'contact.html', 'privacy.html', 'editorial-methodology.html', 'affiliate-disclosure.html'];

test('DeployApp publishes linked trust pages with a working public correction route', () => {
    const index = read('index.html');
    for (const page of pages) {
        assert.ok(fs.existsSync(new URL(page, root)), `${page} missing`);
        assert.match(index, new RegExp(`href=["']${page.replace('.', '\\.') }["']`));
    }
    assert.match(read('contact.html'), /https:\/\/github\.com\/itsulla\/hosting-affiliates\/issues/i);
    assert.match(read('privacy.html'), /analytics\.lekker\.design/i);
    assert.match(read('affiliate-disclosure.html'), /editorial independence/i);
});

test('DeployApp uses the central exactly-once tracker and carries low-PII affiliate dimensions', () => {
    const index = read('index.html');
    const source = read('src/site.js');
    assert.match(index, /analytics\.lekker\.design\/portfolio-events\.js/);
    assert.doesNotMatch(index, /affiliate-events\.js/);
    assert.match(source, /data-analytics-event=["']affiliate_click["']/);
    for (const field of ['provider', 'placement', 'tool', 'calculator-result', 'destination', 'relationship']) {
        assert.match(source, new RegExp(`data-analytics-${field}=`), `${field} missing`);
    }

    const sponsoredAnchors = [...index.matchAll(/<a\b[^>]*rel=["'][^"']*sponsored[^"']*["'][^>]*>/gi)].map((match) => match[0]);
    assert.ok(sponsoredAnchors.length > 0, 'expected static sponsored anchors');
    for (const anchor of sponsoredAnchors) {
        assert.match(anchor, /data-analytics-event=["']affiliate_click["']/);
        for (const field of ['provider', 'placement', 'tool', 'calculator-result', 'destination', 'relationship']) {
            assert.match(anchor, new RegExp(`data-analytics-${field}=`), `static ${field} missing`);
        }
    }
});

test('desktop exposes all tool choices and evidence links do not duplicate the external-link glyph', () => {
    const index = read('index.html');
    const source = read('src/site.js');
    const styles = read('src/styles.css');
    assert.match(index, /class="[^"]*lg:max-h-none[^"]*lg:overflow-visible[^"]*" id="tool-buttons"/);
    assert.doesNotMatch(source, /Official source ↗/);
    assert.doesNotMatch(styles, /a\[target=["']_blank["']\]::after/);
});
