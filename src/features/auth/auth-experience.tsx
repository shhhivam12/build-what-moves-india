"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { authClient } from "@/src/infrastructure/auth/client";
import styles from "./auth-experience.module.css";

const demoAccount = {
  name: "Aarav Sharma",
  email: "demo.citizen@assured.example",
  password: "DemoCitizen#2026",
};

type Mode = "signin" | "signup";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialState: FormState = { name: "", email: "", password: "" };

export function AuthExperience({ mode }: { mode: Mode }) {
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

  async function retryDemoSignIn() {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const retry = await signIn(demoAccount.email, demoAccount.password);
      if (!retry.error) return true;
      await new Promise((resolve) => window.setTimeout(resolve, 500 * (attempt + 1)));
    }
    return false;
  }

  async function finishAuthentication() {
    router.push("/dashboard");
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
        if (!accepted) throw new Error("Please confirm that this account uses demonstration data.");
        const result = await authClient.signUp.email({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });
        if (result.error) throw new Error(result.error.message || "We could not create the account.");
      }

      await finishAuthentication();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The service could not complete that request.");
    } finally {
      setPending(false);
    }
  }

  async function useDemoCitizen() {
    setForm(demoAccount);
    setPending(true);
    setError("");
    setNotice("Preparing the fictional citizen account…");

    try {
      const existing = await signIn(demoAccount.email, demoAccount.password);
      if (!existing.error) {
        await finishAuthentication();
        return;
      }

      const created = await authClient.signUp.email(demoAccount);
      if (created.error) {
        const recovered = await retryDemoSignIn();
        if (!recovered) throw new Error("Demo access is temporarily unavailable. Please try again.");
      }

      await finishAuthentication();
    } catch (caught) {
      setNotice("");
      setError(caught instanceof Error ? caught.message : "Demo access is temporarily unavailable.");
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
    setNotice("Fictional details added. You can edit them before creating the account.");
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true"><span /><span /><span /></div>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true"><i /><i /><i /></span>
          <span><strong>CPGRAMS</strong><small>Assured Journey</small></span>
        </Link>
        <div className={styles.headerActions}>
          <span className={styles.languageTag}>English</span>
          <Link href="/help">Help</Link>
        </div>
      </header>

      <section className={styles.layout}>
        <div className={styles.story}>
          <p className={styles.kicker}><span aria-hidden="true">●</span> One account. Every grievance. Clear progress.</p>
          <h1>{isSignIn ? <>Welcome back to a <em>clearer</em> grievance journey.</> : <>Your voice deserves a <em>traceable</em> outcome.</>}</h1>
          <p className={styles.storyCopy}>{isSignIn ? "Sign in to lodge a grievance, follow every action, and challenge only what remains unresolved." : "Create one secure citizen account to file, track and appeal without repeatedly entering the same information."}</p>

          <div className={styles.journey} aria-label="Service journey">
            <div><span>01</span><strong>Speak or type</strong><small>Explain the issue in your own words</small></div>
            <div><span>02</span><strong>Confirm the route</strong><small>Assistance suggests; you decide</small></div>
            <div><span>03</span><strong>Track the outcome</strong><small>See action, evidence and next steps</small></div>
          </div>

          <aside className={styles.trustCard}>
            <span className={styles.pulse} aria-hidden="true" />
            <div><strong>Designed for every citizen</strong><small>Mobile-first · Keyboard accessible · Multilingual-ready</small></div>
          </aside>
        </div>

        <section className={styles.card} aria-labelledby="auth-title" aria-describedby={descriptionId}>
          <div className={styles.cardTopline} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.cardHeader}>
            <p>{isSignIn ? "Citizen sign in" : "Create citizen account"}</p>
            <h2 id="auth-title">{isSignIn ? "Continue your journey" : "Get started securely"}</h2>
            <span id={descriptionId}>{isSignIn ? "Use your email and password, or enter instantly with the fictional demonstration account." : "Use fictional details for this concept environment. No OTP or real identity document is required."}</span>
          </div>

          {isSignIn ? (
            <button className={styles.demoButton} disabled={pending} onClick={useDemoCitizen} type="button">
              <span className={styles.demoAvatar} aria-hidden="true">AS</span>
              <span><strong>{pending ? "Preparing account…" : "Enter as demo citizen"}</strong><small>One-click fictional access for evaluation</small></span>
              <b aria-hidden="true">→</b>
            </button>
          ) : (
            <button className={styles.demoButton} disabled={pending} onClick={fillRegistrationDemo} type="button">
              <span className={styles.spark} aria-hidden="true">✦</span>
              <span><strong>Fill fictional details</strong><small>Review or edit them before continuing</small></span>
              <b aria-hidden="true">+</b>
            </button>
          )}

          <div className={styles.divider}><span>or use the form</span></div>

          <form onSubmit={submit}>
            {!isSignIn ? <label className={styles.field}><span>Full name</span><input autoComplete="name" minLength={2} onChange={(event) => setField("name", event.target.value)} placeholder="Enter your full name" required value={form.name} /></label> : null}
            <label className={styles.field}><span>Email address</span><input autoComplete="email" inputMode="email" onChange={(event) => setField("email", event.target.value)} placeholder="citizen@assured.example" required type="email" value={form.email} /></label>
            <label className={styles.field}><span className={styles.fieldLine}>Password {isSignIn ? <Link href="/help#account-recovery">Forgot password?</Link> : <small>10+ characters</small>}</span><span className={styles.passwordWrap}><input autoComplete={isSignIn ? "current-password" : "new-password"} minLength={10} onChange={(event) => setField("password", event.target.value)} placeholder="Enter your password" required type={showPassword ? "text" : "password"} value={form.password} /><button aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} type="button">{showPassword ? "Hide" : "Show"}</button></span></label>

            {!isSignIn ? <label className={styles.consent}><input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" /><span>I understand that this concept environment accepts fictional demonstration data only.</span></label> : <label className={styles.remember}><input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" /><span>Keep me signed in on this device</span></label>}

            {notice ? <p className={styles.notice} role="status">{notice}</p> : null}
            {error ? <p className={styles.error} role="alert"><span aria-hidden="true">!</span>{error}</p> : null}

            <button className={styles.primary} disabled={pending} type="submit">{pending ? "Please wait…" : isSignIn ? "Sign in securely" : "Create account"}<span aria-hidden="true">→</span></button>
          </form>

          <p className={styles.switch}>{isSignIn ? "New to the service?" : "Already have an account?"} <Link href={isSignIn ? "/signup" : "/signin"}>{isSignIn ? "Create an account" : "Sign in"}</Link></p>
          <p className={styles.safety}><span aria-hidden="true">◇</span> Concept redesign · Not connected to live government systems</p>
        </section>
      </section>
    </main>
  );
}
