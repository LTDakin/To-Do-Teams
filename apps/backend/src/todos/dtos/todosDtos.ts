type createTodoDto = {
  title: string;
  ownerId: number;
};

type updateTodoDto = {
  title: string;
  ownerId: number;
  completed: boolean;
};

export type { createTodoDto, updateTodoDto };
