"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { CivicShell, CitizenProfileIcon } from "@/src/design-system/components/civic-shell";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { authClient } from "@/src/infrastructure/auth/client";
import styles from "./auth-experience.module.css";

const demoAccount = {
  name: "Raghav Mehta",
  email: "raghav.demo@assured.example",
  password: "DemoCitizen#2026",
};

type Mode = "signin" | "signup";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialState: FormState = { name: "", email: "", password: "" };

const authCopy = {
  en: {
    system: "Centralised Public Grievance Redress and Monitoring System", signTitle: "Citizen Sign In", registerTitle: "Citizen Registration", signStory: "Access your grievance dashboard using the registered email address and password.", registerStory: "Register to lodge public grievances and view action taken by the concerned organisation.",
    journey: [["Register grievance", "Submit public service details"], ["View status", "Check action taken"], ["File appeal", "For eligible disposed cases"]], noFee: "No fee is charged", available: "Online grievance services are available 24 × 7",
    registered: "Registered citizen", newCitizen: "New citizen", signHeading: "Sign in to CPGRAMS", createHeading: "Create citizen account", signBody: "Enter your registered email address and password.", createBody: "Enter the required details to create an account. Use fictional information in this demonstration environment.",
    opening: "Opening sample account…", continueSample: "Continue with sample account", sampleAvailable: "Available even if the demonstration database is unavailable", fill: "Fill fictional details", review: "Review or edit them before continuing", form: "or use the form", fullName: "Full name", namePlaceholder: "Enter your full name", email: "Email address", password: "Password", forgot: "Forgot password?", characters: "10+ characters", passwordPlaceholder: "Enter your password", hide: "Hide", show: "Show", demoConsent: "I understand that this concept environment accepts fictional demonstration data only.", remember: "Keep me signed in on this device", wait: "Please wait…", signSecure: "Sign in securely", create: "Create account", newService: "New to the service?", haveAccount: "Already have an account?", createAccount: "Create an account", signIn: "Sign in", safety: "Concept redesign · Not connected to live government systems",
    checking: "Checking sample account…", unavailable: "Sample access is temporarily unavailable.", fictionalAdded: "Fictional details added. You can edit them before creating the account.", confirmDemo: "Please confirm that this account uses demonstration data.", failed: "The service could not complete that request.",
  },
  hi: {
    system: "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली", signTitle: "नागरिक साइन इन", registerTitle: "नागरिक पंजीकरण", signStory: "पंजीकृत ईमेल और पासवर्ड से अपने शिकायत डैशबोर्ड तक पहुँचें।", registerStory: "लोक शिकायत दर्ज करने और संबंधित संगठन की कार्रवाई देखने के लिए पंजीकरण करें।",
    journey: [["शिकायत पंजीकरण", "सार्वजनिक सेवा विवरण जमा करें"], ["स्थिति देखें", "की गई कार्रवाई देखें"], ["अपील दर्ज करें", "पात्र निस्तारित मामलों के लिए"]], noFee: "कोई शुल्क नहीं लिया जाता", available: "ऑनलाइन शिकायत सेवाएँ 24 × 7 उपलब्ध हैं",
    registered: "पंजीकृत नागरिक", newCitizen: "नया नागरिक", signHeading: "सीपीग्राम्स में साइन इन करें", createHeading: "नागरिक खाता बनाएँ", signBody: "अपना पंजीकृत ईमेल और पासवर्ड दर्ज करें।", createBody: "खाता बनाने के लिए आवश्यक विवरण दर्ज करें। इस प्रदर्शन परिवेश में काल्पनिक जानकारी उपयोग करें।",
    opening: "नमूना खाता खोला जा रहा है…", continueSample: "नमूना खाते से जारी रखें", sampleAvailable: "प्रदर्शन डेटाबेस उपलब्ध न होने पर भी प्रयोग किया जा सकता है", fill: "काल्पनिक विवरण भरें", review: "जारी रखने से पहले समीक्षा या संपादन करें", form: "या प्रपत्र का उपयोग करें", fullName: "पूरा नाम", namePlaceholder: "अपना पूरा नाम दर्ज करें", email: "ईमेल पता", password: "पासवर्ड", forgot: "पासवर्ड भूल गए?", characters: "10+ अक्षर", passwordPlaceholder: "अपना पासवर्ड दर्ज करें", hide: "छिपाएँ", show: "दिखाएँ", demoConsent: "मैं समझता/समझती हूँ कि यह परिवेश केवल काल्पनिक प्रदर्शन डेटा स्वीकार करता है।", remember: "इस उपकरण पर साइन इन रखें", wait: "कृपया प्रतीक्षा करें…", signSecure: "सुरक्षित साइन इन", create: "खाता बनाएँ", newService: "सेवा में नए हैं?", haveAccount: "पहले से खाता है?", createAccount: "खाता बनाएँ", signIn: "साइन इन", safety: "अवधारणा पुनर्रचना · लाइव सरकारी प्रणालियों से जुड़ा नहीं",
    checking: "नमूना खाते की जाँच…", unavailable: "नमूना खाता अभी उपलब्ध नहीं है।", fictionalAdded: "काल्पनिक विवरण जोड़ दिए गए हैं। खाता बनाने से पहले संपादित कर सकते हैं।", confirmDemo: "कृपया पुष्टि करें कि यह खाता प्रदर्शन डेटा उपयोग करता है।", failed: "सेवा अनुरोध पूरा नहीं कर सकी।",
  },
} as const;

export function AuthExperience({ mode }: { mode: Mode }) {
  const { contentLocale } = useCivicLanguage();
  const copy = authCopy[contentLocale];
  const router = useRouter();
  const descriptionId = useId();
  const [form, setForm] = useState<FormState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const isSignIn = mode === "signin";

  function setField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function signIn(email: string, password: string, remember = true) {
    return authClient.signIn.email({ email, password, rememberMe: remember });
  }

  async function openMockAccount() {
    setNotice(copy.opening);
    const response = await fetch("/api/demo-access", { method: "POST" });
    if (!response.ok) throw new Error(copy.unavailable);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    await finishAuthentication();
  }

  async function finishAuthentication() {
    const requested = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("returnTo");
    router.push(requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard");
    router.refresh();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setNotice("");

    try {
      if (isSignIn) {
        const result = await signIn(form.email.trim(), form.password, rememberMe);
        if (result.error) throw new Error(result.error.message || "We could not sign you in.");
      } else {
        if (!accepted) throw new Error(copy.confirmDemo);
        const result = await authClient.signUp.email({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });
        if (result.error) throw new Error(result.error.message || "We could not create the account.");
      }

      await finishAuthentication();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.failed);
    } finally {
      setPending(false);
    }
  }

  async function useDemoCitizen() {
    setForm(demoAccount);
    setPending(true);
    setError("");
    setNotice(copy.checking);

    try {
      await openMockAccount();
    } catch (caught) {
      setNotice("");
      setError(caught instanceof Error ? caught.message : copy.unavailable);
    } finally {
      setPending(false);
    }
  }

  function fillRegistrationDemo() {
    const uniquePart = crypto.randomUUID().slice(0, 8);
    setForm({
      name: "Meera Joshi",
      email: `meera.demo.${uniquePart}@assured.example`,
      password: "CitizenDemo#2026",
    });
    setAccepted(true);
    setError("");
    setNotice(copy.fictionalAdded);
  }

  return (
    <CivicShell compact>
    <main className={styles.page} id="main-content">
      <div className={styles.ambient} aria-hidden="true"><span /><span /><span /></div>
      <section className={styles.layout}>
        <div className={styles.story}>
          <p className={styles.kicker}>{copy.system}</p>
          <h1>{isSignIn ? copy.signTitle : copy.registerTitle}</h1>
          <p className={styles.storyCopy}>{isSignIn ? copy.signStory : copy.registerStory}</p>

          <div className={styles.journey} aria-label="Service journey">
            {copy.journey.map((item, index) => <div key={item[0]}><span>0{index + 1}</span><strong>{item[0]}</strong><small>{item[1]}</small></div>)}
          </div>

          <aside className={styles.trustCard}>
            <span aria-hidden="true">₹0</span>
            <div><strong>{copy.noFee}</strong><small>{copy.available}</small></div>
          </aside>
        </div>

        <section className={styles.card} aria-labelledby="auth-title" aria-describedby={descriptionId}>
          <div className={styles.cardTopline} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.cardHeader}>
            <p>{isSignIn ? copy.registered : copy.newCitizen}</p>
            <h2 id="auth-title">{isSignIn ? copy.signHeading : copy.createHeading}</h2>
            <span id={descriptionId}>{isSignIn ? copy.signBody : copy.createBody}</span>
          </div>

          {isSignIn ? (
            <button className={styles.demoButton} disabled={pending} onClick={useDemoCitizen} type="button">
              <span className={styles.demoAvatar} aria-hidden="true"><CitizenProfileIcon /></span>
              <span><strong>{pending ? copy.opening : copy.continueSample}</strong><small>{copy.sampleAvailable}</small></span>
              <b aria-hidden="true">→</b>
            </button>
          ) : (
            <button className={styles.demoButton} disabled={pending} onClick={fillRegistrationDemo} type="button">
              <span className={styles.spark} aria-hidden="true">✦</span>
              <span><strong>{copy.fill}</strong><small>{copy.review}</small></span>
              <b aria-hidden="true">+</b>
            </button>
          )}

          <div className={styles.divider}><span>{copy.form}</span></div>

          <form onSubmit={submit}>
            {!isSignIn ? <label className={styles.field}><span>{copy.fullName}</span><input autoComplete="name" minLength={2} onChange={(event) => setField("name", event.target.value)} placeholder={copy.namePlaceholder} required value={form.name} /></label> : null}
            <label className={styles.field}><span>{copy.email}</span><input autoComplete="email" inputMode="email" onChange={(event) => setField("email", event.target.value)} placeholder="citizen@assured.example" required type="email" value={form.email} /></label>
            <label className={styles.field}><span className={styles.fieldLine}>{copy.password} {isSignIn ? <Link href="/help#account-recovery">{copy.forgot}</Link> : <small>{copy.characters}</small>}</span><span className={styles.passwordWrap}><input autoComplete={isSignIn ? "current-password" : "new-password"} minLength={10} onChange={(event) => setField("password", event.target.value)} placeholder={copy.passwordPlaceholder} required type={showPassword ? "text" : "password"} value={form.password} /><button aria-label={showPassword ? copy.hide : copy.show} onClick={() => setShowPassword((current) => !current)} type="button">{showPassword ? copy.hide : copy.show}</button></span></label>

            {!isSignIn ? <label className={styles.consent}><input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" /><span>{copy.demoConsent}</span></label> : <label className={styles.remember}><input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" /><span>{copy.remember}</span></label>}

            {notice ? <p className={styles.notice} role="status">{notice}</p> : null}
            {error ? <p className={styles.error} role="alert"><span aria-hidden="true">!</span>{error}</p> : null}

            <button className={styles.primary} disabled={pending} type="submit">{pending ? copy.wait : isSignIn ? copy.signSecure : copy.create}<span aria-hidden="true">→</span></button>
          </form>

          <p className={styles.switch}>{isSignIn ? copy.newService : copy.haveAccount} <Link href={isSignIn ? "/signup" : "/signin"}>{isSignIn ? copy.createAccount : copy.signIn}</Link></p>
          <p className={styles.safety}><span aria-hidden="true">◇</span> {copy.safety}</p>
        </section>
      </section>
    </main>
    </CivicShell>
  );
}
