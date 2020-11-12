import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Button, Tabs } from "antd/lib";
const { TabPane } = Tabs;

const Home: FC<RouteComponentProps> = () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <h1>Coucou DizifyMusic</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Je ne me" key="1">
          coucou 1
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
