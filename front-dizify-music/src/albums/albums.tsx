import { Button, Card, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import SongsForAnAlbum from "../songs/songsForAnAlbum";
import { Album } from "../utils/types";
import CreateAlbum from "./createAlbum";

interface AlbumsProps {}

const AlbumsList: FC<AlbumsProps> = () => {
  const [Albums, setAlbums] = useState<Album[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  function getAlbums() {
    AlbumsService.getAlbums().then((res) => {
      const Albums = res.data;
      setAlbums(Albums);
    });
  }

  useEffect(() => {
    getAlbums();
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
        Albums
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Albums.map((album, i) => (
          <>
            <Card
              style={{
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ height: 500 }}>
                <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                  {album.name}
                </h1>
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
                <SongsForAnAlbum album={album} />
              </div>
              <Button
                shape="round"
                onClick={() => {
                  album.id && AlbumsService.deleteAlbum(album.id.toString());
                }}
              >
                Supprimer l'album
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
        Ajouter un album
      </Button>
      <Modal
        title="Ajouter un album"
        visible={visible}
        onOk={() => {
          setVisible(false);
          getAlbums();
        }}
        onCancel={() => setVisible(false)}
      >
        <CreateAlbum />
      </Modal>
    </>
  );
};

export default AlbumsList;
