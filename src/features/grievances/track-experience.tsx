"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./track-experience.module.css";

type TrackRecord = { reference: string; title: string; status: string; department: string; updatedAt: string };

export function TrackExperience({ records, signedIn }: { records: TrackRecord[]; signedIn: boolean }) {
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<TrackRecord | null>(null);
  const [searched, setSearched] = useState(false);
  function search(event: FormEvent) {
    event.preventDefault();
    setResult(records.find((record) => record.reference.toLowerCase() === reference.trim().toLowerCase()) ?? null);
    setSearched(true);
  }
  const sampleReference = records[0]?.reference ?? "";
  return <main className={styles.page} id="main-content"><section className={styles.hero}><p>Grievance Status</p><h1>View Grievance Status</h1><span>Enter the registration number issued when the grievance was submitted.</span></section><div className={styles.layout}><section className={styles.searchCard}><span className={styles.searchIcon} aria-hidden="true">⌕</span><h2>Enter registration number</h2><p>The registration number is available on the submission receipt and citizen dashboard.</p>{signedIn ? <form onSubmit={search}><label><span>Registration number</span><div><input autoComplete="off" onChange={(event) => { setReference(event.target.value); setSearched(false); }} placeholder={sampleReference || "CPG-2026-XXXXXXX"} required value={reference} /><button type="submit">View status <span aria-hidden="true">→</span></button></div></label>{sampleReference ? <button className={styles.fillButton} onClick={() => setReference(sampleReference)} type="button">Use sample registration number</button> : null}</form> : <div className={styles.signinPrompt}><strong>Citizen sign in required</strong><p>Sign in to view grievance records associated with your account.</p><Link href="/signin?returnTo=/track">Sign in <span aria-hidden="true">→</span></Link></div>}{searched && !result ? <p className={styles.notFound} role="alert">No grievance with that registration number was found in this account.</p> : null}</section>{result ? <section className={styles.result}><div className={styles.resultTop}><span aria-hidden="true">✓</span><div><small>Registration found</small><h2>{result.title}</h2><p>{result.reference}</p></div><b>{result.status.replace(/-/g," ")}</b></div><dl><div><dt>Concerned organisation</dt><dd>{result.department}</dd></div><div><dt>Last updated</dt><dd>{new Date(result.updatedAt).toLocaleString("en-IN", { day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}</dd></div><div><dt>Further information</dt><dd>Open the grievance record to view action taken and available appeal options.</dd></div></dl><Link href={`/grievances/${encodeURIComponent(result.reference)}`}>Open grievance record <span aria-hidden="true">→</span></Link></section> : <aside className={styles.guide}><p>Registration number</p><div className={styles.referenceMock}><small>GRIEVANCE REGISTRATION NUMBER</small><strong>{sampleReference || "CPG-2026-XXXXXXX"}</strong><span>Retain this number for future reference</span></div><ul><li><span>1</span>Submission receipt</li><li><span>2</span>Citizen dashboard</li><li><span>3</span>Action Taken Report</li></ul></aside>}</div></main>;
}
