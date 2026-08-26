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
  return <main className={styles.page} id="main-content"><section className={styles.hero}><p>Track a grievance</p><h1>One reference.<br />A complete, understandable timeline.</h1><span>For privacy, this concept shows records only after the owner signs in.</span></section><div className={styles.layout}><section className={styles.searchCard}><span className={styles.searchIcon} aria-hidden="true">⌁</span><h2>Enter the grievance reference</h2><p>Find the reference on your submission confirmation or citizen dashboard.</p>{signedIn ? <form onSubmit={search}><label><span>Registration / reference number</span><div><input autoComplete="off" onChange={(event) => { setReference(event.target.value); setSearched(false); }} placeholder={sampleReference || "CPG-2026-XXXXXXX"} required value={reference} /><button type="submit">View progress <span aria-hidden="true">→</span></button></div></label>{sampleReference ? <button className={styles.fillButton} onClick={() => setReference(sampleReference)} type="button">Use my sample reference</button> : null}</form> : <div className={styles.signinPrompt}><strong>Sign in to protect your case information</strong><p>The original portal asks for reference and contact details again. This redesign recognises your secure account and never exposes a case to another user.</p><Link href="/signin?returnTo=/track">Sign in to track <span aria-hidden="true">→</span></Link></div>}{searched && !result ? <p className={styles.notFound} role="alert">No grievance with that reference belongs to this account. Check the characters and try again.</p> : null}</section>{result ? <section className={styles.result}><div className={styles.resultTop}><span aria-hidden="true">✓</span><div><small>Reference found</small><h2>{result.title}</h2><p>{result.reference}</p></div><b>{result.status.replace(/-/g," ")}</b></div><dl><div><dt>Current department</dt><dd>{result.department}</dd></div><div><dt>Last updated</dt><dd>{new Date(result.updatedAt).toLocaleString("en-IN", { day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}</dd></div><div><dt>Next step</dt><dd>Open the case to see the actor, reason, evidence and expected follow-up.</dd></div></dl><Link href={`/grievances/${encodeURIComponent(result.reference)}`}>Open complete case <span aria-hidden="true">→</span></Link></section> : <aside className={styles.guide}><p>Where to find your reference</p><div className={styles.referenceMock}><small>GRIEVANCE REFERENCE</small><strong>{sampleReference || "CPG-2026-XXXXXXX"}</strong><span>Keep this for future tracking</span></div><ul><li><span>1</span>Submission confirmation</li><li><span>2</span>My grievance dashboard</li><li><span>3</span>Case Resolution Receipt</li></ul></aside>}</div></main>;
}
