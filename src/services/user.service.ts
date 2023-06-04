import { waitRandomSeconds } from "@/utils/wait";

export class UserService {
  static async deleteUser(id: string) {
    await waitRandomSeconds();
    return { message: `User with id:${id} has been deleted` };
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
