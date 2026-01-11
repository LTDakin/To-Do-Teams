import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { db, user_todos, and, eq } from '@team-do/db';
import { Request } from 'express';
import { UserReq } from 'src/dtos/userDtos';

interface TodoRequest extends Request {
  user: UserReq;
  params: { id?: string };
  body: { todoId?: number | string };
}

@Injectable()
export class TodoAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<TodoRequest>();
    const userId = request.user?.sub;
    const todoId = request.params.id ?? request.body.todoId;

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
