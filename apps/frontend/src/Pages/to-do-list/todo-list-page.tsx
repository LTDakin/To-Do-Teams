import { Dropdown, MenuProps, Space } from "antd";
import TodoItem from "./components/todo-item";
import { SmileOutlined } from "@ant-design/icons";
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
    label: "Logout",
  },
  {
    key: "2",
    danger: true,
    label: "Delete Account",
  },
];

export default function TodoListPage() {
  const user = useAtomValue(userAtom);

  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex justify-end items-center p-4">
        <Dropdown menu={{ items }}>
          <Space>
            <SmileOutlined />
            {user.username}
          </Space>
        </Dropdown>
      </div>
      <h1>To-Do List</h1>
      <TodoItem todo={samepleTodo} />
    </div>
  );
}
