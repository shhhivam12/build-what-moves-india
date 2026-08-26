"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CivicShell, type ShellUser } from "@/src/design-system/components/civic-shell";
import styles from "./public-home.module.css";

const serviceCards = [
  { icon: "◎", title: "Lodge a grievance", body: "Explain the problem in your words. We suggest a route; you stay in control.", href: "/grievances/new", tone: "primary" },
  { icon: "⌁", title: "Track progress", body: "See who acted, what changed, and when the next update is due.", href: "/track", tone: "blue" },
  { icon: "✓", title: "Understand the outcome", body: "Compare every request with the action and evidence recorded.", href: "/dashboard", tone: "green" },
  { icon: "↗", title: "Make a focused appeal", body: "Challenge only the unresolved part without starting again.", href: "/dashboard", tone: "saffron" },
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
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span>New citizen journey</span> Public grievances, made understandable</p>
            <h1>Your grievance should not disappear into a <em>black box.</em></h1>
            <p className={styles.lead}>Describe the issue once. Confirm where it goes. Follow every action. Appeal only what remains unresolved.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={user ? "/grievances/new" : "/signin?returnTo=/grievances/new"}>Lodge a grievance <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondaryButton} href="/track">Track a reference <span aria-hidden="true">⌁</span></Link>
            </div>
            <ul className={styles.trustList} aria-label="Service qualities"><li><span aria-hidden="true">✓</span> No fee</li><li><span aria-hidden="true">✓</span> Mobile-first</li><li><span aria-hidden="true">✓</span> 23 language choices</li></ul>
          </div>
          <div className={styles.assurancePanel} aria-label="Proposed grievance journey">
            <div className={styles.panelTop}><span className={styles.liveDot} /> <strong>Assured journey</strong><small>From receipt to reasoned outcome</small></div>
            <ol>
              <li><span>01</span><div><strong>Tell us what happened</strong><small>Type or speak in everyday language</small></div><b>2 min</b></li>
              <li><span>02</span><div><strong>Confirm the right route</strong><small>See why the department was suggested</small></div><b>You decide</b></li>
              <li><span>03</span><div><strong>Receive a reference instantly</strong><small>One case, one clear timeline</small></div><b>Immediate</b></li>
              <li><span>04</span><div><strong>See the complete outcome</strong><small>Action, evidence and unresolved gaps</small></div><b>Traceable</b></li>
            </ol>
            <div className={styles.panelFoot}><span aria-hidden="true">◇</span><p><strong>Nothing happens silently.</strong><br />Every state change tells you what comes next.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection} aria-labelledby="services-heading">
        <div className={styles.sectionHeading}><div><p>Start here</p><h2 id="services-heading">What do you need to do?</h2></div><button onClick={() => { setTourStep(0); setTourOpen(true); }} type="button">Show me around <span aria-hidden="true">▶</span></button></div>
        <div className={styles.serviceGrid}>{serviceCards.map((card) => <Link className={`${styles.serviceCard} ${styles[card.tone]}`} href={user || card.href === "/track" ? card.href : "/signin"} key={card.title}><span className={styles.cardIcon} aria-hidden="true">{card.icon}</span><div><h3>{card.title}</h3><p>{card.body}</p></div><b aria-hidden="true">→</b></Link>)}</div>
      </section>

      <section className={styles.explainSection}>
        <div className={styles.explainVisual}>
          <p className={styles.eyebrow}>Why this redesign matters</p>
          <h2>One complaint.<br /><em>Every requested outcome.</em></h2>
          <div className={styles.receiptMock}>
            <div><span className={styles.resolved}>Resolved</span><strong>Restore mobile service</strong><small>Activation confirmation recorded</small></div>
            <div><span className={styles.pending}>Needs action</span><strong>Reverse the ₹499 charge</strong><small>Refund evidence is still missing</small></div>
          </div>
        </div>
        <div className={styles.explainCopy}>
          <p className={styles.eyebrow}>Resolution Receipt</p>
          <h2>A closure status is not enough.</h2>
          <p>Citizens should see whether each thing they asked for was completed, what evidence supports the decision, and what remains appealable.</p>
          <ul><li><span>1</span><div><strong>Outcome-by-outcome clarity</strong><small>No vague “disposed” label for a partly solved case.</small></div></li><li><span>2</span><div><strong>Accountable timeline</strong><small>Every action includes an actor, reason and next step.</small></div></li><li><span>3</span><div><strong>Context-preserving appeal</strong><small>The original record moves forward automatically.</small></div></li></ul>
          <Link href={user ? "/dashboard" : "/signin"}>See the citizen dashboard <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.guidance}>
        <div><p className={styles.eyebrow}>Before you lodge</p><h2>We help you choose the right public-service path.</h2></div>
        <div className={styles.guidanceGrid}><article><span aria-hidden="true">i</span><div><strong>Public service grievance</strong><p>Use this journey for issues with service delivery by a central or state public authority.</p></div></article><article><span aria-hidden="true">↗</span><div><strong>Another route may be better</strong><p>RTI, court, pension, emergency and government-employee service matters use dedicated channels.</p></div></article></div>
      </section>

      <aside className={styles.noFee}><span aria-hidden="true">₹0</span><div><strong>There is no government fee for filing a grievance.</strong><p>This redesign never asks for payment or an OTP. Use the official portal for any real grievance.</p></div><a href="https://pgportal.gov.in/" rel="noreferrer" target="_blank">Open official CPGRAMS ↗</a></aside>
    </main>

    {tourOpen ? <div className={styles.tourBackdrop} role="presentation"><section aria-labelledby="tour-title" aria-modal="true" className={styles.tour} role="dialog"><button aria-label="Close guided tour" className={styles.tourClose} onClick={closeTour} type="button">×</button><p>Quick orientation · {tourStep + 1} of 3</p><h2 id="tour-title">{["Start with your problem, not a department.", "You confirm every intelligent suggestion.", "Track outcomes—not just status labels."][tourStep]}</h2><span>{["Describe what happened in plain language. The system extracts the issue and possible outcomes without forcing you through a maze of departments.", "Routing assistance shows the suggested public authority, confidence and reason. You can always change it before submission.", "The dashboard carries your real signed-in name and shows a case timeline, Resolution Receipt and focused appeal."][tourStep]}</span><div className={styles.tourDots}>{[0,1,2].map((step) => <i className={step === tourStep ? styles.tourDotActive : ""} key={step} />)}</div><div className={styles.tourActions}><button onClick={closeTour} type="button">Skip tour</button>{tourStep < 2 ? <button onClick={() => setTourStep((step) => step + 1)} type="button">Next <span aria-hidden="true">→</span></button> : <button onClick={closeTour} type="button">Explore the service <span aria-hidden="true">→</span></button>}</div></section></div> : null}
  </CivicShell>;
}
