import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

interface ProfileInfoProps {
  profileImg: string;
  className?: string;
  name: string;
  module: string;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  profileImg,
  className,
  name,
  module,
}) => {
  const [urlPhoto, setUrlPhoto] = useState<string>("");

  const handleGetProfilePicture = async () => {
    try {
      const userUrlPhoto = await AuthService.getProfilePicture(
        window.localStorage.getItem("token") as string,
        profileImg
      );
      setUrlPhoto(userUrlPhoto);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProfilePicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      <Image
        alt="imagen de perfil"
        src={urlPhoto.length > 0 ? urlPhoto : "/svg/userProfilePicture.svg"}
        width={54}
        height={54}
        className="rounded-full overflow-hidden"
      />
      <div>
        <p className="text-md">Hola {name}!</p>
        <p className="text-lg font-bold">{module}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
