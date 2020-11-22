import axios from "axios";

const ARTIST_API_BASE_URL = "http://localhost:8080/artist";

class ArtistService {
  getArtists() {
    return axios.get(ARTIST_API_BASE_URL + "s");
  }

  createArtist(artist: any, token: string | null) {
    return axios.post(ARTIST_API_BASE_URL, artist, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  getArtistById(artistId: string, token: string | null) {
    return axios.get(ARTIST_API_BASE_URL + "/" + artistId, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  updateArtist(artist: any, artistId: string, token: string | null) {
    return axios.put(ARTIST_API_BASE_URL + "/" + artistId, artist, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  deleteArtist(artistId: string, token: string | null) {
    return axios.delete(ARTIST_API_BASE_URL + "/" + artistId, {
      headers: { Authorization: "Bearer " + token },
    });
  }
}

export default new ArtistService();
