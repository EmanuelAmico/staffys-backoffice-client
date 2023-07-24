"use client";
import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import SwitchButton from "./SwitchButton";
import { toggleDisableUser } from "@/redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSelectedDeliveryMan } from "@/redux/reducers/selectedDeliveryMan";
import { showToast } from "@/utils/toast";
import { getDeliveryPeople } from "@/redux/reducers/delivery";
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
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { selectedDeliveryMan } = useSelector((state: RootState) => state);
  const textColor = selectedDeliveryMan.is_disabled
    ? "text-redIcon"
    : "text-primaryBlue";
  const backgroundColor = selectedDeliveryMan.is_disabled
    ? "bg-redIcon"
    : "bg-primaryBlue";
  const statusText = selectedDeliveryMan.is_disabled
    ? "Deshabilitado"
    : "Habilitado";

  const handleSwitchClick = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(toggleDisableUser()).unwrap();
      await dispatch(setSelectedDeliveryMan(selectedDeliveryMan._id)).unwrap();
      await dispatch(getDeliveryPeople()).unwrap();
      setLoading(false);
    } catch (error) {
      console.error(error);
      showToast("error", "Error al cambiar el estado del usuario");
    }
  }, [dispatch, selectedDeliveryMan._id]);

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
      <SwitchButton
        disabled={loading}
        isSwitched={!selectedDeliveryMan.is_disabled}
        onClick={handleSwitchClick}
      />
    </div>
  );
};

export default DeliveryManProfile;
