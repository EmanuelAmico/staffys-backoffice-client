"use client";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import { RiArrowLeftSLine } from "react-icons/ri";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Card from "@/commons/Card";
import PackageTransportCard from "@/commons/PackageTransportCard";
import { CheckRefreshContext } from "@/context/refresh";

const DeliveryPeople = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <Card title="Repartidores" className="grow overflow-y-hidden">
        <div className="flex flex-col gap-8 mt-8 h-[85%] overflow-y-auto">
          <PackageTransportCard
            percentage={60}
            status="in-progress"
            transporterName="Farid"
            profileImage="/svg/faridProfilePicture.svg"
          />
          <PackageTransportCard
            percentage={100}
            status="all-delivered"
            transporterName="Luciana"
            profileImage="/svg/lucianaProfilePicture.svg"
          />
          <PackageTransportCard
            percentage={65}
            status="inactive"
            transporterName="Santiago"
            profileImage="/svg/santiagoProfilePicture.svg"
          />
        </div>
      </Card>
    </Layout>
  );
};

export default DeliveryPeople;
