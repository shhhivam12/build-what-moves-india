"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./portal.module.css";

export function AppealForm({ reference, outcomes }: { reference: string; outcomes: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState(outcomes[0] ?? "Unresolved outcome");
  const [reason, setReason] = useState("The recorded action does not resolve this requested outcome, and supporting evidence is missing. Please review this unresolved part of the grievance.");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setPending(true); setError("");
    const response = await fetch("/api/appeals", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ reference, disputedOutcome: outcome, reason }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error); setPending(false); return; }
    router.refresh();
  }
  if (!open) return <button className={styles.startAppeal} onClick={() => setOpen(true)} type="button">File appeal <span aria-hidden="true">→</span></button>;
  return <form className={styles.appealForm} onSubmit={submit}><label><span>Pending action</span><select onChange={(event) => setOutcome(event.target.value)} value={outcome}>{outcomes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Grounds for appeal</span><textarea minLength={20} onChange={(event) => setReason(event.target.value)} required rows={4} value={reason} /></label><p><span aria-hidden="true">✓</span> Grievance record and Action Taken Report will be attached</p>{error ? <div role="alert">{error}</div> : null}<div><button onClick={() => setOpen(false)} type="button">Cancel</button><button disabled={pending} type="submit">{pending ? "Submitting…" : "Submit appeal"}</button></div></form>;
}
