import React, { FC, useCallback } from "react";
import { ButtonProps } from "./Button";
import IconButton, { IconButtonProps } from "./IconButton";
import Image from "next/image";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { detelePackageById } from "@/redux/reducers/package";

interface DeliveryPackageCardProps {
  trash: boolean;
  buttonText: string;
  buttonProps?: ButtonProps;
  iconProps?: IconButtonProps;
  className?: string;
  onClick?: () => void;
  _id?: string;
  address?: string;
  receptorName?: string;
  deliveryMan?: string | null;
  weight?: number | null;
  deliveredAt?: Date | null;
  status?: "taken" | "in_progress" | "delivered" | null;
  deadline?: Date;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  } | null;
  distance?: number | null;
}

const DeliveryPackageCard: FC<DeliveryPackageCardProps> = ({
  address,
  receptorName,
  distance,
  city,
  status,
  trash,
  iconProps,
  className,
  _id,
  onClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleTrashIcon = useCallback(async () => {
    dispatch(detelePackageById(_id as string));
  }, [_id, dispatch]);

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
              <span className="text-greyText font-normal text-sm">{`${address}`}</span>
            </p>
            {trash ? (
              <IconButton onClick={handleTrashIcon} {...iconProps}>
                {
                  <BsFillTrash3Fill
                    className="fill-redIcon hover:fill-hoverRedIcon"
                    size={18}
                  />
                }
              </IconButton>
            ) : null}
          </div>
          <p className="text-greyText font-bold text-sm">
            Recibe:{" "}
            <span className="text-greyText font-normal text-sm">{`${receptorName}`}</span>
          </p>
          {distance ? (
            <p className="text-greyText font-bold text-sm">
              Distancia:{" "}
              <span className="text-greyText font-normal text-sm">{`${distance}`}</span>
            </p>
          ) : (
            <p className="text-greyText font-bold text-sm">
              Ciudad:{" "}
              <span className="text-greyText font-normal text-sm">{`${city}`}</span>
            </p>
          )}
          <div className="self-end pt-1">
            {status ? (
              status === "in_progress" ? (
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
