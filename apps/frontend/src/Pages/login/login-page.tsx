import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { signin, signup } from '../../services/authService'

export default function LoginPage() {
  const [form] = Form.useForm();

  return (
    <div>
      <Card className="w-64" title="🗒️ Team-Do" variant="borderless">
        <Form form={form} onFinish={signin}>
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
        <Button type="default" block size="large" onClick={() => signup(form.getFieldsValue())}>Create Account</Button>
      </Card>
    </div>
  );
}
