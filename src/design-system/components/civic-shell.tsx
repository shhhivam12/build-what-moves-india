"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { languageCatalogues } from "@/src/i18n/languages";
import { SignOutButton } from "@/src/features/auth/sign-out-button";
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
    <div className={styles.flagLine} aria-hidden="true"><i /><i /><i /></div>
    <aside className={styles.conceptBar} aria-label="Prototype status">
      <span><b>Hackathon redesign concept</b> · Demonstration data only · Not the live CPGRAMS service</span>
      <Link href="/help">Safety &amp; accessibility</Link>
    </aside>
    <header className={styles.header}>
      <div className={styles.govStrip}>
        <span>भारत सरकार</span><span>Government of India</span>
        <span className={styles.govDivider} />
        <span>कार्मिक, लोक शिकायत और पेंशन मंत्रालय</span>
      </div>
      <div className={styles.identityRow}>
        <Link className={styles.department} href="/" aria-label="CPGRAMS assured journey home">
          <Image alt="Department of Administrative Reforms and Public Grievances" height={244} priority src="/identity/cpgrams-official.png" width={737} />
        </Link>
        <Link className={styles.serviceBrand} href="/">
          <strong>CPGRAMS</strong>
          <span>Centralised Public Grievance<br className={styles.desktopBreak} /> Redress and Monitoring System</span>
        </Link>
        <button aria-expanded={menuOpen} aria-label="Toggle navigation" className={styles.menuButton} onClick={() => setMenuOpen((open) => !open)} type="button">
          <span /><span /><span />
        </button>
      </div>
      <nav aria-label="Primary navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}>
        <div className={styles.navLinks}>
          <Link className={pathname === "/" ? styles.active : ""} href="/">Home</Link>
          <Link className={pathname.startsWith("/grievances/new") ? styles.active : ""} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>Lodge grievance</Link>
          <Link className={pathname.startsWith("/track") ? styles.active : ""} href="/track">Track grievance</Link>
          {user ? <Link className={pathname.startsWith("/dashboard") ? styles.active : ""} href="/dashboard">My dashboard</Link> : null}
          <Link href="/help">Help</Link>
        </div>
        <div className={styles.navTools}>
          <label><span className="srOnly">Choose language</span><select aria-label="Choose language" onChange={(event) => { setLocale(event.target.value); window.localStorage.setItem("assured-locale", event.target.value); }} value={locale}>
            {languageCatalogues.map((language) => <option dir={language.direction} key={language.code} value={language.code}>{language.nativeName}</option>)}
          </select></label>
          {user ? <div className={styles.userMenu}><span className={styles.avatar} aria-hidden="true">{initials}</span><span><small>Signed in as</small><strong>{firstName}</strong></span><SignOutButton /></div> : <div className={styles.authLinks}><Link href="/signin">Sign in</Link><Link href="/signup">Create account</Link></div>}
        </div>
      </nav>
    </header>
    <div className={compact ? styles.compactContent : ""}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div><strong>CPGRAMS Assured Journey</strong><p>A citizen-first redesign concept for clearer routing, accountable progress and focused appeals.</p></div>
        <nav aria-label="Footer navigation"><Link href="/help">Accessibility</Link><Link href="/help#privacy">Privacy</Link><Link href="/help#limitations">Limitations</Link><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Official CPGRAMS ↗</a></nav>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.officialMarks} aria-label="Official ecosystem references">
          <Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} />
          <Image alt="India government portal" height={38} src="/identity/india-gov.jpg" width={98} />
          <Image alt="National Informatics Centre" height={39} src="/identity/nic.jpg" width={113} />
        </div>
        <p>Unofficial hackathon concept · No real grievance is submitted from this website.</p>
      </div>
    </footer>
  </div>;
}
