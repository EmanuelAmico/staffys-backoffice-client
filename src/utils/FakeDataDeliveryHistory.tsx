interface DeliveryHistoryProps {
  id: number;
  address: string;
  status: "taken" | "in_progress" | "delivered" | null;
  receptorName: string;
  distance: number;
  buttonText: string;
  trash: true;
}
export const deliveryHistory: DeliveryHistoryProps[] = [
  {
    id: 1,
    address: "Calle 1",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
  {
    id: 2,
    address: "Calle 2",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
  {
    id: 3,
    address: "Calle 3",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
  {
    id: 4,
    address: "Calle 4",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
  {
    id: 5,
    address: "Calle 5",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
  {
    id: 6,
    address: "Calle 6",
    receptorName: "Juan Perez",
    distance: 1.5,
    buttonText: "Tomar",
    trash: true,
    status: "delivered",
  },
];
