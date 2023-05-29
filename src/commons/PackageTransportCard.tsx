import React, { FC } from "react";
import Image from "next/image";
import PercentageCircle from "./PercentageCircle";

type ImageFormat = "png" | "svg" | "jpg";

interface PackageTransportCardProps {
  percentage: number;
  status: string;
  transporterName: string;
  profileImage: ImageFormat | string;
}

const PackageTransportCard: FC<PackageTransportCardProps> = ({
  transporterName,
  profileImage,
  status,
  percentage,
}) => {
  return (
    <div className="flex gap-4">
      <PercentageCircle percentage={percentage} />
      <div className="flex flex-col gap-1 ml-2">
        <p className="font-bold text-base">{transporterName}</p>
        <p className="font-medium text-sm text-primaryBlue flex items-center">
          <span className="mr-1 h-2 w-2 rounded-full bg-primaryBlue" /> {status}
        </p>
      </div>
      <div className="flex items-center justify-center  w-[44px] ml-4">
        <Image
          src={profileImage}
          width={54}
          height={54}
          alt="Profile"
          className="w-[40px] rounded-full"
        />
      </div>
    </div>
  );
};

export default PackageTransportCard;
