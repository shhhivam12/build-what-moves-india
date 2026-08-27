"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { CitizenOnboardingGuide } from "./citizen-onboarding-guide";
import styles from "./dashboard-experience.module.css";

export type DashboardRecord = {
  reference: string;
  title: string;
  department: string;
  status: string;
  isSample: boolean;
  submittedAt: string;
  updatedAt: string;
};

type StatusFilter = "all" | "in-progress" | "resolved" | "appeal";
type SortOrder = "updated-desc" | "updated-asc" | "submitted-desc" | "title";

const dashboardCopy = {
  en: {
    eyebrow: "Citizen dashboard", greeting: "Namaste", intro: "Search grievances, review action taken and continue eligible appeals from one place.", lodge: "Lodge public grievance",
    services: "Citizen services", nav: ["Grievance dashboard", "Appeal dashboard", "Lodge public grievance", "Pension grievance", "Account activity", "Account and session"],
    needHelp: "Need assistance?", helpBody: "Read the process, eligibility rules and official contact routes.", directory: "Open service directory",
    summary: ["Total grievances", "In progress", "Decisions issued", "Appeals active"], records: "Your records", register: "Grievance register", registerBody: "Every reference issued to this account appears here.", find: "Find by registration number",
    filters: ["All", "In progress", "Decisions", "Appeals"], search: "Search records", placeholder: "Reference, subject or organisation", show: "Show", entries: "entries", sort: "Sort by", sortOptions: ["Latest updated", "Oldest updated", "Newest received", "Subject A–Z"],
    columns: ["Registration number", "Received", "Grievance", "Concerned organisation", "Status", "Actions"], sample: "Sample record", updated: "Updated", open: "Open", empty: "No matching grievances", emptyBody: "Clear the search or select another status.", showing: "Showing", of: "of", previous: "Previous", page: "Page", next: "Next", recordsCount: "records",
    appealEyebrow: "Appeal dashboard", appealTitle: "Appeals and further review", appealHelp: "How appeals work", appealActive: "Appeal active", reviewEligible: "Eligible for review", appealStatus: "View appeal status", reviewOutcome: "Review pending outcome", noAppeals: "No active appeals", noAppealsTitle: "Appeal options appear after an eligible decision", noAppealsBody: "The grievance record retains the original context and Action Taken Report.",
    activity: "Account activity", activityTitle: "Recent case activity", account: "Account and session", citizenAccount: "citizen account", registeredEmail: "Registered email", session: "Session", active: "Active and protected", environment: "Environment", fictional: "Fictional demonstration data", accountHelp: "Account access help", technical: "Technical support", replay: "Replay interactive portal guide",
  },
  hi: {
    eyebrow: "नागरिक डैशबोर्ड", greeting: "नमस्ते", intro: "एक ही स्थान पर शिकायतें खोजें, कार्रवाई की समीक्षा करें और पात्र अपील आगे बढ़ाएँ।", lodge: "लोक शिकायत दर्ज करें",
    services: "नागरिक सेवाएँ", nav: ["शिकायत डैशबोर्ड", "अपील डैशबोर्ड", "लोक शिकायत दर्ज करें", "पेंशन शिकायत", "खाता गतिविधि", "खाता और सत्र"],
    needHelp: "सहायता चाहिए?", helpBody: "प्रक्रिया, पात्रता नियम और आधिकारिक संपर्क मार्ग पढ़ें।", directory: "सेवा निर्देशिका खोलें",
    summary: ["कुल शिकायतें", "प्रगति में", "निर्णय जारी", "सक्रिय अपील"], records: "आपके अभिलेख", register: "शिकायत रजिस्टर", registerBody: "इस खाते को जारी प्रत्येक पंजीकरण संख्या यहाँ दिखाई देती है।", find: "पंजीकरण संख्या से खोजें",
    filters: ["सभी", "प्रगति में", "निर्णय", "अपील"], search: "अभिलेख खोजें", placeholder: "पंजीकरण, विषय या संगठन", show: "दिखाएँ", entries: "प्रविष्टियाँ", sort: "क्रम", sortOptions: ["नवीनतम अपडेट", "सबसे पुराना अपडेट", "नई प्राप्ति", "विषय अ–ज्ञ"],
    columns: ["पंजीकरण संख्या", "प्राप्ति", "शिकायत", "संबंधित संगठन", "स्थिति", "कार्रवाई"], sample: "नमूना अभिलेख", updated: "अपडेट", open: "खोलें", empty: "कोई शिकायत नहीं मिली", emptyBody: "खोज साफ करें या दूसरी स्थिति चुनें।", showing: "दिखा रहे हैं", of: "में से", previous: "पिछला", page: "पृष्ठ", next: "अगला", recordsCount: "अभिलेख",
    appealEyebrow: "अपील डैशबोर्ड", appealTitle: "अपील और आगे की समीक्षा", appealHelp: "अपील प्रक्रिया", appealActive: "अपील सक्रिय", reviewEligible: "समीक्षा के लिए पात्र", appealStatus: "अपील स्थिति देखें", reviewOutcome: "लंबित परिणाम देखें", noAppeals: "कोई सक्रिय अपील नहीं", noAppealsTitle: "पात्र निर्णय के बाद अपील विकल्प दिखाई देंगे", noAppealsBody: "शिकायत अभिलेख में मूल संदर्भ और कार्रवाई रिपोर्ट सुरक्षित रहती है।",
    activity: "खाता गतिविधि", activityTitle: "हाल की प्रकरण गतिविधि", account: "खाता और सत्र", citizenAccount: "का नागरिक खाता", registeredEmail: "पंजीकृत ईमेल", session: "सत्र", active: "सक्रिय और सुरक्षित", environment: "परिवेश", fictional: "काल्पनिक प्रदर्शन डेटा", accountHelp: "खाता सहायता", technical: "तकनीकी सहायता", replay: "इंटरैक्टिव पोर्टल मार्गदर्शिका फिर देखें",
  },
} as const;

function statusLabel(status: string, locale: "en" | "hi") {
  const labels = locale === "hi" ? {
    acknowledged: "प्रगति में", "partly-resolved": "आंशिक निस्तारण", resolved: "निस्तारित", "appeal-received": "अपील प्राप्त",
  } : {
    acknowledged: "In progress", "partly-resolved": "Partly resolved", resolved: "Resolved", "appeal-received": "Appeal received",
  };
  return (labels as Record<string, string>)[status] ?? status.replace(/-/g, " ");
}

function statusGroup(status: string): Exclude<StatusFilter, "all"> {
  if (status === "appeal-received") return "appeal";
  if (status.includes("resolved")) return "resolved";
  return "in-progress";
}

function formatDate(value: string, locale: "en" | "hi") {
  return new Date(value).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function DashboardExperience({ records, firstName, email }: { records: DashboardRecord[]; firstName: string; email: string }) {
  const { contentLocale } = useCivicLanguage();
  const copy = dashboardCopy[contentLocale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOrder>("updated-desc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!window.sessionStorage.getItem("citizen-spotlight-guide-v1-seen")) setGuideOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const closeGuide = () => {
    window.sessionStorage.setItem("citizen-spotlight-guide-v1-seen", "1");
    setGuideOpen(false);
  };

  const counts = useMemo(() => ({
    total: records.length,
    pending: records.filter((record) => statusGroup(record.status) === "in-progress").length,
    resolved: records.filter((record) => statusGroup(record.status) === "resolved").length,
    appeals: records.filter((record) => statusGroup(record.status) === "appeal").length,
  }), [records]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records
      .filter((record) => filter === "all" || statusGroup(record.status) === filter)
      .filter((record) => !normalizedQuery || [record.reference, record.title, record.department, statusLabel(record.status, contentLocale)].some((value) => value.toLowerCase().includes(normalizedQuery)))
      .sort((left, right) => {
        if (sort === "title") return left.title.localeCompare(right.title);
        if (sort === "updated-asc") return new Date(left.updatedAt).getTime() - new Date(right.updatedAt).getTime();
        if (sort === "submitted-desc") return new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime();
        return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
      });
  }, [contentLocale, filter, query, records, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleRecords = filteredRecords.slice((safePage - 1) * pageSize, safePage * pageSize);
  const rangeStart = filteredRecords.length ? (safePage - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(safePage * pageSize, filteredRecords.length);
  const appealRecords = records.filter((record) => record.status === "appeal-received" || record.status === "partly-resolved");
  const recentRecords = [...records].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()).slice(0, 4);

  return <main className={styles.page} id="main-content">
    <header className={styles.welcome} data-tour="welcome">
      <div><p>{copy.eyebrow}</p><h1>{copy.greeting}, {firstName}.</h1><span>{copy.intro}</span></div>
      <Link className={styles.primaryAction} data-tour="lodge" href="/grievances/new"><span aria-hidden="true">＋</span> {copy.lodge}</Link>
    </header>

    {guideOpen ? <CitizenOnboardingGuide onClose={closeGuide} /> : null}

    <div className={styles.portalLayout}>
      <aside className={styles.sideRail} aria-label="Citizen dashboard sections">
        <p>{copy.services}</p>
        <nav>
          <a href="#grievance-register"><span>01</span>{copy.nav[0]}</a>
          <a href="#appeals"><span>02</span>{copy.nav[1]}</a>
          <Link href="/grievances/new"><span>03</span>{copy.nav[2]}</Link>
          <Link href="/services#pension"><span>04</span>{copy.nav[3]}</Link>
          <a href="#activity"><span>05</span>{copy.nav[4]}</a>
          <a href="#account"><span>06</span>{copy.nav[5]}</a>
        </nav>
        <div className={styles.sideHelp}><strong>{copy.needHelp}</strong><p>{copy.helpBody}</p><Link href="/services">{copy.directory} →</Link></div>
      </aside>

      <div className={styles.dashboardContent}>
        <section className={styles.summary} aria-label="Grievance summary" data-tour="summary">
          <article><span>01</span><div><small>{copy.summary[0]}</small><strong>{counts.total}</strong></div></article>
          <article><span>02</span><div><small>{copy.summary[1]}</small><strong>{counts.pending}</strong></div></article>
          <article><span>03</span><div><small>{copy.summary[2]}</small><strong>{counts.resolved}</strong></div></article>
          <article><span>04</span><div><small>{copy.summary[3]}</small><strong>{counts.appeals}</strong></div></article>
        </section>

        <section className={styles.register} id="grievance-register" aria-labelledby="register-heading">
          <header data-tour="register"><div><p>{copy.records}</p><h2 id="register-heading">{copy.register}</h2><span>{copy.registerBody}</span></div><Link href="/track">{copy.find} →</Link></header>
          <div className={styles.filterBar}>
            <div className={styles.filterTabs} aria-label="Filter grievances" role="group">
              {(["all", "in-progress", "resolved", "appeal"] as StatusFilter[]).map((value, index) => <button aria-pressed={filter === value} key={value} onClick={() => { setFilter(value); setPage(1); }} type="button">{copy.filters[index]}</button>)}
            </div>
            <label className={styles.search}><span>{copy.search}</span><input onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy.placeholder} type="search" value={query} /></label>
          </div>
          <div className={styles.tableTools}>
            <label>{copy.show} <select aria-label="Rows per page" onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} value={pageSize}><option value="5">5</option><option value="10">10</option><option value="20">20</option></select> {copy.entries}</label>
            <label>{copy.sort} <select aria-label="Sort grievances" onChange={(event) => { setSort(event.target.value as SortOrder); setPage(1); }} value={sort}><option value="updated-desc">{copy.sortOptions[0]}</option><option value="updated-asc">{copy.sortOptions[1]}</option><option value="submitted-desc">{copy.sortOptions[2]}</option><option value="title">{copy.sortOptions[3]}</option></select></label>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead><tr>{copy.columns.slice(0,5).map((column) => <th key={column} scope="col">{column}</th>)}<th scope="col"><span className="srOnly">{copy.columns[5]}</span></th></tr></thead>
              <tbody>{visibleRecords.map((record) => <tr key={record.reference}>
                <td><Link href={`/grievances/${encodeURIComponent(record.reference)}`}>{record.reference}</Link>{record.isSample ? <small>{copy.sample}</small> : null}</td>
                <td>{formatDate(record.submittedAt, contentLocale)}</td>
                <td><Link className={styles.subjectLink} href={`/grievances/${encodeURIComponent(record.reference)}`}>{record.title}</Link><small>{copy.updated} {formatDate(record.updatedAt, contentLocale)}</small></td>
                <td>{record.department}</td>
                <td><span className={`${styles.status} ${styles[statusGroup(record.status)]}`}>{statusLabel(record.status, contentLocale)}</span></td>
                <td><Link className={styles.rowAction} href={`/grievances/${encodeURIComponent(record.reference)}`}>{copy.open}<span className="srOnly"> grievance record</span> <span aria-hidden="true">→</span></Link></td>
              </tr>)}</tbody>
            </table>
            {!visibleRecords.length ? <div className={styles.empty}><strong>{copy.empty}</strong><p>{copy.emptyBody}</p></div> : null}
          </div>
          <footer><span>{copy.showing} {rangeStart}–{rangeEnd} {copy.of} {filteredRecords.length} {copy.recordsCount}</span><div><button disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} type="button">{copy.previous}</button><span>{copy.page} {safePage} {copy.of} {totalPages}</span><button disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} type="button">{copy.next}</button></div></footer>
        </section>

        <section className={styles.appeals} id="appeals" aria-labelledby="appeals-heading">
          <header><div><p>{copy.appealEyebrow}</p><h2 id="appeals-heading">{copy.appealTitle}</h2></div><Link href="/services#appeals">{copy.appealHelp} →</Link></header>
          <div className={styles.appealGrid}>{appealRecords.length ? appealRecords.map((record) => <article key={record.reference}><span>{record.status === "appeal-received" ? copy.appealActive : copy.reviewEligible}</span><h3>{record.title}</h3><p>{record.reference}</p><Link href={`/grievances/${encodeURIComponent(record.reference)}#appeal`}>{record.status === "appeal-received" ? copy.appealStatus : copy.reviewOutcome} →</Link></article>) : <article className={styles.noAppeals}><span>{copy.noAppeals}</span><h3>{copy.noAppealsTitle}</h3><p>{copy.noAppealsBody}</p></article>}</div>
        </section>

        <div className={styles.lowerGrid}>
          <section className={styles.activity} id="activity" aria-labelledby="activity-heading"><header><p>{copy.activity}</p><h2 id="activity-heading">{copy.activityTitle}</h2></header><ol>{recentRecords.map((record) => <li key={record.reference}><span aria-hidden="true" /><div><strong>{statusLabel(record.status, contentLocale)}</strong><p>{record.title}</p><small>{formatDate(record.updatedAt, contentLocale)} · {record.reference}</small></div></li>)}</ol></section>
          <aside className={styles.account} id="account"><p>{copy.account}</p><h2>{contentLocale === "hi" ? `${firstName} ${copy.citizenAccount}` : `${firstName}'s ${copy.citizenAccount}`}</h2><dl><div><dt>{copy.registeredEmail}</dt><dd>{email}</dd></div><div><dt>{copy.session}</dt><dd>{copy.active}</dd></div><div><dt>{copy.environment}</dt><dd>{copy.fictional}</dd></div></dl><div><Link href="/help#account-recovery">{copy.accountHelp}</Link><Link href="/services#contact">{copy.technical}</Link></div></aside>
        </div>
        <button className={styles.replayGuide} onClick={() => setGuideOpen(true)} type="button"><span aria-hidden="true">◎</span>{copy.replay}</button>
      </div>
    </div>
  </main>;
}
