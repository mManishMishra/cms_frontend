"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientProvider from "../store/ClientProvider";

export default function ClientLayout({ children }) {
  return (
    <ClientProvider>
      {children}
      <ToastContainer />
    </ClientProvider>
  );
}