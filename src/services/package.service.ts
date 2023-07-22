import axios from "axios";
import { PackageBody } from "@/types/package.types";

export class PackageService {
  static apiUrl = process.env.NEXT_PUBLIC_API_URL;

  static async createPackage(packageData: PackageBody) {
    const { address, receptorName, weight, deadline, city } = packageData;

    const newPackage = await axios.post(
      `${this.apiUrl}/package/create`,
      {
        address,
        receptorName,
        weight,
        deadline,
        city,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    return newPackage.data;
  }

  static async getAvailablePackages() {
    const newPackage = await axios.get(
      `${this.apiUrl}/package/available-package`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    return newPackage.data;
  }

  static async deletePackageById(_id: string) {
    await axios.delete(`${this.apiUrl}/package/delete-package/${_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }
}
