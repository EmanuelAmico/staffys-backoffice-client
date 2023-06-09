"use client";
import React from "react";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function Template({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="h-screen w-full">
      <Header />
      {children}
    </div>
  );
}
