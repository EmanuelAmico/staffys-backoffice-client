export interface Package {
  _id: string;
  address: string;
  receptorName: string;
  deliveryMan: string | null;
  weight: number | null;
  deliveredAt: Date | null;
  status: "taken" | "in_progress" | "delivered" | null;
  deadline: Date;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  } | null;
  distance?: number | null;
}

export interface PackageBody {
  address: string;
  receptorName: string;
  weight: number;
  deadline: Date;
  city: string;
}

export interface initialStatePackage {
  availablePackages: Package[];
}
