"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "@/service/user/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer, // Add your slice reducer here
  },
});

export default store;
