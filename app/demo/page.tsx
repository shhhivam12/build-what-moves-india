import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Demo Access" };

export default function DemoPage() {
  redirect("/dashboard");
}
