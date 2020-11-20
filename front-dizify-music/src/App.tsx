/* eslint-disable no-lone-blocks */
import { message, Tabs } from "antd";
import axios from "axios";
import React, { FC, useState } from "react";
import AlbumsList from "./albums/albums";
import Home from "./app/Home";
import ArtistsList from "./artists/artists";
import Playlists from "./playlists/playlist";
import { userContext } from "./utils/types";

const { TabPane } = Tabs;

const App: FC = () => {
  const [user, setUser] = useState<{
    userId: string;
    token: string;
    admin: string;
  }>({
    userId: window.sessionStorage.getItem("userId")
      ? window.sessionStorage.getItem("userId")!
      : "",
    token: window.sessionStorage.getItem("token")
      ? window.sessionStorage.getItem("token")!
      : "",
    admin: window.sessionStorage.getItem("admin")
      ? window.sessionStorage.getItem("admin")!
      : "",
  });

  const connection = (values: any) => {
    const data = {
      email: values.eMail,
      password: values.password,
    };
    axios.post("http://localhost:8080/login", data).then((res) => {
      console.log(res.data);
      res && message.success(`Connecté`);
      {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
      }
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

  return (
    <userContext.Provider value={{ ...user, connection }}>
      <div
        style={{
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "2%",
        }}
      >
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Accueil" key="1">
            <Home />
          </TabPane>
          <TabPane tab="Artists" key="2">
            <ArtistsList />
          </TabPane>
          <TabPane tab="Albums" key="3">
            <AlbumsList />
          </TabPane>
          <TabPane tab="Favoris" key="4">
            Favoris
          </TabPane>
          <TabPane tab="Playlists" key="5">
            <Playlists />
          </TabPane>
        </Tabs>
      </div>
    </userContext.Provider>
  );
};

export default App;
