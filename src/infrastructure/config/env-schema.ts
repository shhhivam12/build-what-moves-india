import { z } from "zod";

const databaseUrl = z.string().url().refine(
  (value) => value.startsWith("postgresql://") || value.startsWith("postgres://"),
  "DATABASE_URL must use the postgres or postgresql scheme.",
);

export const serverEnvSchema = z.object({
  DATABASE_URL: databaseUrl,
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  AUTH_TRUSTED_ORIGINS: z.string().min(1).transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  return serverEnvSchema.parse(source);
}
