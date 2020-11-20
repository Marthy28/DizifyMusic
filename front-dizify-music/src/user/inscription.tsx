import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import React, { FC } from "react";
import { message } from "antd";

interface UserProps {}

const Inscription: FC<UserProps> = () => {
  const onFinish = (values: any) => {
    const data = {
      eMail: values.eMail,
      password: values.password,
      pseudo: values.pseudo,
      avatarUri: values.avatarUri,
    };
    axios.post("http://localhost:8080/signin", data).then((res) => {
      res &&
        message.success(`Tu es inscrit.e ${res.data.pseudo} ! Connecte toi !`);
    });
  };

  return (
    <>
      <Card
        style={{
          width: "30%",
          marginRight: "1%",
          marginBottom: "1%",
          marginTop: 50,
          boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            fontSize: 40,
            marginBottom: 50,
          }}
        >
          S'inscrire
        </h2>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Pseudo"
            name="pseudo"
            rules={[{ required: true, message: "Entrez votre pseudo" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="eMail"
            rules={[{ required: true, message: "Entrez votre email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Entrez votre mot de passe" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Lien vers votre avatar"
            name="avatarUri"
            rules={[{ message: "Lien vers votre avatar" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" shape="round" htmlType="submit">
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Inscription;
