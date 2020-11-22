import { Button, Form, Input } from "antd";
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

interface Props {
  artist: any;
}

const UpdateArtist: FC<Props> = ({ artist }) => {
  const [UpdateArtist, setUpdateArtist] = useState<Artist>();
  const [ready, setReady] = useState<boolean>(false);
  const { userId, admin, token } = useContext(userContext);

  useEffect(() => {
    if (ready) {
      ArtistService.updateArtist(UpdateArtist, artist.id, token);
      setUpdateArtist(undefined);
      setReady(false);
    }
  }, [admin, userId, UpdateArtist, ready, token, artist.id]);

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setUpdateArtist({
          ...UpdateArtist,
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
        <Input placeholder={artist.name} />
      </Form.Item>

      <Form.Item
        label="Lien vers l'image"
        name="imageUri"
        rules={[{ required: true, message: "Lien vers l'image" }]}
      >
        <Input placeholder={artist.imageUri} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Confirmer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateArtist;
