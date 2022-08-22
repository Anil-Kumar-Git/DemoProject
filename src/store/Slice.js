import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const Slice = createSlice({
  name: "listdata",
  initialState: {
    islogin: false,
    editData: [],
    profilePic: "assets/img/default-Img.png",
    initialPic:null
  },
  reducers: {
    setLogin: (state, action) => {
      state.islogin = action.payload;
      // console.log(action.payload)
    },
    setEdit: (state, action) => {
      state.editData = action.payload;
      // console.log(action)
      // console.log(state.editData)
    },
    updatePic: (state, action) => {
      state.profilePic = action.payload;
      // console.log(action)
      console.log(state.profilePic);
    },

  },
});

export const { updatePic, setLogin, setEdit } = Slice.actions;

export default Slice.reducer;
