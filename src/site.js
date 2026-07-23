// =============================================
// DATA
// =============================================

const aiTools = {
    bolt: {
        name: "Bolt.new", icon: "\u26A1", type: "App Builder",
        output: "React / Vite / Remix", pricing: "Free / $25/mo Pro", speed: "~28 min",
        quality: 4, desc: "Browser-based full-stack generation via WebContainers. Now includes built-in databases, auth, Figma import, and MCP support.",
        hostName: "Netlify", hostDesc: "Seamless one-click deploy via Bolt's built-in Netlify integration.",
        dbName: "Bolt Database (built-in)", dbDesc: "Bolt now includes built-in database support. For more control, use Supabase (Free: 2 projects, 500MB DB, 50K MAU auth. Pro $25/mo).",
        rationale: "Bolt natively integrates with Netlify through its UI for zero-config deployment. Bolt's new built-in database handles most use cases. For advanced needs, Supabase provides Auth + Postgres with minimal config.",
        hostIcon: "\uD83D\uDD37", dbIcon: "\uD83D\uDDC4\uFE0F",
        nativeDeploy: "Bolt offers one-click deploy to Netlify directly from the editor. For long-term ownership, export to GitHub first."
    },
    v0: {
        name: "v0", icon: "\u2B1B", type: "UI Generator",
        output: "React / Next.js / shadcn/ui", pricing: "Free ($5 credits) / $20/mo Premium", speed: "~50 min (UI)",
        quality: 5, desc: "Vercel's specialized UI component generator for Next.js. Rebranded from v0.dev to v0.app (late 2025). Token-based credits replaced message counts.",
        hostName: "Vercel", hostDesc: "Zero-config deployment \u2014 v0 outputs are designed for Vercel.",
        dbName: "Vercel Postgres (via Neon)", dbDesc: "Native database within the same Vercel dashboard. Powered by Neon (acquired by Databricks). Free: 0.5GB storage.",
        rationale: "v0 is built by Vercel. Outputting to Next.js and deploying on Vercel is the intended, zero-friction happy path. No build command configuration needed.",
        hostIcon: "\u25B2", dbIcon: "\uD83D\uDCBE",
        nativeDeploy: "v0 components are designed to be dropped directly into Next.js projects, which deploy to Vercel\u2019s edge network with zero config."
    },
    cursor: {
        name: "Cursor", icon: "\u2328\uFE0F", type: "AI IDE",
        output: "Any (Python, Node, Go, etc.)", pricing: "Free / $20\u2013$200/mo", speed: "~75 min",
        quality: 5, desc: "Professional VS Code fork with deep codebase context and multi-file editing. Credit-based billing since June 2025.",
        hostName: "Railway", hostDesc: "Auto-detects any language via Nixpacks. Just link GitHub.",
        dbName: "Neon or Supabase", dbDesc: "Neon: Serverless Postgres (acquired by Databricks, prices reduced 15\u201325%). Free: 100 compute-hrs, 0.5GB/project. Best for serverless Postgres without Supabase overhead. Supabase: Free 2 projects, 500MB DB, 50K MAU auth. For auth-heavy apps, add Clerk (50K free MAU).",
        rationale: "Cursor can build anything \u2014 Python backends, Go services, complex multi-container apps. Railway\u2019s Nixpacks build system auto-detects the language and builds containers without requiring a Dockerfile. For the SQLite deployment problem, use Neon (serverless Postgres) or Turso (SQLite at the edge, free: 500 DBs, 9GB storage).",
        hostIcon: "\uD83D\uDEE4\uFE0F", dbIcon: "\uD83D\uDC18",
        nativeDeploy: null
    },
    lovable: {
        name: "Lovable", icon: "\uD83D\uDC96", type: "App Builder",
        output: "React / Vite / Tailwind", pricing: "Free / $20/mo Starter", speed: "~35 min",
        quality: 4, desc: "React UI generation with deep Supabase backend integration",
        hostName: "Vercel or Netlify", hostDesc: "Standard frontend hosting \u2014 deploy the exported React app.",
        dbName: "Supabase (built-in)", dbDesc: "Lovable has deep built-in Supabase integration for Auth + DB. Supabase free tier: 2 projects, 500MB database, 1GB file storage, 50K MAU auth. Pro $25/mo. \u26A0\uFE0F Always manually verify Row Level Security (RLS) policies \u2014 AI-generated auth logic has been found to invert access control.",
        rationale: "Lovable specifically added deep Supabase integration. Deploying the frontend to Vercel/Netlify and pointing it to Supabase is the exact workflow they design for. Be sure to transfer SUPABASE_URL and ANON_KEY env vars.",
        hostIcon: "\u2601\uFE0F", dbIcon: "\uD83D\uDD25",
        nativeDeploy: "Lovable offers one-click publish with auto-provisioned Supabase backend. Uses separate Test and Live environments to protect production data."
    },
    windsurf: {
        name: "Windsurf", icon: "\uD83C\uDFC4", type: "AI IDE",
        output: "Any (Python, Node, Go, etc.)", pricing: "Free / $20\u2013$200/mo", speed: "~65 min",
        quality: 5, desc: "Agentic IDE with 'Cascade AI' for deep contextual memory. March 2026 pricing overhaul: fixed quota tiers replaced variable credits.",
        hostName: "Railway", hostDesc: "Same as Cursor \u2014 Railway handles any language/framework automatically.",
        dbName: "Neon or Supabase", dbDesc: "Neon: Serverless Postgres (acquired by Databricks, prices reduced 15\u201325%). Free: 100 compute-hrs, 0.5GB/project. Supabase: Free 2 projects, 500MB DB, 50K MAU auth. For auth, add Clerk (50K free MAU). For SQLite users, consider Turso (free: 500 DBs, 9GB storage).",
        rationale: "Like Cursor, Windsurf produces professional-grade code in any language. Railway\u2019s auto-detection via Nixpacks makes it the lowest-friction deployment target for diverse stacks.",
        hostIcon: "\uD83D\uDEE4\uFE0F", dbIcon: "\uD83D\uDC18",
        nativeDeploy: null
    },
    replit: {
        name: "Replit", icon: "\uD83D\uDD04", type: "Cloud IDE + Host",
        output: "Any (Python, Node, etc.)", pricing: "Free / $20/mo Core", speed: "~45 min",
        quality: 4, desc: "Unified cloud IDE with Replit Agent 3 \u2014 code + deploy in one place. Core dropped to $20/mo (March 2026). Teams plan sunset.",
        hostName: "Replit Deployments", hostDesc: "Built-in hosting. Reserved VMs, Autoscale, or Static options.",
        dbName: "Replit Database (built-in)", dbDesc: "Database is built into Replit's platform \u2014 key-value store included. For relational data, connect external Postgres (Neon or Supabase).",
        rationale: "Replit is the most seamless end-to-end experience. Code is generated in the exact environment where it\u2019s hosted \u2014 zero \u2018works on my machine\u2019 issues. Agent 3 can plan, write, and deploy autonomously.",
        hostIcon: "\uD83D\uDD04", dbIcon: "\uD83D\uDCBE",
        nativeDeploy: "Replit offers integrated deployment \u2014 Reserved VM (always on), Autoscale (scales to demand), or Static. No external hosting needed."
    },
    claude_code: {
        name: "Claude Code", icon: "\uD83E\uDDE0", type: "AI Agent",
        output: "Any (complex multi-file)", pricing: "Pro $20/mo / Max $100\u2013$200/mo", speed: "~90 min",
        quality: 5, desc: "Terminal-based autonomous agent for complex architectural refactoring. No free tier \u2014 requires Claude Pro or Max subscription.",
        hostName: "Railway or DigitalOcean", hostDesc: "Best for complex backends that need Docker or custom builds.",
        dbName: "Neon or Supabase", dbDesc: "Neon: Serverless Postgres (acquired by Databricks, prices reduced 15\u201325%). Free: 100 compute-hrs, 0.5GB/project. Best for serverless Postgres without Supabase overhead. Supabase: Free 2 projects, 500MB DB, 50K MAU auth. For auth-heavy apps, add Clerk (50K free MAU). For SQLite users, consider Turso (free: 500 DBs, 9GB).",
        rationale: "Claude Code excels at complex, multi-file architecture. The resulting apps often need robust container hosting. Railway (Nixpacks auto-detect) or DigitalOcean App Platform (for production scale) are the best targets. Claude Code generates portable, standard code \u2014 least vendor lock-in of any AI tool.",
        hostIcon: "\uD83D\uDEE4\uFE0F", dbIcon: "\uD83D\uDC18",
        nativeDeploy: null
    },
    base44: {
        name: "Base44", icon: "\uD83D\uDCCA", type: "No-Code/AI Hybrid",
        output: "Internal tools / Dashboards", pricing: "Free / $16/mo Starter", speed: "~40 min",
        quality: 3, desc: "Specialized for internal tools, dashboarding, and rapid deployment",
        hostName: "Base44 Hosting", hostDesc: "Built-in hosting for generated internal tools.",
        dbName: "Built-in", dbDesc: "Integrated data layer for internal tools.",
        rationale: "Base44 is designed for internal tools and dashboards \u2014 it handles hosting natively. For public-facing apps, consider exporting and using a traditional host.",
        hostIcon: "\uD83D\uDCCA", dbIcon: "\uD83D\uDCBE",
        nativeDeploy: "Base44 provides integrated hosting for internal tools and dashboards."
    },
    natively: {
        name: "Natively", icon: "\uD83D\uDCF1", type: "Mobile Builder",
        output: "React Native / Expo (iOS + Android)", pricing: "$5/mo", speed: "Not specified",
        quality: 0, desc: "Specialized builder for true native mobile apps. Includes Supabase backend, full source code ownership, one-click App Store deployment.",
        hostName: "App Store / Google Play", hostDesc: "Native mobile apps are distributed via app stores, not web hosting.",
        dbName: "Supabase (included)", dbDesc: "Natively includes Supabase backend with Auth + Postgres. Free tier: 2 projects, 500MB DB, 50K MAU auth.",
        rationale: "Natively outputs React Native/Expo apps destined for mobile app stores. The deployment path is fundamentally different from web hosting \u2014 you\u2019ll submit builds to Apple and Google rather than deploying to a cloud platform. \u26A0\uFE0F Apple is blocking some vibe-coded app updates as of March 2026 \u2014 use Natively with Expo for compliant builds.",
        hostIcon: "\uD83D\uDCF1", dbIcon: "\uD83D\uDD25",
        nativeDeploy: "Natively handles the build pipeline for iOS/Android. Distribution is via App Store Connect and Google Play Console."
    },
    emergent: {
        name: "Emergent", icon: "\uD83C\uDF00", type: "Agent Platform",
        output: "Fullstack web + mobile", pricing: "Free / $20/mo Standard", speed: "Not specified",
        quality: 0, desc: "Agent-based development platform with built-in auth, DB, payments, and hosting. ISO 27001 + SOC 2 certified.",
        hostName: "Railway or Vercel", hostDesc: "Deploy generated web apps to standard cloud platforms.",
        dbName: "Supabase / Neon", dbDesc: "Emergent includes built-in database, but for external hosting use Supabase (Free: 2 projects, 500MB) or Neon (Free: 100 compute-hrs, 0.5GB).",
        rationale: "Emergent is a newer agent-based platform with built-in auth/DB/payments/hosting. For external deployment, export the generated code to GitHub and deploy via Railway (for fullstack) or Vercel (for frontend) using the standard CI/CD workflow.",
        hostIcon: "\u2601\uFE0F", dbIcon: "\uD83D\uDDC4\uFE0F",
        nativeDeploy: null
    }
};

const toolsLandscape = [
    { name: "Cursor", type: "AI IDE", output: "Any", pricing: "Free / $20–$200/mo", speed: "~75 min", quality: 5, note: "Free, Pro $20, Pro+ $60, Ultra $200, Teams $40/user. Credit-based billing (June 2025) — each plan gets credits equal to plan price." },
    { name: "Windsurf", type: "AI IDE", output: "Any", pricing: "Free / $20–$200/mo", speed: "~65 min", quality: 5, note: "March 2026 overhaul: Free, Pro $20, Max $200. Fixed quota tiers replaced variable credits." },
    { name: "Claude Code", type: "AI Agent", output: "Any (multi-file)", pricing: "Pro $20/mo / Max $100–$200/mo", speed: "~90 min", quality: 5, note: "No free tier for Claude Code. Requires Claude Pro ($20/mo) or Max ($100–$200/mo) subscription." },
    { name: "v0", type: "UI Generator", output: "React/Next.js", pricing: "Free ($5 credits) / $20/mo", speed: "~50 min (UI)", quality: 5, note: "Rebranded from v0.dev to v0.app (late 2025). Premium $20, Team $30/user, Business $100/user. Token-based credits replaced message counts." },
    { name: "Lovable", type: "App Builder", output: "React/Vite", pricing: "Free / $20/mo", speed: "~35 min", quality: 4, note: "Free 5 daily credits, Starter $20/mo 100 credits, Launch ~$50/mo 300 credits." },
    { name: "Replit", type: "Cloud IDE", output: "Any", pricing: "Free / $20/mo", speed: "~45 min", quality: 4, note: "Core dropped from $25 to $20 (March 3, 2026). New Pro tier at $100/mo. Teams plan sunset." },
    { name: "Bolt.new", type: "App Builder", output: "React/Vite/Remix", pricing: "Free / $25/mo", speed: "~28 min", quality: 4, note: "Pro $25/mo with 10M tokens, Teams $30/member. Now includes built-in databases, auth, Figma import, and MCP support." },
    { name: "Base44", type: "No-Code/AI", output: "Internal tools", pricing: "Free / $16/mo", speed: "~40 min", quality: 3, note: "Starter $16, Builder $50, Pro $80." },
    { name: "Natively", type: "Mobile Builder", output: "React Native", pricing: "$5/mo", speed: "N/A", quality: 0, note: "Includes Supabase backend, React Native + Expo, full source code ownership, one-click App Store deployment." },
    { name: "Emergent", type: "Agent Platform", output: "Fullstack", pricing: "Free / $20/mo", speed: "N/A", quality: 0, note: "Standard $20, Pro $200. ISO 27001 + SOC 2 certified, multi-agent framework, built-in auth/DB/payments/hosting." },
];

const hostingPlatforms = [
    { name: "Vercel", type: "frontend", bestFor: "Next.js, React, v0 outputs", free: "Yes — 100GB BW, 1M edge req, 1M fn invocations, 4hr CPU, 1GB blob, 5K img transforms", commercial: "No (Hobby is non-commercial — enforced by policy)", sleep: "Serverless (cold starts on functions)", ease: 9, db: "Add-on (Vercel Postgres via Neon)", docker: "No", note: "Pro $20/user/mo with $20 usage credits. Credit-based pricing since Sep 2025." },
    { name: "Netlify", type: "frontend", bestFor: "Vite, Remix, Bolt outputs", free: "Yes — 100GB BW, 300 build mins", commercial: "Yes", sleep: "Serverless (cold starts on functions)", ease: 9, db: "No (external only)", docker: "No", note: "⚠️ Overage: $55 per 100GB — users report surprise bills. Monitor bandwidth usage." },
    { name: "Cloudflare Pages", type: "frontend", bestFor: "Static sites, global edge, unlimited BW", free: "Yes — 500 builds/mo, UNLIMITED bandwidth, unlimited requests, unlimited sites", commercial: "Yes", sleep: "Edge — no cold starts", ease: 8, db: "D1 (SQLite) + Workers + KV + R2", docker: "No", note: "Most generous free tier. Workers, D1, KV, and R2 storage available." },
    { name: "Railway", type: "fullstack", bestFor: "Python, Docker, fullstack AI apps", free: "No true free tier (Trial $5 credit, one-time)", commercial: "Yes", sleep: "Never (runs until credit exhausted)", ease: 8, db: "Yes — Postgres, MySQL, Redis, MongoDB", docker: "Yes (Nixpacks)", note: "Hobby ~$5/mo credit (requires credit card). Pro ~$20/mo. Great for persistent storage — solves SQLite problem." },
    { name: "Render", type: "fullstack", bestFor: "Node.js, Express APIs", free: "Static sites free; web services 750 hrs/mo (spins down after 15 min)", commercial: "Yes", sleep: "Spins down after 15 min (~1 min wake)", ease: 7, db: "Yes — Postgres (30-day free limit)", docker: "Yes", note: "Paid from ~$7/mo for always-on services." },
    { name: "Fly.io", type: "fullstack", bestFor: "Low-latency global apps, VMs", free: "No — pure pay-as-you-go (Oct 2024 change)", commercial: "Yes", sleep: "Configurable (auto-scale to zero)", ease: 6, db: "Yes — Postgres clusters", docker: "Yes (required)", note: "Old Hobby/Launch/Scale tiers removed. Shared-CPU 256MB VM ~$1.94/mo. Realistic prod ~$10–20/mo. 2026: volume snapshots billed separately (Jan), inter-region traffic billed (Feb)." },
    { name: "DigitalOcean App", type: "fullstack", bestFor: "Scaling production apps", free: "3 free static sites", commercial: "Yes", sleep: "Basic $5/mo sleeps; Professional $12/mo always-on", ease: 6, db: "Yes — Managed Postgres/MySQL/Redis", docker: "Yes", note: "Basic $5/mo (sleeps). Professional $12/mo (always-on)." },
    { name: "Heroku", type: "fullstack", bestFor: "Legacy apps, simple Node/Python", free: "No (removed Nov 2022)", commercial: "Yes", sleep: "Eco dynos sleep after 30 min", ease: 7, db: "Yes — Postgres add-on", docker: "Yes", note: "Cheapest: Eco $5/mo (sleeps after 30 min). Basic $7/mo (no sleep)." },
];

const registrars = [
    { name: "Cloudflare", com: "$10.46", net: "$10.26", org: "$10.11", io: "$33.98", app: "$16.00", note: "At-cost pricing, zero markup. Cheapest long-term option.", best: true },
    { name: "Porkbun", com: "$11.06", net: "$10.28", org: "$10.11", io: "$33.98", app: "$16.18", note: "Flat-rate pricing, no renewal hikes. Close to Cloudflare.", best: true },
    { name: "Namecheap", com: "$13.98–$15.98", net: "$12.98", org: "$12.98", io: "$32.98", app: "$18.98", note: "Good first-year prices, higher renewals. Popular UI.", best: false, url: "https://namecheap.pxf.io/rEErVj" },
    { name: "Hover", com: "~$15.99", net: "N/A", org: "N/A", io: "~$39.99", app: "~$19.99", note: "Simple UI, premium pricing. Includes free WHOIS privacy.", best: false },
];

const deployErrors = [
    {
        num: 1, title: "Missing Environment Variables",
        icon: "\uD83D\uDD11", severity: "critical",
        desc: "AI tools generate .env files for local testing, but these are excluded from Git via .gitignore. When deployed, the production server has no access to your API keys, database URLs, or secrets.",
        fix: "Manually copy every key-value pair from your local .env file into the Environment Variables section of your hosting platform (Vercel, Netlify, Railway) before deploying.",
        example: "App builds successfully but returns 500 errors or blank pages because the database connection string is missing."
    },
    {
        num: 2, title: "Hardcoded localhost API URLs",
        icon: "\uD83D\uDD17", severity: "critical",
        desc: "AI assistants routinely hardcode http://localhost:3000 as the API endpoint. In production, the live frontend tries to call the visitor's local machine instead of your deployed backend.",
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
        desc: "Browser-based AI tools (Bolt, Lovable) have strict token limits. As projects grow, the AI forgets earlier decisions, introduces contradictions, and hallucinates dependencies.",
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
        desc: "The most dangerous silent failure. AI models prioritize functional code over security \u2014 they frequently omit Row Level Security (RLS) on databases or invert auth logic, granting admin access to unauthenticated users.",
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
        num: 12, title: "Lovable Auth Logic Inverted (Security)",
        icon: "\uD83D\uDEE1\uFE0F", severity: "critical",
        desc: "AI-generated authentication in Lovable has been found to literally invert access control \u2014 blocking logged-in users while granting access to anonymous visitors. In Feb 2026, 18,697 user records were exposed including K-12 student data. 40\u201348% of AI-generated code contains security vulnerabilities.",
        fix: "NEVER trust AI-generated auth logic without manual review. Test with multiple user roles. Check Supabase Row Level Security (RLS) policies manually. Use Clerk (50K free MAU) or Supabase Auth with explicit policy testing.",
        example: "Logged-in users see 'Access Denied' while unauthenticated visitors have full admin access to the dashboard.",
        tools: ["Lovable", "Bolt.new", "All AI builders"]
    },
    {
        num: 13, title: "Credit Burn Death Spiral",
        icon: "\uD83D\uDD25", severity: "high",
        desc: "Lovable users report burning 400+ credits in an hour fixing AI-generated errors. Bolt.new users experience 'endless error loops' consuming tokens without progress. Each failed fix attempt costs more credits.",
        fix: "Use Lovable's new Chat Mode to diagnose before spending credits. Export to Cursor/VS Code for complex debugging. Set a credit budget per session. If stuck after 3 attempts, switch to manual editing.",
        example: "Started with 100 credits, spent all of them trying to fix a single bug that the AI kept 'fixing' incorrectly in a loop.",
        tools: ["Lovable", "Bolt.new", "Base44"]
    },
    {
        num: 14, title: "Vendor Lock-in: Can't Export Code",
        icon: "\uD83D\uDD12", severity: "high",
        desc: "Code generated by Replit and Bolt.new is tightly coupled to their infrastructure. Exporting and deploying elsewhere requires significant refactoring. Pages that should load in 200ms take 2+ seconds with unoptimized generated code.",
        fix: "Export to GitHub early and often. Test running the code locally outside the platform before investing heavily. For Replit, agree to Replit opening previews in external browser (Apple requirement). For critical projects, start in Cursor which generates standard, portable code.",
        example: "Exported Bolt.new project fails to build locally due to missing platform-specific dependencies and hardcoded internal URLs.",
        tools: ["Replit", "Bolt.new"]
    },
    {
        num: 15, title: "Apple Blocks Vibe Coding App Updates",
        icon: "\uD83C\uDF4E", severity: "high",
        desc: "As of March 18, 2026, Apple is blocking App Store updates for apps built with vibe coding tools (Replit, Vibecode) citing rules against dynamically generated code execution.",
        fix: "If targeting iOS: use Replit's external browser preview workaround. Avoid generating Apple-device-specific apps in Vibecode. Consider PWA (Progressive Web App) deployment instead of native App Store. Use Natively with Expo for compliant App Store builds.",
        example: "App Store Connect rejects update with 'Guideline 2.5.2 \u2014 apps may not download or execute code' referencing AI-generated runtime logic.",
        tools: ["Replit", "Natively", "All mobile builders"]
    }
];

const affiliatePrograms = [
    {
        name: "DigitalOcean", verified: true,
        commission: "10% recurring for 12 months",
        cookie: "CJ default",
        payout: "$10 minimum",
        network: "CJ (Commission Junction)",
        offer: "$200 credit for 60 days for new users",
        notes: "Low developer churn. High-value for AI apps that scale compute. Conversions driven by the generous $200 free credit.",
        chartValue: 24, chartLabel: "DigitalOcean (Recur)", chartColor: "rgba(16, 185, 129, 0.7)", chartBorder: "rgba(16, 185, 129, 1)"
    },
    {
        name: "Railway", verified: false,
        commission: "15% recurring for 12 months",
        cookie: "Not specified",
        payout: "Not specified",
        network: "Custom / Internal",
        offer: "$5 platform credit for new signups",
        notes: "Referral credit system, not traditional affiliate. Perfect product/market fit for Python/Docker AI apps. Best for referring developers who will scale compute over time.",
        chartValue: 36, chartLabel: "Railway (Recur)", chartColor: "rgba(16, 185, 129, 0.7)", chartBorder: "rgba(16, 185, 129, 1)"
    },
    {
        name: "Hostinger", verified: true,
        commission: "40–60% per sale (volume-dependent)",
        cookie: "30 days",
        payout: "$100 minimum (PayPal)",
        network: "In-house / ShareASale",
        offer: "Various promotional rates",
        notes: "High CPA but excludes renewals. Traditional hosting is a poor fit for modern JS/Python AI apps — higher refund risk.",
        chartValue: 60, chartLabel: "Hostinger (CPA)", chartColor: "rgba(245, 158, 11, 0.7)", chartBorder: "rgba(245, 158, 11, 1)"
    },
    {
        name: "Bluehost", verified: true,
        commission: "$65 per qualified sale (exclusive affiliate pricing from $3.79/mo)",
        cookie: "60 days",
        payout: "2 sales before first withdrawal",
        network: "Impact",
        offer: "Exclusive affiliate pricing from $3.79/mo for referred users",
        url: "https://bluehost.sjv.io/9VVDN4",
        notes: "Trusted in the WordPress ecosystem. Exclusive $3.79/mo pricing only available through affiliate link. Not ideal for modern JS frameworks — best for WordPress/simple sites.",
        chartValue: 65, chartLabel: "Bluehost (CPA)", chartColor: "rgba(245, 158, 11, 0.7)", chartBorder: "rgba(245, 158, 11, 1)"
    },
    {
        name: "Kinsta", verified: true,
        commission: "Up to $500 per referral + 10% lifetime recurring",
        cookie: "60 days",
        payout: "$50 minimum",
        network: "In-house",
        offer: "Premium managed WordPress & app hosting",
        notes: "Best single affiliate program for high-value referrals. $500 upfront + 10% recurring = highest LTV in this space. Great fit for developers shipping production apps.",
        chartValue: 620, chartLabel: "Kinsta (CPA + Recur)", chartColor: "rgba(139, 92, 246, 0.7)", chartBorder: "rgba(139, 92, 246, 1)"
    },
    {
        name: "Liquid Web", verified: true,
        commission: "Up to 300% ($150 min per referral)",
        cookie: "90 days",
        payout: "Not specified",
        network: "Impact",
        offer: "High-ticket managed hosting & VPS",
        notes: "High-ticket hosting affiliate. 90-day cookie is the longest in this list. Best for referring teams or businesses needing managed infrastructure.",
        chartValue: 150, chartLabel: "Liquid Web (CPA)", chartColor: "rgba(245, 158, 11, 0.7)", chartBorder: "rgba(245, 158, 11, 1)"
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
    window.setTimeout(loadThirdPartyAnalytics, 5000);
});

function loadThirdPartyAnalytics() {
    if (window.__deployAppAnalyticsLoaded) return;
    window.__deployAppAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-E9VPTS1J8F');

    const googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-E9VPTS1J8F';
    document.head.appendChild(googleTag);

    window.ire_o = 'impactStat';
    window.impactStat = window.impactStat || function impactStat() {
        (window.impactStat.a = window.impactStat.a || []).push(arguments);
    };
    window.impactStat('transformLinks');
    window.impactStat('trackImpression');

    const impactTag = document.createElement('script');
    impactTag.async = true;
    impactTag.src = 'https://utt.impactcdn.com/P-A7111454-e5e7-4f7f-87c3-eb9a520ab3461.js';
    document.head.appendChild(impactTag);
}

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
    document.getElementById('rec-tool-speed').innerText = d.speed;

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
        const stars = t.quality > 0
            ? `<div class="flex gap-0.5">${Array(t.quality).fill('<div class="w-2 h-2 rounded-full bg-amber-400"></div>').join('')}${Array(5-t.quality).fill('<div class="w-2 h-2 rounded-full bg-slate-200"></div>').join('')}</div>`
            : '<span class="text-slate-400 text-xs">N/A</span>';
        const typeColor = typeColors[t.type] || 'bg-slate-100 text-slate-600';
        row.innerHTML = `
            <td class="px-4 py-3.5 text-sm font-bold text-dark">${t.name}</td>
            <td class="px-4 py-3.5 text-sm"><span class="px-2 py-0.5 rounded-full text-xs font-medium ${typeColor}">${t.type}</span></td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.output}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.pricing}</td>
            <td class="px-4 py-3.5 text-sm text-muted">${t.speed}</td>
            <td class="px-4 py-3.5 text-sm">${stars}</td>
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
        const easePercent = p.ease * 10;
        let easeColor = 'bg-emerald-400';
        let easeTextColor = 'text-emerald-700';
        if (p.ease <= 7) { easeColor = 'bg-amber-400'; easeTextColor = 'text-amber-700'; }
        if (p.ease <= 5) { easeColor = 'bg-red-400'; easeTextColor = 'text-red-700'; }
        const commColor = p.commercial === "Yes"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200";
        row.innerHTML = `
            <td class="px-4 py-4 whitespace-nowrap text-sm font-bold text-dark">${p.name}</td>
            <td class="px-4 py-4 text-sm text-muted">${p.bestFor}</td>
            <td class="px-4 py-4 text-sm text-muted">${p.free}</td>
            <td class="px-4 py-4 whitespace-nowrap"><span class="px-2.5 py-1 text-xs font-semibold rounded-full ${commColor}">${p.commercial}</span></td>
            <td class="px-4 py-4 text-sm text-muted max-w-[200px]">${p.sleep}</td>
            <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                    <div class="ease-bar w-16"><div class="ease-bar-fill ${easeColor}" style="width:${easePercent}%"></div></div>
                    <span class="text-xs font-semibold ${easeTextColor}">${p.ease}/10</span>
                </div>
            </td>
            <td class="px-4 py-4 text-sm text-muted">${p.db}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-muted">${p.docker}</td>
        `;
        matrixBody.appendChild(row);
    });
    // Animate ease bars
    setTimeout(() => {
        document.querySelectorAll('.ease-bar-fill').forEach(el => {
            el.style.width = el.style.width;
        });
    }, 50);
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
            ? `<a href="${r.url}" target="_blank" rel="sponsored nofollow noopener noreferrer" class="font-bold text-primary hover:underline">${r.name}</a>`
            : `<span class="font-bold text-dark">${r.name}</span>`;
        const nameHtml = r.best
            ? `${nameLabel} <span class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full ml-1 font-medium">Best</span>`
            : nameLabel;
        row.innerHTML = `
            <td class="px-4 py-3.5 text-sm whitespace-nowrap">${nameHtml}</td>
            <td class="px-4 py-3.5 text-sm text-muted font-mono">${r.com}</td>
            <td class="px-4 py-3.5 text-sm text-muted font-mono">${r.net}</td>
            <td class="px-4 py-3.5 text-sm text-muted font-mono">${r.org}</td>
            <td class="px-4 py-3.5 text-sm text-muted font-mono">${r.io}</td>
            <td class="px-4 py-3.5 text-sm text-muted font-mono">${r.app}</td>
            <td class="px-4 py-3.5 text-sm text-muted max-w-[250px]">${r.note}</td>
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
            ? '<span class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">Verified</span>'
            : '<span class="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">Unverified</span>';
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
            ${p.url ? `<a href="${p.url}" target="_blank" rel="sponsored nofollow noopener noreferrer" class="inline-block mt-3 text-xs font-semibold text-primary hover:underline">Get started &rarr;</a>` : ''}
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
    new window.Chart(ctx, {
        type: 'bar',
        data: {
            labels: affiliatePrograms.map(p => p.chartLabel),
            datasets: [{
                label: 'Est. Revenue per User ($)',
                data: affiliatePrograms.map(p => p.chartValue),
                backgroundColor: affiliatePrograms.map(p => p.chartColor),
                borderColor: affiliatePrograms.map(p => p.chartBorder),
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
