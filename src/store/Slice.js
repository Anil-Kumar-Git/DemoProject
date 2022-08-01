import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

export const Slice =createSlice({
    name:"listdata",
    initialState:{
        value:""
    },
    reducers:{
        increment: (state)=>{
            
        },
        decrement: (state) => {
            
          },
    }
})

export const { increment, decrement } = Slice.actions

export default Slice.reducer
