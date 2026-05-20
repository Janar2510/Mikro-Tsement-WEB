#!/usr/bin/env python3
"""Extract per-product color palettes from all Basebeton sample card PDFs.
Same 5-col × 4-row grid as Basebeton Originale: col_x=[44,197,350,502,655], row_y=[211,313,415,517]"""

import fitz, json, io, os, re
from PIL import Image

DATASHEET_DIR = "/Users/janarkuusk/Microcement. web/public/assets/datasheets"
SCALE = 4
SWATCH_OFFSET_X = 76   # swatch centre = col_x + 76
SWATCH_OFFSET_Y = -55  # swatch centre = row_text_y - 55
SAMPLE = 28            # half-size of sampling box in PDF pts

COL_X   = [44, 197, 350, 502, 655]
ROW_Y   = [211, 313, 415, 517]

def sample_color(img, pdf_cx, pdf_cy):
    px, py = int(pdf_cx * SCALE), int(pdf_cy * SCALE)
    s = int(SAMPLE * SCALE)
    W, H = img.size
    region = img.crop((max(0,px-s), max(0,py-s), min(W,px+s), min(H,py+s)))
    pixels = list(region.getdata())
    if not pixels: return "#888888"
    r = sum(p[0] for p in pixels)//len(pixels)
    g = sum(p[1] for p in pixels)//len(pixels)
    b = sum(p[2] for p in pixels)//len(pixels)
    return f"#{r:02X}{g:02X}{b:02X}"

def is_bg(hex_val):
    r = int(hex_val[1:3],16); g = int(hex_val[3:5],16); b = int(hex_val[5:7],16)
    br = (r+g+b)/3
    return br > 248 or br < 8  # skip pure white/black (page bg or logo)

def nearest_col(x):
    return min(COL_X, key=lambda cx: abs(cx - x))

def nearest_row(y):
    return min(ROW_Y, key=lambda ry: abs(ry - y))

def extract_labels_from_page(page):
    """Extract (col_x, row_y, label_text) using word-level positioning."""
    words = page.get_text("words")  # (x0,y0,x1,y1,word,block,line,word_idx)

    # Group words into labels by proximity
    labels = {}  # (col_x, row_y) -> [word, word, ...]

    for w in words:
        x0, y0, x1, y1, word = w[0], w[1], w[2], w[3], w[4].strip()
        if not word or len(word) < 1: continue
        if word.lower() in ("stoneage.nl","stoneage","nl", "choose","the","color","that","fits","your","project",
                             "beton","ciré","basebeton","oxidestuc","natureplast","sichtbeton","stuccopuro",
                             "check","out","products","online","basebeton","oxidestuc","sichtbeton","stuccopuro",
                             "sample","is","only","by","indication","final","product","differs","from","this",
                             "get","inspired","home","uk","become","distributor"): continue

        cx = x0  # left edge of word
        cy = y0  # top edge of word

        # Find nearest grid column and row
        nc = nearest_col(cx)
        nr = nearest_row(cy)

        # Only include if within reasonable distance of grid position
        if abs(cx - nc) > 100: continue
        if abs(cy - nr) > 60: continue

        key = (nc, nr)
        if key not in labels:
            labels[key] = []
        labels[key].append((x0, word))

    # Reconstruct label strings from grouped words
    result = {}
    for (col_x, row_y), word_list in labels.items():
        word_list.sort(key=lambda w: w[0])  # sort by x position
        text = " ".join(w[1] for w in word_list).strip()
        if text:
            result[(col_x, row_y)] = text

    return result

def clean_label(text):
    """Parse code and name from a label string."""
    # Handle special chars and normalize
    text = text.strip()

    # Remove trailing punctuation
    text = re.sub(r'\s+', ' ', text)

    # Match patterns like:
    # "ST 701 Wide", "NP-01 Tusk", "BBP-001 The Dutch Grey", "Plus-01 Icles",
    # "XT-01 Candle", "BBS-01 Morning", "BBG-101 Dun Briste", "SP 01 Senape"
    # "10-1 Dutch Grey", "Light Grey", "Aluminium"

    # Try code + name
    m = re.match(r'^([A-Z0-9][\w\-\.]+(?:\s+\d+)?)\s+(.+)$', text)
    if m:
        code = m.group(1).strip()
        name = m.group(2).strip()
        # Remove "The " prefix from BBP names
        name = re.sub(r'^The\s+', '', name)
        return code, name

    # Just a name with no code
    return text, text

# ── Sample card definitions ───────────────────────────────────────────────

CARDS = {
    # Basebeton Originale already done — keep existing
    "beton-cire":       "Beton-Ciré-Samplecard-2024.pdf",
    "oxidestuc":        "Oxidestuc-Samplecard-2024.pdf",
    "natureplast":      "Natureplast_Samplecard-2025.pdf",
    "sichtbeton":       "Sichtbeton-Samplecard_NL_2023.pdf",
    "basebeton-paint":  "Basebeton-Paint-Samplecard_2024.pdf",
    "basebeton-plus":   "Basebeton-Plus_Samplecard-2024.pdf",
    "basebeton-xtreme": "Basebeton-Xtreme-Samplecard-2024-EN.pdf",
    "basebeton-solid":  "Basebeton-Solid_Samplecard-2024.pdf",
    "basebeton-grit":   "Basebeton-Grit_Samplecard-2024.pdf",
    "stuccopuro":       "Stuccopuro_Samplecard_NL_2024.pdf",
}

all_results = {}

for slug, fname in CARDS.items():
    path = os.path.join(DATASHEET_DIR, fname)
    if not os.path.exists(path):
        print(f"MISSING: {fname}")
        continue

    doc = fitz.open(path)
    print(f"\n{'='*60}\n{slug} ({len(doc)} pages)")

    product_colors = []
    seen_codes = set()

    for page_idx, page in enumerate(doc):
        # Render at 4x
        mat = fitz.Matrix(SCALE, SCALE)
        pix = page.get_pixmap(matrix=mat)
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")

        # Extract labels
        labels = extract_labels_from_page(page)

        for (col_x, row_y), label_text in sorted(labels.items(), key=lambda x: (x[0][1], x[0][0])):
            code, name = clean_label(label_text)
            if code in seen_codes:
                continue
            seen_codes.add(code)

            # Sample swatch colour
            swatch_cx = col_x + SWATCH_OFFSET_X
            swatch_cy = row_y + SWATCH_OFFSET_Y
            hex_val = sample_color(img, swatch_cx, swatch_cy)

            if is_bg(hex_val):
                continue

            item = {"code": code, "name": name, "hex": hex_val}
            product_colors.append(item)
            print(f"  {code:20s}  {hex_val}  {name}")

    all_results[slug] = product_colors
    print(f"  → {len(product_colors)} colors")

# ── Save ─────────────────────────────────────────────────────────────────
out_path = "/tmp/all-product-colors.json"
with open(out_path, "w") as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)
print(f"\n\nSaved → {out_path}")
