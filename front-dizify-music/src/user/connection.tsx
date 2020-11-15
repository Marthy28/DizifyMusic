import { Button, Card, Form, Input } from "antd";
import React, { FC } from "react";

interface UserProps {}

const Connection: FC<UserProps> = () => {
  const onFinish = (values: any) => {
    //TO DO
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      style={{
        width: "30%",
        marginRight: "1%",
        marginBottom: "1%",
        marginTop: 50,
        boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
      }}
    >
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
          label="Mot de passe"
          name="mot de passe"
          rules={[{ required: true, message: "Entrez votre mot de passe" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Connection;
