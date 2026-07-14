import { Finish, ColorCollection } from "./types";

// Real Luxury Concrete® colours. The COLORCRETE, TRUE METAL, OXID METAL and
// GEMSTONE values are pixel-sampled from Luxury Concrete's own official
// colour-card imagery (high-resolution swatch photography). GLOWING and
// CONCRETE POX are sampled from the live product-swatch photography on
// luxuryconcrete.eu. Hex values are indicative — order a physical sample for
// exact colour matching before specifying.

const COLORCRETE: Finish[] = [
  { id: "colorcrete-blanco", name: "Blanco", collection: "colorcrete", rgb: [239, 237, 233], hex: "#EFEDE9", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-blanco-roto", name: "Blanco Roto", collection: "colorcrete", rgb: [235, 228, 213], hex: "#EBE4D5", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-bone", name: "Bone", collection: "colorcrete", rgb: [219, 206, 186], hex: "#DBCEBA", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-shale-grey", name: "Shale Grey", collection: "colorcrete", rgb: [128, 123, 113], hex: "#807B71", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-spike", name: "Spike", collection: "colorcrete", rgb: [191, 179, 163], hex: "#BFB3A3", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-liquen", name: "Liquen", collection: "colorcrete", rgb: [203, 197, 175], hex: "#CBC5AF", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-mojave", name: "Mojave", collection: "colorcrete", rgb: [213, 183, 140], hex: "#D5B78C", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-porcelain", name: "Porcelain", collection: "colorcrete", rgb: [223, 215, 190], hex: "#DFD7BE", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-universe", name: "Universe", collection: "colorcrete", rgb: [194, 190, 183], hex: "#C2BEB7", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-moss", name: "Moss", collection: "colorcrete", rgb: [212, 216, 203], hex: "#D4D8CB", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-breeze", name: "Breeze", collection: "colorcrete", rgb: [174, 191, 196], hex: "#AEBFC4", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-india", name: "India", collection: "colorcrete", rgb: [229, 207, 168], hex: "#E5CFA8", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-blush", name: "Blush", collection: "colorcrete", rgb: [222, 209, 201], hex: "#DED1C9", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-coral", name: "Coral", collection: "colorcrete", rgb: [231, 183, 165], hex: "#E7B7A5", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-papyrus", name: "Papyrus", collection: "colorcrete", rgb: [186, 174, 158], hex: "#BAAE9E", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-champagne", name: "Champagne", collection: "colorcrete", rgb: [227, 208, 178], hex: "#E3D0B2", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-wasabi", name: "Wasabi", collection: "colorcrete", rgb: [208, 196, 150], hex: "#D0C496", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-khaki", name: "Khaki", collection: "colorcrete", rgb: [181, 176, 143], hex: "#B5B08F", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-salmon", name: "Salmón", collection: "colorcrete", rgb: [234, 190, 149], hex: "#EABE95", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-cafe", name: "Café", collection: "colorcrete", rgb: [203, 176, 143], hex: "#CBB08F", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-cemento", name: "Cemento", collection: "colorcrete", rgb: [197, 192, 175], hex: "#C5C0AF", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-pearl-grey", name: "Pearl Grey", collection: "colorcrete", rgb: [202, 194, 176], hex: "#CAC2B0", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-himalaya", name: "Himalaya", collection: "colorcrete", rgb: [112, 106, 95], hex: "#706A5F", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-jade", name: "Jade", collection: "colorcrete", rgb: [147, 184, 194], hex: "#93B8C2", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-pink", name: "Pink", collection: "colorcrete", rgb: [223, 197, 191], hex: "#DFC5BF", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-eucalyptus", name: "Eucalyptus", collection: "colorcrete", rgb: [181, 196, 181], hex: "#B5C4B5", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-clay", name: "Clay", collection: "colorcrete", rgb: [205, 184, 162], hex: "#CDB8A2", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-ginger", name: "Ginger", collection: "colorcrete", rgb: [228, 191, 119], hex: "#E4BF77", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-sahara", name: "Sáhara", collection: "colorcrete", rgb: [225, 210, 182], hex: "#E1D2B6", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-calabaza", name: "Calabaza", collection: "colorcrete", rgb: [189, 112, 57], hex: "#BD7039", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-cobre", name: "Cobre", collection: "colorcrete", rgb: [124, 89, 75], hex: "#7C594B", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-raffia", name: "Raffia", collection: "colorcrete", rgb: [187, 169, 144], hex: "#BBA990", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-cairo", name: "Cairo", collection: "colorcrete", rgb: [202, 185, 158], hex: "#CAB99E", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-sand", name: "Sand", collection: "colorcrete", rgb: [179, 164, 136], hex: "#B3A488", description: "Luxury Concrete · Colorcrete", popular: false },
  { id: "colorcrete-marron", name: "Marrón", collection: "colorcrete", rgb: [139, 116, 99], hex: "#8B7463", description: "Luxury Concrete · Colorcrete", popular: true },
  { id: "colorcrete-pizarra", name: "Pizarra", collection: "colorcrete", rgb: [110, 105, 100], hex: "#6E6964", description: "Luxury Concrete · Colorcrete", popular: false },
];

const TRUE_METAL: Finish[] = [
  { id: "true-metal-copper", name: "True Metal Copper", collection: "true-metal", rgb: [147, 100, 79], hex: "#93644F", description: "Luxury Concrete · True Metal", popular: true },
  { id: "true-metal-copper-oxidant", name: "True Metal Copper + Oxidant", collection: "true-metal", rgb: [135, 133, 134], hex: "#878586", description: "Luxury Concrete · True Metal", popular: false },
  { id: "true-metal-bronze", name: "True Metal Bronze", collection: "true-metal", rgb: [120, 99, 87], hex: "#786357", description: "Luxury Concrete · True Metal", popular: false },
  { id: "true-metal-bronze-oxidant", name: "True Metal Bronze + Oxidant", collection: "true-metal", rgb: [131, 130, 125], hex: "#83827D", description: "Luxury Concrete · True Metal", popular: false },
  { id: "true-metal-brass", name: "True Metal Brass", collection: "true-metal", rgb: [179, 160, 104], hex: "#B3A068", description: "Luxury Concrete · True Metal", popular: true },
  { id: "true-metal-brass-oxidant", name: "True Metal Brass + Oxidant", collection: "true-metal", rgb: [139, 150, 153], hex: "#8B9699", description: "Luxury Concrete · True Metal", popular: false },
  { id: "true-metal-iridium", name: "True Metal Iridium", collection: "true-metal", rgb: [70, 67, 68], hex: "#464344", description: "Luxury Concrete · True Metal", popular: false },
  { id: "true-metal-iridium-oxidant", name: "True Metal Iridium + Oxidant", collection: "true-metal", rgb: [111, 77, 68], hex: "#6F4D44", description: "Luxury Concrete · True Metal", popular: false },
];

const OXID_METAL: Finish[] = [
  { id: "oxid-metal-copper", name: "Oxid Metal Copper", collection: "oxid-metal", rgb: [84, 67, 62], hex: "#54433E", description: "Luxury Concrete · Oxid Metal", popular: true },
  { id: "oxid-metal-copper-oxidant", name: "Oxid Metal Copper + Oxidant", collection: "oxid-metal", rgb: [69, 78, 79], hex: "#454E4F", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-bronze", name: "Oxid Metal Bronze", collection: "oxid-metal", rgb: [100, 86, 74], hex: "#64564A", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-bronze-oxidant", name: "Oxid Metal Bronze + Oxidant", collection: "oxid-metal", rgb: [111, 128, 122], hex: "#6F807A", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-light-iron", name: "Oxid Metal Light Iron", collection: "oxid-metal", rgb: [66, 64, 64], hex: "#424040", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-light-iron-oxidant", name: "Oxid Metal Light Iron + Oxidant", collection: "oxid-metal", rgb: [95, 76, 63], hex: "#5F4C3F", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-heavy-iron", name: "Oxid Metal Heavy Iron", collection: "oxid-metal", rgb: [75, 74, 75], hex: "#4B4A4B", description: "Luxury Concrete · Oxid Metal", popular: true },
  { id: "oxid-metal-heavy-iron-oxidant", name: "Oxid Metal Heavy Iron + Oxidant", collection: "oxid-metal", rgb: [98, 88, 83], hex: "#625853", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-brass", name: "Oxid Metal Brass", collection: "oxid-metal", rgb: [91, 87, 60], hex: "#5B573C", description: "Luxury Concrete · Oxid Metal", popular: false },
  { id: "oxid-metal-brass-oxidant", name: "Oxid Metal Brass + Oxidant", collection: "oxid-metal", rgb: [95, 104, 94], hex: "#5F685E", description: "Luxury Concrete · Oxid Metal", popular: false },
];

const GEMSTONE: Finish[] = [
  { id: "gemstone-diamond", name: "Diamond", collection: "gemstone", rgb: [180, 184, 172], hex: "#B4B8AC", description: "Luxury Concrete · Gemstone", popular: true },
  { id: "gemstone-amber", name: "Amber", collection: "gemstone", rgb: [185, 159, 87], hex: "#B99F57", description: "Luxury Concrete · Gemstone", popular: false },
  { id: "gemstone-carnelian", name: "Carnelian", collection: "gemstone", rgb: [183, 143, 99], hex: "#B78F63", description: "Luxury Concrete · Gemstone", popular: false },
  { id: "gemstone-ruby", name: "Ruby", collection: "gemstone", rgb: [178, 117, 86], hex: "#B27556", description: "Luxury Concrete · Gemstone", popular: false },
  { id: "gemstone-platinum", name: "Platinum", collection: "gemstone", rgb: [112, 121, 139], hex: "#70798B", description: "Luxury Concrete · Gemstone", popular: false },
];

const GLOWING: Finish[] = [
  { id: "glowing-mars", name: "Mars", collection: "glowing", rgb: [206, 168, 132], hex: "#CEA884", description: "Luxury Concrete · Glowing", popular: true },
  { id: "glowing-star", name: "Star", collection: "glowing", rgb: [187, 194, 187], hex: "#BBC2BB", description: "Luxury Concrete · Glowing", popular: false },
  { id: "glowing-sun", name: "Sun", collection: "glowing", rgb: [120, 90, 53], hex: "#785A35", description: "Luxury Concrete · Glowing", popular: false },
  { id: "glowing-uranus", name: "Uranus", collection: "glowing", rgb: [94, 94, 96], hex: "#5E5E60", description: "Luxury Concrete · Glowing", popular: false },
];

const CONCRETE_POX: Finish[] = [
  { id: "concrete-pox-brown-sugar", name: "Brown Sugar", collection: "concrete-pox", rgb: [115, 99, 87], hex: "#736357", description: "Luxury Concrete · Concrete Pox", popular: true },
  { id: "concrete-pox-canella", name: "Canella", collection: "concrete-pox", rgb: [104, 85, 80], hex: "#685550", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-cedar", name: "Cedar", collection: "concrete-pox", rgb: [92, 79, 74], hex: "#5C4F4A", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-clay", name: "Clay", collection: "concrete-pox", rgb: [162, 153, 140], hex: "#A2998C", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-elephant", name: "Elephant", collection: "concrete-pox", rgb: [158, 151, 147], hex: "#9E9793", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-fossil", name: "Fossil", collection: "concrete-pox", rgb: [84, 82, 81], hex: "#545251", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-graphite", name: "Graphite", collection: "concrete-pox", rgb: [83, 71, 71], hex: "#534747", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-grey-stone", name: "Grey Stone", collection: "concrete-pox", rgb: [108, 102, 93], hex: "#6C665D", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-ink-black", name: "Ink Black", collection: "concrete-pox", rgb: [67, 63, 64], hex: "#433F40", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-midnight-black", name: "Midnight Black", collection: "concrete-pox", rgb: [72, 66, 66], hex: "#484242", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-mink", name: "Mink", collection: "concrete-pox", rgb: [108, 94, 88], hex: "#6C5E58", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-peanut", name: "Peanut", collection: "concrete-pox", rgb: [164, 138, 114], hex: "#A48A72", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-pecan-nut", name: "Pecan Nut", collection: "concrete-pox", rgb: [140, 124, 107], hex: "#8C7C6B", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-sand", name: "Sand", collection: "concrete-pox", rgb: [183, 176, 158], hex: "#B7B09E", description: "Luxury Concrete · Concrete Pox", popular: false },
  { id: "concrete-pox-silver-coin", name: "Silver Coin", collection: "concrete-pox", rgb: [121, 116, 116], hex: "#797474", description: "Luxury Concrete · Concrete Pox", popular: false },
];

// Limecrete has a 34-colour chart per luxuryconcrete.eu, but individual colour
// names/swatches are not itemised on the public colours page — pending the
// official colour chart from Luxury Concrete before this collection can ship.
const LIMECRETE: Finish[] = [];

export const COLLECTIONS: ColorCollection[] = [
  { id: "colorcrete", name: "Colorcrete", tagline: "36 curated tones — the core Luxury Concrete palette for Concrete, Monocrete and Easycret systems.", colors: COLORCRETE },
  { id: "true-metal", name: "True Metal", tagline: "8 high-metal-content finishes in copper, bronze, brass and iridium, with oxidised variants.", colors: TRUE_METAL },
  { id: "oxid-metal", name: "Oxid Metal", tagline: "10 water-reactive metallic finishes that oxidise for an authentic aged look.", colors: OXID_METAL },
  { id: "gemstone", name: "Gemstone", tagline: "5 metallic finishes inspired by precious stones and minerals.", colors: GEMSTONE },
  { id: "glowing", name: "Glowing", tagline: "4 luminous metallic finishes with a play of light and reflection.", colors: GLOWING },
  { id: "concrete-pox", name: "Concrete Pox", tagline: "15 colours for the epoxy microcement system.", colors: CONCRETE_POX },
  { id: "limecrete", name: "Limecrete", tagline: "34 colours for the lime-based tadelakt system — chart pending.", colors: LIMECRETE },
];

// Flat list for components that don't need collection grouping
// (FinishPicker, MicrocementPreview visualizer).
export const FINISHES: Finish[] = COLLECTIONS.flatMap((c) => c.colors);
