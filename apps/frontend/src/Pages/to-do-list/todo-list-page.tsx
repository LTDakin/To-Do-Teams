import TodoItem from "./components/todo-item";
import type { TodoDto } from "@team-do/types";

const samepleTodo: TodoDto = {
  id: "1",
  title: "Sample Todo",
  completed: false,
  ownerId: "12",
  sharedWithUserIds: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function TodoListPage() {
  return (
    <div>
      <h1>To-Do List</h1>
      <TodoItem todo={samepleTodo} />
    </div>
  );
}
