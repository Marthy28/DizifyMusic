export type Artist = {
  id: number;
  name?: string;
  imageUri?: string;
  albums: Album[];
};

export type Song = {
  id?: number;
  duration?: string;
  name?: string;
  artist: Artist;
};

export type Album = {
  id?: number;
  name?: string;
  pictureUri?: string;
  artist: Artist;
  songs: Song[];
};

export type Playlist = {
  id?: number;
  name: string;
  songs: Song[];
};
