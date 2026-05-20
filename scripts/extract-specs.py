#!/usr/bin/env python3
"""Extract technical specs from Basebeton datasheets, strip all Stone Age contact info."""
import fitz, json, re, os

DATASHEET_DIR = "/Users/janarkuusk/Microcement. web/public/assets/datasheets"
OUT = "/tmp/basebeton-specs.json"

SKIP_PATTERNS = [
    r"stone.?age", r"stoneage", r"info@", r"butaanstraat",
    r"rijssen", r"\+31", r"netherlands", r"stimmt",
    r"© 20\d\d", r"cookie", r"privacy policy",
    r"sven jagersma", r"rutger", r"realisation",
    r"www\.stoneage", r"nl\.stoneage", r"stoneage\.nl",
]

def clean(text):
    lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line: continue
        if any(re.search(p, line, re.I) for p in SKIP_PATTERNS): continue
        lines.append(line)
    return "\n".join(lines)

files = {
    "basebeton-originale": "Basebeton-Originale-User-Manual-Technical-Datasheet-2024.07-1.pdf",
    "beton-cire": "Beton-Ciré-Originale-Use-Manual-Technical-Data-Sheet.pdf",
    "oxidestuc": "Oxidestuc-User-Manual-Technical-Datasheet-2024.07.pdf",
    "natureplast": "Natureplast-User-Manual-Technical-Datasheet-2024.10.pdf",
    "sichtbeton": "Sichtbeton-User-Manual-Technical-Datasheet-2024.07.pdf",
    "basebeton-paint": "Basebeton-Paint-User-Manual-Technical-Datasheet-2024.07.pdf",
    "basebeton-plus": "Basebeton-Plus-User-Manual-Technical-Datasheet-2024.07.pdf",
    "basebeton-xtreme": "Basebeton-Xtreme-User-Manual-Technical-Datasheet-2024.07.pdf",
    "basebeton-solid": "Basebeton-Solid-User-Manual-Technical-Datasheet-2024.07.pdf",
    "basebeton-grit": "Basebeton-Grit-User-Manual-Technical-Datasheet-2024.08.pdf",
    "stuccopuro": "Stuccopuro-User-Manual-Technical-Datasheet-2024.07.pdf",
}

results = {}

for slug, fname in files.items():
    path = os.path.join(DATASHEET_DIR, fname)
    if not os.path.exists(path):
        print(f"MISSING: {fname}")
        continue
    doc = fitz.open(path)
    raw = "\n".join(p.get_text() for p in doc)
    text = clean(raw)
    print(f"\n{'='*60}\n{slug} ({len(doc)} pages)\n{'='*60}")
    print(text[:2500])
    results[slug] = {"text": text, "filename": fname}

with open(OUT, "w") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print(f"\n\nSaved → {OUT}")
