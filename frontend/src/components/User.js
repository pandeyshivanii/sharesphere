import React, { useEffect, useState } from "react";
import NavbarAll from "./NavbarAll";
import { NavLink, useParams } from "react-router-dom";
import "../styles/user.css";
import { FaRegComment, FaRegHeart } from "react-icons/fa";

function User() {
  const [updatedUserInfo, setUpdatedUserInfo] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const { id } = useParams();
  const getcurrentuser = async () => {
    const res = await fetch("http://localhost:8000/getcurrentuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    setCurrentUser(result);
    console.log(currentUser);

    const response = await fetch(`http://localhost:8000/user/getuser/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const updatedData = await response.json();
    setUpdatedUserInfo(updatedData);
  };
  useEffect(() => {
    // console.log(id);
    fetch(`http://localhost:8000/user/getuser/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdatedUserInfo(data);
      });
    getcurrentuser();
  }, [id]);

  const addFollow = async (userid) => {
    console.log(userid);
    const user = {
      usertofollow: userid,
    };
    console.log(JSON.stringify(user));
    await fetch("http://localhost:8000/user/addfollow", {
      method: "PUT",
      body: JSON.stringify(user),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const response = await fetch(`http://localhost:8000/user/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const updatedData = await response.json();
    setUpdatedUserInfo(updatedData);
    // console.log(updatedUserInfo);
  };
  const addUnFollow = async (userid) => {
    console.log(userid);
    const user = {
      usertounfollow: userid,
    };
    console.log(JSON.stringify(user));
    await fetch("http://localhost:8000/user/addunfollow", {
      method: "PUT",
      body: JSON.stringify(user),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const response = await fetch(`http://localhost:8000/user/getuser/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const updatedData = await response.json();
    setUpdatedUserInfo(updatedData);
  };

  console.log(updatedUserInfo);
  return (
    <>
      <NavbarAll />
      <div className="user-info-section">
        {updatedUserInfo.map((data) => (
          <>
            <div className="user-info-header">
              <div className="user-info-header-image">
                {data.personalDetails.map((image) => (
                  <>
                    <img src={image.profilePic} alt={image._id} />
                  </>
                ))}
              </div>
              <div className="user-info-header-para">
                <div className="user-info-header-para-name">
                  <h1>{data.fullName} </h1>
                  <h5>{data.username} </h5>
                </div>
                <div className="bio">
                  <p>
                    {data.personalDetails.map((para) => (
                      <>{para.bio}</>
                    ))}
                  </p>
                </div>
                <div className="user-insights">
                  <div className="user-insights-post">
                    <span className="user-insights-post-stats">
                      <h5>{data.post.length} Posts</h5>
                    </span>
                    <span className="user-insights-followers-stats">
                      <h5>{data.followers.length} Followers</h5>
                    </span>
                    <span className="user-insights-following-stats">
                      <h5>{data.followings.length} Followings</h5>
                    </span>
                  </div>
                </div>
                <div className="follow-btn">
                  {data._id === currentUser ? (
                    ""
                  ) : data.followers.some(
                      (useaddfollow) => useaddfollow.user._id === currentUser
                    ) ? (
                    <button onClick={() => addUnFollow(data._id)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => addFollow(data._id)}>Follow</button>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="user-post-section">
        <div className="user-post-section-container">
          {updatedUserInfo.map((data) =>
            data.post.map((post) => (
              <div className="user-post-section-post">
                <>
                  <NavLink to={`/post/${post._id}`}>
                    <img src={post.post} alt={post._id} />
                  </NavLink>
                  <div className="caption">
                    <span className="likes-length">
                      <FaRegHeart />
                      {post.likes.length}
                    </span>
                    <span className="comments-length">
                      <FaRegComment />
                      {post.comments.length}
                    </span>
                  </div>
                </>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default User;
