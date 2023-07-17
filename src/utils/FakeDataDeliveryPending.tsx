export interface DeliveryFakeData {
  id: number;
  address: string;
  receptorName: string;
  distance: string;
  buttonText: string;
  trash: boolean;
  status?: string;
}

export const deliveryPending: DeliveryFakeData[] = [
  {
    id: 7,
    address: "Calle 1",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
    status: "in progress",
  },
  {
    id: 8,
    address: "Calle 2",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
  },
  {
    id: 9,
    address: "Calle 3",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
  },
  {
    id: 10,
    address: "Calle 4",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
  },
  {
    id: 11,
    address: "Calle 5",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
  },
  {
    id: 12,
    address: "Calle 6",
    receptorName: "Juan Perez",
    distance: "1.5 km",
    buttonText: "Tomar",
    trash: true,
  },
];
