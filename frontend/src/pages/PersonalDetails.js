import React, { useState } from "react";
import NavbarAll from "../components/NavbarAll";
import { useNavigate } from "react-router-dom";

function PersonalDetails() {
  const [Bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    let formdata = new FormData();
    formdata.append("bio", Bio);
    formdata.append("img", file);
    console.log(formdata);
    const res = await fetch(`http://localhost:8000/user/adddetails`, {
      method: "PUT",
      body: formdata,
      credentials: "include",
    });
    if (res.ok) {
      console.log("User created Successfully");
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      navigate("/dashboard");
    }
  };

  return (
    <>
      <NavbarAll />
      <div className="login-page">
        <div className="login-page-ctx">
          <div className="login-page-ctx-ctx">
            <div className="login-page-heading">
              <h2>Create an account</h2>
              {/* <p>
                Already have an account <NavLink to="/">Login</NavLink>
              </p> */}
            </div>
            <div className="login-page-form">
              <div className="login-page-form-input">
                <p>Bio</p>
                <input
                  type="text"
                  placeholder="Enter Your bio"
                  value={Bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="login-page-form-input">
                <p>Profile Picture</p>
                {/* <input
                  type="file"
                  placeholder="Enter your file"
                  name="img"
                  // value={file}
                  onChange={(e) => setFile(e.target.files[0])}
                /> */}

                <label for="images" class="drop-container" id="dropcontainer">
                  <span class="drop-title">Drop files here</span>
                  or
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    required
                    name="postimage"
                    // value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
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

export default PersonalDetails;
