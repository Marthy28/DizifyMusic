import { Button, Form, message, Select } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import playlistService from "../services/playlistService";
import { Playlist, userContext } from "../utils/types";

interface AddSongToPlaylistProps {
  songId: number | undefined;
}

const AddSongToPlaylist: FC<AddSongToPlaylistProps> = (songId) => {
  const { userId } = useContext(userContext);
  const [Playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistChoosed, setPlaylistChoosed] = useState<number>();

  useEffect(() => {
    playlistService.getPlaylistsByUser(userId).then((res) => {
      const playlistRes = res.data;
      setPlaylists(playlistRes);
    });
  }, []);

  function handleChange(playlistId: number) {
    setPlaylistChoosed(playlistId);
  }

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        playlistService.addSongToPlaylist(playlistChoosed, songId.songId);
        message.success("Chanson ajoutée à la playlist ! ");
      }}
    >
      <Form.Item label="Playlist">
        <Select onChange={handleChange}>
          {Playlists.map((playlist, i) => (
            <Select.Option value={playlist.id!}>{playlist.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button shape="round" type="primary" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSongToPlaylist;
