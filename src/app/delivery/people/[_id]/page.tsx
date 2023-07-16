"use client";
import React, { useCallback, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedDeliveryMan } from "@/redux/reducers/selectedDeliveryMan";
import { AppDispatch } from "@/redux/store";
import DeliveryCollapsibleBox from "@/components/DeliveryCollapsibleBox";
import Layout from "@/commons/Layout";
import { deliveryHistory } from "@/utils/FakeDataDeliveryHistory";
import { deliveryPending } from "@/utils/FakeDataDeliveryPending";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import DeliveryManProfile from "@/commons/DeliveryManProfile";
import { CheckRefreshContext } from "@/context/refresh";

function DeliveryPeople() {
  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const getUser = useCallback(async () => {
    try {
      await dispatch(setSelectedDeliveryMan(_id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [_id, dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <DeliveryManProfile
        transporterName="Farid"
        profileImage="/svg/faridProfilePicture.svg"
      />
      <DeliveryCollapsibleBox
        title="Repartos pendientes"
        description="No tenes 6 repartos pendientes"
        delivery={false}
        packages={deliveryPending}
      />
      <DeliveryCollapsibleBox
        title="Historial de repartos"
        description="Ya repartiste 6 paquetes"
        delivery={false}
        packages={deliveryHistory}
        pathButton="/delivery-history"
      />
    </Layout>
  );
}

export default DeliveryPeople;
