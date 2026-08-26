import type { Metadata } from "next";
import { AuthExperience } from "@/src/features/auth/auth-experience";

export const metadata: Metadata = {
  title: "Create citizen account",
  description: "Create a citizen account for the CPGRAMS demonstration portal.",
};

export default function SignUpPage() {
  return <AuthExperience mode="signup" />;
}
