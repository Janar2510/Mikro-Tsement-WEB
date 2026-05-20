#!/usr/bin/env python3
"""Add per-product color palettes to en.json and et.json.
Restructures colors.collections to be per-product.
Adds productColors to each product item."""
import json

with open("/tmp/all-product-colors.json") as f:
    extracted = json.load(f)

# ── Manual fixes ──────────────────────────────────────────────────────────

# Sichtbeton: code/name was split from "Light Grey" → fix
extracted["sichtbeton"] = [
    {"code": "SB-L", "name": "Light Grey",  "hex": "#DDDAD6"},
    {"code": "SB-M", "name": "Mid Grey",    "hex": "#CECBC7"},
    {"code": "SB-D", "name": "Dark Grey",   "hex": "#B9B9B9"},
]

# Basebeton Originale — use the 75 colors already in the database
BB_ORIG_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json"
with open(BB_ORIG_PATH) as f:
    en_existing = json.load(f)

bb_orig_colors = []
for coll in en_existing["colors"]["collections"].values():
    bb_orig_colors.extend(coll["items"])

# ── Build per-product collections ─────────────────────────────────────────

PRODUCT_COLLECTION_META_EN = {
    "basebeton-originale": ("Basebeton Originale", "75 mineral pigment colours. Available in standard, RAL and NCS."),
    "beton-cire":          ("Beton Ciré", "41 refined concrete tones from Stone Age's architectural palette."),
    "oxidestuc":           ("Oxidestuc", "6 metallic finishes: Aluminium, Bronze, Copper, Gold, Rust and Steel."),
    "natureplast":         ("Natureplast", "16 natural clay pigment colours for organic, breathable interiors."),
    "sichtbeton":          ("Sichtbeton", "3 architectural grey shades of raw exposed concrete."),
    "basebeton-paint":     ("Basebeton Paint", "40 mineral-named colours for warm industrial wall finishes."),
    "basebeton-plus":      ("Basebeton Plus", "64 colours named after the rhythms of French everyday life."),
    "basebeton-xtreme":    ("Basebeton Xtreme", "20 nature-inspired colours for heavy-duty epoxy floor systems."),
    "basebeton-solid":     ("Basebeton Solid", "21 refined tones for the strongest concrete floor plaster."),
    "basebeton-grit":      ("Basebeton Grit", "20 beach and landscape-inspired colours for grit floor systems."),
    "stuccopuro":          ("Stuccopuro", "60 Italian-named colours for decorative concrete-look wall plaster."),
}

PRODUCT_COLLECTION_META_ET = {
    "basebeton-originale": ("Basebeton Originale", "75 mineraalpigmendi värvi. Saadaval standardvärvides, RAL ja NCS."),
    "beton-cire":          ("Beton Ciré", "41 rafineeritud betoonitooni arhitektuurilisest paletist."),
    "oxidestuc":           ("Oxidestuc", "6 metallilist viimistlust: Alumiinium, Pronks, Vask, Kuld, Rooste ja Teras."),
    "natureplast":         ("Natureplast", "16 looduslikku savipigmendi värvi orgaanilistele siseruumidele."),
    "sichtbeton":          ("Sichtbeton", "3 arhitektuurset halli tooni toorbetooniks."),
    "basebeton-paint":     ("Basebeton Paint", "40 mineraalnimeliste värviga soojad tööstuslikud seinakattevärvi toonid."),
    "basebeton-plus":      ("Basebeton Plus", "64 prantsuse igapäevaelu rütmide järgi nimetatud värvi."),
    "basebeton-xtreme":    ("Basebeton Xtreme", "20 loodusest inspireeritud värvi raskekoormuslikele epoksüpõrandatele."),
    "basebeton-solid":     ("Basebeton Solid", "21 rafineeritud tooni tugevaima betoonpõranda kruntvärvi jaoks."),
    "basebeton-grit":      ("Basebeton Grit", "20 randa ja maastikku inspireeritud värvi gritpõrandatele."),
    "stuccopuro":          ("Stuccopuro", "60 itaalia keeles nimetatud värvi dekoratiivse betoonilookiga seinakrohvidele."),
}

def build_collections(meta_dict):
    colls = {}
    for slug, (title, desc) in meta_dict.items():
        if slug == "basebeton-originale":
            items = bb_orig_colors
        else:
            items = extracted.get(slug, [])
        if items:
            colls[slug] = {"title": title, "description": desc, "items": items}
    return colls

# ── Update en.json ────────────────────────────────────────────────────────

EN_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json"
with open(EN_PATH) as f:
    en = json.load(f)

# Restructure colors.collections → per-product
en["colors"]["title"] = "Product Colour Collections"
en["colors"]["subtitle"] = "Every Basebeton product has its own curated colour palette. Browse by product or use the code for exact factory specification."
en["colors"]["collections"] = build_collections(PRODUCT_COLLECTION_META_EN)

# Add productColors to each product item
for slug, (title, desc) in PRODUCT_COLLECTION_META_EN.items():
    if slug not in en["products"]["items"]:
        continue
    if slug == "basebeton-originale":
        colors = bb_orig_colors
    else:
        colors = extracted.get(slug, [])
    en["products"]["items"][slug]["productColors"] = colors

with open(EN_PATH, "w") as f:
    json.dump(en, f, indent=2, ensure_ascii=False)
print(f"Updated EN — {sum(len(c['items']) for c in en['colors']['collections'].values())} total colors across {len(en['colors']['collections'])} collections")

# ── Update et.json ────────────────────────────────────────────────────────

ET_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/et.json"
with open(ET_PATH) as f:
    et = json.load(f)

et["colors"]["title"] = "Tootemärkide värvikogumid"
et["colors"]["subtitle"] = "Igal Basebetoni tootel on oma kureeritud värvpalett. Sirvige tooteti või kasutage tehaselähedase spetsifikatsiooni jaoks värvikoodi."
et["colors"]["collections"] = build_collections(PRODUCT_COLLECTION_META_ET)

for slug, (title, desc) in PRODUCT_COLLECTION_META_ET.items():
    if slug not in et["products"]["items"]:
        continue
    if slug == "basebeton-originale":
        colors = bb_orig_colors
    else:
        colors = extracted.get(slug, [])
    et["products"]["items"][slug]["productColors"] = colors

with open(ET_PATH, "w") as f:
    json.dump(et, f, indent=2, ensure_ascii=False)
print(f"Updated ET — {sum(len(c['items']) for c in et['colors']['collections'].values())} total colors")

print("\nProduct color counts:")
for slug in PRODUCT_COLLECTION_META_EN:
    n = len(en["products"]["items"].get(slug, {}).get("productColors", []))
    print(f"  {slug:25s} {n}")
