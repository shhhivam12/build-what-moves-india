import { NextResponse } from "next/server";
import { demoSessionCookie } from "@/src/infrastructure/auth/session-constants";

export async function POST() {
  const response = NextResponse.json({ ok: true, mode: "demonstration" });
  response.cookies.set(demoSessionCookie, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(demoSessionCookie, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
