import { Dropdown, MenuProps, Space } from "antd";
import TodoItem from "./components/todo-item";
import {
  LogoutOutlined,
  SmileOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { userAtom } from "../../state/user";
import { useAtomValue } from "jotai";

const samepleTodo = {
  id: "1",
  title: "Sample Todo",
  completed: false,
  ownerId: "12",
  sharedWithUserIds: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: () => {
      console.log("logout");
    },
  },
  {
    key: "2",
    danger: true,
    icon: <UserDeleteOutlined />,
    label: "Delete Account",
    onClick: () => {
      console.log("delete account");
    },
  },
];

export default function TodoListPage() {
  const user = useAtomValue(userAtom);

  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex justify-end items-center p-4">
        <Dropdown menu={{ items }}>
          <Space>
            {user.username || "Unknown User"}
            <SmileOutlined className="ml-2" style={{ fontSize: "36px" }} />
          </Space>
        </Dropdown>
      </div>
      <h1>To-Do List</h1>
      <TodoItem todo={samepleTodo} />
    </div>
  );
}
