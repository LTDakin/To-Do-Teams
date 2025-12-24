"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("@team-do/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    findAll() {
        return db_1.db.select().from(db_1.users);
    }
    async findOne(username) {
        return await db_1.db.select().from(db_1.users).where((0, db_1.eq)(db_1.users.username, username));
    }
    async signin(signInDto) {
        const user = await this.findOne(signInDto.username);
        if (user.length === 0) {
            throw new common_1.UnauthorizedException('Username not found');
        }
        if (!bcryptjs_1.default.compareSync(signInDto.password, user[0].passwordHash)) {
            throw new common_1.UnauthorizedException('Incorrect Password');
        }
        const payload = { sub: user[0].id, username: user[0].username };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            username: user[0].username,
            id: user[0].id,
        };
    }
    async signup(signUpDto) {
        const existingUser = await this.findOne(signUpDto.username);
        if (existingUser.length > 0) {
            throw new common_1.UnauthorizedException('Username already exists');
        }
        const hashedPass = bcryptjs_1.default.hashSync(signUpDto.password, 10);
        const newUserEntry = {
            username: signUpDto.username,
            passwordHash: hashedPass,
        };
        const result = await db_1.db.insert(db_1.users).values(newUserEntry).returning();
        const payload = { sub: result[0].id, username: result[0].username };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            username: result[0].username,
            id: result[0].id,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map