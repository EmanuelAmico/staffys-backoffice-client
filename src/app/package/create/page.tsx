"use client";

import Button from "@/commons/Button";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import TextInput from "@/commons/TextInput";
import React, { FormEvent, useContext } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CheckRefreshContext } from "@/context/refresh";
import useInput from "@/hooks/useInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createPackages } from "@/redux/reducers/package";

const CreatePackage = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const address = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "La direccion es requerida",
      },
    ],
  });

  const receptorName = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "EL nombre de quien recibe es requerido",
      },
    ],
  });

  const weight = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "El peso es requerido",
      },
    ],
  });

  const deadline = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "La fecha limite de entrega es requerido",
      },
    ],
  });

  const city = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "La ciudad es requerida",
      },
    ],
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const packageData = {
      address: address.value,
      receptorName: receptorName.value,
      weight: Number(weight.value),
      deadline: new Date(deadline.value),
      city: city.value,
    };
    try {
      await dispatch(createPackages(packageData)).unwrap();
      push("/package/manage");
    } catch (error) {
      console.error(error);
    }
    return;
  };

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        icon={<RiArrowLeftSLine size={40} />}
        className="self-start"
      />
      <h1 className="text-xl font-bold pt-3">Agregar paquetes</h1>
      <form autoComplete="off" className="pt-4" onSubmit={handleSubmit}>
        <TextInput name="address" label="Dirección" {...address} required />
        <TextInput
          name="receptorName"
          label="Nombre de quien recibe"
          {...receptorName}
          required
        />
        <TextInput name="weight" label="Peso (Kg)" {...weight} required />
        <TextInput
          name="deadline"
          label="Fecha limite entrega"
          {...deadline}
          required
        />
        <TextInput name="city" label="Ciudad" {...city} required />
        <Button className="w-[100%] font-medium mt-5">Agregar</Button>
      </form>
    </Layout>
  );
};

export default CreatePackage;
