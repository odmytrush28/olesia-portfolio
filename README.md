# Olesia Dmytrush — Interactive Portfolio

Personal portfolio of **Olesia Dmytrush** — Business Analyst · AI & Data Solutions · IT Audit & QA
(KPMG Poland, i.c.stars Chicago).

The site is split into **pages** (hash routes, so they work on GitHub Pages and the browser's Back button
always stays on the site):

| Page | Address | What's on it |
| --- | --- | --- |
| Home | `#/` | Interactive hero (desk photo + hidden “AI side”), four focus areas, featured case studies, experience path |
| About | `#/about` | Story & portrait, six strengths, how I work, journey timeline, education |
| Experience | `#/experience` | Roles (KPMG, i.c.stars, real estate, bank), spotlights, skills mapped to evidence |
| KPMG spotlight | `#/experience/kpmg` | IT Audit & Assurance in detail — the audit cycle and responsibilities |
| Projects | `#/projects` | Case-study gallery with filters + ideas lab |
| Case studies | `#/projects/medline`, `/cybersecurity-challenge`, `/cycle-soundtrack`, `/qa`, `/aivideo` | One page per project |
| Creative Studio | `#/studio` | AI video & creative experiments |
| Contact | `#/contact` | Contact form, email, LinkedIn, résumés |

The hero has an **interactive reveal**: moving the cursor anywhere over it (or pressing and holding on a
phone) uncovers a hidden, perfectly aligned “AI side” of the whole screen through an organic, liquid mask.

---

## Tech stack

| Area | Choice | Why |
| --- | --- | --- |
| Framework | **React 19 + TypeScript** | Component structure, type-safe content |
| Build | **Vite 8** | Fast dev server, small static output for GitHub Pages |
| Styling | Plain CSS with design tokens (`src/styles/tokens.css`) | Full control of the editorial look, no framework overhead |
| Hero reveal | **Raw WebGL** shader (Canvas 2D fallback) | Smooth 60 fps morphing mask, no animation library needed |
| Fonts | Outfit + JetBrains Mono, self-hosted via `@fontsource-variable` | No third-party font requests |
| Contact form | **Web3Forms** (free) | Real email delivery from a static site, no server, no secret keys |
| Hosting | **GitHub Pages** via GitHub Actions | Free, automatic deploys on every push |

No UI framework, animation library or analytics script is included.

---

## Run it locally

Requirements: **Node.js 20.19+** (22 LTS recommended) and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173
npm run build      # type-check and build into dist/
npm run preview    # serve the production build → http://localhost:4173
```

---

## Deploy to GitHub Pages

1. **Create a repository** on GitHub (for example `portfolio`). Leave it empty — no README.
2. **Push this folder** (run inside the project folder):

   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```

   > The deploy workflow must be at `.github/workflows/deploy.yml`. If your copy has it in
   > `setup/deploy.yml` instead, create the `.github/workflows/` folders and move it there before pushing.

3. On GitHub open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab — the “Deploy to GitHub Pages” workflow builds and publishes the site.
   When it finishes, the address is shown on the workflow run and in Settings → Pages
   (e.g. `https://YOUR-USERNAME.github.io/portfolio/`).

Every later `git push` to `main` redeploys automatically.

**Paths:** the site uses a relative base (`base: './'` in `vite.config.ts`), so it works under any repository
name — or as a user site named `YOUR-USERNAME.github.io` — without changing configuration.

---

## Turn on the contact form (Web3Forms)

Until a key is added, the form clearly says so, and pressing **Send** opens the visitor’s email app with the
message pre-filled — nothing is lost and nothing pretends to be sent.

1. Go to **https://web3forms.com**, enter `olesia.dmytrush@gmail.com`, and create an access key.
   The key arrives by email. (It is a *public* key — it can only send messages to your inbox, so it is safe
   in front-end code.)
2. **For the live site:** GitHub repository → **Settings → Secrets and variables → Actions → Variables →
   New repository variable** → name `WEB3FORMS_ACCESS_KEY`, value = your key. Then re-run the workflow
   (Actions → Deploy to GitHub Pages → Run workflow).
3. **For local testing:** copy `.env.example` to `.env` and paste the key after `VITE_WEB3FORMS_ACCESS_KEY=`.
4. **Test it:** send yourself a message from the live site and confirm it arrives (check spam the first time).

Spam protection: a hidden honeypot field, a “too fast to be human” check, and Web3Forms’ own filtering.
Validation and success/error states are built in; on any error the visitor is offered a direct email link.

---

## Update the content

**All text lives in one file: `src/data/content.ts`.** Each section renders from it.

| To change… | Edit in `content.ts` |
| --- | --- |
| Name, email, LinkedIn, GitHub | `profile` — set `github: 'https://github.com/your-username'` to show GitHub links everywhere |
| Hero headline / intro / chips | `hero` |
| About story, facts, strengths | `about` |
| Jobs | `experience` (newest first) |
| Home focus areas | `focusAreas` |
| Project cards | `projects` (add optional `links: [{ label, href }]` for real public URLs) |
| Medline case study | `medlineCase`, `rollingDemo` (illustrative data for the 24-hour demo) |
| Cybersecurity Challenge | `cyberChallenge` |
| Cycle Soundtrack (Gift) | `cycleSoundtrack` (video, photos, quotes) |
| KPMG spotlight page | `kpmgSpotlight` |
| AI video / Creative Studio | `aiVideo`, `creativeWorks` |
| Menu labels & subtitles | `nav` |
| Ideas | `innovation` (keep the honest `status`: Concept / In development / Completed) |
| Skills & evidence map | `skillAreas` (professional strengths by area), `skills.developing`, `evidenceSources`, `otherTools`, `languageLevels` |
| Process steps | `process`, `aiApproach` |
| Timeline & education | `journey`, `education`, `training` |
| Résumé files | `resumes` (PDFs live in `public/resume/`) |

### Add a project
Add an object to `projects` with a `category` (`'Business Analysis' | 'Cybersecurity' | 'Leadership' |
'QA & Testing' | 'Creative & AI'`), `summary`, `status`, `role`, `tools` and — for the generic case-study
layout — `problem`, `goal`, `work`, `outcome`, `learned`. It automatically gets a page at `#/projects/<id>`.
Cover art lives in `src/components/ProjectCover.tsx` (matched by `id`); bespoke page layouts are in
`src/sections/case/`. Add `links: [{ label, href }]` only for real public URLs.

### Add Cybersecurity Challenge screenshots
When the Tech Expo version has screenshots, put them in `public/images/cyber/` and add them to the
`CyberCase` page (`src/sections/case/CyberCase.tsx`). Until then the page shows an illustrated cover and a
small playable concept preview that is clearly labelled as a preview.

### Cycle Soundtrack video
`public/videos/cycle-soundtrack.mp4` is a web-compressed copy (720p, ~40 MB) of the original video; the
original stays outside the repository (`Video/` is in `.gitignore` because GitHub rejects files over 100 MB).
To re-export: `ffmpeg -i original.mp4 -vf "scale=-2:720" -c:v libx264 -preset medium -crf 26 -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/videos/cycle-soundtrack.mp4`

### AI video (Creative Studio)
The film shown in the Creative Studio is defined in `aiVideo` in `content.ts` (title, credits, what was
yours vs. generated by AI, and the scene list). Each scene `id` maps to two files in `public/videos/`:
`<id>.mp4` (H.264, 9:16) and `<id>.webp` (poster). To add a film, export the clips, then create posters, e.g.

```bash
ffmpeg -i scene.mp4 -vf "scale=540:-2" -c:v libx264 -crf 24 -preset slow -movflags +faststart -c:a aac -b:a 96k public/videos/my-scene.mp4
ffmpeg -ss 1 -i public/videos/my-scene.mp4 -frames:v 1 -vf "scale=540:-2" public/videos/my-scene.webp
```

### Add design work, reels and other creative files
1. Put the files in `public/creative/` (images as `.webp`/`.jpg`; videos as `.mp4` plus a poster image).
2. Add entries to `creativeWorks`, e.g.

   ```ts
   {
     id: 'listing-reel',
     type: 'video',
     src: 'creative/listing-reel.mp4',
     poster: 'creative/listing-reel.jpg',
     title: 'Listing reel',
     category: 'Reels',
     description: 'Short listing video for a real-estate agent.',
     tools: ['CapCut'],
     ratio: 9 / 16,
   }
   ```

A “Design & content” gallery (with category filters and a lightbox) appears under the AI video
automatically once the list is not empty.

### Replace images
| File | Used for |
| --- | --- |
| `public/hero/hero-desk.webp` (+ `-1300`, `-1000`) | Hero photo — Olesia at her desk (transparent background) |
| `public/hero/hero-desk-ai.webp` (+ `-1300`, `-1000`) | The aligned “AI side” of the same photo, shown through the reveal (see `design-source/README.md`) |
| `public/hero/hero-ai-eye.webp` | Eye detail shown inside the hero “Let’s connect” button on hover |
| `public/videos/*.mp4` + `*.webp` | AI film scenes, Cycle Soundtrack video and posters |
| `public/images/olesia-portrait*.webp` | About photo (professional portrait; source crop in `design-source/olesia-portrait-source.png`) |
| `public/images/techbash/*.webp` | TechBash 2026 photos on the Cycle Soundtrack page |
| `public/images/qa-diploma*.webp` | QC/QA diploma |
| `public/og-image.jpg` | Link preview image (1200 × 630) |
| `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-*.png` | Icons |

Keep `hero-desk` and `hero-desk-ai` at exactly the same size and framing, or the reveal will not line up.

---

## Project structure

```
├─ .github/workflows/deploy.yml   GitHub Pages build & deploy
├─ design-source/                 Hero source files + how to replace the AI layer (not shipped)
├─ public/                        Static files copied as-is
│  ├─ hero/                       Desk photo + aligned AI version for the reveal
│  ├─ images/                     About portrait, diploma, TechBash photos
│  ├─ videos/                     AI film scenes, Cycle Soundtrack video, posters
│  ├─ resume/                     4 role-specific résumé PDFs
│  ├─ creative/                   Design / reel files (empty for now)
│  └─ favicon.svg, og-image.jpg …
├─ src/
│  ├─ data/content.ts             ← all text and data
│  ├─ router.tsx                  Tiny hash router (pages, links, Back/Forward)
│  ├─ pages/                      Home, About, Experience, KPMG, Projects, ProjectPage, Studio, Contact, 404
│  ├─ components/
│  │  ├─ hero/Hero.tsx            Hero layout, pointer/touch logic
│  │  ├─ hero/liquidReveal.ts     WebGL liquid-mask engine (+ Canvas 2D fallback)
│  │  ├─ hero/aiLayer.ts          Builds the full-hero “AI side” from the live layout
│  │  ├─ Nav.tsx                  Floating header + full-screen menu with previews
│  │  ├─ ProjectCover.tsx         Cover art for each project
│  │  ├─ CountUp, ResumeMenu, Lightbox, Reveal, SectionHead, Icons
│  ├─ sections/                   About (+ Strengths), Experience, Projects, CreativeStudio,
│  │                              Skills, InnovationLab, HowIWork, Journey, Contact, Footer, home.css
│  │  └─ case/                    Case-study pages: Medline (+ RollingDemo), Cybersecurity,
│  │                              Cycle Soundtrack, generic (QA, AI film), shared parts
│  ├─ hooks/                      media queries, in-view, magnetic buttons
│  └─ styles/                     tokens.css (design system) + base.css
├─ index.html                     SEO, Open Graph, structured data
└─ vite.config.ts
```

---

## How the hero reveal works

* The normal hero is plain HTML: a portrait `<img>` (fast first paint, accessible alt text) and real text.
* The **AI side** covers the *entire* hero. On first interaction, `aiLayer.ts` measures the live layout and
  draws a full-size canvas: a dark grid background, the transparent AI portrait at the exact position of the
  photo, and the headline, intro and labels redrawn glyph-by-glyph at their exact positions in light/neon
  colours. Because it is built from the real layout, it lines up at every screen size and is rebuilt on resize.
* A WebGL canvas shows that layer through the liquid mask. It sits above the text but ignores the pointer, and
  the buttons sit above it — so everything stays readable and clickable while the reveal is open.
* The mask is a signed-distance “metaball” of three wobbling blobs: the lead blob follows the pointer with
  easing, two trailing blobs follow it, and a smooth union melts them into one liquid shape. Layered sine
  waves and a slow domain warp keep the edge morphing; a soft feather and a thin accent rim finish it.
* It only renders while the mask is visible; when the pointer leaves, the mask collapses and rendering stops.
* **Touch:** tap = short peek; press & hold = drag the reveal (page scroll pauses only during the hold).
* **Keyboard / accessibility:** the “Reveal AI side” toggle shows the layer over the face without a pointer.
* **Reduced motion:** the mask stops morphing and follows the pointer directly, without inertia.

---

## Quality checklist (verified before hand-over)

* Production build and TypeScript check pass with no errors; no console errors.
* Automated Playwright suite (every page, every internal link, every file, header/menu/footer links, Back &
  Forward, filters, case-study controls, demo, quiz, lightboxes, video viewer, journey filter, skills map,
  contact form) — run at 1440×900, 768×1024 and 390×844.
* axe-core accessibility scan: 0 violations on every page (desktop and mobile, including open menu and lightbox).
* Lighthouse: desktop 100 / 100 / 100 / 100; mobile performance ≈ 90+, accessibility / best practices / SEO 100.
* Works from a sub-folder (GitHub Pages project URL) with no missing files.
* Semantic landmarks, one `h1`, skip link, visible focus states, keyboard-operable tabs/accordions/menus,
  `prefers-reduced-motion` respected.
* First load ≈ 100 KB JS (gzip) + ~95 KB hero image + self-hosted fonts; the AI layer, videos and
  everything below the fold load only when needed.

---

## Credits & privacy

* Photos, portrait artwork, diploma and résumés: © Olesia Dmytrush — not for reuse.
* Fonts: [Outfit](https://fonts.google.com/specimen/Outfit) and
  [JetBrains Mono](https://www.jetbrains.com/lp/mono/), both SIL Open Font License 1.1.
* The rolling 24-hour demo and the ticket illustration on the Medline page use **illustrative mock data**, not Medline data.
* Quotes on the Cycle Soundtrack page come from messages sent to Olesia by i.c.stars staff (Nov 2026).
* Private working documents (résumé workbook, feedback, guides) are intentionally **not** part of this repository.
