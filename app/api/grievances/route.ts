import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/infrastructure/auth/server";
import { createGrievanceForUser } from "@/src/features/grievances/store";

const grievanceSchema = z.object({
  title: z.string().trim().min(5).max(160),
  description: z.string().trim().min(20).max(5000),
  category: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(180),
  routeReason: z.string().trim().min(5).max(500),
  desiredOutcomes: z.array(z.string().trim().min(2).max(240)).min(1).max(5),
});

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Please sign in to submit a grievance." }, { status: 401 });
  const parsed = grievanceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please review the grievance details before submitting." }, { status: 400 });
  const created = await createGrievanceForUser(session.user.id, parsed.data);
  return NextResponse.json({ reference: created.reference }, { status: 201 });
}
