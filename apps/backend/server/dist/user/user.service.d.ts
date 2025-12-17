export declare class UserService {
    findAllUsers(): import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, never, any[], any>;
    findUserByUsername(username: string): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where">;
    findUserById(id: number): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where">;
    signin(signInDto: any): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where">;
    signup(newUserData: any): import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgInsertBase<any, import("drizzle-orm/node-postgres", { with: { "resolution-mode": "import" } }).NodePgQueryResultHKT, undefined, undefined, false, never>;
}
