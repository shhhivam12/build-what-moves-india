"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { SignOutButton } from "@/src/features/auth/sign-out-button";
import { languageCatalogues } from "@/src/i18n/languages";
import styles from "./civic-shell.module.css";

export type ShellUser = { name: string; email: string } | null;

export function CivicShell({ children, user = null, compact = false }: { children: ReactNode; user?: ShellUser; compact?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("assured-locale");
    const frame = window.requestAnimationFrame(() => {
      if (stored && languageCatalogues.some((language) => language.code === stored)) setLocale(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const firstName = user?.name.split(/\s+/)[0];
  const initials = user?.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return <div className={styles.shell}>
    <a className={styles.skipLink} href="#main-content">Skip to main content</a>
    <header className={styles.header}>
      <div className={styles.govStrip}>
        <div><span lang="hi">भारत सरकार</span><span>Government of India</span></div>
        <div className={styles.utilityLinks}><Link href="/help">Skip to main content</Link><Link href="/help#accessibility">Accessibility</Link><span>Text size A− A A+</span></div>
      </div>
      <div className={styles.identityRow}>
        <Link className={styles.department} href="/" aria-label="CPGRAMS home">
          <Image alt="Department of Administrative Reforms and Public Grievances" height={244} priority src="/identity/cpgrams-official.png" width={737} />
        </Link>
        <div className={styles.serviceBrand}>
          <strong>CPGRAMS</strong>
          <span lang="hi">केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली</span>
        </div>
        <button aria-expanded={menuOpen} aria-label="Toggle navigation" className={styles.menuButton} onClick={() => setMenuOpen((open) => !open)} type="button"><span /><span /><span /></button>
      </div>
      <nav aria-label="Primary navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}>
        <div className={styles.navLinks}>
          <Link className={pathname === "/" ? styles.active : ""} href="/">Home</Link>
          <Link className={pathname.startsWith("/grievances/new") ? styles.active : ""} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>Lodge grievance</Link>
          <Link className={pathname.startsWith("/track") ? styles.active : ""} href="/track">View status</Link>
          {user ? <Link className={pathname.startsWith("/dashboard") ? styles.active : ""} href="/dashboard">Dashboard</Link> : null}
          <Link className={pathname.startsWith("/help") ? styles.active : ""} href="/help">Help</Link>
        </div>
        <div className={styles.navTools}>
          <label><span className="srOnly">Choose language</span><select aria-label="Choose language" onChange={(event) => { setLocale(event.target.value); window.localStorage.setItem("assured-locale", event.target.value); }} value={locale}>{languageCatalogues.map((language) => <option dir={language.direction} key={language.code} value={language.code}>{language.nativeName}</option>)}</select></label>
          {user ? <div className={styles.userMenu}><span className={styles.avatar} aria-hidden="true">{initials}</span><span><small>Welcome</small><strong>{firstName}</strong></span><SignOutButton /></div> : <div className={styles.authLinks}><Link href="/signin">Sign in</Link><Link href="/signup">Register</Link></div>}
        </div>
      </nav>
    </header>
    <div className={compact ? styles.compactContent : ""}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div><strong>Centralised Public Grievance Redress and Monitoring System</strong><p>Department of Administrative Reforms and Public Grievances<br />Ministry of Personnel Public Grievances and Pensions</p></div>
        <nav aria-label="Footer navigation"><Link href="/help">Help</Link><Link href="/help#accessibility">Accessibility</Link><Link href="/help#privacy">Privacy</Link><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Official CPGRAMS</a></nav>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.officialMarks} aria-label="Government digital services"><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><Image alt="National Portal of India" height={38} src="/identity/india-gov.jpg" width={98} /><Image alt="National Informatics Centre" height={39} src="/identity/nic.jpg" width={113} /></div>
        <p>Demonstration environment for the Build What Moves India hackathon. No real grievance is submitted.</p>
      </div>
    </footer>
  </div>;
}
