"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/src/infrastructure/auth/client";

export function SignOutButton({ label = "Sign out" }: { label?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await fetch("/api/demo-access", { method: "DELETE" }).catch(() => undefined);
    await Promise.race([
      authClient.signOut().catch(() => undefined),
      new Promise((resolve) => window.setTimeout(resolve, 800)),
    ]);
    router.push("/signin");
    router.refresh();
  }

  return <button disabled={pending} onClick={signOut} type="button">{pending ? `${label}…` : label}</button>;
}
