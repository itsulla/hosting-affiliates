import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
    DATA_CHECKED_ON,
    affiliatePrograms,
    aiTools,
    hostingPlatforms,
    registrars,
    toolsLandscape,
} from '../src/site-data.mjs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const isHttps = (value) => typeof value === 'string' && value.startsWith('https://');

test('publication registries are dated and carry first-party evidence', () => {
    assert.equal(DATA_CHECKED_ON, '2026-07-27');
    for (const [id, record] of Object.entries(aiTools)) {
        assert.equal(record.checkedOn, DATA_CHECKED_ON, `${id} checkedOn`);
        assert.ok(isHttps(record.source), `${id} source`);
        assert.equal('speed' in record, false, `${id} has unsupported speed score`);
        assert.equal('quality' in record, false, `${id} has unsupported quality score`);
    }
    for (const record of hostingPlatforms) {
        assert.equal(record.checkedOn, DATA_CHECKED_ON, `${record.name} checkedOn`);
        assert.ok(isHttps(record.source), `${record.name} source`);
        assert.equal('ease' in record, false, `${record.name} has unsupported ease score`);
    }
    for (const record of registrars) {
        assert.equal(record.checkedOn, DATA_CHECKED_ON, `${record.name} checkedOn`);
        assert.ok(isHttps(record.source), `${record.name} source`);
        assert.doesNotMatch(record.pricing, /\$\d/, `${record.name} embeds a volatile price`);
    }
    assert.equal(toolsLandscape.length, Object.keys(aiTools).length);
});

test('global publication labels no longer claim a March 2026 review', () => {
    assert.doesNotMatch(html, /(?:Updated|verified|reviewed) March 2026/i);
    assert.match(html, /(?:Updated|verified|reviewed) July 27, 2026/i);
});

test('every monetized registry record has a verified affiliate-program ledger entry', () => {
    const programNames = affiliatePrograms
        .filter((program) => program.verified)
        .map((program) => program.name);
    const monetizedRecords = [...hostingPlatforms, ...registrars].filter((record) => record.affiliate);

    for (const record of monetizedRecords) {
        assert.ok(
            programNames.some((name) => record.name === name || record.name.startsWith(`${name} `)),
            `${record.name} is monetized but missing from affiliatePrograms`,
        );
    }
});
