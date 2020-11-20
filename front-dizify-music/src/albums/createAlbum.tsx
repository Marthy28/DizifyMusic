import { Button, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState, useContext } from "react";
import AlbumsService from "../services/albumsService";
import artistService from "../services/artistService";
import songsService from "../services/songsService";
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

interface AlbumsProps {}

const CreateAlbum: FC<AlbumsProps> = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [newAlbum, setNewAlbum] = useState<Album>();
  const [ready, setReady] = useState<boolean>(false);
  const { isConnected, token } = useContext(userContext);

  useEffect(() => {
    artistService.getArtists().then((res) => {
      const artists = res.data;
      console.log(artists);

      setArtists(artists);
    });
  }, []);

  useEffect(() => {
    songsService.getSongs().then((res) => {
      const songs = res.data;
      console.log(songs);

      setSongs(songs);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      AlbumsService.createAlbum(newAlbum, token);
      setNewAlbum(undefined);
      setReady(false);
    }
  }, [newAlbum, ready, token]);

  function handleChange(value: any) {
    console.log(value);

    setNewAlbum({
      artist: { id: value },
    });
  }
  function handleChangeSong(value: any) {
    console.log(value);

    setNewAlbum({
      songs: { id: value },
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
      <Form.Item label="Sons">
        <Select onChange={handleChangeSong}>
          {songs.map((song, i) => (
            <Select.Option value={song.id}>{song.name}</Select.Option>
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
