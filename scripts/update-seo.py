#!/usr/bin/env python3
"""Update SEO metadata in en.json and et.json based on competitor keyword analysis."""
import json

SEO_EN = {
  "global": {
    "title": "KUUS DESIGN | Premium Basebeton Microcement – Tartu, Estonia",
    "description": "Premium Basebeton microcement surfaces for luxury interiors. Seamless floors, waterproof bathrooms, decorative walls. Zero-demolition renovation. Tartu & Estonia.",
    "keywords": "microcement, basebeton, microcement estonia, microcement tartu, microcement installation, microcement bathroom, microcement floor, seamless floor, waterproof wall, decorative wall, zero demolition renovation, mineral surface, basebeton originale, premium microcement"
  },
  "pages": {
    "home": {
      "title": "KUUS DESIGN | Basebeton Microcement – Seamless Surfaces Estonia",
      "description": "Transform your space with monolithic Basebeton microcement. Seamless, waterproof, zero-demolition surfaces for floors, walls and bathrooms. Premium studio in Tartu, Estonia."
    },
    "products": {
      "title": "Basebeton Products | 11 Microcement Systems – KUUS DESIGN",
      "description": "Basebeton Originale, Beton Ciré, Oxidestuc, Natureplast, Sichtbeton and more. 11 professional ready-to-use microcement systems. EC1 Plus certified. 366 colours."
    },
    "projects": {
      "title": "Microcement Projects Portfolio | KUUS DESIGN",
      "description": "Browse completed Basebeton microcement projects — floors, bathrooms, walls and furniture across Estonia. Residential and commercial case studies."
    },
    "blog": {
      "title": "Microcement Journal | Design & Installation Insights – KUUS DESIGN",
      "description": "Expert insights into Basebeton microcement, mineral surfaces, installation techniques and interior design trends."
    },
    "colors": {
      "title": "Microcement Colour Collections | 366 Colours – KUUS DESIGN",
      "description": "366 Basebeton microcement colours across 11 product palettes. Specify by code for exact factory colour matching. Basebeton Originale, Beton Ciré, Stuccopuro and more."
    },
    "story": {
      "title": "Our Story | KUUS DESIGN Microcement Studio Tartu",
      "description": "KUUS DESIGN is a premium microcement studio based in Tartu, Estonia. We work with Basebeton by Stone Age — EC1 Plus certified, professional-grade microcement systems."
    },
    "contact": {
      "title": "Contact | KUUS DESIGN Microcement Studio – Tartu",
      "description": "Contact KUUS DESIGN for microcement consultations, project quotes and Basebeton product enquiries. Studio in Tartu, Estonia. studio@kuusdesign.ee"
    },
    "events": {
      "title": "Microcement Training Workshops | KUUS DESIGN Tartu",
      "description": "Professional Basebeton microcement installation training in Tartu. 2-day and 3-day programmes. Internationally recognised installer certificate."
    },
    "faq": {
      "title": "Microcement FAQ | Common Questions – KUUS DESIGN",
      "description": "Answers to the most common questions about Basebeton microcement: installation, maintenance, waterproofing, colours, costs and substrate compatibility."
    },
    "guide": {
      "title": "Basebeton Microcement Guide | Installation & Applications – KUUS DESIGN",
      "description": "Complete guide to Basebeton microcement: what it is, where it can be applied, the technical installation process and surface finishes."
    }
  }
}

SEO_ET = {
  "global": {
    "title": "KUUS DESIGN | Premium Basebeton Mikrotsement – Tartu, Eesti",
    "description": "Premium Basebeton mikrotsemendi pinnad luksusinterjööridele. Vuugivabad põrandad, veekindlad vannitoad, dekoratiivseinad. Ilma lammutamiseta renoveerimine. Tartu ja Eesti.",
    "keywords": "mikrotsement, basebeton, mikrotsement Eesti, mikrotsement Tartu, mikrotsemendi paigaldus, mikrotsemendi vannituba, mikrotsemendi põrand, vuugivaba põrand, veekindel sein, dekoratiivsein, ilma lammutamiseta renoveerimine, mineraalviimistlus, basebeton originale, premium mikrotsement"
  },
  "pages": {
    "home": {
      "title": "KUUS DESIGN | Basebeton Mikrotsement – Vuugivabad Pinnad Eestis",
      "description": "Muuda oma ruum monoliitse Basebeton mikrotsemendiga. Vuugivabad, veekindlad, lammutamisvabad pinnad põrandatele, seintele ja vannitubadesse. Premium stuudio Tartus."
    },
    "products": {
      "title": "Basebetoni Tooted | 11 Mikrotsemendi Süsteemi – KUUS DESIGN",
      "description": "Basebeton Originale, Beton Ciré, Oxidestuc, Natureplast, Sichtbeton jt. 11 professionaalset valmiskasutatavat mikrotsemendisüsteemi. EC1 Plus sertifitseeritud. 366 värvi."
    },
    "projects": {
      "title": "Mikrotsemendi Projektide Portfoolio | KUUS DESIGN",
      "description": "Sirvi lõpetatud Basebeton mikrotsemendiprojekte — põrandad, vannitoad, seinad ja mööbel üle Eesti. Elamu- ja äriruumide näited."
    },
    "blog": {
      "title": "Mikrotsemendi Ajakiri | Kujundus ja Paigaldus – KUUS DESIGN",
      "description": "Ekspertartiklid Basebeton mikrotsemendi, mineraalpindade, paigaldustehnikate ja interjööritrendide kohta."
    },
    "colors": {
      "title": "Mikrotsemendi Värvikogumid | 366 Värvi – KUUS DESIGN",
      "description": "366 Basebetoni mikrotsemendivärvi 11 tootepakettis. Täpseks tehasesobitamiseks kasuta värvikoodi. Basebeton Originale, Beton Ciré, Stuccopuro jt."
    },
    "story": {
      "title": "Meie Lugu | KUUS DESIGN Mikrotsemendi Stuudio Tartus",
      "description": "KUUS DESIGN on premium mikrotsemendi stuudio Tartus, Eestis. Töötame Basebeton by Stone Age toodetega — EC1 Plus sertifitseeritud professionaalne mikrotsement."
    },
    "contact": {
      "title": "Kontakt | KUUS DESIGN Mikrotsemendi Stuudio – Tartu",
      "description": "Võta ühendust KUUS DESIGNiga mikrotsemendi konsultatsioonide, projektipakkumiste ja Basebetoni toodete päringute jaoks. Stuudio Tartus. studio@kuusdesign.ee"
    },
    "events": {
      "title": "Mikrotsemendi Koolitusel | KUUS DESIGN Tartu",
      "description": "Professionaalne Basebeton mikrotsemendi paigalduskoolitus Tartus. 2-päevased ja 3-päevased programmid. Rahvusvaheliselt tunnustatud paigaldajasertifikaat."
    },
    "faq": {
      "title": "Mikrotsemendi KKK | Sagedased Küsimused – KUUS DESIGN",
      "description": "Vastused kõige sagedasematele küsimustele Basebeton mikrotsemendi kohta: paigaldus, hooldus, veekindlus, värvid ja aluspind."
    },
    "guide": {
      "title": "Basebetoni Mikrotsemendi Juhend | Paigaldus ja Rakendused – KUUS DESIGN",
      "description": "Täielik juhend Basebeton mikrotsemendi kohta: mis see on, kuhu saab paigaldada, tehniline protsess ja pinnaviimistlused."
    }
  }
}

for path, seo, lang in [
    ("/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/en.json", SEO_EN, "EN"),
    ("/Users/janarkuusk/Microcement. web/src/i18n/dictionaries/et.json", SEO_ET, "ET"),
]:
    with open(path) as f:
        d = json.load(f)
    d["seo"] = seo
    with open(path, "w") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
    print(f"Updated {lang}")
print("Done.")
