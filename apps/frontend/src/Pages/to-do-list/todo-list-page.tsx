import UserMenu from "./components/user-menu";
import TodoList from "./components/todo-list";

export default function TodoListPage() {
  return (
    <div>
      <div className="flex justify-end items-center p-4">
        <UserMenu />
      </div>
      <div className="todos-container flex flex-col items-center gap-4">
        <TodoList />
      </div>
    </div>
  );
}
