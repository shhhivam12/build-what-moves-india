import { NextResponse } from "next/server";
import { z } from "zod";
import { createGrievanceForUser } from "@/src/features/grievances/store";
import { createMockReference, encodeMockCase, mockLatestCookie } from "@/src/features/grievances/mock-data";
import { getCitizenSession } from "@/src/infrastructure/auth/citizen-session";

const grievanceSchema = z.object({
  title: z.string().trim().min(5).max(160),
  description: z.string().trim().min(20).max(5000),
  category: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(180),
  routeReason: z.string().trim().min(5).max(500),
  desiredOutcomes: z.array(z.string().trim().min(2).max(240)).min(1).max(5),
});

export async function POST(request: Request) {
  const session = await getCitizenSession();
  if (!session) return NextResponse.json({ error: "Please sign in to submit a grievance." }, { status: 401 });
  const parsed = grievanceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please review the grievance details before submitting." }, { status: 400 });
  if (session.isMock) {
    const reference = createMockReference();
    const response = NextResponse.json({ reference, mode: "demonstration" }, { status: 201 });
    response.cookies.set(mockLatestCookie, encodeMockCase({ reference, ...parsed.data }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
    return response;
  }
  const created = await createGrievanceForUser(session.user.id, parsed.data);
  return NextResponse.json({ reference: created.reference }, { status: 201 });
}
