import { Tabs } from "antd";
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
    isConnected: boolean;
    userId: string;
    token: string;
  }>({
    isConnected: false,
    userId: "",
    token: "",
  });

  const connection = (values: any) => {
    const data = {
      email: values.eMail,
      password: values.password,
    };
    axios.post("http://localhost:8080/login", data).then((res) => {
      console.log("Connected !");
      setUser({
        isConnected: true,
        userId: res.data.user.id,
        token: res.data.token,
      });
    });
  };

  return (
    <userContext.Provider value={{ ...user, connection }}>
      <div
        style={{
          width: "90%",
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
