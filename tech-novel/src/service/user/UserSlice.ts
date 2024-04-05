// userSlice.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [], // Initial state for users
  reducers: {
    addUser: (state: any, action: any) => {
      // Add a user to the state
      state.push(action.payload);
    },
    // Add other reducers as needed
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
