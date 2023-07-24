"use client";

import React, { useCallback, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDeliveryMan } from "@/redux/reducers/selectedDeliveryMan";
import { AppDispatch, RootState } from "@/redux/store";
import DeliveryCollapsibleBox from "@/components/DeliveryCollapsibleBox";
import Layout from "@/commons/Layout";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import DeliveryManProfile from "@/commons/DeliveryManProfile";
import { CheckRefreshContext } from "@/context/refresh";
import { showToast } from "@/utils/toast";

function DetailsDeliveryMan() {
  const { _id } = useParams();
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);
  const dispatch = useDispatch<AppDispatch>();
  const selectedDeliveryMan = useSelector(
    (state: RootState) => state.selectedDeliveryMan
  );

  const getUser = useCallback(async () => {
    try {
      await dispatch(setSelectedDeliveryMan(_id)).unwrap();
    } catch (error) {
      console.error(error);
      showToast("error", "Error al obtener el usuario");
    }
  }, [_id, dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Layout className="gap-4">
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <DeliveryManProfile
        transporterName={selectedDeliveryMan.name}
        profileImage="/svg/faridProfilePicture.svg"
      />
      <DeliveryCollapsibleBox
        title="Repartos pendientes"
        description={
          selectedDeliveryMan.pendingPackages.length > 0
            ? `Tenés ${selectedDeliveryMan.pendingPackages.length} paquetes pendientes.`
            : "No tenés paquetes pendientes."
        }
        delivery={false}
        packages={selectedDeliveryMan.pendingPackages}
      />
      <DeliveryCollapsibleBox
        title="Historial de repartos"
        description={
          selectedDeliveryMan.historyPackages.length > 0
            ? `Ya repartiste ${
                selectedDeliveryMan.historyPackages.length
              } paquete${
                selectedDeliveryMan.historyPackages.length > 1 ? "s" : ""
              }.`
            : "Aún no repartiste ningún paquete."
        }
        delivery={false}
        packages={selectedDeliveryMan.historyPackages}
        pathButton={
          selectedDeliveryMan.historyPackages.length !== 0
            ? "/delivery/history"
            : ""
        }
      />
    </Layout>
  );
}

export default DetailsDeliveryMan;
