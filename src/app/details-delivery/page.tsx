"use client";
import React from "react";
import DeliveryCollapsibleBox from "@/components/DeliveryCollapsibleBox";
import Layout from "@/commons/Layout";
import { deliveryHistory } from "@/utils/FakeDataDeliveryHistory";
import { deliveryPending } from "@/utils/FakeDataDeliveryPending";
import { useRouter } from "next/navigation";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import DeliveryManProfile from "@/commons/DeliveryManProfile";

const DetailsDelivery = () => {
  const { back } = useRouter();

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => back()}
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
