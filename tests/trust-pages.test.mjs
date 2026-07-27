import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const pages = {
    'about.html': /independent/i,
    'contact.html': /https:\/\/github\.com\/itsulla\/hosting-affiliates\/issues/i,
    'privacy.html': /analytics\.lekker\.design/i,
    'editorial-methodology.html': /first-party/i,
    'affiliate-disclosure.html': /commission|referral/i,
};

test('DeployApp publishes complete, linked trust pages', () => {
    const home = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    for (const [file, expected] of Object.entries(pages)) {
        const page = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
        assert.match(page, /<title>[^<]+<\/title>/i, `${file} title`);
        assert.match(page, /href="\/"/, `${file} home link`);
        assert.match(page, expected, `${file} required disclosure`);
        assert.match(home, new RegExp(`href=["']${file.replace('.', '\\.')}["']`), `${file} footer link`);
    }
});
