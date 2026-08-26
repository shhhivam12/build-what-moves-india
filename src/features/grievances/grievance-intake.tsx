"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import type { Classification } from "./classifier";
import styles from "./grievance-intake.module.css";

const sample = "I paid ₹499 for mobile service activation, but my service is still inactive after the promised date. Please activate it or reverse the charge.";
const departments = ["Department of Telecommunications", "Department of Financial Services", "Ministry of Labour and Employment", "Department of Posts", "Ministry of Housing and Urban Affairs", "Ministry of Health and Family Welfare", "Routing assistance desk"];

export function GrievanceIntake({ firstName }: { firstName: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [classification, setClassification] = useState<Classification | null>(null);
  const [department, setDepartment] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const title = useMemo(() => {
    const clean = description.replace(/\s+/g, " ").trim();
    return clean.length > 86 ? `${clean.slice(0, 83)}…` : clean || "New public-service grievance";
  }, [description]);

  async function analyse(event: FormEvent) {
    event.preventDefault(); setPending(true); setError("");
    try {
      const response = await fetch("/api/classify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ description }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setClassification(result); setDepartment(result.department); setOutcomes(result.desiredOutcomes); setStep(result.needsHandoff ? 2 : 2);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Routing assistance is temporarily unavailable."); }
    finally { setPending(false); }
  }

  function updateOutcome(index: number, value: string) { setOutcomes((items) => items.map((item, itemIndex) => itemIndex === index ? value : item)); }

  async function submit() {
    if (!classification) return;
    setPending(true); setError("");
    try {
      const response = await fetch("/api/grievances", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title, description, category: classification.category, department, routeReason: classification.reason, desiredOutcomes: outcomes.filter(Boolean) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      router.push(`/grievances/${encodeURIComponent(result.reference)}?submitted=1`);
      router.refresh();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "The grievance could not be submitted."); setPending(false); }
  }

  return <main className={styles.page} id="main-content">
    <header className={styles.intro}><div><p className={styles.eyebrow}>Lodge a public grievance</p><h1>Tell us what happened, {firstName}.</h1><p>Start with the problem. Routing comes after the system understands your words.</p></div><aside><span aria-hidden="true">◇</span><div><strong>Your draft is private to this demonstration account</strong><small>Do not enter Aadhaar, bank details, OTPs or real personal documents.</small></div></aside></header>
    <div className={styles.journey}>
      <ol className={styles.steps} aria-label="Grievance steps">
        {["Describe the issue", "Confirm route", "Review & submit"].map((label, index) => <li className={step === index + 1 ? styles.current : step > index + 1 ? styles.done : ""} key={label}><span>{step > index + 1 ? "✓" : index + 1}</span><div><small>Step {index + 1}</small><strong>{label}</strong></div></li>)}
      </ol>
      <section className={styles.workspace}>
        {step === 1 ? <form onSubmit={analyse}>
          <div className={styles.sectionTitle}><span aria-hidden="true">01</span><div><h2>Describe the issue in your own words</h2><p>You do not need to know the ministry, department or official terminology.</p></div></div>
          <label className={styles.field}><span>What happened?</span><textarea autoFocus maxLength={5000} minLength={20} onChange={(event) => setDescription(event.target.value)} placeholder="Example: I applied for… on… but…" required rows={9} value={description} /><small>{description.length} / 5,000 characters</small></label>
          <div className={styles.assistRow}><button className={styles.voiceButton} onClick={() => setError("Voice input needs browser microphone permission. For this reliable demo, use the sample or type the grievance.")} type="button"><span aria-hidden="true">●</span> Speak grievance</button><button className={styles.sampleButton} onClick={() => { setDescription(sample); setError(""); }} type="button">Use realistic sample</button></div>
          <fieldset className={styles.safetyCheck}><legend>Before you continue</legend><label><input required type="checkbox" /><span><strong>This is about public-service delivery.</strong><small>I understand emergencies, court matters, RTI and religious matters use another channel.</small></span></label></fieldset>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <div className={styles.actions}><Link href="/dashboard">Save and exit</Link><button disabled={pending || description.trim().length < 20} type="submit">{pending ? "Understanding your issue…" : "Understand and suggest route"} <span aria-hidden="true">→</span></button></div>
        </form> : null}

        {step === 2 && classification ? <div>
          <div className={styles.sectionTitle}><span aria-hidden="true">02</span><div><h2>{classification.needsHandoff ? "This matter has a better official route" : "Confirm where this should go"}</h2><p>Assistance explains the suggestion. You make the final choice.</p></div></div>
          {classification.needsHandoff ? <section className={styles.handoff}><span aria-hidden="true">↗</span><div><p className={styles.eyebrow}>{classification.category}</p><h3>{classification.department}</h3><p>{classification.reason}</p><a href={classification.needsHandoff.url} rel="noreferrer" target="_blank">{classification.needsHandoff.label} ↗</a></div></section> : <>
            <section className={styles.routeCard}><div className={styles.routeTop}><span className={styles.routeIcon} aria-hidden="true">◎</span><div><small>Suggested route</small><h3>{classification.department}</h3><p>{classification.category}</p></div><b>{classification.confidence}% match</b></div><div className={styles.reason}><strong>Why this route?</strong><p>{classification.reason}</p></div></section>
            <label className={styles.field}><span>Confirm or change the department</span><select onChange={(event) => setDepartment(event.target.value)} value={department}>{departments.map((item) => <option key={item}>{item}</option>)}</select><small>Changing the route does not alter your original description.</small></label>
            <section className={styles.outcomes}><div><h3>What do you want to happen?</h3><p>Each requested outcome will be tracked separately in the Resolution Receipt.</p></div>{outcomes.map((outcome, index) => <label key={index}><span>{index + 1}</span><input aria-label={`Requested outcome ${index + 1}`} onChange={(event) => updateOutcome(index, event.target.value)} value={outcome} /><button aria-label={`Remove requested outcome ${index + 1}`} onClick={() => setOutcomes((items) => items.filter((_, itemIndex) => itemIndex !== index))} type="button">×</button></label>)}{outcomes.length < 5 ? <button className={styles.addOutcome} onClick={() => setOutcomes((items) => [...items, ""])} type="button">＋ Add another requested outcome</button> : null}</section>
          </>}
          <div className={styles.actions}><button className={styles.backButton} onClick={() => setStep(1)} type="button">← Back</button>{classification.needsHandoff ? <Link className={styles.dashboardLink} href="/dashboard">Return to dashboard</Link> : <button disabled={!department || !outcomes.some(Boolean)} onClick={() => setStep(3)} type="button">Review grievance <span aria-hidden="true">→</span></button>}</div>
        </div> : null}

        {step === 3 && classification ? <div>
          <div className={styles.sectionTitle}><span aria-hidden="true">03</span><div><h2>Review before you submit</h2><p>Nothing is sent until you choose “Submit grievance”.</p></div></div>
          <div className={styles.reviewGrid}><section><header><span>Description</span><button onClick={() => setStep(1)} type="button">Edit</button></header><h3>{title}</h3><p>{description}</p></section><section><header><span>Confirmed route</span><button onClick={() => setStep(2)} type="button">Change</button></header><h3>{department}</h3><p>{classification.reason}</p></section><section className={styles.fullReview}><header><span>Requested outcomes</span><button onClick={() => setStep(2)} type="button">Edit</button></header><ol>{outcomes.filter(Boolean).map((outcome) => <li key={outcome}>{outcome}</li>)}</ol></section></div>
          <label className={styles.declaration}><input required type="checkbox" /><span><strong>I have reviewed this grievance.</strong><small>The description is accurate for this synthetic demonstration and contains no sensitive real-world data.</small></span></label>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <div className={styles.actions}><button className={styles.backButton} onClick={() => setStep(2)} type="button">← Back</button><button disabled={pending} onClick={submit} type="button">{pending ? "Creating reference…" : "Submit grievance"} <span aria-hidden="true">→</span></button></div>
        </div> : null}
      </section>
      <aside className={styles.sideHelp}><p className={styles.eyebrow}>Need help?</p><h2>Good descriptions include</h2><ul><li><span>1</span>What service you used</li><li><span>2</span>What went wrong</li><li><span>3</span>When it happened</li><li><span>4</span>What outcome you need</li></ul><p>Write in any language available above. English and Hindi are fully reviewed in this prototype; other catalogues are preview-ready.</p><Link href="/help">Read grievance guidance →</Link></aside>
    </div>
  </main>;
}
