"use client";
import store from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

const StoreProvide = ({ children }: { children: any }) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default StoreProvide;
