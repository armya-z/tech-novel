"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "@/service/user/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
