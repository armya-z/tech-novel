// userSlice.js
"use client";
import { UserTypes } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserTypes.UserList = {
  data: [],
  page: 0,
  per_page: 10,
  total: 1,
  total_pages: 1,
  loading: false,
  singleUserData: {
    avatar: "",
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState, // Initial state for users
  reducers: {
    setUsers: (state, action: PayloadAction<UserTypes.UserList>) => {
      return action.payload;
    },
    setUserData: (state, action: PayloadAction<UserTypes.User>) => {
      state.singleUserData = action.payload;
    },
    updateUserData: (state, action) => {},
  },
});

export const { setUsers, setUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;
