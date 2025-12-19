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
const db_1 = require("@team-do/db");
let UserService = class UserService {
    findAllUsers() {
        return db_1.db.select().from(db_1.users);
    }
    signin(signInDto) {
        const result = db_1.db
            .select()
            .from(db_1.users)
            .where((0, db_1.eq)(db_1.users.username, signInDto.username));
        return result;
    }
    signup(signUpDto) {
        const newUserEntry = {
            username: signUpDto.username,
            passwordHash: signUpDto.password,
        };
        return db_1.db.insert(db_1.users).values(newUserEntry);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map