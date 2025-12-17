"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("@team-do/db");
let UserService = class UserService {
    findAllUsers() {
        return db_1.db.select().from(db_1.usersTable);
    }
    findUserByUsername(username) {
        return db_1.db
            .select()
            .from(db_1.usersTable)
            .where((0, drizzle_orm_1.eq)(db_1.usersTable.username, username));
    }
    findUserById(id) {
        return db_1.db.select().from(db_1.usersTable).where((0, drizzle_orm_1.eq)(db_1.usersTable.id, id));
    }
    signin(signInDto) {
        return db_1.db
            .select()
            .from(db_1.usersTable)
            .where((0, drizzle_orm_1.eq)(db_1.usersTable.username, signInDto.username));
    }
    signup(newUserData) {
        const newUser = {
            username: newUserData.username,
            passwordHash: newUserData.password,
        };
        console.log(newUser);
        return db_1.db.insert(db_1.usersTable).values(newUser);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map