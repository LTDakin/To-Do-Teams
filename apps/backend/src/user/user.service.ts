import { Injectable } from '@nestjs/common';
import { users, db, eq } from '@team-do/db'; // TODO move this into its own module to be injected into other services in a nestjs way

type insertUsersSchema = typeof users.$inferInsert;

@Injectable()
export class UserService {
  findAllUsers() {
    return db.select().from(users);
  }

  signin(signInDto: { username: string; password: string }) {
    const result = db
      .select()
      .from(users)
      .where(eq(users.username, signInDto.username));

    return result;
  }

  signup(signUpDto: { username: string; password: string }) {
    const newUserEntry: insertUsersSchema = {
      username: signUpDto.username,
      passwordHash: signUpDto.password,
    };
    return db.insert(users).values(newUserEntry);
  }
}
