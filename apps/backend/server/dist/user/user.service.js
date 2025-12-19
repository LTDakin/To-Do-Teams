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
    findAllUsers() {
        return db_1.db.select().from(db_1.users);
    }
    async signin(signInDto) {
        const result = db_1.db
            .select()
            .from(db_1.users)
            .where((0, db_1.eq)(db_1.users.username, signInDto.username));
        console.log('result', result);
        if (!bcryptjs_1.default.compareSync(signInDto.password, 'result.passwordHash')) {
            throw new common_1.UnauthorizedException();
        }
        console.log('Password is correct');
        console.log('typeof signin', typeof result);
        return { accessToken: await this.jwtService.signAsync('test') };
    }
    async signup(signUpDto) {
        const hashedPass = bcryptjs_1.default.hashSync(signUpDto.password, 10);
        const newUserEntry = {
            username: signUpDto.username,
            passwordHash: hashedPass,
        };
        const result = db_1.db.insert(db_1.users).values(newUserEntry);
        console.log('typeof signup', typeof result);
        return { accessToken: await this.jwtService.signAsync('test') };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map