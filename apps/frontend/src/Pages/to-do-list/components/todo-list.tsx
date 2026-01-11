import { Button, Card, Input } from "antd";
const { TextArea } = Input;
import TodoItem from "./todo-item";
import { PlusOutlined } from "@ant-design/icons";
import { createTodo, findMyTodos } from "../../../services/todosService";
import { useEffect, useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import { userAtom } from "../../../state/user";
import { todosAtom } from "../../../state/todos";

export default function TodoList() {
  const user = useAtomValue(userAtom);
  const [todos, setTodos] = useAtom(todosAtom);
  const [todoInput, setTodoInput] = useState<string>("");
  const [todosLoading, setTodosLoading] = useState(false);

  async function loadTodos() {
    if (!user?.id) return;

    try {
      setTodosLoading(true);
      const data = await findMyTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setTodosLoading(false);
    }
  }

  async function createNewTodo() {
    try {
      await createTodo({ title: todoInput, ownerId: user.id });
      setTodoInput("");
      await loadTodos();
    } catch (error) {
      // TODO set the error message on the textarea
      console.error("Failed to create todo:", error);
    }
  }

  useEffect(() => {
    loadTodos();
  }, [user?.id]);

  return (
    <Card title="To-do's" className="w-fit">
      <div className="flex gap-2">
        <Button icon={<PlusOutlined />} onClick={createNewTodo} />
        <TextArea
          autoSize
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onPressEnter={createNewTodo}
        />
      </div>
      <div className="todos-list w-96 pt-4">
        {todos.length === 0 ? (
          <p>You're have nothing todo!</p>
        ) : (
          todos.map((td) => <TodoItem key={td.id} todo={td} />)
        )}
      </div>
    </Card>
  );
}
