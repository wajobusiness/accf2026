# ACCBCF Website — Build Prompt for Google Antigravity (Next.js Edition)

Paste everything below into Antigravity as the build brief.

---

## Project

Build the **ACCBCF (Africa China Chairmen of Business Forum)** website — an Abuja, Nigeria–headquartered platform connecting African and Chinese governments, businesses, and capital. Institutional/diplomatic-grade design, not a generic template look.

## Stack

- **Frontend**: Next.js (App Router, TypeScript). SSG/ISR for marketing pages, ISR or dynamic rendering for the blog.
- **CMS/Backend**: Payload CMS, self-hosted, running natively inside the same Next.js app (Payload 3's Next.js integration) — gives a full admin dashboard for editing content and publishing blog posts with zero code changes.
- **Database**: PostgreSQL (Payload's Postgres adapter).
- **Styling**: Tailwind CSS with the brand tokens below. shadcn/ui is fine as a base but must be restyled to brand — no default/unstyled look.
- **Bilingual EN / 中文**: Payload's built-in `localization` config (not a separate i18n plugin) so each collection holds both locales in one place; frontend reads the active locale via the Next.js App Router `[locale]` segment or a query param, your call.
- **Hosting target**: Vercel for the frontend, or a single Node host running Next.js + Payload together; media via Payload's file/S3 upload adapter.

## Brand System

```css
--accbcf-blue: #0064B4;      /* primary — header, nav, buttons, links */
--accbcf-gold: #F0B428;      /* secondary — accents, dividers, hovers */
--accbcf-red: #DC0000;       /* sparing accent — key CTAs, badges */
--accbcf-orange: #F07828;    /* warm accent — gradients, stat highlights */
--accbcf-yellow: #F0DC50;    /* rare highlight — tags, hover glow */
--accbcf-charcoal: #1A1A1A;  /* body text */
--accbcf-gray: #6B7280;      /* muted/meta text */
--accbcf-light: #F7F8FA;     /* alternating section background */
```

**Typography**: Headings in a serif/slab (Playfair Display or Merriweather via `next/font/google`). Body/UI in a clean sans (Inter or Source Sans 3). Chinese text in Noto Sans SC. Body minimum 16px.

**Visual rules**:
- No accent line under every title, no rainbow gradients, no cream/beige section backgrounds (use white, `--accbcf-light`, or `--accbcf-blue`).
- No decorative color bars/stripes on cards or section edges.
- Logo on white/light backgrounds only; use a simplified single-color mark in header/footer for small placements.
- Real photography preferred; until supplied, use dignified stock business/diplomatic photography — no generic stock-logo placeholders, no fake stats.

## Motion & Interaction Design (make this feel alive, not a static brochure)

**Libraries**: Framer Motion (`motion` package) as primary — component transitions, scroll reveals, layout animation. GSAP + ScrollTrigger for multi-step scroll-driven sequences (org chart draw-in, hero parallax). Respect `prefers-reduced-motion` everywhere — every non-essential animation needs a static fallback.

- **Hero**: logo scales in (90%→100%) with fade, then headline reveals word-by-word/line-by-line, then slogan. A faint gold African-continent SVG outline draws itself in via stroke-dashoffset (~1.5s). Subtle red-to-gold ambient glow pulses behind the dragon motif (6–8s loop, slow/non-distracting). Mouse-move parallax on the continent-outline and dragon-texture layers (desktop only, a few px of travel, disabled on touch). Primary CTA has a magnetic hover + gold sheen sweep.
- **Scroll reveals**: every major section fades up (opacity 0→1, translateY 24px→0) via Framer Motion `whileInView`, `viewport={{ once: true }}` — never re-trigger on scroll-back. Card grids (Core Values, Sectors, Advantages) stagger children ~80–120ms.
- **Strategic Positioning (G2G/G2B/B2B/B2C)**: four connected nodes with animated connecting lines that draw in sequence on scroll; hover/tap a node highlights its lines and surfaces its description.
- **Governance org chart**: coded vertical flow (not an image) — tiers animate top-down as the section scrolls, connecting lines drawing progressively via GSAP ScrollTrigger scrubbed to scroll position; member cards stagger in per tier.
- **Sector/Advantage grids**: icon hover shifts gold→orange with a quick scale (1→1.05) + shadow lift, ~150ms, no bounce.
- **Navigation**: header goes transparent→blurred brand-blue on scroll past hero (backdrop-filter blur, ~200ms). Active nav link underline slides between links.
- **Page transitions**: brief fade/slide via `AnimatePresence`, under 300ms — no full-screen wipes.
- **Stat counters**: animate 0→value on scroll-into-view (~1.2s ease-out), once only.
- **Performance**: motion must never block LCP — hero text/logo visible immediately, animation layered on top. Lazy-load GSAP/Lottie only on pages using them. Target 60fps on a mid-range mobile device, not just desktop.

## Placeholder Media (temporary — swap before launch)

Real photography (board members, ACCBCF meetings, the Abuja office) isn't available yet. Use dignified stock photography from Unsplash (free, commercial-use, no attribution required) as placeholders, wired through the same CMS media fields the real assets will occupy later:

| Placement | Search category |
|---|---|
| Hero background texture | africa-map-gold / abstract-gold-texture |
| About / credibility section | african-business-meeting |
| Governance / committee cards | business-portrait-professional (per-member placeholder headshots) |
| Strategic Positioning / G2G imagery | government-building-africa |
| Priority Sectors icons | use a consistent icon set (Phosphor Icons or Lucide) instead of photos |
| News & Insights placeholder covers | business-conference |
| Contact / office section | abuja-nigeria / modern-office-building |

Pull fresh images from these categories at build time and store them as local/CMS-hosted assets rather than permanent hotlinks to Unsplash's CDN (a linked photo can be taken down later).

## Site Structure (Next.js routes)

- `/` — Home: hero (logo, headline "Africa China Chairmen of Business Forum", slogan "Connecting Governments · Empowering Business · Creating Shared Prosperity", CTA "Partner With Us"), credibility strip (Est. 30 March 2026, HQ Abuja, four cooperation models), About snapshot, Vision/Mission/Core Values cards, Strategic Positioning (G2G/G2B/B2B/B2C tiles), Priority Sectors icon grid, Platform Advantages grid, latest 3 blog posts (fetched from Payload), Contact/CTA band.
- `/about` — Overview, Vision, Mission, Core Values, Strategic Positioning detail.
- `/governance` — vertical org-chart component (coded, not an image): Board of Directors → Stakeholders Leadership Committee → Senior Advisory Committee → Executive Management Committee → Secretariat (International Cooperation Dept, International Liaison Dept, Trade & Investment Dept/Media Center, China–Africa Business Mediation Center, Branding & Communications Center) → Industry Professional Committees (Agriculture, Mining, Energy, Engineering, Manufacturing, Medical, Finance). Member cards from the `committeeMembers` collection.
- `/programs` — one card per: Government Cooperation, Investment Promotion, Financial Services, Legal & Compliance, International Communication, Business Matching. Each links to `/contact` with a pre-filled interest area.
- `/sectors` — 12-tile grid: Agriculture, Mining, Energy, Manufacturing, Infrastructure, Healthcare, Financial Services, Digital Economy, Logistics, Industrial Parks, Green Economy, Smart Cities.
- `/news` (blog index) and `/news/[slug]` (single post) — fetched from the `posts` collection, categories, bilingual per Payload locale.
- `/events` — from the `events` collection, can launch empty.
- `/contact` — form (Name, Organization, Country, Email, Phone, Message, Interest Area dropdown mapped to Core Services), office address, email, WhatsApp click-to-chat, embedded map.
- Global: header with EN/中文 switcher + "Partner With Us" CTA; footer with sitemap, contact info, social links.

## Payload Collections

| Collection | Purpose | Key Fields |
|---|---|---|
| `posts` | News & Insights blog | title, slug, featuredImage, category, richText body, author, publishedDate — localized (en/zh) |
| `committeeMembers` | Board / committee profiles | name, photo, title, committee/department, bio |
| `coreServices` | Programs & Services | name, icon, shortDescription, longDescription |
| `prioritySectors` | Sector grid | name, icon, shortDescription |
| `events` | Future events module | title, date, location, description, registrationLink |
| `siteSettings` (global) | Editable site-wide options | contact details, hero headline/slogan, social links, footer content |

## Data Flow

- Marketing pages: fetch from Payload's REST or GraphQL API at build time (SSG), revalidate on a schedule or via webhook when content changes.
- Blog: ISR with on-demand revalidation so new posts appear without a full redeploy.
- Enable Payload's draft-preview so editors can view unpublished changes before publishing.

## Non-Functional Requirements

- Mobile-first, fully responsive.
- Fast load: `next/image` for optimized/lazy images, edge caching.
- Accessible: semantic HTML, WCAG AA contrast (verify blue/gold/white combinations), alt text everywhere.
- SEO: per-page metadata via the Next.js Metadata API, Organization structured data (schema.org), generated `sitemap.xml` + `robots.txt`.
- 100% of client-specific content (team, sectors, services, contact info, blog) editable by non-technical staff from the Payload admin dashboard — zero code changes required.

## Real Content to Use (do not invent placeholder content)

Use the ACCBCF Product Bible (companion document) for all real copy: About/Vision/Mission/Core Values text, Strategic Positioning, Platform Advantages, Priority Sectors, Governance structure, Core Services, Future Outlook, and contact details (email: africachinachairmenforum@gmail.com, WhatsApp: +234 916 016 6906, HQ: Block D, Federal Ministry of Industry, Trade and Investment, Old Federal Secretariat, Area 1, Garki, Abuja, Nigeria).

**Do not carry over anything from the old demo** (thekingsministry.org/test/) — that content belongs to a different, unrelated organization and must not appear anywhere (wrong name "African-China Chairman Forum," wrong HQ cities, fake board members, fake stats, placeholder logos).

## Deliverable

A working Next.js + Payload CMS app — collections and admin dashboard configured, all routes above built and styled to the brand system, seed data from the Product Bible in place, ready to connect to production Postgres + hosting and have real photography and board-member data added through the admin UI.
