"use client";

import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import React, { useCallback, useContext, useEffect } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DeliveryPackageCard from "@/commons/DeliveryPackageCard";
import { AiFillPlusCircle } from "react-icons/ai";

import { CheckRefreshContext } from "@/context/refresh";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { showToast } from "@/utils/toast";
import { getAvailablePackages } from "@/redux/reducers/package";

const ManagePackages = () => {
  const router = useRouter();
  const { changeRefresh, isRefreshed } = useContext(CheckRefreshContext);
  const dispatch = useDispatch<AppDispatch>();
  const availablePackages = useSelector(
    (state: RootState) => state.package.availablePackages
  );

  const retrieveAvailablePackages = useCallback(async () => {
    try {
      await dispatch(getAvailablePackages()).unwrap();
    } catch (error) {
      showToast("info", "No tienes paquetes creados");
    }
  }, [dispatch]);

  useEffect(() => {
    retrieveAvailablePackages();
  }, [retrieveAvailablePackages]);

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <div className="flex justify-between items-center">
        <div className="my-4">
          <h4 className="font-bold text-xl">Paquetes</h4>
          <p className="">
            {availablePackages.length !== 0
              ? `Hay ${availablePackages.length} paquetes disponibles`
              : "No hay paquetes disponibles"}
          </p>
        </div>
        <IconButton
          onClick={() => {
            changeRefresh();
            router.push("/package/create");
          }}
          icon={<AiFillPlusCircle size={45} className="fill-primaryBlue" />}
        />
      </div>
      <div className="pt-4 mb-4 px-4 border-t-2 overflow-y-scroll">
        {availablePackages?.map((_package) => (
          <div key={_package._id}>
            <DeliveryPackageCard
              className="mb-4"
              address={_package.address}
              receptorName={_package.receptorName}
              buttonText=""
              city={_package.city}
              trash={true}
            />
            {_package !== availablePackages.at(-1) && <hr className="mb-4" />}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ManagePackages;
