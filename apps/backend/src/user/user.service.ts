import { Injectable, UnauthorizedException } from '@nestjs/common';
import { users, db, eq } from '@team-do/db'; // TODO move this into its own module to be injected into other services in a nestjs way
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

type insertUsersSchema = typeof users.$inferInsert;
type signInDto = {
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  findAll() {
    return db.select().from(users);
  }

  async findOne(username: string) {
    return await db.select().from(users).where(eq(users.username, username));
  }

  // TODO user a proper dto type for return
  async signin(signInDto: signInDto): Promise<any> {
    // Query for user with username
    const user = await this.findOne(signInDto.username);

    if (user.length === 0) {
      throw new UnauthorizedException('Username not found');
    }

    if (!bcrypt.compareSync(signInDto.password, user[0].passwordHash)) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const payload = { sub: user[0].id, username: user[0].username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user[0].username,
      id: user[0].id,
    };
  }

  // TODO user a proper dto type for return
  async signup(signUpDto: signInDto): Promise<any> {
    // We don't allow two users with the same username
    const existingUser = await this.findOne(signUpDto.username);
    if (existingUser.length > 0) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPass = bcrypt.hashSync(signUpDto.password, 10);
    const newUserEntry: insertUsersSchema = {
      username: signUpDto.username,
      passwordHash: hashedPass,
    };

    const result = await db.insert(users).values(newUserEntry).returning();

    const payload = { sub: result[0].id, username: result[0].username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: result[0].username,
      id: result[0].id,
    };
  }
}
