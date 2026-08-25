"use client";

import { useEffect, useState } from "react";
import { PrototypeShell } from "@/src/design-system/components/prototype-shell";
import type { LocaleCode } from "@/src/i18n/languages";
import styles from "./judge-demo.module.css";

type View = "login" | "dashboard" | "describe" | "route" | "review" | "submitted" | "case" | "appeal" | "appeal-done";

const complaint = "I paid ₹499 for mobile service activation, but my service is still inactive. Please activate it, or reverse the charge because it was not completed on the promised date.";
const hindiComplaint = "मैंने मोबाइल सेवा सक्रियण के लिए ₹499 का भुगतान किया, लेकिन मेरी सेवा अभी भी निष्क्रिय है। कृपया सेवा सक्रिय करें, या तय तारीख तक सक्रियण न होने के कारण शुल्क वापस करें।";

const copy = {
  en: {
    signIn: "Try as Asha Verma",
    dashboard: "My grievances",
    newGrievance: "Lodge a grievance",
    signOut: "Exit demo",
  },
  hi: {
    signIn: "आशा वर्मा के रूप में देखें",
    dashboard: "मेरी शिकायतें",
    newGrievance: "शिकायत दर्ज करें",
    signOut: "डेमो से बाहर जाएँ",
  },
};

const CheckIcon = () => <span aria-hidden="true" className={styles.checkIcon}>✓</span>;
const Arrow = () => <span aria-hidden="true">→</span>;
const tr = (isHindi: boolean, english: string, hindi: string) => isHindi ? hindi : english;

export function JudgeDemo() {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [view, setView] = useState<View>("login");
  const [statement, setStatement] = useState(complaint);
  const [routeConfirmed, setRouteConfirmed] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("Telecommunications · Mobile services · Activation and billing");
  const [assistanceAvailable, setAssistanceAvailable] = useState(true);
  const [copied, setCopied] = useState(false);
  const contentLocale = locale === "hi" ? "hi" : "en";
  const isHindi = contentLocale === "hi";
  const ui = copy[contentLocale];
  const signedIn = view !== "login";

  function resetDemo() {
    setStatement(locale === "hi" ? hindiComplaint : complaint);
    setRouteConfirmed(false);
    setSelectedRoute("Telecommunications · Mobile services · Activation and billing");
    setAssistanceAvailable(true);
    setCopied(false);
    setView("login");
  }

  return (
    <PrototypeShell contentLocale={contentLocale} locale={locale} onLocaleChange={(nextLocale) => {
      if (nextLocale === "hi" && statement === complaint) setStatement(hindiComplaint);
      if (nextLocale !== "hi" && statement === hindiComplaint) setStatement(complaint);
      setLocale(nextLocale);
    }}>
      {signedIn ? (
        <nav aria-label="Citizen account" className={styles.accountBar}>
          <div>
            <span className={styles.avatar} aria-hidden="true">AV</span>
            <span><strong>{tr(isHindi, "Asha Verma", "आशा वर्मा")}</strong><small>{tr(isHindi, "Fictional citizen account", "काल्पनिक नागरिक खाता")}</small></span>
          </div>
          <div className={styles.accountActions}>
            <button onClick={() => setView("dashboard")} type="button">{ui.dashboard}</button>
            <button onClick={() => setView("describe")} type="button">{ui.newGrievance}</button>
            <button onClick={resetDemo} type="button">{ui.signOut}</button>
          </div>
        </nav>
      ) : null}

      <main className={styles.main} id="main-content">
        {view === "login" ? <Login isHindi={isHindi} onSignIn={() => setView("dashboard")} label={ui.signIn} /> : null}
        {view === "dashboard" ? <Dashboard isHindi={isHindi} onNew={() => setView("describe")} onOpen={() => setView("case")} /> : null}
        {view === "describe" ? <Describe isHindi={isHindi} statement={statement} setStatement={setStatement} onBack={() => setView("dashboard")} onNext={() => setView("route")} /> : null}
        {view === "route" ? <RouteStep isHindi={isHindi} assistanceAvailable={assistanceAvailable} confirmed={routeConfirmed} onAssistanceChange={setAssistanceAvailable} onConfirm={() => setRouteConfirmed(true)} onBack={() => setView("describe")} onNext={() => setView("review")} onRouteChange={(route) => { setSelectedRoute(route); setRouteConfirmed(false); }} selectedRoute={selectedRoute} /> : null}
        {view === "review" ? <Review isHindi={isHindi} statement={statement} route={selectedRoute} onBack={() => setView("route")} onChangeDescription={() => setView("describe")} onChangeRoute={() => setView("route")} onSubmit={() => setView("submitted")} /> : null}
        {view === "submitted" ? <Submitted isHindi={isHindi} copied={copied} onCopy={() => setCopied(true)} onOpen={() => setView("case")} /> : null}
        {view === "case" ? <CaseDetail isHindi={isHindi} onAppeal={() => setView("appeal")} onBack={() => setView("dashboard")} /> : null}
        {view === "appeal" ? <Appeal isHindi={isHindi} onBack={() => setView("case")} onSubmit={() => setView("appeal-done")} /> : null}
        {view === "appeal-done" ? <AppealDone isHindi={isHindi} onDashboard={() => setView("dashboard")} /> : null}
      </main>
      <ServiceInformation isHindi={isHindi} />
    </PrototypeShell>
  );
}

function Login({ isHindi, onSignIn, label }: { isHindi: boolean; onSignIn: () => void; label: string }) {
  return (
    <div className={styles.loginGrid}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{tr(isHindi, "From complaint to accountable outcome", "शिकायत से जवाबदेह परिणाम तक")}</p>
        <h1>{tr(isHindi, "Know what happened.", "जानें क्या हुआ।")}<br />{tr(isHindi, "Know what happens next.", "जानें आगे क्या होगा।")}</h1>
        <p className={styles.lead}>{tr(isHindi, "A citizen-first redesign of the public grievance journey—clear routing, immediate reassurance, and outcome-by-outcome resolution.", "लोक शिकायत यात्रा का नागरिक-केंद्रित पुनःडिज़ाइन—स्पष्ट मार्ग, तुरंत भरोसा और हर माँग का अलग परिणाम।")}</p>
        <ul className={styles.benefits}>
          <li><CheckIcon /><span><strong>{tr(isHindi, "Describe first", "पहले समस्या बताएँ")}</strong><small>{tr(isHindi, "No department hunting before explaining the problem", "समस्या बताने से पहले विभाग खोजने की जरूरत नहीं")}</small></span></li>
          <li><CheckIcon /><span><strong>{tr(isHindi, "Track meaningful progress", "सार्थक प्रगति देखें")}</strong><small>{tr(isHindi, "Every update explains who acted and what comes next", "हर अपडेट बताएगा किसने क्या किया और आगे क्या होगा")}</small></span></li>
          <li><CheckIcon /><span><strong>{tr(isHindi, "Challenge only what is unresolved", "केवल अनसुलझे हिस्से पर अपील करें")}</strong><small>{tr(isHindi, "Appeal without retyping the complaint or evidence", "शिकायत या प्रमाण दोबारा लिखे बिना अपील")}</small></span></li>
        </ul>
      </section>

      <aside className={styles.loginCard} aria-labelledby="demo-account-heading">
        <p className={styles.demoBadge}>{tr(isHindi, "Instant judge access", "तुरंत डेमो प्रवेश")}</p>
        <h2 id="demo-account-heading">{tr(isHindi, "Explore a complete citizen journey", "पूरी नागरिक यात्रा देखें")}</h2>
        <p>{tr(isHindi, "Use a fictional grievance about mobile activation and a ₹499 charge. No real personal data is involved.", "मोबाइल सक्रियण और ₹499 शुल्क की काल्पनिक शिकायत देखें। इसमें कोई वास्तविक व्यक्तिगत डेटा नहीं है।")}</p>
        <div className={styles.identityCard}>
          <span className={styles.avatarLarge} aria-hidden="true">AV</span>
          <span><strong>आशा वर्मा</strong><small>{tr(isHindi, "Preferred language: Hindi", "पसंदीदा भाषा: हिन्दी")}</small><small>{tr(isHindi, "Case state: Partly resolved", "मामले की स्थिति: आंशिक समाधान")}</small></span>
        </div>
        <button className={styles.primaryButton} onClick={onSignIn} type="button">{label} <Arrow /></button>
        <p className={styles.microcopy}>{tr(isHindi, "No password required for this synthetic demonstration.", "इस काल्पनिक प्रदर्शन के लिए पासवर्ड की जरूरत नहीं है।")}</p>
        <RuntimeStatus isHindi={isHindi} />
      </aside>
    </div>
  );
}

function RuntimeStatus({ isHindi }: { isHindi: boolean }) {
  const [state, setState] = useState<"checking" | "ready" | "recoverable">("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetch("/api/ready", { cache: "no-store" })
      .then((response) => {
        if (active) setState(response.ok ? "ready" : "recoverable");
      })
      .catch(() => {
        if (active) setState("recoverable");
      });
    return () => { active = false; };
  }, [attempt]);

  return <div aria-live="polite" className={`${styles.runtimeStatus} ${state === "ready" ? styles.runtimeReady : ""}`}>
    <span aria-hidden="true" />
    <div><strong>{state === "checking" ? tr(isHindi, "Starting secure demo service…", "सुरक्षित डेमो सेवा शुरू हो रही है…") : state === "ready" ? tr(isHindi, "Demo service ready", "डेमो सेवा तैयार") : tr(isHindi, "Demo remains available", "डेमो अभी भी उपलब्ध है")}</strong>{state === "recoverable" ? <small>{tr(isHindi, "The database may be waking. The synthetic journey works while it recovers.", "डेटाबेस शुरू हो रहा हो सकता है। इस दौरान काल्पनिक यात्रा काम करती रहेगी।")}</small> : null}</div>
    {state === "recoverable" ? <button onClick={() => { setState("checking"); setAttempt((value) => value + 1); }} type="button">{tr(isHindi, "Retry", "फिर प्रयास करें")}</button> : null}
  </div>;
}

function Dashboard({ isHindi, onNew, onOpen }: { isHindi: boolean; onNew: () => void; onOpen: () => void }) {
  return (
    <>
      <header className={styles.pageHeader}>
        <div><p className={styles.eyebrow}>{tr(isHindi, "Citizen dashboard", "नागरिक डैशबोर्ड")}</p><h1>{tr(isHindi, "Good afternoon, Asha", "नमस्कार, आशा")}</h1><p>{tr(isHindi, "One place to lodge, understand, and follow up on your grievances.", "शिकायत दर्ज करने, समझने और आगे की कार्रवाई देखने के लिए एक ही स्थान।")}</p></div>
        <button className={styles.primaryButton} onClick={onNew} type="button">{tr(isHindi, "Lodge a grievance", "शिकायत दर्ज करें")} <Arrow /></button>
      </header>
      <section className={styles.assuranceStrip} aria-label="Service assurance">
        <div><strong>1</strong><span>{tr(isHindi, "Active grievance", "सक्रिय शिकायत")}</span></div><div><strong>2 of 2</strong><span>{tr(isHindi, "Outcomes reviewed", "माँगों की समीक्षा")}</span></div><div><strong>1</strong><span>{tr(isHindi, "Action still needed", "कार्रवाई बाकी")}</span></div>
      </section>
      <section aria-labelledby="grievances-heading" className={styles.section}>
        <div className={styles.sectionHeading}><div><h2 id="grievances-heading">{tr(isHindi, "My grievances", "मेरी शिकायतें")}</h2><p>{tr(isHindi, "Updated 25 August 2026", "25 अगस्त 2026 को अपडेट")}</p></div><span className={styles.countPill}>{tr(isHindi, "1 case", "1 मामला")}</span></div>
        <button className={styles.caseCard} onClick={onOpen} type="button">
          <span className={styles.caseTop}><span><small>{tr(isHindi, "Reference", "संदर्भ")}</small><strong>BWMI-TEL-2026-00499</strong></span><span className={styles.partialStatus}>{tr(isHindi, "Partly resolved", "आंशिक समाधान")}</span></span>
          <span className={styles.caseTitle}>{tr(isHindi, "Mobile service activation and ₹499 charge", "मोबाइल सेवा सक्रियण और ₹499 शुल्क")}</span>
          <span className={styles.routeText}>{tr(isHindi, "Telecommunications · Mobile services", "दूरसंचार · मोबाइल सेवाएँ")}</span>
          <span className={styles.outcomeMini}><span><CheckIcon /> {tr(isHindi, "Service activated", "सेवा सक्रिय")}</span><span className={styles.pendingIcon}>!</span><span>{tr(isHindi, "₹499 reversal still needs evidence", "₹499 वापसी के लिए प्रमाण बाकी")}</span></span>
          <span className={styles.caseAction}>{tr(isHindi, "View Resolution Receipt", "समाधान रसीद देखें")} <Arrow /></span>
        </button>
      </section>
    </>
  );
}

function Steps({ current, isHindi }: { current: 1 | 2 | 3; isHindi: boolean }) {
  return <ol className={styles.steps} aria-label={tr(isHindi, `Step ${current} of 3`, `3 में से चरण ${current}`)}><li className={current >= 1 ? styles.stepActive : ""}>1 <span>{tr(isHindi, "Describe", "विवरण")}</span></li><li className={current >= 2 ? styles.stepActive : ""}>2 <span>{tr(isHindi, "Confirm route", "मार्ग की पुष्टि")}</span></li><li className={current >= 3 ? styles.stepActive : ""}>3 <span>{tr(isHindi, "Review", "समीक्षा")}</span></li></ol>;
}

function Describe({ isHindi, statement, setStatement, onBack, onNext }: { isHindi: boolean; statement: string; setStatement: (value: string) => void; onBack: () => void; onNext: () => void }) {
  return <section className={styles.formPage}><Steps current={1} isHindi={isHindi} /><button className={styles.backLink} onClick={onBack} type="button">← {tr(isHindi, "Back to dashboard", "डैशबोर्ड पर वापस")}</button><div className={styles.formIntro}><p className={styles.eyebrow}>{tr(isHindi, "Step 1 of 3", "3 में से चरण 1")}</p><h1>{tr(isHindi, "Tell us what happened", "बताएँ क्या हुआ")}</h1><p>{tr(isHindi, "Use your own words. You do not need to know the responsible department.", "अपने शब्दों में लिखें। जिम्मेदार विभाग जानना जरूरी नहीं है।")}</p></div><label className={styles.field}><span>{tr(isHindi, "Your grievance", "आपकी शिकायत")}</span><small>{tr(isHindi, "Include what happened and what you want done.", "क्या हुआ और आप क्या समाधान चाहते हैं, यह लिखें।")}</small><textarea onChange={(event) => setStatement(event.target.value)} rows={7} value={statement} /></label><div className={styles.detectedBox}><span className={styles.spark} aria-hidden="true">✦</span><div><strong>{tr(isHindi, "Two requested outcomes detected", "दो माँगें पहचानी गईं")}</strong><ol><li>{tr(isHindi, "Activate the mobile service", "मोबाइल सेवा सक्रिय करें")}</li><li>{tr(isHindi, "Reverse the ₹499 charge if activation was late", "सक्रियण देर से हुआ तो ₹499 शुल्क वापस करें")}</li></ol><p>{tr(isHindi, "Your original words stay unchanged. You can review these before submission.", "आपके मूल शब्द नहीं बदले जाएँगे। जमा करने से पहले आप समीक्षा कर सकते हैं।")}</p></div></div><fieldset className={styles.evidence}><legend>{tr(isHindi, "Supporting evidence", "सहायक प्रमाण")} <span>{tr(isHindi, "Optional", "वैकल्पिक")}</span></legend><label><input defaultChecked type="checkbox" /> <span><strong>activation-receipt.pdf</strong><small>{tr(isHindi, "Fictional sample · 84 KB · Safety check passed", "काल्पनिक नमूना · 84 KB · सुरक्षा जाँच पूरी")}</small></span></label><label><input defaultChecked type="checkbox" /> <span><strong>support-ticket.txt</strong><small>{tr(isHindi, "Fictional sample · 3 KB · Safety check passed", "काल्पनिक नमूना · 3 KB · सुरक्षा जाँच पूरी")}</small></span></label></fieldset><div className={styles.formActions}><button className={styles.secondaryButton} onClick={onBack} type="button">{tr(isHindi, "Save and exit", "सहेजें और बाहर जाएँ")}</button><button className={styles.primaryButton} disabled={!statement.trim()} onClick={onNext} type="button">{tr(isHindi, "Find the right route", "सही मार्ग खोजें")} <Arrow /></button></div></section>;
}

const manualRoutes = [
  "Telecommunications · Mobile services · Activation and billing",
  "Financial services · Banking · Fee or charge issue",
  "Labour and employment · Portal or registration service",
  "Posts · Delayed or lost article",
] as const;

const hindiRoutes: Record<string, string> = {
  "Telecommunications · Mobile services · Activation and billing": "दूरसंचार · मोबाइल सेवाएँ · सक्रियण और बिलिंग",
  "Financial services · Banking · Fee or charge issue": "वित्तीय सेवाएँ · बैंकिंग · शुल्क संबंधी समस्या",
  "Labour and employment · Portal or registration service": "श्रम और रोजगार · पोर्टल या पंजीकरण सेवा",
  "Posts · Delayed or lost article": "डाक · विलंबित या खोया लेख",
};

function RouteStep({ isHindi, assistanceAvailable, confirmed, onAssistanceChange, onConfirm, onBack, onNext, onRouteChange, selectedRoute }: { isHindi: boolean; assistanceAvailable: boolean; confirmed: boolean; onAssistanceChange: (available: boolean) => void; onConfirm: () => void; onBack: () => void; onNext: () => void; onRouteChange: (route: string) => void; selectedRoute: string }) {
  const [manualOpen, setManualOpen] = useState(!assistanceAvailable);
  const routeParts = (isHindi ? (hindiRoutes[selectedRoute] ?? selectedRoute) : selectedRoute).split(" · ");

  return <section className={styles.formPage}><Steps current={2} isHindi={isHindi} /><button className={styles.backLink} onClick={onBack} type="button">← {tr(isHindi, "Back to description", "विवरण पर वापस")}</button><div className={styles.formIntro}><p className={styles.eyebrow}>{tr(isHindi, "Step 2 of 3", "3 में से चरण 2")}</p><h1>{tr(isHindi, "Confirm where this should go", "पुष्टि करें कि शिकायत कहाँ जाए")}</h1><p>{tr(isHindi, "This is a suggestion, not an automatic assignment. You remain in control.", "यह एक सुझाव है, स्वचालित आवंटन नहीं। अंतिम नियंत्रण आपके पास है।")}</p></div><div className={styles.presenterControl}><div><strong>{tr(isHindi, "Presenter control", "प्रस्तुतकर्ता नियंत्रण")}</strong><small>{tr(isHindi, "Prove that the journey still works without assistance.", "दिखाएँ कि सहायता बंद होने पर भी यात्रा पूरी होती है।")}</small></div><label><input checked={assistanceAvailable} onChange={(event) => { onAssistanceChange(event.target.checked); setManualOpen(!event.target.checked); }} type="checkbox" /> {tr(isHindi, "Assistance available", "सहायता उपलब्ध")}</label></div>{assistanceAvailable && !manualOpen ? <article className={`${styles.routeCard} ${confirmed ? styles.routeConfirmed : ""}`}><div className={styles.routeHeader}><span className={styles.routeIcon} aria-hidden="true">⌁</span><div><p>{tr(isHindi, "Suggested route", "सुझाया गया मार्ग")}</p><h2>{routeParts[0]}</h2><p>{routeParts.slice(1).join(" → ")}</p></div>{confirmed ? <span className={styles.confirmedBadge}><CheckIcon /> {tr(isHindi, "Confirmed", "पुष्टि हुई")}</span> : null}</div><div className={styles.reason}><strong>{tr(isHindi, "Why this route?", "यही मार्ग क्यों?")}</strong><p>{tr(isHindi, "Your grievance mentions mobile-service activation and a related charge. This fictional route handles both outcomes together.", "आपकी शिकायत में मोबाइल सेवा सक्रियण और संबंधित शुल्क का उल्लेख है। यह काल्पनिक मार्ग दोनों माँगों को साथ संभालता है।")}</p></div><div className={styles.routeActions}><button className={styles.primaryButton} onClick={onConfirm} type="button">{confirmed ? tr(isHindi, "Route confirmed", "मार्ग की पुष्टि हुई") : tr(isHindi, "Use this route", "यह मार्ग चुनें")}</button><button className={styles.textButton} onClick={() => setManualOpen(true)} type="button">{tr(isHindi, "Choose another route", "दूसरा मार्ग चुनें")}</button></div></article> : <fieldset className={styles.manualRoutes}><legend>{tr(isHindi, "Search or browse the fictional service catalogue", "काल्पनिक सेवा सूची खोजें या देखें")}</legend><p>{tr(isHindi, "Select the closest route. You can still change it during review.", "सबसे उपयुक्त मार्ग चुनें। समीक्षा के समय इसे बदला जा सकता है।")}</p>{manualRoutes.map((route) => { const parts = (isHindi ? (hindiRoutes[route] ?? route) : route).split(" · "); return <label key={route}><input checked={selectedRoute === route} name="manual-route" onChange={() => onRouteChange(route)} type="radio" /><span><strong>{parts[0]}</strong><small>{parts.slice(1).join(" → ")}</small></span></label>; })}<button className={styles.primaryButton} onClick={onConfirm} type="button">{tr(isHindi, "Confirm selected route", "चुने मार्ग की पुष्टि करें")}</button>{assistanceAvailable ? <button className={styles.textButton} onClick={() => setManualOpen(false)} type="button">{tr(isHindi, "Return to suggestion", "सुझाव पर वापस")}</button> : null}</fieldset>}<aside className={styles.safetyNote}><strong>{tr(isHindi, "AI assistance is optional", "AI सहायता वैकल्पिक है")}</strong><p>{tr(isHindi, "If suggestions are unavailable, search and browse always remain available. No grievance is rejected automatically.", "सुझाव उपलब्ध न होने पर खोज और सूची हमेशा उपलब्ध रहती है। कोई शिकायत अपने-आप अस्वीकार नहीं होती।")}</p></aside><div className={styles.formActions}><button className={styles.secondaryButton} onClick={onBack} type="button">{tr(isHindi, "Back", "वापस")}</button><button className={styles.primaryButton} disabled={!confirmed} onClick={onNext} type="button">{tr(isHindi, "Review grievance", "शिकायत की समीक्षा करें")} <Arrow /></button></div></section>;
}

function Review({ isHindi, statement, route, onBack, onSubmit, onChangeDescription, onChangeRoute }: { isHindi: boolean; statement: string; route: string; onBack: () => void; onSubmit: () => void; onChangeDescription: () => void; onChangeRoute: () => void }) {
  const shownRoute = isHindi ? (hindiRoutes[route] ?? route) : route;
  return <section className={styles.formPage}><Steps current={3} isHindi={isHindi} /><button className={styles.backLink} onClick={onBack} type="button">← {tr(isHindi, "Back to route", "मार्ग पर वापस")}</button><div className={styles.formIntro}><p className={styles.eyebrow}>{tr(isHindi, "Step 3 of 3", "3 में से चरण 3")}</p><h1>{tr(isHindi, "Review before submitting", "जमा करने से पहले समीक्षा")}</h1><p>{tr(isHindi, "Nothing will be sent to a real government system.", "किसी वास्तविक सरकारी प्रणाली को कुछ नहीं भेजा जाएगा।")}</p></div><div className={styles.reviewList}><ReviewItem title={tr(isHindi, "Your grievance", "आपकी शिकायत")} action={tr(isHindi, "Change description", "विवरण बदलें")} onAction={onChangeDescription}><p>{statement}</p></ReviewItem><ReviewItem title={tr(isHindi, "Requested outcomes", "माँगे गए परिणाम")} action={tr(isHindi, "Change outcomes", "माँगें बदलें")} onAction={onChangeDescription}><ol><li>{tr(isHindi, "Activate the mobile service", "मोबाइल सेवा सक्रिय करें")}</li><li>{tr(isHindi, "Reverse the ₹499 charge if activation was late", "सक्रियण देर से हुआ तो ₹499 शुल्क वापस करें")}</li></ol></ReviewItem><ReviewItem title={tr(isHindi, "Confirmed route", "पुष्ट मार्ग")} action={tr(isHindi, "Change route", "मार्ग बदलें")} onAction={onChangeRoute}><p><strong>{shownRoute.split(" · ")[0]}</strong><br />{shownRoute.split(" · ").slice(1).join(" → ")}</p></ReviewItem><ReviewItem title={tr(isHindi, "Evidence", "प्रमाण")} action={tr(isHindi, "Change evidence", "प्रमाण बदलें")} onAction={onChangeDescription}><p>activation-receipt.pdf · support-ticket.txt</p></ReviewItem></div><label className={styles.confirmCheck}><input type="checkbox" defaultChecked /><span>{tr(isHindi, "I confirm this fictional demonstration grievance is ready to submit.", "मैं पुष्टि करता/करती हूँ कि यह काल्पनिक प्रदर्शन शिकायत जमा करने के लिए तैयार है।")}</span></label><div className={styles.formActions}><button className={styles.secondaryButton} onClick={onBack} type="button">{tr(isHindi, "Back", "वापस")}</button><button className={styles.primaryButton} onClick={onSubmit} type="button">{tr(isHindi, "Submit demonstration grievance", "प्रदर्शन शिकायत जमा करें")} <Arrow /></button></div></section>;
}

function ReviewItem({ title, action, children, onAction }: { title: string; action: string; children: React.ReactNode; onAction: () => void }) { return <section className={styles.reviewItem}><div><h2>{title}</h2>{children}</div><button onClick={onAction} type="button">{action}</button></section>; }

function Submitted({ isHindi, copied, onCopy, onOpen }: { isHindi: boolean; copied: boolean; onCopy: () => void; onOpen: () => void }) {
  return <section className={styles.successPage}><span className={styles.successMark} aria-hidden="true">✓</span><p className={styles.eyebrow}>{tr(isHindi, "Received once · Synthetic submission", "एक बार प्राप्त · काल्पनिक जमा")}</p><h1>{tr(isHindi, "Your grievance has been received", "आपकी शिकायत प्राप्त हो गई है")}</h1><p className={styles.lead}>{tr(isHindi, "You do not need to submit it again. The next update is expected by 27 August 2026.", "इसे दोबारा जमा करने की जरूरत नहीं है। अगला अपडेट 27 अगस्त 2026 तक अपेक्षित है।")}</p><div className={styles.receiptSummary}><div><small>{tr(isHindi, "Reference", "संदर्भ")}</small><strong>BWMI-TEL-2026-00499</strong><button onClick={onCopy} type="button">{copied ? tr(isHindi, "Copied", "कॉपी हुआ") : tr(isHindi, "Copy reference", "संदर्भ कॉपी करें")}</button></div><div><small>{tr(isHindi, "Sent to", "यहाँ भेजा गया")}</small><strong>{tr(isHindi, "Telecommunications", "दूरसंचार")}</strong><span>{tr(isHindi, "Mobile services", "मोबाइल सेवाएँ")}</span></div><div><small>{tr(isHindi, "Current state", "वर्तमान स्थिति")}</small><strong>{tr(isHindi, "Acknowledged", "प्राप्ति स्वीकार")}</strong><span>{tr(isHindi, "Received at 3:42 PM", "3:42 बजे प्राप्त")}</span></div></div><section className={styles.nextStep}><span aria-hidden="true">1</span><div><strong>{tr(isHindi, "What happens next", "आगे क्या होगा")}</strong><p>{tr(isHindi, "A fictional grievance officer reviews both requested outcomes. Every action will appear in your timeline with a reason and next step.", "एक काल्पनिक शिकायत अधिकारी दोनों माँगों की समीक्षा करेगा। हर कार्रवाई कारण और अगले कदम के साथ समयरेखा में दिखेगी।")}</p></div></section><div className={styles.centerActions}><button className={styles.primaryButton} onClick={onOpen} type="button">{tr(isHindi, "View live case timeline", "मामले की समयरेखा देखें")} <Arrow /></button></div></section>;
}

function CaseDetail({ isHindi, onAppeal, onBack }: { isHindi: boolean; onAppeal: () => void; onBack: () => void }) {
  return <section><button className={styles.backLink} onClick={onBack} type="button">← {tr(isHindi, "Back to my grievances", "मेरी शिकायतों पर वापस")}</button><header className={styles.caseHeader}><div><p className={styles.eyebrow}>{tr(isHindi, "Resolution Receipt · Version 1", "समाधान रसीद · संस्करण 1")}</p><h1>{tr(isHindi, "Mobile service activation and ₹499 charge", "मोबाइल सेवा सक्रियण और ₹499 शुल्क")}</h1><p>{tr(isHindi, "Reference BWMI-TEL-2026-00499 · Issued 25 August 2026", "संदर्भ BWMI-TEL-2026-00499 · 25 अगस्त 2026 को जारी")}</p></div><span className={styles.partialStatus}>{tr(isHindi, "Partly resolved", "आंशिक समाधान")}</span></header><div className={styles.receiptIntro}><strong>{tr(isHindi, "One outcome was completed. One still needs action.", "एक माँग पूरी हुई। एक पर कार्रवाई बाकी है।")}</strong><p>{tr(isHindi, "This receipt compares each thing you asked for with the action taken and the evidence provided.", "यह रसीद आपकी हर माँग की तुलना की गई कार्रवाई और उपलब्ध प्रमाण से करती है।")}</p></div><div className={styles.outcomeGrid}><Outcome isHindi={isHindi} result={tr(isHindi, "Resolved", "समाधान हुआ")} tone="success" title={tr(isHindi, "1. Activate the mobile service", "1. मोबाइल सेवा सक्रिय करें")} action={tr(isHindi, "Activation instruction completed", "सक्रियण निर्देश पूरा किया गया")} evidence={tr(isHindi, "Fictional activation confirmation · 25 Aug, 2:10 PM", "काल्पनिक सक्रियण पुष्टि · 25 अगस्त, 2:10 बजे")} gap={tr(isHindi, "Nothing missing", "कुछ बाकी नहीं")} /><Outcome isHindi={isHindi} result={tr(isHindi, "Partly resolved", "आंशिक समाधान")} tone="warning" title={tr(isHindi, "2. Reverse the ₹499 charge", "2. ₹499 शुल्क वापस करें")} action={tr(isHindi, "Charge reviewed, but no reversal was recorded", "शुल्क की समीक्षा हुई, लेकिन वापसी दर्ज नहीं हुई")} evidence={tr(isHindi, "Fictional billing-note reference · 25 Aug, 2:18 PM", "काल्पनिक बिलिंग नोट · 25 अगस्त, 2:18 बजे")} gap={tr(isHindi, "Refund decision and evidence are missing", "रिफंड निर्णय और प्रमाण उपलब्ध नहीं हैं")} /></div><section className={styles.timelineSection}><h2>{tr(isHindi, "Case timeline", "मामले की समयरेखा")}</h2><ol className={styles.timeline}><Timeline time={tr(isHindi, "25 Aug · 2:20 PM", "25 अगस्त · 2:20 बजे")} title={tr(isHindi, "Resolution Receipt issued", "समाधान रसीद जारी")} text={tr(isHindi, "Activation resolved; ₹499 reversal still needs evidence.", "सक्रियण पूरा; ₹499 वापसी के प्रमाण बाकी।")} current /><Timeline time={tr(isHindi, "25 Aug · 2:18 PM", "25 अगस्त · 2:18 बजे")} title={tr(isHindi, "Charge review recorded", "शुल्क समीक्षा दर्ज")} text={tr(isHindi, "No reversal evidence was attached.", "वापसी का कोई प्रमाण संलग्न नहीं था।")} /><Timeline time={tr(isHindi, "25 Aug · 2:10 PM", "25 अगस्त · 2:10 बजे")} title={tr(isHindi, "Service activation completed", "सेवा सक्रियण पूरा")} text={tr(isHindi, "Activation confirmation was added.", "सक्रियण पुष्टि जोड़ी गई।")} /><Timeline time={tr(isHindi, "24 Aug · 3:42 PM", "24 अगस्त · 3:42 बजे")} title={tr(isHindi, "Grievance received", "शिकायत प्राप्त")} text={tr(isHindi, "Both requested outcomes were recorded.", "दोनों माँगें दर्ज की गईं।")} /></ol></section><section className={styles.appealCallout}><div><p className={styles.eyebrow}>{tr(isHindi, "Something still unresolved?", "कुछ अभी भी अनसुलझा है?")}</p><h2>{tr(isHindi, "Appeal only the ₹499 charge decision", "केवल ₹499 शुल्क निर्णय पर अपील करें")}</h2><p>{tr(isHindi, "Your original grievance, route, evidence, and receipt are carried forward automatically.", "आपकी मूल शिकायत, मार्ग, प्रमाण और रसीद अपने-आप आगे जोड़े जाएँगे।")}</p></div><button className={styles.primaryButton} onClick={onAppeal} type="button">{tr(isHindi, "Start focused appeal", "केंद्रित अपील शुरू करें")} <Arrow /></button></section></section>;
}

function Outcome({ isHindi, result, tone, title, action, evidence, gap }: { isHindi: boolean; result: string; tone: "success" | "warning"; title: string; action: string; evidence: string; gap: string }) { return <article className={styles.outcomeCard}><div className={styles.outcomeHeading}><h2>{title}</h2><span className={tone === "success" ? styles.resolvedStatus : styles.partialStatus}>{tone === "success" ? "✓ " : "! "}{result}</span></div><dl><div><dt>{tr(isHindi, "What was done", "क्या किया गया")}</dt><dd>{action}</dd></div><div><dt>{tr(isHindi, "Evidence used", "प्रयुक्त प्रमाण")}</dt><dd>{evidence}</dd></div><div><dt>{tr(isHindi, "What is still missing", "क्या अभी भी बाकी है")}</dt><dd>{gap}</dd></div></dl></article>; }
function Timeline({ time, title, text, current = false }: { time: string; title: string; text: string; current?: boolean }) { return <li className={current ? styles.timelineCurrent : ""}><span aria-hidden="true" /><div><time>{time}</time><strong>{title}</strong><p>{text}</p></div></li>; }

function Appeal({ isHindi, onBack, onSubmit }: { isHindi: boolean; onBack: () => void; onSubmit: () => void }) {
  return <section className={styles.formPage}><button className={styles.backLink} onClick={onBack} type="button">← {tr(isHindi, "Back to Resolution Receipt", "समाधान रसीद पर वापस")}</button><div className={styles.formIntro}><p className={styles.eyebrow}>{tr(isHindi, "Context-preserving appeal", "संदर्भ सुरक्षित रखने वाली अपील")}</p><h1>{tr(isHindi, "Appeal the unresolved ₹499 charge", "अनसुलझे ₹499 शुल्क पर अपील करें")}</h1><p>{tr(isHindi, "The relevant case information is already attached. Add only what is new.", "संबंधित मामले की जानकारी पहले से जुड़ी है। केवल नई बात जोड़ें।")}</p></div><section className={styles.inherited}><h2>{tr(isHindi, "Carried forward automatically", "अपने-आप आगे जोड़ा गया")}</h2><ul><li><CheckIcon /> {tr(isHindi, "Original grievance and two requested outcomes", "मूल शिकायत और दो माँगें")}</li><li><CheckIcon /> {tr(isHindi, "Confirmed telecommunications route", "पुष्ट दूरसंचार मार्ग")}</li><li><CheckIcon /> {tr(isHindi, "Two fictional evidence files", "दो काल्पनिक प्रमाण फ़ाइलें")}</li><li><CheckIcon /> {tr(isHindi, "Resolution Receipt version 1", "समाधान रसीद संस्करण 1")}</li></ul></section><fieldset className={styles.disputed}><legend>{tr(isHindi, "Outcome being disputed", "विवादित परिणाम")}</legend><label><input checked readOnly type="checkbox" /><span><strong>{tr(isHindi, "Reverse the ₹499 charge", "₹499 शुल्क वापस करें")}</strong><small>{tr(isHindi, "Partly resolved · Refund decision/evidence missing", "आंशिक समाधान · रिफंड निर्णय/प्रमाण बाकी")}</small></span></label></fieldset><label className={styles.field}><span>{tr(isHindi, "Why are you appealing?", "आप अपील क्यों कर रहे हैं?")}</span><small>{tr(isHindi, "Explain only what is missing or incorrect.", "केवल बताएं कि क्या गलत या अधूरा है।")}</small><textarea defaultValue={tr(isHindi, "The ₹499 charge has not been reversed, and the receipt contains no refund decision or supporting evidence. Please review this unresolved outcome.", "₹499 शुल्क वापस नहीं हुआ है और रसीद में रिफंड निर्णय या सहायक प्रमाण नहीं है। कृपया इस अनसुलझी माँग की समीक्षा करें।")} rows={5} /></label><div className={styles.formActions}><button className={styles.secondaryButton} onClick={onBack} type="button">{tr(isHindi, "Save and exit", "सहेजें और बाहर जाएँ")}</button><button className={styles.primaryButton} onClick={onSubmit} type="button">{tr(isHindi, "Submit demonstration appeal", "प्रदर्शन अपील जमा करें")} <Arrow /></button></div></section>;
}

function AppealDone({ isHindi, onDashboard }: { isHindi: boolean; onDashboard: () => void }) { return <section className={styles.successPage}><span className={styles.successMark} aria-hidden="true">✓</span><p className={styles.eyebrow}>{tr(isHindi, "Appeal received · Synthetic submission", "अपील प्राप्त · काल्पनिक जमा")}</p><h1>{tr(isHindi, "You did not have to start again", "आपको फिर से शुरुआत नहीं करनी पड़ी")}</h1><p className={styles.lead}>{tr(isHindi, "The disputed ₹499 outcome and its full history were carried into the appeal. This is the assured journey.", "विवादित ₹499 माँग और उसका पूरा इतिहास अपील में अपने-आप जुड़ गया। यही सुनिश्चित यात्रा है।")}</p><div className={styles.centerActions}><button className={styles.primaryButton} onClick={onDashboard} type="button">{tr(isHindi, "Return to dashboard", "डैशबोर्ड पर लौटें")} <Arrow /></button></div></section>; }

function ServiceInformation({ isHindi }: { isHindi: boolean }) {
  return <section aria-label={tr(isHindi, "Service information", "सेवा जानकारी")} className={styles.serviceInformation}>
    <div className={styles.serviceInfoGrid}>
      <article id="help"><p className={styles.eyebrow}>{tr(isHindi, "Help and accessibility", "सहायता और सुगम्यता")}</p><h2>{tr(isHindi, "Use the service with confidence", "सेवा का भरोसे से उपयोग करें")}</h2><p>{tr(isHindi, "This browser-first prototype works with keyboard navigation, touch, zoom and screen readers. The main route also works when assistance is switched off.", "यह ब्राउज़र-आधारित प्रोटोटाइप कीबोर्ड, स्पर्श, ज़ूम और स्क्रीन रीडर के साथ काम करता है। सहायता बंद होने पर भी मुख्य यात्रा पूरी होती है।")}</p></article>
      <article><p className={styles.eyebrow}>{tr(isHindi, "Before you lodge", "दर्ज करने से पहले")}</p><h2>{tr(isHindi, "Some matters use another path", "कुछ मामलों के लिए दूसरा मार्ग है")}</h2><ul><li>{tr(isHindi, "RTI requests use the RTI portal.", "RTI अनुरोध RTI पोर्टल पर जाएँ।")}</li><li>{tr(isHindi, "Pension grievances use the dedicated pension route.", "पेंशन शिकायतें समर्पित पेंशन मार्ग पर जाएँ।")}</li><li>{tr(isHindi, "Court, religious and emergency matters require the appropriate channel.", "अदालत, धार्मिक और आपात मामलों के लिए उचित माध्यम चुनें।")}</li></ul></article>
      <article id="privacy"><p className={styles.eyebrow}>{tr(isHindi, "Privacy", "गोपनीयता")}</p><h2>{tr(isHindi, "No real citizen data", "कोई वास्तविक नागरिक डेटा नहीं")}</h2><p>{tr(isHindi, "Every name, reference, document and action is fictional. The prototype does not connect to CPGRAMS, OTP, email, messaging or government identity systems.", "हर नाम, संदर्भ, दस्तावेज़ और कार्रवाई काल्पनिक है। प्रोटोटाइप CPGRAMS, OTP, ईमेल, संदेश या सरकारी पहचान प्रणाली से नहीं जुड़ता।")}</p></article>
      <article id="limitations"><p className={styles.eyebrow}>{tr(isHindi, "Prototype limitations", "प्रोटोटाइप की सीमाएँ")}</p><h2>{tr(isHindi, "Mock service, honest claims", "काल्पनिक सेवा, ईमानदार दावे")}</h2><p>{tr(isHindi, "Routing, submissions, notifications and officer actions are simulated. The interface demonstrates a proposed journey, not an official government decision.", "मार्ग, जमा, सूचनाएँ और अधिकारी कार्रवाई काल्पनिक हैं। यह इंटरफ़ेस प्रस्तावित यात्रा दिखाता है, आधिकारिक सरकारी निर्णय नहीं।")}</p></article>
    </div>
    <aside className={styles.noFeeNotice}><strong>{tr(isHindi, "There is no government fee for filing a grievance.", "शिकायत दर्ज करने का कोई सरकारी शुल्क नहीं है।")}</strong><span>{tr(isHindi, "This prototype never requests payment, an OTP or personal documents.", "यह प्रोटोटाइप कभी भुगतान, OTP या व्यक्तिगत दस्तावेज़ नहीं माँगता।")}</span></aside>
  </section>;
}
