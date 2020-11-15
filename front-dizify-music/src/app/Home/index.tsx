import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd/lib";
import React, { FC } from "react";
import AlbumsList from "../../albums/albums";
import ArtistsList from "../../artists/artists";

const { TabPane } = Tabs;

const Home: FC<RouteComponentProps> = () => {
  return (
    <div
      style={{
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "2%",
      }}
    >
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Artists" key="1">
          <ArtistsList />
        </TabPane>
        <TabPane tab="Albums" key="2">
          <AlbumsList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
