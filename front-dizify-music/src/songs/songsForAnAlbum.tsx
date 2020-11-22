import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useState, useContext } from "react";
import SongsService from "../services/songsService";
import CreateSong from "./createSong";
import { userContext } from "../utils/types";

type Song = {
  id?: number;
  duration?: string;
  name?: string;
  artist?: Artist;
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

interface SongsProps {
  album: Album;
}

const SongsForAnAlbum: FC<SongsProps> = (album) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { admin, token } = useContext(userContext);

  return (
    <>
      <div style={{ flexDirection: "column", marginBottom: "2%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "var(--pink)",
              marginRight: "10%",
            }}
          >
            Titres
          </h1>
          {admin === "null" ? null : (
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
              shape="circle"
              icon={<PlusOutlined />}
            />
          )}
          <Modal
            title="Ajouter un titre"
            visible={visible}
            onOk={() => {
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          >
            <CreateSong album={album.album} />
          </Modal>
        </div>
        {album.album.songs.map((song, i) => (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>
                {song.name} {song.duration}
              </p>
              {admin === "null" ? null : (
                <Button
                  style={{ border: "none", color: "var(--pink)" }}
                  onClick={() => {
                    if (song.id) {
                      SongsService.deleteSong(song.id.toString(), token);
                    }
                  }}
                  shape="circle"
                  icon={<CloseOutlined />}
                />
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default SongsForAnAlbum;
