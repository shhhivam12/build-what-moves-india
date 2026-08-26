import { headers } from "next/headers";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { TrackExperience } from "@/src/features/grievances/track-experience";
import { listGrievancesForUser } from "@/src/features/grievances/store";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";

export default async function TrackPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const records = session ? await listGrievancesForUser(session.user.id) : [];
  return <CivicShell user={session ? { name: session.user.name, email: session.user.email } : null}><TrackExperience records={records.map((item) => ({ reference: item.reference, title: item.title, status: item.status, department: item.department, updatedAt: item.updatedAt.toISOString() }))} signedIn={Boolean(session)} /></CivicShell>;
}
