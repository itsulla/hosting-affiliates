# Deep Research Prompt: Deploying Vibe-Coded Apps

## Objective

I'm building an SEO-driven affiliate landing page at **deployyourapp.com** — a step-by-step deployment guide for people who build web apps using AI coding tools (Cursor, Bolt, Lovable, Replit, v0.dev) and need to get them live on the internet with a custom domain. The target audience is non-technical or semi-technical — they can prompt an AI to build an app but don't understand hosting, DNS, or deployment.

I need comprehensive, accurate, up-to-date research (as of March 2026) to write ~4,500 words of authoritative tutorial content. The page will include an interactive "Where Should I Deploy?" quiz and a comparison table of deployment platforms.

Prioritize accuracy over comprehensiveness. If you can't verify a number, say so rather than guessing.

---

## SECTION 1: The Vibe Coding Landscape (Current State, March 2026)

### 1A. AI Coding Tools — Market Overview

For each of the following tools, research:

- **Cursor**
- **Bolt** (bolt.new)
- **Lovable** (lovable.dev)
- **Replit**
- **v0.dev** (by Vercel)
- **Windsurf** (by Codeium)
- **GitHub Copilot Workspace** (if launched)
- Any other major AI coding tools that have emerged in 2025-2026

For each tool, I need:
- What it is (one-line description)
- What type of output it generates (React app, Next.js app, plain HTML, etc.)
- Default deployment path: Can users deploy directly from the tool? Or must they export to GitHub first?
- Pricing tiers (free tier limits, paid plans)
- Approximate user base or growth stats (if publicly available)
- Any recent major updates or changes in 2025-2026

### 1B. Built-In Hosting / Deployment Features

Several AI coding tools now offer native hosting. I need current details on:

- **Bolt's native hosting (bolt.host)**
  - When did it launch?
  - Pricing: Free tier? Paid plans?
  - Custom domain support?
  - Limitations (bandwidth, projects, sleep behavior)?
  - Can you use it for commercial/monetized projects?

- **Lovable's built-in deployment**
  - How does it work? One-click publish?
  - Pricing for deployment features
  - Custom domain support?
  - When would someone outgrow it and need external hosting?

- **Replit Deployments**
  - Current pricing for deployments (Reserved VMs, Autoscale, Static)
  - Custom domain support?
  - Performance/reliability reputation
  - Recent changes to their deployment model (they've changed pricing multiple times)

- **v0.dev → Vercel pipeline**
  - How does the v0 → Vercel deployment flow work?
  - Is it seamless or does the user need to manually set up Vercel?

### 1C. Audience Size & Trends

- Any data on how many people are using AI coding tools in 2026?
- Y Combinator stat about 25% of Winter 2025 batch having 95% AI-generated codebases — can you verify this and find the original source?
- Collins Dictionary Word of the Year 2025 — was "vibe coding" actually selected? Source?
- Any market size projections for the AI-assisted development tools market?
- What communities do vibe coders gather in? (subreddits like r/boltnewbuilders, Discord servers, Twitter/X communities)

---

## SECTION 2: Deployment Platforms — Detailed Comparison

For each of the following platforms, I need current and verified data as of March 2026:

### Platforms to Compare

1. **Railway** (railway.app)
2. **Vercel** (vercel.com)
3. **Netlify** (netlify.com)
4. **Render** (render.com)
5. **DigitalOcean App Platform** (digitalocean.com)
6. **Fly.io** (fly.io)
7. **Heroku** (heroku.com — if still relevant)
8. **Coolify** (coolify.io — self-hosted alternative, if worth mentioning)

### Data Needed Per Platform

For each platform, create a structured comparison with:

| Data Point | Details Needed |
|---|---|
| Free tier | What's included? Compute limits, bandwidth, build minutes, number of projects/sites |
| Free tier commercial use | Can you monetize a site on the free tier? (Vercel prohibits this — others?) |
| Sleep/spin-down behavior | Does the app go to sleep after inactivity on free tier? How long until spin-down? Cold start time? |
| Hobby/Personal plan | Pricing, what it adds over free tier |
| Pro/Team plan | Pricing per user/month, key features |
| Supported frameworks | React, Next.js, Vue, Svelte, Python, Node.js, Go, etc. |
| Database support | Built-in database? Which ones? Or external only? |
| Custom domains | Supported on free tier? Paid only? SSL included? |
| GitHub integration | One-click deploy from GitHub? Auto-deploy on push? |
| Serverless functions | Supported? Limits? |
| Docker support | Can you deploy Docker containers? |
| Environment variables | Easy to configure? UI or CLI only? |
| Recent changes | Any pricing changes, new features, or deprecations in 2025-2026 |

### Key Comparisons I Need Answered

- Railway vs Vercel vs Netlify: Which is best for a React/Next.js app built with Cursor?
- Which platform is easiest for someone who's never deployed before?
- Which platform has the most generous free tier for hobby projects?
- Which platforms support backend services (databases, cron jobs, workers) vs frontend-only?
- What happens on each platform when you exceed free tier limits? (Hard cutoff? Overage charges? Graceful degradation?)

---

## SECTION 3: Deployment Workflows — Step by Step

I need practical, verified step-by-step workflows for:

### 3A. Cursor → GitHub → Railway/Vercel
1. How to push a Cursor project to GitHub (for someone who's never used Git)
2. How to connect that GitHub repo to Railway
3. How to connect that GitHub repo to Vercel
4. Common issues: What goes wrong? (missing build commands, env vars, wrong root directory)

### 3B. Bolt → GitHub Export → Netlify/Vercel
1. How does Bolt's GitHub export work? (button location, what gets exported)
2. Deploying a Bolt export on Netlify (step by step)
3. Bolt native hosting (bolt.host) vs external deploy: pros/cons

### 3C. Lovable → Built-in Deploy vs GitHub → Vercel
1. How does Lovable's GitHub sync work?
2. When to use Lovable's built-in hosting vs deploying externally
3. Any known limitations of Lovable's built-in hosting

### 3D. Common Deployment Errors for Beginners
- What are the top 5-10 deployment errors that non-technical users hit?
- For each error: what causes it and how to fix it
- Examples: "Build failed", missing environment variables, wrong Node.js version, dependencies not installing, CORS errors, API keys exposed in frontend

---

## SECTION 4: Domain Registration & DNS Basics

### 4A. Domain Pricing (Current, March 2026)

| Registrar | .com price/year | .dev price/year | .io price/year | .app price/year | Notes |
|---|---|---|---|---|---|
| GoDaddy | ? | ? | ? | ? | |
| Namecheap | ? | ? | ? | ? | |
| Cloudflare Registrar | ? | ? | ? | ? | At-cost pricing? |
| Porkbun | ? | ? | ? | ? | |
| Squarespace Domains (ex-Google Domains) | ? | ? | ? | ? | |

### 4B. DNS Explained Simply
- What is DNS? (in terms a non-developer would understand)
- What are A records, CNAME records, and nameservers?
- Why does DNS propagation take time?
- What's the difference between pointing nameservers vs adding DNS records?

### 4C. Connecting Domains to Platforms
- How to connect a custom domain to Vercel (brief steps)
- How to connect a custom domain to Netlify (brief steps)
- How to connect a custom domain to Railway (brief steps)
- Are there any gotchas? (e.g., some registrars are easier than others)

---

## SECTION 5: Affiliate Program Verification

Verify that the following affiliate program details are still accurate as of March 2026. For each, confirm or correct:

### Railway Affiliate Program
- Commission: 15% recurring for 12 months — still active?
- How to join: Through Railway dashboard?
- Payout method: GitHub Sponsors / Buy Me a Coffee — still the case?
- Any minimum payout threshold?
- Source: https://docs.railway.com/community/affiliate-program

### DigitalOcean Affiliate Program
- Commission: 10% recurring for 12 months on all monthly spend — still accurate?
- Network: CJ Affiliate / Impact — which one currently?
- Cookie duration: 30 days?
- New user incentive: $200 in credits for new signups — still offered?
- Source: https://www.digitalocean.com/affiliates

### Hostinger Affiliate Program
- Commission: 60% per sale — still accurate? Any volume tiers?
- Cookie duration: 30 days?
- Minimum payout threshold?
- Network: Direct or through an affiliate network?
- Source: https://www.hostinger.com/affiliates

### Bluehost Affiliate Program
- Commission: $65 flat per sale — still accurate?
- Cookie duration: 30 or 90 days? (Sources conflict on this)
- Network: Impact
- Minimum payout: Do you still need 2 sales before first withdrawal?
- Source: https://www.bluehost.com/affiliates

---

## Output Format

Please structure your output as:

1. **Data tables** with verified numbers (not prose paragraphs)
2. **Source URLs** for every factual claim
3. **"Verified as of [date]"** labels — flag anything you cannot confirm is current
4. **"Could not verify"** labels for anything uncertain
5. **Key insights** — surprising findings, common misconceptions, or underserved angles that would make the content stand out
6. **Content gaps** — information you couldn't find that I should verify manually by visiting the actual platforms
