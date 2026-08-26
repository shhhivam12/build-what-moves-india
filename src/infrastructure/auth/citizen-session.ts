import "server-only";

import { cookies, headers } from "next/headers";
import { auth } from "./server";
import { demoSessionCookie } from "./session-constants";

export type CitizenSession = {
  user: { id: string; name: string; email: string };
  isMock: boolean;
};

const demoSession: CitizenSession = {
  user: { id: "demo-raghav-mehta", name: "Raghav Mehta", email: "raghav.demo@assured.example" },
  isMock: true,
};

function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Session lookup timed out")), milliseconds)),
  ]);
}

export async function getCitizenSession(): Promise<CitizenSession | null> {
  const cookieStore = await cookies();
  if (cookieStore.get(demoSessionCookie)?.value === "1") return demoSession;

  try {
    const session = await withTimeout(auth.api.getSession({ headers: await headers() }), 1_800);
    if (!session) return null;
    return {
      user: { id: session.user.id, name: session.user.name, email: session.user.email },
      isMock: false,
    };
  } catch {
    return null;
  }
}
