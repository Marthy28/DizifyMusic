import { Button, Card, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useContext, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import SongsForAnAlbum from "../songs/songsForAnAlbum";
import Connection from "../user/connection";
import { userContext } from "../utils/types";
import UpdateAlbum from "./updateAlbum";
import CreateAlbum from "./createAlbum";

type Song = {
  id: number;
  duration?: string;
  name?: string;
  artist: Artist;
  albums: Album;
};

type Album = {
  id: number;
  name?: string;
  pictureUri?: string;
  artist: Artist;
  songs: Song[];
  releaseDate?: string;
};

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums: Album;
};

interface AlbumsProps {
  listArtist?: any;
}

const AlbumsList: FC<AlbumsProps> = ({ listArtist }) => {
  const [Albums, setAlbums] = useState<Album[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const { userId, admin } = useContext(userContext);

  console.log("ICI");
  console.log(listArtist);

  function getAlbums() {
    AlbumsService.getAlbums().then((res) => {
      const Albums = res.data;
      setAlbums(Albums);
    });
  }

  useEffect(() => {
    userId && getAlbums();
  }, [userId]);

  return userId ? (
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
        {Albums.map((album) => (
          <Card
            style={{
              width: 300,
              marginRight: "1%",
              marginBottom: "1%",
              boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ height: 500 }}>
              <h1 style={{ fontWeight: "bold", fontSize: 34 }}>{album.name}</h1>
              <Image
                width={200}
                src={`${album.pictureUri}`}
                style={{ marginBottom: "2%" }}
              />
              <h2
                style={{
                  color: "var(--blue)",
                  fontSize: 16,
                  marginBottom: "5%",
                }}
              >
                {album.artist?.name}
              </h2>

              <p>{album.releaseDate?.slice(0, 10)}</p>
              <SongsForAnAlbum album={album} />
            </div>

            {admin === "null" ? null : (
              <>
                <Button
                  shape="round"
                  onClick={() => {
                    setUpdateModal(true);
                  }}
                >
                  Modifier l'album
                </Button>
                <Modal
                  title="Modifier l'album"
                  visible={updateModal}
                  onOk={() => {
                    setUpdateModal(false);
                    AlbumsService.getAlbumById(album.id.toString());
                  }}
                  onCancel={() => setUpdateModal(false)}
                >
                  <UpdateAlbum data={album} />
                </Modal>
                <Button
                  shape="round"
                  onClick={() => {
                    album.id && AlbumsService.deleteAlbum(album.id.toString());
                  }}
                >
                  Supprimer l'album
                </Button>
              </>
            )}
          </Card>
        ))}
      </div>

      {admin === "null" ? null : (
        <Button
          shape="round"
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Ajouter un album
        </Button>
      )}
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
  ) : (
    <h1>Tu dois te connecter pour accéder à tes playlist</h1>
  );
};
export default AlbumsList;
