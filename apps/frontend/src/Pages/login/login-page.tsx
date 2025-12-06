import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputRef } from "antd";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const [form] = Form.useForm();

  const attemptLogin = (values: {username: string, password: string}) => {
    // TODO create Zod schema for logins
    // TODO use that login schema to validate username and password
    console.log("Attempting login with", values.username, values.password);
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
