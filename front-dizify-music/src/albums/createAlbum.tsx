import { Button, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import artistService from "../services/artistService";

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
};

type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
};

interface AlbumsProps {}

const CreateAlbum: FC<AlbumsProps> = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newAlbum, setNewAlbum] = useState<Album>();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    artistService.getArtists().then((res) => {
      const artists = res.data;
      setArtists(artists);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      AlbumsService.createAlbum(newAlbum);
      setNewAlbum(undefined);
      setReady(false);
    }
  }, [newAlbum, ready]);

  function handleChange(value: any) {
    setNewAlbum({
      artist: { id: value },
    });
  }

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setNewAlbum({
          ...newAlbum,
          name: e.name,
          pictureUri: e.pictureUri,
        });
        setReady(true);
      }}
    >
      <Form.Item
        label="Nom de l'album"
        name="name"
        rules={[{ required: true, message: "Nom de l'album" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lien vers l'image"
        name="pictureUri"
        rules={[{ required: true, message: "Lien vers l'image" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Artiste">
        <Select onChange={handleChange}>
          {artists.map((artist, i) => (
            <Select.Option value={artist.id}>{artist.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAlbum;
