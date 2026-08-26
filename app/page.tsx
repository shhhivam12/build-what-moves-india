import { headers } from "next/headers";
import { PublicHome } from "@/src/features/home/public-home";
import { auth } from "@/src/infrastructure/auth/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return <PublicHome user={session ? { name: session.user.name, email: session.user.email } : null} />;
}
