import { Button, Card, Divider, Image } from "antd";
import { PlusOutlined, CloseSquareOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState, useContext } from "react";
import ArtistService from "../services/artistService";
import CreateArtist from "./createArtist";
import Connection from "../user/connection";
import { userContext } from "../utils/types";
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
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const { isConnected, admin } = useContext(userContext);

  function getArtists() {
    ArtistService.getArtists().then((res) => {
      const Artists = res.data;
      console.log("ARTISTS");
      console.log(Artists);
      setArtists(Artists);
    });
  }

  useEffect(() => {
    isConnected && getArtists();
  }, [isConnected]);

  return isConnected ? (
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
                >
                  <Divider orientation="left">ALbums : </Divider>
                  {artist.albums.map((album) => (
                    <ul>
                      <li>{album.name}</li>
                      <li>{album.releaseDate?.slice(0, 10)}</li>
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
                      setUpdateModal(true);
                    }}
                  >
                    Modifier l'artiste
                  </Button>
                  <Modal
                    title="Modifier l'artiste"
                    visible={updateModal}
                    onOk={() => {
                      setUpdateModal(false);
                      ArtistService.getArtistById(artist.id.toString());
                    }}
                    onCancel={() => setUpdateModal(false)}
                  >
                    <UpdateArtist data={artist} />
                  </Modal>
                  <Button
                    shape="round"
                    onClick={() => {
                      artist.id &&
                        ArtistService.deleteArtist(artist.id.toString());
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
    <Connection />
  );
};
export default ArtistsList;
