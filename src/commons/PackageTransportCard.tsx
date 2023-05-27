import React, { FC } from "react";
import Image from "next/image";

type ImageFormat = "png" | "svg" | "jpg";

interface PackageTransportCardProps {
  percentage: `${number}%`;
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
      <div>{percentage}</div>
      <div className="flex flex-col gap-1 ml-2">
        <p className="font-bold text-base">{transporterName}</p>
        <p className="font-medium text-sm text-primaryBlue">{status}</p>
      </div>
      <div className="flex items-center justify-center  bg-red-300 w-[40px] ml-4">
        <Image
          src={profileImage}
          width={100}
          height={100}
          alt="Profile"
          className="w-[35px] rounded-full"
        ></Image>
      </div>
    </div>
  );
};

export default PackageTransportCard;
