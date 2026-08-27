import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthExperience } from "@/src/features/auth/auth-experience";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a citizen account for the CPGRAMS demonstration portal.",
};

export default async function SignUpPage() {
  if (await getCitizenSession()) redirect("/dashboard");
  return <AuthExperience mode="signup" />;
}
