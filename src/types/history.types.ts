import { Package } from "./package.types";
import { User } from "./user.types";

export interface History {
  _id: string;
  date: string;
  activeUsers: string[];
  targetPackages: string[];
}

export interface PopulatedHistory {
  _id: string;
  date: string;
  activeUsers: User[];
  targetPackages: Package[];
}
