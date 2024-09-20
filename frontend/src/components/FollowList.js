import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function FollowList() {
  const [currentUser, setCurrentUser] = useState("");
  const [updatedUserInfo, setUpdatedUserInfo] = useState([]);

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

    const response = await fetch(`http://localhost:8000/user/getalluser`, {
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

    const response = await fetch(`http://localhost:8000/user/getalluser`, {
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
    fetch("http://localhost:8000/user/getalluser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdatedUserInfo(data);
      });

    getcurrentuser();
  }, []);

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

    const response = await fetch(`http://localhost:8000/user/getalluser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const updatedData = await response.json();
    setUpdatedUserInfo(updatedData);
  };

  return (
    <>
      <div className="user-follow-container">
        {updatedUserInfo.map((usertofollow) => (
          <div className="user-follow-box">
            <div className="user-follow-box-img">
              {usertofollow.personalDetails.map((usertofollowpersonal) => (
                <img src={usertofollowpersonal.profilePic} alt="img" />
              ))}
            </div>
            <div className="user-follow-box-text">
              <NavLink to={`/user/${usertofollow._id}`}>
                <h5>{usertofollow.username}</h5>
                <p>{usertofollow.fullName}</p>
              </NavLink>
              {usertofollow.followers.some(
                (useaddfollow) => useaddfollow.user === currentUser
              ) ? (
                <button onClick={() => addUnFollow(usertofollow._id)}>
                  Unfollow
                </button>
              ) : (
                <button onClick={() => addFollow(usertofollow._id)}>
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FollowList;
