import React, { useEffect, useState } from "react";
import NavbarAll from "../components/NavbarAll";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../styles/singlepost.css";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
function SinglePost() {
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState("");
  const [commentid, setCommentid] = useState("");

  const [comment, setComment] = useState("");
  const [updatedUserInfo, setUpdatedUserInfo] = useState([]);
  const { id } = useParams();
  const [replyactivate, setReplyactivate] = useState(false);

  const [commentActive, setCommentActive] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleDeletePost = async (postId) => {
    await fetch(`http://localhost:8000/post/${postId}/deletepost`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate("/dashboard");
  };

  const handlereply = (commentID) => {
    setReplyactivate(!replyactivate);
    setCommentid(commentID);
    // console.log(commentid);
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
  };
  const handleLike = async (postId) => {
    console.log(postId);

    const res = await fetch(`http://localhost:8000/post/${postId}/addlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    const response = await fetch(
      `http://localhost:8000/post/getsinglepost/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const updatedData = await response.json();

    // Update the state with the new comments

    setUpdatedUserInfo(updatedData);
  };

  const handleUnLike = async (postId) => {
    console.log(postId);

    const res = await fetch(`http://localhost:8000/post/${postId}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    const response = await fetch(
      `http://localhost:8000/post/getsinglepost/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const updatedData = await response.json();

    // Update the state with the new comments

    setUpdatedUserInfo(updatedData);
  };
  const handleActiveComment = () => {
    setCommentActive(!commentActive);
  };
  const addreply = async (postId) => {
    await axios.post(
      `http://localhost:8000/post/addreply/${postId}/${commentid}`,
      {
        replytext: replyText,
      },
      { withCredentials: true }
    );

    const response = await fetch(
      `http://localhost:8000/post/getsinglepost/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const updatedData = await response.json();

    // Update the state with the new comments

    setUpdatedUserInfo(updatedData);
    setReplyText("");
  };

  const addComment = async (postId) => {
    try {
      // Make the API call to add the comment
      await axios.post(
        `http://localhost:8000/post/${postId}/addcomment`,
        {
          comment: comment,
        },
        { withCredentials: true }
      );

      // Fetch the updated user information after adding the comment
      const response = await fetch(
        `http://localhost:8000/post/getsinglepost/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const updatedData = await response.json();

      // Update the state with the new comments

      setUpdatedUserInfo(updatedData);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/post/getsinglepost/${id}`, {
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
  }, [id]);
  getcurrentuser();

  return (
    <>
      <NavbarAll />
      <div className="post-section">
        {updatedUserInfo.map((singlepost) => (
          <>
            <div className="post-content">
              <div className="post-info-ctx">
                <div className="post-info-user-info">
                  <div className="user-info">
                    <div className="user-info-image">
                      {singlepost.createdBy.personalDetails.map(
                        (userdetails) => (
                          <>
                            <img
                              src={userdetails.profilePic}
                              alt={userdetails._id}
                            />
                          </>
                        )
                      )}
                    </div>
                    <NavLink to={`/user/${singlepost.createdBy._id}`}>
                      <p>{singlepost.createdBy.username}</p>
                    </NavLink>
                  </div>
                  <div className="post-delete">
                    {currentUser === singlepost.createdBy._id ? (
                      <MdDelete
                        fill="white"
                        onClick={() => handleDeletePost(singlepost._id)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="post-content-image">
                  <img src={singlepost.post} alt={singlepost._id} />
                </div>
                <div className="post-like-comment">
                  <div className="single-post-like">
                    {singlepost.likes.some(
                      (liked) => liked.user._id === currentUser
                    ) ? (
                      <>
                        <FaHeart
                          fill="red"
                          onClick={() => handleUnLike(singlepost._id)}
                        />
                        {singlepost.likes.length}
                      </>
                    ) : (
                      <>
                        <FaRegHeart
                          onClick={() => handleLike(singlepost._id)}
                        />
                        {singlepost.likes.length}
                      </>
                    )}

                    {/* {likeActive === false ? (
                      // <FaRegHeart />
                      <>
                        <FaRegHeart
                          onClick={() => handleLike(singlepost._id)}
                        />
                        {singlepost.likes.length}
                      </>
                    ) : (
                      <>
                        <FaHeart fill="red" onClick={handleLike} />
                        {singlepost.likes.length}
                      </>
                    )} */}
                  </div>
                  <div className="post-comment" onClick={handleActiveComment}>
                    <FaRegComment onClick={handleActiveComment} />
                    {singlepost.comments.length}
                  </div>
                </div>
                <div className="user-post-content">{singlepost.content}</div>
                <div className="user-post-comments">
                  {commentActive &&
                    singlepost.comments.map((comment) => (
                      <>
                        <div className="user-comment-comment">
                          <div className="user-comment">
                            <h5>{comment.user.username}</h5>
                            <p>{comment.comment}</p>
                          </div>
                          <div className="add-reply">
                            <button onClick={() => handlereply(comment._id)}>
                              Reply
                            </button>
                          </div>

                          <div className="reply">
                            {comment.reply.map((reply) => (
                              <>
                                <div className="reply-class">
                                  <h5>{reply.user.username}</h5>
                                  <p>{reply.replyText}</p>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              {replyactivate ? (
                <div className="add-comment">
                  <input
                    type="text"
                    value={replyText}
                    placeholder="Enter your reply"
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => addreply(singlepost._id)}>
                    Reply
                  </button>
                </div>
              ) : (
                <div className="add-comment">
                  <input
                    type="text"
                    value={comment}
                    placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={() => addComment(singlepost._id)}>
                    Comment
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default SinglePost;
