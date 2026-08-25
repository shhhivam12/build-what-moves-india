import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const client = neon(databaseUrl);
const database = drizzle(client);

await migrate(database, { migrationsFolder: "drizzle" });
console.log("Database migrations applied.");
