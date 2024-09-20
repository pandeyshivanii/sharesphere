import React, { useState } from "react";
import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:8000/login`,
        {
          email: Email,
          password: password,
        },
        { withCredentials: true }
      );

      navigate("/dashboard");
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    } catch (err) {
      setError("Invalid user credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-page-ctx">
          <div className="login-page-ctx-ctx">
            <div className="login-page-heading">
              {error}
              <h2>Login to our platform</h2>
              <p>
                Don't have an account <NavLink to="/signup">Signup</NavLink>
              </p>
            </div>
            <div className="login-page-form">
              <div className="login-page-form-input">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Enter Your email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-page-form-input">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="login-form-button">
                <button onClick={handleOnSubmit}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
