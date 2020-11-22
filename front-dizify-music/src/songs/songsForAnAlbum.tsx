import {
  CloseOutlined,
  HeartOutlined,
  PlaySquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import favorisService from "../services/favorisService";
import playlistService from "../services/playlistService";
import SongsService from "../services/songsService";
import { Album, FavorisType, userContext } from "../utils/types";
import AddSongToPlaylist from "./addSongToPlaylist";
import CreateSong from "./createSong";

interface SongsProps {
  album: Album | undefined;
}

const SongsForAnAlbum: FC<SongsProps> = (album) => {
  const [visibleAddSong, setVisibleAddSong] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<FavorisType>();
  const { admin, userId, token } = useContext(userContext);

  function DataModal(songId: any) {
    Modal.success({
      title: "Ajouter un titre à une playlist",
      content: <AddSongToPlaylist songId={songId} />,
      icon: <PlaySquareOutlined />,
      onOk: () => playlistService.getPlaylistsByUser(userId),
    });
  }

  function getFavorisByUser() {
    favorisService.getFavorisByUser(userId).then((res) => {
      const favorisRes = res.data;
      setFavorite(favorisRes);
    });
  }

  useEffect(() => {
    getFavorisByUser();
  }, []);

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
                setVisibleAddSong(true);
              }}
              shape="circle"
              icon={<PlusOutlined />}
            />
          )}
          <Modal
            title="Ajouter un titre"
            visible={visibleAddSong}
            onOk={() => {
              setVisibleAddSong(false);
            }}
            onCancel={() => setVisibleAddSong(false)}
          >
            <CreateSong album={album.album} />
          </Modal>
        </div>
        {album.album?.songs?.map((song, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>
                {song.name} {song.duration} {song.id}
              </p>
              {admin ? null : (
                <>
                  <Button
                    style={{ border: "none", color: "var(--pink)" }}
                    onClick={() => {
                      DataModal(song.id);
                    }}
                    shape="circle"
                    icon={<PlaySquareOutlined />}
                  />

                  <Button
                    style={{ border: "none", color: "var(--pink)" }}
                    onClick={() => {
                      favorisService.addSongToFavorites(favorite?.id, song.id);
                      message.success("Ajouté en favoris");
                      getFavorisByUser();
                    }}
                    shape="circle"
                    icon={<HeartOutlined />}
                  />
                </>
              )}
              {admin && (
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
          </div>
        ))}
      </div>
    </>
  );
};

export default SongsForAnAlbum;
