"use client";
import store from "@/Redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClientProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
};

export default ClientProvider;
