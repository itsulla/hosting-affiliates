// =============================================
// DATA
// =============================================

import { aiTools, toolsLandscape, hostingPlatforms, registrars, affiliatePrograms } from './site-data.mjs';

const deployErrors = [
    {
        num: 1, title: "Missing Environment Variables",
        icon: "\uD83D\uDD11", severity: "critical",
        desc: "Local environment files are not a production secret store, and a deployed service does not automatically inherit values from a developer machine.",
        fix: "Inventory only the variables the app actually needs. Store secrets in the host's server-side secret manager, expose client-prefixed values only when they are intentionally public, and verify access with least privilege. Never commit .env files; rotate any credential that was exposed.",
        example: "App builds successfully but returns 500 errors or blank pages because the database connection string is missing."
    },
    {
        num: 2, title: "Hardcoded localhost API URLs",
        icon: "\uD83D\uDD17", severity: "critical",
        desc: "Generated code can retain a local development endpoint such as http://localhost:3000. In production, that points to the visitor's machine rather than the deployed backend.",
        fix: "Use relative paths (/api/data) or dynamic env vars (process.env.NEXT_PUBLIC_API_URL) so URLs adapt to the hosting environment.",
        example: "CORS errors, connection timeouts, or 'fetch failed' in the browser console."
    },
    {
        num: 3, title: "Wrong Output Directory",
        icon: "\uD83D\uDCC1", severity: "high",
        desc: "Platforms look for compiled assets in a specific folder (dist, build, .next). AI generators sometimes configure non-standard output paths that don't match the platform's expectation.",
        fix: "Check your package.json build script output and match it in the platform's build settings. Vite defaults to dist, CRA to build, Next.js to .next.",
        example: "'Missing output directory' error during deployment build."
    },
    {
        num: 4, title: "Context Window Collapse",
        icon: "\uD83E\uDDE0", severity: "high",
        desc: "Long prompts, accumulated edits, and large dependency trees can reduce consistency in browser-based builders. Treat generated changes as proposals that still require review.",
        fix: "Export to Cursor/Windsurf early when complexity grows. Prune unused files aggressively. Break large features into separate sessions.",
        example: "'Prompt size exceeded' errors or Out of Memory crashes in the browser."
    },
    {
        num: 5, title: "SPA Routing 404 Errors",
        icon: "\uD83D\uDD00", severity: "high",
        desc: "Single Page Apps (React, Vue) work fine when navigating via buttons, but refreshing or directly accessing a URL like /dashboard returns a 404 \u2014 the server looks for a literal HTML file that doesn't exist.",
        fix: "Add a catch-all rewrite rule. On Netlify, create a _redirects file with: /* /index.html 200. On Vercel, add a rewrites config in vercel.json.",
        example: "App works when you click around, but breaks when you refresh or share a deep link."
    },
    {
        num: 6, title: "WebContainer OOM Crashes",
        icon: "\uD83D\uDCA5", severity: "medium",
        desc: "Bolt.new and similar tools run Node.js in the browser via WebContainers. Heavy node_modules or complex builds exceed the browser's RAM limits.",
        fix: "Clear caches, disable heavy browser extensions (ad blockers), keep architecture lean. For large projects, export to a local IDE.",
        example: "Browser tab freezes, 'Out of Memory' errors during npm install in the browser."
    },
    {
        num: 7, title: "Missing Security / Inverted Auth",
        icon: "\uD83D\uDD13", severity: "critical",
        desc: "Generated authentication and authorization code can omit database policies, confuse identity with authorization, or invert role checks. A functioning login screen is not proof of access control.",
        fix: "Always verify RLS policies in Supabase, test auth flows with a logged-out user, and run a basic security audit before going live.",
        example: "App works perfectly but any user can access admin endpoints or view other users' data."
    },
    {
        num: 8, title: "Blocked External Assets (CSP)",
        icon: "\uD83D\uDDBC\uFE0F", severity: "medium",
        desc: "AI tools reference CDNs and placeholder image services (Unsplash, etc). Strict Content Security Policies on hosting platforms may block these external HTTP requests.",
        fix: "Whitelist external domains in your security headers, or download and serve assets locally from your project's /public folder.",
        example: "App builds successfully but renders blank sections or broken images."
    },
    {
        num: 9, title: "Dependency Conflicts",
        icon: "\uD83D\uDCE6", severity: "medium",
        desc: "AI agents hallucinate npm packages or combine incompatible library versions (e.g., React 18 features in a React 17 project). Strict CI/CD pipelines halt the build.",
        fix: "Manually audit package.json. Run npm ls to check for version conflicts. Pin dependency versions explicitly.",
        example: "'Could not resolve dependency' or 'peer dependency conflict' during build."
    },
    {
        num: 10, title: "Endless Scope Creep (Never Ships)",
        icon: "\u267E\uFE0F", severity: "meta",
        desc: "Not a technical error \u2014 the #1 reason vibe-coded apps never go live. The frictionless nature of AI prompting creates a trap: builders endlessly add features instead of deploying an MVP.",
        fix: "Define your MVP features BEFORE starting. Deploy early with core functionality. Add features in subsequent versions after the first version is live.",
        example: "Context window eventually collapses, rendering the project un-deployable after weeks of feature additions."
    },
    {
        num: 11, title: "SQLite Database Vanishes on Deploy",
        icon: "\uD83D\uDDC4\uFE0F", severity: "critical",
        desc: "AI tools (Cursor, Claude Code) default to SQLite which works locally but breaks on Vercel, Netlify, and all serverless platforms. The filesystem is ephemeral \u2014 your database file is deleted on every deploy.",
        fix: "Migrate to a hosted database: Supabase (Postgres), Neon (serverless Postgres), or Turso (SQLite at the edge). Or deploy to Railway/Render with persistent disk storage. Never use local SQLite in production on serverless.",
        example: "App works after deploy but all data disappears on the next deployment or after the container restarts.",
        tools: ["Cursor", "Claude Code", "Windsurf"]
    },
    {
        num: 12, title: "Authorization Was Not Adversarially Tested",
        icon: "🛡️", severity: "critical",
        desc: "A generated app can pass the happy-path login test while still exposing another user's records, an admin route, or a backend action to the wrong role.",
        fix: "Write a role matrix, test logged-out and cross-tenant requests, inspect backend authorization and database policies, and deny access by default. Do not rely on hidden UI controls as authorization.",
        example: "A normal user cannot see an admin button but can still call its backend endpoint directly.",
        tools: ["All app builders and coding agents"]
    },
    {
        num: 13, title: "Paid Repair Loop Without a Stop Rule",
        icon: "🔥", severity: "high",
        desc: "Repeated automated fixes can consume credits while changing symptoms instead of identifying the root cause.",
        fix: "Set a spend and attempt limit before debugging. Capture the first reproducible error, inspect logs and diffs, revert speculative changes, and switch to manual diagnosis when the limit is reached.",
        example: "Several paid attempts alter unrelated files but the original failing request still reproduces.",
        tools: ["Credit-metered builders and coding agents"]
    },
    {
        num: 14, title: "Vendor Lock-in: Can't Export Code",
        icon: "\uD83D\uDD12", severity: "high",
        desc: "Generated projects can depend on platform-specific services, build settings, environment variables, or deployment adapters. Portability varies by the exported project and integrations used.",
        fix: "Export to a private Git repository early. Run the project locally, document required services and variables, and test a second deployment target before treating the stack as portable.",
        example: "Exported Bolt.new project fails to build locally due to missing platform-specific dependencies and hardcoded internal URLs.",
        tools: ["Replit", "Bolt.new"]
    },
    {
        num: 15, title: "Native App Review and Distribution Requirements",
        icon: "\uD83C\uDF4E", severity: "high",
        desc: "Generated mobile code is reviewed under the same current store rules as other apps. Build provenance does not replace requirements around privacy, account deletion, payments, permissions, content, and executable-code behavior.",
        fix: "Review the current Apple App Review Guidelines and Google Play policies, inspect generated dependencies and runtime code-loading behavior, test a signed release build, and keep reviewer notes and privacy disclosures accurate.",
        example: "A release build works locally but review identifies a missing disclosure, unsupported payment flow, permission issue, or runtime behavior that was not tested.",
        tools: ["Replit", "Natively", "All mobile builders"]
    }
];

// =============================================
// DOM ELEMENTS
// =============================================
const toolButtonsContainer = document.getElementById('tool-buttons');
const stateEmpty = document.getElementById('recommendation-state-empty');
const stateFilled = document.getElementById('recommendation-state-filled');
const matrixBody = document.getElementById('matrix-body');

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    renderToolButtons();
    renderToolsLandscape();
    renderMatrix('all');
    renderRegistrars();
    renderErrors();
    renderAffiliateCards();
    initFilterListeners();
    initWorkflowListeners();

    initEditorialMotion();
    initHashNavigation();
    enhanceInteractiveControls();
});

function initEditorialMotion() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.fade-up').forEach((element) => observer.observe(element));
    requestAnimationFrame(() => revealVisibleElements(document));
}

function revealVisibleElements(root) {
    root.querySelectorAll?.('.fade-up').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) element.classList.add('is-visible');
    });
}

function initHashNavigation() {
    const applyViewFromLocation = () => {
        const requestedView = window.location.hash.replace('#', '');
        const viewId = document.getElementById(`view-${requestedView}`) ? requestedView : 'stack-builder';
        nav(viewId, { scroll: false, updateHistory: false });
    };

    applyViewFromLocation();
    window.addEventListener('hashchange', applyViewFromLocation);
    window.addEventListener('popstate', applyViewFromLocation);
}

function enhanceInteractiveControls() {
    document.querySelectorAll('details').forEach((detail) => {
        const summary = detail.querySelector('summary');
        if (!summary) return;
        summary.setAttribute('aria-expanded', detail.open ? 'true' : 'false');
        detail.addEventListener('toggle', () => summary.setAttribute('aria-expanded', detail.open ? 'true' : 'false'));
    });
}

// =============================================
// MOBILE MENU + VIEW NAVIGATION
// =============================================
function toggleMobileMenu(forceOpen, restoreFocus = true) {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const trigger = document.getElementById('hamburger-btn');
    const open = typeof forceOpen === 'boolean' ? forceOpen : !menu.classList.contains('open');

    menu.classList.toggle('open', open);
    menu.toggleAttribute('inert', !open);
    overlay.classList.toggle('hidden', !open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    trigger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);

    [
        document.querySelector('.nav-shell'),
        document.getElementById('hero-section'),
        document.getElementById('editorial-standards'),
        document.getElementById('main-content'),
        document.querySelector('.site-footer')
    ].filter(Boolean).forEach((region) => region.toggleAttribute('inert', open));

    if (open) {
        requestAnimationFrame(() => menu.querySelector('.menu-close')?.focus());
    } else if (restoreFocus && menu.contains(document.activeElement)) {
        trigger.focus();
    }
}

document.addEventListener('keydown', (event) => {
    const menu = document.getElementById('mobile-menu');
    if (!menu?.classList.contains('open')) return;

    if (event.key === 'Escape') {
        toggleMobileMenu(false);
        return;
    }

    if (event.key === 'Tab') {
        const focusable = [...menu.querySelectorAll('button:not([disabled]), a[href]')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

function nav(viewId, options = {}) {
    const view = document.getElementById(`view-${viewId}`);
    if (!view) return;
    const shouldScroll = options.scroll !== false;
    const shouldUpdateHistory = options.updateHistory !== false;

    document.querySelectorAll('[data-view]').forEach((button) => {
        const active = button.dataset.view === viewId;
        button.classList.toggle('is-active', active);
        button.toggleAttribute('aria-current', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.querySelectorAll('.view-section').forEach((section) => {
        const active = section === view;
        section.classList.toggle('hidden', !active);
        section.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    if (shouldUpdateHistory && window.location.hash !== `#${viewId}`) {
        history.pushState({ viewId }, '', `#${viewId}`);
    }

    toggleMobileMenu(false, false);
    revealVisibleElements(view);
    if (viewId === 'economics') loadAffiliateChart();

    if (shouldScroll) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: document.getElementById('main-content').offsetTop - 68,
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }
}

// =============================================
// VIEW 1: STACK BUILDER
// =============================================
function renderToolButtons() {
    Object.keys(aiTools).forEach(key => {
        const tool = aiTools[key];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-pressed', 'false');
        btn.className = "w-full text-left px-3 py-2.5 border border-slate-200 rounded-xl hover:border-primary hover:bg-emerald-50/50 transition-all duration-200 flex items-center group";
        btn.onclick = () => selectTool(key, btn);
        btn.innerHTML = `
            <span class="text-xl w-8 text-center shrink-0">${tool.icon}</span>
            <div class="ml-1 min-w-0">
                <div class="font-bold text-sm text-dark group-hover:text-primary transition">${tool.name}</div>
                <div class="text-xs text-muted truncate">${tool.output}</div>
            </div>
        `;
        toolButtonsContainer.appendChild(btn);
    });
}

function selectTool(toolKey, btnElement) {
    const buttons = toolButtonsContainer.querySelectorAll('button');
    buttons.forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('tool-btn-active');
        b.classList.add('border-slate-200');
    });
    btnElement.setAttribute('aria-pressed', 'true');
    btnElement.classList.remove('border-slate-200');
    btnElement.classList.add('tool-btn-active');

    const d = aiTools[toolKey];

    document.getElementById('rec-tool-icon').innerText = d.icon;
    document.getElementById('rec-tool-name').innerText = d.name;
    document.getElementById('rec-tool-desc').innerText = d.desc;
    document.getElementById('rec-tool-output').innerText = d.output;
    document.getElementById('rec-tool-pricing').innerText = d.pricing;
    document.getElementById('rec-tool-evidence').innerText = `Checked ${d.checkedOn}`;

    document.getElementById('rec-host-name').innerText = d.hostName;
    document.getElementById('rec-host-desc').innerText = d.hostDesc;
    document.getElementById('rec-host-icon').innerText = d.hostIcon;
    document.getElementById('rec-db-name').innerText = d.dbName;
    document.getElementById('rec-db-desc').innerText = d.dbDesc;
    document.getElementById('rec-db-icon').innerText = d.dbIcon;
    document.getElementById('rec-rationale').innerText = d.rationale;

    const nativeEl = document.getElementById('rec-native-deploy');
    const nativeDescEl = document.getElementById('rec-native-desc');
    if (d.nativeDeploy) {
        nativeEl.classList.remove('hidden');
        nativeDescEl.innerText = d.nativeDeploy;
    } else {
        nativeEl.classList.add('hidden');
    }

    stateEmpty.classList.add('hidden');
    stateFilled.classList.remove('fade-in');
    void stateFilled.offsetWidth;
    stateFilled.classList.add('fade-in');
    stateFilled.classList.remove('hidden');
}

function renderToolsLandscape() {
    const body = document.getElementById('tools-landscape-body');
    const typeColors = {
        'AI IDE': 'bg-blue-100 text-blue-700',
        'AI Agent': 'bg-purple-100 text-purple-700',
        'UI Generator': 'bg-emerald-100 text-emerald-700',
        'App Builder': 'bg-emerald-100 text-emerald-700',
        'Cloud IDE': 'bg-cyan-100 text-cyan-700',
        'No-Code/AI': 'bg-amber-100 text-amber-700',
        'Mobile Builder': 'bg-rose-100 text-rose-700',
        'Agent Platform': 'bg-teal-100 text-teal-700',
    };
    toolsLandscape.forEach((t, i) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50/80 transition";
        const typeColor = typeColors[t.type] || 'bg-slate-100 text-slate-600';
        row.innerHTML = `
            <td class="px-4 py-3.5 text-sm font-bold text-dark">${t.name}</td>
            <td class="px-4 py-3.5 text-sm"><span class="px-2 py-0.5 rounded-full text-xs font-medium ${typeColor}">${t.type}</span></td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.output}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.pricing}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.workflow}</td>
            <td class="px-4 py-3.5 text-sm"><a href="${t.source}" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">Official source</a><div class="text-xs text-muted mt-1">${t.checkedOn}</div></td>
        `;
        body.appendChild(row);
    });
}

// =============================================
// VIEW 2: PLATFORM MATRIX
// =============================================
function renderMatrix(filterType) {
    matrixBody.innerHTML = '';
    const filtered = hostingPlatforms.filter(p => filterType === 'all' || p.type === filterType);
    filtered.forEach((p, i) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50/80 transition";
        const commColor = /non-commercial/i.test(p.commercial)
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        const destination = p.url || p.source;
        const destinationRel = p.affiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';
        row.innerHTML = `
            <td class="px-4 py-4 whitespace-nowrap text-sm"><a href="${destination}" target="_blank" rel="${destinationRel}" ${p.affiliate ? `data-analytics-event="affiliate_click" data-analytics-provider="${p.name}" data-analytics-relationship="${p.relationship}" data-analytics-destination="hosting_platform" data-analytics-placement="comparison_table" data-analytics-tool="all_tools" data-analytics-calculator-result="not_used"` : ''} class="font-bold text-primary hover:underline">${p.name}</a>${p.affiliate ? '<div class="text-[10px] text-amber-700 mt-1">Referral link</div>' : ''}</td>
            <td class="px-4 py-4 text-sm text-muted">${p.bestFor}</td>
            <td class="px-4 py-4 text-sm text-muted">${p.free}</td>
            <td class="px-4 py-4 whitespace-nowrap"><span class="px-2.5 py-1 text-xs font-semibold rounded-full ${commColor}">${p.commercial}</span></td>
            <td class="px-4 py-4 text-sm text-muted max-w-[240px]">${p.lifecycle}<span class="block mt-1 text-xs text-slate-400">${p.note}</span></td>
            <td class="px-4 py-4 text-sm text-muted">${p.deployment}</td>
            <td class="px-4 py-4 text-sm text-muted">${p.db}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-muted">${p.docker}</td>
            <td class="px-4 py-4 text-sm"><a href="${p.source}" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">Official source</a><div class="text-xs text-muted mt-1">${p.checkedOn}</div></td>
        `;
        matrixBody.appendChild(row);
    });
}

function initFilterListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-dark', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            e.target.classList.remove('bg-slate-100', 'text-slate-600');
            e.target.classList.add('active', 'bg-dark', 'text-white');
            renderMatrix(e.target.getAttribute('data-filter'));
        });
    });
}

// =============================================
// VIEW 3: WORKFLOWS
// =============================================
function initWorkflowListeners() {
    document.querySelectorAll('.wf-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.wf-btn').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            e.target.classList.remove('bg-slate-100', 'text-slate-600');
            e.target.classList.add('active', 'bg-primary', 'text-white');
            const wfId = e.target.getAttribute('data-wf');
            document.querySelectorAll('.wf-content').forEach(c => c.classList.add('hidden'));
            const el = document.getElementById(`wf-${wfId}`);
            el.classList.remove('hidden', 'fade-in');
            void el.offsetWidth;
            el.classList.add('fade-in');
        });
    });
}

// =============================================
// VIEW 4: TROUBLESHOOTING
// =============================================
function renderErrors() {
    const container = document.getElementById('errors-container');
    deployErrors.forEach(err => {
        let sevColor = "bg-red-50 text-red-700 border-red-200";
        let sevDot = "bg-red-500";
        if (err.severity === "high") { sevColor = "bg-orange-50 text-orange-700 border-orange-200"; sevDot = "bg-orange-500"; }
        if (err.severity === "medium") { sevColor = "bg-amber-50 text-amber-700 border-amber-200"; sevDot = "bg-amber-500"; }
        if (err.severity === "meta") { sevColor = "bg-teal-50 text-teal-700 border-teal-200"; sevDot = "bg-teal-500"; }

        const card = document.createElement('details');
        card.className = "error-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden";
        card.innerHTML = `
            <summary class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <span class="text-lg">${err.icon}</span>
                </div>
                <div class="flex-grow min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-bold text-dark text-sm">#${err.num}. ${err.title}</span>
                        <span class="px-2 py-0.5 text-xs font-semibold rounded-full border ${sevColor} flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full ${sevDot}"></span>
                            ${err.severity}
                        </span>
                    </div>
                    <p class="text-xs text-muted mt-0.5 truncate">${err.example}</p>
                </div>
                <svg class="w-5 h-5 text-slate-300 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </summary>
            <div class="px-6 pb-6 pt-3 border-t border-slate-100">
                <div class="mb-4">
                    <h4 class="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">What Happens</h4>
                    <p class="text-sm text-slate-700 leading-relaxed">${err.desc}</p>
                </div>
                <div class="mb-4">
                    <h4 class="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Looks Like</h4>
                    <p class="text-sm text-slate-500 italic">"${err.example}"</p>
                </div>
                <div class="bg-emerald-50 border border-emerald-200/60 p-4 rounded-xl">
                    <h4 class="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1.5">How to Fix</h4>
                    <p class="text-sm text-emerald-700 leading-relaxed">${err.fix}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// =============================================
// VIEW 5: DOMAINS
// =============================================
function renderRegistrars() {
    const body = document.getElementById('registrar-body');
    registrars.forEach((r, i) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50/80 transition";
        const nameLabel = r.url
            ? `<a href="${r.url}" target="_blank" rel="${r.affiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'}" ${r.affiliate ? `data-analytics-event="affiliate_click" data-analytics-provider="${r.name}" data-analytics-relationship="${r.relationship}" data-analytics-destination="domain_registrar" data-analytics-placement="registrar_table" data-analytics-tool="all_tools" data-analytics-calculator-result="not_used"` : ''} class="font-bold text-primary hover:underline">${r.name}</a>`
            : `<span class="font-bold text-dark">${r.name}</span>`;
        const nameHtml = r.best
            ? `${nameLabel} <span class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full ml-1 font-medium">Best</span>`
            : nameLabel;
        row.innerHTML = `
            <td class="px-4 py-3.5 text-sm whitespace-nowrap">${nameHtml}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${r.pricing}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${r.privacy}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${r.dns}</td>
            <td class="px-4 py-3.5 text-sm text-muted max-w-[250px]">${r.note}</td>
            <td class="px-4 py-3.5 text-sm"><a href="${r.source}" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">Official source</a><div class="text-xs text-muted mt-1">${r.checkedOn}</div></td>
        `;
        body.appendChild(row);
    });
}

// =============================================
// VIEW 6: AFFILIATE ECONOMICS
// =============================================
function renderAffiliateCards() {
    const container = document.getElementById('affiliate-cards');
    affiliatePrograms.forEach(p => {
        const verifiedBadge = p.verified
            ? `<span class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">${p.status}</span>`
            : `<span class="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">${p.status}</span>`;
        const card = document.createElement('div');
        card.className = "p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition";
        card.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <h4 class="font-bold text-primary text-lg">${p.name}</h4>
                ${verifiedBadge}
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div><span class="text-muted">Commission:</span></div><div class="font-medium text-slate-700">${p.commission}</div>
                <div><span class="text-muted">Cookie:</span></div><div class="font-medium text-slate-700">${p.cookie}</div>
                <div><span class="text-muted">Payout:</span></div><div class="font-medium text-slate-700">${p.payout}</div>
                <div><span class="text-muted">Network:</span></div><div class="font-medium text-slate-700">${p.network}</div>
                <div><span class="text-muted">Offer:</span></div><div class="font-medium text-slate-700">${p.offer}</div>
            </div>
            <p class="text-xs text-muted mt-3 italic leading-relaxed">${p.notes}</p>
            ${p.source ? `<a href="${p.source}" target="_blank" rel="noopener noreferrer" class="inline-block mt-3 mr-3 text-xs font-semibold text-slate-600 hover:underline">Evidence ↗</a>` : ''}
            ${p.url ? `<a href="${p.url}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-analytics-event="affiliate_click" data-analytics-provider="${p.name}" data-analytics-relationship="${p.relationship.toLowerCase().replace(/\s+/g, '_')}" data-analytics-destination="program_card" data-analytics-placement="affiliate_ledger" data-analytics-tool="all_tools" data-analytics-calculator-result="not_used" class="inline-block mt-3 text-xs font-semibold text-primary hover:underline">Get started &rarr;</a>` : ''}
        `;
        container.appendChild(card);
    });
}

let chartLoadState = 'idle';

function loadAffiliateChart() {
    const canvas = document.getElementById('affiliateChart');
    if (!canvas || canvas.dataset.chartInitialized === 'true' || chartLoadState === 'loading') return;
    if (typeof window.Chart !== 'undefined') {
        initChart();
        return;
    }

    chartLoadState = 'loading';
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = initChart;
    script.onerror = () => {
        chartLoadState = 'error';
        renderChartFallback();
    };
    document.head.appendChild(script);
}

function renderChartFallback() {
    const canvas = document.getElementById('affiliateChart');
    if (canvas) canvas.parentElement.innerHTML = '<p class="text-sm text-muted leading-relaxed">Chart unavailable offline. The program details remain available alongside this panel.</p>';
}

function initChart() {
    const canvas = document.getElementById('affiliateChart');
    if (!canvas || canvas.dataset.chartInitialized === 'true') return;
    if (typeof window.Chart === 'undefined') {
        chartLoadState = 'error';
        renderChartFallback();
        return;
    }
    chartLoadState = 'ready';
    canvas.dataset.chartInitialized = 'true';
    const ctx = canvas.getContext('2d');
    const chartPrograms = affiliatePrograms.filter((program) => Number.isFinite(program.chartValue));
    new window.Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartPrograms.map(p => p.chartLabel),
            datasets: [{
                label: 'Est. Revenue per User ($)',
                data: chartPrograms.map(p => p.chartValue),
                backgroundColor: chartPrograms.map(p => p.chartColor),
                borderColor: chartPrograms.map(p => p.chartBorder),
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0c0a14',
                    titleFont: { family: 'Satoshi' },
                    bodyFont: { family: 'Satoshi' },
                    cornerRadius: 8,
                    padding: 12,
                    callbacks: {
                        label: ctx => {
                            const v = ctx.parsed.y;
                            const label = ctx.chart.data.labels[ctx.dataIndex] || '';
                            if (label.includes('Recur') && !label.includes('CPA')) return '$' + v + ' (recurring model)';
                            if (label.includes('CPA + Recur')) return '$' + v + '+ (CPA + recurring)';
                            return '$' + v + ' (one-time CPA)';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'USD ($)', font: { family: 'Satoshi' } },
                    grid: { color: 'rgba(0,0,0,0.04)' },
                    ticks: { font: { family: 'Satoshi' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Satoshi', size: 11 } }
                }
            }
        }
    });
}

// Inline navigation controls intentionally use these two small public entry points.
window.nav = nav;
window.toggleMobileMenu = toggleMobileMenu;
