import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Button, Tabs } from "antd/lib";
import ArtistsList from "../../artists/artists";


const { TabPane } = Tabs;

const Home: FC<RouteComponentProps> = () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <h1>Coucou DizifyMusic</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Artists" key="1">
          <ArtistsList/>
        </TabPane>
        <TabPane tab="souviens plus" key="2">
          coucou 2
        </TabPane>
        <TabPane tab="du sujet !" key="3">
          Bonne soirée :*
        </TabPane>
      </Tabs>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default Home;
