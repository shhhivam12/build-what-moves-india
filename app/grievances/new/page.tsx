import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CivicShell } from "@/src/design-system/components/civic-shell";
import { GrievanceIntake } from "@/src/features/grievances/grievance-intake";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";

export default async function NewGrievancePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?returnTo=/grievances/new");
  return <CivicShell user={{ name: session.user.name, email: session.user.email }}><GrievanceIntake firstName={session.user.name.split(/\s+/)[0] ?? "Citizen"} /></CivicShell>;
}
