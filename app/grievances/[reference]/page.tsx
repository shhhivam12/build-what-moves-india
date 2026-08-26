import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { AppealForm } from "@/src/features/grievances/appeal-form";
import { getGrievanceForUser } from "@/src/features/grievances/store";
import styles from "@/src/features/grievances/portal.module.css";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";

export default async function GrievanceDetailPage({ params, searchParams }: { params: Promise<{ reference: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  const { reference } = await params;
  const query = await searchParams;
  const detail = await getGrievanceForUser(session.user.id, decodeURIComponent(reference));
  if (!detail) notFound();
  const { record, events, outcomes, appeals } = detail;
  const partlyResolved = record.status === "partly-resolved";
  const activeAppeal = appeals[0];
  return <CivicShell user={{ name: session.user.name, email: session.user.email }}>
    <main className={styles.detailPage} id="main-content">
      {query.submitted ? <aside className={styles.receivedBanner} role="status"><span aria-hidden="true">✓</span><div><strong>Your grievance has been received once.</strong><p>Keep reference <b>{record.reference}</b>. You do not need to submit it again.</p></div><span>Received</span></aside> : null}
      <Link className={styles.backLink} href="/dashboard">← Back to my grievances</Link>
      <header className={styles.caseHeader}><div><p className={styles.eyebrow}>{partlyResolved ? "Resolution Receipt · Version 1" : "Grievance record"}</p><h1>{record.title}</h1><p>Reference {record.reference} · Submitted {record.submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div><span className={styles.largeStatus}>{record.status === "acknowledged" ? "Acknowledged" : record.status === "appeal-received" ? "Appeal received" : "Partly resolved"}</span></header>
      <section className={styles.routeSummary}><div><small>Confirmed route</small><strong>{record.department}</strong><p>{record.routeReason}</p></div><div><small>Current assurance</small><strong>{partlyResolved ? "1 of 2 outcomes complete" : record.status === "acknowledged" ? "Received and awaiting review" : "Focused appeal is active"}</strong><p>Updates are recorded against this single reference.</p></div></section>
      {outcomes.length ? <section className={styles.receiptSection}><header><div><p className={styles.eyebrow}>Outcome-by-outcome account</p><h2>What you asked for, and what was done</h2></div><span>Evidence-aware receipt</span></header><div className={styles.outcomeGrid}>{outcomes.map((outcome, index) => <article key={outcome.id}><div className={styles.outcomeTop}><span>{index + 1}</span><div><small>Requested outcome</small><h3>{outcome.requested}</h3></div><b className={outcome.result === "resolved" ? styles.resolvedPill : styles.gapPill}>{outcome.result === "resolved" ? "✓ Resolved" : "! Needs action"}</b></div><dl><div><dt>Action recorded</dt><dd>{outcome.actionTaken}</dd></div><div><dt>Evidence used</dt><dd>{outcome.evidence}</dd></div><div><dt>What remains</dt><dd>{outcome.remainingGap}</dd></div></dl></article>)}</div></section> : <section className={styles.awaiting}><span aria-hidden="true">⌁</span><div><h2>The grievance is safely recorded</h2><p>This new case has a real reference and persistent timeline. Officer-side action is outside the citizen-facing hackathon prototype, so no false resolution is generated.</p></div></section>}
      <div className={styles.detailGrid}><section className={styles.timelineSection}><p className={styles.eyebrow}>Accountable progress</p><h2>Case timeline</h2><ol>{events.map((event, index) => <li className={index === 0 ? styles.latestEvent : ""} key={event.id}><span aria-hidden="true" /><div><time>{event.occurredAt.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</time><h3>{event.title}</h3><p>{event.detail}</p><small>{event.actor}</small></div></li>)}</ol></section><aside className={styles.caseDescription}><p className={styles.eyebrow}>Original description</p><h2>Your words are preserved</h2><p>{record.description}</p><h3>Requested outcomes</h3><ol>{record.desiredOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol></aside></div>
      {outcomes.some((outcome) => outcome.result !== "resolved") ? <section className={styles.appealSection}><div><p className={styles.eyebrow}>{activeAppeal ? "Appeal already received" : "Something remains unresolved?"}</p><h2>{activeAppeal ? `Focused appeal ${activeAppeal.reference} is active` : "Challenge the gap—not the whole case."}</h2><p>The original grievance, route, evidence and receipt carry forward automatically.</p></div>{activeAppeal ? <span className={styles.appealActive}>Appeal received</span> : <AppealForm outcomes={outcomes.filter((outcome) => outcome.result !== "resolved").map((outcome) => outcome.requested)} reference={record.reference} />}</section> : null}
    </main>
  </CivicShell>;
}
