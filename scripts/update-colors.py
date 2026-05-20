#!/usr/bin/env python3
"""Replace colors section in en.json and et.json with Basebeton palette."""

import json

# ── Basebeton colors from PDF (code, name, hex) ───────────────────────────
# Organized by the 4 sample card pages

PAGE1 = [  # Neutrals & Classic Greys
    {"code": "10-1",  "name": "Dutch Grey",   "hex": "#B2AFAC"},
    {"code": "10-2",  "name": "Mouse",         "hex": "#B1AFAA"},
    {"code": "10-3",  "name": "Stone",         "hex": "#9F9D97"},
    {"code": "10-4",  "name": "Pebble",        "hex": "#8D8A85"},
    {"code": "10-6",  "name": "Mauwe",         "hex": "#82837F"},
    {"code": "10-8",  "name": "Mud",           "hex": "#797672"},
    {"code": "10-9",  "name": "Persian",       "hex": "#63605C"},
    {"code": "10-10", "name": "Pitch Black",   "hex": "#616161"},
    {"code": "10-13", "name": "Berry",         "hex": "#9C9088"},
    {"code": "10-14", "name": "Clay",          "hex": "#ACA098"},
    {"code": "10-15", "name": "Duhe",          "hex": "#D0C6BC"},
    {"code": "10-16", "name": "Dawn",          "hex": "#C5C2BF"},
    {"code": "10-17", "name": "Buff",          "hex": "#BDB0A8"},
    {"code": "10-18", "name": "Wheat",         "hex": "#DED2C7"},
    {"code": "10-19", "name": "Daw",           "hex": "#ECD8AD"},
    {"code": "10-20", "name": "Olive",         "hex": "#C0B39C"},
    {"code": "10-21", "name": "Moss",          "hex": "#7A7772"},
    {"code": "10-22", "name": "Cord",          "hex": "#E4CEAC"},
    {"code": "10-23", "name": "Mocca",         "hex": "#9E897D"},
    {"code": "10-24", "name": "Past Yellow",   "hex": "#D2C3AC"},
]

PAGE2 = [  # Earth & Terra Tones
    {"code": "10-26", "name": "Rose Red",      "hex": "#C78F7B"},
    {"code": "10-27", "name": "Truffel",       "hex": "#B58F78"},
    {"code": "10-28", "name": "Blossom",       "hex": "#CAD3B9"},
    {"code": "10-29", "name": "Sage",          "hex": "#B6B5A1"},
    {"code": "10-30", "name": "Artichok",      "hex": "#A6A597"},
    {"code": "10-31", "name": "Brown",         "hex": "#897E70"},
    {"code": "10-32", "name": "Putty",         "hex": "#ADA297"},
    {"code": "10-33", "name": "Grime",         "hex": "#ACA098"},
    {"code": "10-34", "name": "Canvas",        "hex": "#BDB0A8"},
    {"code": "10-35", "name": "Steel Black",   "hex": "#6E6F6A"},
    {"code": "10-37", "name": "Tender",        "hex": "#98837E"},
    {"code": "10-38", "name": "Rose White",    "hex": "#D8D5CF"},
    {"code": "10-41", "name": "Lice Taupe",    "hex": "#B2AFAA"},
    {"code": "10-42", "name": "Mey Red",       "hex": "#B28A7B"},
    {"code": "10-43", "name": "Deep Brown",    "hex": "#89716A"},
    {"code": "10-45", "name": "Knosse",        "hex": "#89716B"},
    {"code": "10-47", "name": "Raum Red",      "hex": "#8B6154"},
    {"code": "10-48", "name": "Sinc",          "hex": "#B3AFAC"},
    {"code": "10-49", "name": "Smoke",         "hex": "#9D9E9C"},
    {"code": "10-50", "name": "Ice",           "hex": "#CECAC4"},
]

PAGE3 = [  # Cool Mineral Greys
    {"code": "10-51", "name": "Lava",          "hex": "#6E6F6A"},
    {"code": "10-52", "name": "Ash",           "hex": "#C2C3BF"},
    {"code": "10-53", "name": "Lin",           "hex": "#BBBCB7"},
    {"code": "10-54", "name": "Deep",          "hex": "#9D9D9B"},
    {"code": "10-55", "name": "Elephant",      "hex": "#BBBCB7"},
    {"code": "10-56", "name": "Hippo",         "hex": "#B1ADAA"},
    {"code": "10-57", "name": "Wolf",          "hex": "#B2AFAC"},
    {"code": "10-58", "name": "Whale",         "hex": "#959595"},
    {"code": "10-59", "name": "Grizzle",       "hex": "#A6A7A4"},
    {"code": "10-60", "name": "Rock",          "hex": "#8D8E8A"},
    {"code": "10-61", "name": "Flake",         "hex": "#BFB19C"},
    {"code": "10-62", "name": "Sisal",         "hex": "#BDB0A8"},
    {"code": "10-63", "name": "Gentle",        "hex": "#D0C6BC"},
    {"code": "10-64", "name": "Grain",         "hex": "#C3B19C"},
    {"code": "10-65", "name": "Oat",           "hex": "#D2C8BB"},
    {"code": "10-66", "name": "Loam",          "hex": "#BEB3A6"},
    {"code": "10-67", "name": "Dust",          "hex": "#D3C7B9"},
    {"code": "10-68", "name": "Savanne",       "hex": "#D0C6BC"},
    {"code": "10-69", "name": "Caramel",       "hex": "#9C8B74"},
    {"code": "10-70", "name": "Tierra",        "hex": "#9E847A"},
]

PAGE4 = [  # Warm Browns & Pastels
    {"code": "10-71", "name": "Indian",        "hex": "#9E7E5D"},
    {"code": "10-72", "name": "Brownie",       "hex": "#89706A"},
    {"code": "10-73", "name": "Choco",         "hex": "#5A4D46"},
    {"code": "10-74", "name": "Blush",         "hex": "#C57B71"},
    {"code": "10-75", "name": "Bright",        "hex": "#E6E2E0"},
    {"code": "10-76", "name": "Shell",         "hex": "#BCBAAE"},
    {"code": "10-77", "name": "Cotton",        "hex": "#C4C1B9"},
    {"code": "10-78", "name": "Sand",          "hex": "#CDCAC4"},
    {"code": "10-79", "name": "Pigeon",        "hex": "#B2AFAA"},
    {"code": "10-80", "name": "Noce",          "hex": "#ADA297"},
    {"code": "10-81", "name": "Khaki",         "hex": "#A8A28C"},
    {"code": "10-82", "name": "Delta",         "hex": "#837C6B"},
    {"code": "10-83", "name": "Dove",          "hex": "#8E9180"},
    {"code": "10-84", "name": "Lagoon",        "hex": "#A8B8B2"},
    {"code": "10-85", "name": "Lychee",        "hex": "#C5AFA2"},
]

COLLECTIONS_EN = {
    "neutrals": {
        "title": "Neutrals & Classic Greys",
        "description": "Timeless concrete tones from pale stone to deep charcoal.",
        "items": PAGE1,
    },
    "earth": {
        "title": "Earth & Terra",
        "description": "Warm mineral pigments drawn from clay, ochre, and terracotta.",
        "items": PAGE2,
    },
    "mineral": {
        "title": "Cool Mineral Greys",
        "description": "Cool-toned architectural greys with blue and green undertones.",
        "items": PAGE3,
    },
    "warm": {
        "title": "Warm Browns & Pastels",
        "description": "Soft warm hues from sand and ivory to rich walnut and sage.",
        "items": PAGE4,
    },
}

COLLECTIONS_ET = {
    "neutrals": {
        "title": "Neutraalsed & Klassikalised Hallid",
        "description": "Aegumatud betoonitonaalsused helekivist tumeda antratsiidini.",
        "items": PAGE1,
    },
    "earth": {
        "title": "Maa & Terra",
        "description": "Soojad mineraalpigmendid savist, ookrist ja terrakotast.",
        "items": PAGE2,
    },
    "mineral": {
        "title": "Külmad Mineraalhallid",
        "description": "Külmatoonilised arhitektuursed hallid sinise ja rohelise alatooniga.",
        "items": PAGE3,
    },
    "warm": {
        "title": "Soojad Pruunid & Pastellid",
        "description": "Pehmed soojad toonid liivast ja elevandiluust rikkate pähkli- ja salveitoonideni.",
        "items": PAGE4,
    },
}

# ── Update en.json ────────────────────────────────────────────────────────
EN_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json"
with open(EN_PATH) as f:
    en = json.load(f)

en["colors"]["title"] = "Basebeton Originale"
en["colors"]["subtitle"] = "75 mineral pigment colours from the complete Basebeton Originale collection. Specify by code for exact factory colour matching."
en["colors"]["collections"] = COLLECTIONS_EN

with open(EN_PATH, "w") as f:
    json.dump(en, f, indent=2, ensure_ascii=False)
print(f"Updated {EN_PATH}")

# ── Update et.json ────────────────────────────────────────────────────────
ET_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/et.json"
with open(ET_PATH) as f:
    et = json.load(f)

et["colors"]["title"] = "Basebeton Originale"
et["colors"]["subtitle"] = "75 mineraalpigmendi värvi täieliku Basebeton Originale kollektsioonist. Täpseks tehasevärvide sobitamiseks kasutage värvikoodi."
et["colors"]["collections"] = COLLECTIONS_ET

with open(ET_PATH, "w") as f:
    json.dump(et, f, indent=2, ensure_ascii=False)
print(f"Updated {ET_PATH}")

total = len(PAGE1) + len(PAGE2) + len(PAGE3) + len(PAGE4)
print(f"\nDone: {total} Basebeton colors across 4 collections")
