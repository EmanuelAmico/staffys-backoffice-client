import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import PercentageCircle from "./PercentageCircle";
import { RiForbidLine } from "react-icons/ri";

interface PackageTransportCardProps {
  percentage: number;
  status?:
    | "in-progress"
    | "all-delivered"
    | "disabled"
    | "active"
    | "ready"
    | "unable";
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
          textColor: "text-redText",
          pointColor: "bg-redText",
          statusText: "Deshabilitado",
        };

      case "unable":
        return {
          textColor: "text-salmonText",
          pointColor: "bg-salmonText",
          statusText: "Incapaz para repartir",
        };

      case "in-progress":
        return {
          textColor: "text-blueText",
          pointColor: "bg-blueText",
          statusText: "Viaje en curso",
        };

      case "active":
        return {
          textColor: "text-greyText",
          pointColor: "bg-greyText",
          statusText: "Activo",
        };

      case "ready":
        return {
          textColor: "text-yellowText",
          pointColor: "bg-yellowText",
          statusText: "Preparado para repartir",
        };

      case "all-delivered":
        return {
          textColor: "text-greenText",
          pointColor: "bg-greenText",
          statusText: "Finalizó",
        };
    }
  })();

  const [srcProfileImage, setSrcProfileImage] = useState(profileImage);
  useEffect(() => {
    setSrcProfileImage(profileImage);
  }, [profileImage]);
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
          className={`font-medium text-sm ${handleStatus?.textColor} flex items-center`}
        >
          <span
            className={`mr-1 h-2 w-2 rounded-full ${handleStatus?.pointColor}`}
          />
          {handleStatus?.statusText}
        </p>
      </div>
      <Image
        onError={() => setSrcProfileImage("/images/userIcon.jpg")}
        src={srcProfileImage}
        width={62}
        height={62}
        alt="Profile"
        className="rounded-full"
      />
    </div>
  );
};

export default PackageTransportCard;
