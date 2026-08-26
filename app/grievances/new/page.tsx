import { redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { GrievanceIntake } from "@/src/features/grievances/grievance-intake";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export default async function NewGrievancePage() {
  const session = await getCitizenSession();
  if (!session) redirect("/signin?returnTo=/grievances/new");
  return <CivicShell user={{ name: session.user.name, email: session.user.email }}><GrievanceIntake firstName={session.user.name.split(/\s+/)[0] ?? "Citizen"} /></CivicShell>;
}
