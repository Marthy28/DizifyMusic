import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080/album";

class AlbumsService {
  getAlbums() {
    return axios.get(ALBUMS_API_BASE_URL + "s");
  }

  createAlbum(album: any, artistId: string) {
    return axios.post(
      ALBUMS_API_BASE_URL + "/" + artistId,
      JSON.stringify(album)
    );
  }

  getAlbumById(albumId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/" + albumId);
  }

  updateAlbum(album: any, albumId: string) {
    return axios.put(ALBUMS_API_BASE_URL + "/" + album, albumId);
  }

  deleteAlbum(albumId: string) {
    return axios.delete(ALBUMS_API_BASE_URL + "/" + albumId);
  }
}

export default new AlbumsService();
