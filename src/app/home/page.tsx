"use client";
import React from "react";
import ProfileInfo from "@/commons/ProfileInfo";
import DatePicker from "@/components/DatePicker";
import DetailCard from "@/components/DetailCard";
import Layout from "@/commons/Layout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

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
        <h3 className="font-bold ">15/02/23 - Detalles</h3>{" "}
        <DetailCard
          percentage={20}
          title="Repartidores"
          description="2/10 activos"
          images={[
            "/svg/santiagoProfilePicture.svg",
            "/svg/lucianaProfilePicture.svg",
          ]}
          buttonText="Ver Repartidores"
          pathButton="/delivery/people"
        />
        <DetailCard
          percentage={80}
          title="Paquetes"
          description="16/20 repartidos"
          buttonText="Ver Paquetes"
          pathButton="/package/manage"
        />
      </div>
    </Layout>
  );
};

export default Home;
