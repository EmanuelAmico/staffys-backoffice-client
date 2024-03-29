"use client";
import React from "react";
import "../styles/global.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import CheckRefreshProvider from "../context/refresh";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const metadata = {
  title: "Staffys Back Office",
  description:
    "Easy to use web application that allows you to navigate quickly so you can monitor the operation of the delivery drivers, assign or reassign packages and intervene if necessary.",
  icons: {
    favicon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="icon"
          type="image/x-icon"
          href={metadata.icons.favicon}
        ></link>
      </head>
      <Provider store={store}>
        <CheckRefreshProvider>
          <SkeletonTheme>
            <body>
              <ToastContainer />
              {children}
            </body>
          </SkeletonTheme>
        </CheckRefreshProvider>
      </Provider>
    </html>
  );
}
