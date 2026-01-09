import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { todos, user_todos, db, eq } from '@team-do/db';
import type { createTodoDto, updateTodoDto } from './dtos/todosDtos';

// TODO ensure only owners can create/edit/delete their own todos, how to verify this?
@Injectable()
export class TodosService {
  async create(createTodoDto: createTodoDto): Promise<any> {
    // Use transaction since we want to insert into two tables or not at all
    return await db.transaction(async (tx) => {
      try {
        // Insert in todos table
        const [newTodo] = await tx
          .insert(todos)
          .values({
            title: createTodoDto.title,
            ownerId: createTodoDto.ownerId,
          })
          .returning();

        if (!newTodo) {
          tx.rollback();
        }

        // insert in user_todos join table
        await tx.insert(user_todos).values({
          todoId: newTodo.id,
          userId: createTodoDto.ownerId,
        });

        return newTodo;
      } catch (error) {
        console.log('Failed to insert todo or user_todo', error);
        throw new InternalServerErrorException('Could not save your Todo');
      }
    });
  }

  async findUsersTodos(userId: number): Promise<any[]> {
    return await db
      .select({
        // Otherwise select returns the joined table
        id: todos.id,
        title: todos.title,
        completed: todos.completed,
        ownerId: todos.ownerId,
        createdAt: todos.createdAt,
        updatedAt: todos.updatedAt,
      })
      .from(todos)
      .innerJoin(user_todos, eq(todos.id, user_todos.todoId))
      .where(eq(user_todos.userId, userId));
  }

  async findOne(id: number) {
    const [todo] = await db.select().from(todos).where(eq(todos.id, id));

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(id: number, updateTodoDto: updateTodoDto) {
    const [todo] = await db
      .update(todos)
      .set(updateTodoDto)
      .where(eq(todos.id, id))
      .returning();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async remove(id: number) {
    const [todo] = await db.delete(todos).where(eq(todos.id, id)).returning();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
