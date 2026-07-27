import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const source = [
    fs.readFileSync(new URL('../src/site.js', import.meta.url), 'utf8'),
    fs.readFileSync(new URL('../src/site-data.mjs', import.meta.url), 'utf8'),
].join('\n');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const disclosure = fs.readFileSync(new URL('../affiliate-disclosure.html', import.meta.url), 'utf8');

const DIGITALOCEAN_REFERRAL = 'https://m.do.co/c/0ac1da4ad477';
const HOSTINGER_REFERRAL = 'https://www.hostinger.com?REFERRALCODE=SNPULRICHICN';

test('DeployApp uses the confirmed direct DigitalOcean and Hostinger referral links', () => {
    assert.match(source, new RegExp(DIGITALOCEAN_REFERRAL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(source, new RegExp(HOSTINGER_REFERRAL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(source, /DigitalOcean[\s\S]{0,500}Active direct referral/);
    assert.match(source, /Hostinger[\s\S]{0,500}Active direct referral/);
});

test('active Impact relationships are represented in both the ledger and disclosure', () => {
    for (const provider of ['Bluehost', 'Namecheap']) {
        assert.match(source, new RegExp(`name:\\s*['"]${provider}['"][\\s\\S]{0,500}status:\\s*['"]Active Impact affiliate['"]`));
        assert.match(disclosure, new RegExp(provider));
    }
    assert.match(html, /Active affiliate accounts:<\/strong>\s*Railway directly; Bluehost and Namecheap through Impact\./);
});

test('unapproved or unsuitable programs are not represented as active monetization', () => {
    assert.match(source, /name:\s*['"]Liquid Web['"][\s\S]{0,500}status:\s*['"]Not approved['"]/);
    assert.match(source, /name:\s*['"]Liquid Web['"][\s\S]{0,500}source:\s*null/);
    assert.doesNotMatch(source, /name:\s*['"]Liquid Web['"][\s\S]{0,500}verified:\s*true/);
    assert.match(source, /name:\s*['"]Vultr['"][\s\S]{0,500}status:\s*['"]Not approved['"]/);
    assert.match(source, /name:\s*['"]Vultr['"][\s\S]{0,500}source:\s*null/);
    assert.doesNotMatch(source, /name:\s*['"]Vultr['"][\s\S]{0,500}verified:\s*true/);
    assert.doesNotMatch(source, /name:\s*['"]Kinsta['"][\s\S]{0,500}verified:\s*true/);
    assert.doesNotMatch(source, /vultr\.com\/[^"']*\?ref=/i);
});

test('deployment instructions inspect staged files instead of blindly staging the project', () => {
    assert.doesNotMatch(html, /git add \.(?:\s|&|<)/);
    assert.doesNotMatch(html, /gh repo create my-app --public/);
    assert.equal((html.match(/gh repo create my-app --private --push/g) || []).length, 2);
    assert.match(html, /git status --short/);
    assert.match(html, /git diff --cached --name-only/);
    assert.match(html, /\.env\.\*/);
});

test('mobile guidance does not claim Apple broadly blocks vibe-coded apps', () => {
    assert.doesNotMatch(source, /Apple is blocking|Apple Blocks Vibe Coding/i);
    assert.doesNotMatch(source, /external code loading violates.*2\.5\.2/i);
});

test('deployment guidance never instructs readers to copy every environment value', () => {
    assert.doesNotMatch(html, /add every key-value|add all keys from your|add all \.env keys/i);
    assert.match(html, /minimum required server-side variables/i);
});

test('affiliate links carry explicit, contextual analytics dimensions', () => {
    assert.match(source, /data-analytics-event="affiliate_click"/);
    assert.match(source, /data-analytics-provider=/);
    assert.match(source, /data-analytics-relationship=/);
    assert.match(source, /data-analytics-destination=/);
    assert.match(source, /data-analytics-placement=/);
    assert.match(source, /data-analytics-tool=/);
    assert.doesNotMatch(source, /window\.umami\.track\(['"]affiliate_click/);
});

test('publication uses only the central analytics path and omits Kinsta customer-facing copy', () => {
    assert.doesNotMatch(source, /googletagmanager\.com|impactcdn\.com|impactStat/);
    assert.doesNotMatch(`${html}\n${disclosure}`, /Kinsta/i);
});
