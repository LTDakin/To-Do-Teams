import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(): import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, never, any[], any>;
    findUserByUsername(username: string): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where">;
    findUserById(id: number): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where">;
    signup(signupDto: any): import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgInsertBase<any, import("drizzle-orm/node-postgres", { with: { "resolution-mode": "import" } }).NodePgQueryResultHKT, undefined, undefined, false, never>;
    signin(signinDto: any): Omit<import("drizzle-orm/pg-core", { with: { "resolution-mode": "import" } }).PgSelectBase<any, any, "single", any, false, "where", any[], any>, "where"> | undefined;
}
