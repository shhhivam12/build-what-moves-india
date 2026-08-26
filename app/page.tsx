import { PublicHome } from "@/src/features/home/public-home";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getCitizenSession();
  return <PublicHome user={session ? { name: session.user.name, email: session.user.email } : null} />;
}
