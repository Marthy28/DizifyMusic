/* eslint-disable no-lone-blocks */
import { Avatar, Button, message, Tabs } from "antd";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import AlbumsList from "./albums/albums";
import Home from "./Home";
import ArtistsList from "./artists/artists";
import Playlists from "./playlists/playlist";
import { userContext } from "./utils/types";
import Modal from "antd/lib/modal/Modal";
import Connection from "./user/connection";
import usersService from "./services/usersService";

type User = {
  id: number;
  avatarUri: string;
};

const { TabPane } = Tabs;

const App: FC = () => {
  const [UserAvatar, setUserAvatar] = useState<User>();
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<{
    userId: string;
    token: string;
    admin: string | null;
  }>({
    userId: window.sessionStorage.getItem("userId")
      ? window.sessionStorage.getItem("userId")!
      : "",
    token: window.sessionStorage.getItem("token")
      ? window.sessionStorage.getItem("token")!
      : "",
    admin: window.sessionStorage.getItem("admin")
      ? window.sessionStorage.getItem("admin")!
      : null,
  });

  const connection = (values: any) => {
    const data = {
      email: values.eMail,
      password: values.password,
    };
    axios.post("http://localhost:8080/login", data).then((res) => {
      res && message.success(`Connecté`);
      {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
      }
      setVisible(false);
      setUser({
        userId: res.data.user.id,
        token: res.data.token,
        admin: res.data.user.administrator?.id,
      });
      window.sessionStorage.setItem("userId", res.data.user.id);
      window.sessionStorage.setItem("token", res.data.token);
      window.sessionStorage.setItem("admin", res.data.user.administrator?.id);
    });
  };

  const deconnection = () => {
    setUser({
      userId: "",
      token: "",
      admin: "",
    });
    window.sessionStorage.clear();
  };

  function getUserId() {
    usersService.getUserById(user.userId).then((res) => {
      const User = res.data;
      setUserAvatar(User);
    });
  }

  useEffect(() => {
    user.userId && getUserId();
    if (window.sessionStorage.getItem("admin") === "undefined") {
      window.sessionStorage.setItem("admin", "");
      setUser({
        userId: user.userId,
        token: user.token,
        admin: "",
      });
    }
  }, []);

  return (
    <userContext.Provider value={{ ...user, connection }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2%",
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        {user.userId ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              shape="round"
              onClick={() => {
                deconnection();
              }}
            >
              Se déconnecter
            </Button>
            <Avatar size="large" src={UserAvatar?.avatarUri} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              shape="round"
              type="primary"
              style={{ marginRight: "5%" }}
              onClick={() => {
                setVisible(true);
              }}
            >
              Se connecter
            </Button>
            <p>ou</p>
            <Button
              shape="round"
              type="primary"
              style={{ marginLeft: "5%" }}
              onClick={() => {
                setVisible(true);
              }}
            >
              S'inscrire
            </Button>
          </div>
        )}
        <Modal
          footer={null}
          title="Se connecter"
          visible={visible}
          onCancel={() => setVisible(false)}
        >
          <Connection />
        </Modal>

        <Tabs defaultActiveKey="1" centered style={{ marginTop: "2%" }}>
          <TabPane tab="Accueil" key="1">
            <Home />
          </TabPane>
          <TabPane tab="Artists" key="2">
            <ArtistsList />
          </TabPane>
          <TabPane tab="Albums" key="3">
            <AlbumsList />
          </TabPane>
          {user.admin ? null : (
            <>
              <TabPane tab="Favoris" key="4">
                Favoris
              </TabPane>
              <TabPane tab="Playlists" key="5">
                <Playlists />
              </TabPane>
            </>
          )}
        </Tabs>
      </div>
    </userContext.Provider>
  );
};

export default App;
