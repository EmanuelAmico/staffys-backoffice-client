"use client";

import Button from "@/commons/Button";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import TextInput from "@/commons/TextInput";
import React, { FormEvent, useContext, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CheckRefreshContext } from "@/context/refresh";
import useInput from "@/hooks/useInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createPackages } from "@/redux/reducers/package";
import { showToast } from "@/utils/toast";

const CreatePackage = () => {
  const router = useRouter();
  const { isRefreshed } = useContext(CheckRefreshContext);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await dispatch(createPackages(packageData)).unwrap();
      showToast("success", "Paquete creado correctamente");
      setLoading(false);
      push("/package/manage");
    } catch (error) {
      console.error(error);
      showToast("error", "Error al crear el paquete");
      setLoading(false);
    }
    return;
  };

  return (
    <Layout>
      <IconButton
        onClick={() => (isRefreshed ? router.push("/home") : router.back())}
        className="self-start"
      >
        {<RiArrowLeftSLine size={40} />}
      </IconButton>
      <h1 className="text-xl font-bold pt-3">Agregar paquetes</h1>
      <form autoComplete="off" className="pt-4" onSubmit={handleSubmit}>
        <TextInput
          name="address"
          label="Dirección"
          type="text"
          required
          {...address}
        />
        <TextInput
          name="receptorName"
          label="Nombre de quien recibe"
          type="text"
          required
          {...receptorName}
        />
        <TextInput
          name="weight"
          label="Peso (Kg)"
          type="number"
          required
          tooltip="El peso debe ser un numero"
          {...weight}
        />
        <TextInput
          name="deadline"
          label="Fecha limite entrega"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          required
          {...deadline}
        />
        <TextInput name="city" label="Ciudad" {...city} required />
        <Button loading={loading} className="w-[100%] font-medium mt-2">
          Agregar
        </Button>
      </form>
    </Layout>
  );
};

export default CreatePackage;
