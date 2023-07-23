"use client";

import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const retrieveAvailablePackages = useCallback(async () => {
    try {
      await dispatch(getAvailablePackages()).unwrap();
    } catch (error) {
      console.error(error);
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
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
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
          loading={loading}
          onClick={() => {
            changeRefresh();
            setLoading(true);
            router.push("/package/create");
          }}
        >
          <AiFillPlusCircle size={45} className="fill-primaryBlue" />
        </IconButton>
      </div>
      <div className="pt-4 mb-4 px-4 border-t-2 overflow-y-scroll">
        {availablePackages?.map((_package) => (
          <div key={_package._id}>
            <DeliveryPackageCard
              _id={_package._id}
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
