import { Button, Form, Input } from "antd";
import React, { FC, useEffect, useState, useContext } from "react";
import songsService from "../services/songsService";
import { Album, Song, userContext } from "../utils/types";

interface AlbumsProps {
  album: Album | undefined;
}

const CreateSong: FC<AlbumsProps> = (album) => {
  const [newSong, setNewSong] = useState<Song>();
  const [ready, setReady] = useState<boolean>(false);
  const { userId, admin } = useContext(userContext);

  useEffect(() => {
    if (ready && userId && admin && album.album?.artist?.id) {
      songsService.createSong(album.album.artist.id.toString(), newSong);
      setNewSong(undefined);
      setReady(false);
    }
  }, [admin, album.album?.artist, userId, newSong, ready]);

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setNewSong({
          name: e.name,
          duration: e.duration,
          artist: album.album?.artist,
          album: album.album,
        });
        setReady(true);
      }}
    >
      <Form.Item
        label="Titre"
        name="name"
        rules={[{ required: true, message: "Titre de la chanson" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Durée"
        name="duration"
        rules={[{ required: true, message: "Durée de la chanson" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSong;
