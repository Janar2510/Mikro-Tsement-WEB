#!/usr/bin/env python3
"""Analyze grid layout and extract color names/codes from each sample card PDF."""
import fitz, json, os

DATASHEET_DIR = "/Users/janarkuusk/Microcement. web/public/assets/datasheets"

cards = {
    "basebeton-originale": "Basebeton-Originale_Samplecard-2024.pdf",
    "beton-cire":          "Beton-Ciré-Samplecard-2024.pdf",
    "oxidestuc":           "Oxidestuc-Samplecard-2024.pdf",
    "natureplast":         "Natureplast_Samplecard-2025.pdf",
    "sichtbeton":          "Sichtbeton-Samplecard_NL_2023.pdf",
    "basebeton-paint":     "Basebeton-Paint-Samplecard_2024.pdf",
    "basebeton-plus":      "Basebeton-Plus_Samplecard-2024.pdf",
    "basebeton-xtreme":    "Basebeton-Xtreme-Samplecard-2024-EN.pdf",
    "basebeton-solid":     "Basebeton-Solid_Samplecard-2024.pdf",
    "basebeton-grit":      "Basebeton-Grit_Samplecard-2024.pdf",
    "stuccopuro":          "Stuccopuro_Samplecard_NL_2024.pdf",
}

results = {}

for slug, fname in cards.items():
    path = os.path.join(DATASHEET_DIR, fname)
    if not os.path.exists(path):
        print(f"MISSING: {fname}")
        continue

    doc = fitz.open(path)
    print(f"\n{'='*60}")
    print(f"{slug} — {fname}")
    print(f"Pages: {len(doc)}")

    all_labels = []
    page_data = []

    for pi, page in enumerate(doc):
        blocks = page.get_text("blocks")
        pw, ph = page.rect.width, page.rect.height
        labels = []
        for b in blocks:
            text = b[4].strip().replace("\n", " ")
            if text and 1 < len(text) < 50:
                labels.append({"x": round(b[0], 1), "y": round(b[1], 1), "text": text})

        # Sort by y then x
        labels.sort(key=lambda l: (round(l["y"] / 50) * 50, l["x"]))
        page_data.append({"page": pi+1, "size": (round(pw), round(ph)), "labels": labels})
        all_labels.extend(labels)

        print(f"\n  Page {pi+1} ({round(pw)}×{round(ph)}):")
        for l in labels[:30]:
            print(f"    ({l['x']:.0f},{l['y']:.0f}) {repr(l['text'])}")

    results[slug] = {"pages": len(doc), "page_data": page_data}

with open("/tmp/samplecard-analysis.json", "w") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print(f"\n\nSaved → /tmp/samplecard-analysis.json")
