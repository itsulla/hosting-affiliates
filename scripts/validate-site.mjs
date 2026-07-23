import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cssPath = new URL('../styles.css', import.meta.url);
const jsPath = new URL('../site.js', import.meta.url);
const ogImagePath = new URL('../assets/og-card.png', import.meta.url);
const cname = fs.readFileSync(new URL('../CNAME', import.meta.url), 'utf8').trim();
const robots = fs.readFileSync(new URL('../robots.txt', import.meta.url), 'utf8');
const sitemap = fs.readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');
const failures = [];

const requireText = (needle, label = needle) => {
  if (!html.includes(needle)) failures.push(`missing: ${label}`);
};

requireText('<h1', 'primary heading');
requireText('id="view-stack-builder"', 'stack builder view');
requireText('id="view-deployment-matrix"', 'platform comparison view');
requireText('id="view-workflows"', 'deployment workflows view');
requireText('id="view-troubleshooting"', 'troubleshooting view');
requireText('id="view-domains"', 'domains view');
requireText('id="view-economics"', 'affiliate economics view');
requireText('Some outbound links are affiliate or referral links', 'visible affiliate disclosure');
requireText('How recommendations are made', 'recommendation methodology');
requireText('rel="sponsored nofollow noopener noreferrer"', 'sponsored-link relationship');
requireText('href="styles.css"', 'compiled stylesheet link');
requireText('src="site.js"', 'compiled application script link');
requireText('<link rel="canonical" href="https://deployapp.guide">', 'canonical URL');
requireText('https://deployapp.guide/assets/og-card.png', 'social preview image');

if (!fs.existsSync(cssPath)) failures.push('missing: compiled styles.css');
if (!fs.existsSync(jsPath)) failures.push('missing: compiled site.js');
if (!fs.existsSync(ogImagePath)) failures.push('missing: social preview image');
if ((html.match(/<h1\b/g) || []).length !== 1) failures.push('expected exactly one h1');
if (html.includes('cdn.tailwindcss.com')) failures.push('runtime Tailwind CDN is still present');
if (html.includes('cdnjs.cloudflare.com/ajax/libs/gsap')) failures.push('legacy GSAP dependency is still present');
if (html.includes('id="market-stats-bar"')) failures.push('unsupported market-stat strip is still present');
if (html.includes('id="orbit-container"') || html.includes('id="morph-canvas"')) failures.push('legacy decorative hero effects are still present');
if (cname !== 'deployapp.guide') failures.push(`unexpected CNAME: ${cname}`);
if (!robots.includes('https://deployapp.guide/sitemap.xml')) failures.push('robots.txt does not reference the canonical sitemap');
if (!sitemap.includes('<loc>https://deployapp.guide/</loc>')) failures.push('sitemap is missing the canonical home URL');

for (const [index, match] of [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].entries()) {
  try {
    JSON.parse(match[1]);
  } catch (error) {
    failures.push(`invalid JSON-LD block ${index + 1}: ${error.message}`);
  }
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) failures.push(`duplicate ids: ${duplicateIds.join(', ')}`);

for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  if (!/rel="[^"]*noopener/.test(match[0])) failures.push(`target=_blank link missing noopener: ${match[0].slice(0, 120)}`);
}

if (failures.length) {
  console.error('site validation: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`site validation: PASS (${ids.length} unique ids, ${html.length} HTML bytes)`);
