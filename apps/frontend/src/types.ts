type todo = {
  id: number;
  title: string;
  ownerId: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type createTodoDto = {
  title: string;
  ownerId: number;
};

type updateTodoDto = {
  title?: string;
  ownerId?: number;
  completed?: boolean;
};

type user = {
  username: string;
  id: number;
  accessToken: string;
};

export type { todo, createTodoDto, updateTodoDto, user };
