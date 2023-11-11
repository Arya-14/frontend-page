import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default Layout;