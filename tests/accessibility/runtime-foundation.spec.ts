import { expect, test } from "@playwright/test";

test("liveness succeeds and readiness reports a privacy-safe state", async ({ request }) => {
  const health = await request.get("/api/health");
  expect(health.status()).toBe(200);
  await expect(health.json()).resolves.toEqual({
    status: "ok",
    service: "cpgrams-assured-journey-demo",
    scope: "liveness",
  });

  const readiness = await request.get("/api/ready");
  expect(readiness.headers()["cache-control"]).toBe("no-store");
  const readinessBody = await readiness.json();

  if (readiness.ok()) {
    expect(readinessBody).toMatchObject({ status: "ready", scope: "database" });
  } else {
    expect(readiness.status()).toBe(503);
    expect(readinessBody).toMatchObject({ status: "not_ready" });
    expect(["configuration", "database"]).toContain(readinessBody.reason);
  }
});
