import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import { RiArrowLeftSLine } from "react-icons/ri";
import React, { FC } from "react";
import Card from "@/commons/Card";

const DeliveryPeople: FC = () => {
  return (
    <Layout className="flex flex-col gap-4">
      <IconButton
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <Card title="Repartidores" className="grow">
        <div className="mt-5">
          <div>PackageTransporterCard</div>
          <div>PackageTransporterCard</div>
          <div>PackageTransporterCard</div>
        </div>
      </Card>
    </Layout>
  );
};

export default DeliveryPeople;
