import { Button, Card, Form, Input } from "antd";
import React, { FC, useContext } from "react";
import { userContext } from "../utils/types";

interface UserProps {}

const Connection: FC<UserProps> = () => {
  const { userId, token, connection, admin } = useContext(userContext);

  const onFinish = (values: any) => {
    connection(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="eMail"
          rules={[{ required: true, message: "Entrez votre email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Entrez votre mot de passe" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Connection;
