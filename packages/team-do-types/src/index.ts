/**
 * 1. USER INTERFACES
 * What the API returns after successful login or profile fetch.
 */
export interface UserDto {
    id: string;
    email: string;
    username: string;
    // An array of user IDs this user has shared their todos with, or vice versa
    sharedUserIds: string[]; 
}

/**
 * 2. TODO INTERFACES
 * The core data structure for a single to-do item.
 */
export interface TodoDto {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    ownerId: string;
    // IDs of users this specific todo is shared with
    sharedWithUserIds: string[]; 
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 3. API PAYLOAD INTERFACE (Example)
 * The data structure for creating a new todo item.
 */
export interface CreateTodoPayload {
    title: string;
    description?: string;
    // When creating a todo, the user might specify who to share it with
    shareWithUsernames?: string[]; 
}
