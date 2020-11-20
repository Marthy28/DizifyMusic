import { Button, Card, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState, useContext } from "react";
import ArtistService from "../services/artistService";
import CreateArtist from "./createArtist";
import { userContext } from "../utils/types";

type Song = {
  id: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  albums: Album[];
};

type Album = {
  id: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs?: Song;
  releaseDate?: string;
};

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums: Album[];
};

interface Props {}

const ArtistsList: FC<Props> = () => {
  const [Artists, setArtists] = useState<Artist[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { isConnected, userId, token, connection } = useContext(userContext);

  function getArtists() {
    ArtistService.getArtists().then((res) => {
      const Artists = res.data;
      console.log(Artists);

      setArtists(Artists);
    });
  }

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 55,
          marginTop: 50,
          color: "var(--pink)",
        }}
      >
        Artistes
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Artists.map((artist, i) => (
          <>
            <Card
              key={i}
              style={{
                flex: 1,
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ height: 440 }}>
                <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                  {artist.name}
                </h1>

                {artist.albums.length ? (
                  artist.albums.map((album: any) => (
                    <>
                      <h3>Liste Albums :</h3>
                      <p>{album.name}</p>
                      <p>{album.releaseDate?.slice(0, 10)}</p>
                      <p>{album.songs.length}</p>
                    </>
                  ))
                ) : (
                  <p>Pas d'album pour cet artist</p>
                )}

                <Image
                  width={200}
                  src={`${artist.imageUri}`}
                  style={{ marginBottom: "2%" }}
                />

                <Image
                  width={200}
                  src={`${artist.imageUri}`}
                  style={{ marginBottom: "2%" }}
                />
              </div>
              <Button
                shape="round"
                onClick={() => {
                  artist.id &&
                    ArtistService.deleteArtist(artist.id.toString(), token);
                }}
              >
                Supprimer l'artiste
              </Button>
            </Card>
          </>
        ))}
      </div>
      <Button
        shape="round"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Ajouter un artiste
      </Button>
      <Modal
        title="Ajouter un artiste"
        visible={visible}
        onOk={() => {
          setVisible(false);
          getArtists();
        }}
        onCancel={() => setVisible(false)}
      >
        <CreateArtist />
      </Modal>
    </>
  );
};

export default ArtistsList;
