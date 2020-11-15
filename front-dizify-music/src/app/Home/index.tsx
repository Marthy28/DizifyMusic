import { RouteComponentProps } from "@reach/router";
import { Tabs } from "antd/lib";
import React, { FC } from "react";
import AlbumsList from "../../albums/albums";
import ArtistsList from "../../artists/artists";

const { TabPane } = Tabs;

const Home: FC<RouteComponentProps> = () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
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
