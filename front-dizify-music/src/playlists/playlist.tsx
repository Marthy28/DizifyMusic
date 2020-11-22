import { Button, Card, Form, Input, message } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import playlistService from "../services/playlistService";
import SongsForAPlaylist from "../songs/songsForAPlaylist";
import Connection from "../user/connection";
import { Playlist, userContext } from "../utils/types";

interface PlaylistProps {}

const Playlists: FC<PlaylistProps> = () => {
  const [Playlists, setPlaylists] = useState<Playlist[]>([]);
  const { userId } = useContext(userContext);

  function getPlaylistsByUser() {
    playlistService.getPlaylistsByUser(userId).then((res) => {
      const Plalists = res.data;
      console.log(res.data);
      setPlaylists(Plalists);
    });
  }

  console.log(window.sessionStorage.getItem("token"));

  useEffect(() => {
    userId && getPlaylistsByUser();
  }, [userId]);

  return userId ? (
    <>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 55,
          marginTop: 50,
          marginBottom: 50,
          color: "var(--pink)",
        }}
      >
        Tes playlists
      </h1>
      <Form
        name="basic"
        style={{ display: "flex" }}
        onFinish={(e) => {
          playlistService.createPlaylist(userId, e.name);
          message.success("Playlist ajoutée ! ");
        }}
      >
        <Form.Item
          label="Nom de la playlist"
          name="name"
          rules={[{ required: true, message: "Nom de la playlist" }]}
          style={{ marginRight: "2%" }}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1%" }}>
        {Playlists.map((playlist, i) => (
          <>
            <Card
              style={{
                width: 350,
                marginRight: "1%",
                marginBottom: "1%",
                boxShadow: "0px 4px 100px -64px rgba(0,0,0,0.35)",
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: 34 }}>
                {playlist.name}
              </h1>
              {playlist.songs?.length! > 0 ? (
                <SongsForAPlaylist playlist={playlist} />
              ) : (
                <p style={{ color: "var(--pink)" }}>
                  Il n'y a pas chansons dans cette playlist
                </p>
              )}
              <Button
                shape="round"
                onClick={() => {
                  playlist.id && playlistService.deletePlaylist(playlist.id);
                  message.success("Playlist suprimée !");
                }}
              >
                Supprimer la playlist
              </Button>
            </Card>
          </>
        ))}
      </div>
    </>
  ) : (
    <h1>Tu dois te connecter pour accéder à tes playlist</h1>
  );
};

export default Playlists;
