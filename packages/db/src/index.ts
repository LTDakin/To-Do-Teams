import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config"; // Ensure environment variables are loaded
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema, // Pass all schema objects to Drizzle
  logger: true, // Optional: Enable logging for debugging
});

// Export the schema objects and the db client
export * from "./schema";
