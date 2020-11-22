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

interface Props {
  data: any;
}

const UpdateArtist: FC<Props> = ({ data }) => {
  const [UpdateArtist, setUpdateArtist] = useState<Artist>();
  const [ready, setReady] = useState<boolean>(false);
  const { userId, admin, token } = useContext(userContext);

  useEffect(() => {
    if (ready) {
      ArtistService.updateArtist(UpdateArtist, token);
      setUpdateArtist(undefined);
      setReady(false);
      message.success(`Modifié`);
    }
  }, [admin, userId, UpdateArtist, ready, token, data]);

  return (
    <Form
      name="basic"
      onFinish={(e) => {
        setUpdateArtist({
          ...UpdateArtist,
          id: data,
          name: e.name,
          imageUri: e.imageUri,
        });
        setReady(true);
      }}
    >
      <Form.Item
        label="Nom de l'artiste"
        name="name"
        rules={[{ required: false, message: "Nom de l'artiste" }]}
      >
        <Input placeholder={data.name} />
      </Form.Item>

      <Form.Item
        label="Lien vers l'image"
        name="imageUri"
        rules={[{ required: false, message: "Lien vers l'image" }]}
      >
        <Input placeholder={data.imageUri} />
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
