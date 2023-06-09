import Image from "next/image";
import React, { FC, useState } from "react";
import SwitchButton from "./SwitchButton";

interface DeliveryManProfileProps {
  transporterName: string;
  profileImage: string;
  className?: string;
}

const DeliveryManProfile: FC<DeliveryManProfileProps> = ({
  transporterName,
  profileImage,
  className,
}) => {
  const [isClick, setIsClick] = useState(true);

  const textColor = isClick === false ? "text-redIcon" : "text-primaryBlue";
  const backgroundColor = isClick === false ? "bg-redIcon" : "bg-primaryBlue";
  const statusText = isClick === false ? "Inactivo" : "Activo";

  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <Image
        alt="imagen de perfil"
        src={profileImage}
        width={54}
        height={54}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2 ml-2 grow">
        <p className="font-bold text-base">{transporterName}</p>
        <p className={`font-medium text-sm ${textColor} flex items-center`}>
          <span className={`mr-1 h-2 w-2 rounded-full ${backgroundColor}`} />
          {statusText}
        </p>
      </div>
      <SwitchButton isSwitched={isClick} onClick={() => setIsClick(!isClick)} />
    </div>
  );
};

export default DeliveryManProfile;
