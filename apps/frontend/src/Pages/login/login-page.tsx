import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { signin, signup } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  type userDTO = { username: string; password: string };
  const [form] = Form.useForm();

  const login = async (credentials: userDTO): Promise<void> => {
    try {
      await signin(credentials);
      navigate("/todos");
    } catch (error) {
      form.setFields([
        {
          name: "password",
          errors: [String(error)],
        },
      ]);
    }
  };

  const createAccount = async (newCredentials: userDTO): Promise<void> => {
    try {
      await signup(newCredentials);
      navigate("/todos");
    } catch (error) {
      form.setFields([
        {
          name: "username",
          errors: [String(error)],
        },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-64 h-min" title="🗒️ Team-Do" variant="borderless">
        <Form form={form} onFinish={login}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input
              size="large"
              placeholder="Password"
              prefix={<KeyOutlined />}
              type="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              block
              size="large"
              htmlType="submit"
              value={"Login"}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          block
          size="large"
          onClick={() => createAccount(form.getFieldsValue())}
        >
          Create Account
        </Button>
      </Card>
    </div>
  );
}
