"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import styles from "./track-experience.module.css";

type TrackRecord = { reference: string; title: string; status: string; department: string; updatedAt: string };

const trackCopy = {
  en: { eyebrow: "Grievance Status", title: "View Grievance Status", intro: "Enter the registration number issued when the grievance was submitted.", enter: "Enter registration number", body: "The registration number is available on the submission receipt and citizen dashboard.", number: "Registration number", view: "View status", sample: "Use sample registration number", signRequired: "Citizen sign in required", signBody: "Sign in to view grievance records associated with your account.", signIn: "Sign in", notFound: "No grievance with that registration number was found in this account.", found: "Registration found", organisation: "Concerned organisation", updated: "Last updated", further: "Further information", furtherBody: "Open the grievance record to view action taken and available appeal options.", open: "Open grievance record", retain: "Retain this number for future reference", locations: ["Submission receipt", "Citizen dashboard", "Action Taken Report"] },
  hi: { eyebrow: "शिकायत स्थिति", title: "शिकायत की स्थिति देखें", intro: "शिकायत जमा करते समय जारी पंजीकरण संख्या दर्ज करें।", enter: "पंजीकरण संख्या दर्ज करें", body: "पंजीकरण संख्या जमा रसीद और नागरिक डैशबोर्ड पर उपलब्ध है।", number: "पंजीकरण संख्या", view: "स्थिति देखें", sample: "नमूना पंजीकरण संख्या उपयोग करें", signRequired: "नागरिक साइन इन आवश्यक", signBody: "अपने खाते से जुड़े शिकायत अभिलेख देखने के लिए साइन इन करें।", signIn: "साइन इन", notFound: "इस खाते में इस पंजीकरण संख्या की शिकायत नहीं मिली।", found: "पंजीकरण मिला", organisation: "संबंधित संगठन", updated: "अंतिम अपडेट", further: "अधिक जानकारी", furtherBody: "कार्रवाई और उपलब्ध अपील विकल्प देखने के लिए शिकायत अभिलेख खोलें।", open: "शिकायत अभिलेख खोलें", retain: "भविष्य के संदर्भ के लिए यह संख्या सुरक्षित रखें", locations: ["जमा रसीद", "नागरिक डैशबोर्ड", "कार्रवाई रिपोर्ट"] },
} as const;

export function TrackExperience({ records, signedIn }: { records: TrackRecord[]; signedIn: boolean }) {
  const { contentLocale } = useCivicLanguage();
  const copy = trackCopy[contentLocale];
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<TrackRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const assistedReference = window.sessionStorage.getItem("assured-chat-track-reference");
    if (!assistedReference) return;
    const frame = window.requestAnimationFrame(() => {
      setReference(assistedReference);
      setResult(records.find((record) => record.reference.toLowerCase() === assistedReference.trim().toLowerCase()) ?? null);
      setSearched(true);
      window.sessionStorage.removeItem("assured-chat-track-reference");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [records]);
  function search(event: FormEvent) {
    event.preventDefault();
    setResult(records.find((record) => record.reference.toLowerCase() === reference.trim().toLowerCase()) ?? null);
    setSearched(true);
  }
  const sampleReference = records[0]?.reference ?? "";
  return <main className={styles.page} id="main-content"><section className={styles.hero}><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.intro}</span></section><div className={styles.layout}><section className={styles.searchCard}><span className={styles.searchIcon} aria-hidden="true">⌕</span><h2>{copy.enter}</h2><p>{copy.body}</p>{signedIn ? <form onSubmit={search}><label><span>{copy.number}</span><div><input autoComplete="off" onChange={(event) => { setReference(event.target.value); setSearched(false); }} placeholder={sampleReference || "CPG-2026-XXXXXXX"} required value={reference} /><button type="submit">{copy.view} <span aria-hidden="true">→</span></button></div></label>{sampleReference ? <button className={styles.fillButton} onClick={() => setReference(sampleReference)} type="button">{copy.sample}</button> : null}</form> : <div className={styles.signinPrompt}><strong>{copy.signRequired}</strong><p>{copy.signBody}</p><Link href="/signin?returnTo=/track">{copy.signIn} <span aria-hidden="true">→</span></Link></div>}{searched && !result ? <p className={styles.notFound} role="alert">{copy.notFound}</p> : null}</section>{result ? <section className={styles.result}><div className={styles.resultTop}><span aria-hidden="true">✓</span><div><small>{copy.found}</small><h2>{result.title}</h2><p>{result.reference}</p></div><b>{result.status.replace(/-/g," ")}</b></div><dl><div><dt>{copy.organisation}</dt><dd>{result.department}</dd></div><div><dt>{copy.updated}</dt><dd>{new Date(result.updatedAt).toLocaleString(contentLocale === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}</dd></div><div><dt>{copy.further}</dt><dd>{copy.furtherBody}</dd></div></dl><Link href={`/grievances/${encodeURIComponent(result.reference)}`}>{copy.open} <span aria-hidden="true">→</span></Link></section> : <aside className={styles.guide}><p>{copy.number}</p><div className={styles.referenceMock}><small>{copy.number}</small><strong>{sampleReference || "CPG-2026-XXXXXXX"}</strong><span>{copy.retain}</span></div><ul>{copy.locations.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ul></aside>}</div></main>;
}
