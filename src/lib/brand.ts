// Brand name is locale-dependent: Estonian uses the native "KUUS DISAIN",
// every other locale uses the international "KUUS DESIGN".
export const brandName = (lang: string): string =>
  lang === "et" ? "KUUS DISAIN" : "KUUS DESIGN";
