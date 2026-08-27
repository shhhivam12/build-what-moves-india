"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getContentLocale, getLanguageCatalogue, isLocaleCode, type LocaleCode } from "./languages";

type CivicLanguageValue = {
  locale: LocaleCode;
  contentLocale: "en" | "hi";
  setLocale: (locale: LocaleCode) => void;
};

const CivicLanguageContext = createContext<CivicLanguageValue | null>(null);

export function CivicLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("assured-locale");
    const frame = window.requestAnimationFrame(() => {
      if (stored && isLocaleCode(stored)) setLocaleState(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const language = getLanguageCatalogue(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = language.direction;
  }, [locale]);

  const value = useMemo<CivicLanguageValue>(() => ({
    locale,
    contentLocale: getContentLocale(locale),
    setLocale: (nextLocale) => {
      setLocaleState(nextLocale);
      window.localStorage.setItem("assured-locale", nextLocale);
    },
  }), [locale]);

  return <CivicLanguageContext.Provider value={value}>{children}</CivicLanguageContext.Provider>;
}

export function useCivicLanguage() {
  const context = useContext(CivicLanguageContext);
  if (!context) throw new Error("useCivicLanguage must be used inside CivicLanguageProvider");
  return context;
}
