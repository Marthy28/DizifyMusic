import {
  CloseOutlined,
  PlusOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import React, { FC, useState, useContext } from "react";
import SongsService from "../services/songsService";
import CreateSong from "./createSong";
import { Album, userContext } from "../utils/types";
import AddSongToPlaylist from "./addSongToPlaylist";
import playlistService from "../services/playlistService";

interface SongsProps {
  album: Album | undefined;
}

const SongsForAnAlbum: FC<SongsProps> = (album) => {
  const [visibleAddSong, setVisibleAddSong] = useState<boolean>(false);
  const { admin, userId } = useContext(userContext);

  function DataModal(songId: any) {
    Modal.success({
      title: "Ajouter un titre à une playlist",
      content: <AddSongToPlaylist songId={songId} />,
      icon: <PlaySquareOutlined />,
      onOk: () => playlistService.getPlaylistsByUser(userId),
    });
  }

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
                {song.name} {song.duration}
              </p>
              {admin == null && (
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
                      message.error("TODO");
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
                      SongsService.deleteSong(song.id.toString());
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
