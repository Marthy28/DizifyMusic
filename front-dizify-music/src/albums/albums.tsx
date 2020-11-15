import { Button, Image } from "antd";
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

  const newAlbumSend = useRef(null);

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
    <ul>
      {Albums.map((album, i) => (
        <>
          {album.name}
          {album.artist?.name}
          <Image width={200} src={`${album.pictureUri}`} />
        </>
      ))}
      <Button type="primary" onClick={() => setVisible(true)}>
        Ajouter
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
    </ul>
  );
};

export default AlbumsList;
