"use client";
import React, { useEffect } from "react";
import ProfileInfo from "@/commons/ProfileInfo";
import DatePicker from "@/components/DatePicker";
import DetailCard from "@/components/DetailCard";
import Layout from "@/commons/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { showToast } from "@/utils/toast";
import { getOrCreateTodayHistory } from "@/redux/reducers/selectedHistory";
import { getHistories } from "@/redux/reducers/histories";
import { getDeliveryPeople } from "@/redux/reducers/delivery";

const Home = () => {
  const {
    user,
    histories,
    selectedHistory,
    delivery: { deliveryPeople },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getDeliveryPeople()).unwrap();
        await dispatch(getOrCreateTodayHistory()).unwrap();
        await dispatch(getHistories()).unwrap();
      } catch (error) {
        console.error(error);
        showToast("error", "Se produjo un error al obtener las historias");
      }
    })();
  }, [dispatch]);

  if (!selectedHistory._id || !histories.length) return null;

  return (
    <Layout className="gap-2">
      <ProfileInfo
        profileImg={"/svg/userProfilePicture.svg"}
        name={user.name}
        module="Gestionar Pedidos"
        className="pt-4"
      />
      <DatePicker />
      <div className="flex flex-col mt-2 gap-3">
        <h3 className="font-bold ">
          {selectedHistory.date.split("T")[0].split("-").reverse().join("/")} -
          Detalles
        </h3>
        <DetailCard
          percentage={Math.round(
            (selectedHistory.activeUsers.length * 100) / deliveryPeople.length
          )}
          title="Repartidores"
          description={`${selectedHistory.activeUsers.length}/${deliveryPeople.length} activos`}
          images={[
            "/svg/santiagoProfilePicture.svg",
            "/svg/lucianaProfilePicture.svg",
          ]}
          buttonText="Ver Repartidores"
          pathButton="/delivery/people"
        />
        <DetailCard
          percentage={Math.round(
            (selectedHistory.targetPackages.filter(
              (p) => p.status === "delivered"
            ).length *
              100) /
              selectedHistory.targetPackages.length
          )}
          title="Paquetes"
          description={`${
            selectedHistory.targetPackages.filter(
              (p) => p.status === "delivered"
            ).length
          }/${selectedHistory.targetPackages.length} repartidos`}
          buttonText="Ver Paquetes"
          pathButton="/package/manage"
        />
      </div>
    </Layout>
  );
};

export default Home;
