import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { SigninSchema, SigninDto } from '@team-do/types';

export default function LoginPage() {
  const [form] = Form.useForm();

  const attemptLogin = (values: {username: string, password: string}) => {
    // validate input using Zod schema
    const signinValue: SigninDto = SigninSchema.parse(values);
    console.log("Attempting login with", signinValue);

  };

  return (
    <div>
      <Card className="w-64" title="Team-Do" variant="borderless">
        <Form form={form} onFinish={attemptLogin}>
          <Form.Item 
            name="username" 
            rules={[{required: true, message: "Please enter your username"}]}
          >
            <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item 
            name="password" 
            rules={[{required: true, message: "Please enter your username"}]}
          >
            <Input size="large" placeholder="Password" prefix={<KeyOutlined />} type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit" value={"Login"}>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
