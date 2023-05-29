"use client";
import Button from "@/commons/Button";
import IconButton from "@/commons/IconButton";
import Layout from "@/commons/Layout";
import TextInput from "@/commons/TextInput";
import React, { MouseEvent, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [counter, setCounter] = useState(0);
  const handleSum = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCounter(counter + 1);
  };
  const handleMinus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  return (
    <Layout className="flex flex-col  items-center">
      <div className="w-full">
        <IconButton
          onClick={() => router.back()}
          icon={<RiArrowLeftSLine size={40} />}
        />
      </div>
      <div className="w-full mt-[3rem]">
        <h1 className="text-2xl font-bold">Agregar paquetes</h1>
      </div>
      <form action="" className="mt-10 w-full">
        <TextInput name="direccion" label="Dirección" />
        <TextInput
          name="nombre de quien recibe"
          label="Nombre de quien recibe"
          classNameContainer="mt-5"
        />
        <TextInput name="peso" label="Peso (Kg)" classNameContainer="mt-5" />
        <TextInput
          name="fecha en la que debe ser repartido"
          label="Fecha en la que debe ser repartido"
          classNameContainer="mt-5"
        />
        <div className="w-[5rem] mt-5">
          <p className=" mb-1   text-xs text-yellowText font-medium border-0">
            Cantidad
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={handleMinus}
              className="w-[3rem] h-[1.7rem] border border-[#B2BCCA] rounded-sm flex justify-center items-center"
            >
              -
            </button>
            <p className="w-[3rem]  text-center ">{counter}</p>
            <button
              onClick={handleSum}
              className="w-[3rem] h-[1.7rem] border border-[#B2BCCA] rounded-sm flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <Button className="mt-5 w-full">agregar</Button>
      </form>
    </Layout>
  );
}

export default Page;
