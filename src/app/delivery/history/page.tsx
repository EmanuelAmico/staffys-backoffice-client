"use client";
import React, { useContext } from "react";
import TextInput from "@/commons/TextInput";
import Layout from "@/commons/Layout";
import Button from "@/commons/Button";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CheckRefreshContext } from "@/context/refresh";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DeliveryHistory = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);
  const { historyPackages } = useSelector(
    (state: RootState) => state.selectedDeliveryMan
  );

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <div className="flex flex-col gap-5 mt-3">
        <div className="flex flex-row gap-2 ">
          <Button className="w-11/12 " disabled>
            Direccion
          </Button>
          <Button className="w-11/12 " disabled>
            Destinatario
          </Button>
          <Button className="w-11/12 " disabled>
            Ciudad
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
        {historyPackages.map((_package) => (
          <div key={_package._id}>
            <DeliveryPackageCard
              className="mb-4"
              trash={false}
              buttonText=""
              receptorName={_package.receptorName}
              city={_package.city}
              address={_package.address}
            />
            {_package !== historyPackages.at(-1) && <hr className="mb-4" />}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DeliveryHistory;
