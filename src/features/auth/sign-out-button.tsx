"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/src/infrastructure/auth/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  }

  return <button disabled={pending} onClick={signOut} type="button">{pending ? "Signing out…" : "Sign out"}</button>;
}
