import type { Metadata } from "next";
import { AuthExperience } from "@/src/features/auth/auth-experience";

export const metadata: Metadata = {
  title: "Citizen sign in",
  description: "Sign in to lodge, track and appeal a demonstration public grievance.",
};

export default function SignInPage() {
  return <AuthExperience mode="signin" />;
}
