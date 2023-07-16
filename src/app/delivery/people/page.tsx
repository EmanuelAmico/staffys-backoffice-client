"use client";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import { RiArrowLeftSLine } from "react-icons/ri";
import React, { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/commons/Card";
import PackageTransportCard from "@/commons/PackageTransportCard";
import { CheckRefreshContext } from "@/context/refresh";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDeliveryPeople } from "@/redux/reducers/delivery";

const DeliveryPeople = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);
  const dispatch = useDispatch<AppDispatch>();
  const deliveryPeople = useSelector(
    (state: RootState) => state.delivery.deliveryPeople
  );

  const retrieveDeliveryPeople = useCallback(async () => {
    try {
      await dispatch(getDeliveryPeople()).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const status = (
    is_active: boolean,
    currentPackage: string | null,
    pendingPackages: string[]
  ) => {
    if (!is_active) return "inactive";
    if (currentPackage) return "in-progress";
    if (pendingPackages.length === 0) return "all-delivered";
    return null;
  };

  const percentage = (is_active: boolean, pendingPackages: string[]) => {
    if (!is_active) return 0;
    const result = 100 - pendingPackages.length * 10;
    return result;
  };

  useEffect(() => {
    retrieveDeliveryPeople();
  }, [retrieveDeliveryPeople]);

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <Card title="Repartidores" className="grow overflow-y-hidden">
        <div className="flex flex-col gap-8 mt-8 h-[85%] overflow-y-auto">
          {deliveryPeople?.map((user) => (
            <PackageTransportCard
              key={user._id}
              percentage={percentage(user.is_active, user.pendingPackages)}
              status={status(
                user.is_active,
                user.currentPackage,
                user.pendingPackages
              )}
              transporterName={user.name}
              profileImage="/svg/faridProfilePicture.svg" // NOTE: Don`t forget to change image
            />
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default DeliveryPeople;
