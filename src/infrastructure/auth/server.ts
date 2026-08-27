import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getServerEnv } from "@/src/infrastructure/config/env";
import { getAuthAllowedHosts } from "@/src/infrastructure/config/deployment-url";
import { getDatabase } from "@/src/infrastructure/database/client";
import { schema } from "@/src/infrastructure/database/schema";

const env = getServerEnv();
const localDevelopmentOrigins = process.env.NODE_ENV === "development"
  ? ["http://localhost:3000", "http://127.0.0.1:3000"]
  : [];

export const auth = betterAuth({
  appName: "CPGRAMS",
  baseURL: {
    allowedHosts: getAuthAllowedHosts(process.env, env.AUTH_TRUSTED_ORIGINS),
    fallback: env.BETTER_AUTH_URL,
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [...new Set([...env.AUTH_TRUSTED_ORIGINS, ...localDevelopmentOrigins])],
  database: drizzleAdapter(getDatabase(), {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
  advanced: {
    cookiePrefix: "assured-journey",
  },
  plugins: [nextCookies()],
});
