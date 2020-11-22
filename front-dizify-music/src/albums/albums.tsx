import { Button, Card, Image, Modal, message } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import React, { FC, useContext, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import favorisService from "../services/favorisService";
import SongsForAnAlbum from "../songs/songsForAnAlbum";
import { Album, FavorisType, userContext } from "../utils/types";
import CreateAlbum from "./createAlbum";
import UpdateAlbum from "./updateAlbum";

interface AlbumsProps {}

const AlbumsList: FC<AlbumsProps> = () => {
  const [Albums, setAlbums] = useState<Album[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { userId, admin, token } = useContext(userContext);
  const [favorite, setFavorite] = useState<FavorisType>();

  function getAlbums() {
    AlbumsService.getAlbums().then((res) => {
      const Albums = res.data;
      setAlbums(Albums);
    });
  }

  function deleteID(albumID: number) {
    AlbumsService.deleteAlbum(albumID.toString(), token).then((res) => {
      getAlbums();
      message.success(`Supprimé`);
    });
  }

  function getFavorisByUser() {
    favorisService.getFavorisByUser(userId).then((res) => {
      const favorisRes = res.data;
      setFavorite(favorisRes);
    });
  }

  function DataModal(albumID: any) {
    Modal.success({
      title: "Modifier l'album",
      content: <UpdateAlbum data={albumID} />,
      onOk: () => getAlbums(),
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
              <Button
                style={{ border: "none", color: "var(--pink)" }}
                onClick={() => {
                  favorisService.addAlbumToFavorites(favorite?.id, album.id);
                  message.success("Ajouté en favoris");
                  getFavorisByUser();
                }}
                shape="circle"
                icon={<HeartOutlined />}
              />
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

            {admin && (
              <>
                <Button
                  shape="round"
                  onClick={() => {
                    DataModal(album.id);
                  }}
                >
                  Modifier l'album
                </Button>
                <Button
                  shape="round"
                  onClick={() => {
                    album.id && deleteID(album.id);
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
    <h1>Connexion requise</h1>
  );
};
export default AlbumsList;
