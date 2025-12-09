import { z } from "zod";
/**
 * Team Do Types
 * Shared types and schemas between the server and client
 * Using Zod for schema definitions and validation
 * Schemas defined here can be used for runtime validation as well as TypeScript type inference
 * Schemas:
 *  User Schema
 *  Signin Schema
 *  Todo Schema
 *  Create Todo Payload Schema
 */

// USER SCHEMA
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  sharedUserIds: z.array(z.string()),
});
export type UserDto = z.infer<typeof UserSchema>;

// SIGNIN SCHEMA
export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type SigninDto = z.infer<typeof SigninSchema>;

// TODO SCHEMA
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

// CREATE TODO PAYLOAD SCHEMA
export const CreateTodoPayloadSchema = z.object({
  title: z.string(),
  shareWithUsernames: z.array(z.string()).optional(),
});
export type CreateTodoPayload = z.infer<typeof CreateTodoPayloadSchema>;
