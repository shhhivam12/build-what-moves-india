"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { CivicShell } from "@/src/design-system/components/civic-shell";
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

  async function openMockAccount() {
    setNotice("Opening the sample account…");
    const response = await fetch("/api/demo-access", { method: "POST" });
    if (!response.ok) throw new Error("Sample access is temporarily unavailable.");
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
    setNotice("Checking sample account…");

    try {
      await openMockAccount();
    } catch (caught) {
      setNotice("");
      setError(caught instanceof Error ? caught.message : "Sample access is temporarily unavailable.");
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
    <CivicShell compact>
    <main className={styles.page} id="main-content">
      <div className={styles.ambient} aria-hidden="true"><span /><span /><span /></div>
      <section className={styles.layout}>
        <div className={styles.story}>
          <p className={styles.kicker}>Centralised Public Grievance Redress and Monitoring System</p>
          <h1>{isSignIn ? <>Citizen <em>Sign In</em></> : <>Citizen <em>Registration</em></>}</h1>
          <p className={styles.storyCopy}>{isSignIn ? "Access your grievance dashboard using the registered email address and password." : "Register to lodge public grievances and view action taken by the concerned organisation."}</p>

          <div className={styles.journey} aria-label="Service journey">
            <div><span>01</span><strong>Register grievance</strong><small>Submit public service details</small></div>
            <div><span>02</span><strong>View status</strong><small>Check action taken</small></div>
            <div><span>03</span><strong>File appeal</strong><small>For eligible disposed cases</small></div>
          </div>

          <aside className={styles.trustCard}>
            <span aria-hidden="true">₹0</span>
            <div><strong>No fee is charged</strong><small>Online grievance services are available 24 × 7</small></div>
          </aside>
        </div>

        <section className={styles.card} aria-labelledby="auth-title" aria-describedby={descriptionId}>
          <div className={styles.cardTopline} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.cardHeader}>
            <p>{isSignIn ? "Registered citizen" : "New citizen"}</p>
            <h2 id="auth-title">{isSignIn ? "Sign in to CPGRAMS" : "Create citizen account"}</h2>
            <span id={descriptionId}>{isSignIn ? "Enter your registered email address and password." : "Enter the required details to create an account. Use fictional information in this demonstration environment."}</span>
          </div>

          {isSignIn ? (
            <button className={styles.demoButton} disabled={pending} onClick={useDemoCitizen} type="button">
              <span className={styles.demoAvatar} aria-hidden="true">RM</span>
              <span><strong>{pending ? "Opening sample account…" : "Continue with sample account"}</strong><small>Available even if the demonstration database is unavailable</small></span>
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
    </CivicShell>
  );
}
