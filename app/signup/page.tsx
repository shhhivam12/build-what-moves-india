import type { Metadata } from "next";
import { AuthExperience } from "@/src/features/auth/auth-experience";

export const metadata: Metadata = {
  title: "Create citizen account",
  description: "Create a fictional citizen account for the CPGRAMS Assured Journey concept.",
};

export default function SignUpPage() {
  return <AuthExperience mode="signup" />;
}
