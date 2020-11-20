import axios from "axios";

const ARTIST_API_BASE_URL = "http://localhost:8080/artist";

class ArtistService {
  getArtists() {
    return axios.get(ARTIST_API_BASE_URL + "s");
  }

  createArtist(artist: any) {
    return axios.post(ARTIST_API_BASE_URL, JSON.stringify(artist));
  }

  getArtistById(artistId: string) {
    return axios.get(ARTIST_API_BASE_URL + "/" + artistId);
  }

  updateArtist(artist: any, artistId: string) {
    return axios.put(ARTIST_API_BASE_URL + "/" + artistId, artist);
  }

  deleteArtist(artistId: string) {
    return axios.delete(ARTIST_API_BASE_URL + "/" + artistId);
  }
}

export default new ArtistService();
