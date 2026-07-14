import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  et: () => import("./dictionaries/et.json").then((module) => module.default),
  lv: () => import("./dictionaries/lv.json").then((module) => module.default),
  lt: () => import("./dictionaries/lt.json").then((module) => module.default),
  // Add other languages here
};

export const getDictionary = async (locale: string) => {
  // @ts-ignore
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};
