import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// import { UserContext } from "../App";

function PrivateRoute() {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
