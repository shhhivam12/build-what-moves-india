import { sql } from "drizzle-orm";
import { ZodError } from "zod";
import { getDatabase } from "@/src/infrastructure/database/client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const correlationId = crypto.randomUUID();

  try {
    await getDatabase().execute(sql`select 1 as ready`);

    return Response.json(
      { status: "ready", scope: "database", correlationId },
      { headers: { "Cache-Control": "no-store", "X-Correlation-ID": correlationId } },
    );
  } catch (error) {
    const reason = error instanceof ZodError ? "configuration" : "database";

    return Response.json(
      { status: "not_ready", reason, correlationId },
      {
        status: 503,
        headers: { "Cache-Control": "no-store", "Retry-After": "3", "X-Correlation-ID": correlationId },
      },
    );
  }
}
