import { Button, Form, Input, Select } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import artistService from "../services/artistService";
import { userContext } from "../utils/types";

type Song = {
  id: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  albums?: Album[];
};

type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs?: Song;
  releaseDate?: string;
};

type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums?: Album[];
};

interface AlbumsProps {
  data: any;
}

const UpdateAlbum: FC<AlbumsProps> = ({ data }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [UpdateAlbum, setUpdateAlbum] = useState<Album>();
  const [ready, setReady] = useState<boolean>(false);
  const { token } = useContext(userContext);

  useEffect(() => {
    artistService.getArtists().then((res) => {
      const artists = res.data;
      setArtists(artists);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      AlbumsService.updateAlbum(UpdateAlbum, data, token);
      setUpdateAlbum(undefined);
      setReady(false);
    }
  }, [UpdateAlbum, ready, data, token]);

  function handleChange(value: any) {
    setUpdateAlbum({
      artist: { id: value },
    });
  }

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setUpdateAlbum({
          ...UpdateAlbum,
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

      <Form.Item
        label="Artiste"
        rules={[{ required: true, message: "Artiste" }]}
      >
        <Select onChange={handleChange}>
          {artists.map((artist, i) => (
            <Select.Option value={artist.id}>{artist.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button shape="round" type="primary" htmlType="submit">
          Confirmer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateAlbum;
