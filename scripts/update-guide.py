#!/usr/bin/env python3
import json, re

EN_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json"
ET_PATH = "/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/et.json"

NEW_GUIDE_EN = {
  "title": "The Guide",
  "subtitle": "Technical mastery of mineral surfaces.",
  "description": "Basebeton is a ready-to-use cementitious coating with micronized quartz, polymers and pigments. It delivers a seamless finish for floors, walls and furniture — without extensive construction work.",
  "what_is": {
    "title": "What is microcement?",
    "paragraphs": [
      "Microcement — also called micro-concrete, micro-screed or micro-overlay — is a highly versatile polymer-modified cementitious coating that has been transforming interior and exterior design. Applied just 1–3mm thin, it bonds directly over existing tiles, concrete, wood and most rigid surfaces, creating a seamless and grout-free result.",
      "Basebeton by Stone Age is a premium ready-to-use microcement paste. Each product in the Basebeton range is pre-coloured, pre-mixed and factory-calibrated for consistent results. It is EC1 Plus certified — meaning very low volatile organic compound emissions, safe for every interior environment including bedrooms and schools.",
      "One of the key reasons for microcement's increasing popularity is its ability to deliver a sleek, minimalist and contemporary look to any space. With 366 colours and finishes across 11 product collections, Basebeton gives designers, architects and homeowners full creative freedom — from raw industrial concrete to refined metallic surfaces.",
      "Basebeton's thin application minimises the impact on existing structures during renovation. No demolition, no raised floor levels, no construction noise — microcement is applied directly over what is already there.",
      "Whether for renovation or new-build, Basebeton is the professional solution that elevates the aesthetic and functionality of any surface."
    ]
  },
  "applications": {
    "title": "Microcement applications",
    "items": [
      {
        "title": "Microcement Flooring",
        "desc": "Basebeton Originale, Plus, Xtreme, Solid and Grit are all engineered for floor use. Highly durable, compatible with underfloor heating, and available in dozens of colours. Suitable for residential, commercial and high-traffic industrial spaces."
      },
      {
        "title": "Microcement Bathrooms",
        "desc": "Basebeton creates seamless, fully waterproof bathroom surfaces with no grout lines. Applied directly over existing tiles — no demolition required. The zero-demolition bathroom is our most requested application."
      },
      {
        "title": "Microcement Worktops",
        "desc": "Basebeton Originale and Beton Ciré are ideal for kitchen worktops. Heat-resistant when sealed, food-safe, and available in 75–41 colours respectively. Provides a clean, seamless surface that is easy to maintain."
      },
      {
        "title": "Outdoor Microcement",
        "desc": "Selected Basebeton systems can be applied to patios, terraces and walkways. UV-stable, weather-resistant and slip-resistant finishes are available. Specify outdoor use at the consultation stage for the correct product selection."
      },
      {
        "title": "Microcement Walls",
        "desc": "Basebeton Originale, Stuccopuro, Sichtbeton, Natureplast and Oxidestuc all work for walls, each with a distinct character — from raw industrial to natural clay or metallic shimmer. Applied to create architectural continuity between floor and wall."
      },
      {
        "title": "Microcement Kitchens",
        "desc": "Seamless microcement surfaces work across kitchen countertops, backsplashes and floors. Basebeton is highly stain-resistant when properly sealed, and easy to clean with pH-neutral products. Custom colours ensure a perfect match to any kitchen design."
      },
      {
        "title": "Microcement Stairs",
        "desc": "Continuous microcement stair surfaces eliminate edge strips and transition profiles. Non-slip finishes are available. Applied over concrete, wood or metal stairs — bonds directly to any prepared substrate."
      },
      {
        "title": "Microcement Showers",
        "desc": "Basebeton Originale and Beton Ciré are both approved for shower enclosures and wet rooms. Fully waterproof when sealed, seamless, and available in a wide range of colours. Easy to clean — no grout lines where mould can accumulate."
      },
      {
        "title": "Microcement Furniture",
        "desc": "Basebeton can be applied to dressers, tables, sinks, bathtubs and custom objects. Weight increase is minimal. Creates a unique mineral surface that is durable, stain-resistant and unlike any painted or veneered finish."
      },
      {
        "title": "Microcement Pools",
        "desc": "Basebeton Grit and Basebeton Solid offer waterproof, durable surfaces for pool surrounds and wet zones. Applied directly over existing pool tiles. Custom colours are available to complement the water and surrounding architecture."
      }
    ]
  },
  "advantages_title": "Core Advantages",
  "advantages": {
    "versatility": {
      "title": "Versatility",
      "desc": "Apply to almost any surface — floors, walls, furniture, stairs and pools — including curved or uneven substrates."
    },
    "durability": {
      "title": "Durability",
      "desc": "High resistance to daily wear, impact, stains and scratches. EC1 Plus certified for long-term indoor air quality."
    },
    "customization": {
      "title": "366 Colours",
      "desc": "11 product-specific colour palettes totalling 366 curated shades. Custom RAL and NCS matching available."
    },
    "waterproof": {
      "title": "Waterproof",
      "desc": "Waterproof by nature when sealed — ideal for bathrooms, showers, pool surrounds and kitchen worktops."
    },
    "thickness": {
      "title": "Minimal Thickness",
      "desc": "1–3mm total application. No significant floor level change. No structural impact on the building."
    },
    "flexibility": {
      "title": "Ready-to-Use",
      "desc": "Pre-mixed, pre-coloured factory paste. No complex on-site mixing — opens and applies directly."
    },
    "eco": {
      "title": "EC1 Plus Certified",
      "desc": "All Basebeton products meet the strictest European health and environmental standards. Very low VOC emissions."
    },
    "maintenance": {
      "title": "Low Maintenance",
      "desc": "Clean with pH-neutral detergents. Re-seal every 3–5 years. No specialist products required."
    }
  },
  "process_title": "Technical Process",
  "process_steps": [
    {
      "title": "Surface Preparation",
      "desc": "The substrate must be clean, dry, load-bearing and level. Any cracks are filled and movement joints addressed. Diamond grinding opens the surface pores for optimal adhesion. This is the most critical step — it determines the longevity of the finish."
    },
    {
      "title": "Primer Application (MCG / Ecohecht)",
      "desc": "A specialist primer — MCG for absorbent surfaces, Ecohecht for non-absorbent — is applied in one or two thin coats. On absorbent substrates it is diluted 1:1 with water. Drying time approximately 1 hour per coat. Optional fibreglass mesh reinforcement for added crack resistance."
    },
    {
      "title": "Base Layer — Basebeton Basa",
      "desc": "The first microcement layer is applied with a stainless-steel plasterer's knife, spread evenly across the surface at approximately 1.5 kg/m². This layer builds structure and depth. Trowel marks at this stage create the topographic character of the finished surface."
    },
    {
      "title": "Finish Layer — Basebeton Sense",
      "desc": "The second and final layer is applied over the dried base. It determines the final colour, texture and smoothness. Applied thin (approx. 1.5 kg/m²) with precise, rhythmic trowel strokes. This layer responds to light and gives each installation its unique mineral character."
    },
    {
      "title": "Impregnation & Sealing",
      "desc": "A penetrating impregnator is applied first to stabilise the surface, followed by a polyurethane or water-based topcoat sealer. Available in matt, satin or gloss finish. Creates full waterproofing and long-term durability. Surface usable 24–48h after sealing."
    }
  ],
  "finishes_title": "Surface Finishes",
  "finishes_intro": "Basebeton products are available in three standard seal finishes. The choice of finish affects the final appearance, sheen level and maintenance requirements of the surface.",
  "finishes_list": [
    {
      "title": "Matt",
      "desc": "The most popular finish for luxury interiors. Flat, light-absorbing surface that emphasises texture and colour depth. Conceals minor marks. Ideal for walls, feature surfaces and residential floors."
    },
    {
      "title": "Satin",
      "desc": "A soft mid-sheen that adds warmth and subtle luminosity. Enhances colour richness without appearing glossy. The most versatile finish — suitable for floors, walls and worktops in both residential and commercial settings."
    },
    {
      "title": "Gloss",
      "desc": "High reflectivity that creates a bold, contemporary statement. Makes colours appear deeper and more saturated. Best suited for feature walls, reception areas and hospitality spaces where maximum visual impact is desired."
    }
  ]
}

NEW_GUIDE_ET = {
  "title": "Juhend",
  "subtitle": "Mineraalpindade tehniline meisterlikkus.",
  "description": "Basebeton on valmiskasutatav tsemendibaasil pasta mikroniseeritud kvartsi, polümeeride ja pigmentidega. See tagab saumvaba viimistluse põrandatele, seintele ja mööblile — ilma ulatusliku ehitustööta.",
  "what_is": {
    "title": "Mis on mikrotsement?",
    "paragraphs": [
      "Mikrotsement — tuntud ka kui mikrobetoon, mikrokrohv või mikrokate — on kõrgelt mitmekülgne polümeermodifitseeritud tsemendibaasil kate, mis on muutnud sise- ja välikujundust. Vaid 1–3mm õhuke, see kleepub otse olemasolevate plaatide, betooni, puidu ja enamiku jäikade pindade peale, luues saumvaba ja vuugivaba tulemuse.",
      "Basebeton by Stone Age on premium valmiskasutatav mikrotsemendipasta. Iga Basebetoni toode on eelvärvitud, eelmiksitud ja tehases kalibreeritud ühtlaste tulemuste tagamiseks. See on EC1 Plus sertifitseeritud — väga madal lenduvate orgaaniliste ühendite emissioon, ohutu kõigile siseruumidele, sealhulgas magamistubadele ja koolidele.",
      "Üks peamisi põhjuseid mikrotsemendi kasvavaks populaarsuseks on selle võime anda ruumile siledaid, minimalistlik ja kaasaegset välimust. 366 värviga 11 tootekollektsioonist annab Basebeton disaineritele, arhitektidele ja kodude omanikele täieliku loovusvabaduse — toorbetoonist tööstuslike kuni rafineeritud metallilisteni.",
      "Basebetoni õhuke pealekandmine minimeerib olemasolevate konstruktsioonide mõju renoveerimise ajal. Pole lammutamist, pole kõrgendatud põrandatasemeid, pole ehitusmüra — mikrotsement kantakse otse olemasoleva peale.",
      "Nii renoveerimiseks kui uusehituseks on Basebeton professionaalne lahendus, mis tõstab iga pinna esteetilisust ja funktsionaalsust."
    ]
  },
  "applications": {
    "title": "Mikrotsemendi rakendused",
    "items": [
      {
        "title": "Mikrotsemendipõrandad",
        "desc": "Basebeton Originale, Plus, Xtreme, Solid ja Grit on kõik mõeldud põrandakasutuseks. Väga vastupidav, ühilduv põrandaküttega ja saadaval kümnetes värvides. Sobib elamu-, äri- ja kõrge liiklusega tööstusruumidesse."
      },
      {
        "title": "Mikrotsemendivannitoad",
        "desc": "Basebeton loob vannitoasse saumvaba, täielikult veekindla pinna ilma vuugijoonteta. Kantakse otse olemasolevate plaatide peale — lammutamist pole vaja. Ilma lammutamiseta vannituba on meie enim nõutud rakendus."
      },
      {
        "title": "Mikrotsementtasapinnad",
        "desc": "Basebeton Originale ja Beton Ciré sobivad köögitasapindadele. Kuumakindel pitseerimisel, toiduohutus ning saadaval 75–41 värvis. Pakub puhta, saumvaba pinna, mida on lihtne hooldada."
      },
      {
        "title": "Välimikrotsement",
        "desc": "Valitud Basebetoni süsteeme saab kasutada terrassidel, patsidel ja jalgteedel. Saadaval UV-stabiilsed, ilmastikukindlad ja libisemisvastased viimistlused. Märkige väliskasutus konsultatsiooni etapis õige toote valiku jaoks."
      },
      {
        "title": "Mikrotsemendiseinad",
        "desc": "Basebeton Originale, Stuccopuro, Sichtbeton, Natureplast ja Oxidestuc sobivad kõik seintele, igaüks erineva iseloomuga — toorbetoonist kuni looduslikku savini või metallilise säranigu. Loob arhitektuurse järjepidevuse põranda ja seina vahel."
      },
      {
        "title": "Mikrotsemendiköögid",
        "desc": "Saumvabad mikrotsemendipinnad töötavad köögitasapindadel, tagalõikel ja põrandatel. Basebeton on täpitsustes korrektselt pitseeritud väga tahrastuskindel ja kergesti puhastatav pH-neutraalsete toodetega."
      },
      {
        "title": "Mikrotsementtrepid",
        "desc": "Pidevad mikrotsementtrepi pinnad kõrvaldavad servaribasid ja üleminekuprofiilid. Saadaval libisemisvastased viimistlused. Kantakse betooni, puidu või metall-treppide peale — kleepub otse ettevalmistatud alusele."
      },
      {
        "title": "Mikrotsementdušid",
        "desc": "Basebeton Originale ja Beton Ciré on heaks kiidetud duširuumides ja märgaladel kasutamiseks. Täielikult veekindel pitseerimisel, saumvaba ning saadaval laias värvivalikus. Kerge puhastada — vuugijooni, kus hallitus saaks koguneda, pole."
      },
      {
        "title": "Mikrotsemendimööbel",
        "desc": "Basebetoni saab kanda kapide, laudade, valamute, vannide ja kohandatud objektide peale. Kaaluiive on minimaalne. Loob ainulaadse mineraalpinna, mis on vastupidav, tahrastuskindel ning erineb täielikult ükskõik millisest värvitud või spoonitud viimistlusest."
      },
      {
        "title": "Mikrotsemendibasseinid",
        "desc": "Basebeton Grit ja Basebeton Solid pakuvad veekindlaid, vastupidavaid pindu basseiniümbrusele ja märgaladele. Kantakse otse olemasolevate basseiniplaatide peale. Kohandatud värvid on saadaval vee ja ümbritseva arhitektuuriga ühtimiseks."
      }
    ]
  },
  "advantages_title": "Põhieelised",
  "advantages": {
    "versatility": {
      "title": "Mitmekülgsus",
      "desc": "Kantav peaaegu igale pinnale — põrandad, seinad, mööbel, trepid ja basseinid, sealhulgas kõverad või ebaühtlased aluspinnad."
    },
    "durability": {
      "title": "Vastupidavus",
      "desc": "Kõrge vastupidavus igapäevasele kulumisele, löökidele, tahrastustele ja kriimustustele. EC1 Plus sertifitseeritud pikaajalise siseõhu kvaliteedi tagamiseks."
    },
    "customization": {
      "title": "366 värvi",
      "desc": "11 tootespetsiifilist värvipaketti kokku 366 kureeritud tooniga. Saadaval kohandatud RAL ja NCS sobitamine."
    },
    "waterproof": {
      "title": "Veekindel",
      "desc": "Pitseerimisel loomulikult veekindel — ideaalne vannitubadesse, duširuumidesse, basseiniümbrusele ja köögitasapindadele."
    },
    "thickness": {
      "title": "Minimaalne paksus",
      "desc": "1–3mm kogupealekanne. Põrandataseme oluline muutus puudub. Konstruktsiooniline mõju hoonele puudub."
    },
    "flexibility": {
      "title": "Valmis kasutamiseks",
      "desc": "Tehases eelmiksitud, eelvärvitud pasta. Kohapeal keerulist segamist pole — avage ja kandke otse peale."
    },
    "eco": {
      "title": "EC1 Plus sertifikaat",
      "desc": "Kõik Basebetoni tooted vastavad rangimatele Euroopa tervise- ja keskkonnastandarditele. Väga madal LOÜ emissioon."
    },
    "maintenance": {
      "title": "Lihtne hooldus",
      "desc": "Puhastage pH-neutraalsete pesuvahendite. Pitseeri uuesti iga 3–5 aasta tagant. Erialaseid tooteid pole vaja."
    }
  },
  "process_title": "Tehniline protsess",
  "process_steps": [
    {
      "title": "Pinnaeettevalmistus",
      "desc": "Aluspind peab olema puhas, kuiv, kandev ja tasane. Praod täidetakse ja liikumisõmblused adresseeritakse. Teemantlihvimine avab pinnaporid optimaalse adhesiooni tagamiseks. See on kõige kriitilisem samm — see määrab viimistluse pikaealisuse."
    },
    {
      "title": "Krunt (MCG / Ecohecht)",
      "desc": "Spetsialiseeritud krunt — MCG imavate pindade jaoks, Ecohecht mitteimavate jaoks — kantakse ühes või kahes õhukeses kihis. Imavatel alustel lahjendatakse 1:1 veega. Kuivamisaeg ligikaudu 1 tund kihi kohta. Valikuline klaaskiududega tugevdamine lisab pragusidekindlust."
    },
    {
      "title": "Basekiht — Basebeton Basa",
      "desc": "Esimene mikrotsemendikiht kantakse roostevaba teraskraabiga, laotades ühtlaselt üle pinna ligikaudu 1,5 kg/m². See kiht loob struktuuri ja sügavuse. Kraabijäljed loovad viimistletud pinna topograafilise iseloomu."
    },
    {
      "title": "Viimistluskiht — Basebeton Sense",
      "desc": "Teine ja viimane kiht kantakse kuiva baasinaasele. See määrab lõpliku värvi, tekstuuri ja sileduse. Kantakse õhukeselt (ligikaudu 1,5 kg/m²) täpsete rütmiliste kraabiliigutustega. See kiht reageerib valgusele ja annab igale paigaldusele ainulaadse mineraalse iseloomu."
    },
    {
      "title": "Impregneerimis- ja pitseerimine",
      "desc": "Esmalt kantakse pinna stabiliseerimiseks immutav impregneerija, millele järgneb polüuretaanist või veebaasil ülemiskate. Saadaval matt, satiin või läikiv viimistlus. Tagab täieliku veekindluse ja pikaajalise vastupidavuse. Pind on kasutatav 24–48h pärast pitseeri kuivamist."
    }
  ],
  "finishes_title": "Pinnaviimistlused",
  "finishes_intro": "Basebetoni tooted on saadaval kolmes standardsealvärvis. Viimistlusvalik mõjutab pinna lõplikku välimust, läike taset ja hoolduse nõudeid.",
  "finishes_list": [
    {
      "title": "Matt",
      "desc": "Luksusinterjööride populaarseim viimistlus. Tasane, valgust neelav pind, mis rõhutab tekstuuri ja värvusügavust. Varjab väiksemaid plekke. Ideaalne seintele, esindusliku pinna jaoks ja elamupõrandatele."
    },
    {
      "title": "Satiin",
      "desc": "Pehme keskmise läikega viimistlus, mis lisab soojust ja peent heledust. Rikastab värvikust, jättes mulje mittevärvilisest. Kõige mitmekülgsem viimistlus — sobib nii põrandatele, seintele kui tööpindadele nii elamus kui ärikeskkonnas."
    },
    {
      "title": "Läikiv",
      "desc": "Kõrge peegeldavus, mis loob julge ja kaasaegse avalduse. Muudab värvid sügavamaks ja küllasemaks. Parim esinduseintele, vastuvõtualadele ja külalislahkusruumidele, kus soovitakse maksimaalset visuaalset mõju."
    }
  ]
}

for path, new_guide, lang in [(EN_PATH, NEW_GUIDE_EN, "EN"), (ET_PATH, NEW_GUIDE_ET, "ET")]:
    with open(path) as f:
        d = json.load(f)
    d["guide_topcret"] = new_guide
    with open(path, "w") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
    print(f"Updated {lang}")

print("Done.")
