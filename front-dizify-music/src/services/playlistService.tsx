import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

class PlaylistService {
  getPlaylistsByUser(userId: any) {
    return axios.get(API_BASE_URL + "/playlistByUserId/" + userId);
  }

  deleteSongInPlaylist(playlistId: number, songId: number, token: string) {
    console.log(`Bearer ${token}`);
    console.log("Bearer " + token);
    return axios.put(
      API_BASE_URL + "/playlist/" + playlistId + "/song/" + songId + "/delete",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
      }
    );
  }
}

export default new PlaylistService();
