"""Build the hero images: clean desk photo (two sizes) + aligned 'AI side' layer."""
import sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.spatial import Delaunay

SRC, OUT = sys.argv[1], sys.argv[2]
SCALE = 1.55
rgba = np.array(Image.open(SRC).convert('RGBA')).astype(np.float32)
h0, w0 = rgba.shape[:2]
W, H = int(round(w0 * SCALE)), int(round(h0 * SCALE))

def up(img):
    return cv2.resize(img, (W, H), interpolation=cv2.INTER_LANCZOS4)

# --- upscale the clean photo (premultiplied, to avoid fringes) ---
a0 = rgba[..., 3:] / 255
pm = up(rgba[..., :3] * a0)
a = np.clip(up(a0[..., 0]), 0, 1)
col = np.where(a[..., None] > 1e-3, pm / np.maximum(a[..., None], 1e-3), 255)
col = np.clip(col, 0, 255)
# gentle sharpening after upscale
blur = cv2.GaussianBlur(col, (0, 0), 1.2)
col = np.clip(col + (col - blur) * 0.45, 0, 255)
clean = np.dstack([col, a * 255]).astype(np.uint8)
Image.fromarray(clean, 'RGBA').save(f'{OUT}/hero-desk.webp', quality=90, method=6)
small = Image.fromarray(clean, 'RGBA').resize((1000, round(1000 * H / W)), Image.LANCZOS)
small.save(f'{OUT}/hero-desk-1000.webp', quality=88, method=6)
Image.fromarray(clean, 'RGBA').resize((1300, round(1300 * H / W)), Image.LANCZOS).save(f'{OUT}/hero-desk-1300.webp', quality=86, method=6)
print('clean', W, H, 'small', small.size)

# --- AI side ---
def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)
lum = (0.3 * col[..., 0] + 0.59 * col[..., 1] + 0.11 * col[..., 2]) / 255
chroma = (col.max(axis=2) - col.min(axis=2))
gray3 = np.repeat(lum[..., None] * 255, 3, axis=2)
base = (col * 0.42 + gray3 * 0.58) * 0.56                       # desaturate + darken
pinkc = np.array([255, 63, 108], np.float32)
rim = pinkc * (np.clip(lum, 0, 1) ** 1.7)[..., None] * 0.62     # pink relight on the highlights
ai_rgb = np.clip(base * np.array([0.92, 0.78, 0.98]) + rim, 0, 255)
light_neutral = smooth(0.55, 0.82, lum) * (1 - smooth(10, 28, chroma))
ai_rgb = ai_rgb * (1 - 0.72 * light_neutral[..., None])        # laptop/chair/desk turn dark — outlines carry them
a_ai = a * (1 - 0.35 * light_neutral)
# neon edges (desk, laptop, chair, hair outline)
gray = cv2.cvtColor(col.astype(np.uint8), cv2.COLOR_RGB2GRAY)
edges = cv2.Canny(cv2.GaussianBlur(gray, (0, 0), 1.4), 26, 70).astype(np.float32) / 255
edges = cv2.GaussianBlur(edges, (0, 0), 0.9) * (a > 0.02)
edge_col = np.array([255, 92, 140], np.float32)
ea = np.clip(edges * 1.6, 0, 1) * 0.62
out_rgb = ai_rgb * a_ai[..., None]
out_a = a_ai.copy()
# composite edges over (premultiplied)
out_rgb = out_rgb * (1 - ea[..., None]) + edge_col * ea[..., None]
out_a = out_a * (1 - ea) + ea
# soft pink outer glow underneath the subject
glow = cv2.GaussianBlur(a_ai, (0, 0), 16) * 0.34
glow_col = np.array([255, 63, 108], np.float32)
g = glow * (1 - out_a)
out_rgb = out_rgb + glow_col * g[..., None]
out_a = out_a + g
rgb_un = np.where(out_a[..., None] > 1e-3, out_rgb / np.maximum(out_a[..., None], 1e-3), 0)
ai = Image.fromarray(np.dstack([np.clip(rgb_un, 0, 255), np.clip(out_a, 0, 1) * 255]).astype(np.uint8), 'RGBA')

# --- vector overlays: face mesh, eye reticles, HUD labels (coords in crop space) ---
P = {
    'eyeL': (567, 189), 'eyeR': (643, 178),
    'eyeLo': (548, 193), 'eyeLi': (583, 189), 'eyeRi': (627, 182), 'eyeRo': (662, 177),
    'browL1': (535, 177), 'browL2': (580, 168), 'browR1': (622, 160), 'browR2': (663, 155),
    'bridge': (610, 172), 'nose': (612, 233), 'nostL': (590, 235), 'nostR': (630, 233),
    'mouthL': (580, 265), 'mouthR': (645, 260), 'lipU': (613, 258), 'lipD': (613, 278),
    'chin': (610, 313), 'jawL': (557, 293), 'jawR': (677, 287),
    'cheekL': (535, 217), 'cheekR': (687, 210), 'templeL': (530, 160), 'templeR': (693, 147),
    'forehead': (607, 112), 'hairL': (557, 102), 'hairR': (653, 99),
    'midL': (560, 240), 'midR': (662, 232),
}
pts = np.array([v for k, v in P.items()], np.float32)
tri = Delaunay(pts)
layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(layer)
S = lambda p: (p[0] * SCALE, p[1] * SCALE)
pink = (255, 92, 140)
seen = set()
for simplex in tri.simplices:
    for i in range(3):
        e = tuple(sorted((simplex[i], simplex[(i + 1) % 3])))
        if e in seen:
            continue
        seen.add(e)
        p1, p2 = pts[e[0]], pts[e[1]]
        if np.hypot(*(p1 - p2)) > 80:
            continue
        d.line([S(p1), S(p2)], fill=pink + (165,), width=1)
for p in pts:
    x, y = S(p)
    d.ellipse([x - 2.2, y - 2.2, x + 2.2, y + 2.2], fill=(255, 170, 196, 230))
for k in ('eyeL', 'eyeR'):
    x, y = S(P[k])
    for r, wdt, al in [(17, 2, 230), (10, 1, 200)]:
        d.ellipse([x - r, y - r, x + r, y + r], outline=pink + (al,), width=wdt)
    d.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(255, 63, 108, 255))
    d.line([(x - 26, y), (x - 19, y)], fill=pink + (220,), width=2)
    d.line([(x + 19, y), (x + 26, y)], fill=pink + (220,), width=2)
    d.line([(x, y - 26), (x, y - 19)], fill=pink + (220,), width=2)
    d.line([(x, y + 19), (x, y + 26)], fill=pink + (220,), width=2)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', int(15 * SCALE * 0.75))
def label(text, anchor_pt, at, align='left'):
    ax, ay = S(anchor_pt)
    lx, ly = S(at)
    tw = d.textlength(text, font=font)
    pad = 7
    box = [lx - pad, ly - 13, lx + tw + pad, ly + 13] if align == 'left' else [lx - tw - pad, ly - 13, lx + pad, ly + 13]
    ex = box[0] if align == 'left' else box[2]
    d.line([(ax, ay), (ex, ly)], fill=pink + (150,), width=1)
    d.ellipse([ax - 3, ay - 3, ax + 3, ay + 3], fill=pink + (255,))
    d.rounded_rectangle(box, radius=5, fill=(20, 10, 22, 215), outline=pink + (170,), width=1)
    d.text((box[0] + pad, ly - 9), text, fill=(255, 226, 234, 255), font=font)
label('ANALYZE', P['templeL'], (430, 128), 'right')
label('CURIOSITY: ON', P['hairR'], (720, 70))
label('VERIFY', P['eyeRo'], (760, 196))
label('UA · PL · RU · EN', P['jawR'], (755, 300))
label('PATTERN: 3 IN 24H → PROBLEM', (900, 560), (812, 452))
ai = Image.alpha_composite(ai, layer)
ai.save(f'{OUT}/hero-desk-ai.webp', quality=88, method=6)
ai.resize(small.size, Image.LANCZOS).save(f'{OUT}/hero-desk-ai-1000.webp', quality=86, method=6)
ai.resize((1300, round(1300 * H / W)), Image.LANCZOS).save(f'{OUT}/hero-desk-ai-1300.webp', quality=84, method=6)
# eye detail for the hero CTA hover (96×96)
ex, ey = S(P['eyeL'])
eye = ai.crop((int(ex - 60), int(ey - 60), int(ex + 60), int(ey + 60))).resize((96, 96), Image.LANCZOS)
bg = Image.new('RGBA', eye.size, (20, 10, 22, 255)); bg.alpha_composite(eye)
bg.convert('RGB').save(f'{OUT}/hero-ai-eye.webp', quality=88)
print('ai done')
