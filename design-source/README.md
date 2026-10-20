# Design source files

These files are **not** used by the website at runtime. They are here so the hero can be
updated later without redoing the image work.

| File | What it is |
| --- | --- |
| `hero-clean.png` | The clean portrait (Image 1) as a transparent cut-out, 1000 × 934 px. Same as `public/hero/hero-clean.webp`. |
| `hero-clean-flat.png` | The same portrait on the site's warm-white background (#FAF8F6). Use this one as the input for AI image editing. |

## Replacing the AI portrait

The hero reveal shows an “AI side” of the whole hero. It is assembled in the browser from the live layout
(see `src/components/hero/aiLayer.ts`): dark grid background + glowing copy + **the AI portrait**
`public/hero/hero-ai-portrait.webp`, a *transparent* image placed at exactly the same position as the clean
photo. The portrait must therefore have exactly the same framing as Image 1.

The current AI portrait was generated *from* the clean portrait (neon relight, face-landmark wireframe,
eye reticles), so it is aligned pixel-for-pixel.

If you want a different look (for example a robotic face-plate):

1. Open an AI image editor that supports **editing an existing image** (not generating a new one).
2. Upload `hero-clean-flat.png` and ask it to keep the exact pose, framing, size, hair and
   clothing, and only add the futuristic / cybernetic elements.
3. Check the result by overlaying it on `hero-clean-flat.png` at 50% opacity — eyes, nose, mouth,
   hair and shoulders must line up.
4. Remove the background (transparent PNG), export it at **2000 × 1868 px** (exactly 2× the clean image) and
   save it as `public/hero/hero-ai-portrait.webp`, plus a **1000 × 934 px** copy as
   `public/hero/hero-ai-portrait-1000.webp` (used on smaller screens). Optionally replace the 96 × 96 eye crop
   `public/hero/hero-ai-eye.webp` (shown inside the “Let’s connect” button on hover).

No code changes are needed.
