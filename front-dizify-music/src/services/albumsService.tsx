import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080/album";

class AlbumsService {
  getAlbums() {
    return axios.get(ALBUMS_API_BASE_URL + "s");
  }

  createAlbum(album: any, artistId: string | undefined, token: string | null) {
    return axios.post(ALBUMS_API_BASE_URL + "/" + artistId, album, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  getAlbumById(albumId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/" + albumId);
  }

  updateAlbum(album: any, albumId: string, token: string | null) {
    return axios.put(ALBUMS_API_BASE_URL + "/" + album, albumId, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  deleteAlbum(albumId: string, token: string | null) {
    return axios.delete(ALBUMS_API_BASE_URL + "/" + albumId, {
      headers: { Authorization: "Bearer " + token },
    });
  }
}

export default new AlbumsService();
