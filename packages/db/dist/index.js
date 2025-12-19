"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.todoSharesTable = exports.userSharesTable = exports.todos = exports.users = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const pg_core_1 = require("drizzle-orm/pg-core");
require("dotenv/config");
__exportStar(require("drizzle-orm"), exports);
// Schema that models the users table
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("name").notNull(),
    passwordHash: (0, pg_core_1.text)("password_hash").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Schema that models the todos table, points a todo to a user as an owner
exports.todos = (0, pg_core_1.pgTable)("todos", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    completed: (0, pg_core_1.boolean)("completed").default(false).notNull(),
    ownerId: (0, pg_core_1.integer)("owner_id")
        .references(() => exports.users.id)
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
// Join table for User-to-User
exports.userSharesTable = (0, pg_core_1.pgTable)("user_shares", {
    sharerId: (0, pg_core_1.integer)("sharer_id")
        .notNull()
        .references(() => exports.users.id),
    shareeId: (0, pg_core_1.integer)("sharee_id")
        .notNull()
        .references(() => exports.users.id),
}, (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    (0, pg_core_1.primaryKey)({ columns: [table.sharerId, table.shareeId] }),
]);
// Join table for Todo-to-User
exports.todoSharesTable = (0, pg_core_1.pgTable)("todo_shares", {
    todoId: (0, pg_core_1.integer)("todo_id")
        .notNull()
        .references(() => exports.todos.id),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.users.id),
}, (table) => [
    // ensures we have no duplicate relationships in the table by creating a composite primary key
    (0, pg_core_1.primaryKey)({ columns: [table.todoId, table.userId] }),
]);
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.db = (0, node_postgres_1.drizzle)(pool, {
    schema: {
        users: exports.users,
        todos: exports.todos,
        userSharesTable: exports.userSharesTable,
        todoSharesTable: exports.todoSharesTable,
    },
    logger: true, // Optional: Enable logging for debugging
});
