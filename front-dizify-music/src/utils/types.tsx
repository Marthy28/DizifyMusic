import React from "react";
import favorisService from "../services/favorisService";

export type Artist = {
  id?: number;
  name?: string;
  imageUri?: string;
  albums?: Album[];
};

export type Song = {
  id?: number;
  duration?: string;
  name?: string;
  artist?: Artist;
  album?: Album;
};

export type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist?: Artist;
  songs?: Song[];
  releaseDate?: string;
};

export type Playlist = {
  id?: number;
  name?: string;
  songs?: Song[];
};

export type FavorisType = {
  id?: number;
  songs?: Song[];
  artists?: Artist[];
  albums?: Album[];
};

export type USER_CONNECTED = {
  id: number;
  token: string;
};

const userContext = React.createContext({
  userId: window.sessionStorage.getItem("userId"),
  token: window.sessionStorage.getItem("token"),
  admin: window.sessionStorage.getItem("admin"),
  connection: (values: any) => {},
}); // Create a context object

export {
  userContext, // Export it so it can be used by other Components
};
