import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { FC } from "react";
import playlistService from "../services/playlistService";
import { Playlist } from "../utils/types";

interface SongsProps {
  playlist: Playlist;
}

const SongsForAPlaylist: FC<SongsProps> = (playlist) => {
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
        </div>
        {playlist.playlist.songs?.map((song, i) => (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flexDirection: "column" }}>
                <p>
                  {song.name} {song.duration}
                </p>
                <p style={{ color: "var(--blue)", fontSize: 14 }}>
                  {" "}
                  {song.artist?.name}
                </p>
              </div>
              <Button
                style={{ border: "none", color: "var(--pink)" }}
                onClick={() => {
                  if (playlist.playlist.id && song.id) {
                    playlistService.deleteSongInPlaylist(
                      playlist.playlist.id,
                      song.id
                    );
                  }
                }}
                shape="circle"
                icon={<CloseOutlined />}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default SongsForAPlaylist;
