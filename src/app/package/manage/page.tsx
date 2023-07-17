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
      console.error(error);
      showToast("error", "Error al obtener los paquetes");
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
      <h4 className="mt-4 font-bold text-xl">Paquetes</h4>
      <p className="mb-4">Hay 6 paquetes</p>
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
      <IconButton
        onClick={() => {
          changeRefresh();
          router.push("/package/create");
        }}
        className="self-end"
        icon={<AiFillPlusCircle size={55} className="fill-primaryBlue" />}
      />
    </Layout>
  );
};

export default ManagePackages;
