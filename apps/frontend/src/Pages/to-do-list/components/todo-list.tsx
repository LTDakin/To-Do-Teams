import { Button } from "antd";
import TodoItem from "./todo-item";

export default function TodoList() {
  const samepleTodo = {
    id: "1",
    title: "Sample Todo",
    completed: false,
    ownerId: "12",
    sharedWithUserIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <>
      <h1 className="todos-title">To-do's</h1>
      <div className="todos-list w-96 flex flex-col gap-4">
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
      </div>
      <Button onClick={() => console.log("add todo clicked")}>Add Todo</Button>
    </>
  );
}
