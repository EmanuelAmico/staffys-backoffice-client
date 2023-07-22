import { User } from "@/types/user.types";
import axios from "axios";

export class HistoryService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  static async getHistoryByDate(user: User, date: string) {
    const {
      data: { data: history },
    } = await axios.get(`${this.apiUrl}/history/${date}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return history;
  }

  static async getHistories(user: User) {
    const {
      data: { data: histories },
    } = await axios.get(`${this.apiUrl}/history`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return histories;
  }

  static async getOrCreateTodayHistory(user: User) {
    const {
      data: { data: history },
    } = await axios.get(`${this.apiUrl}/history/today`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return history;
  }
}
