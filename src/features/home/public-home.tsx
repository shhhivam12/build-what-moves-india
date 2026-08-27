"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CivicShell, type ShellUser } from "@/src/design-system/components/civic-shell";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { ConstitutionArt, IndiaGateArt, ParliamentArt } from "./civic-vector-art";
import styles from "./public-home.module.css";

const homeCopy = {
  en: {
    heroKicker: "Centralised Public Grievance Redress and Monitoring System", heroTitle: <>Public Grievance<br />Redressal Portal</>,
    lead: "Lodge and monitor grievances relating to public service delivery by Central and State Government organisations.", lodge: "Lodge Public Grievance", viewStatus: "View Status", serviceNote: "Online grievance services are available 24 × 7. No fee is charged.",
    welcomeKicker: "Citizen assistance", welcomeTitle: <>We regret the<br />inconvenience.</>, welcomeBody: "We are with you in finding a resolution.",
    citizenServices: "Citizen Services", serviceSub: "नागरिक सेवाएं", helpPortal: "Need help using the portal?",
    quick: [
      ["Lodge grievance", "Register a new grievance"], ["View status", "Track an existing grievance"], ["Appeal", "Review eligible cases"],
    ],
    banners: [
      ["Public grievance redressal", "Responsive governance through citizen participation"], ["Digital India", "Digital services for every citizen"], ["Important", "CPGRAMS does not charge any fee"],
    ],
    onlineServices: "Online Services", assist: "How may we assist you?", faq: "Frequently asked questions",
    services: [
      { icon: "add", title: "Lodge Public Grievance", body: "Register a grievance relating to public service delivery.", href: "/grievances/new", tone: "saffron" },
      { icon: "search", title: "View Grievance Status", body: "Check the latest action using your registration number.", href: "/track", tone: "green" },
      { icon: "appeal", title: "File an Appeal", body: "Submit an appeal for an eligible closed grievance.", href: "/dashboard", tone: "sand" },
      { icon: "pension", title: "Pension Grievance", body: "Proceed to the dedicated pension grievance service.", href: "/help#eligible", tone: "ivory" },
    ],
    heritageKicker: "Digital governance rooted in India", heritageTitle: "Public service with an Indian civic identity", heritageBody: "A modern service experience inspired by India’s democratic institutions, constitutional values and citizen participation.",
    heritage: [["Parliament", "Democratic accountability"], ["India Gate", "Service and remembrance"], ["Constitution", "Rights and public duty"]],
    legacyKicker: "Service and national purpose", legacyTitle: "Rooted in public duty. Built for every citizen.", legacyBody: "India’s public institutions carry a living tradition of service, participation and responsive governance.", gandhiName: "Mahatma Gandhi", gandhiLabel: "A legacy of service and civic responsibility", gandhiQuote: "Service is not possible unless it is rooted in love or ahimsa.", gandhiQuoteSource: "Quote source", gandhiPhotoSource: "Public-domain photograph, 1940 · Wikimedia Commons", pmName: "Shri Narendra Modi", pmLabel: "Prime Minister of India", pmBody: "Official portrait sourced from the Prime Minister’s Office website.", officialProfile: "View official profile", portraitSource: "Official PM India photograph",
    processKicker: "Grievance Process", processTitle: "From registration to disposal", processBody: "The registration number remains available in your dashboard and can be used to view the latest action.",
    process: [["Register", "Enter grievance details and the relief requested"], ["Forwarded", "Sent to the concerned Ministry Department or State"], ["Action Taken", "View the response and supporting information"], ["Appeal", "File an appeal when the case is eligible"]],
    noticeKicker: "Public Notice", noticeTitle: "Matters not taken up as public grievances", noticeItems: ["Right to Information matters", "Court-related or subjudice matters", "Religious matters", "Government employee service matters before prescribed channels are exhausted"], noticeLink: "View detailed guidance",
    helpKicker: "Assistance", helpTitle: "Help with grievance registration", helpBody: "Guidance is available for choosing the correct organisation writing grievance details and understanding status updates.", helpCentre: "Open Help Centre", officialPortal: "Official portal",
    governmentServices: "Government Digital Services",
    tourProgress: "Portal guidance", tourTitles: ["Choose the required service", "Enter grievance details", "Keep the registration number"],
    tourBodies: ["Use Lodge Public Grievance for a new matter or View Status for an existing registration number.", "Describe the public service issue and specify the action you are requesting. Review the selected organisation before submission.", "A registration number is issued after submission. Use it to view action taken and file an appeal where applicable."],
    close: "Close", next: "Next", continue: "Continue to portal", closeGuidance: "Close guidance",
  },
  hi: {
    heroKicker: "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली", heroTitle: <>लोक शिकायत<br />निवारण पोर्टल</>,
    lead: "केंद्र और राज्य सरकार के संगठनों की सार्वजनिक सेवाओं से संबंधित शिकायत दर्ज करें और उनकी प्रगति देखें।", lodge: "लोक शिकायत दर्ज करें", viewStatus: "स्थिति देखें", serviceNote: "ऑनलाइन शिकायत सेवाएँ 24 × 7 उपलब्ध हैं। कोई शुल्क नहीं लिया जाता।",
    welcomeKicker: "नागरिक सहायता", welcomeTitle: <>असुविधा के लिए<br />खेद है।</>, welcomeBody: "समाधान के लिए हम आपके साथ हैं।",
    citizenServices: "नागरिक सेवाएँ", serviceSub: "Citizen Services", helpPortal: "पोर्टल उपयोग में सहायता चाहिए?",
    quick: [["शिकायत दर्ज करें", "नई शिकायत पंजीकृत करें"], ["स्थिति देखें", "मौजूदा शिकायत की प्रगति देखें"], ["अपील", "पात्र मामलों की समीक्षा करें"]],
    banners: [["जन शिकायत निवारण", "नागरिक सहभागिता से उत्तरदायी शासन"], ["डिजिटल इंडिया", "प्रत्येक नागरिक के लिए डिजिटल सेवाएँ"], ["महत्वपूर्ण", "सीपीग्राम्स कोई शुल्क नहीं लेता"]],
    onlineServices: "ऑनलाइन सेवाएँ", assist: "हम आपकी कैसे सहायता कर सकते हैं?", faq: "अक्सर पूछे जाने वाले प्रश्न",
    services: [
      { icon: "add", title: "लोक शिकायत दर्ज करें", body: "सार्वजनिक सेवा वितरण से संबंधित शिकायत पंजीकृत करें।", href: "/grievances/new", tone: "saffron" },
      { icon: "search", title: "शिकायत की स्थिति देखें", body: "पंजीकरण संख्या से नवीनतम कार्रवाई देखें।", href: "/track", tone: "green" },
      { icon: "appeal", title: "अपील दर्ज करें", body: "पात्र निस्तारित शिकायत पर अपील प्रस्तुत करें।", href: "/dashboard", tone: "sand" },
      { icon: "pension", title: "पेंशन शिकायत", body: "समर्पित पेंशन शिकायत सेवा पर जाएँ।", href: "/help#eligible", tone: "ivory" },
    ],
    heritageKicker: "भारत में निहित डिजिटल शासन", heritageTitle: "भारतीय नागरिक पहचान के साथ सार्वजनिक सेवा", heritageBody: "भारत की लोकतांत्रिक संस्थाओं, संवैधानिक मूल्यों और नागरिक सहभागिता से प्रेरित आधुनिक सेवा अनुभव।",
    heritage: [["संसद", "लोकतांत्रिक जवाबदेही"], ["इंडिया गेट", "सेवा और स्मरण"], ["संविधान", "अधिकार और सार्वजनिक कर्तव्य"]],
    legacyKicker: "सेवा और राष्ट्रीय संकल्प", legacyTitle: "लोक कर्तव्य में निहित। प्रत्येक नागरिक के लिए निर्मित।", legacyBody: "भारत की सार्वजनिक संस्थाएँ सेवा, सहभागिता और उत्तरदायी शासन की जीवंत परंपरा को आगे बढ़ाती हैं।", gandhiName: "महात्मा गांधी", gandhiLabel: "सेवा और नागरिक दायित्व की विरासत", gandhiQuote: "प्रेम या अहिंसा में निहित हुए बिना सेवा संभव नहीं है।", gandhiQuoteSource: "उद्धरण स्रोत", gandhiPhotoSource: "सार्वजनिक डोमेन चित्र, 1940 · विकिमीडिया कॉमन्स", pmName: "श्री नरेंद्र मोदी", pmLabel: "भारत के प्रधानमंत्री", pmBody: "प्रधानमंत्री कार्यालय की वेबसाइट से प्राप्त आधिकारिक चित्र।", officialProfile: "आधिकारिक परिचय देखें", portraitSource: "आधिकारिक पीएम इंडिया चित्र",
    processKicker: "शिकायत प्रक्रिया", processTitle: "पंजीकरण से निस्तारण तक", processBody: "पंजीकरण संख्या आपके डैशबोर्ड में उपलब्ध रहती है और उससे नवीनतम कार्रवाई देखी जा सकती है।",
    process: [["पंजीकरण", "शिकायत और अपेक्षित राहत दर्ज करें"], ["अग्रेषित", "संबंधित मंत्रालय विभाग या राज्य को भेजा जाता है"], ["कार्रवाई", "उत्तर और सहायक जानकारी देखें"], ["अपील", "पात्र होने पर अपील दर्ज करें"]],
    noticeKicker: "सार्वजनिक सूचना", noticeTitle: "वे विषय जिन्हें लोक शिकायत के रूप में नहीं लिया जाता", noticeItems: ["सूचना का अधिकार संबंधी विषय", "न्यायालय या विचाराधीन विषय", "धार्मिक विषय", "निर्धारित माध्यम पूर्ण करने से पहले सरकारी कर्मचारी सेवा विषय"], noticeLink: "विस्तृत मार्गदर्शन देखें",
    helpKicker: "सहायता", helpTitle: "शिकायत पंजीकरण में सहायता", helpBody: "सही संगठन चुनने, शिकायत लिखने और स्थिति समझने के लिए मार्गदर्शन उपलब्ध है।", helpCentre: "सहायता केंद्र खोलें", officialPortal: "आधिकारिक पोर्टल",
    governmentServices: "सरकारी डिजिटल सेवाएँ",
    tourProgress: "पोर्टल मार्गदर्शन", tourTitles: ["आवश्यक सेवा चुनें", "शिकायत विवरण दर्ज करें", "पंजीकरण संख्या सुरक्षित रखें"],
    tourBodies: ["नई शिकायत के लिए लोक शिकायत दर्ज करें या मौजूदा पंजीकरण संख्या के लिए स्थिति देखें चुनें।", "सार्वजनिक सेवा की समस्या और अपेक्षित कार्रवाई स्पष्ट लिखें। जमा करने से पहले चुने गए संगठन की समीक्षा करें।", "जमा करने के बाद पंजीकरण संख्या जारी होती है। कार्रवाई और पात्र अपील देखने के लिए इसका उपयोग करें।"],
    close: "बंद करें", next: "आगे", continue: "पोर्टल पर जाएँ", closeGuidance: "मार्गदर्शन बंद करें",
  },
} as const;

type ServiceIconName = "add" | "search" | "appeal" | "pension";

function ServiceIcon({ name }: { name: ServiceIconName }) {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    {name === "add" ? <><path d="M12 5v14M5 12h14" /><path d="M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5Z" /></> : null}
    {name === "search" ? <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 5 5" /></> : null}
    {name === "appeal" ? <><path d="M7 17 17 7M9 7h8v8" /><path d="M5 4.5h5M4.5 5v14.5H19v-5" /></> : null}
    {name === "pension" ? <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2M8.5 4.5 7 2.75M15.5 4.5 17 2.75" /></> : null}
  </svg>;
}

function ChakraIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="24" />
    <circle cx="32" cy="32" r="3" />
    {Array.from({ length: 12 }, (_, index) => <path d="M32 8v21" key={index} transform={`rotate(${index * 30} 32 32)`} />)}
  </svg>;
}

export function PublicHome({ user }: { user: ShellUser }) {
  const { contentLocale } = useCivicLanguage();
  const copy = homeCopy[contentLocale];
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const closeTour = () => setTourOpen(false);

  return <CivicShell user={user}>
    <main id="main-content">
      <section className={styles.hero}>
        <div className={styles.chakra}><ChakraIcon /></div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.hindiTitle}>{copy.heroKicker}</p>
            <h1>{copy.heroTitle}</h1>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>{copy.lodge} <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondaryButton} href="/track">{copy.viewStatus} <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.serviceNote}><span aria-hidden="true">●</span> {copy.serviceNote}</p>
          </div>
          <div className={styles.heroAside}>
            <section className={styles.culturalWelcome} aria-labelledby="citizen-reassurance">
              <div className={styles.welcomeCopy}>
                <p>{copy.welcomeKicker}</p>
                <h2 id="citizen-reassurance">{copy.welcomeTitle}</h2>
                <span>{copy.welcomeBody}</span>
              </div>
              <div className={styles.jharokhaFrame}>
                <Image alt="Woman greeting citizens with namaste" height={480} priority src="/culture/namaste-citizen-guide.png" width={320} />
              </div>
            </section>
            <aside className={styles.quickPanel} aria-label="Citizen services">
              <div className={styles.panelHeader}><span><ChakraIcon /></span><div><strong>{copy.citizenServices}</strong><small>{copy.serviceSub}</small></div></div>
              <Link href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}><span>01</span><div><strong>{copy.quick[0][0]}</strong><small>{copy.quick[0][1]}</small></div><b aria-hidden="true">→</b></Link>
              <Link href="/track"><span>02</span><div><strong>{copy.quick[1][0]}</strong><small>{copy.quick[1][1]}</small></div><b aria-hidden="true">→</b></Link>
              <Link href={user ? "/dashboard" : "/signin"}><span>03</span><div><strong>{copy.quick[2][0]}</strong><small>{copy.quick[2][1]}</small></div><b aria-hidden="true">→</b></Link>
              <button onClick={() => { setTourStep(0); setTourOpen(true); }} type="button">{copy.helpPortal}</button>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.noticeBand} aria-label="Public information">
        <article className={styles.indiaBanner}><div className={styles.bannerMark}><ChakraIcon /></div><div><small>{copy.banners[0][0]}</small><strong>{copy.banners[0][1]}</strong></div></article>
        <article className={styles.digitalBanner}><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><div><small>{copy.banners[1][0]}</small><strong>{copy.banners[1][1]}</strong></div></article>
        <article className={styles.alertBanner}><span aria-hidden="true">i</span><div><small>{copy.banners[2][0]}</small><strong>{copy.banners[2][1]}</strong></div></article>
      </section>

      <section className={styles.serviceSection} aria-labelledby="services-heading">
        <div className={styles.sectionHeading}><div><p>{copy.onlineServices}</p><h2 id="services-heading">{copy.assist}</h2></div><Link href="/help">{copy.faq} <span aria-hidden="true">→</span></Link></div>
        <div className={styles.serviceGrid}>{copy.services.map((card) => <Link className={`${styles.serviceCard} ${styles[card.tone]}`} href={user || card.href === "/track" || card.href.startsWith("/help") ? card.href : "/signin"} key={card.title}><span className={styles.cardIcon}><ServiceIcon name={card.icon} /></span><div><h3>{card.title}</h3><p>{card.body}</p></div><b aria-hidden="true">→</b></Link>)}</div>
      </section>

      <section className={styles.heritageSection} aria-labelledby="heritage-heading">
        <header><p>{copy.heritageKicker}</p><h2 id="heritage-heading">{copy.heritageTitle}</h2><span>{copy.heritageBody}</span></header>
        <div className={styles.heritageGrid}>
          <article><div><ParliamentArt /></div><span>01</span><h3>{copy.heritage[0][0]}</h3><p>{copy.heritage[0][1]}</p></article>
          <article><div><IndiaGateArt /></div><span>02</span><h3>{copy.heritage[1][0]}</h3><p>{copy.heritage[1][1]}</p></article>
          <article><div><ConstitutionArt /></div><span>03</span><h3>{copy.heritage[2][0]}</h3><p>{copy.heritage[2][1]}</p></article>
        </div>
      </section>

      <section className={styles.legacySection} aria-labelledby="legacy-heading">
        <span className={styles.orbitDot} aria-hidden="true" />
        <header><p>{copy.legacyKicker}</p><h2 id="legacy-heading">{copy.legacyTitle}</h2><span>{copy.legacyBody}</span></header>
        <div className={styles.legacyGrid}>
          <article className={styles.gandhiCard}><div className={styles.gandhiPortrait}><Image alt={`${copy.gandhiName}, 1940 portrait`} height={3650} src="/culture/mahatma-gandhi-1940.jpg" width={2875} /></div><div><small>1869 — 1948</small><h3>{copy.gandhiName}</h3><strong>{copy.gandhiLabel}</strong><blockquote><p>“{copy.gandhiQuote}”</p><cite>— {copy.gandhiName}</cite></blockquote><a href="https://www.mkgandhi.org/epigrams/s.php" rel="noreferrer" target="_blank">{copy.gandhiQuoteSource} ↗</a><span><a href="https://commons.wikimedia.org/wiki/File:Gandhi_portrait,_1940.jpg" rel="noreferrer" target="_blank">{copy.gandhiPhotoSource}</a></span></div></article>
          <article className={styles.pmCard}><div className={styles.pmPortrait}><Image alt={`${copy.pmName}, ${copy.pmLabel}`} height={512} priority src="/culture/prime-minister-official.jpg" width={768} /></div><div><small>{copy.pmLabel}</small><h3>{copy.pmName}</h3><p>{copy.pmBody}</p><a href="https://www.pmindia.gov.in/en/pms-profile/" rel="noreferrer" target="_blank">{copy.officialProfile} ↗</a><span>{copy.portraitSource}</span></div></article>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className={styles.processIntro}><p>{copy.processKicker}</p><h2 id="process-heading">{copy.processTitle}</h2><span>{copy.processBody}</span></div>
        <ol>{copy.process.map((step, index) => <li key={step[0]}><span>0{index + 1}</span><div><strong>{step[0]}</strong><small>{step[1]}</small></div></li>)}</ol>
      </section>

      <section className={styles.informationGrid}>
        <article className={styles.publicNotice}><header><span aria-hidden="true">!</span><div><small>{copy.noticeKicker}</small><h2>{copy.noticeTitle}</h2></div></header><ul>{copy.noticeItems.map((item) => <li key={item}>{item}</li>)}</ul><Link href="/help#eligible">{copy.noticeLink} →</Link></article>
        <article className={styles.assistance}><p>{copy.helpKicker}</p><h2>{copy.helpTitle}</h2><span>{copy.helpBody}</span><div><Link href="/help">{copy.helpCentre}</Link><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">{copy.officialPortal} ↗</a></div></article>
      </section>

      <section className={styles.ecosystem}><p>{copy.governmentServices}</p><div><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><Image alt="National Portal of India" height={38} src="/identity/india-gov.jpg" width={98} /><Image alt="National Informatics Centre" height={39} src="/identity/nic.jpg" width={113} /></div></section>
    </main>

    {tourOpen ? <div className={styles.tourBackdrop} role="presentation"><section aria-labelledby="tour-title" aria-modal="true" className={styles.tour} role="dialog"><button aria-label={copy.closeGuidance} className={styles.tourClose} onClick={closeTour} type="button">×</button><p>{copy.tourProgress} {tourStep + 1} / 3</p><h2 id="tour-title">{copy.tourTitles[tourStep]}</h2><span>{copy.tourBodies[tourStep]}</span><div className={styles.tourDots}>{[0,1,2].map((step) => <i className={step === tourStep ? styles.tourDotActive : ""} key={step} />)}</div><div className={styles.tourActions}><button onClick={closeTour} type="button">{copy.close}</button>{tourStep < 2 ? <button onClick={() => setTourStep((step) => step + 1)} type="button">{copy.next} <span aria-hidden="true">→</span></button> : <button onClick={closeTour} type="button">{copy.continue}</button>}</div></section></div> : null}
  </CivicShell>;
}
