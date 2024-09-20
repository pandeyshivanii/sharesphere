import React from "react";
import "../styles/navbarall.css";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";

function NavbarAll() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const handleLogout = () => {
    fetch(`http://localhost:8000/logout`, {
      method: "GET",
      credentials: "include",
    }).then(() => {
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
      navigate("/", { replace: true });
    });
  };
  const handleViewProfile = () => {
    navigate(`/user/${currentUser}`);
  };
  const handleOnClick = () => {
    navigate("/addpost");
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <NavLink to="/dashboard">
            <h1>ShareSphere</h1>
          </NavLink>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-btn">
          <span className="logout-btn">
            <FiLogOut onClick={handleLogout} fontSize={25} cursor="pointer" />
          </span>
          <span className="add-post-btn">
            <MdAddCircleOutline
              onClick={handleOnClick}
              fontSize={25}
              cursor="pointer"
            />
          </span>
          <span className="profile-btn">
            <CgProfile
              onClick={handleViewProfile}
              fontSize={25}
              cursor="pointer"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavbarAll;
