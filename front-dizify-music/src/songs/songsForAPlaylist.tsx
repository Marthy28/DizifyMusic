import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { FC, useState } from "react";
import { Playlist } from "../utils/types";

interface SongsProps {
  playlist: Playlist;
}

const SongsForAPlaylist: FC<SongsProps> = (playlist) => {
  const [visible, setVisible] = useState<boolean>(false);

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
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            shape="circle"
            icon={<PlusOutlined />}
          />
          <Modal
            title="Ajouter un titre"
            visible={visible}
            onOk={() => {
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          >
            TO DO
          </Modal>
        </div>
        {playlist.playlist.songs.map((song, i) => (
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
              <p> {song.artist}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default SongsForAPlaylist;
