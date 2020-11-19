import { Button, Form, Input } from "antd";
import React, { FC, useEffect, useState } from "react";
import songsService from "../services/songsService";

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
};

type Song = {
  id?: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  album?: Album;
};

type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs: Array<Song>;
};

interface AlbumsProps {
  album: Album;
}

const CreateSong: FC<AlbumsProps> = (album) => {
  const [newSong, setNewSong] = useState<Song>();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (ready && album?.album.artist) {
      songsService.createSong(album.album.artist.id.toString(), newSong);
      setNewSong(undefined);
      setReady(false);
    }
  }, [newSong, ready]);

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setNewSong({
          name: e.name,
          duration: e.duration,
          artist: album.album.artist,
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
        <Button type="primary" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSong;
