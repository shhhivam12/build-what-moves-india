"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CivicShell, type ShellUser } from "@/src/design-system/components/civic-shell";
import styles from "./public-home.module.css";

const citizenServices = [
  { icon: "＋", title: "Lodge Public Grievance", body: "Register a grievance relating to public service delivery.", href: "/grievances/new", tone: "saffron" },
  { icon: "⌕", title: "View Grievance Status", body: "Check the latest action using your registration number.", href: "/track", tone: "green" },
  { icon: "↗", title: "File an Appeal", body: "Submit an appeal for an eligible closed grievance.", href: "/dashboard", tone: "white" },
  { icon: "◎", title: "Pension Grievance", body: "Proceed to the dedicated pension grievance service.", href: "/help#eligible", tone: "white" },
] as const;

export function PublicHome({ user }: { user: ShellUser }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!window.localStorage.getItem("assured-tour-seen")) setTourOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const closeTour = () => { window.localStorage.setItem("assured-tour-seen", "1"); setTourOpen(false); };

  return <CivicShell user={user}>
    <main id="main-content">
      <section className={styles.hero}>
        <div className={styles.chakra} aria-hidden="true">☸</div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.hindiTitle} lang="hi">केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली</p>
            <h1>Public Grievance<br />Redressal Portal</h1>
            <p className={styles.lead}>Lodge and monitor grievances relating to public service delivery by Central and State Government organisations.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>Lodge Public Grievance <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondaryButton} href="/track">View Status <span aria-hidden="true">⌕</span></Link>
            </div>
            <p className={styles.serviceNote}><span aria-hidden="true">●</span> Online grievance services are available 24 × 7. No fee is charged.</p>
          </div>
          <aside className={styles.quickPanel} aria-label="Citizen services">
            <div className={styles.panelHeader}><span aria-hidden="true">☸</span><div><strong>Citizen Services</strong><small lang="hi">नागरिक सेवाएं</small></div></div>
            <Link href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}><span>01</span><div><strong>Lodge grievance</strong><small>Register a new grievance</small></div><b aria-hidden="true">→</b></Link>
            <Link href="/track"><span>02</span><div><strong>View status</strong><small>Track an existing grievance</small></div><b aria-hidden="true">→</b></Link>
            <Link href={user ? "/dashboard" : "/signin"}><span>03</span><div><strong>Appeal</strong><small>Review eligible cases</small></div><b aria-hidden="true">→</b></Link>
            <button onClick={() => { setTourStep(0); setTourOpen(true); }} type="button">Need help using the portal?</button>
          </aside>
        </div>
      </section>

      <section className={styles.noticeBand} aria-label="Public information">
        <article className={styles.indiaBanner}><div className={styles.bannerMark} aria-hidden="true">☸</div><div><small lang="hi">जन शिकायत निवारण</small><strong>Responsive governance through citizen participation</strong></div></article>
        <article className={styles.digitalBanner}><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><div><small>Digital India</small><strong>Digital services for every citizen</strong></div></article>
        <article className={styles.alertBanner}><span aria-hidden="true">i</span><div><small>Important</small><strong>CPGRAMS does not charge any fee</strong></div></article>
      </section>

      <section className={styles.serviceSection} aria-labelledby="services-heading">
        <div className={styles.sectionHeading}><div><p>Online Services</p><h2 id="services-heading">How may we assist you?</h2></div><Link href="/help">Frequently asked questions <span aria-hidden="true">→</span></Link></div>
        <div className={styles.serviceGrid}>{citizenServices.map((card) => <Link className={`${styles.serviceCard} ${styles[card.tone]}`} href={user || card.href === "/track" || card.href.startsWith("/help") ? card.href : "/signin"} key={card.title}><span className={styles.cardIcon} aria-hidden="true">{card.icon}</span><div><h3>{card.title}</h3><p>{card.body}</p></div><b aria-hidden="true">→</b></Link>)}</div>
      </section>

      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className={styles.processIntro}><p>Grievance Process</p><h2 id="process-heading">From registration to disposal</h2><span>The registration number remains available in your dashboard and can be used to view the latest action.</span></div>
        <ol><li><span>01</span><div><strong>Register</strong><small>Enter grievance details and the relief requested</small></div></li><li><span>02</span><div><strong>Forwarded</strong><small>Sent to the concerned Ministry Department or State</small></div></li><li><span>03</span><div><strong>Action Taken</strong><small>View the response and supporting information</small></div></li><li><span>04</span><div><strong>Appeal</strong><small>File an appeal when the case is eligible</small></div></li></ol>
      </section>

      <section className={styles.informationGrid}>
        <article className={styles.publicNotice}><header><span aria-hidden="true">!</span><div><small>Public Notice</small><h2>Matters not taken up as public grievances</h2></div></header><ul><li>Right to Information matters</li><li>Court-related or subjudice matters</li><li>Religious matters</li><li>Government employee service matters before prescribed channels are exhausted</li></ul><Link href="/help#eligible">View detailed guidance →</Link></article>
        <article className={styles.assistance}><p lang="hi">सहायता</p><h2>Help with grievance registration</h2><span>Guidance is available for choosing the correct organisation writing grievance details and understanding status updates.</span><div><Link href="/help">Open Help Centre</Link><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Official portal ↗</a></div></article>
      </section>

      <section className={styles.ecosystem}><p>Government Digital Services</p><div><Image alt="Digital India" height={39} src="/identity/digital-india.jpg" width={69} /><Image alt="National Portal of India" height={38} src="/identity/india-gov.jpg" width={98} /><Image alt="National Informatics Centre" height={39} src="/identity/nic.jpg" width={113} /></div></section>
    </main>

    {tourOpen ? <div className={styles.tourBackdrop} role="presentation"><section aria-labelledby="tour-title" aria-modal="true" className={styles.tour} role="dialog"><button aria-label="Close guidance" className={styles.tourClose} onClick={closeTour} type="button">×</button><p>Portal guidance {tourStep + 1} of 3</p><h2 id="tour-title">{["Choose the required service", "Enter grievance details", "Keep the registration number"][tourStep]}</h2><span>{["Use Lodge Public Grievance for a new matter or View Status for an existing registration number.", "Describe the public service issue and specify the action you are requesting. Review the selected organisation before submission.", "A registration number is issued after submission. Use it to view action taken and file an appeal where applicable."][tourStep]}</span><div className={styles.tourDots}>{[0,1,2].map((step) => <i className={step === tourStep ? styles.tourDotActive : ""} key={step} />)}</div><div className={styles.tourActions}><button onClick={closeTour} type="button">Close</button>{tourStep < 2 ? <button onClick={() => setTourStep((step) => step + 1)} type="button">Next <span aria-hidden="true">→</span></button> : <button onClick={closeTour} type="button">Continue to portal</button>}</div></section></div> : null}
  </CivicShell>;
}
