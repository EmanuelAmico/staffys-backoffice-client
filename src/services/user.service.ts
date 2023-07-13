import { waitRandomSeconds } from "@/utils/wait";
import axios from "axios";
export class UserService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;
  static async deleteUser(id: string) {
    await waitRandomSeconds();
    return { message: `User with id:${id} has been deleted` };
  }
  static async getUserById(_id: string) {
    const user = await axios.get(`${this.apiUrl}/user/get-user/${_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return user.data;
  }
  static async editUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
    photo: string
  ) {
    await waitRandomSeconds();
    return { name, lastname, email, password, photo };
  }
  static async LogUser(email: string, password: string) {
    await waitRandomSeconds();
    return { email, password };
  }
}
