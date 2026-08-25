import { parseServerEnv } from "@/src/infrastructure/config/env-schema";

const validEnv = {
  DATABASE_URL: "postgresql://demo:demo@example.neon.tech/demo?sslmode=require",
  BETTER_AUTH_SECRET: "this-is-a-synthetic-secret-with-32-characters",
  BETTER_AUTH_URL: "http://localhost:3000",
  AUTH_TRUSTED_ORIGINS: "http://localhost:3000, https://demo.example",
};

describe("parseServerEnv", () => {
  it("accepts the server-only demo contract and normalises trusted origins", () => {
    expect(parseServerEnv(validEnv)).toMatchObject({
      AUTH_TRUSTED_ORIGINS: ["http://localhost:3000", "https://demo.example"],
    });
  });

  it("rejects a non-PostgreSQL URL and short auth secret", () => {
    expect(() =>
      parseServerEnv({ ...validEnv, DATABASE_URL: "https://example.com/db", BETTER_AUTH_SECRET: "too-short" }),
    ).toThrow();
  });
});
