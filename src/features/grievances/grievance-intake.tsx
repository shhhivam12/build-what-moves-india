"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { useSpeechInput } from "@/src/features/voice/use-speech-input";
import type { Classification } from "./classifier";
import styles from "./grievance-intake.module.css";

const sample = "I paid ₹499 for mobile service activation, but my service is still inactive after the promised date. Please activate it or reverse the charge.";
const departments = ["Department of Telecommunications", "Department of Financial Services", "Ministry of Labour and Employment", "Department of Posts", "Ministry of Housing and Urban Affairs", "Ministry of Health and Family Welfare", "Routing assistance desk"];

const intakeCopy = {
  en: {
    eyebrow: "Lodge Public Grievance", title: "Enter grievance details", welcome: "Welcome", intro: "Describe the public service issue and the action requested.", sensitive: "Do not enter sensitive information", sensitiveBody: "Do not include Aadhaar bank details passwords OTPs or confidential documents.", steps: ["Describe the issue", "Confirm route", "Review & submit"], step: "Step",
    description: "Grievance description", descriptionBody: "Provide the service details relevant dates and the action requested.", what: "What happened?", placeholder: "Example: I applied for… on… but…", characters: "characters", voice: "Speak grievance", listening: "Listening…", sample: "Use realistic sample", before: "Before you continue", publicService: "This is about public-service delivery.", publicBody: "I understand emergencies, court matters, RTI and religious matters use another channel.", save: "Save and exit", understanding: "Understanding your issue…", understand: "Understand and suggest route",
    designated: "Use the designated service", select: "Select concerned organisation", routeBody: "Review the suggested organisation and change it if required.", suggested: "Suggested organisation", match: "match", basis: "Basis of suggestion", confirm: "Confirm or change the department", unchanged: "Changing the route does not alter your original description.", relief: "Relief requested", reliefBody: "List each action requested from the concerned organisation.", add: "Add another requested action", back: "Back", return: "Return to dashboard", review: "Review grievance",
    reviewTitle: "Review before you submit", nothing: "Nothing is sent until you choose “Submit grievance”.", descriptionLabel: "Description", edit: "Edit", confirmed: "Confirmed route", change: "Change", outcomes: "Requested outcomes", declaration: "I have reviewed this grievance.", declarationBody: "The description is accurate for this synthetic demonstration and contains no sensitive real-world data.", creating: "Creating reference…", submit: "Submit grievance",
    instructions: "Instructions", include: "Include the following details", details: ["Name of the public service", "Description of the issue", "Relevant date or period", "Action requested"], reviewReminder: "Review the grievance before submission. Do not include passwords OTPs or unnecessary personal information.", detailed: "View detailed instructions",
  },
  hi: {
    eyebrow: "लोक शिकायत दर्ज करें", title: "शिकायत विवरण दर्ज करें", welcome: "स्वागत", intro: "सार्वजनिक सेवा की समस्या और अपेक्षित कार्रवाई लिखें।", sensitive: "संवेदनशील जानकारी दर्ज न करें", sensitiveBody: "आधार, बैंक विवरण, पासवर्ड, ओटीपी या गोपनीय दस्तावेज शामिल न करें।", steps: ["समस्या बताएँ", "मार्ग की पुष्टि", "समीक्षा और जमा"], step: "चरण",
    description: "शिकायत विवरण", descriptionBody: "सेवा विवरण, संबंधित तिथियाँ और अपेक्षित कार्रवाई बताएँ।", what: "क्या हुआ?", placeholder: "उदाहरण: मैंने… के लिए… को आवेदन किया, लेकिन…", characters: "अक्षर", voice: "शिकायत बोलें", listening: "सुन रहा हूँ…", sample: "यथार्थ नमूना उपयोग करें", before: "आगे बढ़ने से पहले", publicService: "यह सार्वजनिक सेवा वितरण का विषय है।", publicBody: "मैं समझता/समझती हूँ कि आपातकाल, न्यायालय, आरटीआई और धार्मिक विषय अन्य माध्यम से जाते हैं।", save: "सहेजें और बाहर जाएँ", understanding: "समस्या समझी जा रही है…", understand: "समझें और मार्ग सुझाएँ",
    designated: "निर्धारित सेवा उपयोग करें", select: "संबंधित संगठन चुनें", routeBody: "सुझाए गए संगठन की समीक्षा करें और आवश्यकता होने पर बदलें।", suggested: "सुझाया गया संगठन", match: "मिलान", basis: "सुझाव का आधार", confirm: "विभाग की पुष्टि या बदलाव", unchanged: "मार्ग बदलने से आपका मूल विवरण नहीं बदलता।", relief: "अपेक्षित राहत", reliefBody: "संबंधित संगठन से अपेक्षित प्रत्येक कार्रवाई अलग लिखें।", add: "एक और अपेक्षित कार्रवाई जोड़ें", back: "पीछे", return: "डैशबोर्ड पर लौटें", review: "शिकायत की समीक्षा",
    reviewTitle: "जमा करने से पहले समीक्षा", nothing: "“शिकायत जमा करें” चुनने तक कुछ नहीं भेजा जाता।", descriptionLabel: "विवरण", edit: "संपादित करें", confirmed: "पुष्ट मार्ग", change: "बदलें", outcomes: "अपेक्षित परिणाम", declaration: "मैंने इस शिकायत की समीक्षा की है।", declarationBody: "यह काल्पनिक प्रदर्शन के लिए सही है और इसमें कोई वास्तविक संवेदनशील डेटा नहीं है।", creating: "पंजीकरण बनाया जा रहा है…", submit: "शिकायत जमा करें",
    instructions: "निर्देश", include: "इन विवरणों को शामिल करें", details: ["सार्वजनिक सेवा का नाम", "समस्या का विवरण", "संबंधित तिथि या अवधि", "अपेक्षित कार्रवाई"], reviewReminder: "जमा करने से पहले शिकायत की समीक्षा करें। पासवर्ड, ओटीपी या अनावश्यक निजी जानकारी शामिल न करें।", detailed: "विस्तृत निर्देश देखें",
  },
} as const;

export function GrievanceIntake({ firstName }: { firstName: string }) {
  const { contentLocale } = useCivicLanguage();
  const copy = intakeCopy[contentLocale];
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [classification, setClassification] = useState<Classification | null>(null);
  const [department, setDepartment] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const onVoiceTranscript = useCallback((text: string) => { setDescription((current) => current ? `${current} ${text}` : text); setError(""); }, []);
  const onVoiceError = useCallback((message: string) => setError(message), []);
  const speech = useSpeechInput({ locale: contentLocale === "hi" ? "hi-IN" : "en-IN", onTranscript: onVoiceTranscript, onError: onVoiceError });

  useEffect(() => {
    const draft = window.sessionStorage.getItem("assured-chat-grievance-draft");
    const frame = window.requestAnimationFrame(() => {
      if (draft) {
        setDescription(draft);
        window.sessionStorage.removeItem("assured-chat-grievance-draft");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
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
    <header className={styles.intro}><div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.welcome} {firstName}. {copy.intro}</p></div><aside><span aria-hidden="true">!</span><div><strong>{copy.sensitive}</strong><small>{copy.sensitiveBody}</small></div></aside></header>
    <div className={styles.journey}>
      <ol className={styles.steps} aria-label="Grievance steps">
        {copy.steps.map((label, index) => <li className={step === index + 1 ? styles.current : step > index + 1 ? styles.done : ""} key={label}><span>{step > index + 1 ? "✓" : index + 1}</span><div><small>{copy.step} {index + 1}</small><strong>{label}</strong></div></li>)}
      </ol>
      <section className={styles.workspace}>
        {step === 1 ? <form onSubmit={analyse}>
          <div className={styles.sectionTitle}><span aria-hidden="true">01</span><div><h2>{copy.description}</h2><p>{copy.descriptionBody}</p></div></div>
          <label className={styles.field}><span>{copy.what}</span><textarea autoFocus maxLength={5000} minLength={20} onChange={(event) => setDescription(event.target.value)} placeholder={copy.placeholder} required rows={9} value={description} /><small>{description.length} / 5,000 {copy.characters}</small></label>
          <div className={styles.assistRow}><button aria-pressed={speech.listening} className={styles.voiceButton} onClick={speech.toggle} type="button"><span aria-hidden="true">●</span> {speech.listening ? copy.listening : copy.voice}</button><button className={styles.sampleButton} onClick={() => { setDescription(sample); setError(""); }} type="button">{copy.sample}</button></div>
          <fieldset className={styles.safetyCheck}><legend>{copy.before}</legend><label><input required type="checkbox" /><span><strong>{copy.publicService}</strong><small>{copy.publicBody}</small></span></label></fieldset>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <div className={styles.actions}><Link href="/dashboard">{copy.save}</Link><button disabled={pending || description.trim().length < 20} type="submit">{pending ? copy.understanding : copy.understand} <span aria-hidden="true">→</span></button></div>
        </form> : null}

        {step === 2 && classification ? <div>
          <div className={styles.sectionTitle}><span aria-hidden="true">02</span><div><h2>{classification.needsHandoff ? copy.designated : copy.select}</h2><p>{copy.routeBody}</p></div></div>
          {classification.needsHandoff ? <section className={styles.handoff}><span aria-hidden="true">↗</span><div><p className={styles.eyebrow}>{classification.category}</p><h3>{classification.department}</h3><p>{classification.reason}</p><a href={classification.needsHandoff.url} rel="noreferrer" target="_blank">{classification.needsHandoff.label} ↗</a></div></section> : <>
            <section className={styles.routeCard}><div className={styles.routeTop}><span className={styles.routeIcon} aria-hidden="true">◎</span><div><small>{copy.suggested}</small><h3>{classification.department}</h3><p>{classification.category}</p></div><b>{classification.confidence}% {copy.match}</b></div><div className={styles.reason}><strong>{copy.basis}</strong><p>{classification.reason}</p></div></section>
            <label className={styles.field}><span>{copy.confirm}</span><select onChange={(event) => setDepartment(event.target.value)} value={department}>{departments.map((item) => <option key={item}>{item}</option>)}</select><small>{copy.unchanged}</small></label>
            <section className={styles.outcomes}><div><h3>{copy.relief}</h3><p>{copy.reliefBody}</p></div>{outcomes.map((outcome, index) => <label key={index}><span>{index + 1}</span><input aria-label={`Requested outcome ${index + 1}`} onChange={(event) => updateOutcome(index, event.target.value)} value={outcome} /><button aria-label={`Remove requested outcome ${index + 1}`} onClick={() => setOutcomes((items) => items.filter((_, itemIndex) => itemIndex !== index))} type="button">×</button></label>)}{outcomes.length < 5 ? <button className={styles.addOutcome} onClick={() => setOutcomes((items) => [...items, ""])} type="button">＋ {copy.add}</button> : null}</section>
          </>}
          <div className={styles.actions}><button className={styles.backButton} onClick={() => setStep(1)} type="button">← {copy.back}</button>{classification.needsHandoff ? <Link className={styles.dashboardLink} href="/dashboard">{copy.return}</Link> : <button disabled={!department || !outcomes.some(Boolean)} onClick={() => setStep(3)} type="button">{copy.review} <span aria-hidden="true">→</span></button>}</div>
        </div> : null}

        {step === 3 && classification ? <div>
          <div className={styles.sectionTitle}><span aria-hidden="true">03</span><div><h2>{copy.reviewTitle}</h2><p>{copy.nothing}</p></div></div>
          <div className={styles.reviewGrid}><section><header><span>{copy.descriptionLabel}</span><button onClick={() => setStep(1)} type="button">{copy.edit}</button></header><h3>{title}</h3><p>{description}</p></section><section><header><span>{copy.confirmed}</span><button onClick={() => setStep(2)} type="button">{copy.change}</button></header><h3>{department}</h3><p>{classification.reason}</p></section><section className={styles.fullReview}><header><span>{copy.outcomes}</span><button onClick={() => setStep(2)} type="button">{copy.edit}</button></header><ol>{outcomes.filter(Boolean).map((outcome) => <li key={outcome}>{outcome}</li>)}</ol></section></div>
          <label className={styles.declaration}><input required type="checkbox" /><span><strong>{copy.declaration}</strong><small>{copy.declarationBody}</small></span></label>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <div className={styles.actions}><button className={styles.backButton} onClick={() => setStep(2)} type="button">← {copy.back}</button><button disabled={pending} onClick={submit} type="button">{pending ? copy.creating : copy.submit} <span aria-hidden="true">→</span></button></div>
        </div> : null}
      </section>
      <aside className={styles.sideHelp}><p className={styles.eyebrow}>{copy.instructions}</p><h2>{copy.include}</h2><ul>{copy.details.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ul><p>{copy.reviewReminder}</p><Link href="/help">{copy.detailed} →</Link></aside>
    </div>
  </main>;
}
