import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UsersService {
  getUsers() {
    return axios.get(USER_API_BASE_URL + "s");
  }

  getUserById(userId: string) {
    return axios.get(USER_API_BASE_URL + "/" + userId);
  }
}

export default new UsersService();
