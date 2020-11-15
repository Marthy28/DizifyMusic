import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080/album";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

class AlbumsService {
  getAlbums() {
    return axios.get(ALBUMS_API_BASE_URL + "s");
  }

  createAlbum(album: any) {
    return axios.post(ALBUMS_API_BASE_URL, JSON.stringify(album), axiosConfig);
  }

  getAlbumById(albumId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/" + albumId);
  }

  updateAlbum(album: any, albumId: string) {
    return axios.put(ALBUMS_API_BASE_URL + "/" + albumId, album);
  }

  deleteAlbum(albumId: string) {
    return axios.delete(ALBUMS_API_BASE_URL + "/" + albumId);
  }
}

export default new AlbumsService();
