import type { Metadata } from "next";
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
export const metadata: Metadata = { title: "Grievance Record" };

const progressSteps = [
  { label: "Registered", detail: "Grievance recorded" },
  { label: "Forwarded", detail: "Sent to organisation" },
  { label: "Action taken", detail: "Department response" },
  { label: "Appeal", detail: "If further review is needed" },
];

function statusLabel(status: string) {
  if (status === "acknowledged") return "Registered";
  if (status === "appeal-received") return "Appeal under consideration";
  return "Partly resolved";
}

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
  const activeAppeal = appeals[0];
  const completedOutcomes = outcomes.filter((outcome) => outcome.result === "resolved").length;
  const pendingOutcomes = outcomes.filter((outcome) => outcome.result !== "resolved");
  const progressIndex = record.status === "appeal-received" ? 3 : outcomes.length ? 2 : 0;
  const latestEvent = events[0];

  return <CivicShell user={{ name: session.user.name, email: session.user.email }}>
    <main className={styles.detailPage} id="main-content">
      {query.submitted ? <aside className={styles.receivedBanner} role="status"><span aria-hidden="true">✓</span><div><strong>Grievance registered successfully</strong><p>Registration number <b>{record.reference}</b></p></div><span>Registered</span></aside> : null}

      <div className={styles.detailTopbar}>
        <Link className={styles.backLink} href="/dashboard">← My grievances</Link>
        <nav aria-label="On this page" className={styles.caseJumpNav}>
          <a href="#progress">Progress</a><a href="#action-report">Action report</a><a href="#history">History</a>{pendingOutcomes.length ? <a href="#appeal">Appeal</a> : null}
        </nav>
      </div>

      <header className={styles.caseHero}>
        <div className={styles.caseHeroMain}>
          <div className={styles.caseIdentityLine}><span className={styles.largeStatus}>{statusLabel(record.status)}</span><span>Registration no. <strong>{record.reference}</strong></span></div>
          <h1>{record.title}</h1>
          <p>Submitted {record.submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className={styles.caseScore} aria-label={`${completedOutcomes} of ${outcomes.length} requested actions completed`}>
          <strong>{outcomes.length ? `${completedOutcomes}/${outcomes.length}` : "—"}</strong>
          <span>{outcomes.length ? "requested actions completed" : "awaiting examination"}</span>
        </div>
      </header>

      <section aria-label="Grievance at a glance" className={styles.caseSnapshot}>
        <article><span className={styles.snapshotIcon} aria-hidden="true">◉</span><div><small>Current status</small><strong>{statusLabel(record.status)}</strong><p>{pendingOutcomes.length ? `${pendingOutcomes.length} requested action remains pending` : "The grievance is awaiting examination"}</p></div></article>
        <article><span className={styles.snapshotIcon} aria-hidden="true">⌂</span><div><small>Concerned organisation</small><strong>{record.department}</strong><p>{record.routeReason}</p></div></article>
        <article><span className={styles.snapshotIcon} aria-hidden="true">↻</span><div><small>Latest update</small><strong>{latestEvent?.title ?? "Grievance registered"}</strong><p>{latestEvent ? latestEvent.occurredAt.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "No update recorded"}</p></div></article>
      </section>

      <section className={styles.progressCard} id="progress">
        <header><div><p className={styles.eyebrow}>Case progress</p><h2>Where your grievance stands</h2></div><span>{progressIndex + 1} of {progressSteps.length}</span></header>
        <ol className={styles.caseProgress}>
          {progressSteps.map((step, index) => <li className={index < progressIndex ? styles.progressDone : index === progressIndex ? styles.progressCurrent : ""} key={step.label}>
            <span aria-hidden="true">{index < progressIndex ? "✓" : index + 1}</span><div><strong>{step.label}</strong><small>{step.detail}</small></div>
          </li>)}
        </ol>
      </section>

      {outcomes.length ? <section className={styles.actionReport} id="action-report">
        <header className={styles.actionReportHeader}>
          <div><p className={styles.eyebrow}>Action Taken Report</p><h2>Relief requested and action taken</h2><p>Compare every requested action with the department response.</p></div>
          <div className={styles.reportSummary}><strong>{completedOutcomes}</strong><span>completed</span><i aria-hidden="true" /><strong>{pendingOutcomes.length}</strong><span>pending</span></div>
        </header>
        <div className={styles.outcomeList}>{outcomes.map((outcome, index) => <article className={outcome.result === "resolved" ? styles.outcomeResolved : styles.outcomePending} key={outcome.id}>
          <div className={styles.outcomeStatus}><span aria-hidden="true">{outcome.result === "resolved" ? "✓" : "!"}</span><div><small>Requested relief {index + 1}</small><h3>{outcome.requested}</h3></div><b>{outcome.result === "resolved" ? "Completed" : "Pending"}</b></div>
          <div className={styles.outcomeFacts}><div><small>Department action</small><p>{outcome.actionTaken}</p></div><div><small>Supporting information</small><p>{outcome.evidence}</p></div><div className={outcome.result === "resolved" ? "" : styles.pendingFact}><small>{outcome.result === "resolved" ? "Result" : "What remains"}</small><p>{outcome.remainingGap}</p></div></div>
        </article>)}</div>
      </section> : <section className={styles.awaiting}><span aria-hidden="true">⌁</span><div><h2>Grievance registered</h2><p>The grievance has been recorded and is awaiting examination by the concerned organisation.</p></div></section>}

      <div className={styles.detailGrid} id="history">
        <section className={styles.timelineSection}><p className={styles.eyebrow}>Grievance history</p><h2>Status and action history</h2><ol>{events.map((event, index) => <li className={index === 0 ? styles.latestEvent : ""} key={event.id}><span aria-hidden="true" /><div><time>{event.occurredAt.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</time><h3>{event.title}</h3><p>{event.detail}</p><small>{event.actor}</small></div></li>)}</ol></section>
        <aside className={styles.caseDescription}><p className={styles.eyebrow}>Original submission</p><h2>Your grievance</h2><p>{record.description}</p><details><summary>View requested relief</summary><ol>{record.desiredOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol></details></aside>
      </div>

      {pendingOutcomes.length ? <section className={styles.appealSection} id="appeal"><div><p className={styles.eyebrow}>{activeAppeal ? "Appeal received" : "Further review"}</p><h2>{activeAppeal ? `Appeal ${activeAppeal.reference} is under consideration` : "Still not satisfied with the pending action?"}</h2><p>Your grievance and Action Taken Report will be attached automatically.</p></div>{activeAppeal ? <span className={styles.appealActive}>Appeal received</span> : <AppealForm outcomes={pendingOutcomes.map((outcome) => outcome.requested)} reference={record.reference} />}</section> : null}
    </main>
  </CivicShell>;
}
