import React, { FC } from "react";
import { ButtonProps } from "./Button";
import IconButton, { IconButtonProps } from "./IconButton";
import Image from "next/image";
import { BsFillTrash3Fill } from "react-icons/bs";

interface DeliveryPackageCardProps {
  destination: string;
  addressee: string;
  distance: string;
  trash: boolean;
  buttonText: string;
  status?: string;
  buttonProps?: ButtonProps;
  iconProps?: IconButtonProps;
  className?: string;
  onClick?: () => void;
}

const DeliveryPackageCard: FC<DeliveryPackageCardProps> = ({
  destination,
  addressee,
  distance,
  status,
  trash,
  iconProps,
  className,
  onClick,
}) => {
  return (
    <div
      className={`bg-whiteBackground rounded-lg shadow-md ${className || ""}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="flex items-center justify-center bg-grayBackground h-24 w-24 rounded-lg">
          <Image
            src={"/svg/package.svg"}
            alt="package"
            height="65"
            width="65"
          />
        </div>
        <div className="flex flex-col gap-[0.20rem] w-[65%]">
          <div className="flex gap-9 justify-between">
            <p className="text-greyText font-bold text-sm">
              Destino:{" "}
              <span className="text-greyText font-normal text-sm">{`${destination}`}</span>
            </p>
            {trash ? (
              <IconButton
                icon={
                  <BsFillTrash3Fill
                    className="fill-redIcon hover:fill-hoverRedIcon"
                    size={18}
                  />
                }
                {...iconProps}
              />
            ) : null}
          </div>
          <p className="text-greyText font-bold text-sm">
            Recibe:{" "}
            <span className="text-greyText font-normal text-sm">{`${addressee}`}</span>
          </p>
          <p className="text-greyText font-bold text-sm">
            Distancia:{" "}
            <span className="text-greyText font-normal text-sm">{`${distance}`}</span>
          </p>
          <div className="self-end pt-1">
            {status ? (
              status === "in progress" ? (
                <p className="font-bold text-yellowText">En curso</p>
              ) : (
                <p className="font-bold ">Entregado</p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPackageCard;
