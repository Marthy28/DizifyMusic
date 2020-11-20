import { Card } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import playlistService from "../services/playlistService";
import SongsForAPlaylist from "../songs/songsForAPlaylist";
import Connection from "../user/connection";
import { Playlist, userContext } from "../utils/types";

interface PlaylistProps {}

const Playlists: FC<PlaylistProps> = () => {
  const [Playlists, setPlaylists] = useState<Playlist[]>([]);
  const { isConnected, userId, token, connection, admin } = useContext(
    userContext
  );

  function getPlaylistsByUser() {
    playlistService.getPlaylistsByUser(userId).then((res) => {
      const Plalists = res.data;
      setPlaylists(Plalists);
    });
  }

  useEffect(() => {
    isConnected && getPlaylistsByUser();
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
        Tes playlists
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Playlists.map((playlist, i) => (
          <>
            <Card
              style={{
                flex: 1,
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
  ) : (
    <Connection />
  );
};

export default Playlists;
