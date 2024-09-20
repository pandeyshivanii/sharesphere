import React, { useState } from "react";
import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    // const res = fetch(
    //   "http://localhost:8000/signup",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    //   { withCredentials: true }
    // );

    const res = await axios.post(
      "http://localhost:8000/signup",
      {
        fullname: firstName,
        email: Email,
        password: password,
        username: username,
      },
      // { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    res ? navigate("/personal") : navigate("/signup");
  };
  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-page-ctx">
          <div className="login-page-ctx-ctx">
            <div className="login-page-heading">
              <h2>Create an account</h2>
              <p>
                Already have an account <NavLink to="/">Login</NavLink>
              </p>
            </div>
            <div className="login-page-form">
              <div className="login-page-form-input">
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="login-page-form-input">
                <p>Username</p>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
                <button onClick={handleOnSubmit}>Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
