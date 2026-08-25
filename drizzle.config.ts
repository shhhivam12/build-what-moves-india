import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/infrastructure/database/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://schema-generation.invalid/demo",
  },
  strict: true,
  verbose: true,
});
