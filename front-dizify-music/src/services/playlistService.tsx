import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

class PlaylistService {
  getPlaylistsByUser(userId: any) {
    return axios.get(API_BASE_URL + "/playlistByUserId/" + userId);
  }

  deleteSongInPlaylist(playlistId: number, songId: number) {
    return axios.put(
      `${API_BASE_URL}/playlist/${playlistId}/song/${songId}/delete`
    );
  }

  createPlaylist(userId: any, name: string) {
    return axios.post(`${API_BASE_URL}/playlist/${userId}/`, { name });
  }

  deletePlaylist(playlistId: number) {
    return axios.delete(`${API_BASE_URL}/playlist/${playlistId}`);
  }

  addSongToPlaylist(playlistChoosed: any, songId: any) {
    return axios.put(
      `http://localhost:8080/playlist/${playlistChoosed}/song/${songId}/add`
    );
  }
}

export default new PlaylistService();
