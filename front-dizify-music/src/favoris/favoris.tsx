import { Card, Image } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import favorisService from "../services/favorisService";
import { FavorisType, userContext } from "../utils/types";

const Favoris: FC = () => {
  const [Favoris, setFavoris] = useState<FavorisType>();
  const { userId } = useContext(userContext);

  function getFavorisByUser() {
    favorisService.getFavorisByUser(userId).then((res) => {
      const Favoris = res.data;
      setFavoris(Favoris);
    });
  }

  useEffect(() => {
    getFavorisByUser();
  }, []);

  return userId ? (
    <>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 55,
          marginTop: 50,
          marginBottom: 50,
          color: "var(--pink)",
        }}
      >
        Mes favoris
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "1%",
        }}
      >
        <div>
          <h1 style={{ fontSize: 20 }}> Mes albums favoris </h1>
          {Favoris?.albums?.map((albumfav, i) => (
            <Card
              style={{
                width: 350,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
                flexDirection: "column",
              }}
            >
              <p>{albumfav.name}</p>
              <p>{albumfav.releaseDate}</p>
              <Image
                width={200}
                src={`${albumfav.pictureUri}`}
                style={{ marginBottom: "2%" }}
              />
            </Card>
          ))}
        </div>
        <div>
          <h1 style={{ fontSize: 20 }}> Mes artistes favoris </h1>
          {Favoris?.artists?.map((artistfav, i) => (
            <Card
              style={{
                width: 350,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
                flexDirection: "column",
              }}
            >
              {artistfav.name}
              <Image
                width={200}
                src={`${artistfav.imageUri}`}
                style={{ marginBottom: "2%" }}
              />
            </Card>
          ))}
        </div>
        <div>
          <h1 style={{ fontSize: 20 }}> Mes chansons favorites </h1>
          {Favoris?.songs?.map((songfav, i) => (
            <Card
              style={{
                width: 350,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
                flexDirection: "column",
              }}
            >
              <p>{songfav.name}</p>
              <p>{songfav.duration}</p>
            </Card>
          ))}
        </div>
      </div>
    </>
  ) : (
    <h1>Tu dois te connecter pour accéder à tes favoris</h1>
  );
};

export default Favoris;
