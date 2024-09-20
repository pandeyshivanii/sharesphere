import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div className="logo">
      <NavLink to="/">
        <h1>ShareSphere</h1>
      </NavLink>
    </div>
  );
}

export default Navbar;
