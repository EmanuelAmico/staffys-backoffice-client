import axios from "axios";
export class UserService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  static async getUserById(_id: string) {
    const user = await axios.get(`${this.apiUrl}/user/get-user/${_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    return user.data;
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
