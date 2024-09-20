import React, { useState } from "react";
// import Navbar from "../components/Navbar";
import NavbarAll from "../components/NavbarAll";
import "../styles/addpost.css";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const handleOnSubmit = async () => {
    console.log(file, content);
    let formdata = new FormData();
    formdata.append("postimage", file);
    formdata.append("content", content);
    const res = await fetch("http://localhost:8000/post/addpost", {
      method: "POST",
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
      <div className="add-post">
        <div className="add-post-header">
          <h1>Add Your Post</h1>
        </div>
        <div className="add-post-form">
          <div className="add-post-form-input">
            <p>Post</p>
            {/* <input
              type="file"
              placeholder="Enter your file"
              name="postimage"
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
            {/* <FilePicker
              onChange={(e) => setFile(e.target.files[0])}
              placeholder="Enter your file"
            /> */}
          </div>
          <div className="add-post-form-input">
            <p>Content</p>
            <textarea
              placeholder="Enter content"
              value={content}
              cols={30}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="add-post-button">
            <button onClick={handleOnSubmit}>Add Post</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPost;
