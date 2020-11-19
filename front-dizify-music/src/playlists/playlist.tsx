import { Card } from "antd";
import React, { FC, useEffect, useState } from "react";
import playlistService from "../services/playlistService";
import SongsForAPlaylist from "../songs/songsForAPlaylist";
import { Playlist } from "../utils/types";

interface PlaylistProps {}

const Playlists: FC<PlaylistProps> = () => {
  const [Playlists, setPlaylists] = useState<Playlist[]>([]);

  function getPlaylistsByUser() {
    playlistService.getPlaylistsByUser("1").then((res) => {
      const Plalists = res.data;
      setPlaylists(Plalists);
    });
  }

  useEffect(() => {
    getPlaylistsByUser();
  }, []);

  return (
    <>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 55,
          marginTop: 50,
          color: "var(--pink)",
        }}
      >
        Tes playlists
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Playlists.map((playlist, i) => (
          <>
            <Card
              style={{
                width: 300,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                {playlist.name}
              </h1>
              <SongsForAPlaylist playlist={playlist} />
            </Card>
          </>
        ))}
      </div>
    </>
  );
};

export default Playlists;
