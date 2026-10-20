# Olesia Dmytrush — Interactive Portfolio

Personal portfolio of **Olesia Dmytrush** — IT audit & assurance (KPMG Poland), business analysis, QA and
technology (i.c.stars Chicago).

The first screen is an editorial hero with an **interactive reveal**: moving the cursor anywhere over the hero
(or pressing and holding on a phone) uncovers a hidden, perfectly aligned “AI side” of the whole screen —
portrait, headline and background — through an organic, liquid mask. Navigation is a floating control that
opens a full-screen menu. The rest of the site tells the story — about & strengths, experience, a project
gallery with case studies, an AI video studio, skills mapped to evidence, ideas, how I work, journey &
education — and ends with a contact form.

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
| Case studies | `projects` (add optional `links: [{ label, href }]` for real public URLs) |
| AI video / Creative Studio | `aiVideo`, `creativeWorks` |
| Menu labels & subtitles | `nav` |
| Ideas | `innovation` (keep the honest `status`: Concept / In development / Completed) |
| Skills & evidence map | `skills`, `evidenceSources`, `otherTools`, `languageLevels` |
| Process steps | `process`, `aiApproach` |
| Timeline & education | `journey`, `education`, `training` |
| Résumé files | `resumes` (PDFs live in `public/resume/`) |

### Add a project
Add an object to `projects` with a `category` (`'Product & BA' | 'QA & Testing' | 'Operations' |
'Creative & AI'`), `summary`, `status`, `tools` and `learned`. The four existing projects have a custom
cover visual in `src/sections/Projects.tsx` (matched by `id`); a new project gets a clean typographic cover.
Add `links: [{ label, href }]` only for real public URLs — the “View details” dialog shows them.

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
| `public/hero/hero-clean.webp` (+ `-700`) | Hero portrait — Image 1 |
| `public/hero/hero-ai-portrait.webp` (+ `-1000`) | Transparent AI portrait used inside the reveal layer (see `design-source/README.md`) |
| `public/hero/hero-ai-eye.webp` | Eye detail shown inside the hero “Let’s connect” button on hover |
| `public/videos/*.mp4` + `*.webp` | AI video scenes and posters |
| `public/images/olesia-photo.webp` | About photo |
| `public/images/qa-diploma*.webp` | QC/QA diploma |
| `public/og-image.jpg` | Link preview image (1200 × 630) |
| `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-*.png` | Icons |

Keep `hero-clean` and `hero-ai-portrait` at the same framing (the AI portrait at exactly 2× size), or the
reveal will not line up.

---

## Project structure

```
├─ .github/workflows/deploy.yml   GitHub Pages build & deploy
├─ design-source/                 Hero source files + how to replace the AI layer (not shipped)
├─ public/                        Static files copied as-is
│  ├─ hero/                       Clean portrait + transparent AI portrait for the reveal
│  ├─ images/                     About photo, diploma
│  ├─ videos/                     AI video scenes (.mp4) and posters (.webp)
│  ├─ resume/                     4 role-specific résumé PDFs
│  ├─ creative/                   Design / reel files (empty for now)
│  └─ favicon.svg, og-image.jpg …
├─ src/
│  ├─ data/content.ts             ← all text and data
│  ├─ components/
│  │  ├─ hero/Hero.tsx            Hero layout, pointer/touch logic
│  │  ├─ hero/liquidReveal.ts     WebGL liquid-mask engine (+ Canvas 2D fallback)
│  │  ├─ hero/aiLayer.ts          Builds the full-hero “AI side” from the live layout
│  │  ├─ Nav.tsx                  Floating header + full-screen menu with previews
│  │  ├─ ResumeMenu.tsx, Lightbox.tsx, Reveal.tsx, SectionHead.tsx, Icons.tsx
│  ├─ sections/                   About (+ Strengths), Experience, Projects (+ IncidentDemo),
│  │                              CreativeStudio, Skills, InnovationLab, HowIWork, Journey,
│  │                              Contact, Footer
│  ├─ hooks/                      media queries, in-view, scroll-spy, magnetic buttons
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
* Tested at 1920×1080, 1440×900, 1280×800, 768×1024 and 390×844 — no horizontal scrolling.
* Mouse reveal over headline and portrait, mouse-leave collapse, toggle, touch tap and press-and-hold verified.
* Menu: open/close, Escape, focus trap, focus return, section jumps; project dialogs, diploma lightbox and
  video player (full story auto-advance, scene previews) verified on desktop and mobile.
* axe-core accessibility scan: 0 violations (desktop and mobile, including open menu and dialogs).
* Lighthouse: desktop 100 / 100 / 100 / 100; mobile performance ≈ 90, accessibility / best practices / SEO 100.
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
* The Incident → Problem demo uses **illustrative mock data**, not Medline data.
* Private working documents (résumé workbook, feedback, guides) are intentionally **not** part of this repository.
