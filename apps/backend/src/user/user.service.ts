import { Injectable, UnauthorizedException } from '@nestjs/common';
import { users, db, eq } from '@team-do/db'; // TODO move this into its own module to be injected into other services in a nestjs way
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

type createUsersDto = typeof users.$inferInsert;
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

  async findById(id: number) {
    return await db.select().from(users).where(eq(users.id, id));
  }

  async findByUsername(username: string) {
    return await db.select().from(users).where(eq(users.username, username));
  }

  // TODO user a proper dto type for return
  async signin(signInDto: signInDto): Promise<any> {
    // Query for user with username
    const [user] = await this.findByUsername(signInDto.username);

    if (!user) {
      throw new UnauthorizedException('Username not found');
    }

    if (!bcrypt.compareSync(signInDto.password, user.passwordHash)) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      id: user.id,
    };
  }

  // TODO user a proper dto type for return
  async signup(signUpDto: signInDto): Promise<any> {
    // We don't allow two users with the same username
    const [existingUser] = await this.findByUsername(signUpDto.username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPass = bcrypt.hashSync(signUpDto.password, 10);

    const newUser: createUsersDto = {
      username: signUpDto.username,
      passwordHash: hashedPass,
    };

    const [user] = await db.insert(users).values(newUser).returning();

    const jwtPayload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
      username: user.username,
      id: user.id,
    };
  }
}
