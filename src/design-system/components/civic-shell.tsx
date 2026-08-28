"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { SignOutButton } from "@/src/features/auth/sign-out-button";
import { CitizenChatbot } from "@/src/features/chatbot/citizen-chatbot";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { languageCatalogues, type LocaleCode } from "@/src/i18n/languages";
import styles from "./civic-shell.module.css";

export type ShellUser = { name: string; email: string } | null;

export function CitizenProfileIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 48 48">
    <circle cx="24" cy="19" r="7" />
    <path d="M11 39c1.7-7.2 6-10.8 13-10.8S35.3 31.8 37 39" />
    <path d="M8.5 24a15.5 15.5 0 1 1 31 0" />
    <path d="M7 33.5c2.2 4.2 5.4 7.4 9.6 9.5M41 33.5c-2.2 4.2-5.4 7.4-9.6 9.5" />
  </svg>;
}

const shellCopy = {
  en: {
    skip: "Skip to main content", portal: "Public Grievance Portal", textSize: "Text size", decrease: "Decrease text size", normal: "Default text size", increase: "Increase text size",
    home: "Home", lodge: "Lodge grievance", status: "View status", dashboard: "Dashboard", services: "Services", help: "Help", chooseLanguage: "Choose language",
    welcome: "Welcome", signIn: "Sign in", register: "Register", signOut: "Sign out", toggle: "Toggle navigation",
    system: "Centralised Public Grievance Redress and Monitoring System", department: "Department of Administrative Reforms and Public Grievances\nMinistry of Personnel Public Grievances and Pensions",
    accessibility: "Accessibility", privacy: "Privacy", official: "Official CPGRAMS", demo: "Demonstration environment for the Build What Moves India hackathon. No real grievance is submitted.",
  },
  hi: {
    skip: "मुख्य सामग्री पर जाएँ", portal: "जन शिकायत पोर्टल", textSize: "अक्षर आकार", decrease: "अक्षर आकार घटाएँ", normal: "सामान्य अक्षर आकार", increase: "अक्षर आकार बढ़ाएँ",
    home: "मुखपृष्ठ", lodge: "शिकायत दर्ज करें", status: "स्थिति देखें", dashboard: "डैशबोर्ड", services: "सेवाएँ", help: "सहायता", chooseLanguage: "भाषा चुनें",
    welcome: "स्वागत", signIn: "साइन इन", register: "पंजीकरण", signOut: "साइन आउट", toggle: "नेविगेशन खोलें",
    system: "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली", department: "प्रशासनिक सुधार और लोक शिकायत विभाग\nकार्मिक, लोक शिकायत और पेंशन मंत्रालय",
    accessibility: "सुगम्यता", privacy: "गोपनीयता", official: "आधिकारिक सीपीग्राम्स", demo: "बिल्ड व्हाट मूव्स इंडिया हैकाथॉन का प्रदर्शन परिवेश। कोई वास्तविक शिकायत जमा नहीं की जाती।",
  },
} as const;

export function CivicShell({ children, user = null, compact = false }: { children: ReactNode; user?: ShellUser; compact?: boolean }) {
  const pathname = usePathname();
  const { locale, contentLocale, setLocale } = useCivicLanguage();
  const copy = shellCopy[contentLocale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [textScale, setTextScale] = useState<"small" | "default" | "large">("default");
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    const storedTextScale = window.localStorage.getItem("assured-text-scale");
    const frame = window.requestAnimationFrame(() => {
      if (storedTextScale === "small" || storedTextScale === "default" || storedTextScale === "large") {
        setTextScale(storedTextScale);
        document.documentElement.style.fontSize = storedTextScale === "small" ? "93.75%" : storedTextScale === "large" ? "112.5%" : "100%";
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const finish = window.setTimeout(() => setNavigating(false), 320);
    return () => window.clearTimeout(finish);
  }, [pathname]);

  useEffect(() => {
    const beginNavigation = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
      setMenuOpen(false);
      setNavigating(true);
    };
    document.addEventListener("click", beginNavigation);
    return () => document.removeEventListener("click", beginNavigation);
  }, []);

  const firstName = user?.name.split(/\s+/)[0];
  const changeTextScale = (scale: "small" | "default" | "large") => {
    setTextScale(scale);
    window.localStorage.setItem("assured-text-scale", scale);
    document.documentElement.style.fontSize = scale === "small" ? "93.75%" : scale === "large" ? "112.5%" : "100%";
  };

  return <div className={styles.shell}>
    <a className={styles.skipLink} href="#main-content">{copy.skip}</a>
    <div aria-hidden="true" className={`${styles.routeProgress} ${navigating ? styles.routeProgressActive : ""}`}><span /></div>
    <header className={styles.header}>
      <div className={styles.govStrip}>
        <div><span lang="hi">भारत सरकार</span><span>Government of India</span></div>
        <div className={styles.portalMeta}><span>{copy.portal}</span><div aria-label={copy.textSize} className={styles.textControls} role="group"><span>{copy.textSize}</span><button aria-label={copy.decrease} aria-pressed={textScale === "small"} onClick={() => changeTextScale("small")} type="button">A−</button><button aria-label={copy.normal} aria-pressed={textScale === "default"} onClick={() => changeTextScale("default")} type="button">A</button><button aria-label={copy.increase} aria-pressed={textScale === "large"} onClick={() => changeTextScale("large")} type="button">A+</button></div></div>
      </div>
      <div className={styles.identityRow}>
        <Link className={styles.department} href={user ? "/dashboard" : "/"} aria-label="CPGRAMS home">
          <Image alt="Department of Administrative Reforms and Public Grievances" height={244} priority src="/identity/cpgrams-official.png" width={737} />
        </Link>
        <button aria-expanded={menuOpen} aria-label={copy.toggle} className={styles.menuButton} onClick={() => setMenuOpen((open) => !open)} type="button"><span /><span /><span /></button>
        <nav aria-label="Primary navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}>
          <div className={styles.navLinks}>
            {user ? <Link className={pathname.startsWith("/dashboard") ? styles.active : ""} href="/dashboard">{copy.dashboard}</Link> : <Link className={pathname === "/" ? styles.active : ""} href="/">{copy.home}</Link>}
            <Link className={pathname.startsWith("/grievances/new") ? styles.active : ""} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>{copy.lodge}</Link>
            <Link className={pathname.startsWith("/track") ? styles.active : ""} href="/track">{copy.status}</Link>
            <Link className={pathname.startsWith("/services") ? styles.active : ""} href="/services">{copy.services}</Link>
            <Link className={pathname.startsWith("/help") ? styles.active : ""} href="/help">{copy.help}</Link>
          </div>
          <div className={styles.navTools}>
            <label data-tour="language"><span className="srOnly">{copy.chooseLanguage}</span><select aria-label={copy.chooseLanguage} onChange={(event) => setLocale(event.target.value as LocaleCode)} value={locale}>{languageCatalogues.map((language) => <option disabled={language.code !== "en" && language.code !== "hi"} dir={language.direction} key={language.code} value={language.code}>{language.nativeName}{language.code !== "en" && language.code !== "hi" ? " — coming soon" : ""}</option>)}</select></label>
            {user ? <div className={styles.userMenu} data-tour="profile"><span className={styles.avatar}><CitizenProfileIcon /></span><span><small>{copy.welcome}</small><strong>{firstName}</strong></span><SignOutButton label={copy.signOut} /></div> : <div className={styles.authLinks}><Link href="/signin">{copy.signIn}</Link><Link href="/signup">{copy.register}</Link></div>}
          </div>
        </nav>
      </div>
    </header>
    <div className={`${compact ? styles.compactContent : ""} ${styles.pageReveal}`} key={pathname}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div><strong>{copy.system}</strong><p>{copy.department.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p></div>
        <nav aria-label="Footer navigation"><Link href="/services">{copy.services}</Link><Link href="/help">{copy.help}</Link><Link href="/help#accessibility">{copy.accessibility}</Link><Link href="/help#privacy">{copy.privacy}</Link><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">{copy.official}</a></nav>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.officialMarks} aria-label="Government digital services"><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><Image alt="National Portal of India" height={38} src="/identity/india-gov.jpg" width={98} /><Image alt="National Informatics Centre" height={39} src="/identity/nic.jpg" width={113} /></div>
        <p>{copy.demo}</p>
      </div>
    </footer>
    <CitizenChatbot user={user} />
  </div>;
}
