#!/usr/bin/env python3
"""Extract Basebeton swatch names + hex colors from PDF with precise grid sampling."""

import fitz
import json
from PIL import Image
import io, re, os

PDF = "/tmp/basebeton.pdf"
doc = fitz.open(PDF)

print(f"=== BASEBETON PDF: {len(doc)} pages ===\n")

# --- 1. Extract all text per page (color codes + names) ---
all_text_blocks = []
for i, page in enumerate(doc):
    blocks = page.get_text("blocks")  # returns (x0,y0,x1,y1,text,block_no,block_type)
    print(f"Page {i+1} text blocks:")
    for b in blocks:
        text = b[4].strip()
        if text and len(text) > 0:
            print(f"  [{b[0]:.0f},{b[1]:.0f}] {repr(text[:80])}")
    all_text_blocks.append(blocks)

print("\n" + "="*60)
print("LOOKING FOR SWATCH CODES AND NAMES")
print("="*60)

# Common Basebeton code patterns: numeric or alphanumeric like "01", "BB-01", etc.
swatch_items = []
for i, blocks in enumerate(all_text_blocks):
    page_items = []
    for b in blocks:
        text = b[4].strip()
        x0, y0 = b[0], b[1]
        # Filter to potential color labels (short text, not headers)
        if 1 < len(text) < 40 and '\n' not in text.strip():
            page_items.append((x0, y0, text))
    swatch_items.append(page_items)
    print(f"\nPage {i+1}: {len(page_items)} potential labels")
    for x, y, t in page_items[:20]:
        print(f"  ({x:.0f},{y:.0f}) {repr(t)}")

# --- 2. Render pages at high resolution ---
print("\n" + "="*60)
print("RENDERING PAGES FOR COLOR SAMPLING")
print("="*60)

OUT_DIR = "/tmp/basebeton-precise"
os.makedirs(OUT_DIR, exist_ok=True)

pages_img = []
for i, page in enumerate(doc):
    mat = fitz.Matrix(4, 4)  # 4x = ~288 dpi
    pix = page.get_pixmap(matrix=mat)
    img_bytes = pix.tobytes("png")
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    path = f"{OUT_DIR}/page-{i+1:02d}.png"
    img.save(path)
    pages_img.append(img)
    print(f"Page {i+1}: {img.size} → {path}")

# Scale factor: PDF units to pixels at 4x zoom
# PDF page size is typically 72dpi, so 4x = 288dpi
# fitz gives coordinates in PDF points, multiply by 4 to get pixel coords

def sample_px(img, pdf_x, pdf_y, scale=4, size=30):
    """Sample color at PDF coordinate (pdf_x, pdf_y)."""
    px, py = int(pdf_x * scale), int(pdf_y * scale)
    w, h = img.size
    x0 = max(0, px - size//2)
    y0 = max(0, py - size//2)
    x1 = min(w, px + size//2)
    y1 = min(h, py + size//2)
    region = img.crop((x0, y0, x1, y1))
    pixels = list(region.getdata())
    r = sum(p[0] for p in pixels) // len(pixels)
    g = sum(p[1] for p in pixels) // len(pixels)
    b = sum(p[2] for p in pixels) // len(pixels)
    return f"#{r:02X}{g:02X}{b:02X}"

# Try to find swatch color regions by looking at vector drawing commands
print("\n" + "="*60)
print("EXTRACTING VECTOR DRAWING PATHS (FILLED RECTANGLES)")
print("="*60)

final_colors = []

for page_idx, page in enumerate(doc):
    img = pages_img[page_idx]
    print(f"\n--- Page {page_idx+1} ---")

    # Get all drawing paths
    paths = page.get_drawings()
    filled_rects = []
    for path in paths:
        if path.get("fill") and path.get("rect"):
            r = path["rect"]
            fill = path["fill"]
            w = r.x1 - r.x0
            h = r.y1 - r.y0
            # Looking for swatch-sized rectangles: roughly square, meaningful size
            if 20 < w < 300 and 20 < h < 300 and abs(w - h) < w * 0.5:
                # Convert fill color (fitz uses 0-1 RGB floats)
                if len(fill) >= 3:
                    r_val = int(fill[0] * 255)
                    g_val = int(fill[1] * 255)
                    b_val = int(fill[2] * 255)
                    brightness = (r_val + g_val + b_val) / 3
                    # Exclude white background and very dark borders
                    if 20 < brightness < 240:
                        hex_color = f"#{r_val:02X}{g_val:02X}{b_val:02X}"
                        filled_rects.append({
                            "x": r.x0, "y": r.y0, "w": w, "h": h,
                            "hex": hex_color,
                            "rgb": (r_val, g_val, b_val)
                        })

    # De-duplicate very similar colors
    unique_rects = []
    for rect in filled_rects:
        r1, g1, b1 = rect["rgb"]
        is_dup = False
        for u in unique_rects:
            r2, g2, b2 = u["rgb"]
            if abs(r1-r2) + abs(g1-g2) + abs(b1-b2) < 15:
                is_dup = True
                break
        if not is_dup:
            unique_rects.append(rect)

    print(f"  Found {len(unique_rects)} unique filled rectangles (potential swatches)")
    for rect in unique_rects[:10]:
        print(f"    {rect['hex']} at ({rect['x']:.0f},{rect['y']:.0f}) size {rect['w']:.0f}x{rect['h']:.0f}")

    # Now match text labels near each swatch
    text_blocks = all_text_blocks[page_idx]

    for rect in unique_rects:
        # Find text blocks near this rectangle
        cx, cy = rect["x"] + rect["w"]/2, rect["y"] + rect["h"]
        nearby_text = []
        for tb in text_blocks:
            tx, ty = tb[0], tb[1]
            text = tb[4].strip()
            if not text:
                continue
            dist = abs(tx - rect["x"]) + abs(ty - cy)
            if dist < 150:
                nearby_text.append((dist, text.replace('\n', ' ').strip()))
        nearby_text.sort(key=lambda x: x[0])

        name = nearby_text[0][1] if nearby_text else rect["hex"]
        final_colors.append({
            "page": page_idx + 1,
            "hex": rect["hex"],
            "name": name,
            "x": rect["x"],
            "y": rect["y"]
        })

# De-duplicate across pages
seen = set()
deduped = []
for c in final_colors:
    if c["hex"] not in seen:
        seen.add(c["hex"])
        deduped.append(c)

# Sort by page then position
deduped.sort(key=lambda c: (c["page"], c["y"], c["x"]))

print("\n" + "="*60)
print(f"FINAL: {len(deduped)} unique Basebeton colors")
print("="*60)

output = []
for i, c in enumerate(deduped, 1):
    code = f"BB-{i:02d}"
    print(f"  {code}  {c['hex']}  \"{c['name'][:30]}\"  (page {c['page']})")
    output.append({
        "code": code,
        "name": c["name"][:40].strip(),
        "hex": c["hex"]
    })

result = "/tmp/basebeton-colors-final.json"
with open(result, "w") as f:
    json.dump(output, f, indent=2)
print(f"\nSaved {len(output)} colors → {result}")
