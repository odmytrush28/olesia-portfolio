"""Clean the approved desk/laptop mockup into a transparent hero photo."""
import sys
import numpy as np, cv2
from PIL import Image

SRC = sys.argv[1]  # e.g. 'Creative Solutions Portfolio Homepage.png'
OUT = sys.argv[2]  # output dir
im = np.array(Image.open(SRC).convert('RGB'))
H, W = im.shape[:2]
B = np.array([252, 250, 250], np.float32)

def dist_map(a):
    return np.abs(a.astype(np.float32) - B).max(axis=2)

# ---------- 1. remove UI overlays (inpaint) ----------
mask = np.zeros((H, W), np.uint8)
d = dist_map(im)
def text_mask(x0, y0, x1, y1, thr=22, dil=3):
    sub = (d[y0:y1, x0:x1] > thr).astype(np.uint8) * 255
    sub = cv2.dilate(sub, np.ones((dil * 2 + 1, dil * 2 + 1), np.uint8))
    mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], sub)
text_mask(1250, 122, 1725, 158)            # OPEN TO OPPORTUNITIES — NATIONWIDE
text_mask(1712, 320, 1756, 545)            # PORTFOLIO // 2026 (vertical)
chroma = im.max(axis=2).astype(int) - im.min(axis=2).astype(int)
R, G, Bc = (im[..., i].astype(int) for i in range(3))
hair_px = (chroma >= 14) & (Bc < G - 8)          # warm blonde tones; pink chip dots have B >= G
for (x0, y0, x1, y1) in [(866, 154, 1108, 226), (1424, 268, 1664, 344)]:
    sub = np.ones((y1 - y0, x1 - x0), np.uint8) * 255
    sub[hair_px[y0:y1, x0:x1]] = 0
    mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], sub)
out = im.copy()
out[mask > 0] = B.astype(np.uint8)   # all of these overlays sit on the plain background

# chip over the shoulder: rebuild the blazer edge by hand
cx0, cy0, cx1, cy1 = 1432, 497, 1700, 545
def edge_x(row, x_from=1380, x_to=1720):
    r = dist_map(out[row:row + 1, x_from:x_to])[0]
    dark = np.where(r > 120)[0]
    return x_from + (dark.max() if len(dark) else 0)
top_e = edge_x(cy0 - 3)
bot_e = edge_x(cy1 + 3)
blazer = np.median(out[cy1 + 4:cy1 + 14, bot_e - 30:bot_e - 8].reshape(-1, 3), axis=0).astype(np.float32)
rng = np.random.default_rng(3)
band = np.zeros((H, W), np.uint8)
for y in range(cy0, cy1):
    t = (y - cy0) / (cy1 - cy0)
    t = t * t * (3 - 2 * t)
    ex = top_e + (bot_e - top_e) * t
    for x in range(cx0, cx1):
        px = out[y, x].astype(np.float32)
        ch = px.max() - px.min()
        cover = np.clip(ex - x + 0.5, 0, 1)        # 1 inside the blazer, 0 outside (AA edge)
        if cover > 0:
            # keep real hair strands, replace chip pixels with blazer fabric
            is_hair = ch > 22 and px.mean() > 90 and px[2] < px[1] - 8
            is_chip = (px.mean() > 105 and not is_hair) or (ch < 14 and px.mean() > 40) or (px[0] > 180 and px[2] >= px[1] - 5 and ch > 30)
            base = blazer + rng.normal(0, 1.6, 3) if is_chip else px
            out[y, x] = np.clip(base * cover + B * (1 - cover), 0, 255).astype(np.uint8)
            if not is_hair and cover > 0.99:
                band[y, x] = 255
        else:
            out[y, x] = B.astype(np.uint8)
# the chip's soft drop shadow on the background around it
for y in range(cy0 - 12, cy1 + 22):
    t = np.clip((y - cy0) / (cy1 - cy0), 0, 1)
    ex = int(top_e + (bot_e - top_e) * (t * t * (3 - 2 * t))) + 2
    seg = out[y, ex:cx1 + 24].astype(np.float32)
    dd = np.abs(seg - B).max(axis=1)
    chs = seg.max(axis=1) - seg.min(axis=1)
    sel = (dd < 40) & (chs < 12)
    seg[sel] = B
    out[y, ex:cx1 + 24] = seg.astype(np.uint8)
Image.fromarray(out).save(f'{OUT}/desk_clean_rgb.png')

# ---------- 2. alpha matte from distance to the white background ----------
d = dist_map(out)
def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)
yy = np.arange(H)[:, None].astype(np.float32)
w_up = 1 - smooth(420, 452, yy)            # 1 in the upper area (ghost letters), 0 low
a_low = smooth(3, 18, d)
chroma2 = (out.max(axis=2).astype(np.float32) - out.min(axis=2).astype(np.float32))
neutral = 1 - smooth(6, 14, chroma2)
a_up = smooth(15, 32, d) * (1 - neutral) + smooth(24, 42, d) * neutral
alpha = a_up * w_up + a_low * (1 - w_up)
# remove specks in the upper area: keep only components touching the subject
bin_ = (alpha > 0.35).astype(np.uint8)
n, lab, stats, _ = cv2.connectedComponentsWithStats(bin_, 8)
keep = np.zeros(n, bool)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] > 1500:
        keep[i] = True
k_mask = keep[lab]
grown = cv2.dilate(k_mask.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
alpha = np.where(grown, alpha, 0)
# fill interior holes (very bright highlights inside the person)
filled = bin_.copy()
cnts, _ = cv2.findContours((k_mask).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
solid = np.zeros_like(bin_)
cv2.drawContours(solid, cnts, -1, 1, thickness=cv2.FILLED)
solid = cv2.erode(solid, np.ones((7, 7), np.uint8))
alpha = np.maximum(alpha, solid.astype(np.float32) * (yy < 452))

# ---------- 3. crop + left fade ----------
x0, y0, x1, y1 = 600, 108, W, H
rgb = out[y0:y1, x0:x1].astype(np.float32)
a = alpha[y0:y1, x0:x1].astype(np.float32)
xx = np.arange(x1 - x0)[None, :].astype(np.float32)
a *= smooth(0, 34, xx)
# the mockup's headline ('D' of WORLD) and the 'View my work' button edge sit left of x≈705
gx = xx + x0; gy = (np.arange(y1 - y0)[:, None] + y0).astype(np.float32)
a = np.where((gx < 708) & (gy < 560), 0, a)
a = np.where(gx < 646, a * smooth(632, 646, gx), a)
# decontaminate colours (un-mix the white background)
a3 = np.clip(a, 1e-3, 1)[..., None]
col = np.clip((rgb - (1 - a3) * B) / a3, 0, 255)
col = np.where(a3 < 0.02, B, col)
rgba = np.dstack([col, a * 255]).astype(np.uint8)
Image.fromarray(rgba, 'RGBA').save(f'{OUT}/desk_rgba.png')
print('crop', rgba.shape, 'edges', top_e, bot_e, 'blazer', blazer)
