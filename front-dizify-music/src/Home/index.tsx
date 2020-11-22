import { Card, Image } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import albumsService from "../services/albumsService";
import artistService from "../services/artistService";
import Connection from "../user/connection";
import Inscription from "../user/inscription";
import { Album, Artist, userContext } from "../utils/types";

const Home: FC = () => {
  const [Albums, setAlbums] = useState<Album[]>([]);
  const [Artists, setArtists] = useState<Artist[]>([]);
  const { userId } = useContext(userContext);

  useEffect(() => {
    albumsService.getAlbums().then((res) => {
      const Albums = res.data;
      setAlbums(Albums);
    });
    artistService.getArtists().then((res) => {
      const Artists = res.data;
      setArtists(Artists);
    });
  }, [window.sessionStorage]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 55,
          marginTop: 50,
          color: "var(--pink)",
        }}
      >
        Bienvenue sur DizifyMusic
      </h1>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        Artistes qui peuvent vous plaire
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "1%",
          justifyContent: "center",
        }}
      >
        {Artists.slice(0, 3).map((artist, i) => (
          <>
            <Card
              style={{
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: 30 }}>
                {artist.name}
              </h1>
              <Image
                width={200}
                src={`${artist.imageUri}`}
                style={{ marginBottom: "2%" }}
              />
            </Card>
          </>
        ))}
      </div>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        Albums qui peuvent vous plaire
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "1%",
          justifyContent: "center",
        }}
      >
        {Albums.slice(0, 3).map((album, i) => (
          <>
            <Card
              style={{
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: 30 }}>{album.name}</h1>
              <h2
                style={{
                  color: "var(--blue)",
                  fontSize: 16,
                  marginBottom: "5%",
                }}
              >
                {album.artist?.name}
              </h2>
              <Image
                width={200}
                src={`${album.pictureUri}`}
                style={{ marginBottom: "2%" }}
              />
            </Card>
          </>
        ))}
      </div>
    </>
  );
};

export default Home;