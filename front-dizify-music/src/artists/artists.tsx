import { PlaySquareOutlined, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Image, Modal, message } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import ArtistService from "../services/artistService";
import favorisService from "../services/favorisService";
import playlistService from "../services/playlistService";
import AddSongToPlaylist from "../songs/addSongToPlaylist";
import { FavorisType, userContext } from "../utils/types";
import CreateArtist from "./createArtist";
import UpdateArtist from "./updateArtist";

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
  artist_id: string;
};

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums: Album[];
  songs: Song[];
};

const ArtistsList: FC = () => {
  const [Artists, setArtists] = useState<Artist[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<FavorisType>();
  const { userId, admin, token } = useContext(userContext);

  function getArtists() {
    ArtistService.getArtists().then((res) => {
      const Artists = res.data;
      setArtists(Artists);
    });
  }

  function getFavorisByUser() {
    favorisService.getFavorisByUser(userId).then((res) => {
      const favorisRes = res.data;
      setFavorite(favorisRes);
    });
  }

  function deleteID(artistID: number) {
    ArtistService.deleteArtist(artistID.toString(), token).then((res) => {
      getArtists();
    });
  }

  function DataModal(artistID: any) {
    Modal.success({
      title: "Modifier l'artiste",
      content: <UpdateArtist data={artistID} />,
      onOk: () => getArtists(),
    });
  }

  function DataModalAddPlaylist(songId: any) {
    Modal.success({
      title: "Ajouter un titre à une playlist",
      content: <AddSongToPlaylist songId={songId} />,
      icon: <PlaySquareOutlined />,
      onOk: () => playlistService.getPlaylistsByUser(userId),
    });
  }

  useEffect(() => {
    userId && getArtists();
    getFavorisByUser();
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
        Artistes
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Artists.map((artist, _i) => (
          <>
            <Card
              style={{
                flex: 1,
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ height: 600 }}>
                <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                  {artist.name}
                </h1>
                <Button
                  style={{ border: "none", color: "var(--pink)" }}
                  onClick={() => {
                    favorisService.addArtistToFavorites(
                      favorite?.id,
                      artist.id
                    );
                    message.success("Ajouté en favoris");
                    getFavorisByUser();
                  }}
                  shape="circle"
                  icon={<HeartOutlined />}
                />
                <h3 style={{ fontSize: 14, color: "var(--pink)" }}>
                  Liste Albums :
                </h3>
                {artist.albums.map((album) => (
                  <ul style={{ display: "flex" }}>
                    <li style={{ marginRight: "1%" }}>{album.name}</li>
                    <li>{album.releaseDate?.slice(0, 10)}</li>
                  </ul>
                ))}

                <h3 style={{ fontSize: 14, color: "var(--pink)" }}>
                  Liste Titres :
                </h3>
                {artist.songs.map((song, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ul>
                      <li>{song.name}</li>
                    </ul>
                    {admin ? null : (
                      <>
                        <Button
                          style={{ border: "none", color: "var(--pink)" }}
                          onClick={() => {
                            DataModalAddPlaylist(song.id);
                          }}
                          shape="circle"
                          icon={<PlaySquareOutlined />}
                        />

                        <Button
                          style={{ border: "none", color: "var(--pink)" }}
                          onClick={() => {
                            message.error("TODO");
                          }}
                          shape="circle"
                          icon={<HeartOutlined />}
                        />
                      </>
                    )}
                  </div>
                ))}

                <Image
                  width={200}
                  src={`${artist.imageUri}`}
                  style={{ marginBottom: "2%" }}
                />
              </div>
              {admin === "null" ? null : (
                <>
                  <Button
                    shape="round"
                    onClick={() => {
                      DataModal(artist.id);
                    }}
                  >
                    Modifier l'artiste
                  </Button>
                  <Button
                    shape="round"
                    onClick={() => {
                      artist.id && deleteID(artist.id);
                    }}
                  >
                    Supprimer l'artiste
                  </Button>
                </>
              )}
            </Card>
          </>
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
          Ajouter un artiste
        </Button>
      )}
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
  ) : (
    <h1>Connexion requise</h1>
  );
};
export default ArtistsList;
