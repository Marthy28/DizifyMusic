import axios from "axios";

const SONGS_API_BASE_URL = "http://localhost:8080/song";

class SongsService {
  getSongs() {
    return axios.get(SONGS_API_BASE_URL + "s");
  }

  createSong(artistId: string, song: any, token: string | null) {
    return axios.post(SONGS_API_BASE_URL + "/" + artistId, song, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  getSongById(songId: string) {
    return axios.get(SONGS_API_BASE_URL + "/" + songId);
  }

  updateSong(song: any, songId: string, token: string | null) {
    return axios.put(SONGS_API_BASE_URL + "/" + songId, song, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  deleteSong(songId: string, token: string | null) {
    return axios.delete(SONGS_API_BASE_URL + "/" + songId, {
      headers: { Authorization: "Bearer " + token },
    });
  }
}

export default new SongsService();
