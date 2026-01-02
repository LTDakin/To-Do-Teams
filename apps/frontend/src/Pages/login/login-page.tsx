import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { userAtom } from "../../state/user";
import { signin, signup } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  type userDTO = { username: string; password: string };
  const [form] = Form.useForm();

  const login = async (credentials: userDTO): Promise<void> => {
    try {
      setUser(await signin(credentials));
      navigate("/todos");
    } catch (error) {
      setFormField(form, "password", [String(error)]);
    }
  };

  const createAccount = async (newCredentials: userDTO): Promise<void> => {
    try {
      setUser(await signup(newCredentials));
      navigate("/todos");
    } catch (error) {
      setFormField(form, "username", [String(error)]);
    }
  };

  // Helper to set antd form field error messages
  const setFormField = (form: any, name: string, errors: string[]): void => {
    form.setFields([
      {
        name: name,
        errors: errors,
      },
    ]);
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
