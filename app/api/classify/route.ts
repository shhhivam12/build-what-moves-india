import { NextResponse } from "next/server";
import { z } from "zod";
import { classifyGrievance } from "@/src/features/grievances/classifier";

const requestSchema = z.object({ description: z.string().trim().min(20).max(5000) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Describe the issue in at least 20 characters." }, { status: 400 });
  return NextResponse.json(classifyGrievance(parsed.data.description));
}
