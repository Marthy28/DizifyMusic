import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

class PlaylistService {
  getPlaylistsByUser(userId: any) {
    return axios.get(API_BASE_URL + "/playlistByUserId/" + userId);
  }

  deleteSongInPlaylist(playlistId: number, songId: number, token: string) {
    return axios.put(
      API_BASE_URL + "/playlist/" + playlistId + "/song/" + songId + "/delete",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default new PlaylistService();