#!/usr/bin/env python3
"""Replace all Topcret product data with Basebeton product data in en.json and et.json."""
import json

# ── Product data derived from official Basebeton datasheets ───────────────
PRODUCTS_EN = {
  "basebeton-originale": {
    "name": "Basebeton Originale",
    "tagline": "The ready-to-use all-rounder",
    "description": "Basebeton Originale is a ready-to-use microcement paste with micronized quartz for walls, floors, furniture and worktops. Available in 75 standard colours and custom RAL / NCS colours. EC1 Plus certified — very low emissions.",
    "features": [
      {"icon": "layers", "title": "Two-Layer System", "desc": "Applied in two distinct layers (Basa + Sense) for optimal depth, texture and durability on any vertical or horizontal surface."},
      {"icon": "droplets", "title": "Fully Waterproof", "desc": "Waterproof by nature — no additional sealers required. Ideal for bathrooms, wet rooms and kitchen worktops."},
      {"icon": "leaf", "title": "EC1 Plus Certified", "desc": "Very low volatile organic compound emissions. Certified safe for all interior spaces including bedrooms and nurseries."},
      {"icon": "sun", "title": "75 Standard Colours", "desc": "Available in 75 Basebeton Originale colours plus custom RAL and NCS matching for precise architectural specification."}
    ],
    "gallery": ["/assets/pages/products/basebeton-originale.png", "/assets/surfaces/microcemento.png", "/assets/surfaces/baxab.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "2-Layer (Basa + Sense)"},
        {"label": "Thickness", "value": "1.0 – 2.0 mm"},
        {"label": "Coverage", "value": "1.5 kg/m² per layer"},
        {"label": "Application", "value": "Stainless steel trowel"},
        {"label": "Substrate", "value": "Walls, floors, furniture"},
        {"label": "Use", "value": "Indoor only"}
      ],
      "maintenance": "Clean with pH-neutral detergent. Avoid abrasive cleaners. Sealed surface requires no specialist maintenance.",
      "philosophy": "The definitive ready-to-use microcement — where simplicity meets architectural quality."
    },
    "datasheet": "Basebeton-Originale-User-Manual-Technical-Datasheet-2024.07-1.pdf"
  },
  "beton-cire": {
    "name": "Beton Ciré Originale",
    "tagline": "Authentic elegant concrete look",
    "description": "Beton Ciré Originale is a cementitious two-layer filler with micronized quartz for walls, floors, furniture and kitchen worktops. Refined, flexible, highly durable with an authentic concrete aesthetic.",
    "features": [
      {"icon": "sparkles", "title": "Authentic Concrete Aesthetic", "desc": "Creates a refined, authentic concrete look with subtle depth and variation — no two installations are identical."},
      {"icon": "droplets", "title": "Suitable for Wet Areas", "desc": "Can be applied in bathrooms and on kitchen worktops. Waterproof system suitable for all residential wet areas."},
      {"icon": "edit", "title": "Flexible Application", "desc": "Flexible cementitious formula reduces the risk of cracking on substrates subject to minor movement."},
      {"icon": "layers", "title": "Two-Component System", "desc": "Two-layer application system ensures consistent colour depth and superior adhesion on any prepared substrate."}
    ],
    "gallery": ["/assets/pages/products/beton-cire.png", "/assets/surfaces/ecocemento.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "2-Layer cementitious"},
        {"label": "Application", "value": "Walls, floors, furniture"},
        {"label": "Flexibility", "value": "High (crack-resistant)"},
        {"label": "Substrate moisture", "value": "< 4%"},
        {"label": "Use", "value": "Indoor only"}
      ],
      "maintenance": "Wipe with damp cloth. Use pH-neutral cleaners. Re-seal every 3–5 years depending on traffic.",
      "philosophy": "Refined concrete aesthetics with the flexibility and durability professionals demand."
    },
    "datasheet": "Beton-Ciré-Originale-Use-Manual-Technical-Data-Sheet.pdf"
  },
  "oxidestuc": {
    "name": "Oxidestuc",
    "tagline": "Metallic shimmer for interiors",
    "description": "Oxidestuc is an easy-to-apply, ready-to-use paste with micronized quartz that gives walls, furniture and worktops a stunning metallic effect. Available in Gold, Bronze, Copper, Aluminium, Rust and Steel.",
    "features": [
      {"icon": "sparkles", "title": "6 Metallic Colours", "desc": "Gold, Bronze, Copper, Aluminium, Rust and Steel — each with a unique gloss level controlled by the degree of sanding."},
      {"icon": "sun", "title": "Variable Gloss Level", "desc": "The metallic sheen intensity is fully controlled during the finishing process — from subtle satin to high-gloss polish."},
      {"icon": "shield", "title": "Strong Adhesion", "desc": "Bonds directly to walls, furniture, shelves and worktops. No specialist primer required on prepared surfaces."},
      {"icon": "zap", "title": "Ready to Use", "desc": "Supplied as a ready-to-use paste — open and apply. No on-site mixing required."}
    ],
    "gallery": ["/assets/pages/products/oxidestuc.png", "/assets/surfaces/real-metals.png"],
    "details": {
      "specs": [
        {"label": "Colours", "value": "Gold, Bronze, Copper, Aluminium, Rust, Steel"},
        {"label": "Coverage", "value": "Layer 1: ~400 g/m² · Layer 2: ~250 g/m²"},
        {"label": "System", "value": "2-Layer paste + polishing"},
        {"label": "Application", "value": "Putty knife or spack knife"},
        {"label": "Use", "value": "Indoor only"}
      ],
      "maintenance": "Polish with soft cloth to restore sheen. Avoid abrasive products. Seal with recommended top coat.",
      "philosophy": "Glamour and industrial craft — the only metallic concrete finish that improves with polishing."
    },
    "datasheet": "Oxidestuc-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "natureplast": {
    "name": "Natureplast",
    "tagline": "Natural clay plaster for healthy interiors",
    "description": "Natureplast is a natural decorative clay plaster for walls in dry rooms. Free of toxic substances, fully vapour-permeable and available in a range of mineral pigment colours. Supports a healthy indoor climate.",
    "features": [
      {"icon": "leaf", "title": "100% Natural Formula", "desc": "Free of toxic substances — made from natural loam clay with mineral pigments. Safe for allergic and sensitive occupants."},
      {"icon": "wind", "title": "Fully Vapour-Permeable", "desc": "Breathes naturally with the wall, regulating humidity and preventing moisture accumulation. No condensation problems."},
      {"icon": "sparkles", "title": "Unique Cloud Texture", "desc": "Distinctive soft cloud-like swirl texture created during the second layer application — each wall is unique."},
      {"icon": "heart", "title": "Healthy Indoor Climate", "desc": "Actively contributes to indoor air quality by regulating humidity. Recommended for bedrooms, nurseries and wellness spaces."}
    ],
    "gallery": ["/assets/pages/products/natureplast.png"],
    "details": {
      "specs": [
        {"label": "Base", "value": "Natural clay / loam"},
        {"label": "Thickness", "value": "0.5 – 1.0 mm per layer"},
        {"label": "Coverage", "value": "Layer 1: ~750 g/m² · Layer 2: ~650 g/m²"},
        {"label": "Mixing", "value": "11–12.5L water per 25 kg bag"},
        {"label": "Use", "value": "Indoor dry rooms only"}
      ],
      "maintenance": "Dry dusting only. Spot clean with barely damp cloth. Avoid excessive moisture.",
      "philosophy": "Where architecture meets wellness — a living wall finish that breathes with you."
    },
    "datasheet": "Natureplast-User-Manual-Technical-Datasheet-2024.10.pdf"
  },
  "sichtbeton": {
    "name": "Sichtbeton",
    "tagline": "Authentic raw concrete look",
    "description": "Sichtbeton (literally 'sight concrete') is a high-quality cement-based coating with a special film-sheet technique that creates an authentic freshly-poured concrete appearance. Available in 3 modern grey shades.",
    "features": [
      {"icon": "layers", "title": "Film-Sheet Technique", "desc": "Unique plastic film sheets are pressed into the wet cement to create authentic concrete texture, formwork marks and subtle variations."},
      {"icon": "edit", "title": "3 Grey Shades", "desc": "Three carefully selected shades of grey — each matching the tonal range of architectural exposed concrete."},
      {"icon": "shield", "title": "Tension-Free & Diffusion-Open", "desc": "Dried material remains tension-free, diffusion-open and crack-resistant — ideal for large-format wall installations."},
      {"icon": "zap", "title": "Segment-Based Application", "desc": "Designed for segment-by-segment application with laser-level accuracy, allowing precise large-scale installations."}
    ],
    "gallery": ["/assets/pages/products/sichtbeton.png"],
    "details": {
      "specs": [
        {"label": "Colours", "value": "3 Grey Shades"},
        {"label": "Base", "value": "Cement + selected additives"},
        {"label": "Mix ratio", "value": "20 kg cement + 4–4.8L water"},
        {"label": "Technique", "value": "Plastic film sheet impression"},
        {"label": "Use", "value": "Indoor only"}
      ],
      "maintenance": "Wipe with dry or lightly damp cloth. Apply recommended sealer annually in high-traffic areas.",
      "philosophy": "The industrial concrete look — engineered to look genuinely poured, not applied."
    },
    "datasheet": "Sichtbeton-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-paint": {
    "name": "Basebeton Paint",
    "tagline": "Ready-to-use sustainable concrete paint",
    "description": "Basebeton Paint is a ready-to-use sustainable paint that creates a warm, industrial appearance on walls and various surfaces. Available in 40 unique colours. Applied with a block brush for a characteristic concrete-look effect.",
    "features": [
      {"icon": "edit", "title": "Brush-Applied Texture", "desc": "Applied with a block brush using diagonal rainbow motions — creates a unique, characteristic concrete-paint texture."},
      {"icon": "sun", "title": "40 Colours", "desc": "40 carefully selected colours spanning from warm off-whites to deep charcoals — all with an industrial, warm undertone."},
      {"icon": "leaf", "title": "Sustainable Formula", "desc": "Formulated with sustainability at its core. Low VOC, EC1 Plus certified for use in all interior spaces."},
      {"icon": "zap", "title": "Easy to Apply", "desc": "No specialist tools required. Apply with a standard block brush. Suitable for DIY and professional application alike."}
    ],
    "gallery": ["/assets/pages/products/basebeton-paint.png"],
    "details": {
      "specs": [
        {"label": "Colours", "value": "40 standard colours"},
        {"label": "Application", "value": "Block brush 3×14 cm"},
        {"label": "Layers", "value": "2 layers required"},
        {"label": "Drying time", "value": "12 hours between layers"},
        {"label": "Use", "value": "Primarily walls, indoor"}
      ],
      "maintenance": "Clean with damp cloth. Avoid harsh chemicals. Touch-up as required with same batch colour.",
      "philosophy": "Industrial concrete warmth — in paint form, without compromise."
    },
    "datasheet": "Basebeton-Paint-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-plus": {
    "name": "Basebeton Plus",
    "tagline": "The convenient one-pot system",
    "description": "Basebeton Plus is a ready-to-use microcement paste with micronized quartz for walls, floors, furniture and worktops. The convenient single-component system is available in 64 standard colours plus RAL / NCS custom matching.",
    "features": [
      {"icon": "layers", "title": "One-Pot Convenience", "desc": "Single-component ready-to-use system — no on-site mixing of multiple components. Open, stir, apply."},
      {"icon": "droplets", "title": "Waterproof System", "desc": "Suitable for bathrooms, kitchen worktops and wet-room floors. Fully waterproof when properly sealed."},
      {"icon": "sun", "title": "64 Standard Colours", "desc": "Available in 64 standard Basebeton colours plus custom RAL and NCS colour matching for specification projects."},
      {"icon": "shield", "title": "Strong Adhesion", "desc": "Bonds directly to existing tiles, concrete, cement screeds and most prepared substrates without specialist primer."}
    ],
    "gallery": ["/assets/pages/products/basebeton-plus.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "2-Layer (Basa + Sense)"},
        {"label": "Thickness", "value": "1.0 – 2.0 mm"},
        {"label": "Coverage", "value": "~1.5 kg/m² per layer"},
        {"label": "Colours", "value": "64 standard + RAL/NCS"},
        {"label": "Use", "value": "Indoor only"}
      ],
      "maintenance": "pH-neutral cleaners only. Reseal as required depending on use intensity.",
      "philosophy": "The professional's shortcut — all the quality of Basebeton, with none of the complexity."
    },
    "datasheet": "Basebeton-Plus-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-xtreme": {
    "name": "Basebeton Xtreme",
    "tagline": "The industrial epoxy floor finish",
    "description": "Basebeton Xtreme is a heavy-duty, epoxy-based microcement system with micronized quartz, applied in three layers (TechStone 2K + Basa + Sense). Available in 64 standard colours. Designed for the most demanding floor applications.",
    "features": [
      {"icon": "shield", "title": "Epoxy-Based Durability", "desc": "TechStone 2K epoxy base layer provides extreme impact, abrasion and chemical resistance — engineered for commercial floors."},
      {"icon": "layers", "title": "Three-Layer System", "desc": "TechStone 2K base + Basa + Sense. Three distinct layers build exceptional thickness, strength and surface quality."},
      {"icon": "thermometer", "title": "Radiant Heating Compatible", "desc": "Approved for use over radiant floor heating systems when installed according to approved safety specifications."},
      {"icon": "sun", "title": "64 Standard Colours", "desc": "Available in the full 64-colour Basebeton palette plus custom RAL and NCS matching."}
    ],
    "gallery": ["/assets/pages/products/basebeton-xtreme.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "3-Layer (TechStone + Basa + Sense)"},
        {"label": "Base", "value": "Epoxy 2K (TechStone)"},
        {"label": "Mix ratio", "value": "19:1 (A:B component)"},
        {"label": "TechStone coverage", "value": "800–1000 g/m²"},
        {"label": "Use", "value": "Indoor floors only"}
      ],
      "maintenance": "Industrial pH-neutral cleaners. Highly resistant to staining. No specialist sealing required.",
      "philosophy": "Where floors meet industrial rigour — the floor finish that handles everything you can throw at it."
    },
    "datasheet": "Basebeton-Xtreme-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-solid": {
    "name": "Basebeton Solid",
    "tagline": "The strongest concrete floor plaster",
    "description": "Basebeton Solid is an epoxy-based concrete plaster with micronized quartz for floors, furniture and walls. The strongest concrete plaster in its field. Available in 22 own colours and the full 64-colour Basebeton range.",
    "features": [
      {"icon": "shield", "title": "Maximum Strength", "desc": "Epoxy-based formula makes Basebeton Solid the strongest concrete plaster available — for the most demanding floor surfaces."},
      {"icon": "droplets", "title": "Wet Room Approved", "desc": "Fully suitable for wet areas including bathrooms, shower floors and pool surrounds when properly sealed."},
      {"icon": "layers", "title": "Three-Layer Build", "desc": "TechStone 2K base + Solid Basa + Solid Sense — three layers build extraordinary structural integrity."},
      {"icon": "thermometer", "title": "Heated Floor Compatible", "desc": "Safe for use over radiant floor heating systems when installed per approved specifications."}
    ],
    "gallery": ["/assets/pages/products/basebeton-solid.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "3-Layer epoxy"},
        {"label": "Colours", "value": "22 own + 64 Basebeton standard"},
        {"label": "Base layer", "value": "TechStone 2K epoxy"},
        {"label": "Substrate flatness", "value": "Class 2 or higher"},
        {"label": "Use", "value": "Indoor (floors, walls, furniture)"}
      ],
      "maintenance": "Wipe with damp cloth. Commercial cleaners safe. No periodic sealing required.",
      "philosophy": "Strength without compromise — the epoxy concrete finish that never backs down."
    },
    "datasheet": "Basebeton-Solid-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-grit": {
    "name": "Basebeton Grit",
    "tagline": "Sustainable concrete plaster floor",
    "description": "Basebeton Grit is a highly durable two-component concrete stucco with micronized quartz for heavy-duty floors. Creates a sleek, seamless finish with an authentic concrete look. Available in 20 standard colours.",
    "features": [
      {"icon": "shield", "title": "Heavy-Duty Floor System", "desc": "Designed specifically for heavy-duty floor applications — extreme durability and abrasion resistance in commercial and residential settings."},
      {"icon": "edit", "title": "Authentic Grit Texture", "desc": "Distinctive textured surface with natural concrete grain — seamless, contemporary and architecturally refined."},
      {"icon": "droplets", "title": "Wet Room Ready", "desc": "Apply SA AquaStop seal before Basebeton Grit for full wet room waterproofing in shower areas and bathrooms."},
      {"icon": "leaf", "title": "Sustainable Concrete Aesthetic", "desc": "Low-embodied-carbon concrete plaster. EC1 Plus certified. Designed with longevity and sustainability in mind."}
    ],
    "gallery": ["/assets/pages/products/basebeton-grit.png"],
    "details": {
      "specs": [
        {"label": "System", "value": "2K (TechStone + Grit Basa)"},
        {"label": "Colours", "value": "20 standard colours"},
        {"label": "TechStone coverage", "value": "800–1000 g/m²"},
        {"label": "Application", "value": "Stainless steel trowel"},
        {"label": "Use", "value": "Indoor floors only"}
      ],
      "maintenance": "pH-neutral cleaners. Resistant to staining and impact. Minimal maintenance required.",
      "philosophy": "Industrial strength, refined texture — the heavy-duty floor that makes no visual concessions."
    },
    "datasheet": "Basebeton-Grit-User-Manual-Technical-Datasheet-2024.08.pdf"
  },
  "stuccopuro": {
    "name": "Stuccopuro",
    "tagline": "Decorative concrete-look wall finish",
    "description": "Stuccopuro is a mineral and plastic-bonded decorative interior plaster with a matte concrete look. Ready to use. Available in 60 unique colours plus custom RAL / NCS. For walls in dry areas.",
    "features": [
      {"icon": "sparkles", "title": "Matte Concrete Aesthetic", "desc": "Delivers a sophisticated matte concrete look — softer and warmer than standard microcement, ideal for living rooms and hotel spaces."},
      {"icon": "layers", "title": "Two-Layer Application", "desc": "First layer determines the final appearance and texture. Second layer is scraped over as thin as 0.1–0.5 mm for depth."},
      {"icon": "sun", "title": "60 Unique Colours", "desc": "60 carefully curated colours plus custom RAL and NCS matching for precise interior design specifications."},
      {"icon": "shield", "title": "Mineral & Plastic Bonded", "desc": "Hybrid mineral and plastic bond provides flexibility, adhesion and durability superior to purely mineral-based plasters."}
    ],
    "gallery": ["/assets/pages/products/stuccopuro.png", "/assets/surfaces/summery.png"],
    "details": {
      "specs": [
        {"label": "Colours", "value": "60 unique + RAL/NCS"},
        {"label": "System", "value": "2-Layer decorative plaster"},
        {"label": "Second layer thickness", "value": "0.1–0.5 mm"},
        {"label": "Application", "value": "Stainless steel trowel"},
        {"label": "Use", "value": "Indoor dry areas only"}
      ],
      "maintenance": "Dry dust or very lightly damp cloth. Not suitable for wet cleaning. For dry areas only.",
      "philosophy": "The art of restraint — matte concrete elegance without the weight."
    },
    "datasheet": "Stuccopuro-User-Manual-Technical-Datasheet-2024.07.pdf"
  }
}

PRODUCTS_ET = {
  "basebeton-originale": {
    "name": "Basebeton Originale",
    "tagline": "Valmis kasutamiseks — kõikjal kasutatav",
    "description": "Basebeton Originale on valmiskasutamiseks mõeldud mikrotseмendipasta mikroniseeritud kvartsi sisaldusega — seintele, põrandatele, mööblile ja töötasapindadele. Saadaval 75 standardvärvis ja kohandatud RAL/NCS värvidena. EC1 Plus sertifitseeritud.",
    "features": [
      {"icon": "layers", "title": "Kahe kihiga süsteem", "desc": "Kaks kihti (Basa + Sense) tagavad optimaalse sügavuse, tekstuuri ja vastupidavuse igal pinnal."},
      {"icon": "droplets", "title": "Täielikult veekindel", "desc": "Veekindel oma olemuselt — täiendavaid tihendeid ei ole vaja. Sobib vannitubadesse, märgaladele ja köögitasapindadele."},
      {"icon": "leaf", "title": "EC1 Plus sertifikaat", "desc": "Väga madal lenduvate orgaaniliste ühendite emissioon. Sertifitseeritud kõikide siseruumide jaoks."},
      {"icon": "sun", "title": "75 standardvärvi", "desc": "Saadaval 75 Basebeton Originale värvitoonis ning kohandatud RAL ja NCS värvide sobitamisega."}
    ],
    "gallery": ["/assets/pages/products/basebeton-originale.png", "/assets/surfaces/microcemento.png", "/assets/surfaces/baxab.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "2 kihti (Basa + Sense)"},
        {"label": "Paksus", "value": "1,0 – 2,0 mm"},
        {"label": "Kulu", "value": "1,5 kg/m² kihi kohta"},
        {"label": "Töövahend", "value": "Roostevaba teraspahtlid"},
        {"label": "Aluspind", "value": "Seinad, põrandad, mööbel"},
        {"label": "Kasutus", "value": "Ainult siseruumides"}
      ],
      "maintenance": "Puhastage pH-neutraalse vahendiga. Vältige abrasiivseid puhastusvahendeid.",
      "philosophy": "Valmismikrotsement arhitektuurilise kvaliteediga — lihtsus kohtub professionaalse tulemusega."
    },
    "datasheet": "Basebeton-Originale-User-Manual-Technical-Datasheet-2024.07-1.pdf"
  },
  "beton-cire": {
    "name": "Beton Ciré Originale",
    "tagline": "Autentne ja elegantne betoonilook",
    "description": "Beton Ciré Originale on kahe kihiga tsemendibaasil täiteaine mikroniseeritud kvartsiga — seintele, põrandatele, mööblile ja köögitasapindadele. Peen, painduv, vastupidav ja autentse betoonilook.",
    "features": [
      {"icon": "sparkles", "title": "Autentne betoonilook", "desc": "Loob peen, autentne betoonilook subtiiilse sügavuse ja variatsiooniga — iga paigaldus on ainulaadne."},
      {"icon": "droplets", "title": "Sobib märgaladele", "desc": "Sobib vannitubadesse ja köögitasapindadele. Veekindel süsteem kõikide elamumärjalade jaoks."},
      {"icon": "edit", "title": "Painduv pealekandmine", "desc": "Painduv tsemendivalem vähendab pragunemisohtu kerge liikumisega aluspindadel."},
      {"icon": "layers", "title": "Kahe kihiga süsteem", "desc": "Tagab ühtlase värvusügavuse ja ülima adhesiooni igal ettevalmistatud aluspinnal."}
    ],
    "gallery": ["/assets/pages/products/beton-cire.png", "/assets/surfaces/ecocemento.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "2 kihti tsemendibaasil"},
        {"label": "Kasutus", "value": "Seinad, põrandad, mööbel"},
        {"label": "Paindlikkus", "value": "Kõrge (pragusidekindel)"},
        {"label": "Aluspinna niiskus", "value": "< 4%"},
        {"label": "Kasutus", "value": "Ainult siseruumides"}
      ],
      "maintenance": "Pühkige niiske lapiga. Kasutage pH-neutraalseid puhastusvahendeid.",
      "philosophy": "Peen betoonesteetika paindlikkuse ja vastupidavusega."
    },
    "datasheet": "Beton-Ciré-Originale-Use-Manual-Technical-Data-Sheet.pdf"
  },
  "oxidestuc": {
    "name": "Oxidestuc",
    "tagline": "Metalliline sära siseruumidesse",
    "description": "Oxidestuc on valmiskasutamiseks pasta mikroniseeritud kvartsiga, mis annab seintele, mööblile ja tööpindadele vapustava metallilise efekti. Saadaval: Kuld, Pronks, Vask, Alumiinium, Rooste ja Teras.",
    "features": [
      {"icon": "sparkles", "title": "6 metallillist tooni", "desc": "Kuld, Pronks, Vask, Alumiinium, Rooste ja Teras — igaüks ainulaadse läikeastmega."},
      {"icon": "sun", "title": "Reguleeritav läige", "desc": "Metallilise sära intensiivsust juhib lihvimisaste — matt satiin kuni kõrglakk."},
      {"icon": "shield", "title": "Tugev adhesioon", "desc": "Kleepub otse seintele, mööblile ja töötasapindadele."},
      {"icon": "zap", "title": "Valmis kasutamiseks", "desc": "Valmispasta — avage ja kandke pealekandes. Kohapeal segamist ei vaja."}
    ],
    "gallery": ["/assets/pages/products/oxidestuc.png", "/assets/surfaces/real-metals.png"],
    "details": {
      "specs": [
        {"label": "Värvid", "value": "Kuld, Pronks, Vask, Alumiinium, Rooste, Teras"},
        {"label": "Kulu", "value": "1. kiht ~400 g/m² · 2. kiht ~250 g/m²"},
        {"label": "Süsteem", "value": "2 kihti + lihvimine"},
        {"label": "Töövahend", "value": "Pahtlid"},
        {"label": "Kasutus", "value": "Ainult siseruumides"}
      ],
      "maintenance": "Pühkige pehme lapiga. Vältige abrasiivseid tooteid.",
      "philosophy": "Glamuur ja tööstuslik käsitöö — ainus metalliline betoonviimistlus, mis paraneb lihvimisega."
    },
    "datasheet": "Oxidestuc-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "natureplast": {
    "name": "Natureplast",
    "tagline": "Looduslik savimaaling tervetes siseruumides",
    "description": "Natureplast on looduslik dekoratiivne savimaaling seintele kuivades ruumides. Mürgiainetest vaba, täielikult auruläbilaskev ning aitab hoida tervislikku sisekliimat.",
    "features": [
      {"icon": "leaf", "title": "100% looduslik", "desc": "Mürgiainetest vaba — looduslikust savimullast mineraalpigmentidega. Ohutu allergilistele ja tundlikele kasutajatele."},
      {"icon": "wind", "title": "Täielikult auruläbilaskev", "desc": "Hingab loomulikult koos seinaga, reguleerides niiskust ja ennetades kondensatsiooni."},
      {"icon": "sparkles", "title": "Ainulaadne pilvestruktuur", "desc": "Iseloomulik pehme pilvetekstuura, mis tekib teise kihi pealekandmisel — iga sein on ainulaadne."},
      {"icon": "heart", "title": "Tervislik sisekliima", "desc": "Aktiivselt parandab siseõhu kvaliteeti. Soovitatav magamistubadesse, lastetubadesse ja heaoluruumidesse."}
    ],
    "gallery": ["/assets/pages/products/natureplast.png"],
    "details": {
      "specs": [
        {"label": "Baas", "value": "Looduslik savi/lutt"},
        {"label": "Paksus", "value": "0,5–1,0 mm kihi kohta"},
        {"label": "Kulu", "value": "1. kiht ~750 g/m² · 2. kiht ~650 g/m²"},
        {"label": "Segu", "value": "11–12,5 L vett 25 kg kohta"},
        {"label": "Kasutus", "value": "Ainult sisekuivades ruumides"}
      ],
      "maintenance": "Ainult kuivpuhastus. Plekid pühkige niiske lapiga. Vältige liigset niiskust.",
      "philosophy": "Kus arhitektuur kohtub heaoluga — elav seinaviimistlus, mis hingab koos teiega."
    },
    "datasheet": "Natureplast-User-Manual-Technical-Datasheet-2024.10.pdf"
  },
  "sichtbeton": {
    "name": "Sichtbeton",
    "tagline": "Autentne toorbetoon-look",
    "description": "Sichtbeton on kõrgkvaliteetsed tsemendibaasil kattevärv, mis loob erikiletehnoloogiaga autentse valatava betooni välimuse. Saadaval 3 kaasaegses halltoonis.",
    "features": [
      {"icon": "layers", "title": "Kiletehnoloogia", "desc": "Ainulaadne plastkile surutakse märja tsemendi sisse, luues autentse betoontekstuuri, vormimarke ja subtiiilsed variatsioonid."},
      {"icon": "edit", "title": "3 halli tooni", "desc": "Kolm hoolikalt valitud halli tooni — vastavad arhitektuurse ekspositsioonbetooni toonivahemikule."},
      {"icon": "shield", "title": "Pingevaba ja difusioonav", "desc": "Kuivanud materjal jääb pingevabaks, difusioonlahtiseks ja pragusidekindlaks."},
      {"icon": "zap", "title": "Segmentpõhine paigaldus", "desc": "Mõeldud segmentide kaupa täpseks paigalduseks lasernivelliriga."}
    ],
    "gallery": ["/assets/pages/products/sichtbeton.png"],
    "details": {
      "specs": [
        {"label": "Värvid", "value": "3 halli tooni"},
        {"label": "Baas", "value": "Tsement + lisained"},
        {"label": "Segamissuhe", "value": "20 kg tsementi + 4–4,8 L vett"},
        {"label": "Tehnika", "value": "Plastkile surumine"},
        {"label": "Kasutus", "value": "Ainult siseruumides"}
      ],
      "maintenance": "Pühkige kuiva või kergelt niiske lapiga. Kandke soovitatud tihend peale kord aastas.",
      "philosophy": "Tööstuslik betoonilook — disainitud nägema tõeliselt valatuna, mitte peale kantuna."
    },
    "datasheet": "Sichtbeton-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-paint": {
    "name": "Basebeton Paint",
    "tagline": "Jätkusuutlik valmismikretsementivärv",
    "description": "Basebeton Paint on valmiskasutamiseks jätkusuutlik värv, mis loob sooja ja tööstusliku välimuse seintele. Saadaval 40 kordumatut värvi. Kantakse peale plokipintsliga.",
    "features": [
      {"icon": "edit", "title": "Pintslitekstuura", "desc": "Kantakse plokipintsliga diagonaalsete vikerkaar-liigutustega — loob ainulaadse betoonivärvi tekstuuri."},
      {"icon": "sun", "title": "40 värvi", "desc": "40 hoolikalt valitud värvi soojadest kreemidest sügavate söe toonideni."},
      {"icon": "leaf", "title": "Jätkusuutlik valem", "desc": "Väike VOC sisaldus, EC1 Plus sertifitseeritud kõikidele siseruumidele."},
      {"icon": "zap", "title": "Lihtne kanda", "desc": "Eritööriistu ei ole vaja. Kantakse peale tavalise plokipintsliga."}
    ],
    "gallery": ["/assets/pages/products/basebeton-paint.png"],
    "details": {
      "specs": [
        {"label": "Värvid", "value": "40 standardvärvi"},
        {"label": "Töövahend", "value": "Plokipintsel 3×14 cm"},
        {"label": "Kihid", "value": "2 kihti"},
        {"label": "Kuivamisaeg", "value": "12 tundi kihtide vahel"},
        {"label": "Kasutus", "value": "Peamiselt seinad, siseruumides"}
      ],
      "maintenance": "Puhastage niiske lapiga. Vältige kemikaale. Retušeerige sama partii värviga.",
      "philosophy": "Tööstuslik betoonisoojus — värvina, ilma kompromissideta."
    },
    "datasheet": "Basebeton-Paint-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-plus": {
    "name": "Basebeton Plus",
    "tagline": "Mugav ühekomponentne süsteem",
    "description": "Basebeton Plus on valmismikrotsemendipasta mikroniseeritud kvartsiga — seintele, põrandatele, mööblile ja töötasapindadele. Mugav ühekomponentne süsteem 64 standardvärviga.",
    "features": [
      {"icon": "layers", "title": "Ühekomponentne mugavus", "desc": "Ühekomponentne valmissüsteem — kohapeal ei segata mitut komponenti. Ava, sega, kanna peale."},
      {"icon": "droplets", "title": "Veekindel süsteem", "desc": "Sobib vannitubadesse, köögitasapindadele ja märgaladele. Täielikult veekindel."},
      {"icon": "sun", "title": "64 standardvärvi", "desc": "Saadaval 64 standardvärvis ning kohandatud RAL ja NCS värvide sobitamisega."},
      {"icon": "shield", "title": "Tugev adhesioon", "desc": "Kinnitub otse olemasolevale plaadile, betoonile ja tsemendikrundile."}
    ],
    "gallery": ["/assets/pages/products/basebeton-plus.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "2 kihti (Basa + Sense)"},
        {"label": "Paksus", "value": "1,0 – 2,0 mm"},
        {"label": "Kulu", "value": "~1,5 kg/m² kihi kohta"},
        {"label": "Värvid", "value": "64 standardvärvi + RAL/NCS"},
        {"label": "Kasutus", "value": "Ainult siseruumides"}
      ],
      "maintenance": "Ainult pH-neutraalsed puhastusvahendid. Tihendage vastavalt kasutusintensiivsusele.",
      "philosophy": "Professionaali lühitee — kogu Basebetoni kvaliteet, ilma keerukuseta."
    },
    "datasheet": "Basebeton-Plus-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-xtreme": {
    "name": "Basebeton Xtreme",
    "tagline": "Tööstuslik epoksüpõranda viimistlus",
    "description": "Basebeton Xtreme on kolme kihiga raskekoormuslik epoksübaasil mikrotsemendisüsteem (TechStone 2K + Basa + Sense). 64 standardvärvi. Mõeldud kõige nõudlikumatele põrandarakendustele.",
    "features": [
      {"icon": "shield", "title": "Epoksüpõhine vastupidavus", "desc": "TechStone 2K epoksübaas tagab äärmusliku löögikindluse, abrasiivsuskindluse ja keemiakindluse."},
      {"icon": "layers", "title": "Kolme kihiga süsteem", "desc": "TechStone 2K baas + Basa + Sense. Kolm kihti tagavad erakorralise tugevuse ja pinnakvaliteedi."},
      {"icon": "thermometer", "title": "Sobib põrandaküttega", "desc": "Heaks kiidetud kasutamiseks põrandaküttesüsteemide peale, kui paigaldatud nõuetekohaselt."},
      {"icon": "sun", "title": "64 standardvärvi", "desc": "Saadaval täielikus 64-värviliises Basebetoni paletis ning kohandatud RAL/NCS sobitamisega."}
    ],
    "gallery": ["/assets/pages/products/basebeton-xtreme.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "3 kihti (TechStone + Basa + Sense)"},
        {"label": "Baas", "value": "Epoksi 2K (TechStone)"},
        {"label": "Segamissuhe", "value": "19:1 (A:B komponent)"},
        {"label": "TechStone kulu", "value": "800–1000 g/m²"},
        {"label": "Kasutus", "value": "Ainult sisepõrandad"}
      ],
      "maintenance": "Tööstuslikud pH-neutraalsed puhastusvahendid. Väga tahrastuskindel.",
      "philosophy": "Kus põrandad kohtavad tööstuslike nõudmistega — põrandaviimistlus, mis talub kõike."
    },
    "datasheet": "Basebeton-Xtreme-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-solid": {
    "name": "Basebeton Solid",
    "tagline": "Tugevaim betoonipõranda krohv",
    "description": "Basebeton Solid on epoksübaasil betoonimaaling mikroniseeritud kvartsiga — põrandatele, mööblile ja seintele. Tugevaim betoonimaaling oma valdkonnas. 22 omavärvi ja täielik 64-värviline Basebetoni valik.",
    "features": [
      {"icon": "shield", "title": "Maksimaalne tugevus", "desc": "Epoksüvalem muudab Basebeton Solidi tugevaimate betoonmaalingute hulka — nõudlikemate põrandapindade jaoks."},
      {"icon": "droplets", "title": "Kinnitatud märgaladele", "desc": "Täielikult sobib märgaladesse, sh vannitubadesse, duširuumidesse ja basseiniäärsetele aladele."},
      {"icon": "layers", "title": "Kolme kihiga konstruktsioon", "desc": "TechStone 2K baas + Solid Basa + Solid Sense — erakordne struktuuriline terviklikkus."},
      {"icon": "thermometer", "title": "Põrandaküttega ühilduv", "desc": "Ohutu kasutada põrandaküttesüsteemide peale nõuetekohase paigalduse korral."}
    ],
    "gallery": ["/assets/pages/products/basebeton-solid.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "3 kihti epoksi"},
        {"label": "Värvid", "value": "22 omavärvi + 64 Basebetoni standardvärvi"},
        {"label": "Baaskiht", "value": "TechStone 2K epoksi"},
        {"label": "Aluspinna tasasus", "value": "Klass 2 või kõrgem"},
        {"label": "Kasutus", "value": "Siseruumides (põrandad, seinad, mööbel)"}
      ],
      "maintenance": "Pühkige niiske lapiga. Kommertspuhastusvahendid on ohutud. Perioodilist tihendamist ei nõuta.",
      "philosophy": "Tugevus ilma kompromissideta — epoksübetoon, mis ei tagane kunagi."
    },
    "datasheet": "Basebeton-Solid-User-Manual-Technical-Datasheet-2024.07.pdf"
  },
  "basebeton-grit": {
    "name": "Basebeton Grit",
    "tagline": "Jätkusuutlik betoonpõranda krohv",
    "description": "Basebeton Grit on kahe kihiga kõrgkindel betoonstukk mikroniseeritud kvartsiga raskekoormuslikele põrandatele. Loob sileda, saumväärse viimistluse autentse betoonilookiga. 20 standardvärvi.",
    "features": [
      {"icon": "shield", "title": "Raskekoormuslik põrandasüsteem", "desc": "Eelkõige mõeldud raskete koormuste all olevatele põrandatele — äärmuslik vastupidavus."},
      {"icon": "edit", "title": "Autentne griiditekstuura", "desc": "Iseloomulik tekstuuritud pind loomuliku betooniteraga — saumvaba ja arhitektuurselt rafineeritud."},
      {"icon": "droplets", "title": "Märgalaks valmis", "desc": "Kandke SA AquaStop tihend enne Basebeton Griti täieliku märgala veekindluse saavutamiseks."},
      {"icon": "leaf", "title": "Jätkusuutlik betoonesteetika", "desc": "Madal süsinikhäälestus, EC1 Plus sertifitseeritud. Mõeldud pikaealisuse ja jätkusuutlikkuse silmas pidades."}
    ],
    "gallery": ["/assets/pages/products/basebeton-grit.png"],
    "details": {
      "specs": [
        {"label": "Süsteem", "value": "2K (TechStone + Grit Basa)"},
        {"label": "Värvid", "value": "20 standardvärvi"},
        {"label": "TechStone kulu", "value": "800–1000 g/m²"},
        {"label": "Töövahend", "value": "Roostevaba teraspahtlid"},
        {"label": "Kasutus", "value": "Ainult sisepõrandad"}
      ],
      "maintenance": "pH-neutraalsed puhastusvahendid. Tahrastus- ja löögikindel. Minimaalne hooldus.",
      "philosophy": "Tööstuslik tugevus, rafineeritud tekstuura — raskekoormuslik põrand, mis ei tee visuaalseid järeleandmisi."
    },
    "datasheet": "Basebeton-Grit-User-Manual-Technical-Datasheet-2024.08.pdf"
  },
  "stuccopuro": {
    "name": "Stuccopuro",
    "tagline": "Dekoratiivne mattkrohv betoonilookiga",
    "description": "Stuccopuro on mineraal- ja plastiksiduriga dekoratiivne sisekrohv mati betoonilookiga. Valmiskasutamiseks. Saadaval 60 kordumatut värvi + RAL/NCS. Ainult kuivade ruumide seintele.",
    "features": [
      {"icon": "sparkles", "title": "Matt betoonesteetika", "desc": "Keerukas matt betoonilook — pehmem ja soojem kui standardne mikrotsement, ideaalne elutubadesse ja hotellipindadele."},
      {"icon": "layers", "title": "Kahe kihiga pealekanne", "desc": "Esimene kiht määrab lõpliku välimuse ja tekstuuri. Teine kiht kraabitakse nii õhukeselt kui 0,1–0,5 mm."},
      {"icon": "sun", "title": "60 kordumatu värviga", "desc": "60 hoolikalt valitud värvi pluss kohandatud RAL ja NCS sobitamine."},
      {"icon": "shield", "title": "Mineraal-plastiksidum", "desc": "Hübriidsidem tagab paindlikkuse, adhesiooni ja vastupidavuse."}
    ],
    "gallery": ["/assets/pages/products/stuccopuro.png", "/assets/surfaces/summery.png"],
    "details": {
      "specs": [
        {"label": "Värvid", "value": "60 kordumatu + RAL/NCS"},
        {"label": "Süsteem", "value": "2 kihti dekoratiivkrohv"},
        {"label": "2. kihi paksus", "value": "0,1–0,5 mm"},
        {"label": "Töövahend", "value": "Roostevaba teraskühvel"},
        {"label": "Kasutus", "value": "Ainult sise-kuivad alad"}
      ],
      "maintenance": "Kuivpuhastus või väga kergelt niiske lapp. Ei sobi märgpuhastuseks.",
      "philosophy": "Piirangute kunst — matt betoonelegants ilma raskuseta."
    },
    "datasheet": "Stuccopuro-User-Manual-Technical-Datasheet-2024.07.pdf"
  }
}

# ── Load and update both dictionaries ────────────────────────────────────

EN_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json"
ET_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/et.json"

for path, products, lang in [(EN_PATH, PRODUCTS_EN, "EN"), (ET_PATH, PRODUCTS_ET, "ET")]:
    with open(path) as f:
        d = json.load(f)

    # Replace ALL product items with Basebeton products
    d["products"]["items"] = products

    # Update products page title/subtitle
    if lang == "EN":
        d["products"]["title"] = "Basebeton Collection"
        d["products"]["subtitle"] = "Premium ready-to-use microcement systems. EC1 Plus certified. Available in 75+ colours."
    else:
        d["products"]["title"] = "Basebetoni Kollektsioon"
        d["products"]["subtitle"] = "Premium valmiskasutatavad mikrotsemendisüsteemid. EC1 Plus sertifitseeritud. Saadaval 75+ värvis."

    # Update surfaces_collection to use Basebeton product names
    if "surfaces_collection" in d:
        if lang == "EN":
            d["surfaces_collection"]["title"] = "Basebeton Systems"
            d["surfaces_collection"]["subtitle"] = "11 professional ready-to-use microcement systems for every application."
        else:
            d["surfaces_collection"]["title"] = "Basebetoni Süsteemid"
            d["surfaces_collection"]["subtitle"] = "11 professionaalset valmiskasutatavat mikrotsemendisüsteemi iga rakenduse jaoks."

    with open(path, "w") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
    print(f"Updated {lang}: {len(products)} products")

print("\nDone.")
