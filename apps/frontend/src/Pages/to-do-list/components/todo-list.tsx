import { Button, Card, Input } from "antd";
const { TextArea } = Input;
import TodoItem from "./todo-item";
import { PlusOutlined } from "@ant-design/icons";
import { createTodo } from "../../../services/todosService";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../state/user";

export default function TodoList() {
  const user = useAtomValue(userAtom);
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<any[]>([]);

  async function createNewTodo() {
    try {
      console.log("Creating new todo:", { title: newTodo, ownerId: user.id });
      console.log(await createTodo({ title: newTodo, ownerId: user.id }));

      setNewTodo("");
    } catch (error) {
      // TODO set the error message on the textarea
      console.error("Failed to create todo:", error);
    }
  }

  return (
    <Card title="To-do's" className="w-fit">
      <div className="flex gap-2">
        <Button icon={<PlusOutlined />} onClick={createNewTodo} />
        <TextArea
          autoSize
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onPressEnter={createNewTodo}
        />
      </div>
      <div className="todos-list w-96 pt-4">
        {todos.length === 0 ? (
          <p>You're have nothing todo!</p>
        ) : (
          todos.map((item) => <TodoItem key={item.id} todo={item} />)
        )}
      </div>
    </Card>
  );
}
