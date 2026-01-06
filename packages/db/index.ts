import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import "dotenv/config";

export * from "drizzle-orm";
/**
 * When changing this file make sure to run from root
 *  1. npm run update:db
 *    uses drizzle-kit push to update the local development database with changes
 *  2. npm run build:db
 *    compiles the ts for the backend app to have the new tables/etc.
 */

// Schema that models the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schema that models the todos table, points a todo to a user as an owner
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  ownerId: integer("owner_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Join table for User-to-User
export const user_shares = pgTable(
  "user_shares",
  {
    sharerId: integer("sharer_id")
      .notNull()
      .references(() => users.id),
    shareeId: integer("sharee_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    primaryKey({ columns: [table.sharerId, table.shareeId] }),
  ]
);

// Join table for Todo-to-User
export const user_todos = pgTable(
  "user_todos",
  {
    todoId: integer("todo_id")
      .notNull()
      .references(() => todos.id),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    primaryKey({ columns: [table.todoId, table.userId] }),
  ]
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    users,
    todos,
    user_shares,
    user_todos,
  },
  logger: true, // Optional: Enable logging for debugging
});
