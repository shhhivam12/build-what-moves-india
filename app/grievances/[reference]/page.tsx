import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { AppealForm } from "@/src/features/grievances/appeal-form";
import { decodeMockAppeal, decodeMockCase, getMockDetail, mockAppealCookie, mockLatestCookie } from "@/src/features/grievances/mock-data";
import { getGrievanceForUser } from "@/src/features/grievances/store";
import styles from "@/src/features/grievances/portal.module.css";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export default async function GrievanceDetailPage({ params, searchParams }: { params: Promise<{ reference: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const session = await getCitizenSession();
  if (!session) redirect("/signin");
  const { reference } = await params;
  const query = await searchParams;
  const caseReference = decodeURIComponent(reference);
  const cookieStore = await cookies();
  const latest = decodeMockCase(cookieStore.get(mockLatestCookie)?.value);
  const appeal = decodeMockAppeal(cookieStore.get(mockAppealCookie)?.value);
  const detail = session.isMock ? getMockDetail(caseReference, latest, appeal) : await getGrievanceForUser(session.user.id, caseReference);
  if (!detail) notFound();
  const { record, events, outcomes, appeals } = detail;
  const partlyResolved = record.status === "partly-resolved";
  const activeAppeal = appeals[0];
  return <CivicShell user={{ name: session.user.name, email: session.user.email }}>
    <main className={styles.detailPage} id="main-content">
      {query.submitted ? <aside className={styles.receivedBanner} role="status"><span aria-hidden="true">✓</span><div><strong>Grievance registered successfully</strong><p>Registration number <b>{record.reference}</b></p></div><span>Registered</span></aside> : null}
      <Link className={styles.backLink} href="/dashboard">← Back to my grievances</Link>
      <header className={styles.caseHeader}><div><p className={styles.eyebrow}>{partlyResolved ? "Action Taken Report" : "Grievance record"}</p><h1>{record.title}</h1><p>Registration number {record.reference} · Submitted {record.submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div><span className={styles.largeStatus}>{record.status === "acknowledged" ? "Registered" : record.status === "appeal-received" ? "Appeal received" : "Partly resolved"}</span></header>
      <section className={styles.routeSummary}><div><small>Concerned organisation</small><strong>{record.department}</strong><p>{record.routeReason}</p></div><div><small>Current status</small><strong>{partlyResolved ? "1 of 2 requested actions completed" : record.status === "acknowledged" ? "Registered and awaiting examination" : "Appeal under consideration"}</strong><p>All updates are recorded against this registration number.</p></div></section>
      {outcomes.length ? <section className={styles.receiptSection}><header><div><p className={styles.eyebrow}>Disposal details</p><h2>Relief requested and action taken</h2></div><span>Action Taken Report</span></header><div className={styles.outcomeGrid}>{outcomes.map((outcome, index) => <article key={outcome.id}><div className={styles.outcomeTop}><span>{index + 1}</span><div><small>Relief requested</small><h3>{outcome.requested}</h3></div><b className={outcome.result === "resolved" ? styles.resolvedPill : styles.gapPill}>{outcome.result === "resolved" ? "✓ Completed" : "! Pending"}</b></div><dl><div><dt>Action taken</dt><dd>{outcome.actionTaken}</dd></div><div><dt>Supporting information</dt><dd>{outcome.evidence}</dd></div><div><dt>Pending action</dt><dd>{outcome.remainingGap}</dd></div></dl></article>)}</div></section> : <section className={styles.awaiting}><span aria-hidden="true">⌁</span><div><h2>Grievance registered</h2><p>The grievance has been recorded and is awaiting examination by the concerned organisation.</p></div></section>}
      <div className={styles.detailGrid}><section className={styles.timelineSection}><p className={styles.eyebrow}>Grievance history</p><h2>Status and action history</h2><ol>{events.map((event, index) => <li className={index === 0 ? styles.latestEvent : ""} key={event.id}><span aria-hidden="true" /><div><time>{event.occurredAt.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</time><h3>{event.title}</h3><p>{event.detail}</p><small>{event.actor}</small></div></li>)}</ol></section><aside className={styles.caseDescription}><p className={styles.eyebrow}>Grievance details</p><h2>Submitted description</h2><p>{record.description}</p><h3>Relief requested</h3><ol>{record.desiredOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol></aside></div>
      {outcomes.some((outcome) => outcome.result !== "resolved") ? <section className={styles.appealSection}><div><p className={styles.eyebrow}>{activeAppeal ? "Appeal received" : "Appeal against action taken"}</p><h2>{activeAppeal ? `Appeal ${activeAppeal.reference} is under consideration` : "Submit an appeal for the pending action"}</h2><p>The grievance record and Action Taken Report will be attached to the appeal.</p></div>{activeAppeal ? <span className={styles.appealActive}>Appeal received</span> : <AppealForm outcomes={outcomes.filter((outcome) => outcome.result !== "resolved").map((outcome) => outcome.requested)} reference={record.reference} />}</section> : null}
    </main>
  </CivicShell>;
}
