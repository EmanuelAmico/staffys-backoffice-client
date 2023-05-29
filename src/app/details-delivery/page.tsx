"use client";
import React, { useState } from "react";
import DeliverysCard from "@/components/DeliverysCard";
import Layout from "@/commons/Layout";
import { deliveryHistory } from "@/utils/FakeDataDeliveryHistory";
import { deliveryPending } from "@/utils/FakeDataDeliveryPending";
import { useRouter } from "next/navigation";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import ProfileInfo from "@/commons/ProfileInfo";
import SwitchButton from "@/commons/SwitchButton";

const Home = () => {
  const { back } = useRouter();
  const [isClick, setIsClick] = useState(true);

  return (
    <Layout className="flex gap-4">
      <IconButton
        onClick={() => back()}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <div className="flex justify-between">
        <ProfileInfo
          name="farid"
          module="activo"
          profileImg="/svg/faridProfilePicture.svg"
        />
        <SwitchButton
          isSwitched={isClick}
          onClick={() => setIsClick(!isClick)}
        />
      </div>
      <DeliverysCard
        title="Repartos pendientes"
        description="No tenes 6 repartos pendientes"
        delivery={false}
        packages={deliveryPending}
      />
      <DeliverysCard
        title="Historial de repartos"
        description="Ya repartiste 6 paquetes"
        delivery={false}
        packages={deliveryHistory}
        pathButton="/delivery-history"
      />
    </Layout>
  );
};

export default Home;
