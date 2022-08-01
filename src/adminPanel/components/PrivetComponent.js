import React from "react";
import {Outlet,Navigate  } from "react-router-dom";

const PrivetComponent=()=>{
    const auth=localStorage.getItem("token")
    return auth?<Outlet/>:<Navigate to="/login"></Navigate>
}

export default PrivetComponent;