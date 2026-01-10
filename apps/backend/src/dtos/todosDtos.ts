type createTodoDto = {
  title: string;
  ownerId: number;
};

type updateTodoDto = {
  title?: string;
  ownerId?: number;
  completed?: boolean;
};

type ShareTodoDto = {
  todoId: number;
  userId: number;
  shareeName: string;
};

export type { createTodoDto, updateTodoDto, ShareTodoDto };
