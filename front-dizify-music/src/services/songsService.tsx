import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080/song";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

class SongsService {
  getSongs() {
    return axios.get(ALBUMS_API_BASE_URL + "s");
  }

  createSong(artistId: string, song: any) {
    return axios.post(
      ALBUMS_API_BASE_URL + "/" + artistId,
      JSON.stringify(song),
      axiosConfig
    );
  }

  getSongById(songId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/" + songId);
  }

  updateSong(song: any, songId: string) {
    return axios.put(ALBUMS_API_BASE_URL + "/" + songId, song);
  }

  deleteSong(songId: string) {
    return axios.delete(ALBUMS_API_BASE_URL + "/" + songId);
  }
}

export default new SongsService();
