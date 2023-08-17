"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDeliveryMan } from "@/redux/reducers/selectedDeliveryMan";
import { AppDispatch, RootState } from "@/redux/store";
import DeliveryCollapsibleBox from "@/components/DeliveryCollapsibleBox";
import Layout from "@/commons/Layout";
import IconButton from "@/commons/IconButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import DeliveryManProfile from "@/commons/DeliveryManProfile";
import { showToast } from "@/utils/toast";
import { AuthService } from "@/services/auth.service";

function DetailsDeliveryMan() {
  const { _id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const selectedDeliveryMan = useSelector(
    (state: RootState) => state.selectedDeliveryMan
  );
  const [profilePicture, setProfilePicture] = useState<string>(
    "/images/userIcon.jpg"
  );
  const getUser = useCallback(async () => {
    try {
      await dispatch(setSelectedDeliveryMan(_id as string)).unwrap();
      const token = window.localStorage.getItem("token");
      if (typeof token === "string" && typeof _id === "string") {
        const urlpicture = await AuthService.getProfilePicture(token, _id);
        setProfilePicture(urlpicture);
      }
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
        onClick={() => router.push("/delivery/people")}
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <DeliveryManProfile
        transporterName={selectedDeliveryMan.name}
        profileImage={profilePicture}
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
