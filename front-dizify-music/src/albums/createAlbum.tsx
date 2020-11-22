import { Button, Form, Input, Select, message } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import AlbumsService from "../services/albumsService";
import ArtistService from "../services/artistService";
import { userContext } from "../utils/types";
import { Album, Artist } from "../utils/types";

interface AlbumsProps {}

const CreateAlbum: FC<AlbumsProps> = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newAlbum, setNewAlbum] = useState<Album>();
  const [ready, setReady] = useState<boolean>(false);
  const [artistid, setID] = useState<string>();
  const { token } = useContext(userContext);

  useEffect(() => {
    ArtistService.getArtists().then((res) => {
      const artists = res.data;
      setArtists(artists);
    });
  }, []);

  function handleChange(value: any) {
    setNewAlbum({
      artist: { id: value },
    });
    setID(value);
  }
  useEffect(() => {
    if (ready) {
      AlbumsService.createAlbum(newAlbum, artistid, token);
      setNewAlbum(undefined);
      setReady(false);
      message.success(`Créé`);
    }
  }, [artistid, newAlbum, ready, token]);

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
            <Select.Option value={artist.id!}>{artist.name}</Select.Option>
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

export default CreateAlbum;
