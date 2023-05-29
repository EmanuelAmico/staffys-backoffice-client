import Button, { ButtonProps } from "../commons/Button";
import React from "react";
import Image from "next/image";
import PercentageCircle from "@/commons/PercentageCircle";
export interface IDetailCard extends Omit<ButtonProps, "children"> {
  percentage: number;
  title: string;
  description: string;
  images?: [string, string];
  buttonText: string;
}

const DetailCard: React.FC<IDetailCard> = ({
  percentage,
  title,
  description,
  images,
  buttonText,
  ...buttonProps
}) => {
  return (
    <div className="w-full h-[10rem]  flex justify-center items-center flex-col bg-white">
      <div className="h-[7rem]  w-full flex justify-center items-center">
        <div className="w-1/3 h-full flex justify-center items-center  ">
          <PercentageCircle percentage={percentage} />
        </div>
        <div className="w-1/3 h-full flex justify-center flex-col items-start  ">
          <h1 className="font-bold text-1xl">{title}</h1>
          <p className="text-greyText">{description}</p>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center relative ">
          {images?.map((image, index) => (
            <Image
              key={index}
              alt="imagen"
              width={70}
              height={70}
              src={image}
              className={`rounded-full border-[0.4rem] border-white ${
                index === 0 ? "absolute z-0 mr-10" : "z-10 ml-10"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="h-[3rem]  w-full flex justify-center items-center">
        <Button className="w-[95%]" {...buttonProps}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DetailCard;
