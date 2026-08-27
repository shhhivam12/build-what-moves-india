"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import styles from "./citizen-onboarding-guide.module.css";

type SpotlightRect = { top: number; left: number; width: number; height: number };
type PopoverPosition = { top: number; left: number };

const guideCopy = {
  en: {
    label: "Interactive portal tour", progress: "Guide step", skip: "Skip tour", back: "Back", next: "Next", finish: "Start using the portal", close: "Close interactive guide", hint: "The highlighted area is the part being explained.",
    steps: [
      { target: "[data-tour='welcome']", eyebrow: "Start here", title: "Your citizen workspace", body: "This dashboard is your private starting point after sign-in. It brings grievances, decisions, appeals and account activity together." },
      { target: "[data-tour='summary']", eyebrow: "At a glance", title: "Understand every case instantly", body: "These four counters separate all grievances, work in progress, resolved matters and active appeals so your next action is always clear." },
      { target: "[data-tour='register']", eyebrow: "Your records", title: "Search the grievance register", body: "Filter, search and sort every registration. Open any row to read its timeline, department response and available next steps." },
      { target: "[data-tour='lodge']", eyebrow: "Take action", title: "Lodge a new grievance", body: "Use this primary action whenever a public-service issue needs to be registered. You will review the organisation and details before submission." },
      { target: "[data-tour='language']", eyebrow: "Your language", title: "Switch between English and Hindi", body: "The active prototype is bilingual. Change language here at any time; the navigation, dashboard and assistant update together." },
      { target: "[data-tour='assistant']", eyebrow: "Guided assistance", title: "Ask Samadhan Sahayak", body: "The assistant can begin a grievance, carry a draft into the form, track a registration number, open appeals and find the correct service." },
    ],
  },
  hi: {
    label: "इंटरैक्टिव पोर्टल परिचय", progress: "मार्गदर्शिका चरण", skip: "परिचय छोड़ें", back: "पीछे", next: "आगे", finish: "पोर्टल का उपयोग शुरू करें", close: "इंटरैक्टिव मार्गदर्शिका बंद करें", hint: "उजागर किया गया भाग वही है जिसकी जानकारी दी जा रही है।",
    steps: [
      { target: "[data-tour='welcome']", eyebrow: "यहाँ से शुरू करें", title: "आपका नागरिक कार्यक्षेत्र", body: "साइन इन के बाद यह आपका निजी आरंभिक स्थान है। शिकायतें, निर्णय, अपील और खाता गतिविधि एक ही जगह मिलती हैं।" },
      { target: "[data-tour='summary']", eyebrow: "एक नज़र में", title: "हर मामले की स्थिति तुरंत समझें", body: "चार संकेतक सभी शिकायतों, प्रगति में मामलों, निस्तारित मामलों और सक्रिय अपीलों को अलग-अलग दिखाते हैं।" },
      { target: "[data-tour='register']", eyebrow: "आपके अभिलेख", title: "शिकायत रजिस्टर खोजें", body: "हर पंजीकरण को फ़िल्टर, खोज और क्रमबद्ध करें। समयरेखा, विभागीय उत्तर और अगले चरण देखने के लिए कोई पंक्ति खोलें।" },
      { target: "[data-tour='lodge']", eyebrow: "कार्रवाई करें", title: "नई शिकायत दर्ज करें", body: "सार्वजनिक सेवा से जुड़ी समस्या पंजीकृत करने के लिए इस प्रमुख बटन का उपयोग करें। जमा करने से पहले संगठन और विवरण की समीक्षा होगी।" },
      { target: "[data-tour='language']", eyebrow: "आपकी भाषा", title: "English और हिन्दी में बदलें", body: "यह प्रोटोटाइप द्विभाषी है। यहाँ भाषा बदलते ही नेविगेशन, डैशबोर्ड और सहायक साथ में अपडेट होते हैं।" },
      { target: "[data-tour='assistant']", eyebrow: "मार्गदर्शित सहायता", title: "समाधान सहायक से पूछें", body: "सहायक शिकायत शुरू कर सकता है, मसौदा फॉर्म तक ले जा सकता है, पंजीकरण संख्या देख सकता है और सही सेवा खोज सकता है।" },
    ],
  },
} as const;

const EDGE = 16;
const GAP = 16;
const POPOVER_WIDTH = 370;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function CitizenOnboardingGuide({ onClose }: { onClose: () => void }) {
  const { contentLocale } = useCivicLanguage();
  const copy = guideCopy[contentLocale];
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightRect>({ top: 120, left: 24, width: 320, height: 120 });
  const [popover, setPopover] = useState<PopoverPosition>({ top: 260, left: 24 });
  const popoverRef = useRef<HTMLElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const current = copy.steps[step] ?? copy.steps[0];

  const positionTour = useCallback(() => {
    const element = document.querySelector<HTMLElement>(current.target);
    if (!element) return;
    const target = element.getBoundingClientRect();
    const padding = window.innerWidth < 640 ? 6 : 9;
    const top = clamp(target.top - padding, 5, window.innerHeight - 10);
    const left = clamp(target.left - padding, 5, window.innerWidth - 10);
    const right = clamp(target.right + padding, left + 10, window.innerWidth - 5);
    const bottom = clamp(target.bottom + padding, top + 10, window.innerHeight - 5);
    const nextSpotlight = { top, left, width: right - left, height: bottom - top };
    setSpotlight(nextSpotlight);

    const width = Math.min(POPOVER_WIDTH, window.innerWidth - EDGE * 2);
    const height = popoverRef.current?.offsetHeight ?? 285;
    const roomBelow = window.innerHeight - bottom;
    const roomAbove = top;
    const roomRight = window.innerWidth - right;
    const roomLeft = left;
    let popoverTop: number;
    let popoverLeft: number;

    if (roomBelow >= height + GAP) {
      popoverTop = bottom + GAP;
      popoverLeft = clamp(left, EDGE, window.innerWidth - width - EDGE);
    } else if (roomAbove >= height + GAP) {
      popoverTop = top - height - GAP;
      popoverLeft = clamp(left, EDGE, window.innerWidth - width - EDGE);
    } else if (roomRight >= width + GAP) {
      popoverTop = clamp(top, EDGE, window.innerHeight - height - EDGE);
      popoverLeft = right + GAP;
    } else if (roomLeft >= width + GAP) {
      popoverTop = clamp(top, EDGE, window.innerHeight - height - EDGE);
      popoverLeft = left - width - GAP;
    } else {
      popoverTop = Math.max(EDGE, window.innerHeight - height - EDGE);
      popoverLeft = clamp((window.innerWidth - width) / 2, EDGE, window.innerWidth - width - EDGE);
    }
    setPopover({ top: popoverTop, left: popoverLeft });
  }, [current.target]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const element = document.querySelector<HTMLElement>(current.target);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const fullyVisible = rect.top >= 96 && rect.bottom <= window.innerHeight - 32;
    if (!fullyVisible) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center", inline: "nearest" });
    }
    const initialFrame = window.requestAnimationFrame(positionTour);
    const settle = window.setTimeout(positionTour, fullyVisible ? 40 : 480);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(settle);
    };
  }, [current.target, mounted, positionTour, step]);

  useEffect(() => {
    if (!mounted) return;
    const update = () => positionTour();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    document.addEventListener("keydown", escape);
    const focusFrame = window.requestAnimationFrame(() => nextButtonRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      document.removeEventListener("keydown", escape);
    };
  }, [mounted, onClose, positionTour, step]);

  if (!mounted) return null;

  return createPortal(<div className={styles.tourRoot}>
    <div aria-hidden="true" className={styles.interactionBlocker} />
    <div aria-hidden="true" className={styles.spotlight} style={{ height: spotlight.height, left: spotlight.left, top: spotlight.top, width: spotlight.width }}><span /></div>
    <section aria-describedby="citizen-guide-description" aria-labelledby="citizen-guide-title" aria-modal="true" className={styles.popover} ref={popoverRef} role="dialog" style={{ left: popover.left, top: popover.top }}>
      <div className={styles.popoverTopline} aria-hidden="true" />
      <header>
        <div className={styles.stepMark}><span>{String(step + 1).padStart(2, "0")}</span><small>/{String(copy.steps.length).padStart(2, "0")}</small></div>
        <div><p>{current.eyebrow}</p><span>{copy.label}</span></div>
        <button aria-label={copy.close} className={styles.close} onClick={onClose} type="button">×</button>
      </header>
      <div aria-live="polite" className={styles.guideContent}>
        <h2 id="citizen-guide-title">{current.title}</h2>
        <p id="citizen-guide-description">{current.body}</p>
        <small><i aria-hidden="true">◎</i>{copy.hint}</small>
      </div>
      <div aria-label={`${copy.progress} ${step + 1} / ${copy.steps.length}`} aria-valuemax={copy.steps.length} aria-valuemin={1} aria-valuenow={step + 1} className={styles.progress} role="progressbar">{copy.steps.map((item, index) => <i className={index <= step ? styles.complete : ""} key={item.title} />)}</div>
      <footer>
        <button className={styles.skip} onClick={onClose} type="button">{copy.skip}</button>
        <div><button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} type="button"><span aria-hidden="true">←</span> {copy.back}</button>{step < copy.steps.length - 1 ? <button className={styles.next} onClick={() => setStep((value) => value + 1)} ref={nextButtonRef} type="button">{copy.next} <span aria-hidden="true">→</span></button> : <button className={styles.next} onClick={onClose} ref={nextButtonRef} type="button">{copy.finish}</button>}</div>
      </footer>
    </section>
  </div>, document.body);
}
