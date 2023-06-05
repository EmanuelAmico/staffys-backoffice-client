import { deliveryHistory } from "../utils/FakeDataDeliveryHistory";
import { deliveryPackages } from "../utils/FakeDataDeliveryPackages";
import { deliveryPending } from "../utils/FakeDataDeliveryPending";
import { waitRandomSeconds } from "@/utils/wait";

export class PackageService {
  static async getPackageById(id: string) {
    await waitRandomSeconds();
    return { message: `this is the ${id} ${deliveryPackages[0]} ` };
  }

  static async getAvailablePackages() {
    await waitRandomSeconds();
    return deliveryPackages;
  }
  static async getPendingPackagesById() {
    await waitRandomSeconds();
    return deliveryPending;
  }

  static async getHistoryPackagesById() {
    await waitRandomSeconds();
    return deliveryHistory;
  }

  static async createPackage(
    id: string,
    addressee: string,
    distance: string,
    trash: boolean,
    status: string
  ) {
    await waitRandomSeconds();
    return { id, addressee, distance, trash, status };
  }

  static async updatePackage(
    id: string,
    addressee: string,
    distance: string,
    trash: boolean,
    status: string
  ) {
    await waitRandomSeconds();
    return { id, addressee, distance, trash, status };
  }

  static async deletePackage(id: string) {
    await waitRandomSeconds();

    return { message: `this is the ${id} ${deliveryPackages[0]} ` };
    return;
  }
}
