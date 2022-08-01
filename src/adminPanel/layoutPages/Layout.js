import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div>
      <Header/>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
