"use client";
import React, { useContext } from "react";
import TextInput from "@/commons/TextInput";
import Layout from "@/commons/Layout";
import Button from "@/commons/Button";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import IconButton from "@/commons/IconButton";
import { deliveryHistory } from "@/utils/FakeDataDeliveryHistory";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CheckRefreshContext } from "@/context/refresh";

const DeliveryHistory = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <div className="flex flex-col gap-6 mb-4 mt-3">
        <div className="flex flex-row gap-2 ">
          <Button className="w-11/12 ">Direccion</Button>
          <Button className="w-11/12 " disabled>
            Destinatario
          </Button>
          <Button className="w-11/12 " disabled>
            ID
          </Button>
        </div>
        <form autoComplete="off">
          <TextInput
            name="search"
            placeholder="Inserte su búsqueda"
            label="Filtrar Pedido"
            type="text"
            required
          />
        </form>
      </div>
      <div className="pt-4 mb-4 px-4 border-t-2 overflow-y-scroll">
        {deliveryHistory.map((deliveryPackage) => (
          <div key={deliveryPackage.id}>
            <DeliveryPackageCard className="mb-4" {...deliveryPackage} />
            {deliveryPackage !== deliveryHistory.at(-1) && (
              <hr className="mb-4" />
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DeliveryHistory;
