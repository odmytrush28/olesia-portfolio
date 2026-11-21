# Design source files

These files are **not** used by the website at runtime. They are here so the hero can be
updated later without redoing the image work.

| File | What it is |
| --- | --- |
| `hero-desk.png` | The hero photo (Olesia at a white desk with a laptop) as a transparent cut-out, 1180 × 775 px — cleaned from the approved homepage mock-up (“Creative Solutions Portfolio Homepage”). |
| `scripts/clean_desk.py` | How `hero-desk.png` was made: removes the mock-up's chips, labels and ghost lettering, then cuts the photo out of the white background. |
| `scripts/make_ai.py` | Builds the web images from `hero-desk.png`: `hero-desk*.webp` (normal photo) and `hero-desk-ai*.webp` (the aligned “AI side”: pink relight, face-mesh wireframe, eye reticles, labels) plus `hero-ai-eye.webp`. |
| `hero-clean.png`, `hero-clean-flat.png` | The previous hero portrait (white blazer). No longer used on the site. |

## How the reveal lines up

The site shows `public/hero/hero-desk.webp` as a normal image. The interactive reveal draws
`public/hero/hero-desk-ai.webp` in **exactly the same box**, so both files must have the same size and
framing. `make_ai.py` creates both from one source, so they always match.

## Replacing the photo

1. Prepare a photo with the same composition (person at a desk, photo on the right, plain white background).
2. Run `python3 scripts/clean_desk.py <your-image.png> <out-folder>` if it comes from a mock-up with labels,
   or save a transparent PNG yourself.
3. Run `python3 scripts/make_ai.py <out-folder>/desk_rgba.png public/hero` (needs Python with Pillow,
   NumPy, OpenCV and SciPy). The face-mesh points in `make_ai.py` (`P = {...}`) are placed by hand for this
   photo — move them if you change the photo.
4. If the face sits somewhere else in the new photo, update `FACE` in `src/components/hero/Hero.tsx`
   and `face` in `src/components/hero/aiLayer.ts` (both are 0–1 fractions of the photo).
