export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "cpgrams-assured-journey-demo",
      scope: "liveness",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
