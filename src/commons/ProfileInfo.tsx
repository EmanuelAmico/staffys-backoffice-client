import Image from "next/image";
import React from "react";

interface ProfileInfoProps {
  profileImg: string;
  className?: string;
  name: string;
  module: string;
}

const ProfileInfo = ({
  profileImg,
  className,
  name,
  module,
}: ProfileInfoProps) => {
  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <Image
        alt="imagen de perfil"
        src={profileImg}
        width={54}
        height={54}
        className={`rounded-full ${className}`}
      />
      <div>
        <p className="text-md">Hola {name}!</p>
        <p className="text-lg font-bold">{module}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
