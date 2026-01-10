import {
  Checkbox,
  CheckboxProps,
  Dropdown,
  Button,
  MenuProps,
  Input,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSetAtom } from "jotai";
import { todosAtom } from "../../../state/todos";
import { patchTodo, deleteTodo } from "../../../services/todosService";
import { updateTodoDto } from "../../../types";
import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo }: any) {
  const setTodos = useSetAtom(todosAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const inputRef = useRef<any>(null);

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

  function handlePatch(field: keyof updateTodoDto, newValue: any) {
    setTodos((prevTodos) =>
      prevTodos.map((td) =>
        td.id === todo.id ? { ...td, [field]: newValue } : td
      )
    );

    patchTodo(todo.id, { [field]: newValue });
  }

  const handleTitleSubmit = () => {
    if (editText.trim() !== todo.title) {
      handlePatch("title", editText);
    }
    setIsEditing(false);
  };

  function handleDelete() {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
    deleteTodo(todo.id);
  }

  const menuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "edit":
        setIsEditing(true);
        break;
      case "share":
        console.log("Sharing todo");
        break;
      case "delete":
        handleDelete();
        break;
      default:
        break;
    }
  };

  const checkBoxChange: CheckboxProps["onChange"] = (e) => {
    try {
      handlePatch("completed", e.target.checked);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // Autofocus the index once isEditing
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between p-2 w-full">
      {/* 1. Left Side: Checkbox and Title */}
      <Checkbox
        onChange={checkBoxChange}
        checked={todo.completed}
        className={todo.completed ? "line-through text-gray-400" : ""}
      >
        {isEditing ? (
          <Input.TextArea
            ref={inputRef}
            className="ml-2"
            autoSize
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onPressEnter={handleTitleSubmit}
            onBlur={handleTitleSubmit} // Saves if user clicks away
          />
        ) : (
          <>{todo.title}</>
        )}
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
