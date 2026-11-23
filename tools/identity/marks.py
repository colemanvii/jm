"""Build the three Joseph Martin wordmark studies as outlined vector paths.

Reads only the SIL OFL fonts already in assets/fonts/. Writes:
  assets/identity/*.svg        standalone marks (fill="currentColor" so they recolour inline)
  assets/identity/marks.js     window.JMMARKS = {...} for inline use in the study pages

Run:  python3 -I tools/identity/marks.py
Needs: fonttools, brotli  (pip install fonttools brotli)

Directions
  I   THREAD  Archivo at its widest, tracked; one running stitch underneath that starts in a knot
              and leaves a loose tail. From the custom stitching Joseph is known for.
  II  CHARM   Libre Caslon Display capitals; a gold charm hangs between the names on a jump ring.
              From the charms on every current hat (sailboat, moon, leaf, flower). The charm changes
              with the hat; the name never does.
  III GEORGE  Barlow Condensed capitals beside Cowboy George, the existing Joseph Martin mascot,
              in the red ink of the drawings. George is applied in the pages as a mask of the
              original line drawing (assets/mcdc/cowboy-george-line.png), never redrawn.
"""
import json, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib import instancer

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
OUT = os.path.join(ROOT, 'assets', 'identity')
os.makedirs(OUT, exist_ok=True)


def load(name, axes=None):
    f = TTFont(os.path.join(FONTS, name))
    if axes:
        f = instancer.instantiateVariableFont(f, axes)
    return f


def kern_table(font):
    """Pair kerning from GPOS PairPos format 1 (glyph pairs). Good enough for capitals."""
    pairs = {}
    if 'GPOS' not in font:
        return pairs
    for lookup in font['GPOS'].table.LookupList.Lookup:
        for st in lookup.SubTable:
            if getattr(st, 'ExtSubTable', None):
                st = st.ExtSubTable
            if getattr(st, 'Format', None) == 1 and hasattr(st, 'PairSet'):
                cov = st.Coverage.glyphs
                for g1, ps in zip(cov, st.PairSet):
                    for pv in ps.PairValueRecord:
                        v = getattr(pv.Value1, 'XAdvance', 0) if pv.Value1 else 0
                        if v:
                            pairs.setdefault((g1, pv.SecondGlyph), v)
            elif getattr(st, 'Format', None) == 2 and hasattr(st, 'Class1Record'):
                cov = set(st.Coverage.glyphs)
                c1 = st.ClassDef1.classDefs if st.ClassDef1 else {}
                c2 = st.ClassDef2.classDefs if st.ClassDef2 else {}
                for g1 in cov:
                    r1 = st.Class1Record[c1.get(g1, 0)]
                    for g2, k2 in list(c2.items()):
                        rec = r1.Class2Record[k2]
                        v = getattr(rec.Value1, 'XAdvance', 0) if rec.Value1 else 0
                        if v:
                            pairs.setdefault((g1, g2), v)
    return pairs


def set_text(font, text, size, tracking=0.0, x0=0.0, baseline=0.0, adjust=None):
    """Return (svg path d, advance width, bounds) for text at `size` px, tracking in em."""
    upm = font['head'].unitsPerEm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font['hmtx']
    kerns = kern_table(font)
    s = size / upm
    x = x0
    d = []
    prev = None
    bp_all = []
    for i, ch in enumerate(text):
        if ch == ' ':
            x += hmtx[cmap[32]][0] * s + tracking * size
            prev = None
            continue
        g = cmap[ord(ch)]
        if prev is not None:
            x += kerns.get((prev, g), 0) * s
        if adjust and i in adjust:
            x += adjust[i] * size
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        d.append(pen.getCommands())
        bp = BoundsPen(gs)
        gs[g].draw(TransformPen(bp, (s, 0, 0, -s, x, baseline)))
        if bp.bounds:
            bp_all.append(bp.bounds)
        x += hmtx[g][0] * s + tracking * size
        prev = g
    x -= tracking * size
    b = (min(b[0] for b in bp_all), min(b[1] for b in bp_all), max(b[2] for b in bp_all), max(b[3] for b in bp_all))
    return ' '.join(d), x - x0, b


def svg(w, h, body, label, vb_x=0, vb_y=0):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb_x:.1f} {vb_y:.1f} {w:.1f} {h:.1f}" '
            f'role="img" aria-label="{label}">{body}</svg>')


def fmt(v):
    return f'{v:.1f}'


marks = {}

# ——— I. THREAD ———
archivo = load('archivo-latin-standard-normal.woff2', {'wght': 470, 'wdth': 125})
size = 100
d, w, b = set_text(archivo, 'JOSEPH MARTIN', size, tracking=0.14)
cap = -b[1]
y_st = 34            # stitch line below the baseline
dash, gap, sw = 26, 13, 4.6
knot_r = 7.5
# the thread starts in a knot under the J, runs the full width, then leaves a loose tail upward
tail = f'M {fmt(w + 6)} {y_st} C {fmt(w + 40)} {y_st}, {fmt(w + 52)} {y_st - 30}, {fmt(w + 34)} {y_st - 44} C {fmt(w + 22)} {y_st - 54}, {fmt(w + 10)} {y_st - 40}, {fmt(w + 24)} {y_st - 30}'
thread = (f'<circle cx="-14" cy="{y_st}" r="{knot_r}" fill="var(--thread,currentColor)"/>'
          f'<path d="M -6 {y_st} H {fmt(w + 6)}" fill="none" stroke="var(--thread,currentColor)" stroke-width="{sw}" '
          f'stroke-linecap="round" stroke-dasharray="{dash} {gap}"/>'
          f'<path d="{tail}" fill="none" stroke="var(--thread,currentColor)" stroke-width="{sw * .7:.1f}" stroke-linecap="round"/>')
pad = 6
vb = (-14 - knot_r - pad, -cap - pad, w + 60 + knot_r + 14 + 2 * pad, cap + y_st + knot_r + 2 * pad)
marks['thread'] = svg(vb[2], vb[3], f'<path d="{d}" fill="currentColor"/>{thread}', 'Joseph Martin', vb[0], vb[1])

# stacked / small: JM with the stitch running beneath
d2, w2, b2 = set_text(archivo, 'JM', 100, tracking=0.1)
cap2 = -b2[1]
st2 = (f'<circle cx="-12" cy="30" r="7" fill="var(--thread,currentColor)"/>'
       f'<path d="M -5 30 H {fmt(w2 + 4)}" fill="none" stroke="var(--thread,currentColor)" stroke-width="5" stroke-linecap="round" stroke-dasharray="22 11"/>'
       f'<path d="M {fmt(w2 + 4)} 30 C {fmt(w2 + 30)} 30, {fmt(w2 + 36)} 4, {fmt(w2 + 20)} -4" fill="none" stroke="var(--thread,currentColor)" stroke-width="3.4" stroke-linecap="round"/>')
marks['thread_jm'] = svg(w2 + 64, cap2 + 52, f'<path d="{d2}" fill="currentColor"/>{st2}', 'JM', -26, -cap2 - 8)

# ——— II. CHARM ———
caslon = load('libre-caslon-display-latin-400-normal.woff2')
size = 100
dj, wj, bj = set_text(caslon, 'JOSEPH', size, tracking=0.16)
capc = -bj[1]
gapw = 92   # the space the charm hangs in
dm, wm, bm = set_text(caslon, 'MARTIN', size, tracking=0.16, x0=wj + gapw)
total = wj + gapw + wm
cx = wj + gapw / 2
ring_y = -capc * 0.52
CHARMS = {
    # each charm is drawn in a box 60 wide x 60 tall, origin at the top centre, where the ring joins
    'moon': 'M 8 4 A 28 28 0 1 0 8 60 A 30 30 0 0 1 8 4 Z',
    'sail': 'M 2 2 L 24 44 H 2 Z M -3 14 L -22 44 H -3 Z M -28 48 H 28 L 19 60 H -19 Z',
    'leaf': 'M 0 2 C 24 16, 25 42, 0 60 C -25 42, -24 16, 0 2 Z',
    'flower': ' '.join(
        f'M {fmt(17 * __import__("math").sin(a))} {fmt(31 - 17 * __import__("math").cos(a))} m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0'
        for a in [i * 2 * 3.14159265 / 5 for i in range(5)]),
}
CHARM_LINES = {   # the one engraved line each charm carries, drawn in the ground colour
    'moon': '', 'sail': '', 'leaf': 'M 0 9 V 55',
    'flower': 'M 0 31 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0',
}


def charm(kind, x, y, scale=1.0, ring=True):
    """A charm hanging from a jump ring whose centre is (x, y)."""
    r = 5.5 * scale
    out = []
    if ring:
        out.append(f'<circle cx="{fmt(x)}" cy="{fmt(y)}" r="{fmt(r)}" fill="none" stroke="var(--gold,currentColor)" stroke-width="{fmt(2.2 * scale)}"/>')
    t = f'translate({fmt(x)} {fmt(y + r)}) scale({scale:.3f})'
    rule = 'evenodd' if kind == 'sail' else 'nonzero'
    out.append(f'<path transform="{t}" d="{CHARMS[kind]}" fill="var(--gold,currentColor)" fill-rule="{rule}"/>')
    if CHARM_LINES[kind]:
        sty = 'fill="var(--ground,#F2F1EC)"' if kind == 'flower' else 'fill="none" stroke="var(--ground,#F2F1EC)" stroke-width="2.4" stroke-linecap="round"'
        out.append(f'<path transform="{t}" d="{CHARM_LINES[kind]}" {sty}/>')
    return ''.join(out)


for kind in CHARMS:
    body = (f'<path d="{dj} {dm}" fill="currentColor"/>'
            + charm(kind, cx, -capc + 4, (capc * .86) / 66))
    vb = (-4, -capc - 8, total + 8, capc + 8 + 22)
    marks[f'charm_{kind}'] = svg(vb[2], vb[3], body, 'Joseph Martin', vb[0], vb[1])
marks['charm'] = marks['charm_moon']

# monogram: J and M, the charm between
dJ, wJ, bJ = set_text(caslon, 'J', 100)
dM, wM, bM = set_text(caslon, 'M', 100, x0=wJ + 46)
bJ = (bJ[0], min(bJ[1], bM[1]), bJ[2], bJ[3])
capm = -bJ[1]
for kind in CHARMS:
    body = f'<path d="{dJ} {dM}" fill="currentColor"/>' + charm(kind, wJ + 23, -capm + 4, (capm * .86) / 66 * .82)
    marks[f'charm_jm_{kind}'] = svg(wJ + 46 + wM + 12, capm + 30, body, 'JM', -6, -capm - 6)
marks['charm_jm'] = marks['charm_jm_moon']
for kind in CHARMS:
    marks[f'charm_only_{kind}'] = svg(80, 92, charm(kind, 40, 8, 1.1), kind + ' charm', 0, 0)

# ——— III. GEORGE (name only; George is the original drawing, placed by the page) ———
barlow = load('barlow-condensed-latin-700-normal.woff2')
barlow5 = load('barlow-condensed-latin-500-normal.woff2')
dg, wg, bg = set_text(barlow, 'JOSEPH MARTIN', 100, tracking=0.02)
capg = -bg[1]
ds, ws, bs = set_text(barlow5, 'HATMAKER  ·  NASHVILLE, TENN.', 25.5, tracking=0.2)
# scale the strap line to the name's width exactly
k = wg / ws
ds2, ws2, bs2 = set_text(barlow5, 'HATMAKER  ·  NASHVILLE, TENN.', 25.5 * k, tracking=0.2 * 1, baseline=46)
rule = f'<rect x="0" y="14" width="{fmt(wg)}" height="3.2" fill="currentColor"/>'
marks['george_name'] = svg(wg + 4, capg + 64, f'<path d="{dg}" fill="currentColor"/>{rule}<path d="{ds2}" fill="currentColor"/>',
                           'Joseph Martin, Hatmaker, Nashville, Tenn.', -2, -capg - 4)
dgs, wgs, bgs = set_text(barlow, 'JOSEPH', 100, tracking=0.02)
dgm, wgm, bgm = set_text(barlow, 'MARTIN', 100, tracking=0.02, baseline=96)
marks['george_name_stack'] = svg(max(wgs, wgm) + 4, capg + 96 + 8, f'<path d="{dgs} {dgm}" fill="currentColor"/>', 'Joseph Martin', -2, -capg - 4)

for k_, v in marks.items():
    with open(os.path.join(OUT, f'{k_.replace("_", "-")}.svg'), 'w') as fh:
        fh.write(v + '\n')
with open(os.path.join(OUT, 'marks.js'), 'w') as fh:
    fh.write('/* Generated by tools/identity/marks.py. Do not edit by hand. */\nwindow.JMMARKS=' + json.dumps(marks) + ';\n')
print(f'{len(marks)} marks written to assets/identity/')
