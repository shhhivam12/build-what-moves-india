export const languageCatalogues = [
  { code: "en", englishName: "English", nativeName: "English", provenance: "reviewed", direction: "ltr" },
  { code: "as", englishName: "Assamese", nativeName: "অসমীয়া", provenance: "preview", direction: "ltr" },
  { code: "bn", englishName: "Bengali", nativeName: "বাংলা", provenance: "preview", direction: "ltr" },
  { code: "brx", englishName: "Bodo", nativeName: "बड़ो", provenance: "preview", direction: "ltr" },
  { code: "doi", englishName: "Dogri", nativeName: "डोगरी", provenance: "preview", direction: "ltr" },
  { code: "gu", englishName: "Gujarati", nativeName: "ગુજરાતી", provenance: "preview", direction: "ltr" },
  { code: "hi", englishName: "Hindi", nativeName: "हिन्दी", provenance: "reviewed", direction: "ltr" },
  { code: "kn", englishName: "Kannada", nativeName: "ಕನ್ನಡ", provenance: "preview", direction: "ltr" },
  { code: "ks", englishName: "Kashmiri", nativeName: "کٲشُر", provenance: "preview", direction: "rtl" },
  { code: "kok", englishName: "Konkani", nativeName: "कोंकणी", provenance: "preview", direction: "ltr" },
  { code: "mai", englishName: "Maithili", nativeName: "मैथिली", provenance: "preview", direction: "ltr" },
  { code: "ml", englishName: "Malayalam", nativeName: "മലയാളം", provenance: "preview", direction: "ltr" },
  { code: "mni", englishName: "Manipuri (Meitei)", nativeName: "মৈতৈলোন্", provenance: "preview", direction: "ltr" },
  { code: "mr", englishName: "Marathi", nativeName: "मराठी", provenance: "preview", direction: "ltr" },
  { code: "ne", englishName: "Nepali", nativeName: "नेपाली", provenance: "preview", direction: "ltr" },
  { code: "or", englishName: "Odia", nativeName: "ଓଡ଼ିଆ", provenance: "preview", direction: "ltr" },
  { code: "pa", englishName: "Punjabi", nativeName: "ਪੰਜਾਬੀ", provenance: "preview", direction: "ltr" },
  { code: "sa", englishName: "Sanskrit", nativeName: "संस्कृतम्", provenance: "preview", direction: "ltr" },
  { code: "sat", englishName: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", provenance: "preview", direction: "ltr" },
  { code: "sd", englishName: "Sindhi", nativeName: "سنڌي", provenance: "preview", direction: "rtl" },
  { code: "ta", englishName: "Tamil", nativeName: "தமிழ்", provenance: "preview", direction: "ltr" },
  { code: "te", englishName: "Telugu", nativeName: "తెలుగు", provenance: "preview", direction: "ltr" },
  { code: "ur", englishName: "Urdu", nativeName: "اردو", provenance: "preview", direction: "rtl" },
] as const;

export type LanguageCatalogue = (typeof languageCatalogues)[number];
export type LocaleCode = LanguageCatalogue["code"];
export type TranslationProvenance = LanguageCatalogue["provenance"];

export function isLocaleCode(value: string): value is LocaleCode {
  return languageCatalogues.some((catalogue) => catalogue.code === value);
}

export function getLanguageCatalogue(code: LocaleCode): LanguageCatalogue {
  const language = languageCatalogues.find((catalogue) => catalogue.code === code);

  if (!language) {
    throw new Error(`Unknown language catalogue: ${code}`);
  }

  return language;
}

export function getContentLocale(code: LocaleCode): "en" | "hi" {
  return code === "hi" ? "hi" : "en";
}
