import { Injectable } from '@nestjs/common'; // TODO move this into its own module to be injected into other services in a nestjs way
import { eq } from 'drizzle-orm';
import { usersTable, db } from '@team-do/db';

@Injectable()
export class UserService {
  findAllUsers() {
    return db.select().from(usersTable);
  }

  findUserByUsername(username: string) {
    return db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
  }

  findUserById(id: number) {
    return db.select().from(usersTable).where(eq(usersTable.id, id));
  }

  signin(signInDto) {
    return db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, signInDto.username));
  }

  signup(newUserData) {
    type insertUserTableSchema = typeof usersTable.$inferInsert;
    const newUser: insertUserTableSchema = {
      username: newUserData.username,
      passwordHash: newUserData.password,
    };
    console.log(newUser);
    return db.insert(usersTable).values(newUser);
  }
}
