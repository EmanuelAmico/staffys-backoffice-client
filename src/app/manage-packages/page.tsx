"use client";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import { AiFillPlusCircle } from "react-icons/ai";
import { deliveryPackageData } from "@/utils/FakeDataPackage";

function Page() {
  const { back, push } = useRouter();

  return (
    <Layout>
      <div className="w-full">
        <IconButton
          onClick={() => back()}
          icon={<RiArrowLeftSLine size={40} />}
        />
      </div>

      <h4 className="mt-4 font-bold text-2xl w-full text-left">Paquetes</h4>
      <p>Hay 523 entregados</p>
      <div className="pt-4 mb-4 px-4 border-t-2 overflow-y-scroll">
        {deliveryPackageData.map((deliveryPackage) => (
          <div key={deliveryPackage.id}>
            <DeliveryPackageCard className="mb-4" {...deliveryPackage} />
            {deliveryPackage !== deliveryPackageData.at(-1) && (
              <hr className="mb-4" />
            )}
          </div>
        ))}
      </div>

      <IconButton
        onClick={() => push("/create-package")}
        className="self-end"
        icon={<AiFillPlusCircle size={60} fill="#217BCE" />}
      />
    </Layout>
  );
}

export default Page;

/*

    <Layout className="overflow-y-scroll">
      <div className="flex justify-between">
        <IconButton
          onClick={() => back()}
          icon={<RiArrowLeftSLine size={40} />}
        />
        <Counter title="Paquetes restantes" count={10} />
      </div>
      <h4 className="mt-4 font-bold text-xl">Obtener paquetes</h4>
      <p className="mb-4">¿Cuántos paquetes más vas a repartir hoy?</p>
      <div className="pt-4 mb-4 px-4 border-t-2 overflow-y-scroll">
        {deliveryPackages.map((deliveryPackage) => (
          <div key={deliveryPackage.id}>
            <DeliveryPackageCard className="mb-4" {...deliveryPackage} />
            {deliveryPackage !== deliveryPackages.at(-1) && (
              <hr className="mb-4" />
            )}
          </div>
        ))}
      </div>
      <Button>Iniciar Jornada</Button>
    </Layout>


*/
