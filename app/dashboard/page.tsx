import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { listGrievancesForUser } from "@/src/features/grievances/store";
import styles from "@/src/features/grievances/portal.module.css";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My grievance dashboard" };

function statusLabel(status: string) {
  return ({ "partly-resolved": "Partly resolved", acknowledged: "Acknowledged", "appeal-received": "Appeal received" } as Record<string,string>)[status] ?? status;
}

export default async function DashboardPage() {
  const currentSession = await auth.api.getSession({ headers: await headers() });
  if (!currentSession) redirect("/signin");
  const cases = await listGrievancesForUser(currentSession.user.id);
  const firstName = currentSession.user.name.split(/\s+/)[0];
  const sampleCase = (cases.find((item) => item.isSample) ?? cases[0])!;
  return <CivicShell user={{ name: currentSession.user.name, email: currentSession.user.email }}>
    <main className={styles.dashboard} id="main-content">
      <section className={styles.welcome}><div><p className={styles.eyebrow}>Citizen dashboard</p><h1>Namaste, {firstName}.</h1><p>Your identity now stays consistent across the complete journey. Every case below belongs to this signed-in account.</p></div><Link className={styles.newButton} href="/grievances/new"><span aria-hidden="true">＋</span> Lodge a grievance</Link></section>
      <section className={styles.summary} aria-label="Account summary"><article><span aria-hidden="true">◎</span><div><small>All grievances</small><strong>{cases.length}</strong></div></article><article><span aria-hidden="true">⌁</span><div><small>In progress</small><strong>{cases.filter((item) => item.status === "acknowledged").length}</strong></div></article><article><span aria-hidden="true">✓</span><div><small>Outcomes issued</small><strong>{cases.filter((item) => item.status.includes("resolved")).length}</strong></div></article><article><span aria-hidden="true">↗</span><div><small>Appeals active</small><strong>{cases.filter((item) => item.status === "appeal-received").length}</strong></div></article></section>
      <div className={styles.dashboardGrid}>
        <section className={styles.caseList} aria-labelledby="my-cases-heading"><header><div><p className={styles.eyebrow}>Your records</p><h2 id="my-cases-heading">My grievances</h2></div><Link href="/track">Find by reference</Link></header>{cases.map((item) => <Link className={styles.caseRow} href={`/grievances/${encodeURIComponent(item.reference)}`} key={item.id}><span className={styles.statusIcon} aria-hidden="true">{item.status === "acknowledged" ? "⌁" : item.status === "appeal-received" ? "↗" : "✓"}</span><div className={styles.caseBody}><div><span className={styles.statusPill}>{statusLabel(item.status)}</span>{item.isSample ? <span className={styles.samplePill}>Sample case</span> : null}</div><h3>{item.title}</h3><p>{item.department}</p><small>Reference {item.reference} · Updated {item.updatedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</small></div><b aria-hidden="true">→</b></Link>)}</section>
        <aside className={styles.dashboardAside}>
          <section className={styles.nextAction}><p className={styles.eyebrow}>Recommended next step</p><span aria-hidden="true">◇</span><h2>Review the sample Resolution Receipt</h2><p>See how a partly resolved case separates completed and unresolved outcomes.</p><Link href={`/grievances/${encodeURIComponent(sampleCase.reference)}`}>Open receipt <span aria-hidden="true">→</span></Link></section>
          <section className={styles.helpCard}><h2>Get help without starting over</h2><p>Understand eligible matters, write a clearer description, or learn how focused appeals work.</p><Link href="/help">Open citizen help →</Link></section>
          <section className={styles.accountCard}><span className={styles.secureDot} /><div><strong>Secure demonstration session</strong><p>Signed in as {currentSession.user.email}</p></div></section>
        </aside>
      </div>
    </main>
  </CivicShell>;
}
