import { Button, Card, Divider, Image, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { FC, useContext, useEffect, useState } from "react";
import ArtistService from "../services/artistService";
import CreateArtist from "./createArtist";
import UpdateArtist from "./updateArtist";
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
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [id, setID] = useState<number>();
  const [songVisible, setSongVisible] = useState<boolean>(false);
  const { userId, admin, token } = useContext(userContext);

  function getArtists() {
    ArtistService.getArtists().then((res) => {
      const Artists = res.data;
      setArtists(Artists);
    });
  }

  function deleteID(artistID: number) {
    ArtistService.deleteArtist(artistID.toString(), token).then((res) => {
      getArtists();
      message.success(`Supprimé`);
    });
  }

  function DataModal(artistID: any) {
    Modal.success({
      title: "Modifier l'artiste",
      content: <UpdateArtist data={artistID} />,
      onOk: () => getArtists(),
    });
  }

  useEffect(() => {
    userId && getArtists();
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
              <div style={{ height: 440 }}>
                <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                  {artist.name}
                </h1>

                <h3>Liste Albums :</h3>
                <Button
                  type="primary"
                  onClick={() => {
                    setListVisible(true);
                    setID(artist.id);
                  }}
                  shape="circle"
                  icon={<PlusOutlined />}
                />
                <h3>Liste Titres :</h3>
                <Button
                  type="primary"
                  onClick={() => {
                    setSongVisible(true);
                    setID(artist.id);
                  }}
                  shape="circle"
                  icon={<PlusOutlined />}
                />

                <Modal
                  title="Liste des albums"
                  visible={listVisible}
                  onOk={() => {
                    setListVisible(false);
                  }}
                  onCancel={() => {
                    setListVisible(false);
                  }}
                >
                  <Divider orientation="left">Albums : </Divider>
                  {artist.albums.map((album) => (
                    <ul>
                      <li>{album.name}</li>
                      <li>{album.releaseDate?.slice(0, 10)}</li>
                    </ul>
                  ))}
                </Modal>

                <Modal
                  title="Liste des titres"
                  visible={songVisible}
                  onOk={() => {
                    setSongVisible(false);
                  }}
                  onCancel={() => {
                    setSongVisible(false);
                  }}
                >
                  <Divider orientation="left">Titres : </Divider>
                  {artist.songs.map((song) => (
                    <ul>
                      <li>{song.name}</li>
                    </ul>
                  ))}
                </Modal>
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
