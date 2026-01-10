import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { db, user_todos, and, eq } from '@team-do/db';
import { Request } from 'express';
import { UserReq } from 'src/dtos/userDtos';

type RequestWithUser = Request & { user: UserReq };

@Injectable()
export class TodoAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.sub;
    const todoId = request.params.id;

    if (!userId || !todoId) return false;

    const [access] = await db
      .select()
      .from(user_todos)
      .where(
        and(
          eq(user_todos.todoId, Number(todoId)),
          eq(user_todos.userId, userId),
        ),
      );

    if (!access) {
      throw new ForbiddenException('You do not have access to this todo.');
    }

    return true;
  }
}
