"use client";
import React, { FormEvent } from "react";
import Layout from "@/commons/Layout";
import Button from "@/commons/Button";
import TextInput from "@/commons/TextInput";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/reducers/user";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast";

const Login = () => {
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const email = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "El email es requerido",
      },
      {
        type: "email",
        errorMessage: "El email tiene un formato incorrecto",
      },
    ],
  });

  const password = useInput({
    validators: [
      {
        type: "notEmpty",
        errorMessage: "La contraseña es requerida",
      },
      {
        type: "password",
        errorMessage: "Debe tener al menos 8 caracteres, una letra y un número",
      },
    ],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };

    try {
      await dispatch(login(userData)).unwrap();
      showToast("success", "¡Usuario logueado con éxito!");
      push("/home");
    } catch (error) {
      console.error(error);
      if ((error as Error).message === "User is not admin") {
        return showToast("error", "Tu usuario no es admin");
      }
      showToast("error", "Credenciales inválidas");
    }
  };

  return (
    <Layout className="h-screen">
      <div className="flex justify-center items-end h-[30%]">
        <Image
          src={"/images/logoFastDelivery.png"}
          alt="Logo Fast Delivery"
          width="200"
          height="200"
          priority
        />
      </div>
      <form autoComplete="off" className="pt-16 pb-5" onSubmit={handleSubmit}>
        <TextInput
          label="Usuario"
          name="email"
          placeholder="staffys@gmail.com"
          type="email"
          required
          {...email}
        />
        <TextInput
          label="Contraseña"
          name="password"
          placeholder="Contraseña"
          type="password"
          required
          {...password}
        />
        <Button className="w-[100%] font-medium mt-5">Ingresar</Button>
      </form>
    </Layout>
  );
};

export default Login;
