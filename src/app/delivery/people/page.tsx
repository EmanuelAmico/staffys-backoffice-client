"use client";

import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import { RiArrowLeftSLine } from "react-icons/ri";
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/commons/Card";
import PackageTransportCard from "@/commons/PackageTransportCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getDeliveryPeople,
  setDeliveryPeople,
} from "@/redux/reducers/delivery";
import { showToast } from "@/utils/toast";
import { Package } from "@/types/package.types";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";

const DeliveryPeople = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const deliveryPeople = useSelector(
    (state: RootState) => state.delivery.deliveryPeople
  );

  const retrieveDeliveryPeople = useCallback(async () => {
    try {
      if (!deliveryPeople.length) await dispatch(getDeliveryPeople()).unwrap();
    } catch (error) {
      console.error(error);
      showToast("info", "Aun no tienes repartidores registrados");
    }
  }, [deliveryPeople.length, dispatch]);

  const status = (
    is_disabled: boolean,
    is_able_to_deliver: boolean,
    currentPackage: Package | null,
    pendingPackages: Package[],
    historyPackages: Package[]
  ) => {
    if (is_disabled) return "disabled";
    if (currentPackage) return "in-progress";
    if (is_able_to_deliver && pendingPackages.length !== 0) return "ready";
    if (!is_able_to_deliver && pendingPackages.length === 0) {
      const todayPackageHistory = historyPackages.filter(
        (_package) =>
          new Date(_package.updatedAt).toLocaleString().split(",")[0] ===
          new Date().toLocaleString().split(",")[0]
      );
      if (todayPackageHistory.length !== 0) return "all-delivered";
      else return "unable";
    }
    if (is_able_to_deliver) return "active";
  };

  const calculatePercentage = (
    is_disabled: boolean,
    currentPackage: Package | null,
    pendingPackages: Package[],
    historyPackages: Package[]
  ) => {
    const todayPackageHistory = historyPackages.filter(
      (_package) =>
        new Date(_package.updatedAt).toLocaleString().split(",")[0] ===
        new Date().toLocaleString().split(",")[0]
    );

    const countDelivered = todayPackageHistory.length;
    const countPending = pendingPackages.length;
    const countCurrent = currentPackage ? 1 : 0;

    const totalPackages = countCurrent + countPending + countDelivered;

    if (is_disabled) return 0;
    if (!countDelivered) return 0;
    return Math.floor((countDelivered * 100) / totalPackages);
  };

  const getProfilePictures = useCallback(async () => {
    try {
      if (!(deliveryPeople.length > 0)) {
        return;
      }
      const token = window.localStorage.getItem("token");
      const deliveryPeopleWithUrlPhotos = await deliveryPeople.map(
        async (element) => {
          if (!(typeof token === "string")) {
            throw new Error("No se reconoció el formato del token");
          }
          const urlPhotoS3 = await AuthService.getProfilePicture(
            token,
            element._id
          );
          return {
            ...element,
            urlpicture: urlPhotoS3,
          };
        }
      );
      const complete = await Promise.all(deliveryPeopleWithUrlPhotos);
      dispatch(setDeliveryPeople({ deliveryPeople: complete }));
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryPeople.length, dispatch]);

  useEffect(() => {
    getProfilePictures();
  }, [getProfilePictures]);

  useEffect(() => {
    retrieveDeliveryPeople();
  }, [retrieveDeliveryPeople]);
  return (
    <Layout className="gap-4">
      <IconButton onClick={() => router.push("/home")} className="self-start">
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <Card title="Repartidores" className="grow overflow-y-hidden">
        <div className="flex flex-col gap-8 mt-5 h-[86%] overflow-y-auto">
          {deliveryPeople?.map((user) => (
            <Link key={user._id} href={`/delivery/people/${user._id}`}>
              <PackageTransportCard
                percentage={calculatePercentage(
                  user.is_disabled,
                  user.currentPackage,
                  user.pendingPackages,
                  user.historyPackages
                )}
                status={status(
                  user.is_disabled,
                  user.is_able_to_deliver,
                  user.currentPackage,
                  user.pendingPackages,
                  user.historyPackages
                )}
                transporterName={user.name}
                disabled={user.is_disabled}
                profileImage={
                  user.urlpicture ? user.urlpicture : "/images/urlIcon.jpg"
                }
              />
            </Link>
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default DeliveryPeople;
