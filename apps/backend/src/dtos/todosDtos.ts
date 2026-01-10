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
  ownerId: number;
  shareeName: string;
};

export type { createTodoDto, updateTodoDto, ShareTodoDto };
