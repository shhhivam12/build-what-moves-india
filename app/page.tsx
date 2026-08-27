import { PublicHome } from "@/src/features/home/public-home";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getCitizenSession();
  if (session) redirect("/dashboard");
  return <PublicHome user={null} />;
}
