#!/usr/bin/env python3
"""Extract technical specs from all Basebeton datasheets."""
import fitz, json, os, re

DATASHEET_DIR = "/tmp/stoneage-scrape"
OUT = "/tmp/datasheet-specs.json"

datasheets = [
    ("basebeton-originale", "Basebeton-Originale-User-Manual-Technical-Datasheet-2024.07-1.pdf"),
    ("beton-cire", "Beton-Ciré-Originale-Use-Manual-Technical-Data-Sheet.pdf"),
    ("oxidestuc", "Oxidestuc-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("natureplast", "Natureplast-User-Manual-Technical-Datasheet-2024.10.pdf"),
    ("sichtbeton", "Sichtbeton-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("basebeton-paint", "Basebeton-Paint-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("basebeton-plus", "Basebeton-Plus-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("basebeton-xtreme", "Basebeton-Xtreme-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("basebeton-solid", "Basebeton-Solid-User-Manual-Technical-Datasheet-2024.07.pdf"),
    ("basebeton-grit", "Basebeton-Grit-User-Manual-Technical-Datasheet-2024.08.pdf"),
    ("stuccopuro", "Stuccopuro-User-Manual-Technical-Datasheet-2024.07.pdf"),
]

# Handle URL-encoded filenames
import glob
pdf_files = {os.path.basename(f): f for f in glob.glob(f"{DATASHEET_DIR}/*.pdf")}

results = {}

for slug, filename in datasheets:
    # Try both exact and URL-decoded
    path = os.path.join(DATASHEET_DIR, filename)
    if not os.path.exists(path):
        # Try URL-encoded version
        from urllib.parse import quote
        encoded = filename.replace("é", "%C3%A9").replace("É", "%C3%89")
        path = os.path.join(DATASHEET_DIR, encoded)
    if not os.path.exists(path):
        # Search in available files
        matches = [f for f in pdf_files.keys() if slug.split("-")[0].lower() in f.lower()]
        if matches:
            path = pdf_files[matches[0]]
        else:
            print(f"NOT FOUND: {filename}")
            continue

    try:
        doc = fitz.open(path)
        text = ""
        for page in doc:
            text += page.get_text() + "\n"

        # Remove Stone Age contact info
        # Filter out lines with Stone Age contact details
        clean_lines = []
        skip_patterns = [
            r"stoneage\.", r"stone.?age", r"info@", r"www\.",
            r"butaanstraat", r"rijssen", r"\+31", r"netherlands",
            r"netherlands", r"cookie", r"privacy", r"realisation.*stimmt",
            r"© 20\d\d", r"mail:", r"tel:", r"phone:",
        ]
        for line in text.split("\n"):
            skip = any(re.search(p, line.lower()) for p in skip_patterns)
            if not skip and line.strip():
                clean_lines.append(line.strip())

        clean_text = "\n".join(clean_lines)

        print(f"\n{'='*60}")
        print(f"PRODUCT: {slug}")
        print(f"Pages: {len(doc)}")
        print(clean_text[:3000])

        results[slug] = {
            "text": clean_text[:6000],
            "pages": len(doc),
        }
    except Exception as e:
        print(f"Error {slug}: {e}")

with open(OUT, "w") as f:
    json.dump(results, f, indent=2)
print(f"\n\nSaved → {OUT}")
