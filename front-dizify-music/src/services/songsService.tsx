import axios from "axios";

const SONGS_API_BASE_URL = "http://localhost:8080/song";

class SongsService {
  getSongs() {
    return axios.get(SONGS_API_BASE_URL + "s");
  }

  createSong(artistId: string, song: any, token: string) {
    return axios.post(
      SONGS_API_BASE_URL + "/" + artistId,
      JSON.stringify(song),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  getSongById(songId: string) {
    return axios.get(SONGS_API_BASE_URL + "/" + songId);
  }

  updateSong(song: any, songId: string, token: string) {
    return axios.put(SONGS_API_BASE_URL + "/" + songId, song, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  deleteSong(songId: string, token: string) {
    return axios.delete(SONGS_API_BASE_URL + "/" + songId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export default new SongsService();
