import {
  LogoutOutlined,
  SmileOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { userAtom, initialUser } from "../../../state/user";

export default function UserMenu() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

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
    <Dropdown menu={{ items }}>
      <Space>
        {user.username || "Unknown User"}
        <SmileOutlined className="ml-2" style={{ fontSize: "36px" }} />
      </Space>
    </Dropdown>
  );
}
