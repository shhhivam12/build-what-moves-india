import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthExperience } from "@/src/features/auth/auth-experience";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Citizen sign in",
  description: "Sign in to lodge, track and appeal a demonstration public grievance.",
};

export default async function SignInPage() {
  if (await getCitizenSession()) redirect("/dashboard");
  return <AuthExperience mode="signin" />;
}
