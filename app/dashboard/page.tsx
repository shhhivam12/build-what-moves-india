import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/src/features/auth/sign-out-button";
import styles from "@/src/features/auth/dashboard.module.css";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Citizen dashboard",
  description: "Lodge and follow demonstration public grievances from one citizen account.",
};

export default async function DashboardPage() {
  const currentSession = await auth.api.getSession({ headers: await headers() });
  if (!currentSession) redirect("/signin");

  const initials = currentSession.user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return <main className={styles.page}>
    <div className={styles.topbar} aria-hidden="true"><i /><i /><i /></div>
    <header className={styles.header}>
      <Link className={styles.brand} href="/dashboard"><strong>CPGRAMS</strong><small>Assured Journey</small></Link>
      <nav aria-label="Account navigation"><Link href="/help">Help</Link><SignOutButton /></nav>
    </header>
    <section className={styles.main}>
      <div className={styles.welcome}>
        <div><p className={styles.eyebrow}>Citizen workspace</p><h1>Namaste, {currentSession.user.name.split(" ")[0]}</h1><p>Start a grievance, find an existing reference, or review the complete outcome of a case from one place.</p></div>
        <div className={styles.identity}><span className={styles.avatar}>{initials}</span><span><strong>{currentSession.user.name}</strong><small>{currentSession.user.email}</small></span></div>
      </div>
      <div className={styles.quickGrid}>
        <Link className={styles.primaryAction} href="/demo"><span aria-hidden="true">＋</span><div><strong>Lodge a grievance</strong><small>Describe the issue first. Routing assistance follows.</small></div></Link>
        <Link className={styles.secondaryAction} href="/demo"><span aria-hidden="true">⌁</span><div><strong>View my grievances</strong><small>Follow actions, evidence and next steps.</small></div></Link>
        <Link className={styles.secondaryAction} href="/demo"><span aria-hidden="true">✓</span><div><strong>Review an outcome</strong><small>Understand the decision or start a focused appeal.</small></div></Link>
      </div>
      <aside className={styles.statusCard}><div><strong>Demonstration account is active</strong><p>This identity and every associated case use fictional data.</p></div><span>Secure session · 8 hours</span></aside>
      <p className={styles.disclaimer}>Concept redesign · Not connected to live government systems</p>
    </section>
  </main>;
}
