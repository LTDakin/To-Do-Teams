import { z } from "zod";
/**
 * Team Do Types
 * Shared types and schemas between the server and client
 * Using Zod for schema definitions and validation
 * Schemas defined here can be used for runtime validation as well as TypeScript type inference
 * Schemas:
 * 1. User Schema
 * 2. Todo Schema
 * 3. Create Todo Payload Schema
 */

// 1. USER SCHEMA
export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  username: z.string(),
  sharedUserIds: z.array(z.string()),
});
export type UserDto = z.infer<typeof UserSchema>;

// 2. TODO SCHEMA
export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  ownerId: z.string(),
  sharedWithUserIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TodoDto = z.infer<typeof TodoSchema>;

// 3. CREATE TODO PAYLOAD SCHEMA
export const CreateTodoPayloadSchema = z.object({
  title: z.string(),
  shareWithUsernames: z.array(z.string()).optional(),
});
export type CreateTodoPayload = z.infer<typeof CreateTodoPayloadSchema>;
