import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080/album";

class AlbumsService {
  getAlbums() {
    return axios.get(ALBUMS_API_BASE_URL + "s");
  }

  createAlbum(album: any, token: string) {
    return axios.post(ALBUMS_API_BASE_URL, JSON.stringify(album), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  getAlbumById(albumId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/" + albumId);
  }

  updateAlbum(album: any, albumId: string, token: string) {
    return axios.put(ALBUMS_API_BASE_URL + "/" + albumId, album, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  deleteAlbum(albumId: string, token: string) {
    return axios.delete(ALBUMS_API_BASE_URL + "/" + albumId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export default new AlbumsService();
