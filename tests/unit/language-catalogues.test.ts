import { getContentLocale, getLanguageCatalogue, isLocaleCode, languageCatalogues } from "@/src/i18n/languages";

describe("languageCatalogues", () => {
  it("contains English plus the 22 scheduled Indian languages with unique codes", () => {
    expect(languageCatalogues).toHaveLength(23);
    expect(new Set(languageCatalogues.map(({ code }) => code))).toHaveProperty("size", 23);
    expect(languageCatalogues[0]).toMatchObject({ code: "en", provenance: "reviewed" });
    expect(languageCatalogues.filter(({ code }) => code !== "en")).toHaveLength(22);
  });

  it("declares reviewed, preview, and right-to-left behaviour explicitly", () => {
    expect(getLanguageCatalogue("hi").provenance).toBe("reviewed");
    expect(getLanguageCatalogue("ur")).toMatchObject({ provenance: "preview", direction: "rtl" });
    expect(getLanguageCatalogue("sd").direction).toBe("rtl");
    expect(getContentLocale("bn")).toBe("en");
    expect(isLocaleCode("ur")).toBe(true);
    expect(isLocaleCode("unknown")).toBe(false);
  });
});
