import Button, { ButtonProps } from "../commons/Button";
import React from "react";
import Image from "next/image";
import PercentageCircle from "@/commons/PercentageCircle";
import Layout from "@/commons/Layout";
export interface DetailCardProps {
  percentage: number;
  title: string;
  description: string;
  images?: [string, string];
  buttonText: string;
  buttonProps?: ButtonProps;
  className?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  percentage,
  title,
  description,
  images,
  buttonText,
  buttonProps,
  className,
}) => {
  return (
    <Layout className="h-screem justify-center">
      <div className={`flex flex-col gap-4 ${className || ""}`}>
        <div className="flex justify-between items-center p-1">
          <div className="flex gap-4 items-center">
            <PercentageCircle percentage={percentage} />
            <div>
              <h1 className="font-bold text-base">{title}</h1>
              <p className="text-greyText text-sm">{description}</p>
            </div>
          </div>
          <div className="flex relative ">
            {images?.map((image, index) => (
              <Image
                key={index}
                alt="Imagen Perfil"
                width={70}
                height={70}
                src={image}
                className={`rounded-full ${
                  index === 0 ? "absolute z-0 mr-10" : "z-10 ml-10"
                }`}
              />
            ))}
          </div>
        </div>
        <Button className="py-[0.20rem]" {...buttonProps}>
          {buttonText}
        </Button>
      </div>
    </Layout>
  );
};

export default DetailCard;
