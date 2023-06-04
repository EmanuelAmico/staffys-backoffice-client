"use client";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import { AiFillPlusCircle } from "react-icons/ai";
import { deliveryPackageData } from "@/utils/FakeDataPackage";

const ManagePackages = () => {
  const { back, push } = useRouter();

  return (
    <Layout>
      <IconButton
        onClick={() => back()}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <h4 className="mt-4 font-bold text-xl">Paquetes</h4>
      <p className="mb-4">Hay 6 paquetes</p>
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
        icon={<AiFillPlusCircle size={55} className="fill-primaryBlue" />}
      />
    </Layout>
  );
};

export default ManagePackages;
