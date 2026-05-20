#!/usr/bin/env python3
"""Render Basebeton PDF pages, display them, then sample swatch colors."""

import fitz  # PyMuPDF
import json
from PIL import Image
import io, os, sys

PDF = "/tmp/basebeton.pdf"
OUT_DIR = "/tmp/basebeton-pages"
os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF)
print(f"PDF has {len(doc)} pages")

pages = []
for i, page in enumerate(doc):
    mat = fitz.Matrix(3, 3)  # 3x zoom = ~216 dpi
    pix = page.get_pixmap(matrix=mat)
    img_bytes = pix.tobytes("png")
    path = f"{OUT_DIR}/page-{i+1:02d}.png"
    with open(path, "wb") as f:
        f.write(img_bytes)
    img = Image.open(io.BytesIO(img_bytes))
    pages.append((path, img))
    print(f"  Page {i+1}: {img.size[0]}x{img.size[1]}px → {path}")

print("\nPages rendered. Now scanning each page for color swatches...")
print("(Looking for colored rectangles with consistent grid patterns)\n")

def sample_color(img, x, y, w=20, h=20):
    region = img.crop((x, y, x+w, y+h))
    px = list(region.getdata())
    r = sum(p[0] for p in px) // len(px)
    g = sum(p[1] for p in px) // len(px)
    b = sum(p[2] for p in px) // len(px)
    return r, g, b, f"#{r:02X}{g:02X}{b:02X}"

def is_swatch_color(r, g, b):
    # Exclude near-white (page background) and near-black (text/borders)
    brightness = (r + g + b) / 3
    if brightness > 245: return False  # white background
    if brightness < 15:  return False  # pure black
    return True

# Strategy: scan each page for a grid of colored squares
# Basebeton sample cards typically have rows/columns of ~equal-sized swatches
all_colors = []

for page_num, (path, img) in enumerate(pages, 1):
    w, h = img.size
    print(f"--- Page {page_num} ({w}x{h}) ---")

    # Sample a dense grid across the page to find colored regions
    step = 40
    found = []
    seen_hex = set()

    for py in range(step, h - step, step):
        for px in range(step, w - step, step):
            r, g, b, hex_val = sample_color(img, px, py)
            if is_swatch_color(r, g, b) and hex_val not in seen_hex:
                # Check if this is a solid-ish color block (not text/noise)
                # Sample 4 corners of a 30x30 region and check variance
                samples = [sample_color(img, px+dx, py+dy)[:3]
                           for dx, dy in [(0,0),(25,0),(0,25),(25,25),(12,12)]]
                variance = sum(
                    abs(s[0]-samples[0][0]) + abs(s[1]-samples[0][1]) + abs(s[2]-samples[0][2])
                    for s in samples[1:]
                ) / 4
                if variance < 25:  # solid color block
                    found.append((px, py, r, g, b, hex_val))
                    seen_hex.add(hex_val)

    print(f"  Found {len(found)} distinct solid color regions")
    for x, y, r, g, b, hex_val in found[:5]:
        print(f"    {hex_val} at ({x},{y})")

    all_colors.extend(found)

# De-duplicate across pages (similar colors = same color family)
def color_distance(c1, c2):
    return abs(c1[2]-c2[2]) + abs(c1[3]-c2[3]) + abs(c1[4]-c2[4])

unique = []
for c in all_colors:
    if not any(color_distance(c, u) < 30 for u in unique):
        unique.append(c)

unique.sort(key=lambda c: (c[2]+c[3]+c[4]))  # sort by brightness

print(f"\n{'='*50}")
print(f"Total unique colors found: {len(unique)}")
print(f"{'='*50}")

# Output JSON
output = []
for i, (x, y, r, g, b, hex_val) in enumerate(unique, 1):
    output.append({
        "code": f"BB-{i:02d}",
        "name": f"BB-{i:02d}",
        "hex": hex_val
    })
    print(f"  BB-{i:02d}  {hex_val}  rgb({r},{g},{b})")

result_path = "/tmp/basebeton-colors.json"
with open(result_path, "w") as f:
    json.dump(output, f, indent=2)
print(f"\nColors saved to {result_path}")
print(f"Page images saved to {OUT_DIR}/")
