import React, { FC } from "react";
import Image from "next/image";
import PercentageCircle from "./PercentageCircle";

interface PackageTransportCardProps {
  percentage: number;
  status: "in-progress" | "all-delivered" | "inactive";
  transporterName: string;
  profileImage: string;
  className?: string;
}

const PackageTransportCard: FC<PackageTransportCardProps> = ({
  transporterName,
  profileImage,
  status,
  percentage,
  className,
}) => {
  const textColor =
    status === "inactive"
      ? "text-redIcon"
      : status === "in-progress"
      ? "text-primaryBlue"
      : status === "all-delivered"
      ? "text-greenText"
      : "";

  const backgroundColor =
    status === "inactive"
      ? "bg-redIcon"
      : status === "in-progress"
      ? "bg-primaryBlue"
      : status === "all-delivered"
      ? "bg-greenText"
      : "";

  const statusText =
    status === "inactive"
      ? "Inactivo"
      : status === "in-progress"
      ? "Viaje en curso"
      : status === "all-delivered"
      ? "Finalizó"
      : "";

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <PercentageCircle percentage={percentage} />
      <div className="flex flex-col gap-2 ml-2 grow">
        <p className="font-bold text-base">{transporterName}</p>
        <p className={`font-medium text-sm ${textColor} flex items-center`}>
          <span className={`mr-1 h-2 w-2 rounded-full ${backgroundColor}`} />{" "}
          {statusText}
        </p>
      </div>
      <Image
        src={profileImage}
        width={62}
        height={62}
        alt="Profile"
        className="rounded-full"
      />
    </div>
  );
};

export default PackageTransportCard;
