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

  findAllUsers() {
    return db.select().from(users);
  }

  async signin(signInDto: signInDto): Promise<{ accessToken: string }> {
    const result = db
      .select()
      .from(users)
      .where(eq(users.username, signInDto.username));

    console.log('result', result);

    // TODO figure out what the passwordHash should be for this result object
    if (!bcrypt.compareSync(signInDto.password, 'result.passwordHash')) {
      throw new UnauthorizedException();
    }

    console.log('Password is correct');
    console.log('typeof signin', typeof result);
    // return a JWT to sign them in
    return { accessToken: await this.jwtService.signAsync('test') };
  }

  async signup(signUpDto: signInDto): Promise<{ accessToken: string }> {
    // hash plaintext password with bcryptjs
    const hashedPass = bcrypt.hashSync(signUpDto.password, 10);
    // add to db
    const newUserEntry: insertUsersSchema = {
      username: signUpDto.username,
      passwordHash: hashedPass,
    };
    const result = db.insert(users).values(newUserEntry);

    console.log('typeof signup', typeof result);
    // return a JWT to sign them in
    return { accessToken: await this.jwtService.signAsync('test') };
  }
}
