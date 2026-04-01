# PRD: Promptly Board

## The Ultimate Free AI Tools & Prompts Directory

---

## 1. Project Overview

### Service Name
Promptly Board

### Short Title
The Ultimate Free AI Tools & Prompts Directory

### Description
Promptly Board is a curated, filterable directory of free AI tools organized by use case including image generation, coding assistants, writing tools, video creation, and more. Users can search, filter by category, browse tool cards with descriptions and ratings, and submit new tools via a form that feeds into Google Sheets. The entire site runs as a static site with a JSON data file, requiring no backend or paid APIs.

### Target Audience
- AI enthusiasts exploring new tools
- Content creators seeking free AI solutions
- Developers looking for coding assistants
- Marketers and writers wanting AI writing tools
- Students and educators discovering AI resources

### Target Keywords (SEO)
- "free AI tools"
- "best AI tools 2025"
- "AI tool directory"
- "free AI image generator"
- "AI tools list"
- "best free AI apps"
- "AI tools for writing"

---

## 2. Harness Design Methodology

### Agent Workflow

```
Planner Agent
  -> Defines milestones, feature_list.json, file structure
  -> Outputs PRD.md (this document)

Initializer Agent
  -> Reads PRD.md
  -> Generates feature_list.json
  -> Generates claude-progress.txt
  -> Generates init.sh (project scaffold)
  -> Runs init.sh to bootstrap project

Fixed Session Routine
  -> Each session: read claude-progress.txt -> pick next incomplete feature -> build -> test -> mark done -> git push

Builder Agent
  -> Implements features one by one per feature_list.json
  -> Writes code, tests locally, commits

Reviewer Agent
  -> Reviews code quality, accessibility, SEO, responsiveness
  -> Suggests fixes before milestone push
```

### Session Routine (Per Coding Session)

1. Read `claude-progress.txt` to find current milestone and next incomplete feature.
2. Implement the feature.
3. Test locally (open in browser, check filters, verify mobile).
4. Mark feature as complete in `claude-progress.txt`.
5. Git commit with descriptive message.
6. At milestone completion: git push, verify deployment on Vercel.

---

## 3. Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Vanilla HTML/CSS/JS | $0 |
| Styling | Tailwind CSS via CDN | $0 |
| Data | Static JSON file (tools database) | $0 |
| Form Backend | Google Sheets + Apps Script Webhook | $0 |
| Hosting | Vercel (free tier) | $0 |
| Ads | Adsterra (primary), Google AdSense (secondary) | Revenue |
| Version Control | GitHub (private repo) | $0 |
| **Total** | | **$0** |

---

## 4. Data Schema

### Tool Entry (in `data/tools.json`)

```json
{
  "id": "chatgpt",
  "name": "ChatGPT",
  "description": "AI chatbot by OpenAI for conversation, writing, coding, and more.",
  "url": "https://chat.openai.com",
  "category": "chatbot",
  "tags": ["writing", "coding", "general"],
  "rating": 4.8,
  "pricing": "freemium",
  "icon": "https://example.com/chatgpt-icon.png",
  "featured": true,
  "dateAdded": "2024-01-01"
}
```

### Categories

| Category Slug | Display Name | Icon |
|--------------|-------------|------|
| chatbot | AI Chatbots | chat bubble |
| image-gen | Image Generation | image |
| coding | Coding Assistants | code |
| writing | Writing Tools | pen |
| video | Video Creation | video |
| audio | Audio & Music | music |
| productivity | Productivity | zap |
| research | Research & Analysis | search |
| design | Design Tools | palette |
| education | Education | book |

---

## 5. Features List

### Core Features

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| F01 | Tool cards grid layout (name, description, link, rating, category badge) | P0 | M1 |
| F02 | Category filter tabs/buttons | P0 | M1 |
| F03 | Search bar (filter by name/description) | P0 | M1 |
| F04 | Load tools from static JSON data file | P0 | M1 |
| F05 | Pagination (12 tools per page) | P0 | M1 |
| F06 | Tool count display per category | P1 | M2 |
| F07 | Sort options (rating, name, newest) | P1 | M2 |
| F08 | "Submit a Tool" form (name, url, description, category) | P0 | M2 |
| F09 | Form submission to Google Sheets webhook | P0 | M2 |
| F10 | Featured/popular tools section at top | P1 | M2 |
| F11 | Tool detail modal/expansion on click | P1 | M3 |
| F12 | Responsive mobile-first layout | P0 | M1 |

### SEO & Meta

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| S01 | Meta tags (title, description, keywords) | P0 | M3 |
| S02 | Open Graph tags | P0 | M3 |
| S03 | Twitter Card tags | P0 | M3 |
| S04 | JSON-LD structured data (WebSite, ItemList) | P0 | M3 |
| S05 | sitemap.xml | P0 | M3 |
| S06 | robots.txt | P0 | M3 |
| S07 | Semantic HTML throughout | P0 | M1 |
| S08 | Canonical URL | P1 | M3 |

### Monetization & Analytics

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| A01 | Adsterra ad unit placeholders (header, between cards, sidebar, footer) | P0 | M3 |
| A02 | Adsterra ad key injection script | P0 | M3 |
| A03 | Google AdSense fallback slots | P1 | M4 |
| A04 | Visitor counter (Today + Total) in footer | P0 | M3 |
| A05 | Google Sheets webhook - log page visits | P0 | M3 |

### Internationalization & UX

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| I01 | Auto i18n - browser language detection | P0 | M4 |
| I02 | Support 8+ languages (EN, KO, JA, ZH, ES, FR, DE, PT) | P0 | M4 |
| I03 | Language selector dropdown in header | P1 | M4 |
| I04 | Social sharing buttons (Twitter, Facebook, LinkedIn, Reddit) | P0 | M4 |
| I05 | Feedback email link (taeshinkim11@gmail.com) | P0 | M4 |

### Static Pages

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| P01 | About page | P0 | M4 |
| P02 | How to Use / FAQ page | P0 | M4 |
| P03 | Privacy Policy page | P0 | M4 |
| P04 | Terms of Service page | P0 | M4 |

---

## 6. File & Folder Structure

```
PromptlyBoard/
├── index.html                  # Main directory page
├── about.html                  # About page
├── faq.html                    # How to Use / FAQ
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms of Service
├── submit.html                 # Submit a Tool page
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots
├── css/
│   └── style.css               # Custom styles (soft colors, card designs)
├── js/
│   ├── app.js                  # Main application logic (render, filter, search)
│   ├── data-loader.js          # Load and parse tools.json
│   ├── search.js               # Search functionality
│   ├── pagination.js           # Pagination logic
│   ├── submit-form.js          # Form handling and Google Sheets POST
│   ├── i18n.js                 # Internationalization
│   ├── visitor.js              # Visitor counter
│   ├── ads.js                  # Ad injection
│   └── sheets-webhook.js       # Google Sheets visit logging
├── data/
│   ├── tools.json              # Tool entries database
│   └── translations.json       # i18n strings
├── assets/
│   ├── og-image.png            # Open Graph image
│   ├── favicon.ico             # Favicon
│   └── icons/                  # Category icons (SVG)
├── feature_list.json           # Harness: feature tracking
├── claude-progress.txt         # Harness: session progress
├── init.sh                     # Harness: project initializer
├── vercel.json                 # Vercel config
├── .gitignore
└── README.md
```

---

## 7. Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (primary) | Soft lavender gray | #F0F0F5 |
| Background (card) | Light cream | #FAFAF9 |
| Background (dark mode) | Deep navy | #1A1A2E |
| Text (primary) | Dark slate | #1E293B |
| Text (secondary) | Cool gray | #64748B |
| Accent (primary) | Violet | #7C3AED |
| Accent (secondary) | Teal | #14B8A6 |
| Category: Chatbot | Blue | #3B82F6 |
| Category: Image Gen | Pink | #EC4899 |
| Category: Coding | Green | #22C55E |
| Category: Writing | Orange | #F97316 |
| Category: Video | Red | #EF4444 |
| Category: Audio | Purple | #A855F7 |
| Category: Productivity | Yellow | #EAB308 |
| Category: Research | Indigo | #6366F1 |
| Category: Design | Cyan | #06B6D4 |
| Category: Education | Emerald | #10B981 |

### Typography

- Headings: `Inter` (700 weight)
- Body: `Inter` (400 weight)
- UI elements: `Inter` (500 weight)

### Card Design

```
+----------------------------------+
| [Icon]  Tool Name         ★ 4.8 |
| Category Badge                   |
|                                  |
| Short description of the tool    |
| and what it does...              |
|                                  |
| [Visit Tool ->]    [Share]       |
+----------------------------------+
```

- Border radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Hover: slight lift + shadow increase
- Card grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 8. Milestones & Git Strategy

### Milestone 1: Core Directory (MVP)
**Deliverables:**
- Project scaffold (HTML, CSS, JS structure)
- Static tools.json with 30+ tools across categories
- Tool cards grid rendering
- Category filter tabs
- Search bar functionality
- Pagination (12 per page)
- Semantic HTML + responsive layout

**Git commits:**
- `feat: scaffold project structure`
- `feat: create tools.json with 30+ entries`
- `feat: render tool cards grid`
- `feat: implement category filter`
- `feat: add search bar functionality`
- `feat: add pagination`
- `milestone: M1 complete - core directory`

**Push to GitHub at milestone completion.**

### Milestone 2: Submissions & Sorting
**Deliverables:**
- "Submit a Tool" form page
- Form to Google Sheets integration
- Sort options (rating, name, newest)
- Tool count per category
- Featured tools section
- Polish responsive behavior

**Git commits:**
- `feat: create Submit a Tool form page`
- `feat: integrate form with Google Sheets`
- `feat: add sort options`
- `feat: add tool count per category`
- `feat: add featured tools section`
- `milestone: M2 complete - submissions and sorting`

**Push to GitHub at milestone completion.**

### Milestone 3: SEO, Ads & Analytics
**Deliverables:**
- Full SEO implementation (meta, OG, JSON-LD, sitemap, robots.txt)
- Adsterra ad placeholders and injection
- Visitor counter in footer
- Google Sheets visit webhook
- Tool detail modal/expansion

**Git commits:**
- `feat: add SEO meta, OG, JSON-LD tags`
- `feat: create sitemap.xml and robots.txt`
- `feat: integrate Adsterra ad units`
- `feat: add visitor counter`
- `feat: integrate visit logging webhook`
- `feat: add tool detail modal`
- `milestone: M3 complete - SEO, ads, analytics`

**Push to GitHub at milestone completion.**

### Milestone 4: i18n, Pages & Polish
**Deliverables:**
- Auto i18n with 8+ languages
- Language selector
- Social sharing buttons
- Feedback mechanism
- About, FAQ, Privacy, Terms pages
- AdSense fallback
- Final QA

**Git commits:**
- `feat: implement i18n (8 languages)`
- `feat: add social sharing buttons`
- `feat: add feedback email link`
- `feat: create About, FAQ, Privacy, Terms pages`
- `feat: add AdSense fallback`
- `chore: final QA and performance optimization`
- `milestone: M4 complete - full release`

**Push to GitHub at milestone completion.**

---

## 9. Google Sheets Webhook (Apps Script)

### Tool Submission Webhook

1. Create Google Sheet "PromptlyBoard Submissions" with columns: `Timestamp`, `ToolName`, `URL`, `Description`, `Category`, `SubmitterEmail`.
2. Deploy Apps Script as Web App:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.toolName || "",
    data.url || "",
    data.description || "",
    data.category || "",
    data.submitterEmail || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Visit Logging Webhook

Separate sheet or tab "Visits" with columns: `Timestamp`, `Event`, `Page`, `UserAgent`, `Language`, `Timezone`.

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event || "page_visit",
    data.page || "/",
    data.userAgent || "",
    data.language || "",
    data.timezone || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 10. Ad Monetization Strategy

### Adsterra (Primary)

| Slot | Position | Type | Size |
|------|----------|------|------|
| ad-header-banner | Top of page, below nav | Banner | 728x90 / 320x50 |
| ad-between-cards | After every 6th tool card | Native | 300x250 |
| ad-sidebar | Right sidebar (desktop) | Sticky banner | 300x600 |
| ad-footer | Above footer | Banner | 728x90 |
| ad-submit-page | On Submit a Tool page | Banner | 468x60 |

### Injection Pattern

```html
<div class="ad-slot" id="ad-header-banner" data-ad-key="ADSTERRA_KEY_HERE">
  <ins class="adsterra-ad" data-key="ADSTERRA_KEY_HERE"></ins>
  <script>(adsterra = window.adsterra || []).push({});</script>
</div>
```

### Google AdSense (Secondary)
- Apply after initial traffic is established.
- Use auto-ads as supplement to Adsterra placements.

---

## 11. Visitor Counter Implementation

### Footer Display

```html
<footer>
  <div class="visitor-counter">
    <span>Visitors Today: <strong id="visitors-today">--</strong></span>
    <span>Total Visitors: <strong id="visitors-total">--</strong></span>
  </div>
</footer>
```

### Implementation
- POST visit to Google Sheets webhook on page load.
- Read counts from a published Google Sheet (JSON endpoint).
- Update footer counters on load.
- Small, muted text styling - non-intrusive.

---

## 12. i18n Strategy

### Browser Language Detection

```javascript
const userLang = navigator.language || navigator.languages[0];
const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const lang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
```

### Translation Scope
- UI labels (nav, buttons, headings, footer)
- Category names
- Static page content
- Tool descriptions remain in English (original data)

### Languages Supported
1. English (en)
2. Korean (ko)
3. Japanese (ja)
4. Chinese Simplified (zh)
5. Spanish (es)
6. French (fr)
7. German (de)
8. Portuguese (pt)

---

## 13. SEO Implementation

### Meta Tags

```html
<meta name="description" content="Discover the best free AI tools for image generation, coding, writing, video creation, and more. Curated directory with ratings and reviews.">
<meta name="keywords" content="free AI tools, best AI tools 2025, AI tool directory, AI image generator, AI writing tools">
```

### JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Promptly Board",
  "description": "The ultimate free AI tools and prompts directory.",
  "url": "https://promptly-board.vercel.app/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://promptly-board.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Sitemap Pages
- `/` (index)
- `/about.html`
- `/faq.html`
- `/privacy.html`
- `/terms.html`
- `/submit.html`

---

## 14. Initial Tools Data (30+ entries to include)

Categories to cover with at least 3 tools each:

| Category | Example Tools |
|----------|--------------|
| Chatbot | ChatGPT, Claude, Gemini, Perplexity, Poe |
| Image Gen | DALL-E, Midjourney (free trial), Stable Diffusion, Leonardo AI, Ideogram |
| Coding | GitHub Copilot (free tier), Cursor, Cody, Tabnine, Replit AI |
| Writing | Jasper (free trial), Copy.ai, Writesonic, Rytr, QuillBot |
| Video | Runway (free tier), Pika, HeyGen, Synthesia (free trial) |
| Audio | ElevenLabs (free tier), Murf AI, AIVA, Suno |
| Productivity | Notion AI, Otter.ai, Gamma, Beautiful.ai |
| Research | Elicit, Consensus, ScholarAI, Connected Papers |
| Design | Canva AI, Figma AI, Looka, Khroma |
| Education | Khan Academy AI, Duolingo Max, Photomath |

---

## 15. Deployment Checklist

### Pre-Deployment
- [ ] All features in feature_list.json marked complete
- [ ] tools.json has 30+ curated entries
- [ ] Mobile responsive tested at all breakpoints
- [ ] Search, filter, and pagination working
- [ ] Submit form sends to Google Sheets
- [ ] SEO validated (metatags.io, Google Rich Results Test)
- [ ] Ad placeholders in place
- [ ] Visitor counter functional
- [ ] i18n working for 8+ languages
- [ ] All static pages complete
- [ ] Social sharing buttons functional
- [ ] Lighthouse Performance > 90, SEO > 95

### Deployment Steps
1. Create GitHub repo: `gh repo create PromptlyBoard --private --source=. --push`
2. Deploy to Vercel: `vercel --prod`
3. Verify deployment at Vercel URL.
4. Submit sitemap to Google Search Console.
5. Test all features on production.

### Post-Deployment
- [ ] Google Search Console sitemap submitted
- [ ] Adsterra account configured
- [ ] Share on Reddit (r/artificial, r/ChatGPT, r/SideProject)
- [ ] Submit to Product Hunt
- [ ] Submit to Hacker News (Show HN)

---

## 16. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stale tool data | Users find outdated information | Schedule monthly data review, allow user submissions |
| Low initial traffic | No ad revenue | SEO focus, social media sharing, Reddit posts |
| Tool links broken | Bad UX | Periodic link checking script, user report button |
| Spam submissions | Polluted data | Google Sheets moderation, captcha on form |

---

## 17. Success Metrics

| Metric | Target (30 days) |
|--------|-----------------|
| Daily visitors | 200+ |
| Tools in directory | 50+ |
| Tool submissions | 10+ |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Google indexed pages | All pages |
| Ad impressions | 800+/day |

---

## 18. Privacy & Data

- No user accounts required.
- Tool submission form: collects tool info only, optional email for follow-up.
- Visit logging: timestamp, page, user agent, language, timezone (no PII).
- All data practices disclosed in Privacy Policy.
- GDPR-compliant: no personal data stored.

---

## 19. Future Enhancements (Post-Launch)

- User reviews and ratings system
- Tool comparison feature
- Weekly newsletter with new tools
- Browser extension for quick access
- API for developers to query tool database
- AI-powered tool recommendations
- Prompt library section
- Tool upvoting system

---

*Document Version: 1.0*
*Created: 2026-04-01*
*Methodology: Harness Design*
