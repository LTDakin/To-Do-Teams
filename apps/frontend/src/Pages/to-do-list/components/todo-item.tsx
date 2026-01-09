import { Checkbox, CheckboxProps, Dropdown, Button, MenuProps } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

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

// Checkbox check/uncheck handler, change matching todo item in atom
const checkBoxChange: CheckboxProps["onChange"] = (e) => {
  if (e.target.checked) {
    // Send PUT request to mark todo as completed to server
    console.log("Marking todo as completed");
  } else {
    // Send PUT request to mark todo as not completed to server
    console.log("Marking todo as not completed");
  }
};

const menuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
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

export default function TodoItem({ todo }: any) {
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
