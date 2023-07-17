import { User } from "@/types/user.types";
import axios from "axios";
import { UserEditActive } from "@/types/user.types";
export class UserService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  static async getUserById(_id: string) {
    const user = await axios.get(`${this.apiUrl}/user/${_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    return user.data;
  }
  static async editUser(userEdit: UserEditActive) {
    const user = await axios.put(`${this.apiUrl}/user/update`, { userEdit });
    return user.data;
  }

  static async editUser(user: User, fields: Partial<Omit<User, "token">>) {
    const {
      data: {
        data: { findUser: updatedUser },
      },
    } = await axios.put(
      `${this.apiUrl}/user/update`,
      { _id: user._id, ...fields },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return updatedUser;
  }

  static async getDeliveryPeople() {
    const deliveryPeoples = await axios.get(
      `${this.apiUrl}/user/all/delivery-people`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return deliveryPeoples.data;
  }
}
