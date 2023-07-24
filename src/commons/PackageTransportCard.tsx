import React, { FC } from "react";
import Image from "next/image";
import PercentageCircle from "./PercentageCircle";
import { RiForbidLine } from "react-icons/ri";

interface PackageTransportCardProps {
  percentage: number;
  status?: "in-progress" | "all-delivered" | "disabled" | "active" | "ready";
  transporterName: string;
  profileImage: string;
  disabled?: boolean;
  className?: string;
}

const PackageTransportCard: FC<PackageTransportCardProps> = ({
  transporterName,
  profileImage,
  status,
  percentage,
  disabled,
  className,
}) => {
  const handleStatus = (() => {
    switch (status) {
      case "disabled":
        return {
          textColor: "text-redIcon",
          backgroundColor: "bg-redIcon",
          statusText: "Deshabilitado",
        };

      case "in-progress":
        return {
          textColor: "text-primaryBlue",
          backgroundColor: "bg-primaryBlue",
          statusText: "Viaje en curso",
        };

      case "active":
        return {
          textColor: "text-greyText",
          backgroundColor: "bg-greyText",
          statusText: "Activo",
        };

      case "ready":
        return {
          textColor: "text-yellowText",
          backgroundColor: "bg-yellowBackground",
          statusText: "Preparado para repartir",
        };

      case "all-delivered":
        return {
          textColor: "text-greenText",
          backgroundColor: "bg-greenText",
          statusText: "Finalizó",
        };

      default:
        return {
          textColor: "",
          backgroundColor: "",
          statusText: "",
        };
    }
  })();

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      {disabled ? (
        <div className="px-4 items-center justify-center">
          <RiForbidLine size={30} />
        </div>
      ) : (
        <PercentageCircle percentage={percentage} />
      )}
      <div className="flex flex-col gap-2 ml-2 grow">
        <p className="font-bold text-base">{transporterName}</p>
        <p
          className={`font-medium text-sm ${handleStatus.textColor} flex items-center`}
        >
          <span
            className={`mr-1 h-2 w-2 rounded-full ${handleStatus.backgroundColor}`}
          />
          {handleStatus.statusText}
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
