import { Button, Form, Input, message } from "antd";
import React, { FC, useEffect, useState, useContext } from "react";
import ArtistService from "../services/artistService";
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

const CreateArtist: FC = () => {
  const [newArtist, setNewArtist] = useState<Artist>();
  const [ready, setReady] = useState<boolean>(false);
  const { userId, admin, token } = useContext(userContext);

  useEffect(() => {
    if (ready) {
      ArtistService.createArtist(newArtist, token);
      setNewArtist(undefined);
      setReady(false);
      message.success(`Créé`);
    }
  }, [admin, userId, newArtist, ready, token]);

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

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateArtist;
