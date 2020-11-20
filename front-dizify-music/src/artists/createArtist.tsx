import { Button, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState, useContext } from "react";
import ArtistService from "../services/artistService";
import AlbumsService from "../services/albumsService";
import { userContext } from "../utils/types";

type Song = {
  id: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  albums?: Album[];
};

type Album = {
  id: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs?: Song;
  releaseDate?: string;
};

type Artist = {
  id?: number;
  name?: string;
  imageUri?: string;
  albums?: Album;
};

interface Props {}

const CreateArtist: FC<Props> = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newArtist, setNewArtist] = useState<Artist>();
  const [ready, setReady] = useState<boolean>(false);
  const { isConnected, token, admin } = useContext(userContext);

  useEffect(() => {
    AlbumsService.getAlbums().then((res) => {
      const albums = res.data;
      setAlbums(albums);
    });
  }, []);

  useEffect(() => {
    if (ready && isConnected && admin) {
      ArtistService.createArtist(newArtist, token);
      setNewArtist(undefined);
      setReady(false);
    }
  }, [admin, isConnected, newArtist, ready, token]);

  function handleChange(value: any) {
    setNewArtist({
      albums: { id: value },
    });
  }

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setNewArtist({
          ...newArtist,
          name: e.name,
          imageUri: e.imageUri,
        });
        setReady(true);
      }}
    >
      <Form.Item
        label="Nom de l'artiste"
        name="name"
        rules={[{ required: true, message: "Nom de l'artiste" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lien vers l'image"
        name="imageUri"
        rules={[{ required: true, message: "Lien vers l'image" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Album">
        <Select onChange={handleChange}>
          {albums.map((album, i) => (
            <Select.Option key={i} value={album.id}>
              {album.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateArtist;
