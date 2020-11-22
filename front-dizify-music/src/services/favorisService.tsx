import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

class FavorisService {
  getFavorisByUser(userId: any) {
    return axios.get(API_BASE_URL + "/favoriteByUserId/" + userId);
  }

  addSongToFavorites(favoriteId: any, songId: any) {
    return axios.put(
      `${API_BASE_URL}/favorite/${favoriteId}/song/${songId}/add`
    );
  }

  addAlbumToFavorites(favoriteId: any, albumId: any) {
    return axios.put(
      `${API_BASE_URL}/favorite/${favoriteId}/album/${albumId}/add`
    );
  }

  addArtistToFavorites(favoriteId: any, artistId: any) {
    return axios.put(
      `${API_BASE_URL}/favorite/${favoriteId}/artist/${artistId}/add`
    );
  }
}

export default new FavorisService();
