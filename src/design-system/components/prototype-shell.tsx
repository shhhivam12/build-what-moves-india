"use client";

import type { ReactNode } from "react";
import { getLanguageCatalogue, isLocaleCode, languageCatalogues, type LocaleCode } from "@/src/i18n/languages";
import styles from "./prototype-shell.module.css";

type PrototypeShellProps = {
  children: ReactNode;
  contentLocale: "en" | "hi";
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
};

const shellCopy = {
  en: {
    skip: "Skip to main content",
    notice: "Unofficial hackathon prototype · Synthetic demonstration data",
    noticeLabel: "Prototype status",
    service: "CPGRAMS",
    descriptor: "Public Grievance Redressal Portal",
    owner: "Build What Moves India · service redesign",
    language: "Language",
    translationPreview: "Translation preview",
    previewBody: "This catalogue is not yet human-reviewed. Essential journey translations will be added before submission.",
    updates: "Prototype updates",
    updateTitle: "Language access expanded",
    updateBody: "The demonstration target is 22 scheduled Indian languages plus English.",
    updateDate: "Updated 24 August 2026",
    help: "Help and accessibility",
    privacy: "Privacy",
    limitations: "Prototype limitations",
  },
  hi: {
    skip: "मुख्य सामग्री पर जाएँ",
    notice: "अनौपचारिक हैकाथॉन प्रोटोटाइप · कृत्रिम प्रदर्शन डेटा",
    noticeLabel: "प्रोटोटाइप की स्थिति",
    service: "सीपीग्राम्स सुनिश्चित यात्रा",
    descriptor: "लोक शिकायत की अधिक स्पष्ट यात्रा",
    owner: "बिल्ड व्हाट मूव्स इंडिया · सेवा पुनःडिज़ाइन",
    language: "भाषा",
    translationPreview: "अनुवाद पूर्वावलोकन",
    previewBody: "इस भाषा-सामग्री की मानव समीक्षा अभी बाकी है। जमा करने से पहले आवश्यक यात्रा के अनुवाद जोड़े जाएँगे।",
    updates: "प्रोटोटाइप अपडेट",
    updateTitle: "भाषा पहुँच का विस्तार",
    updateBody: "प्रदर्शन का लक्ष्य अंग्रेज़ी सहित 22 अनुसूचित भारतीय भाषाएँ हैं।",
    updateDate: "24 अगस्त 2026 को अपडेट किया गया",
    help: "सहायता और सुगम्यता",
    privacy: "गोपनीयता",
    limitations: "प्रोटोटाइप की सीमाएँ",
  },
} as const;

export function PrototypeShell({ children, contentLocale, locale, onLocaleChange }: PrototypeShellProps) {
  const copy = shellCopy[contentLocale];
  const selectedLanguage = getLanguageCatalogue(locale);

  return (
    <div className={styles.shell} dir={selectedLanguage.direction} lang={locale}>
      <a className={styles.skipLink} href="#main-content">
        {copy.skip}
      </a>

      <aside aria-label={copy.noticeLabel} className={styles.prototypeNotice}>{copy.notice}</aside>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.identity}>
            <span className={styles.identityMark} aria-hidden="true"><span /></span>
            <div>
              <p className={styles.owner}>{copy.owner}</p>
              <p className={styles.serviceName}>{copy.service}</p>
              <p className={styles.descriptor}>{copy.descriptor}</p>
            </div>
          </div>

          <label className={styles.languageField}>
            <span>{copy.language}</span>
            <select
              aria-describedby={selectedLanguage.provenance === "preview" ? "translation-preview" : undefined}
              onChange={(event) => {
                if (isLocaleCode(event.target.value)) {
                  onLocaleChange(event.target.value);
                }
              }}
              value={locale}
            >
              {languageCatalogues.map((language) => (
                <option dir={language.direction} key={language.code} lang={language.code} value={language.code}>
                  {language.nativeName} · {language.englishName}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedLanguage.provenance === "preview" ? (
          <p className={styles.translationPreview} id="translation-preview" role="status">
            <strong>{copy.translationPreview}:</strong> {copy.previewBody}
          </p>
        ) : null}
      </header>

      <section aria-labelledby="prototype-updates-heading" className={styles.publicUpdates}>
        <div className={styles.publicUpdatesInner}>
          <p className={styles.updatesLabel} id="prototype-updates-heading">{copy.updates}</p>
          <div>
            <strong>{copy.updateTitle}</strong>
            <p>{copy.updateBody}</p>
          </div>
          <time dateTime="2026-08-24">{copy.updateDate}</time>
        </div>
      </section>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <nav aria-label={contentLocale === "hi" ? "सहायता लिंक" : "Support links"}>
            <a href="#help">{copy.help}</a>
            <a href="#privacy">{copy.privacy}</a>
            <a href="#limitations">{copy.limitations}</a>
          </nav>
          <p>{copy.notice}</p>
        </div>
      </footer>
    </div>
  );
}
