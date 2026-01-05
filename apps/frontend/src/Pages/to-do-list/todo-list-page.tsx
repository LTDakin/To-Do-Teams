import { Dropdown, MenuProps, Space } from "antd";
import TodoItem from "./components/todo-item";
import {
  LogoutOutlined,
  SmileOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { userAtom, initialUser } from "../../state/user";
import { useAtom } from "jotai";

export default function TodoListPage() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const samepleTodo = {
    id: "1",
    title: "Sample Todo",
    completed: false,
    ownerId: "12",
    sharedWithUserIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  function logout(): void {
    setUser(initialUser);
    navigate("/");
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => logout(),
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

  return (
    <div>
      <div className="flex justify-end items-center p-4">
        <Dropdown menu={{ items }}>
          <Space>
            {user.username || "Unknown User"}
            <SmileOutlined className="ml-2" style={{ fontSize: "36px" }} />
          </Space>
        </Dropdown>
      </div>
      <div className="todos-container flex flex-col items-center gap-4">
        <h1 className="todos-title">To-do's</h1>
        <div className="todos-list w-96 flex flex-col gap-4">
          <TodoItem todo={samepleTodo} />
          <TodoItem todo={samepleTodo} />
          <TodoItem todo={samepleTodo} />
          <TodoItem todo={samepleTodo} />
        </div>
      </div>
    </div>
  );
}
