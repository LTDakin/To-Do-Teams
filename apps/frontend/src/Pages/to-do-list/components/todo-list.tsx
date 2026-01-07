import { Button, Card, Input } from "antd";
const { TextArea } = Input;
import TodoItem from "./todo-item";
import { PlusOutlined } from "@ant-design/icons";

export default function TodoList() {
  const samepleTodo = {
    id: "1",
    title: "Sample Todo",
    completed: false,
    ownerId: "12",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <Card title="To-do's" className="w-fit">
      <div className="flex gap-2">
        <Button
          icon={<PlusOutlined />}
          onClick={() => console.log("add todo clicked")}
        />
        <TextArea autoSize />
      </div>
      <div className="todos-list w-96">
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
        <TodoItem todo={samepleTodo} />
      </div>
    </Card>
  );
}
