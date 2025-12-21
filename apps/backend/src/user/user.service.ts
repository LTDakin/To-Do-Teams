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

  async signin(signInDto: signInDto): Promise<{ accessToken: string }> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, signInDto.username));

    if (!bcrypt.compareSync(signInDto.password, result[0].passwordHash)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: 'userId', username: 'placeholder_username' };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async signup(signUpDto: signInDto): Promise<{ accessToken: string }> {
    // We don't allow users with the same username
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
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
