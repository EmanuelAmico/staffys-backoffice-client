"use client";
import Button, { ButtonProps } from "../commons/Button";
import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import PercentageCircle from "@/commons/PercentageCircle";
import { useRouter } from "next/navigation";
import { CheckRefreshContext } from "@/context/refresh";
import { AuthService } from "@/services/auth.service";

export interface DetailCardProps {
  percentage: number;
  title: string;
  description: string;
  images?: [string, string];
  buttonText: string;
  buttonProps?: ButtonProps;
  className?: string;
  pathButton: string;
}

const DetailCard: FC<DetailCardProps> = ({
  percentage,
  title,
  description,
  images,
  buttonText,
  buttonProps,
  className,
  pathButton,
}) => {
  const { push } = useRouter();
  const { changeRefresh } = useContext(CheckRefreshContext);
  const [loading, setLoading] = useState(false);
  const [userImages, setUserImages] = useState<string[]>([]);

  const getUserImages = async () => {
    if (images && images?.length >= 2 && images[0].length > 0) {
      const firstImage = await AuthService.getProfilePicture(
        window.localStorage.getItem("token") as string,
        images[0]
      );
      const secondImage = await AuthService.getProfilePicture(
        window.localStorage.getItem("token") as string,
        images[1]
      );
      typeof (firstImage && secondImage) === "string"
        ? setUserImages([firstImage, secondImage] as string[])
        : setUserImages(["/images/userIcon.jpg", "/images/userIcon.jpg"]);
    }
    setUserImages(["/images/userIcon.jpg", "/images/userIcon.jpg"]);
  };
  useEffect(() => {
    getUserImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);
  return (
    <div
      className={`flex flex-col gap-4 shadow-md rounded-md  ${className || ""}`}
    >
      <div className="flex justify-between items-center p-1">
        <div className="flex gap-4 items-center">
          <PercentageCircle percentage={percentage} />
          <div>
            <h1 className="font-bold text-base">{title}</h1>
            <p className="text-greyText text-sm">{description}</p>
          </div>
        </div>
        <div className="flex relative ">
          {images && userImages.length >= 2
            ? userImages?.map((image, index) => (
                <Image
                  key={index}
                  alt="Imagen Perfil"
                  width={60}
                  height={60}
                  src={image}
                  className={`rounded-full border-4 border-white  ${
                    index === 0 ? "absolute z-0 mr-10" : "z-10 ml-10"
                  }`}
                />
              ))
            : null}
        </div>
      </div>
      <Button
        loading={loading}
        className="py-[0.20rem]"
        onClick={() => {
          changeRefresh();
          push(pathButton);
          setLoading(true);
        }}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default DetailCard;
