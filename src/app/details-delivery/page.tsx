"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import DeliveryCollapsibleBox from "@/components/DeliveryCollapsibleBox";
import Layout from "@/commons/Layout";
import { deliveryHistory } from "@/utils/FakeDataDeliveryHistory";
import { deliveryPending } from "@/utils/FakeDataDeliveryPending";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import DeliveryManProfile from "@/commons/DeliveryManProfile";
import { CheckRefreshContext } from "@/context/refresh";

const DetailsDelivery = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <DeliveryManProfile
        transporterName="Farid"
        profileImage="/svg/faridProfilePicture.svg"
      />
      <DeliveryCollapsibleBox
        title="Repartos pendientes"
        description="No tenes 6 repartos pendientes"
        delivery={false}
        packages={deliveryPending}
      />
      <DeliveryCollapsibleBox
        title="Historial de repartos"
        description="Ya repartiste 6 paquetes"
        delivery={false}
        packages={deliveryHistory}
        pathButton="/delivery-history"
      />
    </Layout>
  );
};

export default DetailsDelivery;
