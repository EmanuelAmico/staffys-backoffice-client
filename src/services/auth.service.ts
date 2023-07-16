import axios from "axios";
import { UserLogin } from "@/types/user.types";

export class AuthService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  static async login(userData: UserLogin) {
    const { password, email } = userData;

    const user = await axios.post(`${this.apiUrl}/auth/login`, {
      password,
      email,
    });

    return user.data;
  }

  static async me(token: string) {
    const {
      data: { data },
    } = await axios.get(`${this.apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
