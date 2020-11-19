import axios from "axios";

const ALBUMS_API_BASE_URL = "http://localhost:8080";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

class PlaylistService {
  getPlaylistsByUser(userId: string) {
    return axios.get(ALBUMS_API_BASE_URL + "/playlistByUserId/" + userId);
  }
}

export default new PlaylistService();
