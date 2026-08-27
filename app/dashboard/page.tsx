import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { DashboardExperience } from "@/src/features/grievances/dashboard-experience";
import { decodeMockAppeal, decodeMockCase, getMockCases, mockAppealCookie, mockLatestCookie } from "@/src/features/grievances/mock-data";
import { listGrievancesForUser } from "@/src/features/grievances/store";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const currentSession = await getCitizenSession();
  if (!currentSession) redirect("/signin");
  const cookieStore = await cookies();
  const latest = decodeMockCase(cookieStore.get(mockLatestCookie)?.value);
  const mockAppeal = decodeMockAppeal(cookieStore.get(mockAppealCookie)?.value);
  const storedCases = currentSession.isMock ? getMockCases(latest) : await listGrievancesForUser(currentSession.user.id);
  const cases = storedCases.map((item) => mockAppeal?.caseReference === item.reference ? { ...item, status: "appeal-received" } : item);
  const firstName = currentSession.user.name.split(/\s+/)[0] ?? currentSession.user.name;
  return <CivicShell user={{ name: currentSession.user.name, email: currentSession.user.email }}>
    <DashboardExperience email={currentSession.user.email} firstName={firstName} records={cases.map((item) => ({ reference: item.reference, title: item.title, department: item.department, status: item.status, isSample: item.isSample, submittedAt: item.submittedAt.toISOString(), updatedAt: item.updatedAt.toISOString() }))} />
  </CivicShell>;
}
