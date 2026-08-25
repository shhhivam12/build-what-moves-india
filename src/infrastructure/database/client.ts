import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { getServerEnv } from "@/src/infrastructure/config/env";
import * as schema from "./schema";

let cachedDatabase: NeonHttpDatabase<typeof schema> | undefined;

export function getDatabase(): NeonHttpDatabase<typeof schema> {
  if (!cachedDatabase) {
    const client = neon(getServerEnv().DATABASE_URL);
    cachedDatabase = drizzle({ client, schema });
  }

  return cachedDatabase;
}
