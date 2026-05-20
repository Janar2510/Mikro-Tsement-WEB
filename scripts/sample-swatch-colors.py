#!/usr/bin/env python3
"""Sample exact swatch colors from rendered Basebeton PDF pages.
Text grid gives us names; pixel sampling gives us hex values."""

import fitz, json, io, os
from PIL import Image

PDF = "/tmp/basebeton.pdf"
SCALE = 4  # render scale (4x = 288dpi)
OUT_JSON = "/tmp/basebeton-final.json"

doc = fitz.open(PDF)

# ── Swatch grid layout (PDF points) ──────────────────────────────────────
# 5 columns: text x-origins from extraction output
COL_X   = [44, 197, 350, 502, 655]
# 4 rows: text y-positions
ROW_TEXT_Y = [211, 313, 415, 517]
# Swatch centre is above its label: ~50pt above text y
SWATCH_OFFSET_Y = -55
# Swatch centre x: text x + half column width (~76pt)
SWATCH_OFFSET_X = 76
# Sample area half-size (PDF pts) – avoid edges
SAMPLE = 30

# ── Text labels by page (from earlier extraction) ─────────────────────────
# Format: {(col_x, row_text_y): "code name"}
PAGE_LABELS = {
    1: {
        (44,  211): "10-1 Dutch Grey",  (197, 211): "10-2 Mouse",
        (350, 211): "10-3 Stone",        (502, 211): "10-4 Pebble",
        (655, 211): "10-6 Mauwe",
        (44,  313): "10-8 Mud",          (197, 313): "10-9 Persian",
        (350, 313): "10-10 Pitch Black", (502, 313): "10-13 Berry",
        (655, 313): "10-14 Clay",
        (44,  415): "10-15 Duhe",        (197, 415): "10-16 Dawn",
        (350, 415): "10-17 Buff",        (502, 415): "10-18 Wheat",
        (655, 415): "10-19 Daw",
        (44,  517): "10-20 Olive",       (197, 517): "10-21 Moss",
        (350, 517): "10-22 Cord",        (502, 517): "10-23 Mocca",
        (655, 517): "10-24 Past Yellow",
    },
    2: {
        (44,  211): "10-26 Rose Red",    (197, 211): "10-27 Truffel",
        (350, 211): "10-28 Blossom",     (502, 211): "10-29 Sage",
        (655, 211): "10-30 Artichok",
        (44,  313): "10-31 Brown",       (197, 313): "10-32 Putty",
        (350, 313): "10-33 Grime",       (502, 313): "10-34 Canvas",
        (655, 313): "10-35 Steel Black",
        (44,  415): "10-37 Tender",      (197, 415): "10-38 Rose White",
        (349, 415): "10-41 Lice Taupe",  (502, 415): "10-42 Mey Red",
        (655, 415): "10-43 Deep Brown",
        (44,  517): "10-45 Knosse",      (197, 517): "10-47 Raum Red",
        (349, 517): "10-48 Sinc",        (502, 517): "10-49 Smoke",
        (655, 517): "10-50 Ice",
    },
    3: {
        (44,  211): "10-51 Lava",        (197, 211): "10-52 Ash",
        (350, 211): "10-53 Lin",         (502, 211): "10-54 Deep",
        (655, 211): "10-55 Elephant",
        (44,  313): "10-56 Hippo",       (197, 313): "10-57 Wolf",
        (350, 313): "10-58 Whale",       (502, 313): "10-59 Grizzle",
        (655, 313): "10-60 Rock",
        (44,  415): "10-61 Flake",       (197, 415): "10-62 Sisal",
        (350, 415): "10-63 Gentle",      (502, 415): "10-64 Grain",
        (655, 415): "10-65 Oat",
        (44,  517): "10-66 Loam",        (197, 517): "10-67 Dust",
        (350, 517): "10-68 Savanne",     (502, 517): "10-69 Caramel",
        (655, 517): "10-70 Tierra",
    },
    4: {
        (44,  211): "10-71 Indian",      (197, 211): "10-72 Brownie",
        (350, 211): "10-73 Choco",       (502, 211): "10-74 Blush",
        (655, 211): "10-75 Bright",
        (44,  313): "10-76 Shell",       (197, 313): "10-77 Cotton",
        (350, 313): "10-78 Sand",        (502, 313): "10-79 Pigeon",
        (655, 313): "10-80 Noce",
        (44,  415): "10-81 Khaki",       (197, 415): "10-82 Delta",
        (350, 415): "10-83 Dove",        (502, 415): "10-84 Lagoon",
        (655, 415): "10-85 Lychee",
    },
}

def sample_color(img, pdf_cx, pdf_cy):
    """Average pixel color in a 60×60 box centred on (pdf_cx, pdf_cy)."""
    px = int(pdf_cx * SCALE)
    py = int(pdf_cy * SCALE)
    s  = int(SAMPLE * SCALE)
    W, H = img.size
    x0, y0 = max(0, px-s), max(0, py-s)
    x1, y1 = min(W, px+s), min(H, py+s)
    region = img.crop((x0, y0, x1, y1))
    pixels = list(region.getdata())
    n = len(pixels)
    r = sum(p[0] for p in pixels) // n
    g = sum(p[1] for p in pixels) // n
    b = sum(p[2] for p in pixels) // n
    return f"#{r:02X}{g:02X}{b:02X}"

all_entries = []

for page_idx, page in enumerate(doc):
    page_num = page_idx + 1
    mat = fitz.Matrix(SCALE, SCALE)
    pix = page.get_pixmap(matrix=mat)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    labels = PAGE_LABELS.get(page_num, {})

    print(f"\n── Page {page_num} ({len(labels)} swatches) ──")

    for (tx, ty), label in sorted(labels.items(), key=lambda x: (x[0][1], x[0][0])):
        # Swatch centre: offset from text position
        cx = tx + SWATCH_OFFSET_X
        cy = ty + SWATCH_OFFSET_Y
        hex_color = sample_color(img, cx, cy)

        # Parse code and name from label
        parts = label.split(" ", 1)
        code = parts[0]
        name = parts[1] if len(parts) > 1 else code

        print(f"  {code:8s}  {hex_color}  {name}")
        all_entries.append({"code": code, "name": name, "hex": hex_color})

# Sort by numeric code
def sort_key(e):
    try: return int(e["code"].split("-")[1])
    except: return 999

all_entries.sort(key=sort_key)

with open(OUT_JSON, "w") as f:
    json.dump(all_entries, f, indent=2)

print(f"\n{'='*50}")
print(f"Total: {len(all_entries)} Basebeton colors → {OUT_JSON}")
