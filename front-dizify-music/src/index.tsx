import { Tabs } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import AlbumsList from "./albums/albums";
import Home from "./app/Home";
import ArtistsList from "./artists/artists";
import Playlists from "./playlists/playlist";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.less";
import "./styles/index.scss";

const { TabPane } = Tabs;

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
