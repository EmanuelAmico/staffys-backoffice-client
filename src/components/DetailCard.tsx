import Button, { ButtonProps } from "../commons/Button";
import React from "react";
import Image from "next/image";
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
          <p>{`${percentage}%`}</p>
        </div>
        <div className="w-1/3 h-full flex justify-center flex-col items-start  ">
          <h1 className="font-bold text-1xl">{title}</h1>
          <p className="text-greyText">{description}</p>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center relative ">
          <div className="w-full h-full flex justify-center items-center">
            {images?.map((image, index) =>
              index === 0 ? (
                <Image
                  key={index}
                  alt="imagen"
                  width={70}
                  height={70}
                  src={image}
                  className="rounded-full border-[0.4rem] border-white absolute z-0 mr-10"
                />
              ) : (
                <Image
                  key={index}
                  alt="imagen"
                  width={70}
                  height={70}
                  src={image}
                  className="rounded-full border-[0.4rem] border-white z-10 ml-10"
                />
              )
            )}
          </div>
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
