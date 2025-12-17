import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Schema that models the users table
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schema that models the todos table, points a todo to a user as an owner
export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  ownerId: integer("owner_id")
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Join table for User-to-User
export const userSharesTable = pgTable(
  "user_shares",
  {
    sharerId: integer("sharer_id")
      .notNull()
      .references(() => usersTable.id),
    shareeId: integer("sharee_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    primaryKey({ columns: [table.sharerId, table.shareeId] }),
  ]
);

// Join table for Todo-to-User
export const todoSharesTable = pgTable(
  "todo_shares",
  {
    todoId: integer("todo_id")
      .notNull()
      .references(() => todosTable.id),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    primaryKey({ columns: [table.todoId, table.userId] }),
  ]
);
