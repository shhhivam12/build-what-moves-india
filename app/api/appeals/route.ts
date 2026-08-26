import { NextResponse } from "next/server";
import { z } from "zod";
import { createAppealForUser } from "@/src/features/grievances/store";
import { encodeMockAppeal, mockAppealCookie } from "@/src/features/grievances/mock-data";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

const appealSchema = z.object({ reference: z.string().trim().min(5).max(80), disputedOutcome: z.string().trim().min(2).max(240), reason: z.string().trim().min(20).max(3000) });

export async function POST(request: Request) {
  const session = await getCitizenSession();
  if (!session) return NextResponse.json({ error: "Please sign in to submit an appeal." }, { status: 401 });
  const parsed = appealSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Explain what remains unresolved in at least 20 characters." }, { status: 400 });
  if (session.isMock) {
    const reference = `APL-DEMO-${crypto.randomUUID().slice(0, 7).toUpperCase()}`;
    const response = NextResponse.json({ reference, mode: "demonstration" }, { status: 201 });
    response.cookies.set(mockAppealCookie, encodeMockAppeal({ caseReference: parsed.data.reference, appealReference: reference, disputedOutcome: parsed.data.disputedOutcome, reason: parsed.data.reason }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
    return response;
  }
  const created = await createAppealForUser(session.user.id, parsed.data.reference, parsed.data.disputedOutcome, parsed.data.reason);
  if (!created) return NextResponse.json({ error: "The grievance could not be found in your account." }, { status: 404 });
  return NextResponse.json({ reference: created.reference }, { status: 201 });
}
