"use client";

import { FormEvent, useRef, useState } from "react";
import { getContentLocale, type LocaleCode } from "@/src/i18n/languages";
import { PrototypeShell } from "./prototype-shell";
import styles from "./critical-components-lab.module.css";

const copy = {
  en: {
    eyebrow: "Phase 0A · critical-component checkpoint",
    title: "Describe your grievance",
    lead: "Test the shared interaction patterns before they are used across the full journey.",
    review: "Design-lab content is synthetic and remains subject to Hindi and policy review.",
    stepLabel: "Grievance progress",
    steps: ["Describe", "Confirm route", "Review", "Receipt"],
    statementLabel: "What happened?",
    statementHint: "Include what you expected, what happened, and when. Do not include real personal information.",
    statementError: "Enter at least 20 characters so the issue can be understood.",
    original: "Original citizen text is preserved when the interface language changes.",
    routeLegend: "Choose a suggested route",
    routeHint: "This suggestion is advisory. You remain in control.",
    recommended: "Suggested route",
    routes: [
      ["telecom", "Telecommunications · Mobile services", "The statement mentions mobile activation and billing."],
      ["banking", "Banking services", "Choose this if the issue concerns a bank or payment account."],
      ["manual", "Choose another route", "Search or browse the fictional catalogue manually."],
    ],
    timelineTitle: "Timeline pattern",
    timelineEvent: "Draft saved",
    timelineDetail: "Your synthetic demonstration draft is available on this device.",
    session: "Test session warning",
    submit: "Continue to route confirmation",
    saved: "Draft saved for this design demonstration.",
    validationTitle: "There is a problem",
    dialogTitle: "Your session will end soon",
    dialogBody: "Your draft is saved. Extend the session or sign in again without losing your place.",
    extend: "Extend session",
    close: "Close warning",
    continued: "Design-lab form is ready for route confirmation.",
  },
  hi: {
    eyebrow: "चरण 0A · महत्वपूर्ण घटक जाँच",
    title: "अपनी शिकायत बताएँ",
    lead: "पूरी यात्रा में उपयोग करने से पहले साझा इंटरैक्शन पैटर्न की जाँच करें।",
    review: "डिज़ाइन-लैब की सामग्री कृत्रिम है और हिन्दी तथा नीति समीक्षा अभी बाकी है।",
    stepLabel: "शिकायत की प्रगति",
    steps: ["विवरण", "मार्ग की पुष्टि", "समीक्षा", "रसीद"],
    statementLabel: "क्या हुआ?",
    statementHint: "आपने क्या अपेक्षा की, क्या हुआ और कब हुआ—यह लिखें। वास्तविक व्यक्तिगत जानकारी न दें।",
    statementError: "समस्या समझने के लिए कम से कम 20 अक्षर लिखें।",
    original: "इंटरफ़ेस की भाषा बदलने पर नागरिक का मूल विवरण नहीं बदला जाता।",
    routeLegend: "सुझाया गया मार्ग चुनें",
    routeHint: "यह सुझाव केवल सहायता के लिए है। अंतिम नियंत्रण आपके पास है।",
    recommended: "सुझाया गया मार्ग",
    routes: [
      ["telecom", "दूरसंचार · मोबाइल सेवाएँ", "विवरण में मोबाइल सक्रियण और बिलिंग का उल्लेख है।"],
      ["banking", "बैंकिंग सेवाएँ", "यदि समस्या बैंक या भुगतान खाते से जुड़ी है तो इसे चुनें।"],
      ["manual", "दूसरा मार्ग चुनें", "कृत्रिम सूची में स्वयं खोजें या ब्राउज़ करें।"],
    ],
    timelineTitle: "समयरेखा पैटर्न",
    timelineEvent: "मसौदा सहेजा गया",
    timelineDetail: "आपका कृत्रिम प्रदर्शन मसौदा इस उपकरण पर उपलब्ध है।",
    session: "सत्र चेतावनी जाँचें",
    submit: "मार्ग की पुष्टि के लिए आगे बढ़ें",
    saved: "इस डिज़ाइन प्रदर्शन के लिए मसौदा सहेजा गया।",
    validationTitle: "एक समस्या है",
    dialogTitle: "आपका सत्र शीघ्र समाप्त होगा",
    dialogBody: "आपका मसौदा सुरक्षित है। सत्र बढ़ाएँ या अपना स्थान खोए बिना फिर से साइन इन करें।",
    extend: "सत्र बढ़ाएँ",
    close: "चेतावनी बंद करें",
    continued: "डिज़ाइन-लैब फ़ॉर्म मार्ग की पुष्टि के लिए तैयार है।",
  },
} as const;

const initialStatement =
  "I paid a ₹499 activation charge, but my mobile service is still inactive and the fee remains on my bill.";

export function CriticalComponentsLab() {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [statement, setStatement] = useState(initialStatement);
  const [route, setRoute] = useState("telecom");
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentLocale = getContentLocale(locale);
  const current = copy[contentLocale];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = statement.trim().length < 20;
    setError(invalid);
    setComplete(!invalid);
    if (invalid) {
      requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#error-summary a")?.focus());
    }
  }

  return (
    <PrototypeShell contentLocale={contentLocale} locale={locale} onLocaleChange={setLocale}>
      <main className={styles.main} id="main-content" tabIndex={-1}>
        <div className={styles.pageHeader}>
          <p className={styles.eyebrow}>{current.eyebrow}</p>
          <h1>{current.title}</h1>
          <p className={styles.lead}>{current.lead}</p>
          <p className={styles.reviewNote}>{current.review}</p>
        </div>

        <nav aria-label={current.stepLabel} className={styles.steps} tabIndex={0}>
          <ol>
            {current.steps.map((step, index) => (
              <li aria-current={index === 0 ? "step" : undefined} key={step}>
                <span aria-hidden="true">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </nav>

        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          {error ? (
            <section aria-labelledby="error-summary-title" className={styles.errorSummary} id="error-summary" role="alert">
              <h2 id="error-summary-title">{current.validationTitle}</h2>
              <a href="#grievance-statement">{current.statementError}</a>
            </section>
          ) : null}

          <section aria-labelledby="statement-heading" className={styles.section}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionNumber} aria-hidden="true">01</p>
              <div>
                <h2 id="statement-heading">{current.statementLabel}</h2>
                <p id="statement-hint">{current.statementHint}</p>
              </div>
            </div>

            <label className={styles.visuallyHidden} htmlFor="grievance-statement">
              {current.statementLabel}
            </label>
            <textarea
              aria-describedby={`statement-hint original-text-note${error ? " statement-error" : ""}`}
              aria-invalid={error}
              className={error ? styles.fieldError : undefined}
              id="grievance-statement"
              name="statement"
              onChange={(event) => {
                setStatement(event.target.value);
                setComplete(false);
              }}
              rows={7}
              value={statement}
            />
            {error ? <p className={styles.errorText} id="statement-error">{current.statementError}</p> : null}
            <p className={styles.originalNote} id="original-text-note">{current.original}</p>
            <p className={styles.draftStatus} role="status">{current.saved}</p>
          </section>

          <section aria-labelledby="route-heading" className={styles.section}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionNumber} aria-hidden="true">02</p>
              <div>
                <h2 id="route-heading">{current.routeLegend}</h2>
                <p>{current.routeHint}</p>
              </div>
            </div>

            <fieldset className={styles.routeFieldset}>
              <legend className={styles.visuallyHidden}>{current.routeLegend}</legend>
              {current.routes.map(([value, label, reason], index) => (
                <label className={styles.routeCard} key={value}>
                  <input
                    checked={route === value}
                    name="route"
                    onChange={() => setRoute(value)}
                    type="radio"
                    value={value}
                  />
                  <span>
                    {index === 0 ? <strong className={styles.recommended}>{current.recommended}</strong> : null}
                    <strong className={styles.routeLabel}>{label}</strong>
                    <span className={styles.routeReason}>{reason}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </section>

          <section aria-labelledby="timeline-heading" className={styles.section}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionNumber} aria-hidden="true">03</p>
              <div>
                <h2 id="timeline-heading">{current.timelineTitle}</h2>
                <p>{current.timelineDetail}</p>
              </div>
            </div>

            <ol className={styles.timeline}>
              <li>
                <span className={styles.timelineMarker} aria-hidden="true" />
                <div>
                  <strong>{current.timelineEvent}</strong>
                  <p>{current.timelineDetail}</p>
                  <time dateTime="2026-08-24T14:30:00+05:30">24 August 2026 · 2:30 PM</time>
                </div>
              </li>
            </ol>
          </section>

          {complete ? <p className={styles.successMessage} role="status">{current.continued}</p> : null}

          <div className={styles.actions}>
            <button className={styles.primaryButton} type="submit">{current.submit}</button>
            <button className={styles.secondaryButton} onClick={() => dialogRef.current?.showModal()} type="button">
              {current.session}
            </button>
          </div>
        </form>
      </main>

      <dialog aria-labelledby="session-dialog-title" className={styles.dialog} ref={dialogRef}>
        <div className={styles.dialogBody}>
          <h2 id="session-dialog-title">{current.dialogTitle}</h2>
          <p>{current.dialogBody}</p>
          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={() => dialogRef.current?.close()} type="button">
              {current.extend}
            </button>
            <button className={styles.secondaryButton} onClick={() => dialogRef.current?.close()} type="button">
              {current.close}
            </button>
          </div>
        </div>
      </dialog>
    </PrototypeShell>
  );
}
