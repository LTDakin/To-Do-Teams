import { Checkbox, CheckboxProps, Dropdown, Button, MenuProps } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import { todosAtom } from "../../../state/todos";
import { patchTodo } from "../../../services/todosService";

export default function TodoItem({ todo }: any) {
  const [todos, setTodos] = useAtom(todosAtom);

  // Menu options for a todo
  type MenuItem = Required<MenuProps>["items"][number];
  const todoActionMenu: MenuItem[] = [
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "share",
      label: "Share",
      icon: <UserAddOutlined />,
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
    },
  ];

  const menuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "edit":
        console.log("Editing todo");
        break;
      case "share":
        console.log("Sharing todo");
        break;
      case "delete":
        console.log("Deleting todo");
        break;
      default:
        break;
    }
  };

  const checkBoxChange: CheckboxProps["onChange"] = async (e) => {
    try {
      const newValue: boolean = e.target.checked;

      setTodos((prevTodos) =>
        prevTodos.map((td) =>
          td.id === todo.id ? { ...td, completed: newValue } : td
        )
      );

      await patchTodo(todo.id, { completed: newValue });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 w-full">
      {/* 1. Left Side: Checkbox and Title */}
      <Checkbox
        onChange={checkBoxChange}
        checked={todo.completed}
        className={todo.completed ? "line-through text-gray-400" : ""}
      >
        {todo.title}
      </Checkbox>

      {/* 2. Right Side: The Actions Menu */}
      <Dropdown
        menu={{ items: todoActionMenu, onClick: menuClick }}
        trigger={["hover"]}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    </div>
  );
}
