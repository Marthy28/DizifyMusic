import React from "react";

export type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums: Album[];
};

export type Song = {
  id: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  albums: Album[];
};

export type Album = {
  id: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs?: Song;
  releaseDate?: string;
};

export type Playlist = {
  id?: number;
  name?: string;
  songs?: Song[];
};

export type USER_CONNECTED = {
  id: number;
  token: string;
};

const userContext = React.createContext({
  isConnected: false,
  userId: "",
  token: "",
  connection: (values: any) => {},
}); // Create a context object

export {
  userContext, // Export it so it can be used by other Components
};
