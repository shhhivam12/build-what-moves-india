import { cookies } from "next/headers";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { TrackExperience } from "@/src/features/grievances/track-experience";
import { decodeMockCase, getMockCases, mockLatestCookie } from "@/src/features/grievances/mock-data";
import { listGrievancesForUser } from "@/src/features/grievances/store";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export default async function TrackPage() {
  const session = await getCitizenSession();
  const latest = decodeMockCase((await cookies()).get(mockLatestCookie)?.value);
  const records = session ? session.isMock ? getMockCases(latest) : await listGrievancesForUser(session.user.id) : [];
  return <CivicShell user={session ? { name: session.user.name, email: session.user.email } : null}><TrackExperience records={records.map((item) => ({ reference: item.reference, title: item.title, status: item.status, department: item.department, updatedAt: item.updatedAt.toISOString() }))} signedIn={Boolean(session)} /></CivicShell>;
}
