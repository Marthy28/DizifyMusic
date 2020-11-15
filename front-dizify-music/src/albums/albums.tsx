import { Button, Card, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useRef, useState } from "react";
import AlbumsService from "../services/albumsService";
import CreateAlbum from "./createAlbum";

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
};

type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
};

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
              <h1 style={{ fontWeight: "bold", fontSize: 20 }}>{album.name}</h1>
              {album.artist?.name}
              <Image width={200} src={`${album.pictureUri}`} />
            </Card>
          </>
        ))}
      </div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Ajouter un album
      </Button>
      <Modal
        title="Ajouter un album"
        visible={visible}
        onOk={() => {
          getAlbums();
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <CreateAlbum />
      </Modal>
    </>
  );
};

export default AlbumsList;
