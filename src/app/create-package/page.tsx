"use client";
import Button from "@/commons/Button";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import TextInput from "@/commons/TextInput";
import React, { useContext } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Counter from "@/commons/Counter";
import { CheckRefreshContext } from "@/context/refresh";

const CreatePackage = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <h1 className="text-xl font-bold pt-3">Agregar paquetes</h1>
      <form autoComplete="off" className="pt-5 pb-5">
        <TextInput name="address" label="Dirección" />
        <TextInput name="addressee" label="Nombre de quien recibe" />
        <TextInput name="weight" label="Peso (Kg)" />
        <TextInput
          name="deliveryDate"
          label="Fecha en la que debe ser repartido"
        />
        <Counter />
        <Button className="w-[100%] font-medium mt-5">Agregar</Button>
      </form>
    </Layout>
  );
};

export default CreatePackage;
