import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/infrastructure/auth/server";
import { createAppealForUser } from "@/src/features/grievances/store";

const appealSchema = z.object({ reference: z.string().trim().min(5).max(80), disputedOutcome: z.string().trim().min(2).max(240), reason: z.string().trim().min(20).max(3000) });

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Please sign in to submit an appeal." }, { status: 401 });
  const parsed = appealSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Explain what remains unresolved in at least 20 characters." }, { status: 400 });
  const created = await createAppealForUser(session.user.id, parsed.data.reference, parsed.data.disputedOutcome, parsed.data.reason);
  if (!created) return NextResponse.json({ error: "The grievance could not be found in your account." }, { status: 404 });
  return NextResponse.json({ reference: created.reference }, { status: 201 });
}
