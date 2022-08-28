import React from "react";
import {Outlet,Navigate  } from "react-router-dom";

const ProtectedComponent=()=>{
    const auth=localStorage.getItem("token")
    return auth?<Navigate to="/"></Navigate>:<Outlet/>
}

export default ProtectedComponent;